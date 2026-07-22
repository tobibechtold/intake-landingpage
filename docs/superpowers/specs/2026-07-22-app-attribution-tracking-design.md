# Intake download & buyer attribution — design

**Date:** 2026-07-22
**Status:** Approved (lightweight/no-SDK approach, direct-to-store smart links, PostHog)

## Context

Intake's acquisition funnel today is the landing page (`getintake.de`) plus organic social (Threads bio). Paid UGC video ads on Meta and TikTok are about to launch. There is currently **zero attribution**: store links in `src/lib/storeLinks.ts` carry no tracking parameters, the only web analytics is Vercel Analytics (pageviews, no custom events), and neither app has an analytics/attribution SDK.

Goals:

1. Know which source (landing page, Threads bio, each UGC ad creative) drives App Store / Google Play downloads.
2. Know which sources drive **buyers** (Intake AI subscribers) — per-user on Android, per-campaign aggregate on iOS.
3. One link per ad creative that sends users to the right store for their device while carrying attribution.

Deliberately chosen: **no MMP SDK** (AppsFlyer/Adjust/Tenjin). Trade-off accepted: iOS attribution is aggregate per campaign (App Store Connect App Analytics), not per user, and Meta/TikTok won't receive purchase signals for algorithmic optimization. An MMP can be layered on later without discarding any of this work.

## 1. Campaign slug taxonomy

One canonical slug per source/creative, lowercase, format `<source>-<creative>`:

- `threads-bio`, `instagram-bio`
- `tiktok-ugc1`, `tiktok-ugc2`, …
- `meta-ugc1`, `meta-ugc2`, …
- `website` — reserved fallback for organic landing page visitors

The slug is the join key across every system: Apple `ct=` token, Play referrer `utm_campaign`, PostHog event property, Supabase `user_attribution.campaign`. `utm_source` is derived as the part before the first `-` (e.g. `tiktok-ugc1` → source `tiktok`).

## 2. Smart link endpoint (repo: intake-landingpage)

Vercel serverless function `api/go.ts`, public URL `https://getintake.de/go/<slug>`.

- `vercel.json`: add a rewrite `/go/:slug` → `/api/go?slug=:slug` **before** the SPA catch-all.
- Slug validation: `^[a-z0-9-]{1,64}$`; invalid/missing slug → redirect to `https://www.getintake.de/`.
- User-agent detection:
  - **iOS** → `https://apps.apple.com/<de|us>/app/intake-kalorienz%C3%A4hler/id6757768955?pt=<PT>&ct=<slug>&mt=8` (storefront by `Accept-Language`, default `de`)
  - **Android** → `https://play.google.com/store/apps/details?id=de.bechtoldit.intake&referrer=` + URL-encoded `utm_source=<source>&utm_medium=smartlink&utm_campaign=<slug>`
  - **Everything else** → `https://www.getintake.de/?utm_source=<source>&utm_medium=smartlink&utm_campaign=<slug>`
- Fires a server-side PostHog capture (`smartlink_click`: slug, platform, country from Vercel geo headers) — fire-and-forget, must never delay or fail the redirect. Cookieless, no consent implications.
- 302 redirect; `cache-control: no-store`.

Config: `APPLE_PROVIDER_TOKEN` (pt) and `POSTHOG_API_KEY` / `POSTHOG_HOST` (EU) as Vercel env vars.

**Manual prerequisite (owner):** generate the provider token once in App Store Connect → App Analytics → Acquisition → Campaigns (campaign link generator shows `pt=`).

These `/go/<slug>` links are what goes into the Threads bio and into Meta/TikTok ad destinations.

## 3. Landing page instrumentation (repo: intake-landingpage)

- **PostHog:** add `posthog-js`, EU cloud (`eu.i.posthog.com`), free tier. Init in `src/App.tsx` with `persistence: 'memory'` (cookieless → no consent banner required yet). Keep Vercel Analytics as-is.
- **UTM capture:** on app load, read `utm_source|medium|campaign` from the URL and persist to `sessionStorage`. Helper module e.g. `src/lib/attribution.ts`.
- **Dynamic store links:** extend `src/lib/storeLinks.ts` so `getAppStoreUrl`, `getGooglePlayUrl`, and `getNavbarDownloadUrl` append attribution:
  - captured campaign slug when present; otherwise `website`.
  - App Store: `?pt=<PT>&ct=<slug>&mt=8` (PT exposed via `VITE_APPLE_PROVIDER_TOKEN`; if unset, omit `pt`/`ct` rather than emit broken params).
  - Play: `&referrer=` URL-encoded utms (`utm_medium=website` for organic).
  - Callers: `Hero.tsx`, `CTA.tsx`, `Footer.tsx`, Navbar. Links must be computed at click/render time in the browser, not baked in at prerender time.
- **CTA events:** `store_cta_click` PostHog event (platform: `ios|android`, location: `hero|cta|footer|navbar`, campaign slug) on every store button.

Result: per-source funnels (visit → CTA click) in PostHog; every store handoff carries its origin.

## 4. Android buyer-level attribution (repos: intake-android, intake-backend)

- Add `com.android.installreferrer:installreferrer` to intake-android.
- On first launch (one-shot, guarded by a local flag): connect to the Install Referrer client, read `installReferrer` (contains the utm string from §2/§3), parse `utm_source/medium/campaign`, persist locally.
- Upload to Supabase once a user identity exists (retry until success, then never again): new table `user_attribution` in intake-backend (standard timestamped migration in `supabase/migrations/`):
  - `user_id (uuid, pk/fk auth.users)`, `platform ('android')`, `source`, `medium`, `campaign`, `referrer_raw`, `installed_at`, `created_at`. RLS: user can insert/read own row.
- Reporting: join `user_attribution` against existing subscription/entitlement data → "paying subscribers per campaign", per individual buyer. Organic Play installs yield referrer `utm_source=google-play` or empty → recorded as `organic`.

## 5. iOS aggregate attribution

**No app changes.** App Store Connect → App Analytics → Acquisition shows downloads, redownloads, sessions and **proceeds** per `ct=` campaign token. Per-campaign revenue only — the accepted trade-off of the no-SDK route.

## 6. Where to read the numbers

| Question | Where |
|---|---|
| Clicks per ad/bio link, by platform | PostHog `smartlink_click` |
| Landing page visitors & CTA clicks by source | PostHog funnel (`$pageview` → `store_cta_click`) |
| iOS downloads & revenue per campaign | App Store Connect App Analytics → Campaigns |
| Android installs per campaign | Play Console acquisition reports (UTM) |
| Android **buyers** per campaign | Supabase: `user_attribution` ⨝ subscriptions |

## 7. Out of scope (later milestones)

- Meta Pixel + TikTok Pixel + consent banner + Conversions API — required when ad campaigns launch to optimize delivery; adds GDPR consent UI.
- MMP (e.g. Tenjin free tier) if ad spend scales past a few hundred €/month and per-ad iOS attribution / SKAdNetwork feedback becomes worth the integration.
- iOS per-user attribution (impossible without an MMP/clipboard tricks; explicitly not pursued).

## Error handling & testing

- `api/go.ts`: unit-testable pure function (UA + slug + language → redirect URL); PostHog failure must not affect redirects. Test via `vercel dev` and curl with iOS/Android/desktop UAs.
- `storeLinks.ts`: existing test setup (vitest) — cover slug propagation, `website` fallback, missing-PT fallback, referrer encoding.
- Android: unit-test referrer parsing; manual E2E via Play internal testing with the Play Store referrer test flow.
- E2E smoke after deploy: visit `/go/test-e2e` from an iPhone and an Android device, confirm store pages open with params; confirm `smartlink_click` in PostHog; confirm campaign appears in App Store Connect within ~24h.
