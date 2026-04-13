# Header Left-Aligned Nav Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Move the top navigation into the left-side brand cluster so the header feels less centered and crowded.

**Architecture:** Restructure the header shell into a left cluster for brand plus nav and a right cluster for utility actions, then lock the layout with a focused header test.

**Tech Stack:** React, TypeScript, Vitest, Testing Library, Tailwind CSS

---

### Task 1: Add the failing header test

**Files:**
- Modify: `src/components/Header.test.tsx`

**Step 1: Write the failing test**

Assert that:
- the header exposes a left cluster wrapper
- the left cluster contains the home link and desktop nav
- the utility controls remain in a separate right cluster

**Step 2: Run test to verify it fails**

Run: `npm test -- src/components/Header.test.tsx`

Expected: FAIL because the current markup does not expose the new grouping hooks.

**Step 3: Write minimal implementation**

- Add explicit wrappers/data attributes for the left brand-nav cluster and right controls cluster.
- Keep behavior unchanged apart from layout grouping.

**Step 4: Run test to verify it passes**

Run: `npm test -- src/components/Header.test.tsx`

Expected: PASS.

### Task 2: Verification

**Files:**
- No code changes expected

**Step 1: Run focused regression**

Run: `npm test -- src/components/Header.test.tsx src/pages/Index.test.tsx`

Expected: PASS.

**Step 2: Run build**

Run: `npm run build`

Expected: PASS.
