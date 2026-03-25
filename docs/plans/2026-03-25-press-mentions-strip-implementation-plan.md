# Press Mentions Strip Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a small localized press-mentions strip below the hero that links to third-party articles about Intake.

**Architecture:** Build one data-driven `PressMentions` component with localized section labeling and publication metadata, then render it once on the homepage below the hero. Keep the implementation narrow: static assets, a small data list, one presentational component, and regression coverage for both locales.

**Tech Stack:** React 18, TypeScript, Vite, React Router, Vitest, existing landing-page component system

---

### Task 1: Add failing tests for the new press-mentions strip

**Files:**
- Create: `src/components/PressMentions.test.tsx`
- Reference: `src/pages/Index.tsx`
- Reference: `src/i18n/LanguageContext.tsx`

**Step 1: Write the failing German-route test**

Add a test that renders the homepage on `/` and expects:

- the localized label `Bekannt aus`
- links for the three publications
- direct outbound article URLs

Example shape:

```tsx
expect(screen.getByText("Bekannt aus")).toBeInTheDocument();
expect(screen.getByRole("link", { name: /iphone-ticker/i })).toHaveAttribute("href", "...");
```

**Step 2: Write the failing English-route test**

Render the homepage on `/en` and expect:

- the localized label `Featured in`
- the same publication links

**Step 3: Run the targeted test to verify it fails**

Run: `npm test -- src/components/PressMentions.test.tsx`

Expected: FAIL because the component does not exist yet.

**Step 4: Tighten assertions if needed**

Keep the test focused on presence, labeling, and links rather than exact styling classes.

**Step 5: Commit**

Do not commit yet.

### Task 2: Add publication assets and press metadata

**Files:**
- Create: `src/assets/press/<logo files>`
- Create: `src/lib/pressMentions.ts`

**Step 1: Add normalized logo assets**

Check in the publication wordmarks or logos under `src/assets/press/`.

Prefer:

- SVG first
- consistent visual framing
- transparent backgrounds where possible

**Step 2: Add a data module**

Create `src/lib/pressMentions.ts` with entries like:

```ts
export interface PressMention {
  name: string;
  articleUrl: string;
  logoSrc: string;
  articleTitle: {
    de: string;
    en: string;
  };
}
```

Include the three approved article URLs and localized accessible labels.

**Step 3: Review the data once**

Confirm:

- URLs point directly to the approved articles
- names are publication names, not article headlines
- asset imports resolve cleanly

**Step 4: Commit**

Do not commit yet.

### Task 3: Build the `PressMentions` component

**Files:**
- Create: `src/components/PressMentions.tsx`
- Modify: `src/i18n/translations.ts`
- Test: `src/components/PressMentions.test.tsx`

**Step 1: Add localized label strings**

Add translation keys for:

- `pressMentionsLabel`
  - German: `Bekannt aus`
  - English: `Featured in`

**Step 2: Build the component**

Render:

- the localized label
- a responsive row / wrapped grid of publication links
- publication logos with accessible `aria-label`

Use:

- `target="_blank"`
- `rel="noopener noreferrer"`

Keep the styling low-weight and consistent with the landing page.

**Step 3: Run the targeted test**

Run: `npm test -- src/components/PressMentions.test.tsx`

Expected: PASS

**Step 4: Sanity-check accessibility**

Confirm each logo link has a useful accessible label and the logos have empty alt text if the link label already carries the meaning.

**Step 5: Commit**

```bash
git add src/components/PressMentions.tsx src/components/PressMentions.test.tsx src/i18n/translations.ts src/lib/pressMentions.ts src/assets/press
git commit -m "feat: add landing page press mentions"
```

### Task 4: Integrate the strip below the hero

**Files:**
- Modify: `src/pages/Index.tsx`
- Test: `src/pages/Index.test.tsx`
- Test: `src/components/PressMentions.test.tsx`

**Step 1: Insert the component below the hero**

Render `<PressMentions />` immediately after `<Hero />`.

**Step 2: Add a homepage-level smoke assertion if useful**

If `Index.test.tsx` is the better place for route-specific integration coverage, add one small assertion that the new section appears on `/` and `/en`.

**Step 3: Run the targeted homepage tests**

Run: `npm test -- src/components/PressMentions.test.tsx src/pages/Index.test.tsx`

Expected: PASS

**Step 4: Review visual scope**

Confirm the strip remains compact and does not visually overpower the hero.

**Step 5: Commit**

```bash
git add src/pages/Index.tsx src/pages/Index.test.tsx
git commit -m "feat: place press mentions below hero"
```

### Task 5: Full verification

**Files:**
- Reference: `src/components/PressMentions.tsx`
- Reference: `src/lib/pressMentions.ts`
- Reference: `src/pages/Index.tsx`

**Step 1: Run the focused test set**

Run: `npm test -- src/components/PressMentions.test.tsx src/pages/Index.test.tsx`

Expected: PASS

**Step 2: Manually review both locales**

Check:

- `/` shows `Bekannt aus`
- `/en` shows `Featured in`
- all three logos render
- all links open the intended article pages

**Step 3: Review diff scope**

Confirm the change is limited to the new trust strip, its data, assets, translations, and tests.

**Step 4: Commit**

```bash
git add docs/plans/2026-03-25-press-mentions-strip-design.md docs/plans/2026-03-25-press-mentions-strip-implementation-plan.md
git commit -m "docs: add press mentions strip plan"
```
