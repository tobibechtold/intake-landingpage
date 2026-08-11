![Intake - OG Image](public/og-image.png)

# Intake

Intake is a clean calorie and nutrition tracker focused on speed, clarity, and daily consistency.

Live landing page: [https://intake.tobibechtold.dev](https://intake.tobibechtold.dev)

<a href="https://apps.apple.com/us/app/intake-kalorienz%C3%A4hler/id6757768955">
  <img src="src/assets/app-store-badge.svg" alt="Download on the App Store" height="56" />
</a>
<a href="https://play.google.com/store/apps/details?id=de.bechtoldit.intake">
  <img src="src/assets/google-play-badge.png" alt="Get it on Google Play" height="56" />
</a>

## What's New authoring

Release entries live in `content/whats-new/<version>/` and are rendered into localized overview and detail pages.

Required files per release:
- `de.md`
- `en.md`
- `assets/` for screenshots and optional videos

Required frontmatter fields:
- `version`
- `publishedAt`
- `title`
- `summary`
- `coverImage`

Optional frontmatter fields:
- `video`
- `highlights`

Example:

```text
content/whats-new/2.1.1/
  de.md
  en.md
  assets/
    cover.svg
    search.png
    demo.mp4
```

Routes are generated automatically. German is the default locale and is served
unprefixed; English lives under `/en`:

- German overview: `/whats-new`
- English overview: `/en/whats-new`
- German detail: `/whats-new/<version>`
- English detail: `/en/whats-new/<version>`

Release notes are an Astro content collection (`src/content.config.ts`) loaded from
`content/whats-new/*/{de,en}.md`. Adding a version directory with `de.md` and `en.md`
is enough to publish a new localized page pair, its sitemap entries and its hreflang
pair. A malformed release note fails the build rather than shipping blank.

## Astro version pin

`astro` is pinned to an exact version (no caret) because the test suite uses
`experimental_AstroContainer`, which Astro documents as "subject to breaking changes,
even in minor or patch releases". Read the Astro CHANGELOG before bumping, and expect
`test/astro-container.test.ts` to be the first thing to break.

Note also that `astro.config.mjs` deliberately has **no adapter** — see the comment at
the top of that file before adding one.
