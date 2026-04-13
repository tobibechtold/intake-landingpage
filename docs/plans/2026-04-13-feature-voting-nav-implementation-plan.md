# Feature Voting Nav Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add `Feature Voting` to header and footer navigation and restyle header nav items as soft pills so links look clearly interactive.

**Architecture:** Extend the translation table with a shared `featureVotingNav` label, update the header nav model to support both internal and external entries across desktop and mobile, and add the external footer link in the existing app group. Keep routing behavior unchanged for internal destinations and use a normal external anchor for the feature voting destination.

**Tech Stack:** React, TypeScript, react-router-dom, Vitest, Testing Library, Tailwind CSS

---

### Task 1: Header and Footer Tests

**Files:**
- Modify: `src/components/Header.test.tsx`
- Modify: `src/components/Footer.test.tsx`

**Step 1: Write the failing tests**

- Add a header assertion that `Feature Voting` appears as a link and points to `https://featurevoting.tobibechtold.dev/app/intake`.
- Add a footer assertion that `Feature Voting` appears in the app link group and points to the same URL.

**Step 2: Run tests to verify they fail**

Run: `npm test -- src/components/Header.test.tsx src/components/Footer.test.tsx`
Expected: FAIL because the new link does not exist yet.

**Step 3: Write minimal implementation**

- Add the new nav item and footer link.
- Keep the label shared across locales as `Feature Voting`.

**Step 4: Run tests to verify they pass**

Run: `npm test -- src/components/Header.test.tsx src/components/Footer.test.tsx`
Expected: PASS.

### Task 2: Header Link Affordance

**Files:**
- Modify: `src/components/Header.tsx`
- Modify: `src/i18n/translations.ts`

**Step 1: Expand the nav model**

- Add a translation key for `featureVotingNav`.
- Represent header items in a way that supports both router links and external anchors.

**Step 2: Apply soft pill styling**

- Give desktop and mobile header nav items rounded-full or rounded-2xl shapes with subtle border/background states.
- Preserve a stronger visual hierarchy for the `Download` button.

**Step 3: Verify focused tests**

Run: `npm test -- src/components/Header.test.tsx src/components/Footer.test.tsx`
Expected: PASS.

### Task 3: Final Verification

**Files:**
- Modify: `src/components/Header.tsx`
- Modify: `src/components/Footer.tsx`
- Modify: `src/i18n/translations.ts`
- Modify: `src/components/Header.test.tsx`
- Modify: `src/components/Footer.test.tsx`

**Step 1: Run the focused verification command**

Run: `npm test -- src/components/Header.test.tsx src/components/Footer.test.tsx`
Expected: PASS with no failures.

**Step 2: Review the diff**

Run: `git diff -- src/components/Header.tsx src/components/Footer.tsx src/i18n/translations.ts src/components/Header.test.tsx src/components/Footer.test.tsx`
Expected: only the nav label, nav structure, footer link, and related tests change.
