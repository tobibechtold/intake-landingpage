# Link Chip Hover Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make clickable pill-shaped links visually distinct from informational pills by giving them a dedicated interactive chip style.

**Architecture:** Keep the existing `trust-chip` utility for static pills and add a new utility for clickable link chips in `src/index.css`. Update the related-page links and comparison next-step links to use the new class, and cover the behavior with focused tests on those real link surfaces.

**Tech Stack:** React, TypeScript, Vitest, Testing Library, Tailwind CSS

---

### Task 1: Add failing tests

**Files:**
- Modify: `src/pages/IntentPages.test.tsx`
- Modify: `src/pages/ComparisonsPage.test.tsx`

**Step 1: Write the failing tests**

- Assert a related-page link uses the interactive chip class.
- Assert a comparison next-step link uses the interactive chip class.

**Step 2: Run test to verify it fails**

Run: `npm test -- src/pages/IntentPages.test.tsx src/pages/ComparisonsPage.test.tsx`
Expected: FAIL because those links still use `trust-chip`.

**Step 3: Write the minimal implementation**

- Add a new interactive chip utility in `src/index.css`.
- Update the relevant `Link` components to use it.

**Step 4: Run test to verify it passes**

Run: `npm test -- src/pages/IntentPages.test.tsx src/pages/ComparisonsPage.test.tsx`
Expected: PASS.
