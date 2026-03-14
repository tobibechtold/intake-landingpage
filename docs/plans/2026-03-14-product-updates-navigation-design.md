# Product Updates Navigation Design

## Goal

Restore the separate footer changelog link, keep the internal What's New page as a curated product-updates destination, add a small external changelog callout on that page, and add a preview of recent product updates to the home page.

## Decision

Treat the two destinations differently:

- `What's New` stays internal and points to `/whats-new`
- `Changelog` returns as a separate external footer link
- the Product Updates page includes a compact callout to the full external changelog
- the home page includes a lightweight preview of recent releases, styled more like blog post previews than a full release archive

## Placement

### Footer

In the App column, keep `What's New` and place `Changelog` directly beneath it.

### Product Updates Page

Add a small secondary section between the intro copy and the release list. It should explain that the page highlights major updates while the full changelog lives externally.

### Home Page

Add a `Product Updates` preview section after `Features` and before `FAQ`. The section should show the newest releases in a card list with title, version, summary, and a path to the full updates page.

## Rationale

This keeps the information architecture clear:

- home page: preview only
- `/whats-new`: curated product update archive
- external changelog: full chronological detail

## Testing

Add or update tests for:

- footer rendering both `What's New` and `Changelog`
- Product Updates page rendering the external changelog callout
- home page preview component rendering recent releases and linking to `/whats-new`
