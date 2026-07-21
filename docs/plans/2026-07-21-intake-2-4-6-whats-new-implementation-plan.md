# Intake 2.4.6 What's New Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add localized, discoverable release notes and a matching cover for Intake 2.4.6.

**Architecture:** The existing Vite glob loader discovers versioned Markdown and assets under `content/whats-new`. Add the new content files and update assertions that intentionally identify the newest release; no routing or component changes are required.

**Tech Stack:** React, TypeScript, Vite, Markdown content, Vitest, Testing Library

---

### Task 1: Specify the Intake 2.4.6 release content

**Files:**
- Modify: `src/lib/whatsNewContent.test.ts`
- Modify: `src/pages/WhatsNewPage.test.tsx`
- Modify: `src/components/ProductUpdatesPreview.test.tsx`

**Step 1: Write the failing content tests**

Update newest-version assertions from `2.4.5` or `2.4.4` to `2.4.6`. Add a focused test that loads both 2.4.6 locales and asserts the publication date, title, summary, AI meal favorites/history, favorite sorting, decimal grams, manual workout calories, past workout synchronization, recipe editing, unnamed workouts, and Galaxy A23 barcode fix.

**Step 2: Run tests to verify they fail**

Run: `npm test -- src/lib/whatsNewContent.test.ts src/pages/WhatsNewPage.test.tsx src/components/ProductUpdatesPreview.test.tsx`

Expected: FAIL because version 2.4.6 does not exist yet and the latest displayed release is still 2.4.5.

### Task 2: Add localized release notes and cover

**Files:**
- Create: `content/whats-new/2.4.6/de.md`
- Create: `content/whats-new/2.4.6/en.md`
- Create: `content/whats-new/2.4.6/assets/cover.svg`

**Step 1: Add German release copy**

Create frontmatter for version `2.4.6`, publication date `2026-07-21`, localized title, summary, cover, and four highlights. Write editorial sections for smarter favorites, precise gram tracking, manual workouts, and reliability fixes, followed by the full changelog link and existing sign-off.

**Step 2: Add equivalent English release copy**

Translate the same product behavior naturally, preserving the same structure and claims.

**Step 3: Add the cover**

Copy the visual structure of the 2.4.5 SVG and update the accessible title, description, visible version, and subtitle to describe favorites, grams, and workouts.

**Step 4: Run focused tests to verify they pass**

Run: `npm test -- src/lib/whatsNewContent.test.ts src/pages/WhatsNewPage.test.tsx src/components/ProductUpdatesPreview.test.tsx`

Expected: PASS.

### Task 3: Verify the complete release integration

**Files:**
- Verify generated output only; do not commit `dist/` unless already tracked.

**Step 1: Run all tests**

Run: `npm test`

Expected: PASS.

**Step 2: Run lint**

Run: `npm run lint`

Expected: PASS with no errors.

**Step 3: Build and prerender**

Run: `npm run build`

Expected: PASS and prerender localized `/whats-new/2.4.6` routes.

**Step 4: Review the final diff**

Run: `git diff --check && git status --short`

Expected: no whitespace errors; only the planned release content, tests, cover, and plan are changed.
