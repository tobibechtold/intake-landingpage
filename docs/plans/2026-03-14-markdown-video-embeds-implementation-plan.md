# Markdown Video Embeds Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Allow What's New markdown entries to embed playable feature videos directly in the article body using the existing `![alt](asset)` syntax.

**Architecture:** Extend the existing custom markdown renderer in `src/lib/whatsNewContent.ts` so standalone media blocks inspect the resolved asset extension and branch between image and video HTML. Keep the top-level `video` frontmatter flow unchanged and add focused unit tests around generated HTML to lock in behavior.

**Tech Stack:** TypeScript, Vite `import.meta.glob`, Vitest

---

### Task 1: Add a failing test for markdown-body video embeds

**Files:**
- Modify: `src/lib/whatsNewContent.test.ts`
- Test: `src/lib/whatsNewContent.test.ts`

**Step 1: Write the failing test**

```ts
it("renders embedded mp4 markdown media as a video block", () => {
  const entry = getWhatsNewEntry("2.1.1", "de");

  expect(entry?.bodyHtml).toContain("<video");
  expect(entry?.bodyHtml).toContain("share-recipes");
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- src/lib/whatsNewContent.test.ts`
Expected: FAIL because the renderer still emits `<img>` for `.mp4` content.

**Step 3: Write minimal implementation**

```ts
const videoExtensions = new Set([".mp4", ".webm", ".ogg"]);
```

Add a helper that checks the media path extension and branches to either `<video controls preload="metadata">` or `<img>`.

**Step 4: Run test to verify it passes**

Run: `npm test -- src/lib/whatsNewContent.test.ts`
Expected: PASS for the new test.

**Step 5: Commit**

```bash
git add src/lib/whatsNewContent.test.ts src/lib/whatsNewContent.ts
git commit -m "fix: render markdown video embeds"
```

### Task 2: Lock in image behavior and video markup details

**Files:**
- Modify: `src/lib/whatsNewContent.test.ts`
- Modify: `src/lib/whatsNewContent.ts`
- Test: `src/lib/whatsNewContent.test.ts`

**Step 1: Write the failing test**

```ts
it("keeps image markdown media as image blocks", () => {
  const entry = getWhatsNewEntry("2.1.1", "en");

  expect(entry?.bodyHtml).toContain("<img");
  expect(entry?.bodyHtml).not.toContain("search.svg\"></video>");
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- src/lib/whatsNewContent.test.ts`
Expected: FAIL until the renderer distinguishes image and video extensions correctly.

**Step 3: Write minimal implementation**

```ts
return `<figure><video controls preload="metadata" src="${...}" aria-label="${...}"></video></figure>`;
```

Use the alt text as `aria-label` on videos for basic accessibility, and keep image alt text unchanged.

**Step 4: Run test to verify it passes**

Run: `npm test -- src/lib/whatsNewContent.test.ts`
Expected: PASS for both image and video cases.

**Step 5: Commit**

```bash
git add src/lib/whatsNewContent.test.ts src/lib/whatsNewContent.ts
git commit -m "test: cover markdown media rendering"
```

### Task 3: Verify the focused change set

**Files:**
- Modify: `src/lib/whatsNewContent.test.ts`
- Modify: `src/lib/whatsNewContent.ts`

**Step 1: Run the focused tests**

Run: `npm test -- src/lib/whatsNewContent.test.ts`
Expected: PASS.

**Step 2: Run the broader related test slice**

Run: `npm test -- src/lib/whatsNewContent.test.ts src/pages/WhatsNewPage.test.tsx`
Expected: PASS with no regressions in What's New page rendering.

**Step 3: Review the generated diff**

Run: `git diff -- src/lib/whatsNewContent.ts src/lib/whatsNewContent.test.ts`
Expected: Only the markdown media branch and tests change.

**Step 4: Commit**

```bash
git add src/lib/whatsNewContent.ts src/lib/whatsNewContent.test.ts
git commit -m "fix: support markdown video embeds"
```
