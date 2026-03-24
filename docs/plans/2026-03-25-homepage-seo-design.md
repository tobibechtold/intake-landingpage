# Homepage SEO Design

## Goal

Strengthen the homepage so it becomes the primary ranking target for brand and product-intent searches around Intake, especially:

- `intake app`
- `intake kalorienzähler`
- `kalorienzähler ohne abo`

The homepage should become more relevant for those queries without degrading product clarity or turning the page into keyword-heavy marketing sludge.

## Fixed Constraints

- keep the homepage as the primary ranking target
- do not create separate SEO landing pages for these keywords
- preserve the current conversion-focused landing page UX
- avoid spammy repetition or keyword stuffing
- keep technical SEO consistent between runtime and prerender output

## Current State

The site already has a solid SEO foundation:

- canonical URLs
- `hreflang` alternates
- prerendered title and meta description output
- structured data on the homepage
- sitemap and robots.txt
- route-level SEO tests

The main gap is relevance rather than infrastructure. Current metadata and schema are still too generic to compete strongly for the approved search intents, especially the German `ohne Abo` and `Kalorienzähler` phrases.

## SEO Strategy

Use the homepage as the single authority target and improve it across four layers:

1. metadata alignment
2. visible on-page relevance signals
3. stronger structured data
4. technical consistency and test coverage

This approach improves ranking signals without fragmenting authority across additional pages.

## Keyword Targeting

### German Homepage Cluster

Primary:

- `Intake App`
- `Intake Kalorienzähler`
- `Kalorienzähler ohne Abo`

Supporting:

- `Kalorienzähler ohne Konto`
- `Kalorien tracken ohne Abo`
- `privater Kalorienzähler`
- `Kalorienzähler Datenschutz`

### English Homepage Cluster

Primary:

- `Intake app`
- `Intake calorie counter`
- `calorie tracker without subscription`

Supporting:

- `private calorie tracker`
- `no account calorie tracker`

## Metadata Direction

### Titles

The homepage title should lead with the brand and include the strongest product-intent phrase for each locale.

German direction:

- include `Intake`
- include `Kalorienzähler`
- include `ohne Abo`

English direction:

- include `Intake`
- include `app` or `calorie counter`
- include `no subscription`

The title should remain readable and not turn into a keyword chain.

### Descriptions

Descriptions should reinforce the same intent cluster and mention the main differentiators in natural language:

- no subscription
- no account
- on-device privacy
- calorie and macro tracking
- barcode scanner

German descriptions should explicitly use `Kalorienzähler` and `ohne Abo`.

## On-Page Relevance Signals

The homepage body should carry a small number of intentional keyword signals in visible copy.

### Allowed On-Page Reinforcement

Add or refine wording so the page naturally includes:

- `Intake ist ein Kalorienzähler ohne Abo`
- `ohne Konto`
- `deine Daten bleiben auf deinem Gerät`
- `Kalorien und Makros tracken`

The best places for these signals are:

- hero supporting copy
- early switch/comparison copy
- final CTA

### What To Avoid

Do not:

- repeat exact-match phrases unnaturally
- rewrite FAQ purely for SEO
- add hidden text
- overload headings with stacked keywords
- harm the direct, human tone approved for the landing page

## Structured Data Direction

The homepage `SoftwareApplication` schema should become more search-aligned and more explicit about the app’s differentiators.

### Improve Entity Clarity

Strengthen:

- app name / alternate name
- description
- feature list

The schema should better reflect:

- calorie and macro tracking
- no subscription
- no account required
- on-device privacy
- barcode scanning
- Apple Health / Health Connect support

### Locale-Aware Schema Copy

German homepage schema should use German-facing description copy that includes the `Kalorienzähler` framing naturally instead of relying on English-only phrasing.

### Optional Additions

Consider adding:

- `offers` if pricing can be represented accurately as a one-time purchase

Avoid adding:

- `aggregateRating` unless the rating value and count are real, current, and intentionally maintained
- speculative or inflated app claims

## Technical Consistency

All homepage SEO changes should remain aligned across:

- `src/lib/seo.ts`
- `src/components/SeoHead.tsx`
- `scripts/prerender-seo.js`
- tests covering runtime and prerender output

Runtime and prerender metadata should not drift. The same homepage intent strategy needs to be visible to both browser-rendered pages and crawlers reading prerendered HTML.

## Testing Direction

Verification should cover:

- updated runtime SEO title and description for `/` and `/de`
- updated homepage schema content
- updated prerendered HTML title, description, canonical, and alternates
- no regressions in sitemap/SEO tests

At least one test should explicitly validate German homepage SEO wording for the target cluster.

## Success Criteria

The work is successful if:

- the homepage remains the main ranking target for Intake brand and German no-subscription calorie-tracker queries
- metadata clearly aligns with `Intake`, `Kalorienzähler`, and `ohne Abo`
- visible homepage copy supports the ranking intent without harming conversion quality
- structured data better describes the product and its differentiators
- runtime and prerender SEO output stay consistent
