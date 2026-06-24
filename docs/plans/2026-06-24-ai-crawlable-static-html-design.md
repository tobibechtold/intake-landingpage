# AI Crawlable Static HTML Design

## Goal

Make Intake's landing pages easier for AI search systems and non-JavaScript crawlers to understand by shipping real static HTML for every prerendered route, with English and German treated equally.

## Context

The site already prerenders per-route metadata and emits a sitemap, but the generated route bodies still contain only an empty React mount node. Browser users see the full app after JavaScript runs, while simple crawlers only see titles, descriptions, Open Graph tags, and an empty body.

## Approach

Keep the current Vite and React architecture. Add build-time static body snapshots to the existing prerender pipeline instead of adding a runtime SSR server.

The static body should be semantic and concise:

- A route-specific `main` block inside `#root`
- `h1`, intro copy, section headings, body text, bullet lists, and canonical links
- Bilingual content for `/kalorienzaehler-ohne-abo` and `/en/calorie-counter-no-subscription`
- Useful content for every prerendered evergreen marketing, comparison, help, legal, Intake AI, and What's New page

When JavaScript loads, the existing `createRoot` client app replaces the static fallback. This avoids hydration risk while still making the initial HTML useful to crawlers that do not render JavaScript.

## AI Search Additions

In the same optimization track, add:

- Explicit `OAI-SearchBot` allowance in `robots.txt`
- `/llms.txt` with a bilingual curated overview of Intake
- Optional `/llms-full.txt` with fuller product, pricing, privacy, and comparison context
- FAQ and software structured data for intent pages in a later pass

## Testing

Add regression tests around `buildPrerenderedHtml` to prove that route-specific body text appears in the returned HTML. Build verification should inspect the generated `dist` files and confirm every prerendered page contains section-level body content, not only `<div id="root"></div>`.
