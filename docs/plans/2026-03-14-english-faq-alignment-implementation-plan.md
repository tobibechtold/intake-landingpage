# English FAQ Alignment Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Update the English FAQ entries so they match the newly expanded German FAQ content closely.

**Architecture:** Modify only the English portion of `src/lib/faqData.ts`, preserving the existing `FAQ_BY_LANGUAGE` structure and keeping the English entry order aligned with the German source. Since the FAQ data is plain static content and there is no dedicated FAQ test file, verification will use the existing test suite plus diff review.

**Tech Stack:** TypeScript static data

---

### Task 1: Rewrite the English FAQ entries

**Files:**
- Modify: `src/lib/faqData.ts`

**Step 1: Expand existing English answers**

Update the existing English items so they reflect the fuller German meaning for:
- subscription / one-time purchase
- food data sources
- privacy

**Step 2: Add the new English FAQ items**

Add English entries for:
- trial period
- Apple Health / Health Connect read behavior
- historical weight import
- activity calories in daily targets
- Apple Health / Health Connect write behavior
- custom goals
- personalization
- AI food recognition

**Step 3: Keep ordering aligned**

Ensure the English FAQ item order broadly mirrors the German list so future locale maintenance stays simple.

**Step 4: Commit**

```bash
git add src/lib/faqData.ts
git commit -m "docs: align english faq with german content"
```

### Task 2: Verify the change

**Files:**
- Modify: `src/lib/faqData.ts`

**Step 1: Run an available project test slice**

Run: `npm test`
Expected: PASS, or report any unrelated failures explicitly if they occur.

**Step 2: Review the diff**

Run: `git diff -- src/lib/faqData.ts`
Expected: Only English FAQ content changes.

**Step 3: Commit**

```bash
git add src/lib/faqData.ts
git commit -m "docs: add english faq entries"
```
