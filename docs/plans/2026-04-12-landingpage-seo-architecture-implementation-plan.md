# Landingpage SEO Architecture Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Turn `getintake.de` into a German-first, multi-page product site with stronger crawlability, page-level keyword targeting, and screenshot-backed feature depth for page-one ranking potential.

**Architecture:** Extend the current route model from a homepage-centric site into a compact evergreen page set with canonical German routes and mirrored English routes. Centralize route metadata, page SEO, and reusable page content so runtime head tags, prerendered HTML, sitemap output, navigation, and internal linking all stay aligned.

**Tech Stack:** React 18, TypeScript, React Router, Vite, Vitest, prerender scripts in `scripts/`, route-aware SEO helpers in `src/lib/`, localized copy in `src/i18n/translations.ts`

---

### Task 1: Expand the route model and add failing coverage for the new evergreen pages

**Files:**
- Modify: `src/lib/localeRouting.ts`
- Modify: `src/lib/localeRouting.test.ts`
- Modify: `src/lib/seo.test.ts`
- Modify: `src/lib/prerenderSeo.test.ts`
- Modify: `src/lib/sitemap.test.ts`

**Step 1: Add the new page identifiers to the route model**

Prepare `SitePage` for:

```ts
type SitePage =
  | "home"
  | "features"
  | "noSubscription"
  | "noAccount"
  | "comparisons"
  | "comparisonDetail"
  | "privacy"
  | "terms"
  | "whatsNewIndex"
  | "whatsNewEntry"
  | "notFound";
```

**Step 2: Add failing locale-routing expectations**

Add assertions for:

```ts
expect(getPageFromPathname("/funktionen")).toBe("features");
expect(getPageFromPathname("/kalorienzaehler-ohne-abo")).toBe("noSubscription");
expect(getPageFromPathname("/kalorien-tracker-ohne-konto")).toBe("noAccount");
expect(getPageFromPathname("/vergleiche")).toBe("comparisons");
expect(getPageFromPathname("/vergleiche/yazio-alternative")).toBe("comparisonDetail");
expect(buildLocalizedPath("features", "en")).toBe("/en/features");
```

**Step 3: Add failing SEO and prerender assertions for one new German page and one English page**

Use titles/canonicals like:

```ts
expect(getSeoContent("/funktionen", origin).canonical).toBe(`${origin}/funktionen`);
expect(getSeoContent("/en/features", origin).canonical).toBe(`${origin}/en/features`);
```

**Step 4: Add failing sitemap coverage for the new evergreen pages**

Assert the sitemap contains:

- `/funktionen`
- `/kalorienzaehler-ohne-abo`
- `/kalorien-tracker-ohne-konto`
- `/vergleiche`
- `/vergleiche/yazio-alternative`
- `/vergleiche/fddb-alternative`
- English equivalents under `/en/...`

**Step 5: Run the focused tests to verify they fail**

Run:

```bash
npm test -- src/lib/localeRouting.test.ts src/lib/seo.test.ts src/lib/prerenderSeo.test.ts src/lib/sitemap.test.ts
```

Expected: FAIL because the app does not yet know about the new page set.

**Step 6: Commit**

Do not commit yet. Land the failing coverage with the implementation.

### Task 2: Implement canonical routes and page-specific navigation targets

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/lib/localeRouting.ts`
- Modify: `src/components/Header.tsx`
- Modify: `src/components/Footer.tsx`
- Modify: `src/components/LanguageSwitcher.tsx`
- Modify: `src/components/LanguageSwitcher.test.tsx`
- Modify: `src/components/Footer.test.tsx`
- Create: `src/pages/FeaturesPage.tsx`
- Create: `src/pages/NoSubscriptionPage.tsx`
- Create: `src/pages/NoAccountPage.tsx`
- Create: `src/pages/ComparisonsIndexPage.tsx`
- Create: `src/pages/ComparisonDetailPage.tsx`

**Step 1: Extend path helpers for the new slugs**

Encode canonical slugs directly in `src/lib/localeRouting.ts`:

```ts
const PAGE_SEGMENT_BY_PAGE = {
  features: { de: "funktionen", en: "features" },
  noSubscription: { de: "kalorienzaehler-ohne-abo", en: "calorie-counter-no-subscription" },
  noAccount: { de: "kalorien-tracker-ohne-konto", en: "calorie-tracker-no-account" },
  comparisons: { de: "vergleiche", en: "comparisons" },
};
```

Add a dedicated helper for comparison detail slug resolution instead of hard-coding it inside page components.

**Step 2: Register the new routes in `src/App.tsx`**

Add German and English canonical routes for the new pages while keeping `/de/...` redirect-only compatibility.

**Step 3: Switch header navigation from homepage-only anchors to page links**

Use `Link` targets for:

- home
- features
- comparisons
- whats-new

Keep `Warum Intake` and `FAQ` as homepage anchors if the current homepage sections remain in place.

**Step 4: Expand footer navigation to surface the evergreen pages**

Add internal links for:

- `Funktionen`
- `Kalorienzähler ohne Abo`
- `Kalorien-Tracker ohne Konto`
- `Vergleiche`
- `Yazio Alternative`
- `FDDB Alternative`

Mirror the English labels under `/en/...`.

**Step 5: Update the language switcher tests and footer tests**

Ensure route switching preserves equivalent page destinations:

```ts
expect(toggle("/funktionen")).toNavigateTo("/en/features");
expect(toggle("/vergleiche/yazio-alternative")).toNavigateTo("/en/comparisons/yazio-alternative");
```

**Step 6: Run the focused route/navigation tests**

Run:

```bash
npm test -- src/components/LanguageSwitcher.test.tsx src/components/Footer.test.tsx src/lib/localeRouting.test.ts
```

Expected: PASS

### Task 3: Add reusable marketing-page content models and localized copy

**Files:**
- Modify: `src/i18n/translations.ts`
- Create: `src/lib/marketingPages.ts`
- Create: `src/lib/comparisonPages.ts`
- Create: `src/lib/marketingPages.test.ts`

**Step 1: Add the new navigation and page-section translation keys**

Add localized labels such as:

```ts
featuresNav: "Funktionen"
comparisonsNav: "Vergleiche"
noSubscriptionNav: "Kalorienzähler ohne Abo"
noAccountNav: "Kalorien-Tracker ohne Konto"
```

Also add section copy covering:

- 30+ nutrients
- vitamins and minerals
- caffeine and micronutrients
- intermittent fasting
- iOS Live Activities
- water tracking

**Step 2: Create a typed content model for evergreen pages**

Define a shared shape in `src/lib/marketingPages.ts`:

```ts
export interface MarketingSection {
  id: string;
  title: string;
  body: string;
  bullets?: string[];
  screenshot?: string;
}
```

Store each page's localized H1, intro, sections, FAQ items, CTA copy, and screenshot mapping here instead of scattering strings across page components.

**Step 3: Create typed comparison content**

Define the comparison hub and detail-page content in `src/lib/comparisonPages.ts`, including supported slugs:

```ts
export type ComparisonSlug = "yazio-alternative" | "fddb-alternative";
```

Add factual comparison criteria fields rather than raw JSX so the page component stays presentational.

**Step 4: Add focused content-model tests**

Assert that German feature content includes the deeper product surface:

```ts
expect(featuresDe.sections.join(" ")).toContain("30+");
expect(featuresDe.sections.join(" ")).toMatch(/Vitamine|Mineralstoffe|Koffein/);
```

**Step 5: Run the focused content-model tests**

Run:

```bash
npm test -- src/lib/marketingPages.test.ts
```

Expected: PASS

### Task 4: Ingest the current App Store screenshots and wire them to page-level content

**Files:**
- Create: `public/screenshots/landing/` directory contents
- Modify: `src/components/ScreenshotGallery.tsx`
- Modify: `src/lib/marketingPages.ts`
- Create: `src/lib/screenshotAssets.ts`

**Step 1: Copy the approved screenshots into the repo with stable filenames**

Copy from:

`/Users/xce35g6/Library/CloudStorage/GoogleDrive-tobi.bechtold@gmail.com/Meine Ablage/App Entwicklung/intake screens/ios/2.2.0`

Into a canonical in-repo structure such as:

- `public/screenshots/landing/de-statistics.png`
- `public/screenshots/landing/de-fasting-live-activity.png`
- `public/screenshots/landing/de-water-tracking.png`
- matching English variants where available

Use descriptive names tied to page topics rather than numbered carousel-only names.

**Step 2: Centralize screenshot metadata**

Add a small registry in `src/lib/screenshotAssets.ts`:

```ts
export const SCREENSHOT_ASSETS = {
  deStatistics: {
    src: "/screenshots/landing/de-statistics.png",
    alt: "Nährwerte, Vitamine, Mineralstoffe und Koffein in der Statistikansicht von Intake",
  },
};
```

**Step 3: Replace generic gallery-only labeling with topic-aware usage**

Keep the carousel if it still fits the homepage, but wire page sections to screenshot metadata so screenshots can be reused in the feature and comparison pages with page-specific alt text and captions.

**Step 4: Verify assets resolve in the app**

Run:

```bash
npm test -- src/pages/Index.test.tsx
```

Expected: PASS or update the existing homepage test if it assumes the old screenshot set.

**Step 5: Commit**

Do not commit yet. Land the asset and component changes with the page implementation.

### Task 5: Build the new evergreen pages with reusable sections, breadcrumbs, and internal links

**Files:**
- Create: `src/components/MarketingPageLayout.tsx`
- Create: `src/components/PageHero.tsx`
- Create: `src/components/PageSection.tsx`
- Create: `src/components/PageBreadcrumbs.tsx`
- Create: `src/pages/FeaturesPage.test.tsx`
- Create: `src/pages/IntentPages.test.tsx`
- Create: `src/pages/ComparisonsPage.test.tsx`
- Modify: `src/pages/Index.tsx`
- Create: `src/pages/FeaturesPage.tsx`
- Create: `src/pages/NoSubscriptionPage.tsx`
- Create: `src/pages/NoAccountPage.tsx`
- Create: `src/pages/ComparisonsIndexPage.tsx`
- Create: `src/pages/ComparisonDetailPage.tsx`

**Step 1: Create a reusable page shell**

Build a layout component that consistently renders:

- `SeoHead`
- header and footer
- breadcrumb trail
- hero block
- section stack
- related links
- store CTA

**Step 2: Implement the feature page**

Render sections for:

- food logging and barcode scan
- calories, macros, and 30+ nutrients
- vitamins, minerals, caffeine, and micronutrients
- intermittent fasting with Live Activities
- water tracking
- recipes
- health integrations and sync

**Step 3: Implement the two intent pages**

Keep the body unique to each intent:

- subscription page: pricing model and full-featured value
- no-account page: privacy posture and low-friction onboarding

**Step 4: Implement the comparison hub and detail pages**

Use one generic detail component driven by the comparison content model instead of separate hand-written pages for each competitor.

**Step 5: Add breadcrumbs and related links**

Each subpage should link back into the rest of the evergreen structure.

**Step 6: Add page-render tests**

Examples:

```ts
expect(screen.getByRole("heading", { name: /Kalorienzähler ohne Abo/i })).toBeInTheDocument();
expect(screen.getByText(/30\+ Nährwerte|30\+ nutrients/i)).toBeInTheDocument();
expect(screen.getByRole("link", { name: /Yazio Alternative/i })).toHaveAttribute("href", "/vergleiche/yazio-alternative");
```

**Step 7: Run the page tests**

Run:

```bash
npm test -- src/pages/FeaturesPage.test.tsx src/pages/IntentPages.test.tsx src/pages/ComparisonsPage.test.tsx
```

Expected: PASS

### Task 6: Strengthen the homepage so it stays the main authority page

**Files:**
- Modify: `src/pages/Index.tsx`
- Modify: `src/components/Hero.tsx`
- Modify: `src/components/WhySwitch.tsx`
- Modify: `src/components/Features.tsx`
- Modify: `src/components/ComparisonTable.tsx`
- Modify: `src/components/CTA.tsx`
- Modify: `src/pages/Index.test.tsx`

**Step 1: Pull the deeper product capabilities higher into the homepage**

Update hero/supporting sections to mention:

- calorie and macro tracking
- 30+ nutrients
- vitamins and minerals
- caffeine and micronutrients
- fasting
- water tracking

Do this in natural copy, not as keyword stuffing.

**Step 2: Add stronger internal links from the homepage**

Link to:

- `/funktionen`
- `/kalorienzaehler-ohne-abo`
- `/kalorien-tracker-ohne-konto`
- `/vergleiche`

**Step 3: Make screenshots support specific claims**

Replace any purely decorative screenshot placement with section-aligned proof.

**Step 4: Update homepage assertions**

Add tests checking that the homepage exposes the new internal links and at least one of the deeper feature claims.

**Step 5: Run the homepage tests**

Run:

```bash
npm test -- src/pages/Index.test.tsx src/components/Hero.test.tsx
```

Expected: PASS

### Task 7: Align metadata, structured data, prerender output, and sitemap with the new page set

**Files:**
- Modify: `src/lib/seo.ts`
- Modify: `src/components/SeoHead.tsx`
- Modify: `scripts/prerender-seo.js`
- Modify: `scripts/sitemap.js`
- Modify: `public/robots.txt`
- Modify: `src/lib/seo.test.ts`
- Modify: `src/lib/prerenderSeo.test.ts`
- Modify: `src/lib/sitemap.test.ts`

**Step 1: Add page-specific SEO copy**

Give each page a distinct localized title and description. Example direction:

```ts
de.features.title = "Intake Funktionen - Kalorien, Makros und 30+ Nährwerte tracken";
de.noSubscription.title = "Kalorienzähler ohne Abo - Intake";
de.noAccount.title = "Kalorien-Tracker ohne Konto - Intake";
de.comparisons.title = "Intake Vergleiche und Alternativen";
```

**Step 2: Expand structured data on core product pages**

Update the schema description and feature list to include:

- 30+ nutrients
- vitamins and minerals
- caffeine
- intermittent fasting
- Live Activities
- water tracking

Add breadcrumbs for subpages and keep FAQ schema only where a real FAQ is rendered.

**Step 3: Extend prerender coverage**

Emit prerendered head tags for every canonical evergreen route in both locales.

**Step 4: Extend sitemap generation**

Add all evergreen canonical routes and keep `/de/...` excluded.

**Step 5: Run the SEO-focused tests**

Run:

```bash
npm test -- src/lib/seo.test.ts src/lib/prerenderSeo.test.ts src/lib/sitemap.test.ts
```

Expected: PASS

### Task 8: Full verification and cleanup

**Files:**
- Reference: `src/App.tsx`
- Reference: `src/lib/localeRouting.ts`
- Reference: `src/lib/seo.ts`
- Reference: `scripts/prerender-seo.js`
- Reference: `scripts/sitemap.js`

**Step 1: Run the combined targeted suite**

Run:

```bash
npm test -- \
  src/lib/localeRouting.test.ts \
  src/components/LanguageSwitcher.test.tsx \
  src/components/Footer.test.tsx \
  src/lib/marketingPages.test.ts \
  src/pages/FeaturesPage.test.tsx \
  src/pages/IntentPages.test.tsx \
  src/pages/ComparisonsPage.test.tsx \
  src/pages/Index.test.tsx \
  src/components/Hero.test.tsx \
  src/lib/seo.test.ts \
  src/lib/prerenderSeo.test.ts \
  src/lib/sitemap.test.ts
```

Expected: PASS

**Step 2: Build the production output**

Run:

```bash
npm run build
```

Expected: PASS and emit updated prerendered HTML plus sitemap output.

**Step 3: Search for stale old assumptions**

Run:

```bash
rg -n 'why-switch|/de/|/de"|/de$|single[- ]page|home only' src scripts public
```

Expected: only intentional anchor usage and legacy redirect handling remain.

**Step 4: Review diff scope**

Confirm the changes are limited to:

- routes
- pages
- content models
- screenshots
- SEO/prerender/sitemap
- tests

**Step 5: Commit**

```bash
git add src pages scripts public docs/plans
git commit -m "feat: expand landing page into german-first seo site"
```
