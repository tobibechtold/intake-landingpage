# German Comparison Copy Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rewrite the German comparison overview and detail page copy so it reads like native German instead of translated marketing text.

**Architecture:** Update only the German comparison content entries in `src/lib/marketingPages.ts` for the overview page and both detail pages. Keep the existing page and table structure intact, and adjust the comparison-page tests to assert a few representative phrases from the new German copy.

**Tech Stack:** React, TypeScript, Vitest, Testing Library

---

### Task 1: Add failing copy assertions

**Files:**
- Modify: `src/pages/ComparisonsPage.test.tsx`

**Step 1: Write the failing tests**

- Update the German comparison hub test to assert representative wording from the new tone direction.
- Add a German comparison detail test or extend the existing coverage so the rewrite is checked on one of the detail pages as well.

**Step 2: Run test to verify it fails**

Run: `npm test -- src/pages/ComparisonsPage.test.tsx`
Expected: FAIL because the old German strings are still present.

**Step 3: Write the minimal implementation**

- Rewrite the German comparison overview copy.
- Rewrite the German Yazio and FDDB detail copy.

**Step 4: Run test to verify it passes**

Run: `npm test -- src/pages/ComparisonsPage.test.tsx`
Expected: PASS.

### Task 2: Final verification

**Files:**
- Modify: `src/lib/marketingPages.ts`
- Modify: `src/pages/ComparisonsPage.test.tsx`

**Step 1: Run focused verification**

Run: `npm test -- src/pages/ComparisonsPage.test.tsx`
Expected: PASS with no regressions in the comparison overview and detail coverage.

**Step 2: Review the diff**

Run: `git diff -- src/lib/marketingPages.ts src/pages/ComparisonsPage.test.tsx`
Expected: only German comparison copy and matching tests change.
