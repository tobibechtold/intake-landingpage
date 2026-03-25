# Landing Page UI/UX Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Redesign the home page to drive more App Store installs by making the switch case for Intake clearer while preserving the hero video, FAQ, Product Updates, and feature-voting roadmap link.

**Architecture:** Keep the existing React single-page structure and refactor the home page into a sharper conversion narrative. Update global styling tokens to better match the app screenshots, add dedicated switch/comparison/proof sections, and revise existing sections so they support the new story instead of competing with it.

**Tech Stack:** React 18, TypeScript, Tailwind CSS, shadcn/ui, React Router, Vitest, Testing Library

---

### Task 1: Add failing tests for the new conversion narrative on the home page

**Files:**
- Modify: `src/pages/Index.tsx`
- Create: `src/pages/Index.test.tsx`

**Step 1: Write the failing test**

Create `src/pages/Index.test.tsx` and assert that the home page renders:
- the hero section with App Store CTA
- a switch-focused section heading
- a comparison section heading
- Product Updates
- FAQ
- the feature voting call-to-action

**Step 2: Run test to verify it fails**

Run: `npm test -- src/pages/Index.test.tsx`
Expected: FAIL because the new switch/comparison sections do not exist yet.

**Step 3: Write minimal implementation**

Update `src/pages/Index.tsx` to reserve space for the new conversion-story sections in the approved order while keeping the existing fixed sections mounted.

**Step 4: Run test to verify it passes**

Run: `npm test -- src/pages/Index.test.tsx`
Expected: PASS.

**Step 5: Commit**

```bash
git add src/pages/Index.tsx src/pages/Index.test.tsx
git commit -m "test: cover landing page conversion narrative"
```

### Task 2: Add failing tests for the updated hero messaging and trust chips

**Files:**
- Modify: `src/components/Hero.tsx`
- Create: `src/components/Hero.test.tsx`
- Modify: `src/i18n/translations.ts`

**Step 1: Write the failing test**

Create `src/components/Hero.test.tsx` and assert that the hero renders:
- the demo video
- an App Store CTA
- a secondary CTA targeting the comparison/switch section
- trust chips for one-time purchase, no account, and on-device privacy

**Step 2: Run test to verify it fails**

Run: `npm test -- src/components/Hero.test.tsx`
Expected: FAIL because the hero does not yet expose the new copy structure or trust chips.

**Step 3: Write minimal implementation**

Update hero copy, CTA layout, anchor targets, and translation entries while preserving the existing video demo behavior.

**Step 4: Run test to verify it passes**

Run: `npm test -- src/components/Hero.test.tsx`
Expected: PASS.

**Step 5: Commit**

```bash
git add src/components/Hero.tsx src/components/Hero.test.tsx src/i18n/translations.ts
git commit -m "feat: sharpen hero switch messaging"
```

### Task 3: Add the Why Switch section

**Files:**
- Create: `src/components/WhySwitch.tsx`
- Create: `src/components/WhySwitch.test.tsx`
- Modify: `src/i18n/translations.ts`
- Modify: `src/pages/Index.tsx`

**Step 1: Write the failing test**

Create a test that asserts the section renders three generic switch reasons and mounts on the home page after the hero.

**Step 2: Run test to verify it fails**

Run: `npm test -- src/components/WhySwitch.test.tsx src/pages/Index.test.tsx`
Expected: FAIL because the component does not exist and the home page does not render it.

**Step 3: Write minimal implementation**

Create `src/components/WhySwitch.tsx`, wire in localized copy, and insert the section below the hero.

**Step 4: Run test to verify it passes**

Run: `npm test -- src/components/WhySwitch.test.tsx src/pages/Index.test.tsx`
Expected: PASS.

**Step 5: Commit**

```bash
git add src/components/WhySwitch.tsx src/components/WhySwitch.test.tsx src/i18n/translations.ts src/pages/Index.tsx
git commit -m "feat: add why switch section"
```

### Task 4: Add the generic comparison table

**Files:**
- Create: `src/components/ComparisonTable.tsx`
- Create: `src/components/ComparisonTable.test.tsx`
- Modify: `src/i18n/translations.ts`
- Modify: `src/pages/Index.tsx`

**Step 1: Write the failing test**

Create a test that asserts the comparison table renders `Intake` alongside `Typical subscription trackers` and includes rows for subscription, account, on-device data, and ongoing cost.

**Step 2: Run test to verify it fails**

Run: `npm test -- src/components/ComparisonTable.test.tsx`
Expected: FAIL because the component does not exist yet.

**Step 3: Write minimal implementation**

Create the comparison component with accessible table semantics, non-color-only status indicators, and mount it after the Why Switch section.

**Step 4: Run test to verify it passes**

Run: `npm test -- src/components/ComparisonTable.test.tsx src/pages/Index.test.tsx`
Expected: PASS.

**Step 5: Commit**

```bash
git add src/components/ComparisonTable.tsx src/components/ComparisonTable.test.tsx src/i18n/translations.ts src/pages/Index.tsx
git commit -m "feat: add landing page comparison table"
```

### Task 5: Replace the screenshot-only emphasis with proof stories

**Files:**
- Create: `src/components/ProofStories.tsx`
- Create: `src/components/ProofStories.test.tsx`
- Modify: `src/components/ScreenshotGallery.tsx`
- Modify: `src/i18n/translations.ts`
- Modify: `src/pages/Index.tsx`

**Step 1: Write the failing test**

Create a test that asserts three proof-story headings render with supporting copy and that the existing screenshot gallery remains available as secondary proof.

**Step 2: Run test to verify it fails**

Run: `npm test -- src/components/ProofStories.test.tsx`
Expected: FAIL because the proof story component does not exist yet.

**Step 3: Write minimal implementation**

Create the proof-story component using existing screenshot assets, simplify `ScreenshotGallery.tsx` so it plays a supporting role, and position both in the updated home page narrative.

**Step 4: Run test to verify it passes**

Run: `npm test -- src/components/ProofStories.test.tsx src/pages/Index.test.tsx`
Expected: PASS.

**Step 5: Commit**

```bash
git add src/components/ProofStories.tsx src/components/ProofStories.test.tsx src/components/ScreenshotGallery.tsx src/i18n/translations.ts src/pages/Index.tsx
git commit -m "feat: add story-led product proof"
```

### Task 6: Rework reviews for readability instead of constant motion

**Files:**
- Modify: `src/components/Reviews.tsx`
- Create: `src/components/Reviews.test.tsx`

**Step 1: Write the failing test**

Create tests that assert:
- a compact aggregate trust summary renders
- featured reviews remain readable
- the section no longer depends on continuous auto-scroll for core content

**Step 2: Run test to verify it fails**

Run: `npm test -- src/components/Reviews.test.tsx`
Expected: FAIL because the current review section has no trust summary and still uses auto-scroll-driven presentation.

**Step 3: Write minimal implementation**

Refactor the review section to prioritize readability, optional interaction, and clearer trust framing.

**Step 4: Run test to verify it passes**

Run: `npm test -- src/components/Reviews.test.tsx`
Expected: PASS.

**Step 5: Commit**

```bash
git add src/components/Reviews.tsx src/components/Reviews.test.tsx
git commit -m "feat: improve landing page social proof"
```

### Task 7: Align the visual system with the actual app

**Files:**
- Modify: `src/index.css`
- Modify: `src/components/Header.tsx`
- Modify: `src/components/Features.tsx`
- Modify: `src/components/FeatureVoting.tsx`
- Modify: `src/components/CTA.tsx`
- Modify: `src/components/ProductUpdatesPreview.tsx`
- Modify: `src/components/Faq.tsx`

**Step 1: Write the failing test**

Add or update a focused snapshot/style-structure test where useful, but keep the main failure signal structural:
- stronger hero CTA prominence
- preserved FAQ / Product Updates / Feature Voting sections
- updated section labels and IDs needed for anchor navigation

**Step 2: Run test to verify it fails**

Run: `npm test -- src/pages/Index.test.tsx src/components/Hero.test.tsx`
Expected: FAIL because the visual hierarchy and anchor structure are not yet aligned with the approved redesign.

**Step 3: Write minimal implementation**

Update design tokens, section styling, CTA emphasis, and card rhythm so the page visually matches the app’s charcoal-and-pink language while keeping the existing preserved sections functional.

**Step 4: Run test to verify it passes**

Run: `npm test -- src/pages/Index.test.tsx src/components/Hero.test.tsx src/components/WhySwitch.test.tsx src/components/ComparisonTable.test.tsx src/components/ProofStories.test.tsx src/components/Reviews.test.tsx`
Expected: PASS.

**Step 5: Commit**

```bash
git add src/index.css src/components/Header.tsx src/components/Features.tsx src/components/FeatureVoting.tsx src/components/CTA.tsx src/components/ProductUpdatesPreview.tsx src/components/Faq.tsx
git commit -m "feat: align landing page styling with app visuals"
```

### Task 8: Verify the complete redesign

**Files:**
- Modify: `src/pages/Index.tsx`
- Modify: `src/components/Hero.tsx`
- Modify: `src/components/WhySwitch.tsx`
- Modify: `src/components/ComparisonTable.tsx`
- Modify: `src/components/ProofStories.tsx`
- Modify: `src/components/Reviews.tsx`
- Modify: `src/components/ScreenshotGallery.tsx`
- Modify: `src/components/ProductUpdatesPreview.tsx`
- Modify: `src/components/Faq.tsx`
- Modify: `src/components/FeatureVoting.tsx`
- Modify: `src/components/CTA.tsx`
- Modify: `src/index.css`
- Modify: `src/i18n/translations.ts`

**Step 1: Run focused tests**

Run: `npm test -- src/pages/Index.test.tsx src/components/Hero.test.tsx src/components/WhySwitch.test.tsx src/components/ComparisonTable.test.tsx src/components/ProofStories.test.tsx src/components/Reviews.test.tsx`
Expected: PASS.

**Step 2: Run the broader test suite**

Run: `npm test`
Expected: PASS with no regressions in home page, routing, localized content, or store-link behavior.

**Step 3: Run production build**

Run: `npm run build`
Expected: PASS and produce the Vite production bundle successfully.

**Step 4: Review the diff**

Run: `git diff -- docs/plans/2026-03-24-landingpage-ui-ux-design.md docs/plans/2026-03-24-landingpage-ui-ux-implementation-plan.md src/pages/Index.tsx src/components/Hero.tsx src/components/WhySwitch.tsx src/components/ComparisonTable.tsx src/components/ProofStories.tsx src/components/Reviews.tsx src/components/ScreenshotGallery.tsx src/components/ProductUpdatesPreview.tsx src/components/Faq.tsx src/components/FeatureVoting.tsx src/components/CTA.tsx src/components/Header.tsx src/components/Features.tsx src/index.css src/i18n/translations.ts`
Expected: Only landing-page redesign files and their tests are included.

**Step 5: Commit**

```bash
git add docs/plans/2026-03-24-landingpage-ui-ux-design.md docs/plans/2026-03-24-landingpage-ui-ux-implementation-plan.md src/pages/Index.tsx src/pages/Index.test.tsx src/components/Hero.tsx src/components/Hero.test.tsx src/components/WhySwitch.tsx src/components/WhySwitch.test.tsx src/components/ComparisonTable.tsx src/components/ComparisonTable.test.tsx src/components/ProofStories.tsx src/components/ProofStories.test.tsx src/components/Reviews.tsx src/components/Reviews.test.tsx src/components/ScreenshotGallery.tsx src/components/ProductUpdatesPreview.tsx src/components/Faq.tsx src/components/FeatureVoting.tsx src/components/CTA.tsx src/components/Header.tsx src/components/Features.tsx src/index.css src/i18n/translations.ts
git commit -m "feat: redesign landing page conversion flow"
```
