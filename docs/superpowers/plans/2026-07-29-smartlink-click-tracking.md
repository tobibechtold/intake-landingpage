# Smart Link Click Tracking & Attribution Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the PostHog `smartlink_click` event with a first-party `smartlink_clicks` table in Supabase, and add a dashboard page that ranks ad creatives by clicks → purchases → conversion.

**Architecture:** The `/go/<slug>` Vercel function in **intake-landingpage** returns its 302 immediately and writes a click row to Supabase via `waitUntil()`, using a raw `fetch` against PostgREST (no `@supabase/supabase-js` dependency in the public site's bundle). Bot traffic is stored with an `is_bot` flag rather than dropped, so history can be re-filtered later. Two `security definer` RPCs in **intake-backend** aggregate clicks and join them to `user_attribution` on `(campaign, day)`, and a new Next.js page renders the result.

**Tech Stack:** TypeScript, Vitest (both repos), Vercel Node functions (`@vercel/node`, `@vercel/functions`), Supabase Postgres + PostgREST, Next.js 15 App Router with React 19 server components.

**Spec:** `docs/superpowers/specs/2026-07-29-smartlink-click-tracking-design.md`

## Global Constraints

- Two repos are involved. Task 1–2 and 6–7 are in `/Users/xce35g6/dev/private/intake-backend`. Tasks 3–5 are in `/Users/xce35g6/dev/private/intake-landingpage`. Each task states its repo; commit in that repo only.
- **Relative imports inside the `/go` function's module graph MUST use explicit `.js` extensions.** Vercel deploys `api/*.ts` as unbundled ESM and extensionless specifiers fail at runtime with `ERR_MODULE_NOT_FOUND`.
- Days are bucketed in `Europe/Berlin` everywhere, matching how the App Store and Play consoles report.
- The `visitor_hash` formula is exactly `sha256(ip + "|" + user_agent + "|" + YYYY-MM-DD + "|" + secret)`, hex-encoded. Raw IPs are never stored.
- Net revenue per sale is `€4.99` (`6.99 ÷ 1.19 VAT × 0.85 commission`).
- Analytics must never break or delay the redirect. Every failure path in `api/go.ts` is swallowed.
- The dashboard reuses existing CSS classes from `dashboard/app/globals.css`: `panel`, `toolbar`, `eyebrow`, `stat-grid`, `stat-card`, `stat-label`, `stat-value`, `section-title`, `section-meta`, `table-list`, `table-row`, `table-main`, `table-title`, `table-subtitle`, `table-meta`, `pill`, `pill-row`, `muted`, `two-up`. No new CSS — a visual refresh is a separate project.

---

## File Structure

**intake-backend**
- Create: `supabase/migrations/20260729100000_add_smartlink_clicks.sql` — table, indexes, RLS, retention function + cron job
- Create: `supabase/migrations/20260729100100_add_smartlink_reporting_rpcs.sql` — `smartlink_performance()` and `smartlink_daily()`
- Modify: `dashboard/lib/queries.ts` — row types, period normaliser, data fetcher
- Create: `dashboard/app/attribution/page.tsx` — the page
- Create: `dashboard/app/attribution/page.test.tsx` — render + empty state tests
- Modify: `dashboard/app/layout.tsx:8-17` — nav entry
- Modify: `dashboard/lib/migrations.test.ts` — assertions about the new migrations

**intake-landingpage**
- Modify: `src/lib/botDetection.ts` — add `classifyBotReason`, reimplement `isBotOrPrefetch` on top
- Modify: `src/lib/botDetection.test.ts` — tests for the new function
- Create: `src/lib/clickTracking.ts` — pure `buildClickRow()`, all decisions live here
- Create: `src/lib/clickTracking.test.ts`
- Modify: `api/go.ts` — drop PostHog, insert to Supabase under `waitUntil`
- Modify: `package.json` — add `@vercel/functions`

---

### Task 1: `smartlink_clicks` table (repo: intake-backend)

**Files:**
- Create: `supabase/migrations/20260729100000_add_smartlink_clicks.sql`
- Test: `dashboard/lib/migrations.test.ts`

**Interfaces:**
- Consumes: nothing
- Produces: table `public.smartlink_clicks` with columns `id bigint`, `slug text`, `platform text`, `country text`, `user_agent text`, `visitor_hash text`, `click_id text`, `query_params jsonb`, `is_bot boolean`, `bot_reason text`, `created_at timestamptz`. Function `public.prune_smartlink_clicks()`.

**Prerequisite:** `pg_cron` must be enabled in the Supabase project (Dashboard → Database → Extensions). If it is not, the `cron.schedule` call in this migration fails. Enable it before applying.

- [ ] **Step 1: Write the failing test**

Append to `dashboard/lib/migrations.test.ts`, inside the existing `describe('SQL migration compatibility', ...)` block:

```typescript
  it('creates smartlink_clicks with service-role-only access and a retention job', () => {
    const sql = readFileSync(
      path.join(migrationsDirectory, '20260729100000_add_smartlink_clicks.sql'),
      'utf8',
    );

    expect(sql).toContain('create table public.smartlink_clicks');
    expect(sql).toContain('alter table public.smartlink_clicks enable row level security');
    expect(sql).toContain('revoke all on table public.smartlink_clicks from anon');
    expect(sql).toContain('revoke all on table public.smartlink_clicks from authenticated');
    expect(sql).toContain('grant all on table public.smartlink_clicks to service_role');
    expect(sql).toContain('create or replace function public.prune_smartlink_clicks()');
    expect(sql).toContain("interval '12 months'");
    expect(sql).not.toContain('grant insert on table public.smartlink_clicks to anon');
  });
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd /Users/xce35g6/dev/private/intake-backend/dashboard && npx vitest run lib/migrations.test.ts`
Expected: FAIL with `ENOENT` — the migration file does not exist.

- [ ] **Step 3: Write the migration**

Create `supabase/migrations/20260729100000_add_smartlink_clicks.sql`:

```sql
create table public.smartlink_clicks (
  id           bigint generated always as identity primary key,
  slug         text not null,
  platform     text not null check (platform in ('ios', 'android', 'unknown')),
  country      text,
  user_agent   text not null default '',
  visitor_hash text,
  click_id     text,
  query_params jsonb,
  is_bot       boolean not null default false,
  bot_reason   text check (bot_reason in ('empty-ua', 'ua', 'prefetch')),
  created_at   timestamptz not null default now()
);

create index smartlink_clicks_slug_created_idx on public.smartlink_clicks (slug, created_at desc);
create index smartlink_clicks_created_idx on public.smartlink_clicks (created_at desc);
create index smartlink_clicks_click_id_idx on public.smartlink_clicks (click_id) where click_id is not null;

alter table public.smartlink_clicks enable row level security;

revoke all on table public.smartlink_clicks from anon;
revoke all on table public.smartlink_clicks from authenticated;
grant all on table public.smartlink_clicks to service_role;

drop policy if exists "Service role manages smartlink_clicks" on public.smartlink_clicks;
create policy "Service role manages smartlink_clicks"
on public.smartlink_clicks
as permissive
for all
to service_role
using (true)
with check (true);

-- Retention: visitor_hash is IP-derived and therefore pseudonymous. Twelve months
-- is far longer than any campaign analysis needs and keeps the stated limit simple.
create or replace function public.prune_smartlink_clicks()
returns void
language sql
security definer
set search_path = public
as $$
  delete from public.smartlink_clicks
  where created_at < now() - interval '12 months';
$$;

revoke all on function public.prune_smartlink_clicks() from public;
grant execute on function public.prune_smartlink_clicks() to service_role;

create extension if not exists pg_cron;

do $$
begin
  perform cron.unschedule('prune-smartlink-clicks');
exception
  when others then
    null;
end
$$;

select cron.schedule(
  'prune-smartlink-clicks',
  '0 3 1 * *',
  $$select public.prune_smartlink_clicks()$$
);
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd /Users/xce35g6/dev/private/intake-backend/dashboard && npx vitest run lib/migrations.test.ts`
Expected: PASS

- [ ] **Step 5: Apply the migration**

Run: `cd /Users/xce35g6/dev/private/intake-backend && npx supabase db push`
Expected: the migration applies cleanly. If it fails on `cron.schedule`, enable `pg_cron` in the Supabase Dashboard under Database → Extensions and re-run.

- [ ] **Step 6: Commit**

```bash
cd /Users/xce35g6/dev/private/intake-backend
git add supabase/migrations/20260729100000_add_smartlink_clicks.sql dashboard/lib/migrations.test.ts
git commit -m "feat: add smartlink_clicks table with retention job"
```

---

### Task 2: Reporting RPCs (repo: intake-backend)

**Files:**
- Create: `supabase/migrations/20260729100100_add_smartlink_reporting_rpcs.sql`
- Test: `dashboard/lib/migrations.test.ts`

**Interfaces:**
- Consumes: `public.smartlink_clicks` (Task 1), existing `public.user_attribution`
- Produces:
  - `public.smartlink_performance(p_since date, p_until date)` returning `(slug text, source text, clicks bigint, deduped_clicks bigint, bot_hits bigint, ios_clicks bigint, android_clicks bigint, android_purchases bigint, android_conversion_pct numeric)`
  - `public.smartlink_daily(p_since date, p_until date)` returning `(day date, source text, clicks bigint, deduped_clicks bigint, android_purchases bigint)`

- [ ] **Step 1: Write the failing test**

Append to `dashboard/lib/migrations.test.ts`, inside the same `describe` block:

```typescript
  it('defines smartlink reporting RPCs that dedup, exclude bots and bucket in Berlin time', () => {
    const sql = readFileSync(
      path.join(migrationsDirectory, '20260729100100_add_smartlink_reporting_rpcs.sql'),
      'utf8',
    );

    expect(sql).toContain('create or replace function public.smartlink_performance');
    expect(sql).toContain('create or replace function public.smartlink_daily');
    expect(sql).toContain("at time zone 'Europe/Berlin'");
    // Dedup falls back through click_id -> visitor_hash -> row id so null-keyed
    // rows are never silently collapsed by count(distinct).
    expect(sql).toContain('coalesce(c.click_id, c.visitor_hash, c.id::text)');
    expect(sql).toContain('filter (where not c.is_bot)');
    expect(sql).toContain('security definer');
    expect(sql).toContain('revoke all on function public.smartlink_performance(date, date) from public');
    expect(sql).toContain('revoke all on function public.smartlink_daily(date, date) from public');
  });
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd /Users/xce35g6/dev/private/intake-backend/dashboard && npx vitest run lib/migrations.test.ts`
Expected: FAIL with `ENOENT`.

- [ ] **Step 3: Write the migration**

Create `supabase/migrations/20260729100100_add_smartlink_reporting_rpcs.sql`:

```sql
-- Per-creative performance. Full outer join so campaigns with purchases but no
-- tracked clicks (organic, pre-cutover installs) still appear.
create or replace function public.smartlink_performance(p_since date, p_until date)
returns table (
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
language sql
security definer
set search_path = public
as $$
  with click_agg as (
    select
      c.slug as slug,
      split_part(c.slug, '-', 1) as source,
      count(*) filter (where not c.is_bot) as clicks,
      count(distinct coalesce(c.click_id, c.visitor_hash, c.id::text))
        filter (where not c.is_bot) as deduped_clicks,
      count(*) filter (where c.is_bot) as bot_hits,
      count(*) filter (where not c.is_bot and c.platform = 'ios') as ios_clicks,
      count(*) filter (where not c.is_bot and c.platform = 'android') as android_clicks
    from public.smartlink_clicks c
    where (c.created_at at time zone 'Europe/Berlin')::date between p_since and p_until
    group by c.slug
  ),
  purchase_agg as (
    select
      a.campaign as slug,
      count(*) as android_purchases
    from public.user_attribution a
    where a.platform = 'android'
      and (coalesce(a.installed_at, a.created_at) at time zone 'Europe/Berlin')::date
          between p_since and p_until
    group by a.campaign
  )
  select
    coalesce(ca.slug, pa.slug) as slug,
    coalesce(ca.source, split_part(pa.slug, '-', 1)) as source,
    coalesce(ca.clicks, 0) as clicks,
    coalesce(ca.deduped_clicks, 0) as deduped_clicks,
    coalesce(ca.bot_hits, 0) as bot_hits,
    coalesce(ca.ios_clicks, 0) as ios_clicks,
    coalesce(ca.android_clicks, 0) as android_clicks,
    coalesce(pa.android_purchases, 0) as android_purchases,
    case
      when coalesce(ca.android_clicks, 0) > 0
        then round(100.0 * coalesce(pa.android_purchases, 0) / ca.android_clicks, 2)
      else null
    end as android_conversion_pct
  from click_agg ca
  full outer join purchase_agg pa on pa.slug = ca.slug
  order by coalesce(ca.clicks, 0) desc, coalesce(ca.slug, pa.slug);
$$;

-- Same rules, grouped by day and source instead of slug.
create or replace function public.smartlink_daily(p_since date, p_until date)
returns table (
  day date,
  source text,
  clicks bigint,
  deduped_clicks bigint,
  android_purchases bigint
)
language sql
security definer
set search_path = public
as $$
  with click_agg as (
    select
      (c.created_at at time zone 'Europe/Berlin')::date as day,
      split_part(c.slug, '-', 1) as source,
      count(*) filter (where not c.is_bot) as clicks,
      count(distinct coalesce(c.click_id, c.visitor_hash, c.id::text))
        filter (where not c.is_bot) as deduped_clicks
    from public.smartlink_clicks c
    where (c.created_at at time zone 'Europe/Berlin')::date between p_since and p_until
    group by 1, 2
  ),
  purchase_agg as (
    select
      (coalesce(a.installed_at, a.created_at) at time zone 'Europe/Berlin')::date as day,
      split_part(a.campaign, '-', 1) as source,
      count(*) as android_purchases
    from public.user_attribution a
    where a.platform = 'android'
      and (coalesce(a.installed_at, a.created_at) at time zone 'Europe/Berlin')::date
          between p_since and p_until
    group by 1, 2
  )
  select
    coalesce(ca.day, pa.day) as day,
    coalesce(ca.source, pa.source) as source,
    coalesce(ca.clicks, 0) as clicks,
    coalesce(ca.deduped_clicks, 0) as deduped_clicks,
    coalesce(pa.android_purchases, 0) as android_purchases
  from click_agg ca
  full outer join purchase_agg pa
    on pa.day = ca.day and pa.source = ca.source
  order by 1 desc, 2;
$$;

revoke all on function public.smartlink_performance(date, date) from public;
revoke all on function public.smartlink_performance(date, date) from anon;
revoke all on function public.smartlink_performance(date, date) from authenticated;
grant execute on function public.smartlink_performance(date, date) to service_role;

revoke all on function public.smartlink_daily(date, date) from public;
revoke all on function public.smartlink_daily(date, date) from anon;
revoke all on function public.smartlink_daily(date, date) from authenticated;
grant execute on function public.smartlink_daily(date, date) to service_role;
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd /Users/xce35g6/dev/private/intake-backend/dashboard && npx vitest run lib/migrations.test.ts`
Expected: PASS

- [ ] **Step 5: Apply and smoke-test the RPCs**

Run: `cd /Users/xce35g6/dev/private/intake-backend && npx supabase db push`

Then in the Supabase SQL editor:

```sql
select * from public.smartlink_performance(current_date - 7, current_date);
select * from public.smartlink_daily(current_date - 7, current_date);
```

Expected: both return rows for existing `user_attribution` campaigns with zero clicks (the table is still empty). No errors.

- [ ] **Step 6: Commit**

```bash
cd /Users/xce35g6/dev/private/intake-backend
git add supabase/migrations/20260729100100_add_smartlink_reporting_rpcs.sql dashboard/lib/migrations.test.ts
git commit -m "feat: add smartlink reporting RPCs"
```

---

### Task 3: `classifyBotReason` (repo: intake-landingpage)

**Files:**
- Modify: `src/lib/botDetection.ts`
- Test: `src/lib/botDetection.test.ts`

**Interfaces:**
- Consumes: existing `PrefetchHeaders` interface
- Produces: `export type BotReason = 'empty-ua' | 'ua' | 'prefetch'` and `export const classifyBotReason: (userAgent: string, prefetch?: PrefetchHeaders) => BotReason | null`. `isBotOrPrefetch` keeps its exact existing signature and behaviour.

- [ ] **Step 1: Write the failing test**

Append to `src/lib/botDetection.test.ts`:

```typescript
describe("classifyBotReason", () => {
  const HUMAN_UA =
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148";

  it("returns empty-ua for a blank user agent", () => {
    expect(classifyBotReason("   ")).toBe("empty-ua");
  });

  it("returns ua for a known crawler", () => {
    expect(classifyBotReason("facebookexternalhit/1.1")).toBe("ua");
  });

  it("returns prefetch for a speculative navigation header", () => {
    expect(classifyBotReason(HUMAN_UA, { secPurpose: "prefetch;prerender" })).toBe("prefetch");
  });

  it("returns null for a real mobile browser", () => {
    expect(classifyBotReason(HUMAN_UA)).toBeNull();
  });

  it("prefers the user-agent reason over the prefetch header", () => {
    expect(classifyBotReason("Bytespider", { secPurpose: "prefetch" })).toBe("ua");
  });

  it("keeps isBotOrPrefetch consistent with classifyBotReason", () => {
    expect(isBotOrPrefetch(HUMAN_UA)).toBe(false);
    expect(isBotOrPrefetch("Googlebot/2.1")).toBe(true);
    expect(isBotOrPrefetch(HUMAN_UA, { xMoz: "prefetch" })).toBe(true);
  });
});
```

Update the import at the top of the file to include the new export:

```typescript
import { classifyBotReason, isBotOrPrefetch } from "./botDetection";
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/botDetection.test.ts`
Expected: FAIL — `classifyBotReason` is not exported.

- [ ] **Step 3: Write the implementation**

In `src/lib/botDetection.ts`, replace the `isBotOrPrefetch` export with:

```typescript
export type BotReason = "empty-ua" | "ua" | "prefetch";

export const classifyBotReason = (
  userAgent: string,
  prefetch: PrefetchHeaders = {},
): BotReason | null => {
  if (!userAgent.trim()) {
    return "empty-ua";
  }
  if (BOT_UA_PATTERN.test(userAgent)) {
    return "ua";
  }
  const isPrefetch = [prefetch.secPurpose, prefetch.xPurpose, prefetch.xMoz].some(
    (value) => typeof value === "string" && PREFETCH_PATTERN.test(value),
  );
  return isPrefetch ? "prefetch" : null;
};

export const isBotOrPrefetch = (userAgent: string, prefetch: PrefetchHeaders = {}): boolean =>
  classifyBotReason(userAgent, prefetch) !== null;
```

Leave `BOT_UA_PATTERN`, `PREFETCH_PATTERN` and `PrefetchHeaders` exactly as they are.

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run src/lib/botDetection.test.ts`
Expected: PASS, including every pre-existing `isBotOrPrefetch` test.

- [ ] **Step 5: Commit**

```bash
cd /Users/xce35g6/dev/private/intake-landingpage
git add src/lib/botDetection.ts src/lib/botDetection.test.ts
git commit -m "refactor: expose bot classification reason"
```

---

### Task 4: `buildClickRow` (repo: intake-landingpage)

**Files:**
- Create: `src/lib/clickTracking.ts`
- Test: `src/lib/clickTracking.test.ts`

**Interfaces:**
- Consumes: `classifyBotReason`, `BotReason`, `PrefetchHeaders` from `./botDetection.js`; `detectClientPlatform`, `ClientPlatform` from `./storeLinks.js`
- Produces:

```typescript
export interface ClickRow {
  slug: string;
  platform: ClientPlatform;
  country: string | null;
  user_agent: string;
  visitor_hash: string | null;
  click_id: string | null;
  query_params: Record<string, string> | null;
  is_bot: boolean;
  bot_reason: BotReason | null;
}

export interface ClickInput {
  slug: string;
  userAgent: string;
  country?: string;
  ip?: string;
  prefetch?: PrefetchHeaders;
  query?: Record<string, string | string[] | undefined>;
  now: Date;
  secret?: string;
}

export const buildClickRow: (input: ClickInput) => ClickRow;
```

Column names are snake_case because the object is posted straight to PostgREST as the row body.

- [ ] **Step 1: Write the failing test**

Create `src/lib/clickTracking.test.ts`:

```typescript
import { describe, expect, it } from "vitest";
import { buildClickRow } from "./clickTracking";

const IPHONE_UA =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148";
const NOW = new Date("2026-07-29T10:15:00.000Z");

const base = {
  slug: "ugc-lisa-1",
  userAgent: IPHONE_UA,
  now: NOW,
  secret: "test-secret",
};

describe("buildClickRow", () => {
  it("captures platform, country and user agent", () => {
    const row = buildClickRow({ ...base, country: "DE", ip: "1.2.3.4" });
    expect(row.slug).toBe("ugc-lisa-1");
    expect(row.platform).toBe("ios");
    expect(row.country).toBe("DE");
    expect(row.user_agent).toBe(IPHONE_UA);
  });

  it("marks bots without dropping them", () => {
    const row = buildClickRow({ ...base, userAgent: "facebookexternalhit/1.1" });
    expect(row.is_bot).toBe(true);
    expect(row.bot_reason).toBe("ua");
  });

  it("leaves human traffic unflagged", () => {
    const row = buildClickRow({ ...base, ip: "1.2.3.4" });
    expect(row.is_bot).toBe(false);
    expect(row.bot_reason).toBeNull();
  });

  it("extracts fbclid as the click id", () => {
    const row = buildClickRow({ ...base, query: { fbclid: "abc123" } });
    expect(row.click_id).toBe("abc123");
  });

  it("extracts ttclid as the click id", () => {
    const row = buildClickRow({ ...base, query: { ttclid: "tt-999" } });
    expect(row.click_id).toBe("tt-999");
  });

  it("stores remaining query params but never the slug path param", () => {
    const row = buildClickRow({
      ...base,
      query: { slug: "ugc-lisa-1", fbclid: "abc123", utm_content: "hook-a" },
    });
    expect(row.query_params).toEqual({ fbclid: "abc123", utm_content: "hook-a" });
    expect(row.query_params?.slug).toBeUndefined();
  });

  it("stores null query params when only the slug was present", () => {
    const row = buildClickRow({ ...base, query: { slug: "ugc-lisa-1" } });
    expect(row.query_params).toBeNull();
  });

  it("produces a stable hash for the same visitor within a day", () => {
    const a = buildClickRow({ ...base, ip: "1.2.3.4" });
    const b = buildClickRow({ ...base, ip: "1.2.3.4", now: new Date("2026-07-29T22:00:00.000Z") });
    expect(a.visitor_hash).toBe(b.visitor_hash);
    expect(a.visitor_hash).toMatch(/^[0-9a-f]{64}$/);
  });

  it("rotates the hash across a day boundary", () => {
    const a = buildClickRow({ ...base, ip: "1.2.3.4" });
    const b = buildClickRow({ ...base, ip: "1.2.3.4", now: new Date("2026-07-30T10:15:00.000Z") });
    expect(a.visitor_hash).not.toBe(b.visitor_hash);
  });

  it("separates different visitors on the same day", () => {
    const a = buildClickRow({ ...base, ip: "1.2.3.4" });
    const b = buildClickRow({ ...base, ip: "5.6.7.8" });
    expect(a.visitor_hash).not.toBe(b.visitor_hash);
  });

  it("omits the hash when the ip or secret is unavailable", () => {
    expect(buildClickRow({ ...base, ip: undefined }).visitor_hash).toBeNull();
    expect(buildClickRow({ ...base, ip: "1.2.3.4", secret: undefined }).visitor_hash).toBeNull();
  });

  it("normalises a missing country to null", () => {
    expect(buildClickRow({ ...base, country: "" }).country).toBeNull();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/clickTracking.test.ts`
Expected: FAIL — cannot resolve `./clickTracking`.

- [ ] **Step 3: Write the implementation**

Create `src/lib/clickTracking.ts`:

```typescript
import { createHash } from "node:crypto";
// Explicit .js extensions: this module is part of the /go function's unbundled
// ESM graph, where extensionless relative specifiers do not resolve at runtime.
import { classifyBotReason, type BotReason, type PrefetchHeaders } from "./botDetection.js";
import { detectClientPlatform, type ClientPlatform } from "./storeLinks.js";

export interface ClickRow {
  slug: string;
  platform: ClientPlatform;
  country: string | null;
  user_agent: string;
  visitor_hash: string | null;
  click_id: string | null;
  query_params: Record<string, string> | null;
  is_bot: boolean;
  bot_reason: BotReason | null;
}

export interface ClickInput {
  slug: string;
  userAgent: string;
  country?: string;
  ip?: string;
  prefetch?: PrefetchHeaders;
  query?: Record<string, string | string[] | undefined>;
  now: Date;
  secret?: string;
}

// Meta appends fbclid and TikTok appends ttclid to outbound ad clicks. Each is
// unique per click, which makes it a far sharper dedup key than the IP hash.
const CLICK_ID_KEYS = ["fbclid", "ttclid", "gclid"] as const;

// The slug arrives as a query param from the /go/<slug> rewrite, not from the
// ad platform, so it must not be stored as campaign metadata.
const RESERVED_QUERY_KEYS = new Set(["slug"]);

const firstValue = (value: string | string[] | undefined): string | undefined =>
  Array.isArray(value) ? value[0] : value;

const dayKey = (now: Date): string => now.toISOString().slice(0, 10);

const hashVisitor = (
  ip: string | undefined,
  userAgent: string,
  now: Date,
  secret: string | undefined,
): string | null => {
  if (!ip || !secret) {
    return null;
  }
  return createHash("sha256")
    .update(`${ip}|${userAgent}|${dayKey(now)}|${secret}`)
    .digest("hex");
};

const extractClickId = (query: Record<string, string | string[] | undefined>): string | null => {
  for (const key of CLICK_ID_KEYS) {
    const value = firstValue(query[key])?.trim();
    if (value) {
      return value;
    }
  }
  return null;
};

const extractQueryParams = (
  query: Record<string, string | string[] | undefined>,
): Record<string, string> | null => {
  const params: Record<string, string> = {};
  for (const [key, raw] of Object.entries(query)) {
    if (RESERVED_QUERY_KEYS.has(key)) {
      continue;
    }
    const value = firstValue(raw);
    if (typeof value === "string" && value.length > 0) {
      params[key] = value;
    }
  }
  return Object.keys(params).length > 0 ? params : null;
};

export const buildClickRow = (input: ClickInput): ClickRow => {
  const query = input.query ?? {};
  const botReason = classifyBotReason(input.userAgent, input.prefetch ?? {});

  return {
    slug: input.slug,
    platform: detectClientPlatform(input.userAgent),
    country: input.country?.trim() ? input.country.trim() : null,
    user_agent: input.userAgent,
    visitor_hash: hashVisitor(input.ip, input.userAgent, input.now, input.secret),
    click_id: extractClickId(query),
    query_params: extractQueryParams(query),
    is_bot: botReason !== null,
    bot_reason: botReason,
  };
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/clickTracking.test.ts`
Expected: PASS (12 tests)

- [ ] **Step 5: Commit**

```bash
cd /Users/xce35g6/dev/private/intake-landingpage
git add src/lib/clickTracking.ts src/lib/clickTracking.test.ts
git commit -m "feat: add pure click row builder for smart link tracking"
```

---

### Task 5: Rewrite `/go` to write to Supabase (repo: intake-landingpage)

**Files:**
- Modify: `api/go.ts`
- Modify: `package.json`
- Test: `src/lib/smartlink.test.ts` (unchanged — must still pass)

**Interfaces:**
- Consumes: `buildClickRow` from `../src/lib/clickTracking.js`, `buildSmartLinkRedirect` from `../src/lib/smartlink.js`
- Produces: rows in `public.smartlink_clicks`. No exported API changes.

`api/go.ts` is an I/O shell with no unit tests of its own — all decisions live in the tested pure modules. Verification is the live curl in Step 5.

- [ ] **Step 1: Add the dependency**

Run: `cd /Users/xce35g6/dev/private/intake-landingpage && npm install @vercel/functions`
Expected: `@vercel/functions` appears in `package.json` dependencies.

- [ ] **Step 2: Rewrite the function**

Replace the entire contents of `api/go.ts` with:

```typescript
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { waitUntil } from "@vercel/functions";
// Explicit .js extension: this function is deployed as unbundled ESM, where
// extensionless relative specifiers do not resolve at runtime.
import { buildClickRow, type ClickRow } from "../src/lib/clickTracking.js";
import { buildSmartLinkRedirect, LANDING_PAGE_URL } from "../src/lib/smartlink.js";

const recordClick = async (row: ClickRow): Promise<void> => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    return;
  }
  try {
    await fetch(`${supabaseUrl}/rest/v1/smartlink_clicks`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        apikey: serviceKey,
        authorization: `Bearer ${serviceKey}`,
        prefer: "return=minimal",
      },
      body: JSON.stringify(row),
      signal: AbortSignal.timeout(2000),
    });
  } catch {
    // Analytics must never break the redirect. A dropped click is preferable
    // to a delayed or failed hand-off to the store.
  }
};

export default function handler(req: VercelRequest, res: VercelResponse): void {
  const slug = (typeof req.query.slug === "string" ? req.query.slug : "").toLowerCase();
  const userAgent = typeof req.headers["user-agent"] === "string" ? req.headers["user-agent"] : "";
  const acceptLanguage =
    typeof req.headers["accept-language"] === "string" ? req.headers["accept-language"] : "";

  const redirect = buildSmartLinkRedirect(slug, userAgent, acceptLanguage);
  res.setHeader("cache-control", "no-store");

  if (!redirect) {
    res.redirect(302, LANDING_PAGE_URL);
    return;
  }

  const header = (name: string): string | undefined =>
    typeof req.headers[name] === "string" ? (req.headers[name] as string) : undefined;

  // Crawlers and prefetches are stored with is_bot set rather than dropped, so
  // the history can be re-filtered when the heuristic improves.
  const row = buildClickRow({
    slug,
    userAgent,
    country: header("x-vercel-ip-country"),
    ip: header("x-forwarded-for")?.split(",")[0]?.trim(),
    prefetch: {
      secPurpose: header("sec-purpose"),
      xPurpose: header("x-purpose"),
      xMoz: header("x-moz"),
    },
    query: req.query as Record<string, string | string[] | undefined>,
    now: new Date(),
    secret: process.env.SMARTLINK_HASH_SECRET,
  });

  // The 302 is sent first; the insert runs after the response is flushed.
  waitUntil(recordClick(row));
  res.redirect(302, redirect.url);
}
```

- [ ] **Step 3: Run the full landing-page suite**

Run: `cd /Users/xce35g6/dev/private/intake-landingpage && npm test`
Expected: PASS. `smartlink.test.ts`, `botDetection.test.ts`, `clickTracking.test.ts` and every other suite are green. No test references `captureSmartlinkClick`.

- [ ] **Step 4: Set the environment variables**

In the Vercel project for intake-landingpage (Production and Preview), add:
- `SUPABASE_URL` — the intake-backend Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` — the service-role key (server-side only, never `VITE_`-prefixed)
- `SMARTLINK_HASH_SECRET` — a fresh random string, e.g. `openssl rand -hex 32`

Leave `POSTHOG_KEY` in place for now; it is no longer read by `api/go.ts` and can be removed once the cutover is confirmed.

- [ ] **Step 5: Deploy and verify end to end**

Deploy, then run:

```bash
curl -sI -A "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148" \
  -H "accept-language: de-DE,de;q=0.9" \
  "https://www.getintake.de/go/ugc-lisa-1?fbclid=plan-verification" | grep -i '^location'
```

Expected: `location: https://apps.apple.com/de/app/intake-kalorienz%C3%A4hler/id6757768955?pt=128030281&ct=ugc-lisa-1&mt=8`

Then in the Supabase SQL editor:

```sql
select slug, platform, country, click_id, is_bot, bot_reason, visitor_hash is not null as hashed
from public.smartlink_clicks
order by created_at desc
limit 5;
```

Expected: a row with `slug = 'ugc-lisa-1'`, `platform = 'ios'`, `click_id = 'plan-verification'`, `is_bot = false`.

- [ ] **Step 6: Commit**

```bash
cd /Users/xce35g6/dev/private/intake-landingpage
git add api/go.ts package.json package-lock.json
git commit -m "feat: write smart link clicks to Supabase instead of PostHog"
```

---

### Task 6: Dashboard queries (repo: intake-backend)

**Files:**
- Modify: `dashboard/lib/queries.ts`
- Test: `dashboard/lib/queries.test.ts`

**Interfaces:**
- Consumes: RPCs from Task 2; existing `createDashboardServiceClient` from `./supabase`, existing `rpcOrThrow` helper at `queries.ts:139`, existing `numberField`/`stringField` helpers at `queries.ts:248-254`
- Produces:

```typescript
export type SmartlinkCreativeRow = {
  slug: string;
  source: string;
  clicks: number;
  dedupedClicks: number;
  botHits: number;
  iosClicks: number;
  androidClicks: number;
  androidPurchases: number;
  androidConversionPct: number | null;
};

export type SmartlinkDailyRow = {
  day: string;
  source: string;
  clicks: number;
  dedupedClicks: number;
  androidPurchases: number;
};

export type SmartlinkAttributionData = {
  periodDays: number;
  since: string;
  until: string;
  trackingStartedAt: string | null;
  creatives: SmartlinkCreativeRow[];
  daily: SmartlinkDailyRow[];
};

export function normalizeSmartlinkPeriod(value: unknown): number;
export function smartlinkPeriodRange(periodDays: number, today: Date): { since: string; until: string };
export async function fetchSmartlinkAttributionData(periodValue: unknown): Promise<SmartlinkAttributionData>;
```

- [ ] **Step 1: Write the failing test**

`dashboard/lib/queries.test.ts` already exists with a multi-name import block from `./queries` starting at line 4. Add `normalizeSmartlinkPeriod` and `smartlinkPeriodRange` to that existing import list — do not add a second import statement — then append this block to the end of the file:

```typescript
describe('smart link attribution helpers', () => {
  it('accepts the supported periods and defaults to 7 days', () => {
    expect(normalizeSmartlinkPeriod('7d')).toBe(7);
    expect(normalizeSmartlinkPeriod('30')).toBe(30);
    expect(normalizeSmartlinkPeriod('90d')).toBe(90);
    expect(normalizeSmartlinkPeriod('nonsense')).toBe(7);
    expect(normalizeSmartlinkPeriod(undefined)).toBe(7);
  });

  it('builds an inclusive date range ending today', () => {
    expect(smartlinkPeriodRange(7, new Date('2026-07-29T09:00:00Z'))).toEqual({
      since: '2026-07-23',
      until: '2026-07-29',
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd /Users/xce35g6/dev/private/intake-backend/dashboard && npx vitest run lib/queries.test.ts`
Expected: FAIL — `normalizeSmartlinkPeriod` is not exported.

- [ ] **Step 3: Write the implementation**

Add to `dashboard/lib/queries.ts`. Place the constant beside the other period constants near line 134, and the rest at the end of the file:

```typescript
const SMARTLINK_PERIODS = new Set([7, 30, 90]);

export type SmartlinkCreativeRow = {
  slug: string;
  source: string;
  clicks: number;
  dedupedClicks: number;
  botHits: number;
  iosClicks: number;
  androidClicks: number;
  androidPurchases: number;
  androidConversionPct: number | null;
};

export type SmartlinkDailyRow = {
  day: string;
  source: string;
  clicks: number;
  dedupedClicks: number;
  androidPurchases: number;
};

export type SmartlinkAttributionData = {
  periodDays: number;
  since: string;
  until: string;
  trackingStartedAt: string | null;
  creatives: SmartlinkCreativeRow[];
  daily: SmartlinkDailyRow[];
};

export function normalizeSmartlinkPeriod(value: unknown) {
  const raw = String(value ?? '').trim().toLowerCase().replace(/d$/, '');
  const parsed = Number.parseInt(raw, 10);
  return SMARTLINK_PERIODS.has(parsed) ? parsed : 7;
}

export function smartlinkPeriodRange(periodDays: number, today: Date) {
  const until = new Date(today);
  const since = new Date(today);
  // Inclusive range: a 7-day period covers today and the six days before it.
  since.setUTCDate(since.getUTCDate() - (periodDays - 1));
  return {
    since: since.toISOString().slice(0, 10),
    until: until.toISOString().slice(0, 10),
  };
}

function toCreativeRow(row: Record<string, unknown>): SmartlinkCreativeRow {
  const conversion = row.android_conversion_pct;
  return {
    slug: stringField(row.slug),
    source: stringField(row.source),
    clicks: numberField(row.clicks),
    dedupedClicks: numberField(row.deduped_clicks),
    botHits: numberField(row.bot_hits),
    iosClicks: numberField(row.ios_clicks),
    androidClicks: numberField(row.android_clicks),
    androidPurchases: numberField(row.android_purchases),
    androidConversionPct: typeof conversion === 'number' ? conversion : null,
  };
}

function toDailyRow(row: Record<string, unknown>): SmartlinkDailyRow {
  return {
    day: stringField(row.day),
    source: stringField(row.source),
    clicks: numberField(row.clicks),
    dedupedClicks: numberField(row.deduped_clicks),
    androidPurchases: numberField(row.android_purchases),
  };
}

export async function fetchSmartlinkAttributionData(
  periodValue: unknown,
): Promise<SmartlinkAttributionData> {
  const periodDays = normalizeSmartlinkPeriod(periodValue);
  const { since, until } = smartlinkPeriodRange(periodDays, new Date());
  const client = createDashboardServiceClient();

  const [creativeRows, dailyRows, firstClick] = await Promise.all([
    rpcOrThrow(client, 'smartlink_performance', { p_since: since, p_until: until }),
    rpcOrThrow(client, 'smartlink_daily', { p_since: since, p_until: until }),
    client
      .from('smartlink_clicks')
      .select('created_at')
      .order('created_at', { ascending: true })
      .limit(1)
      .maybeSingle(),
  ]);

  return {
    periodDays,
    since,
    until,
    trackingStartedAt: (firstClick.data?.created_at as string | undefined) ?? null,
    creatives: (creativeRows as Array<Record<string, unknown>>).map(toCreativeRow),
    daily: (dailyRows as Array<Record<string, unknown>>).map(toDailyRow),
  };
}
```

Note: `numberField` (line 248), `stringField` (line 252), `rpcOrThrow` (line 139) and the `createDashboardServiceClient` import (line 8) all already exist in this file — do not redefine or re-import them. `rpcOrThrow` takes `QueueClient = Pick<SupabaseClient, 'rpc' | 'from'>`, which the service client satisfies.

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd /Users/xce35g6/dev/private/intake-backend/dashboard && npx vitest run lib/queries.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
cd /Users/xce35g6/dev/private/intake-backend
git add dashboard/lib/queries.ts dashboard/lib/queries.test.ts
git commit -m "feat: add smart link attribution queries"
```

---

### Task 7: Attribution page (repo: intake-backend)

**Files:**
- Create: `dashboard/app/attribution/page.tsx`
- Create: `dashboard/app/attribution/page.test.tsx`
- Modify: `dashboard/app/layout.tsx:8-17`

**Interfaces:**
- Consumes: `fetchSmartlinkAttributionData`, `normalizeSmartlinkPeriod`, `SmartlinkAttributionData`, `SmartlinkCreativeRow`, `SmartlinkDailyRow` from `../../lib/queries`; `requireDashboardAccess` from `../../lib/supabase`
- Produces: route `/attribution`

- [ ] **Step 1: Write the failing test**

Create `dashboard/app/attribution/page.test.tsx`:

```tsx
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

import AttributionPage from './page';

const mocks = vi.hoisted(() => ({
  requireDashboardAccess: vi.fn(async () => ({ id: 'admin-1' })),
  fetchSmartlinkAttributionData: vi.fn(),
}));

vi.mock('../../lib/supabase', () => ({
  requireDashboardAccess: mocks.requireDashboardAccess,
}));

vi.mock('../../lib/queries', () => ({
  normalizeSmartlinkPeriod: vi.fn(() => 7),
  fetchSmartlinkAttributionData: mocks.fetchSmartlinkAttributionData,
}));

const populated = {
  periodDays: 7,
  since: '2026-07-23',
  until: '2026-07-29',
  trackingStartedAt: '2026-07-29T08:00:00Z',
  creatives: [
    {
      slug: 'ugc-lisa-1',
      source: 'ugc',
      clicks: 420,
      dedupedClicks: 380,
      botHits: 55,
      iosClicks: 240,
      androidClicks: 140,
      androidPurchases: 3,
      androidConversionPct: 2.14,
    },
    {
      slug: 'website',
      source: 'website',
      clicks: 0,
      dedupedClicks: 0,
      botHits: 0,
      iosClicks: 0,
      androidClicks: 0,
      androidPurchases: 6,
      androidConversionPct: null,
    },
  ],
  daily: [
    { day: '2026-07-29', source: 'ugc', clicks: 210, dedupedClicks: 190, androidPurchases: 2 },
  ],
};

const empty = {
  periodDays: 7,
  since: '2026-07-23',
  until: '2026-07-29',
  trackingStartedAt: null,
  creatives: [],
  daily: [],
};

describe('AttributionPage', () => {
  it('renders creative rows with android-only conversion', async () => {
    mocks.fetchSmartlinkAttributionData.mockResolvedValueOnce(populated);
    const markup = renderToStaticMarkup(
      await AttributionPage({ searchParams: Promise.resolve({ period: '7d' }) }),
    );

    expect(markup).toContain('ugc-lisa-1');
    expect(markup).toContain('2.14%');
    expect(markup).toContain('€14.97');
    expect(markup).toContain('Conversion is Android-only');
  });

  it('shows a dash instead of a conversion figure when there are no android clicks', async () => {
    mocks.fetchSmartlinkAttributionData.mockResolvedValueOnce(populated);
    const markup = renderToStaticMarkup(
      await AttributionPage({ searchParams: Promise.resolve({ period: '7d' }) }),
    );

    expect(markup).toContain('website');
    expect(markup).not.toContain('null%');
  });

  it('renders an empty state before any clicks are tracked', async () => {
    mocks.fetchSmartlinkAttributionData.mockResolvedValueOnce(empty);
    const markup = renderToStaticMarkup(
      await AttributionPage({ searchParams: Promise.resolve({}) }),
    );

    expect(markup).toContain('No smart link clicks in this period.');
    expect(markup).toContain('No daily activity in this period.');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd /Users/xce35g6/dev/private/intake-backend/dashboard && npx vitest run app/attribution/page.test.tsx`
Expected: FAIL — cannot resolve `./page`.

- [ ] **Step 3: Write the page**

Create `dashboard/app/attribution/page.tsx`:

```tsx
import Link from 'next/link';
import React from 'react';

import {
  fetchSmartlinkAttributionData,
  normalizeSmartlinkPeriod,
  type SmartlinkAttributionData,
  type SmartlinkCreativeRow,
  type SmartlinkDailyRow,
} from '../../lib/queries';
import { requireDashboardAccess } from '../../lib/supabase';

type AttributionPageProps = {
  searchParams: Promise<{ period?: string }>;
};

// 6.99 gross, less 19% German VAT, less the 15% Small Business Program commission.
const NET_EUR_PER_SALE = 4.99;

const integerFormatter = new Intl.NumberFormat('en-US');
const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function integer(value: number) {
  return integerFormatter.format(value ?? 0);
}

function conversion(value: number | null) {
  return typeof value === 'number' ? `${value.toFixed(2)}%` : '—';
}

function netRevenue(purchases: number) {
  return currencyFormatter.format(purchases * NET_EUR_PER_SALE);
}

function periodHref(days: number) {
  return { pathname: '/attribution', query: { period: `${days}d` } };
}

function totals(creatives: SmartlinkCreativeRow[]) {
  return creatives.reduce(
    (acc, row) => ({
      clicks: acc.clicks + row.clicks,
      dedupedClicks: acc.dedupedClicks + row.dedupedClicks,
      botHits: acc.botHits + row.botHits,
      androidPurchases: acc.androidPurchases + row.androidPurchases,
    }),
    { clicks: 0, dedupedClicks: 0, botHits: 0, androidPurchases: 0 },
  );
}

function SummaryCards({ data }: { data: SmartlinkAttributionData }) {
  const summary = totals(data.creatives);
  return (
    <section className="stat-grid">
      <div className="stat-card">
        <div className="stat-label">Clicks (raw)</div>
        <div className="stat-value">{integer(summary.clicks)}</div>
      </div>
      <div className="stat-card">
        <div className="stat-label">Clicks (deduped)</div>
        <div className="stat-value">{integer(summary.dedupedClicks)}</div>
      </div>
      <div className="stat-card">
        <div className="stat-label">Bot hits excluded</div>
        <div className="stat-value">{integer(summary.botHits)}</div>
      </div>
      <div className="stat-card">
        <div className="stat-label">Android purchases</div>
        <div className="stat-value">{integer(summary.androidPurchases)}</div>
      </div>
      <div className="stat-card">
        <div className="stat-label">Est. net revenue</div>
        <div className="stat-value">{netRevenue(summary.androidPurchases)}</div>
      </div>
    </section>
  );
}

function CreativeSection({ creatives }: { creatives: SmartlinkCreativeRow[] }) {
  return (
    <section className="panel">
      <div className="section-title">
        <h2>By Creative</h2>
        <div className="section-meta">
          Conversion is Android-only — iOS gives no per-install attribution, so roughly half
          the ad spend has clicks but no measurable conversion.
        </div>
      </div>
      <div className="table-list">
        {creatives.length === 0 ? (
          <div className="muted">No smart link clicks in this period.</div>
        ) : creatives.map((row) => (
          <div className="table-row" key={row.slug}>
            <div className="table-main">
              <div className="table-title">{row.slug}</div>
              <div className="table-subtitle">
                {row.source} · {integer(row.iosClicks)} iOS · {integer(row.androidClicks)} Android
                {row.botHits > 0 ? ` · ${integer(row.botHits)} bot hits excluded` : ''}
              </div>
            </div>
            <div className="table-meta">
              <span>{integer(row.dedupedClicks)} clicks</span>
              <span>{integer(row.clicks)} raw</span>
              <span>{integer(row.androidPurchases)} purchases</span>
              <span>{conversion(row.androidConversionPct)}</span>
              <span>{netRevenue(row.androidPurchases)}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function DailySection({ daily }: { daily: SmartlinkDailyRow[] }) {
  return (
    <section className="panel">
      <div className="section-title">
        <h2>By Day</h2>
        <div className="section-meta">
          Clicks and purchases are joined same-day, so an install the morning after a click
          lands on the later date.
        </div>
      </div>
      <div className="table-list">
        {daily.length === 0 ? (
          <div className="muted">No daily activity in this period.</div>
        ) : daily.map((row) => (
          <div className="table-row" key={`${row.day}-${row.source}`}>
            <div className="table-main">
              <div className="table-title">{row.day}</div>
              <div className="table-subtitle">{row.source}</div>
            </div>
            <div className="table-meta">
              <span>{integer(row.dedupedClicks)} clicks</span>
              <span>{integer(row.androidPurchases)} purchases</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default async function AttributionPage({ searchParams }: AttributionPageProps) {
  await requireDashboardAccess();
  const params = await searchParams;
  const periodDays = normalizeSmartlinkPeriod(params?.period);
  const data = await fetchSmartlinkAttributionData(periodDays);

  return (
    <>
      <section className="panel toolbar">
        <div>
          <div className="eyebrow">Acquisition</div>
          <h1>Attribution</h1>
          <p>
            Smart link clicks joined to Android purchases by campaign slug.{' '}
            {data.trackingStartedAt
              ? `Click tracking starts ${data.trackingStartedAt.slice(0, 10)} — earlier dates show purchases only.`
              : 'No clicks tracked yet.'}
          </p>
        </div>
        <div className="pill-row">
          {[7, 30, 90].map((days) => (
            <Link
              key={days}
              className={days === data.periodDays ? 'pill' : 'section-meta'}
              href={periodHref(days)}
            >
              Last {days} days
            </Link>
          ))}
        </div>
      </section>

      <SummaryCards data={data} />
      <CreativeSection creatives={data.creatives} />
      <DailySection daily={data.daily} />
    </>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd /Users/xce35g6/dev/private/intake-backend/dashboard && npx vitest run app/attribution/page.test.tsx`
Expected: PASS (3 tests)

- [ ] **Step 5: Add the nav entry**

In `dashboard/app/layout.tsx`, add to the `navItems` array immediately after the `Overview` entry:

```typescript
  { href: '/attribution', label: 'Attribution' },
```

- [ ] **Step 6: Run the full dashboard suite and build**

Run: `cd /Users/xce35g6/dev/private/intake-backend/dashboard && npx vitest run && npm run build`
Expected: all tests PASS and the Next.js build succeeds with `/attribution` listed in the route output.

- [ ] **Step 7: Commit**

```bash
cd /Users/xce35g6/dev/private/intake-backend
git add dashboard/app/attribution dashboard/app/layout.tsx
git commit -m "feat: add smart link attribution dashboard page"
```

---

## Post-Implementation Verification

Once Task 5 has been deployed for 24 hours, check the two assumptions recorded in section 7 of the spec:

```sql
-- 1. Do the ad platforms actually send fbclid / ttclid?
select
  count(*) as hits,
  count(click_id) as with_click_id,
  count(*) filter (where query_params ? 'fbclid') as fbclid_hits,
  count(*) filter (where query_params ? 'ttclid') as ttclid_hits
from public.smartlink_clicks
where not is_bot;

-- 2. What do the platforms actually append? Adjust CLICK_ID_KEYS if these differ.
select distinct jsonb_object_keys(query_params) as param
from public.smartlink_clicks
where query_params is not null;
```

If `with_click_id` is near zero, `deduped_clicks` is running on the `visitor_hash` fallback and `CLICK_ID_KEYS` in `src/lib/clickTracking.ts` needs the real parameter names.

Then compare `deduped_clicks` per slug against Meta's and TikTok's reported link clicks. Deduped clicks should land at or slightly below the platform figures. If they still run materially above, there is a second inflation source the spec did not account for.
