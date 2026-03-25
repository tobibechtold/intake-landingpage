# Canonical Domain Cleanup Design

## Goal

Replace the legacy `intake.tobibechtold.dev` production origin in landing-page SEO output with the approved canonical host `https://www.getintake.de`.

## Approved Constraints

- repo changes are limited to SEO and canonical output
- no redirect logic should be added in this repo
- canonical URLs should use `https://www.getintake.de`
- all current domains already 307 redirect to `https://www.getintake.de`

## Current State

The app still emits the old development host in multiple SEO surfaces:

- runtime metadata in `src/components/SeoHead.tsx`
- homepage structured data in `src/lib/seo.ts`
- prerendered HTML in `scripts/prerender-seo.js`
- sitemap generation in `scripts/sitemap.js`
- regression tests that assert the old host

This creates an obvious canonical mismatch between production traffic and emitted SEO metadata.

## Design

Use one shared canonical-origin constant and apply it consistently across every SEO output path.

### Canonical Host

The canonical host is:

- `https://www.getintake.de`

This matches the current redirect destination, so emitted canonical URLs will resolve directly instead of pointing at a host that immediately redirects elsewhere.

### Surfaces To Update

The cleanup should update:

- canonical links
- `hreflang` alternate links
- `og:url`
- structured-data URLs
- sitemap `<loc>` entries
- prerendered SEO output
- tests covering these outputs

### Scope Control

Do not change:

- route structure
- localized path mapping
- page copy
- redirect behavior
- Vercel routing behavior

The change is host-only.

## Technical Direction

Introduce a shared site-origin module so runtime code and build scripts read from the same canonical source instead of repeating host strings in multiple files.

The runtime SEO layer and prerender layer should both derive canonical and alternate URLs from that shared origin. Sitemap generation should use the same origin. Existing locale-aware path helpers remain unchanged.

## Testing Direction

Verification should prove that:

- runtime SEO emits `https://www.getintake.de`
- prerendered SEO emits `https://www.getintake.de`
- sitemap URLs emit `https://www.getintake.de`
- structured data uses the canonical host
- no route-level path regressions are introduced

## Success Criteria

The work is successful if:

- the old `intake.tobibechtold.dev` host no longer appears in SEO output
- canonical, alternates, structured data, and sitemap all agree on `https://www.getintake.de`
- redirects remain external to this repo
