# Smart Download Nav Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make the header download button pick the right store for Android and iOS visitors and fall back to the localized CTA anchor when the platform is unknown.

**Architecture:** Add pure store-link helpers that infer a coarse platform from a user agent string and return the correct download URL for the navbar. Update the CTA section with a stable `id`, then have the header use the smart helper for both desktop and mobile download buttons.

**Tech Stack:** React, TypeScript, Vitest, Testing Library

---

### Task 1: Add failing store-link and header tests

**Files:**
- Modify: `src/lib/storeLinks.test.ts`
- Modify: `src/components/Header.test.tsx`

**Step 1: Write the failing tests**

- Add store-link tests for Android, iOS, and unknown user agents.
- Add a header test that verifies the navbar download button falls back to `/#cta` in the default unknown-platform test environment.

**Step 2: Run tests to verify they fail**

Run: `npm test -- src/lib/storeLinks.test.ts src/components/Header.test.tsx`
Expected: FAIL because no smart download helper exists yet and the header still points to the App Store.

**Step 3: Implement the minimal code**

- Add platform detection and smart URL selection in `src/lib/storeLinks.ts`.
- Update the header to use that helper.
- Add `id="cta"` to the CTA section.

**Step 4: Run tests to verify they pass**

Run: `npm test -- src/lib/storeLinks.test.ts src/components/Header.test.tsx`
Expected: PASS.

### Task 2: Final verification

**Files:**
- Modify: `src/lib/storeLinks.ts`
- Modify: `src/lib/storeLinks.test.ts`
- Modify: `src/components/Header.tsx`
- Modify: `src/components/Header.test.tsx`
- Modify: `src/components/CTA.tsx`

**Step 1: Re-run focused verification**

Run: `npm test -- src/lib/storeLinks.test.ts src/components/Header.test.tsx`
Expected: PASS.

**Step 2: Review the diff**

Run: `git diff -- src/lib/storeLinks.ts src/lib/storeLinks.test.ts src/components/Header.tsx src/components/Header.test.tsx src/components/CTA.tsx`
Expected: only the smart download helper, CTA anchor id, header usage, and related tests change.
