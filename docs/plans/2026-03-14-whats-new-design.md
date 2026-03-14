# What's New Design

## Goal
Add a localized "What's New" release archive to the landing site with an overview page and one detail page per app version, starting at version `2.1.1`.

## URL Design
English routes:
- `/whats-new`
- `/whats-new/:version`

German routes:
- `/de/whats-new`
- `/de/whats-new/:version`

## Behavior
- The overview page lists all releases from newest to oldest.
- Each release detail page links back to the overview page.
- The app can deep-link directly to a version page for the user's current app version.
- Missing versions render the site's existing not-found page.
- English and German pages are separate crawlable URLs.

## Content Model
- Store release content under `content/whats-new/<version>/`.
- Each version folder contains:
  - `de.md` as the source copy
  - `en.md` as the English translation
  - `assets/` for screenshots and optional video files
- Markdown files use frontmatter plus markdown body.

Required frontmatter:
- `version`
- `publishedAt`
- `title`
- `summary`
- `coverImage`

Optional frontmatter:
- `video`
- `highlights`

## Authoring Workflow
1. Create `content/whats-new/<version>/`
2. Add `de.md`
3. Add `en.md`
4. Add screenshots and optional videos under `assets/`
5. Commit the release entry

## Rendering Design
- Use a small content pipeline in the Vite app to import all release markdown files at build time.
- Parse frontmatter and markdown body into a typed release model.
- Render overview and detail pages from that model.
- Keep site chrome strings such as "What's New" and "Back to overview" in the existing translation system.
- Keep release article copy in markdown, not in `src/i18n/translations.ts`.

## Validation
- Validate at load/build time that both locales exist for every version.
- Validate that `de.md` and `en.md` use the same version value.
- Validate that referenced media files exist.
- Fail the build if release metadata is invalid.

## SEO And Prerendering
- Add route-aware metadata for overview and detail pages.
- Add canonical and `hreflang` links for each localized route pair.
- Add overview and detail pages to prerendering so they are crawlable HTML.
- Extend sitemap generation to include all localized release URLs.

## Recommendation
Use a hybrid of typed content structure and plain markdown:
- structured per-version folders in the repo
- plain markdown with frontmatter for writing
- repo-managed screenshots and optional videos
- prerendered localized release pages for SEO and app deep links

This keeps writing simple, supports German-first authoring with English translations, and fits the site's existing localized routing and SEO model.
