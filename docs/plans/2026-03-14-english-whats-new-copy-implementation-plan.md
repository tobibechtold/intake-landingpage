# English What's New Copy Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rewrite the English `2.1.1` What's New entry in natural English while preserving the actual shipped features from the German source entry.

**Architecture:** Update only the localized markdown content in `content/whats-new/2.1.1/en.md`. Keep the existing frontmatter and media references valid, align the English structure with the German source, and verify the content still passes the existing What's New parser and page tests.

**Tech Stack:** Markdown frontmatter content, Vite content loading, Vitest

---

### Task 1: Rewrite the English release entry from the German source

**Files:**
- Modify: `content/whats-new/2.1.1/en.md`

**Step 1: Update frontmatter copy**

Rewrite:
- `summary`
- `highlights`

Keep:
- `version`
- `publishedAt`
- `coverImage`

**Step 2: Rewrite the article body**

Replace the placeholder English copy with natural English sections covering:
- meal actions
- macro percentages
- search improvements
- the new What's New settings entry
- portion step changes
- bug fixes and closing note

Preserve the relevant video embeds.

**Step 3: Review the markdown for parser compatibility**

Check that headings, paragraphs, lists, and media embeds still use the supported markdown subset.

**Step 4: Commit**

```bash
git add content/whats-new/2.1.1/en.md
git commit -m "docs: rewrite english whats new copy"
```

### Task 2: Verify the updated content

**Files:**
- Modify: `content/whats-new/2.1.1/en.md`
- Test: `src/lib/whatsNewContent.test.ts`
- Test: `src/pages/WhatsNewPage.test.tsx`

**Step 1: Run focused What's New tests**

Run: `npm test -- src/lib/whatsNewContent.test.ts src/pages/WhatsNewPage.test.tsx`
Expected: PASS.

**Step 2: Review the diff**

Run: `git diff -- content/whats-new/2.1.1/en.md`
Expected: Only English release copy changes.

**Step 3: Commit**

```bash
git add content/whats-new/2.1.1/en.md
git commit -m "docs: update english release notes"
```
