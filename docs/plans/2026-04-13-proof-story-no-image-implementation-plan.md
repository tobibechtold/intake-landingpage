# Proof Story No-Image Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make proof story cards without screenshots use the full card width for their text content.

**Architecture:** Extend the shared proof-story layout with an explicit text-only variant and apply it when a marketing section has no screenshot. Verify the real no-screenshot section on the no-subscription page uses the text-only article and full-width copy classes.

**Tech Stack:** React, TypeScript, Vitest, Testing Library, Tailwind CSS

---

### Task 1: Add the Failing Regression Test

**Files:**
- Modify: `src/pages/IntentPages.test.tsx`

**Step 1: Write the failing test**

- Add an assertion against the no-subscription page section that has no screenshot.
- Verify its enclosing proof-story article uses a text-only variant and that its copy block uses the full-width variant.

**Step 2: Run test to verify it fails**

Run: `npm test -- src/pages/IntentPages.test.tsx`
Expected: FAIL because the current shared layout still reserves a media column.

**Step 3: Implement the minimal code**

- Update `src/components/MarketingPageLayout.tsx` to omit the media wrapper when no screenshot exists.
- Add explicit text-only modifier classes in `src/index.css`.

**Step 4: Run test to verify it passes**

Run: `npm test -- src/pages/IntentPages.test.tsx`
Expected: PASS.

### Task 2: Final Verification

**Files:**
- Modify: `src/components/MarketingPageLayout.tsx`
- Modify: `src/index.css`
- Modify: `src/pages/IntentPages.test.tsx`

**Step 1: Run focused verification**

Run: `npm test -- src/pages/IntentPages.test.tsx`
Expected: PASS with no regressions for no-subscription and no-account pages.

**Step 2: Review the diff**

Run: `git diff -- src/components/MarketingPageLayout.tsx src/index.css src/pages/IntentPages.test.tsx`
Expected: only the shared text-only proof-story variant and its test change.
