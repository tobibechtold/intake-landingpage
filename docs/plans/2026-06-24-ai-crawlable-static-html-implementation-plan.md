# AI Crawlable Static HTML Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Generate crawlable static HTML bodies for every prerendered Intake landing page while preserving the existing Vite React client app.

**Architecture:** Extend the current `scripts/prerender-seo.js` build step so it injects semantic route content into `#root` after the Vite build. Keep runtime behavior unchanged: the browser app still mounts with `createRoot` and replaces the static fallback.

**Tech Stack:** Vite, React, React Router, Vitest, Node ESM build scripts.

---

### Task 1: Static Body Regression Test

**Files:**
- Modify: `src/lib/prerenderSeo.test.ts`

**Step 1: Write the failing test**

Add a test that calls `buildPrerenderedHtml(template, "/en/calorie-counter-no-subscription")` and expects the returned HTML to contain:

- `<main id="static-prerender-content"`
- `A calorie counter without a subscription`
- `One-time purchase`
- `/en/features`

Add the German equivalent for `/kalorienzaehler-ohne-abo`, expecting:

- `Kalorienzähler ohne Abo`
- `Einmalkauf`
- `/funktionen`

**Step 2: Run test to verify it fails**

Run: `npm test -- src/lib/prerenderSeo.test.ts`

Expected: FAIL because `#root` is empty.

### Task 2: Inject Static Route Body

**Files:**
- Modify: `scripts/prerender-seo.js`

**Step 1: Add route content data**

Create a `STATIC_BODY_CONTENT` map for evergreen marketing, comparison, help, legal, home, and Intake AI routes, with title, description, sections, bullets, and links. Generate What's New index and detail route bodies from the existing release metadata.

**Step 2: Add HTML escaping helpers**

Use the existing `escapeAttr` pattern and add text/HTML helpers so generated body content is safe.

**Step 3: Replace empty root**

In `buildPrerenderedHtml`, replace `<div id="root"></div>` with:

```html
<div id="root">
  <main id="static-prerender-content" data-route="...">
    ...
  </main>
</div>
```

Keep the existing metadata replacement behavior.

**Step 4: Run test to verify it passes**

Run: `npm test -- src/lib/prerenderSeo.test.ts`

Expected: PASS.

### Task 3: AI Discovery Files

**Files:**
- Modify: `public/robots.txt`
- Create: `public/llms.txt`
- Create: `public/llms-full.txt`

**Step 1: Add explicit crawler access**

Add an explicit `User-agent: OAI-SearchBot` block with `Allow: /`.

**Step 2: Add `llms.txt`**

Write a concise bilingual Markdown overview linking to English and German home, no-subscription, no-account, features, comparison, privacy, and help pages.

**Step 3: Add `llms-full.txt`**

Write fuller plain Markdown context covering the positioning, pricing model, platform support, privacy model, included features, and comparison intent.

### Task 4: Build Verification

**Files:**
- Generated: `dist/**`

**Step 1: Run full tests**

Run: `npm test`

Expected: all tests pass.

**Step 2: Run build**

Run: `npm run build`

Expected: Vite build and prerender complete successfully.

**Step 3: Inspect generated HTML**

Run: `rg "static-prerender-content|A calorie counter without a subscription|Kalorienzähler ohne Abo" dist/en/calorie-counter-no-subscription/index.html dist/kalorienzaehler-ohne-abo/index.html`

Expected: both generated files contain route-specific body content.

Run: `rg "<section>" dist/**/*.html`

Expected: every prerendered HTML page contains at least one static section.
