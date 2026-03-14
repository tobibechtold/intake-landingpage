# Inline Video Behavior Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make inline What's New markdown videos autoplay and loop, and constrain them on desktop so they sit within the reading flow instead of using full width.

**Architecture:** Update the custom markdown renderer in `src/lib/whatsNewContent.ts` so generated video blocks include autoplay-safe attributes. Update the article prose container in `src/components/WhatsNewArticle.tsx` so inline videos inherit rounded media styling and narrower desktop sizing while keeping mobile full width. Lock the behavior in with focused unit and page tests.

**Tech Stack:** TypeScript, React 18, Tailwind, Vitest, Testing Library

---

### Task 1: Add a failing test for inline video autoplay markup

**Files:**
- Modify: `src/lib/whatsNewContent.test.ts`
- Test: `src/lib/whatsNewContent.test.ts`

**Step 1: Write the failing test**

```ts
it("renders embedded markdown videos with autoplay and loop attributes", () => {
  const entry = getWhatsNewEntry("2.1.1", "de");

  expect(entry?.bodyHtml).toContain("<video");
  expect(entry?.bodyHtml).toContain("autoplay");
  expect(entry?.bodyHtml).toContain("loop");
  expect(entry?.bodyHtml).toContain("muted");
  expect(entry?.bodyHtml).toContain("playsinline");
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- src/lib/whatsNewContent.test.ts`
Expected: FAIL because inline markdown videos currently render without autoplay and loop behavior.

**Step 3: Write minimal implementation**

```ts
return `<figure><video autoplay loop muted playsinline preload="metadata" ...></video></figure>`;
```

**Step 4: Run test to verify it passes**

Run: `npm test -- src/lib/whatsNewContent.test.ts`
Expected: PASS.

**Step 5: Commit**

```bash
git add src/lib/whatsNewContent.test.ts src/lib/whatsNewContent.ts
git commit -m "feat: autoplay inline release videos"
```

### Task 2: Add a failing page test for inline video rendering and article styling

**Files:**
- Modify: `src/pages/WhatsNewPage.test.tsx`
- Modify: `src/components/WhatsNewArticle.tsx`
- Test: `src/pages/WhatsNewPage.test.tsx`

**Step 1: Write the failing test**

```ts
it("renders inline release videos with autoplay behavior on the German detail page", () => {
  renderWithRoute("/de/whats-new/2.1.1", <WhatsNewEntry />);

  const video = screen.getByLabelText("Mahlzeit teilen");
  expect(video).toHaveAttribute("autoplay");
  expect(video).toHaveAttribute("loop");
});
```

Add a second assertion that the prose container class includes the desktop width constraint for inline videos.

**Step 2: Run test to verify it fails**

Run: `npm test -- src/pages/WhatsNewPage.test.tsx`
Expected: FAIL because the current video markup and prose styles do not include the new behavior.

**Step 3: Write minimal implementation**

```tsx
className="... prose-video:w-full md:prose-video:max-w-[34rem] ..."
```

Apply rounded border styling to `prose video` so inline videos match the surrounding article media.

**Step 4: Run test to verify it passes**

Run: `npm test -- src/pages/WhatsNewPage.test.tsx`
Expected: PASS.

**Step 5: Commit**

```bash
git add src/pages/WhatsNewPage.test.tsx src/components/WhatsNewArticle.tsx
git commit -m "style: constrain inline release videos"
```

### Task 3: Verify the focused change set

**Files:**
- Modify: `src/lib/whatsNewContent.ts`
- Modify: `src/lib/whatsNewContent.test.ts`
- Modify: `src/components/WhatsNewArticle.tsx`
- Modify: `src/pages/WhatsNewPage.test.tsx`

**Step 1: Run the focused parser and page tests**

Run: `npm test -- src/lib/whatsNewContent.test.ts src/pages/WhatsNewPage.test.tsx`
Expected: PASS.

**Step 2: Review the diff**

Run: `git diff -- src/lib/whatsNewContent.ts src/lib/whatsNewContent.test.ts src/components/WhatsNewArticle.tsx src/pages/WhatsNewPage.test.tsx`
Expected: Only inline video markup, styling, and tests change.

**Step 3: Commit**

```bash
git add src/lib/whatsNewContent.ts src/lib/whatsNewContent.test.ts src/components/WhatsNewArticle.tsx src/pages/WhatsNewPage.test.tsx
git commit -m "fix: refine inline release video behavior"
```
