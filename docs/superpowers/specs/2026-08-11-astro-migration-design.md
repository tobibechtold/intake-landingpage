# Astro migration + visual refresh — design

**Date:** 2026-08-11
**Branch:** `feat/astro-migration`
**Status:** approved, pending implementation plan

## Problem

Two problems, deliberately kept separate throughout this design.

**1. Crawlers and AI see a different, much thinner site than users.**
`scripts/prerender-seo.js` is 1098 lines of hand-maintained shadow content. At build time it
injects a stripped `<main id="static-prerender-content">` into each route's HTML, which React
discards on hydration. Googlebot sees roughly 200 words on `/` — an `h1`, three short sections
and a nav list — while users see Hero, Features, ComparisonTable, ProofStories, PressMentions,
Faq and Reviews. Every page exists twice and the two copies are kept in sync by hand.

This matters disproportionately here: at ~€4.99 net per sale and a break-even CPC around €0.07,
organic long-tail is where the margin lives. The intent and comparison pages are the asset.

**2. The visual identity reads as generated.**
Dark glassmorphism, glowing text shadows, pink→orange gradient headlines, 2rem glass cards.
(The repo is `vite_react_shadcn_ts` with `lovable-tagger` still in dependencies.)

## Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Framework | **Astro, static output** | Not SSR. Static renders real HTML at build, is CDN-cacheable, free to serve, and has no request-time failure mode. Same SEO outcome, strictly better operationally. |
| Repo | **In place, not a new project** | Astro runs on Vite. Tailwind config, `src/lib`, `src/components`, `api/go.ts`, the Vercel project, domain and git history all survive. A fresh repo would mean re-wiring the cross-repo attribution chain for zero gain. |
| Template | **Do not buy AppView** | AppView is Next.js (`x-powered-by: Next.js`, `_next/static`), not Astro. It has no i18n and covers ~3 of 22 routes. The chosen visual direction is an evolution of the existing identity, so the template buys nothing. |
| Visual direction | **A — Refined Dark** | Keeps near-black + pink `#F53D8A`. Drops glow, gradient text and 2rem glass. Tighter type (-0.035em), white primary button, hairline-divided stats. Reuses existing tokens — no light palette to author. |
| Sequencing | **Shell first, then page by page** | Astro renders React islands to HTML at build time, so crawlers get full real content before any component is rewritten. `prerender-seo.js` dies in step 1. |
| Tests | **Astro Container API** | `experimental_AstroContainer` from `astro/container`, works in vitest. |
| Locale UX | **Root-only redirect, bots excluded** | See "Locale redirect" below. |

## Architecture

### Config

`astro.config.mjs`: `output: 'static'`, `@astrojs/vercel`, `@astrojs/react`, `@astrojs/tailwind`,
`@astrojs/sitemap`, and:

```js
i18n: {
  locales: ['de', 'en'],
  defaultLocale: 'de',
  routing: { prefixDefaultLocale: false }
},
trailingSlash: 'never'
```

DE unprefixed at the root, EN under `/en`. **Every existing URL survives byte-for-byte** — nothing
is redirected, nothing loses rankings. `trailingSlash: 'never'` is required so Astro emits `/en`
rather than `/en/`, otherwise the locale redirect chains `/` → `/en` → `/en/`.

### Routing

Astro derives translated slugs from independently-named files per locale folder, which matches the
existing scheme exactly:

```
src/pages/
  index.astro                        →  /
  funktionen.astro                   →  /funktionen
  kalorienzaehler-ohne-abo.astro     →  /kalorienzaehler-ohne-abo
  kalorien-tracker-ohne-konto.astro  →  /kalorien-tracker-ohne-konto
  intake-ai.astro                    →  /intake-ai
  vergleiche/index.astro             →  /vergleiche
  vergleiche/[slug].astro            →  /vergleiche/:slug
  hilfe/index.astro                  →  /hilfe
  hilfe/eigener-api-schluessel.astro →  /hilfe/eigener-api-schluessel
  privacy.astro   terms.astro
  whats-new/index.astro   whats-new/[version].astro
  404.astro
  en/
    index.astro                      →  /en
    features.astro                   →  /en/features
    calorie-counter-no-subscription.astro
    calorie-tracker-no-account.astro
    intake-ai.astro
    comparisons/index.astro   comparisons/[slug].astro
    help/index.astro          help/own-api-key.astro
    privacy.astro   terms.astro
    whats-new/index.astro     whats-new/[version].astro
```

`/privacy` and `/terms` keep their English-looking slugs on the DE side — they are live URLs and
renaming them buys nothing.

### The duplication trap

26 route files for 13 logical pages. If page content lives in the route files, this rebuilds
`prerender-seo.js`'s exact problem in a new costume.

**Rule: route files stay thin.** Each is a handful of lines rendering one shared page component with
a `lang` prop. Content lives once in `src/components/pages/`. One page, one source of truth, two URLs.

### What stays React

Most "interactive" components need no JS at all:

| Component | Fate |
|---|---|
| `Faq` | native `<details>`, no JS |
| `LanguageSwitcher` | plain `<a>` links, no JS |
| `ScrollToTop`, `LocaleRedirect` | deleted — router artifacts |
| `ScreenshotGallery` (embla) | stays React, `client:visible` |
| `FeatureVoting` | stays React, `client:visible` |
| `Header` mobile nav | small inline script |
| `Toaster` / `Sonner` | deleted — no toasts on a marketing site |

Dependencies removed: `react-router-dom`, `@tanstack/react-query`, `next-themes`, `recharts`,
`vaul`, `cmdk`, `react-hook-form`, `input-otp`, `react-day-picker`, `react-resizable-panels`, and
most of the 27 Radix packages behind the 49 largely-unimported `src/components/ui/` files.

### What does not move

`api/go.ts` stays exactly as-is — same Vercel function, same `/go/*` rewrite. The attribution chain
is cross-repo and is treated as untouchable. `src/lib/` tracking modules (`attribution`,
`clickTracking`, `smartlink`, `storeLinks`, `botDetection`, `inAppBrowser`) carry over unchanged,
moving from React mount to a plain client script.

The only `vercel.json` deletion is the SPA catch-all `{"src": "/.*", "dest": "/index.html"}`.

### Deleted

- `scripts/prerender-seo.js` (1098 lines)
- `scripts/prerender.mjs`
- `scripts/sitemap.js` → `@astrojs/sitemap`, which generates hreflang pairs from the i18n config
- `src/lib/whatsNewContent.ts` hand-rolled markdown parser (~200 lines)
- `scripts/whats-new-content.js`

## Locale redirect

### Background — this already broke once

`src/lib/localeRedirect.ts:3-15` looks like language detection but is inert: `_browserLanguage` is
underscore-prefixed and unused, `preferredLanguage` is discarded via `void`. Only the legacy `/de/*`
redirect remains.

**This was removed deliberately: Google indexed only the English pages.** Googlebot crawls
predominantly from US IPs sending `Accept-Language: en`, so a naive redirect sent the crawler to
`/en` and the German homepage — the page ranking for "Kalorienzähler ohne Abo" — fell out of the
index. The bot bypass below is the sole reason this is safe to re-enable.

### Design

```json
{
  "source": "/",
  "has":     [{ "type": "header", "key": "accept-language", "value": "^en(-[A-Za-z]+)?\\b.*" }],
  "missing": [
    { "type": "cookie", "key": "intake_lang" },
    { "type": "header", "key": "user-agent", "value": ".*(bot|crawler|spider|slurp|headless|preview).*" }
  ],
  "destination": "/en",
  "permanent": false
}
```

Redirect only when the visitor explicitly prefers English, **and** has no pinned language cookie,
**and** does not look like a crawler. Vercel evaluates `has`/`missing` redirects across the CDN with
no function invoked, so `/` stays a static file.

Four properties, each aimed at the failure that actually happened:

- **`missing` user-agent — the bot bypass.** Googlebot, Bingbot, GPTBot, ClaudeBot and
  PerplexityBot all carry `bot` in the UA and are never redirected. `/` stays German for crawlers.
  The pattern mirrors `classifyBot()` in `src/lib/botDetection.ts:11`. A false positive just means a
  human sees German — today's behaviour — so the failure mode is benign.
- **`has` requires an explicit `en` preference,** not merely "not German". Crawlers sending no
  `Accept-Language` fall through to German instead of being caught by a not-de rule. This is the
  subtle form of the original bug.
- **`permanent: false` → 307.** A cached 308 in Google's index is painful to unwind; this is
  retractable in one deploy.
- **`intake_lang` cookie,** set on any manual language switch, pins the choice and disables the
  redirect for that visitor.

Scope: `/` only. Never `/go/*`, never the German keyword landing pages.

### Open implementation risk

1. Vercel documents `value` with an exact match (`"GB"`). Regex in `value` works in the equivalent
   Next.js API and is expected to work here, but is **not confirmed** for `vercel.json`.
2. Vercel's docs state `has` **does not work under `vercel dev`** — deployed only. This cannot be
   verified locally.

**Hard gate: verify on the preview deployment before this reaches production.**

```bash
curl -sI -H 'Accept-Language: en-US,en;q=0.9' $P/                                   # → 307 /en
curl -sI -H 'Accept-Language: en-US,en;q=0.9' -A 'Mozilla/5.0 (compatible; Googlebot/2.1)' $P/  # → 200 German
curl -sI -H 'Accept-Language: de-DE,de;q=0.9' $P/                                   # → 200 German
curl -sI -H 'Accept-Language: en-US' -b 'intake_lang=de' $P/                        # → 200 German
```

If regex in `value` does not behave, the fallback is an Astro middleware function scoped to `/`
alone, accepting that `/` becomes on-demand rather than static.

Post-production: GSC **URL Inspection → View crawled page** on `/` must show German HTML. That is
the check that would have caught the original incident.

## Content collection

`content/whats-new/<version>/{de,en}.md` — 20 versions × 2 locales (40 files), uniform frontmatter
(`version`, `publishedAt`, `title`, `summary`, `coverImage`, `highlights[]`). Maps directly onto
`src/content.config.ts` with a glob loader over `content/whats-new/*/{de,en}.md` and a Zod schema.
Collection ids take the form `2.5.1/de`; version and locale parse from the id.

Build-time validation means a malformed release note fails the build rather than shipping blank.

**Video-in-image-syntax.** Assets are referenced as `![New Nutrients](assets/nutrients.mp4)` — 63
bare `assets/…` and 31 `./assets/…` references. Both forms resolve identically today because
`getAssetModuleKey` strips the leading `./`; there is no bug to fix. But Astro's markdown pipeline
will emit `<img src="…mp4">` for the video references. Fix: one **remark plugin** rewriting
`![…](*.mp4|*.webm)` into a `<video>` element. ~20 lines replacing ~200.

## Testing

19 `src/lib/*.test.ts` files are pure-function tests and survive untouched.

18 component/page `.test.tsx` files port to the Astro Container API as their pages convert:

```js
import { experimental_AstroContainer } from 'astro/container';
const container = await experimental_AstroContainer.create();
const html = await container.renderToString(Component);
```

The API is experimental and Astro's docs warn it is "subject to breaking changes, even in minor or
patch releases". Accepted: it is test-only, so a break costs a red CI run, never a broken page.
Mitigation — pin the Astro version and read the changelog on upgrade.

**Additional build-output test (new).** Freeze the current production URL list into a fixture and
assert the built `dist/` contains exactly those paths, plus per-route `<title>`, canonical, hreflang
pair and `h1`. This tests what crawlers actually see, which is the point of the migration, and
fails the build on URL drift.

## Conversion order

Each step ships independently. Refined Dark is applied per page during conversion, since the markup
is being rewritten anyway.

| # | Step | Why here |
|---|---|---|
| 1 | Shell: config, i18n, layouts, `<head>`/SEO, sitemap, content collection | **`prerender-seo.js` dies** — real HTML for crawlers immediately |
| 2 | `/` + `/en` | highest traffic; where the locale redirect lands |
| 3 | `/kalorienzaehler-ohne-abo`, `/kalorien-tracker-ohne-konto` + EN | intent-keyword pages |
| 4 | `/vergleiche` + `[slug]` + EN | long-tail comparison surface |
| 5 | `/funktionen`, `/intake-ai` + EN | |
| 6 | `/hilfe`, `/hilfe/eigener-api-schluessel` + EN | |
| 7 | `/privacy`, `/terms`, `404` | lowest stakes |
| 8 | Cleanup: prune `ui/`, drop dead deps, delete `scripts/`, generate `llms.txt` | |

## Risks

1. **Locale redirect re-breaks German indexing.** Already cost them once. Mitigated by the preview
   curl gate, the GSC check, and 307-not-308 retractability.
2. **URL drift** — a stray trailing slash or casing change silently 404s a ranking page. Mitigated
   by the frozen URL fixture asserted against `dist/`.
3. **Attribution breakage.** `api/go.ts` is untouched, but the client tracking modules move from
   React mount to a plain script. A real `/go/…` click must be verified end-to-end on preview
   before merge.
4. **Container API churn.** Pin Astro; test-only blast radius.
5. **`llms.txt` / `llms-full.txt`** are hand-written in `public/` and survive untouched, but given
   the goal is AI readability they should be generated from the content collection at step 8 rather
   than left to drift.

## Out of scope

- Buying or adapting AppView.
- A light-mode palette or theme toggle.
- Any change to `api/go.ts` or the cross-repo attribution schema.
- Renaming existing URLs.
- Redirecting deep pages by language — root only.
