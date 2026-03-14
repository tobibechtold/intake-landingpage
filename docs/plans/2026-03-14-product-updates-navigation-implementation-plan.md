# Product Updates Navigation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Restore the external changelog link, add a small changelog callout to the Product Updates page, and add a recent-release preview section to the home page.

**Architecture:** Update footer navigation to distinguish between the internal What's New archive and the external changelog. Add a compact external-link callout to `src/pages/WhatsNewIndex.tsx`, and introduce a dedicated home-page preview component that reads the newest localized release entries and links into the full Product Updates archive.

**Tech Stack:** React 18, TypeScript, React Router, Vitest, Testing Library

---

### Task 1: Add failing navigation tests for the footer and Product Updates page

**Files:**
- Modify: `src/components/Footer.test.tsx`
- Modify: `src/pages/WhatsNewPage.test.tsx`

**Step 1: Write the failing tests**

Add assertions that:
- the footer keeps the localized internal `What's New` link
- the footer also renders an external `Changelog` link with the provided URL
- the Product Updates overview page renders a small external changelog callout link

**Step 2: Run tests to verify they fail**

Run: `npm test -- src/components/Footer.test.tsx src/pages/WhatsNewPage.test.tsx`
Expected: FAIL because the footer does not yet render the external changelog link and the overview page has no changelog callout.

**Step 3: Write minimal implementation**

Update `src/components/Footer.tsx` and `src/pages/WhatsNewIndex.tsx` with the new links and copy.

**Step 4: Run tests to verify they pass**

Run: `npm test -- src/components/Footer.test.tsx src/pages/WhatsNewPage.test.tsx`
Expected: PASS.

**Step 5: Commit**

```bash
git add src/components/Footer.tsx src/components/Footer.test.tsx src/pages/WhatsNewIndex.tsx src/pages/WhatsNewPage.test.tsx
git commit -m "feat: restore changelog navigation"
```

### Task 2: Add a failing test for the home page Product Updates preview

**Files:**
- Create: `src/components/ProductUpdatesPreview.tsx`
- Create: `src/components/ProductUpdatesPreview.test.tsx`
- Modify: `src/pages/Index.tsx`

**Step 1: Write the failing test**

Create a test that renders the new preview component inside routing/language context and asserts:
- the section heading appears
- the newest release title appears
- there is a link to `/whats-new`
- there is a link to the newest release detail page

**Step 2: Run test to verify it fails**

Run: `npm test -- src/components/ProductUpdatesPreview.test.tsx`
Expected: FAIL because the component does not exist yet.

**Step 3: Write minimal implementation**

Create the preview component using localized release data and mount it on the home page after `Features` and before `FAQ`.

**Step 4: Run test to verify it passes**

Run: `npm test -- src/components/ProductUpdatesPreview.test.tsx`
Expected: PASS.

**Step 5: Commit**

```bash
git add src/components/ProductUpdatesPreview.tsx src/components/ProductUpdatesPreview.test.tsx src/pages/Index.tsx
git commit -m "feat: add home page product updates preview"
```

### Task 3: Verify the focused change set

**Files:**
- Modify: `src/components/Footer.tsx`
- Modify: `src/components/Footer.test.tsx`
- Modify: `src/pages/WhatsNewIndex.tsx`
- Modify: `src/pages/WhatsNewPage.test.tsx`
- Create: `src/components/ProductUpdatesPreview.tsx`
- Create: `src/components/ProductUpdatesPreview.test.tsx`
- Modify: `src/pages/Index.tsx`

**Step 1: Run focused tests**

Run: `npm test -- src/components/Footer.test.tsx src/pages/WhatsNewPage.test.tsx src/components/ProductUpdatesPreview.test.tsx`
Expected: PASS.

**Step 2: Review the diff**

Run: `git diff -- src/components/Footer.tsx src/components/Footer.test.tsx src/pages/WhatsNewIndex.tsx src/pages/WhatsNewPage.test.tsx src/components/ProductUpdatesPreview.tsx src/components/ProductUpdatesPreview.test.tsx src/pages/Index.tsx`
Expected: Only footer navigation, Product Updates page copy, and home preview changes.

**Step 3: Commit**

```bash
git add src/components/Footer.tsx src/components/Footer.test.tsx src/pages/WhatsNewIndex.tsx src/pages/WhatsNewPage.test.tsx src/components/ProductUpdatesPreview.tsx src/components/ProductUpdatesPreview.test.tsx src/pages/Index.tsx
git commit -m "feat: expand product updates navigation"
```
