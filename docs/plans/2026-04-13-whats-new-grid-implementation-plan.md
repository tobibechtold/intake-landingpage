# What's New Grid Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make the desktop What's New overview render cards side by side, reaching three columns on large screens.

**Architecture:** Update the shared `WhatsNewList` container from a single-column grid to a responsive grid with one, two, and three columns at mobile, medium, and large breakpoints. Verify the overview page test checks the intended responsive grid classes in addition to the existing link behavior.

**Tech Stack:** React, TypeScript, Vitest, Testing Library, Tailwind CSS

---

### Task 1: Add the Failing Layout Test

**Files:**
- Modify: `src/pages/WhatsNewPage.test.tsx`

**Step 1: Write the failing test**

- Add an assertion that the overview grid uses responsive classes for multiple columns on desktop.

**Step 2: Run test to verify it fails**

Run: `npm test -- src/pages/WhatsNewPage.test.tsx`
Expected: FAIL because the list is still single-column.

**Step 3: Implement the minimal layout change**

- Update `src/components/WhatsNewList.tsx` to use `md:grid-cols-2` and `xl:grid-cols-3` while keeping the existing card structure.

**Step 4: Run test to verify it passes**

Run: `npm test -- src/pages/WhatsNewPage.test.tsx`
Expected: PASS.

### Task 2: Final Verification

**Files:**
- Modify: `src/components/WhatsNewList.tsx`
- Modify: `src/pages/WhatsNewPage.test.tsx`

**Step 1: Re-run focused verification**

Run: `npm test -- src/pages/WhatsNewPage.test.tsx`
Expected: PASS with no regressions in overview and detail page checks.

**Step 2: Review the diff**

Run: `git diff -- src/components/WhatsNewList.tsx src/pages/WhatsNewPage.test.tsx`
Expected: only the responsive grid classes and matching test assertions change.
