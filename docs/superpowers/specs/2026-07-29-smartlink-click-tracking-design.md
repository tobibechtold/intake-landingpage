# First-party smart link click tracking & creative dashboard — design

Date: 2026-07-29
Status: approved, not yet implemented
Supersedes the PostHog `smartlink_click` event introduced in `2026-07-22-app-attribution-tracking-design.md`.

## Context

Ads have been running since 2026-07-26 (Meta and TikTok, €20/day each). Ranking creatives is currently impossible because the two halves of the funnel live in different systems that cannot be joined:

- **Clicks** are in PostHog (`smartlink_click`, captured server-side in `api/go.ts`).
- **Purchases** are in Supabase (`user_attribution`, written by the Android install-referrer worker).

PostHog's numbers are also not trustworthy in absolute terms. On 2026-07-27 PostHog showed ~2,000 clicks against 837 (Meta) + 706 (TikTok) = 1,543 platform-reported link clicks. Destination hits should come in *below* platform link clicks, not 30% above, so several hundred events are duplicates or unfiltered automation. Because `botDetection.ts` filters at capture time, those events were never stored and the history cannot be re-filtered.

Intake is a **paid-upfront** app at €6.99, netting ~€4.99 per sale (÷1.19 German VAT, ×0.85 Small Business Program). At the observed ~1.4% click-to-purchase rate the break-even CPC is roughly €0.07, so creative-level conversion is the metric that decides whether the channel survives.

## Goals

1. One page that ranks creatives by clicks → purchases → conversion.
2. Click data that can be re-filtered retroactively as bot detection improves.
3. A day-by-day channel rollup across ads, bio links, website and organic.

## Non-goals

- **Ad spend tracking.** Budgets are flat €20/day per platform; a spend table would be bookkeeping for a constant. Per-creative spend stays in the ad managers.
- **User-level attribution.** Clicks and purchases join on `(campaign, day)`, never on a person.
- **iOS install attribution.** Apple provides no per-install data and no MMP is planned.
- **Attribution windows.** Click day and purchase day are joined same-day; modelling the lag is not worth it at ~10 purchases/day.
- **Visual refresh of the dashboard.** Tracked separately; the CSS is centralised in `globals.css`, so a later restyle picks this page up for free.

## Architecture

```
ad click → /go/<slug>  (repo: intake-landingpage, Vercel function)
             ├─ 302 to store, returned immediately
             └─ waitUntil() → POST /rest/v1/smartlink_clicks  (repo: intake-backend, Supabase)

purchase → Play Install Referrer → InstallReferrerWorker → user_attribution

dashboard (repo: intake-backend) → smartlink_performance() RPC joins both on (campaign, day)
```

## 1. Schema (repo: intake-backend)

New migration adding:

```sql
create table public.smartlink_clicks (
  id           bigint generated always as identity primary key,
  slug         text not null,
  platform     text not null check (platform in ('ios','android','unknown')),
  country      text,
  user_agent   text not null default '',
  visitor_hash text,
  click_id     text,
  query_params jsonb,
  is_bot       boolean not null default false,
  bot_reason   text check (bot_reason in ('ua','prefetch','empty-ua')),
  created_at   timestamptz not null default now()
);

create index smartlink_clicks_slug_created_idx on public.smartlink_clicks (slug, created_at desc);
create index smartlink_clicks_created_idx      on public.smartlink_clicks (created_at desc);
create index smartlink_clicks_click_id_idx     on public.smartlink_clicks (click_id) where click_id is not null;
```

RLS enabled, following the `user_attribution` grant shape: revoked from `anon` and `authenticated`, full access for `service_role` only.

Three deliberate decisions:

**`is_bot` is a flag, not a filter.** Every hit is stored, including ones the heuristic rejects. Improving the rule later means re-running it over history and getting better numbers for past days instead of permanently losing them. This is the single capability PostHog cannot offer and the main justification for building this at all.

**`click_id` is the preferred dedup key.** Meta appends `fbclid` and TikTok appends `ttclid` to outbound ad clicks, each unique per click. A repeated `click_id` is provably one click reaching `/go` twice — an in-app-browser prefetch followed by the real navigation, the most likely explanation for the 2,000-vs-1,543 gap. `query_params` stores the full remaining query string so that if these parameter names turn out to be wrong, the correction needs no migration.

**`visitor_hash` needs no salt storage.** It is `sha256(ip + user_agent + YYYY-MM-DD + SMARTLINK_HASH_SECRET)`. The date component rotates it daily on its own, so the hash cannot be linked across days or reversed without the secret, and there is no salt table or rotation job. It is the dedup fallback when `click_id` is absent (organic and bio-link traffic) and a bot signal in its own right — one hash producing fifty hits in an hour is automation the UA blocklist will not catch.

## 2. Smart link changes (repo: intake-landingpage)

`api/go.ts` drops `captureSmartlinkClick` and the PostHog dependency entirely. PostHog remains in use for landing-page web analytics.

New pure module `src/lib/clickTracking.ts` exporting `buildClickRow({ slug, userAgent, headers, query, now, secret })` returning the row object. All decisions — bot flagging, `bot_reason` selection, `click_id` extraction, hash computation — live here and are unit-testable without network access. `api/go.ts` stays a thin I/O shell, matching how `smartlink.ts` already relates to it.

`isBotOrPrefetch` no longer gates the write. Its boolean cannot populate `bot_reason`, so it gains a sibling `classifyBotReason(userAgent, prefetchHeaders)` returning `'empty-ua' | 'ua' | 'prefetch' | null`, with `isBotOrPrefetch` reimplemented as `classifyBotReason(...) !== null` to keep its existing callers and tests intact.

The insert is a plain `fetch` POST to `${SUPABASE_URL}/rest/v1/smartlink_clicks` with `apikey` and `Authorization: Bearer` headers, deliberately avoiding a `@supabase/supabase-js` dependency in a public site's function bundle — the same raw-fetch approach the PostHog call already used.

New env vars on the intake-landingpage Vercel project: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SMARTLINK_HASH_SECRET`. The service-role key is server-side only and never reaches the browser. The alternative — anon key with an insert policy — would let anyone holding the public key inject fake clicks into the ad numbers.

New dependency: `@vercel/functions` for `waitUntil()`, so the 302 is returned before the insert runs. This makes `/go` faster than it is today, since the redirect currently waits on the PostHog call's 800ms budget.

Accepted tradeoff: `waitUntil` work is best-effort. A Supabase outage silently loses clicks rather than delaying users. Correct for analytics, but the click count is "very good", not "audited".

## 3. Aggregation RPC (repo: intake-backend)

Supabase JS cannot `GROUP BY`, so aggregation lives in a `security definer` function, following the precedent of the existing dashboard search RPCs:

```sql
smartlink_performance(p_since date, p_until date) returns table (
  slug text,
  source text,
  clicks bigint,
  deduped_clicks bigint,
  bot_hits bigint,
  ios_clicks bigint,
  android_clicks bigint,
  android_purchases bigint,
  android_conversion_pct numeric
)
```

- Days are bucketed in `Europe/Berlin`, matching how the store consoles report.
- `deduped_clicks` counts distinct `coalesce(click_id, visitor_hash)`; `clicks` stays as the raw-hit comparison so the size of the gap is visible.
- Bot hits are excluded from `clicks` and `deduped_clicks` and reported separately.
- `android_purchases` comes from `user_attribution` where `platform = 'android'`, bucketed on `coalesce(installed_at, created_at)`.
- `source` uses the same first-hyphen-segment derivation as `sourceFromSlug`, so no slug names are hardcoded in SQL.

A second function serves the daily rollup, since the per-slug function carries no date dimension:

```sql
smartlink_daily(p_since date, p_until date) returns table (
  day date,
  source text,
  clicks bigint,
  deduped_clicks bigint,
  android_purchases bigint
)
```

Both functions share the same bucketing, bot-exclusion and dedup rules; the only difference is the grouping key.

## 4. Dashboard page (repo: intake-backend)

New route `dashboard/app/attribution/page.tsx`, a server component behind the existing admin gate, following the structure of `app/intake-ai-usage/page.tsx`. Query lives in `lib/queries.ts`, row types in `lib/dashboard-models.ts`.

**Creative table** — one row per slug, default last 7 days. Columns: slug, source, clicks, deduped clicks, bot hits, iOS clicks, Android clicks, Android purchases, Android conversion %, estimated net € (`android_purchases × 4.99`).

**Daily rollup** — date × source, clicks and purchases.

Two limitations must be stated on the page itself, not buried:

- **Conversion is Android-only.** Roughly half the ad spend reaches iOS, which has clicks but no measurable conversion. iOS clicks appear as volume with no conversion figure beside them.
- **Click day ≠ purchase day.** Same-day joining smears installs that happen the next morning.

The page also shows the table's own start date, so the cutover is not misread as a traffic collapse.

Known wart made visible rather than patched: Meta creatives report `source = 'ugc'` because `sourceFromSlug` takes the first hyphen segment of `ugc-lisa-*`. Rather than special-case it in SQL, future Meta creatives should be named `meta-*` and the existing slugs allowed to age out.

## 5. Privacy & retention

`visitor_hash` is IP-derived and therefore pseudonymous rather than anonymous. It is used solely for deduplication and bot filtering, never for profiling or cross-site tracking, and the daily-rotating salt makes it unlinkable across days. This sits under legitimate interest and is consistent with the deliberate no-consent-banner, cookieless posture of the existing setup.

A `pg_cron` monthly job deletes rows older than 12 months. Raw IPs are never stored.

## 6. Error handling & testing

Insert failures are swallowed; the redirect never breaks or waits. Missing env vars skip the write silently, mirroring the current `POSTHOG_KEY` guard.

TDD throughout, following each repo's existing patterns:

- **intake-landingpage** (`vitest`, alongside `smartlink.test.ts`): `buildClickRow` bot flagging and `bot_reason` values, `click_id` extraction from `fbclid`/`ttclid`, `query_params` capture, hash stability within a day, and hash rotation across a day boundary.
- **intake-backend**: RPC tests covering the `click_id` → `visitor_hash` dedup fallback, bot exclusion, timezone bucketing, and slugs with clicks but zero purchases.
- **dashboard** (`vitest`, alongside `intake-ai-usage/page.test.tsx`): rendering and the empty state.

## 7. Assumptions to verify after ship

1. **That `fbclid` and `ttclid` actually arrive on `/go`.** If they do not, `deduped_clicks` silently degrades to the `visitor_hash` path. `query_params` will show what the platforms really send within a day of launch.
2. **That the raw-vs-deduped gap explains the PostHog discrepancy.** If deduped clicks still land materially above the ad managers' reported link clicks, there is a second inflation source still unaccounted for.

## 8. Historic data

Existing PostHog `smartlink_click` events are left in place for history and are not backfilled. Pre-2026-07-27 PostHog data remains bot-inflated and should not be compared against the new table.
