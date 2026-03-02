# Browser Language Redirect Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Redirect German-browser users from English locale routes to equivalent `/de` routes on every visit.

**Architecture:** Add a pure redirect decision helper and mount a small router observer component that performs navigation when conditions are met.

**Tech Stack:** React, React Router, TypeScript, Vitest.

---

### Task 1: Redirect decision helper with tests

**Files:**
- Create: `src/lib/localeRedirect.ts`
- Create: `src/lib/localeRedirect.test.ts`

**Step 1:** Write failing tests for German and non-German browser languages across supported paths.

**Step 2:** Run tests and confirm failure.

**Step 3:** Implement minimal helper returning redirect path or `null`.

**Step 4:** Run tests and confirm pass.

### Task 2: Router redirect component

**Files:**
- Create: `src/components/LocaleRedirect.tsx`
- Modify: `src/App.tsx`

**Step 1:** Implement route observer that navigates when helper returns localized path.

**Step 2:** Mount component under `BrowserRouter`.

### Task 3: Verification

**Step 1:** Run `npm test`.

**Step 2:** Run `npm run build`.
