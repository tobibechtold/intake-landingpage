# Intake 2.4.6 What's New Design

## Goal

Publish localized German and English release notes for Intake 2.4.6 using the landing page's existing content-driven What's New system.

## Content

The release page will group the supplied changes into four reader-focused sections:

1. AI meals and improved favorite sorting.
2. Decimal gram amounts for more precise tracking.
3. A redesigned manual workout form with calculated or manually entered calories.
4. Reliability fixes for workout syncing, recipe editing, unnamed workouts, and barcode scanning on the Samsung Galaxy A23.

Both locales will use concise editorial copy consistent with Intake 2.4.5. The page will link to the complete changelog and close with the established personal sign-off.

## Media

The release will initially contain no inline image or video references. This prevents broken media while leaving the Markdown ready for media to be inserted later.

The cover will copy the existing Intake 2.4.5 SVG composition and update its accessible text, visible version, and subtitle for 2.4.6.

## Integration

Adding `content/whats-new/2.4.6/de.md`, `en.md`, and `assets/cover.svg` automatically adds the release to localized detail pages, overview lists, homepage previews, prerendered routes, the sitemap, and SEO metadata.

## Verification

Focused tests will assert that 2.4.6 is the newest release in both locales and that its core localized content is rendered. Existing page-preview tests will be updated to expect 2.4.6. The full test, lint, and production build commands will verify the complete integration.
