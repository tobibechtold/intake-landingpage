# What's New Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add localized overview and detail pages for "What's New" release entries backed by markdown content stored in the repo, starting with version `2.1.1`.

**Architecture:** Extend the existing route-based locale system with two new localized page types and a small content layer that loads release markdown files from `content/whats-new`. Parse frontmatter and markdown into typed release records, use those records for page rendering, SEO, prerendering, and sitemap generation, and keep article body copy outside the app-wide UI translation table.

**Tech Stack:** React 18, React Router, TypeScript, Vite, Vitest, Tailwind, lightweight markdown/frontmatter parser(s)

---

### Task 1: Add markdown tooling and seed release content

**Files:**
- Modify: `package.json`
- Create: `content/whats-new/2.1.1/de.md`
- Create: `content/whats-new/2.1.1/en.md`
- Create: `content/whats-new/2.1.1/assets/.gitkeep`

**Step 1: Write the failing test**

Add a new test file `src/lib/whatsNewContent.test.ts` with a first test that expects release `2.1.1` to be present in both locales and to expose title, summary, and version metadata.

```ts
it("loads seeded release content for both locales", () => {
  const entry = getWhatsNewEntry("2.1.1", "de");

  expect(entry).toBeDefined();
  expect(entry?.version).toBe("2.1.1");
  expect(entry?.title).toBeTruthy();
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- --runInBand src/lib/whatsNewContent.test.ts`
Expected: FAIL because the content loader does not exist yet.

**Step 3: Write minimal implementation**

- Add the markdown/frontmatter dependency to `package.json`.
- Create the seeded markdown files for `2.1.1` with valid frontmatter and placeholder body content in German and English.
- Add `.gitkeep` under the assets directory so the folder exists before real media is added.

Example frontmatter shape:

```md
---
version: "2.1.1"
publishedAt: "2026-03-14"
title: "Was ist neu in Intake 2.1.1"
summary: "Kurzueberblick ueber neue Funktionen und Verbesserungen."
coverImage: "./assets/cover.png"
highlights:
  - "Neues Feature"
---
```

**Step 4: Run test to verify it still fails for the right reason**

Run: `npm test -- --runInBand src/lib/whatsNewContent.test.ts`
Expected: FAIL because the loader/parser is still missing, but markdown source files now exist.

**Step 5: Commit**

```bash
git add package.json content/whats-new/2.1.1/de.md content/whats-new/2.1.1/en.md content/whats-new/2.1.1/assets/.gitkeep
git commit -m "chore: seed what's new release content"
```

### Task 2: Build the content loader and route helpers

**Files:**
- Create: `src/lib/whatsNewContent.ts`
- Create: `src/lib/whatsNewContent.test.ts`
- Modify: `src/lib/localeRouting.ts`
- Modify: `src/lib/localeRouting.test.ts`

**Step 1: Write the failing tests**

Add tests for:
- loading all localized entries
- loading one version by locale
- sorting entries newest-first
- rejecting mismatched locale pairs or missing metadata
- mapping `/whats-new` and `/whats-new/:version` into localized route helpers

```ts
it("maps localized whats-new detail routes", () => {
  expect(getPageFromPathname("/de/whats-new/2.1.1")).toBe("whatsNewEntry");
  expect(buildLocalizedPath("whatsNewIndex", "en")).toBe("/whats-new");
});
```

**Step 2: Run tests to verify they fail**

Run: `npm test -- --runInBand src/lib/whatsNewContent.test.ts src/lib/localeRouting.test.ts`
Expected: FAIL because the loader and new route support do not exist yet.

**Step 3: Write minimal implementation**

- In `src/lib/whatsNewContent.ts`, use Vite glob imports to read `content/whats-new/*/*.md`.
- Parse frontmatter and markdown body into a typed record:
  - `locale`
  - `version`
  - `publishedAt`
  - `title`
  - `summary`
  - `coverImage`
  - `video`
  - `highlights`
  - `bodyHtml`
  - `slug`
- Add helpers such as:
  - `getWhatsNewEntries(locale)`
  - `getWhatsNewEntry(version, locale)`
  - `getWhatsNewVersions()`
- Extend `src/lib/localeRouting.ts` to recognize:
  - `whatsNewIndex`
  - `whatsNewEntry`
- Add localized path builders for overview and detail routes.

**Step 4: Run tests to verify they pass**

Run: `npm test -- --runInBand src/lib/whatsNewContent.test.ts src/lib/localeRouting.test.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add src/lib/whatsNewContent.ts src/lib/whatsNewContent.test.ts src/lib/localeRouting.ts src/lib/localeRouting.test.ts
git commit -m "feat: add what's new content loading"
```

### Task 3: Add localized What's New pages and navigation

**Files:**
- Create: `src/pages/WhatsNewIndex.tsx`
- Create: `src/pages/WhatsNewEntry.tsx`
- Create: `src/components/WhatsNewList.tsx`
- Create: `src/components/WhatsNewArticle.tsx`
- Modify: `src/App.tsx`
- Modify: `src/components/Footer.tsx`
- Modify: `src/i18n/translations.ts`

**Step 1: Write the failing tests**

Create page/component tests that verify:
- overview renders release cards in the current locale
- detail page renders markdown content for a version
- detail page includes a back link to the overview
- footer links to the localized overview page

```ts
it("links back to the localized overview from a detail page", () => {
  render(<WhatsNewEntry />);
  expect(screen.getByRole("link", { name: /back to overview/i })).toHaveAttribute("href", "/whats-new");
});
```

**Step 2: Run tests to verify they fail**

Run: `npm test -- --runInBand src/pages/WhatsNewIndex.test.tsx src/pages/WhatsNewEntry.test.tsx`
Expected: FAIL because the pages and localized links do not exist yet.

**Step 3: Write minimal implementation**

- Add route entries in `src/App.tsx` for both locales:
  - `/whats-new`
  - `/whats-new/:version`
  - `/de/whats-new`
  - `/de/whats-new/:version`
- Build overview and detail pages using the content loader.
- Render version title, date, summary, highlights, images, optional videos, and article body.
- Add a footer link that replaces the external changelog link with the localized overview route.
- Add only UI chrome strings to `src/i18n/translations.ts`, for example:
  - `whatsNew`
  - `backToWhatsNew`
  - `releaseVersion`

**Step 4: Run tests to verify they pass**

Run: `npm test -- --runInBand src/pages/WhatsNewIndex.test.tsx src/pages/WhatsNewEntry.test.tsx`
Expected: PASS

**Step 5: Commit**

```bash
git add src/pages/WhatsNewIndex.tsx src/pages/WhatsNewEntry.tsx src/components/WhatsNewList.tsx src/components/WhatsNewArticle.tsx src/App.tsx src/components/Footer.tsx src/i18n/translations.ts
git commit -m "feat: add what's new pages"
```

### Task 4: Extend SEO and prerendering for release pages

**Files:**
- Modify: `src/lib/seo.ts`
- Modify: `src/lib/seo.test.ts`
- Modify: `src/components/SeoHead.tsx`
- Modify: `scripts/prerender-seo.js`
- Modify: `scripts/prerender.mjs`
- Modify: `public/sitemap.xml`

**Step 1: Write the failing tests**

Add SEO tests that verify:
- localized overview canonical URLs
- localized detail canonical URLs
- alternates for overview/detail routes
- detail pages are indexable

```ts
it("returns release detail metadata for German whats-new pages", () => {
  const seo = getSeoContent("/de/whats-new/2.1.1", "https://intake.tobibechtold.dev");

  expect(seo.page).toBe("whatsNewEntry");
  expect(seo.canonical).toBe("https://intake.tobibechtold.dev/de/whats-new/2.1.1");
  expect(seo.noIndex).toBe(false);
});
```

**Step 2: Run tests to verify they fail**

Run: `npm test -- --runInBand src/lib/seo.test.ts`
Expected: FAIL because the SEO layer does not know about what's-new routes.

**Step 3: Write minimal implementation**

- Extend the SEO copy model in `src/lib/seo.ts` to cover `whatsNewIndex` and `whatsNewEntry`.
- For detail pages, build title/description from the loaded release metadata instead of hardcoding every version.
- Update `scripts/prerender-seo.js` so `PRERENDER_ROUTES` includes overview routes plus every localized release route discovered from the content loader or a generated release index.
- Update `public/sitemap.xml` with `/whats-new`, `/de/whats-new`, and all localized detail URLs.
- Keep `SeoHead` route-aware and ensure canonical and `hreflang` output remains consistent.

**Step 4: Run tests to verify they pass**

Run: `npm test -- --runInBand src/lib/seo.test.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add src/lib/seo.ts src/lib/seo.test.ts src/components/SeoHead.tsx scripts/prerender-seo.js scripts/prerender.mjs public/sitemap.xml
git commit -m "feat: add what's new seo and prerendering"
```

### Task 5: Verify build, routing, and content rendering end-to-end

**Files:**
- Modify: `README.md`

**Step 1: Write the failing test**

Add a short README section describing how to add a new what's-new entry and where release media belongs. This is a documentation gap rather than an executable failure, so the failure is the missing documentation.

**Step 2: Run verification commands before the final edit**

Run: `npm test`
Expected: PASS for the full suite after implementation tasks are complete.

Run: `npm run build`
Expected: PASS and prerender output includes the localized what's-new routes.

**Step 3: Write minimal implementation**

Document:
- release folder layout
- required frontmatter
- where to put screenshots/videos
- how overview/detail routes are generated

**Step 4: Run verification again**

Run: `npm test`
Expected: PASS

Run: `npm run build`
Expected: PASS

**Step 5: Commit**

```bash
git add README.md
git commit -m "docs: document what's new authoring"
```
