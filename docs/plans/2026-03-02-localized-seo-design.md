# Localized URL SEO Design

## Scope
Implement crawlable localized URLs for English and German, plus SEO correctness fixes on the landing site.

## Goals
- Use path-based locale URLs instead of query param language variants.
- Ensure canonical and hreflang are route- and locale-correct.
- Ensure structured data is accurate and matches visible content.
- Add visible FAQ section to match FAQ structured data.
- Improve crawlability artifacts (robots + sitemap) and semantics (`main`).

## URL Design
English routes:
- `/`
- `/privacy`
- `/terms`

German routes:
- `/de`
- `/de/privacy`
- `/de/terms`

## SEO Metadata Design
- Route-aware metadata managed in app (title/description/canonical/alternates/OG/Twitter).
- Canonical points to current locale URL.
- `hreflang` cluster for `en`, `de`, `x-default` on each localized page pair.

## Structured Data Design
- Move JSON-LD from static `index.html` into route-aware React head management for homepage only.
- Keep `SoftwareApplication`, `Organization`, `FAQPage`.
- Remove `WebSite` `SearchAction` because site search does not exist.
- Correct screenshot URLs and offer information.
- Keep FAQ schema aligned with visible FAQ section content.

## Content and Semantics
- Add visible FAQ section on home page with localized strings.
- Wrap primary home content in `<main>`.

## Crawlability
- Add sitemap declaration to `robots.txt`.
- Extend `sitemap.xml` with `/de`, `/de/privacy`, `/de/terms`.

## Implementation Notes
- Locale source of truth for rendering/crawling is URL path prefix.
- Language switcher navigates to equivalent localized path.
- Existing localStorage preference remains secondary; URL determines initial language.

## Verification
- Unit tests for locale path detection/mapping and metadata generation.
- Run existing tests.
- Build and verify no type errors.
- Manual spot check for canonical/hreflang on `/` and `/de`.
