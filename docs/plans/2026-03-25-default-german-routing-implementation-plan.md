# Default German Routing Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make German the default locale on unprefixed routes, move English to `/en`, and preserve old `/de` links through redirects.

**Architecture:** Flip the locale-path model in one place by updating the locale routing helpers, then propagate that new model through app routes, browser-language redirect behavior, runtime SEO, prerender output, sitemap generation, and locale-aware UI navigation. Keep legacy `/de` support as redirect-only compatibility routes rather than canonical content routes.

**Tech Stack:** React 18, TypeScript, React Router, Vite, Vitest, prerender scripts in `scripts/`, route-aware SEO helpers in `src/lib/`

---

### Task 1: Add failing route-helper and redirect tests for the new locale structure

**Files:**
- Modify: `src/lib/localeRouting.test.ts`
- Modify: `src/lib/localeRedirect.test.ts`
- Reference: `src/lib/localeRouting.ts`
- Reference: `src/lib/localeRedirect.ts`

**Step 1: Update route-helper expectations**

Change the locale-routing tests so they expect:

- `/` and `/privacy` to map to German
- `/en` and `/en/privacy` to map to English
- `buildLocalizedPath("home", "de")` -> `/`
- `buildLocalizedPath("home", "en")` -> `/en`

Keep a small amount of coverage for legacy `/de` parsing where needed.

**Step 2: Update redirect-helper expectations**

Replace the old “redirect German browsers to `/de`” expectations with the new rules:

- non-German browsers redirect from German-default routes to matching `/en` routes
- German browsers stay on German-default routes
- explicit stored preference overrides browser detection
- legacy `/de` paths redirect to German canonical routes

**Step 3: Run the focused helper tests to verify they fail**

Run: `npm test -- src/lib/localeRouting.test.ts src/lib/localeRedirect.test.ts`

Expected: FAIL because the current path model is still English-default.

**Step 4: Adjust assertions if they fail for the wrong reason**

Keep the failures centered on behavior, not implementation details.

**Step 5: Commit**

Do not commit yet. Land the tests with the implementation.

### Task 2: Flip locale helpers and redirect behavior

**Files:**
- Modify: `src/lib/localeRouting.ts`
- Modify: `src/lib/localeRedirect.ts`
- Modify: `src/components/LocaleRedirect.tsx`
- Modify: `src/i18n/LanguageContext.tsx`
- Test: `src/lib/localeRouting.test.ts`
- Test: `src/lib/localeRedirect.test.ts`

**Step 1: Update locale parsing and localized path building**

Change `src/lib/localeRouting.ts` so:

- `/en` is the explicit English prefix
- unprefixed routes are German
- `/de` is treated as a legacy alias for German only where needed

**Step 2: Add helpers for legacy German redirect handling if needed**

If route cleanup becomes clearer with a dedicated helper, add a small utility that maps `/de` paths to their German canonical paths.

**Step 3: Replace browser-language redirect logic**

Change `src/lib/localeRedirect.ts` from “redirect German browsers to `/de`” to:

- redirect legacy `/de` paths to canonical German paths
- redirect first-time non-German visitors from German-default routes to `/en` equivalents
- respect stored preference before browser detection
- ignore unknown paths

**Step 4: Keep language context aligned with the new path model**

Ensure route-derived language state treats `/en` as English and unprefixed routes as German, while preserving explicit language selection in local storage.

**Step 5: Run the helper tests**

Run: `npm test -- src/lib/localeRouting.test.ts src/lib/localeRedirect.test.ts`

Expected: PASS

### Task 3: Update route definitions and locale-aware navigation

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/components/LanguageSwitcher.tsx`
- Modify: `src/components/LanguageSwitcher.test.tsx`
- Modify: `src/pages/WhatsNewPage.test.tsx`
- Modify: `src/components/ProductUpdatesPreview.test.tsx`
- Modify: `src/components/Footer.test.tsx`
- Modify: any route-aware component tests that assert old `/de` or unprefixed English links

**Step 1: Replace canonical route definitions**

Update app routes so canonical content routes are:

- German on unprefixed paths
- English on `/en...`

Add redirect routes for legacy `/de...` paths.

**Step 2: Update the language switcher**

Ensure toggling language preserves page and version slug while switching between unprefixed German and `/en` English.

**Step 3: Update route-aware UI tests**

Adjust tests that expect What’s New links, footer links, or language toggles to use the new path structure.

**Step 4: Run the focused route/UI tests**

Run: `npm test -- src/components/LanguageSwitcher.test.tsx src/pages/WhatsNewPage.test.tsx src/components/ProductUpdatesPreview.test.tsx src/components/Footer.test.tsx`

Expected: PASS

### Task 4: Align runtime SEO, prerender output, and sitemap with the new locale structure

**Files:**
- Modify: `src/lib/seo.ts`
- Modify: `src/lib/seo.test.ts`
- Modify: `src/lib/prerenderSeo.test.ts`
- Modify: `src/lib/sitemap.test.ts`
- Modify: `scripts/prerender-seo.js`
- Modify: `scripts/sitemap.js`

**Step 1: Flip canonical and alternate URL generation**

Update runtime SEO expectations so:

- German canonical URLs are unprefixed
- English canonical URLs use `/en`
- `hreflang="de"` points to German default paths
- `hreflang="en"` points to `/en` paths

**Step 2: Update structured-data URLs**

Ensure homepage schema URLs follow the new canonical locale paths.

**Step 3: Update prerender route lists and emitted SEO tags**

Prerender should emit canonical English pages under `/en` and stop emitting `/de` pages as canonical output.

**Step 4: Update sitemap generation**

Remove canonical `/de` entries and include `/en` entries instead.

**Step 5: Run the SEO and sitemap tests**

Run: `npm test -- src/lib/seo.test.ts src/lib/prerenderSeo.test.ts src/lib/sitemap.test.ts`

Expected: PASS

### Task 5: Full verification

**Files:**
- Reference: `src/App.tsx`
- Reference: `src/lib/localeRouting.ts`
- Reference: `src/lib/localeRedirect.ts`
- Reference: `src/lib/seo.ts`
- Reference: `scripts/prerender-seo.js`
- Reference: `scripts/sitemap.js`

**Step 1: Run the combined focused suite**

Run:

```bash
npm test -- \
  src/lib/localeRouting.test.ts \
  src/lib/localeRedirect.test.ts \
  src/components/LanguageSwitcher.test.tsx \
  src/pages/WhatsNewPage.test.tsx \
  src/components/ProductUpdatesPreview.test.tsx \
  src/components/Footer.test.tsx \
  src/lib/seo.test.ts \
  src/lib/prerenderSeo.test.ts \
  src/lib/sitemap.test.ts
```

Expected: PASS

**Step 2: Search for stale canonical `/de` assumptions**

Run: `rg -n '"/de|/de/|startsWith\\("/de|\\b/de\\b' src scripts`

Expected: only intentional legacy redirect handling and tests remain.

**Step 3: Review diff scope**

Confirm the change is limited to locale routing, redirects, SEO, sitemap, prerender output, and tests.

**Step 4: Commit**

```bash
git add <changed files>
git commit -m "feat: make german the default locale"
```
