# Homepage SEO Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Strengthen the homepage SEO so the existing home route becomes a better ranking target for Intake brand searches and German no-subscription calorie-tracker queries.

**Architecture:** Keep the homepage as the only authority target and improve it through aligned runtime metadata, prerendered SEO output, visible homepage copy reinforcement, and stronger structured data. The implementation should stay narrowly scoped to homepage SEO behavior and prove parity through runtime and prerender tests.

**Tech Stack:** React 18, TypeScript, Vite, Vitest, prerender script in `scripts/prerender-seo.js`, runtime SEO in `src/lib/seo.ts`, translation-driven landing page copy in `src/i18n/translations.ts`

---

### Task 1: Add failing SEO regression coverage for homepage intent targeting

**Files:**
- Modify: `src/lib/seo.test.ts`
- Modify: `src/lib/prerenderSeo.test.ts`
- Reference: `src/lib/seo.ts`
- Reference: `scripts/prerender-seo.js`

**Step 1: Write the failing runtime SEO test**

Add assertions that the homepage SEO copy explicitly targets the approved intent cluster.

Example additions in `src/lib/seo.test.ts`:

```ts
it("targets German homepage intent around Intake, Kalorienzähler, and ohne Abo", () => {
  const seo = getSeoContent("/de", "https://intake.tobibechtold.dev");

  expect(seo.title).toContain("Intake");
  expect(seo.title).toContain("Kalorienzähler");
  expect(seo.title).toContain("Ohne Abo");
  expect(seo.description).toContain("Kalorienzähler");
  expect(seo.description).toContain("ohne Abo");
  expect(seo.description).toContain("ohne Konto");
  expect(seo.description).toContain("deinem Gerät");
});

it("adds homepage schema copy for no subscription and private calorie tracking", () => {
  const seo = getSeoContent("/de", "https://intake.tobibechtold.dev");
  const appSchema = seo.homeSchema?.find((item) => item["@type"] === "SoftwareApplication");

  expect(appSchema?.description).toContain("Kalorienzähler");
  expect(appSchema?.featureList).toEqual(
    expect.arrayContaining([
      expect.stringContaining("Kein Abo"),
      expect.stringContaining("Kein Konto"),
    ])
  );
});
```

**Step 2: Write the failing prerender SEO test**

Add assertions in `src/lib/prerenderSeo.test.ts` that prerendered homepage HTML includes the stronger search-intent copy.

Example additions:

```ts
it("uses the stronger German homepage SEO copy in prerendered HTML", () => {
  const html = buildPrerenderedHtml(template, "/de");

  expect(html).toContain("Kalorienzähler");
  expect(html).toContain("Ohne Abo");
  expect(html).toContain("ohne Konto");
});
```

**Step 3: Run the targeted tests to verify they fail**

Run: `npm test -- src/lib/seo.test.ts src/lib/prerenderSeo.test.ts`

Expected: FAIL because the current homepage metadata and schema are still too generic.

**Step 4: Adjust the tests if failure is for the wrong reason**

Keep the assertions focused on intent coverage, not exact punctuation or formatting.

**Step 5: Commit**

Do not commit yet. These tests should land with the SEO implementation in the next tasks.

### Task 2: Strengthen homepage metadata and structured data

**Files:**
- Modify: `src/lib/seo.ts`
- Test: `src/lib/seo.test.ts`

**Step 1: Update homepage title and description copy**

Revise the home-page-only metadata in both locales.

Target direction:

```ts
en.home.title = "Intake App - Calorie Counter for iPhone & Android | No Subscription";
en.home.description =
  "Intake is a private calorie counter app with no subscription and no account required. Track calories and macros with barcode scan, Apple Health (iOS), Health Connect (Android), iCloud (iOS), and Google Drive sync (Android).";

de.home.title = "Intake App - Kalorienzähler ohne Abo für iPhone & Android";
de.home.description =
  "Intake ist ein Kalorienzähler ohne Abo und ohne Konto. Tracke Kalorien und Makros mit Barcode-Scanner, Apple Health, Health Connect und Daten, die auf deinem Gerät bleiben.";
```

Keep the final wording natural and readable. Avoid keyword chains.

**Step 2: Strengthen homepage `SoftwareApplication` schema**

Adjust the homepage schema in `src/lib/seo.ts` so it reflects the approved intent strategy more clearly.

Update:

- `alternateName`
- `description`
- `featureList`

Add locale-aware schema copy where useful. For example, the German homepage schema can use a German description and German feature list entries instead of reusing English-only phrasing.

Possible feature-list additions:

- `No subscription`
- `No account required`
- `Private on-device data`
- `Calorie and macro tracking`

German equivalents should read naturally if emitted for `/de`.

**Step 3: Run the targeted runtime SEO tests**

Run: `npm test -- src/lib/seo.test.ts`

Expected: PASS

**Step 4: Read the changed homepage SEO block once**

Confirm:

- only homepage metadata changed
- privacy, terms, and what's new metadata remain unchanged unless a test required tiny wording cleanup
- the schema still stays valid JSON-LD and remains homepage-only

**Step 5: Commit**

```bash
git add src/lib/seo.ts src/lib/seo.test.ts
git commit -m "feat: strengthen homepage seo metadata"
```

### Task 3: Keep prerendered SEO output in sync with runtime metadata

**Files:**
- Modify: `scripts/prerender-seo.js`
- Test: `src/lib/prerenderSeo.test.ts`

**Step 1: Update homepage prerender SEO copy**

Bring the prerendered homepage metadata in `scripts/prerender-seo.js` in line with the runtime homepage metadata from `src/lib/seo.ts`.

Update:

- `STATIC_PAGE_SEO["/"]`
- `STATIC_PAGE_SEO["/de"]`

Make the title and description intent-aligned and keep them semantically in sync with runtime SEO.

**Step 2: Keep OG alt text and supporting SEO copy coherent**

If the homepage metadata shifts toward stronger brand/app framing, update any homepage-specific OG/twiter copy in prerender output only if necessary for consistency. Do not add extra churn if it is already acceptable.

**Step 3: Run the prerender SEO tests**

Run: `npm test -- src/lib/prerenderSeo.test.ts`

Expected: PASS

**Step 4: Run the combined SEO tests**

Run: `npm test -- src/lib/seo.test.ts src/lib/prerenderSeo.test.ts`

Expected: PASS

**Step 5: Commit**

```bash
git add scripts/prerender-seo.js src/lib/prerenderSeo.test.ts
git commit -m "feat: sync prerendered homepage seo"
```

### Task 4: Add light on-page relevance reinforcement

**Files:**
- Modify: `src/i18n/translations.ts`
- Test: `src/pages/Index.test.tsx`
- Reference: `src/components/Hero.tsx`
- Reference: `src/components/WhySwitch.tsx`
- Reference: `src/components/ComparisonTable.tsx`
- Reference: `src/components/CTA.tsx`

**Step 1: Add a focused homepage copy regression test**

Extend `src/pages/Index.test.tsx` with one or two assertions that confirm the German homepage visibly includes the strongest approved SEO phrasing in natural copy.

Examples:

```tsx
expect(screen.getByText(/kalorienzähler ohne abo/i)).toBeInTheDocument();
expect(screen.getByText(/deine daten bleiben auf deinem gerät/i)).toBeInTheDocument();
```

Use assertions that match real rendered copy without forcing awkward repetition.

**Step 2: Run the page test to verify it fails**

Run: `npm test -- src/pages/Index.test.tsx`

Expected: FAIL because the current visible copy is not yet explicit enough.

**Step 3: Refine only the homepage translation strings needed for visible SEO reinforcement**

Update the relevant homepage copy in `src/i18n/translations.ts`, keeping the tone natural.

Best candidates:

- `heroDescription`
- `comparisonSubtitle`
- `ctaDescription`
- optionally `whySwitchSubtitle`

German direction:

- include `Kalorienzähler` once in visible home copy
- include `ohne Abo`
- include `ohne Konto`
- preserve the approved direct tone

English direction:

- lightly reinforce `Intake app` or `calorie counter app` only where it still reads naturally

Do not touch FAQ or Product Updates.

**Step 4: Run the page and SEO tests**

Run: `npm test -- src/pages/Index.test.tsx src/lib/seo.test.ts src/lib/prerenderSeo.test.ts`

Expected: PASS

**Step 5: Commit**

```bash
git add src/i18n/translations.ts src/pages/Index.test.tsx
git commit -m "feat: reinforce homepage seo copy"
```

### Task 5: Full verification

**Files:**
- Reference: `src/lib/seo.ts`
- Reference: `scripts/prerender-seo.js`
- Reference: `src/i18n/translations.ts`
- Reference: `src/lib/seo.test.ts`
- Reference: `src/lib/prerenderSeo.test.ts`
- Reference: `src/pages/Index.test.tsx`

**Step 1: Run the focused SEO and homepage tests**

Run: `npm test -- src/lib/seo.test.ts src/lib/prerenderSeo.test.ts src/pages/Index.test.tsx`

Expected: PASS

**Step 2: Run the full test suite**

Run: `npm test`

Expected: PASS

**Step 3: Run the production build**

Run: `npm run build`

Expected: PASS, including prerender generation

**Step 4: Inspect git status**

Run: `git status --short`

Expected: only the intended tracked changes plus any pre-existing unrelated local files.

**Step 5: Commit any verification-only adjustments**

If no follow-up edits were needed, no extra commit is required. If a tiny verification fix was necessary, commit it separately with a focused message.
