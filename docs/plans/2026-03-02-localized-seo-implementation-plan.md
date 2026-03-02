# Localized URL SEO Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Ship path-based English/German URLs with correct multilingual SEO metadata, visible FAQ, and corrected crawl artifacts.

**Architecture:** Introduce a small i18n routing utility that maps paths between locales and derives page identity. Build a reusable SEO head component that writes canonical/hreflang/social/schema dynamically per route+locale. Update router definitions to expose `/de/*` pages and make language switching route-aware.

**Tech Stack:** React, React Router, TypeScript, Vite, Vitest.

---

### Task 1: Add URL-locale routing utilities

**Files:**
- Create: `src/lib/localeRouting.ts`
- Test: `src/lib/localeRouting.test.ts`

**Step 1: Write the failing tests**
- Add tests for: locale detection from pathname, page type detection, localized path mapping, alternate URL generation.

**Step 2: Run tests to verify failures**
Run: `npm test -- src/lib/localeRouting.test.ts`
Expected: FAIL because utility file/functions do not exist yet.

**Step 3: Write minimal implementation**
- Implement helpers:
  - `getLocaleFromPathname(pathname)`
  - `getPageFromPathname(pathname)`
  - `buildLocalizedPath(page, locale)`
  - `buildAlternateUrls(pathname, origin)`

**Step 4: Run tests to verify pass**
Run: `npm test -- src/lib/localeRouting.test.ts`
Expected: PASS.

### Task 2: Route-driven language source of truth

**Files:**
- Modify: `src/i18n/LanguageContext.tsx`
- Modify: `src/App.tsx`
- Modify: `src/components/LanguageSwitcher.tsx`

**Step 1: Write failing tests for path->language behavior**
- Extend or add tests validating URL-derived language precedence over localStorage default.

**Step 2: Run tests to verify failures**
Run: `npm test -- src/lib/localeRouting.test.ts`
Expected: FAIL for missing route-integrated behavior assertions.

**Step 3: Write minimal implementation**
- Add locale sync with current route pathname.
- Add `/de`, `/de/privacy`, `/de/terms` routes.
- Make language switcher navigate to equivalent localized route.

**Step 4: Run relevant tests**
Run: `npm test -- src/lib/localeRouting.test.ts`
Expected: PASS.

### Task 3: Add dynamic SEO head component

**Files:**
- Create: `src/components/SeoHead.tsx`
- Modify: `src/pages/Index.tsx`
- Modify: `src/pages/Privacy.tsx`
- Modify: `src/pages/Terms.tsx`

**Step 1: Write failing tests**
- Add tests for metadata config generation (title, canonical, alternates by locale/page).

**Step 2: Run tests to verify failures**
Run: `npm test -- src/lib/localeRouting.test.ts`
Expected: FAIL for missing metadata generator.

**Step 3: Write minimal implementation**
- Implement route-aware metadata and social tags.
- Render homepage schema (`SoftwareApplication`, `Organization`, `FAQPage`) from component.
- Remove unsupported SearchAction schema.

**Step 4: Run tests**
Run: `npm test -- src/lib/localeRouting.test.ts`
Expected: PASS.

### Task 4: Add visible FAQ section and homepage semantics

**Files:**
- Create: `src/components/Faq.tsx`
- Modify: `src/i18n/translations.ts`
- Modify: `src/pages/Index.tsx`

**Step 1: Write failing tests**
- Add assertions for FAQ data shape and localized content keys.

**Step 2: Run tests to verify failures**
Run: `npm test -- src/lib/localeRouting.test.ts`
Expected: FAIL for missing keys/component.

**Step 3: Implement feature**
- Add visible FAQ section on home.
- Wrap homepage body sections in `<main>`.

**Step 4: Run tests**
Run: `npm test -- src/lib/localeRouting.test.ts`
Expected: PASS.

### Task 5: Update static crawl artifacts and remove stale static SEO blocks

**Files:**
- Modify: `public/robots.txt`
- Modify: `public/sitemap.xml`
- Modify: `index.html`

**Step 1: Apply minimal changes**
- Add sitemap directive to robots.
- Add localized URLs to sitemap with current lastmod.
- Remove static canonical/hreflang/JSON-LD blocks that dynamic SEO now handles.

**Step 2: Verify build**
Run: `npm run build`
Expected: build succeeds.

### Task 6: Full verification

**Files:**
- N/A

**Step 1: Run unit tests**
Run: `npm test`
Expected: PASS.

**Step 2: Run build**
Run: `npm run build`
Expected: PASS.

**Step 3: Spot-check routes**
Run: `npm run dev` then inspect `/`, `/de`, `/privacy`, `/de/privacy`.
Expected: localized content and correct head tags.
