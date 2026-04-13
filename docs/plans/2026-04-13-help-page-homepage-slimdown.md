# Help Page And Homepage Slimdown Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Move FAQ content to a dedicated Help page, reduce top-nav clutter, and shorten the homepage so it focuses on conversion while dedicated pages carry depth.

**Architecture:** Add a localized `help` route and dedicated page that reuses the existing FAQ dataset, wire the new page into navigation and locale routing, then trim the homepage by removing the full FAQ and Feature Voting sections and one overlapping comparison-style section. Keep footer discovery breadth for SEO while making the desktop header intentionally narrower.

**Tech Stack:** React, TypeScript, React Router, Vitest, Testing Library, Tailwind CSS

---

### Task 1: Route and localization scaffolding

**Files:**
- Modify: `src/lib/localeRouting.ts`
- Modify: `src/lib/localeRouting.test.ts`
- Modify: `src/i18n/translations.ts`
- Modify: `src/App.tsx`
- Create: `src/pages/HelpPage.tsx`

**Step 1: Write the failing tests**

Add expectations in `src/lib/localeRouting.test.ts` for:
- `getPageFromPathname("/hilfe") === "help"`
- `getPageFromPathname("/en/help") === "help"`
- `buildLocalizedPath("help", "de") === "/hilfe"`
- `buildLocalizedPath("help", "en") === "/en/help"`

Add page copy keys to tests later through rendered UI assertions rather than direct translation-object tests.

**Step 2: Run tests to verify they fail**

Run: `npm test -- src/lib/localeRouting.test.ts`

Expected: FAIL because `help` is not a known `SitePage`.

**Step 3: Write minimal implementation**

- Add `"help"` to `SitePage`.
- Add localized segments:
  - `de: "hilfe"`
  - `en: "help"`
- Update pathname detection and `buildLocalizedPath`.
- Add translations for help navigation, help page heading, subheading, and CTA copy.
- Add a `HelpPage` component with:
  - `SeoHead`
  - `Header`
  - page hero/introduction
  - FAQ list rendered from `FAQ_BY_LANGUAGE`
  - optional support text linking to store/download CTA
  - `Footer`
- Register `/hilfe` and `/en/help` in `src/App.tsx`.

**Step 4: Run tests to verify they pass**

Run: `npm test -- src/lib/localeRouting.test.ts`

Expected: PASS.

### Task 2: Header and footer information architecture

**Files:**
- Modify: `src/components/Header.tsx`
- Modify: `src/components/Header.test.tsx`
- Modify: `src/components/Footer.tsx`
- Modify: `src/components/Footer.test.tsx`

**Step 1: Write the failing tests**

Update `src/components/Header.test.tsx` to expect:
- top-nav links include features, comparisons, updates
- top-nav does not include `Warum wechseln`, FAQ, or `Feature Voting`
- mobile sheet still exposes Help and Feature Voting links

Update `src/components/Footer.test.tsx` to expect:
- footer includes localized Help link
- footer still includes Feature Voting and changelog

**Step 2: Run tests to verify they fail**

Run: `npm test -- src/components/Header.test.tsx src/components/Footer.test.tsx`

Expected: FAIL because current header still renders Why Switch, FAQ, and Feature Voting in the top nav, and footer has no Help link.

**Step 3: Write minimal implementation**

- Narrow desktop/mobile primary nav items to:
  - Features
  - Comparisons
  - Updates
- Keep download CTA unchanged.
- Add Help link to footer.
- Keep Feature Voting in footer only.
- If mobile sheet needs fuller discovery, include Help there explicitly after primary nav items.

**Step 4: Run tests to verify they pass**

Run: `npm test -- src/components/Header.test.tsx src/components/Footer.test.tsx`

Expected: PASS.

### Task 3: Homepage slimming

**Files:**
- Modify: `src/pages/Index.tsx`
- Modify: `src/pages/Index.test.tsx`

**Step 1: Write the failing tests**

Update `src/pages/Index.test.tsx` to assert:
- homepage still renders hero, topic pages entry points, product updates preview, and final CTA
- homepage no longer renders full FAQ section
- homepage no longer renders Feature Voting section
- homepage keeps one differentiation section (`WhySwitch`) but removes the overlapping `ComparisonTable`

**Step 2: Run tests to verify they fail**

Run: `npm test -- src/pages/Index.test.tsx`

Expected: FAIL because the homepage still renders FAQ, Feature Voting, and comparison table.

**Step 3: Write minimal implementation**

Edit `src/pages/Index.tsx` to remove:
- `ComparisonTable`
- `Faq`
- `FeatureVoting`

Keep:
- `Hero`
- `PressMentions`
- `WhySwitch`
- `TopicPages`
- `ProofStories`
- `Reviews`
- `ScreenshotGallery`
- `Features`
- `ProductUpdatesPreview`
- `CTA`

**Step 4: Run tests to verify they pass**

Run: `npm test -- src/pages/Index.test.tsx`

Expected: PASS.

### Task 4: Help page coverage

**Files:**
- Create: `src/pages/HelpPage.test.tsx`
- Modify: `src/pages/HelpPage.tsx`

**Step 1: Write the failing test**

Add a focused page test that renders the help page in both locales and asserts:
- heading/subheading are present
- FAQ items render
- a download or app-store path is present for next-step support

**Step 2: Run test to verify it fails**

Run: `npm test -- src/pages/HelpPage.test.tsx`

Expected: FAIL because the file or page does not yet exist or lacks expected content.

**Step 3: Write minimal implementation**

Adjust `HelpPage.tsx` markup and copy so the test passes without reintroducing duplicate homepage bulk.

**Step 4: Run test to verify it passes**

Run: `npm test -- src/pages/HelpPage.test.tsx`

Expected: PASS.

### Task 5: Full regression verification

**Files:**
- No code changes expected

**Step 1: Run focused regression suite**

Run:
- `npm test -- src/lib/localeRouting.test.ts`
- `npm test -- src/components/Header.test.tsx src/components/Footer.test.tsx`
- `npm test -- src/pages/Index.test.tsx src/pages/HelpPage.test.tsx`

Expected: PASS.

**Step 2: Run broader affected-page suite**

Run:
- `npm test -- src/pages/ComparisonsPage.test.tsx src/pages/IntentPages.test.tsx src/pages/WhatsNewPage.test.tsx src/components/ProductUpdatesPreview.test.tsx src/components/Hero.test.tsx src/lib/storeLinks.test.ts`

Expected: PASS.
