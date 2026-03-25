# Default German Routing Design

## Goal

Make German the default locale for the `www.getintake.de` site, move English to `/en` paths, and preserve existing `/de` links through redirects.

## Approved Constraints

- German becomes the default locale on unprefixed routes
- English becomes the explicit `/en` locale
- old `/de` routes must keep working via redirects to the new German-default paths
- first-time visitors with a non-German browser language should be redirected to the matching `/en` route
- a stored language preference should override browser-language detection

## Current State

The app currently assumes the opposite locale structure:

- English is the default locale on unprefixed routes
- German uses `/de`
- locale helpers, routes, SEO alternates, prerender output, and sitemap output all encode that assumption
- browser-language redirect logic sends German browsers from unprefixed English routes to `/de`

That structure no longer matches the `.de` domain strategy.

## Route Design

### Canonical German Routes

German becomes canonical on unprefixed routes:

- `/`
- `/privacy`
- `/terms`
- `/whats-new`
- `/whats-new/:version`

### Canonical English Routes

English moves to `/en` routes:

- `/en`
- `/en/privacy`
- `/en/terms`
- `/en/whats-new`
- `/en/whats-new/:version`

### Legacy German Compatibility Routes

Old German-prefixed URLs should redirect to their new German canonical paths:

- `/de` -> `/`
- `/de/privacy` -> `/privacy`
- `/de/terms` -> `/terms`
- `/de/whats-new` -> `/whats-new`
- `/de/whats-new/:version` -> `/whats-new/:version`

These routes exist only for backward compatibility and should not remain canonical.

## Locale Detection Design

### Path-Based Locale Rules

- `/en` and `/en/...` map to English
- unprefixed routes map to German
- `/de` and `/de/...` are treated as legacy German aliases for redirect purposes

### Browser-Language Redirect Rules

For first-time visitors:

- if browser language starts with `de`, stay on the German default route
- if browser language does not start with `de`, redirect from the matching German-default route to the equivalent `/en` route

Stored preference wins:

- stored `de` prevents an English redirect
- stored `en` triggers the English route even if the browser prefers German

Unknown routes should never be auto-redirected.

## SEO Design

Canonical and alternate URLs should use only the new canonical locale structure:

- German canonical URLs are unprefixed
- English canonical URLs are `/en`-prefixed
- `hreflang="de"` points to the unprefixed German path
- `hreflang="en"` points to the `/en` path
- `x-default` points to `/`

Legacy `/de` routes should disappear from canonical output, sitemap output, and prerender route emission.

## App Behavior Design

### Language Switcher

The language switcher should navigate between:

- German -> unprefixed path
- English -> `/en` path

It should preserve the logical page and version slug for What’s New entries.

### Language Context

The active language should be derived from the route:

- `/en` means English
- everything else under the canonical route set means German

The context should still persist explicit user choice in local storage so browser-language redirects do not override a deliberate switch.

## Technical Scope

The change touches:

- route definitions in `src/App.tsx`
- locale helpers in `src/lib/localeRouting.ts`
- locale redirect logic in `src/lib/localeRedirect.ts` and `src/components/LocaleRedirect.tsx`
- SEO and structured data in `src/lib/seo.ts`
- prerender output in `scripts/prerender-seo.js`
- sitemap generation in `scripts/sitemap.js`
- UI navigation that builds locale-aware links
- tests covering routing, redirects, SEO, and locale switching

## Success Criteria

The work is successful if:

- German content is served on `/`
- English content is served on `/en`
- old `/de` links redirect to the matching German canonical routes
- non-German first-time visitors are redirected to `/en`
- stored language preference overrides browser detection
- canonical, alternates, prerender output, and sitemap all reflect the new locale structure
