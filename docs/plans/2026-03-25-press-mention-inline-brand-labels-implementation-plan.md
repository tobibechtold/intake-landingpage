# Press Mention Inline Brand Labels Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Show visible inline publication names for `iPhone-Ticker` and `iTopnews` in the homepage press strip while keeping the section compact.

**Architecture:** Extend the press mention metadata with an optional visible label and render it beside the sourced logo inside the existing link. Keep `stadt-bremerhaven.de` logo-only to avoid over-weighting the row. Verify behavior with focused component tests.

**Tech Stack:** React, TypeScript, Vitest, Testing Library, Tailwind CSS

---

### Task 1: Lock the expected UI with tests

**Files:**
- Modify: `src/components/PressMentions.test.tsx`

**Step 1: Write the failing test**

Assert that the rendered strip shows visible text nodes for `iPhone-Ticker` and `iTopnews`.

**Step 2: Run test to verify it fails**

Run: `npm test -- src/components/PressMentions.test.tsx`

Expected: FAIL because the current strip renders only the logos.

### Task 2: Render inline brand labels

**Files:**
- Modify: `src/lib/pressMentions.ts`
- Modify: `src/components/PressMentions.tsx`

**Step 1: Add minimal metadata**

Introduce an optional visible label for the two icon-based outlets.

**Step 2: Render the label**

Render the label next to the logo in the existing anchor, preserving outbound link behavior and low visual weight.

### Task 3: Verify

**Files:**
- Test: `src/components/PressMentions.test.tsx`
- Test: `src/pages/Index.test.tsx`

**Step 1: Run focused tests**

Run: `npm test -- src/components/PressMentions.test.tsx src/pages/Index.test.tsx`

Expected: PASS
