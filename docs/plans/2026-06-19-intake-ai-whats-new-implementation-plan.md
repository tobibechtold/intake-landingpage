# Intake AI What's New Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add the localized Intake 2.4.0 What's New page for the Intake AI release.

**Architecture:** The site loads release notes from Markdown files in `content/whats-new/*/*.md` using `src/lib/whatsNewContent.ts`. Adding a version means adding localized Markdown and assets; the existing renderer and routes will expose it automatically.

**Tech Stack:** Vite, React, TypeScript, Vitest, Markdown content imported with `import.meta.glob`.

---

### Task 1: Write Failing Content Tests

**Files:**
- Modify: `src/lib/whatsNewContent.test.ts`
- Modify: `src/pages/WhatsNewPage.test.tsx`

**Step 1: Write the failing tests**

Update the content test to expect English entries to return version `2.4.0` first. Add assertions that the 2.4.0 English body includes the BYOK section and clarifies that ChatGPT and Claude subscriptions do not include API keys.

Update the German overview page test to expect `Was ist neu in Intake 2.4.0` and link to `/whats-new/2.4.0`.

**Step 2: Run tests to verify they fail**

Run: `npm test -- src/lib/whatsNewContent.test.ts src/pages/WhatsNewPage.test.tsx`

Expected: FAIL because the 2.4.0 content does not exist yet and the overview still shows the previous latest release.

### Task 2: Add 2.4.0 Content and Cover

**Files:**
- Create: `content/whats-new/2.4.0/en.md`
- Create: `content/whats-new/2.4.0/de.md`
- Create: `content/whats-new/2.4.0/assets/cover.svg`

**Step 1: Add localized Markdown**

Create English and German release notes with frontmatter:
- `version: "2.4.0"`
- `publishedAt: "2026-06-21"`
- `coverImage: "./assets/cover.svg"`
- highlights focused on Intake AI and BYOK.

**Step 2: Add copied SVG cover**

Copy the previous release cover SVG structure and update title, description, `Version 2.4.0`, and the subtitle to reference Intake AI.

**Step 3: Run tests to verify they pass**

Run: `npm test -- src/lib/whatsNewContent.test.ts src/pages/WhatsNewPage.test.tsx`

Expected: PASS.

### Task 3: Run Focused Verification

**Files:**
- No additional edits expected.

**Step 1: Run relevant tests**

Run: `npm test -- src/lib/whatsNewContent.test.ts src/pages/WhatsNewPage.test.tsx`

Expected: PASS with no unexpected warnings.
