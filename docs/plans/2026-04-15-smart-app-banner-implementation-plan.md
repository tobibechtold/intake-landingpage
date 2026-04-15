# Smart App Banner Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add the iOS Smart App Banner meta tag to the landing-page template and verify that prerendered HTML preserves it.

**Architecture:** Keep the banner metadata in `index.html`, which is the earliest and most reliable place for Safari to detect it. Add a regression test that reads the real template and asserts the prerender helper carries the tag through generated HTML.

**Tech Stack:** Vite, React, TypeScript, Vitest

---

### Task 1: Add a failing Smart App Banner regression test

**Files:**
- Modify: `src/lib/favicon.test.ts`

**Step 1: Write the failing test**

- Add a test that reads `index.html` and expects `<meta name="apple-itunes-app" content="app-id=6757768955" />`.
- Build prerendered home HTML from that template and expect the same meta tag to still be present.

**Step 2: Run test to verify it fails**

Run: `npm test -- src/lib/favicon.test.ts`
Expected: FAIL because `index.html` does not yet declare the Smart App Banner meta tag.

**Step 3: Write minimal implementation**

- Add `<meta name="apple-itunes-app" content="app-id=6757768955" />` to `index.html`.

**Step 4: Run test to verify it passes**

Run: `npm test -- src/lib/favicon.test.ts`
Expected: PASS.

### Task 2: Final verification

**Files:**
- Modify: `index.html`
- Modify: `src/lib/favicon.test.ts`

**Step 1: Re-run focused verification**

Run: `npm test -- src/lib/favicon.test.ts`
Expected: PASS.

**Step 2: Review the diff**

Run: `git diff -- index.html src/lib/favicon.test.ts docs/plans/2026-04-15-smart-app-banner-design.md docs/plans/2026-04-15-smart-app-banner-implementation-plan.md`
Expected: only the Smart App Banner tag, its regression test, and the matching plan docs change.
