# Header Help And Roadmap Return Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Restore `Help` to the top navigation, bring the roadmap section back to the homepage, and loosen the desktop nav spacing.

**Architecture:** Update the header nav item list and desktop nav spacing, restore the homepage `FeatureVoting` section, and lock the behavior with focused header and homepage tests.

**Tech Stack:** React, TypeScript, Vitest, Testing Library, Tailwind CSS

---

### Task 1: Update the tests first

**Files:**
- Modify: `src/components/Header.test.tsx`
- Modify: `src/pages/Index.test.tsx`

**Step 1: Write the failing tests**

- Expect `Help` in the header nav.
- Continue to exclude `Feature Voting` from the header nav.
- Expect the homepage roadmap CTA to be present again.

**Step 2: Run test to verify it fails**

Run: `npm test -- src/components/Header.test.tsx src/pages/Index.test.tsx`

Expected: FAIL because `Help` is not in the header and the roadmap section is absent.

**Step 3: Write minimal implementation**

- Add `Help` to the top nav items in `Header.tsx`.
- Increase desktop nav gap and add light horizontal padding to nav links.
- Restore `FeatureVoting` in `Index.tsx`.

**Step 4: Run test to verify it passes**

Run: `npm test -- src/components/Header.test.tsx src/pages/Index.test.tsx`

Expected: PASS.

### Task 2: Run affected verification

**Files:**
- No code changes expected

**Step 1: Run focused verification**

Run: `npm test -- src/components/Header.test.tsx src/pages/Index.test.tsx src/components/Footer.test.tsx src/pages/HelpPage.test.tsx`

Expected: PASS.

**Step 2: Run build verification**

Run: `npm run build`

Expected: PASS.
