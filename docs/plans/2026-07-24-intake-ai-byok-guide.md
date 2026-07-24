# Intake AI BYOK Guide Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a bilingual, beginner-friendly BYOK setup guide and link it from the Help and Intake AI pages.

**Architecture:** Add one localized React page backed by a single English/German content object and the existing language context. Extend the central locale-routing and SEO systems so the guide behaves like every other evergreen page, then include it in static prerendering and sitemap generation.

**Tech Stack:** React 18, TypeScript, React Router, Tailwind CSS, Lucide icons, Vitest, Testing Library, Vite prerender scripts.

---

### Task 1: Add localized route semantics

**Files:**
- Modify: `src/lib/localeRouting.ts`
- Test: `src/lib/localeRouting.test.ts`

**Step 1: Write failing routing tests**

Add expectations for:

```ts
expect(getPageFromPathname("/hilfe/eigener-api-schluessel")).toBe("byokGuide");
expect(getPageFromPathname("/en/help/own-api-key")).toBe("byokGuide");
expect(buildLocalizedPath("byokGuide", "de")).toBe("/hilfe/eigener-api-schluessel");
expect(buildLocalizedPath("byokGuide", "en")).toBe("/en/help/own-api-key");
```

Also assert canonical and alternate URLs for the English and German variants.

**Step 2: Run the routing test and verify it fails**

Run: `npm test -- src/lib/localeRouting.test.ts`

Expected: FAIL because `byokGuide` is not part of `SitePage`.

**Step 3: Implement localized BYOK routing**

Add `byokGuide` to `SitePage`, define its localized multi-segment paths, detect it before the Help overview route, and build the correct localized URL.

**Step 4: Run the routing test**

Run: `npm test -- src/lib/localeRouting.test.ts`

Expected: PASS.

### Task 2: Build the guide page test-first

**Files:**
- Create: `src/pages/ByokGuidePage.tsx`
- Create: `src/pages/ByokGuidePage.test.tsx`
- Modify: `src/App.tsx`

**Step 1: Write failing page tests**

Render the German and English routes through `LanguageProvider` and assert:

- localized page title and beginner explanation;
- three official provider links;
- optional model-name guidance;
- on-device-only security wording;
- current, qualified Gemini free-tier wording;
- three screenshot placeholders;
- links back to Help and Intake AI.

**Step 2: Run the page test and verify it fails**

Run: `npm test -- src/pages/ByokGuidePage.test.tsx`

Expected: FAIL because the page and routes do not exist.

**Step 3: Implement the page**

Create a localized `CONTENT` object and render:

- breadcrumbs and hero;
- API key and token primer;
- provider cards;
- numbered setup steps;
- accessible screenshot placeholders using `<figure>` and descriptive text;
- security and cost cards;
- troubleshooting;
- Help and Intake AI navigation.

Use semantic headings, visible keyboard focus, external-link labels, and the site’s existing card and spacing classes.

**Step 4: Register both routes**

Add:

```tsx
<Route path="/hilfe/eigener-api-schluessel" element={<ByokGuidePage />} />
<Route path="/en/help/own-api-key" element={<ByokGuidePage />} />
```

Place the specific guide routes before the Help overview routes.

**Step 5: Run the page and routing tests**

Run: `npm test -- src/pages/ByokGuidePage.test.tsx src/lib/localeRouting.test.ts`

Expected: PASS.

### Task 3: Add both discovery links test-first

**Files:**
- Modify: `src/pages/HelpPage.test.tsx`
- Modify: `src/pages/HelpPage.tsx`
- Modify: `src/pages/IntakeAIPage.test.tsx`
- Modify: `src/pages/IntakeAIPage.tsx`

**Step 1: Write failing link tests**

Assert the localized Help guide card and the localized Intake AI BYOK setup link both target the correct guide route.

**Step 2: Run the focused tests and verify they fail**

Run: `npm test -- src/pages/HelpPage.test.tsx src/pages/IntakeAIPage.test.tsx`

Expected: FAIL because the guide links are absent.

**Step 3: Add the Help guide card**

Add localized card copy above the FAQ search, with a `KeyRound` icon and a clear article CTA.

**Step 4: Add the Intake AI BYOK link**

Add localized CTA copy inside the existing BYOK pricing card.

**Step 5: Run the focused tests**

Run: `npm test -- src/pages/HelpPage.test.tsx src/pages/IntakeAIPage.test.tsx`

Expected: PASS.

### Task 4: Add SEO, prerendering, and sitemap coverage test-first

**Files:**
- Modify: `src/lib/seo.ts`
- Modify: `src/lib/seo.test.ts`
- Modify: `scripts/prerender-seo.js`
- Modify: `src/lib/prerenderSeo.test.ts`
- Modify: `scripts/sitemap.js`
- Modify: `src/lib/sitemap.test.ts`

**Step 1: Write failing metadata tests**

Assert:

- localized BYOK SEO title, description, canonical, and alternates;
- prerender route inclusion and localized static metadata;
- both sitemap URLs.

**Step 2: Run the metadata tests and verify they fail**

Run: `npm test -- src/lib/seo.test.ts src/lib/prerenderSeo.test.ts src/lib/sitemap.test.ts`

Expected: FAIL because the guide is not registered.

**Step 3: Add runtime SEO copy**

Add `byokGuide` to the localized SEO interface and copy maps.

**Step 4: Add static prerender content**

Register both routes in `STATIC_PAGE_SEO` and `STATIC_BODY_CONTENT`, including concise beginner-focused text and links to Help and Intake AI.

**Step 5: Add sitemap entries**

Add German and English guide paths with the current date and Help-level priority.

**Step 6: Run the metadata tests**

Run: `npm test -- src/lib/seo.test.ts src/lib/prerenderSeo.test.ts src/lib/sitemap.test.ts`

Expected: PASS.

### Task 5: Visual and functional verification

**Files:**
- Modify only if verification reveals an issue.

**Step 1: Run all tests**

Run: `npm test`

Expected: all tests pass.

**Step 2: Run lint**

Run: `npm run lint`

Expected: no new lint errors.

**Step 3: Run the production build**

Run: `npm run build`

Expected: Vite build and prerender complete successfully, including both new article paths.

**Step 4: Inspect responsive output**

Run the local site and inspect the guide at narrow and desktop widths. Verify heading hierarchy, placeholder proportions, external links, focus states, and no horizontal scrolling.

**Step 5: Review the diff**

Run: `git diff --check` and `git status --short`

Expected: no whitespace errors and only intentional files changed.

