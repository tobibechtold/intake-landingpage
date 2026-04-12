# Landingpage SEO Architecture Design

## Goal

Restructure `www.getintake.de` into a German-first, crawl-friendly product site that can compete for page-one visibility on brand, product-intent, privacy-intent, and comparison-intent searches such as:

- `intake app`
- `intake kalorienzähler`
- `kalorienzähler ohne abo`
- `kalorien tracker ohne konto`
- `yazio alternative`
- `fddb alternative`

The site should stop presenting itself as a mostly single-page landing page and instead become a compact, high-quality information architecture with stronger crawl signals, richer feature depth, and better internal linking.

## Approved Constraints

- German is the default canonical language on `/`
- English lives only under `/en/...`
- no automatic redirect from `/` to `/en` for first-time visitors
- legacy `/de/...` links should keep working via redirects to German canonical routes
- avoid thin or doorway-style SEO pages
- comparison pages should stay factual and useful
- screenshots should use the current store assets from:
  `/Users/xce35g6/Library/CloudStorage/GoogleDrive-tobi.bechtold@gmail.com/Meine Ablage/App Entwicklung/intake screens/ios/2.2.0`

## Current Problems

### Crawl And Locale Issues

- the current site uses client-side language redirection logic that can send non-German visitors from `/` to `/en`
- Googlebot often crawls from a US context without reliable locale signals, so the `.de` root can be associated with English content
- this weakens German relevance for `getintake.de`

### Information Architecture Weakness

- the site behaves mainly like a long homepage plus legal and release-note pages
- navigation does not expose enough distinct, indexable product topics
- internal links do not give Google strong signals about topic clusters

### Content Relevance Gaps

- the current copy emphasizes privacy and pricing more than product depth
- important differentiators are underrepresented in indexable copy:
  - 30+ tracked nutrients
  - vitamins and minerals
  - caffeine and micronutrients
  - intermittent fasting
  - iOS Live Activities
  - water tracking
  - broader app depth already visible in screenshots

## Recommended Site Strategy

Use a compact multi-page product-site architecture:

1. keep the homepage as the main brand and broad-intent authority page
2. add a small number of evergreen supporting pages for distinct search intent
3. add a visible navigation and stronger internal-link structure
4. support pages with unique copy and screenshot-backed proof instead of duplicating the homepage

This keeps authority concentrated while still giving Google more topic-specific entry points.

## Canonical Route Structure

### German Canonical Routes

- `/`
- `/funktionen`
- `/kalorienzaehler-ohne-abo`
- `/kalorien-tracker-ohne-konto`
- `/vergleiche`
- `/vergleiche/yazio-alternative`
- `/vergleiche/fddb-alternative`
- `/whats-new`
- `/privacy`
- `/terms`

### English Canonical Routes

- `/en`
- `/en/features`
- `/en/calorie-counter-no-subscription`
- `/en/calorie-tracker-no-account`
- `/en/comparisons`
- `/en/comparisons/yazio-alternative`
- `/en/comparisons/fddb-alternative`
- `/en/whats-new`
- `/en/privacy`
- `/en/terms`

### Legacy Compatibility Routes

- `/de/...` routes redirect to the equivalent German canonical route
- these routes remain non-canonical and must not appear in sitemap output or alternate-tag output

## Navigation Design

### Header Navigation

The primary navigation should become:

- `Start`
- `Funktionen`
- `Warum Intake`
- `Vergleiche`
- `Updates`
- `FAQ`
- `Download`

Behavior:

- `Start`, `Funktionen`, `Vergleiche`, and `Updates` should link to actual pages
- `Warum Intake` and `FAQ` can remain homepage anchors if they are still present on `/`
- `Download` remains the main store CTA
- the language switcher should move between equivalent German and English canonical routes

### Footer Navigation

The footer should expand from a mostly legal/app block into a stronger internal-link hub:

- core pages
- comparison pages
- release updates
- legal pages
- store destinations

This gives crawlers and users persistent access to every evergreen page.

## Page Design

### Homepage: `/`

Purpose:

- main German ranking target for brand and broad product intent
- strongest page for `Intake`, `Intake App`, and `Intake Kalorienzähler`

Content direction:

- clearly frame Intake as a `Kalorienzähler ohne Abo`
- mention `ohne Konto`
- explain privacy and on-device data handling
- include stronger feature-depth signals early:
  - Kalorien und Makros tracken
  - 30+ Nährwerte
  - Vitamine und Mineralstoffe
  - Koffein und Mikronährstoffe
  - Wasser tracken
  - Intervallfasten
  - iOS Live Activities
  - Barcode-Scanner
  - Apple Health / Health Connect

Homepage role:

- stay conversion-oriented
- link prominently to `Funktionen`, the two intent pages, and the comparison hub

### Feature Page: `/funktionen`

Purpose:

- capture broader feature-intent searches
- act as the main deep product overview page

Content clusters:

- Essen erfassen und Barcode scannen
- Kalorien, Makros und 30+ Nährstoffe verfolgen
- Vitamine, Mineralstoffe, Koffein und Mikronährstoffe auswerten
- Intervallfasten mit iOS Live Activities
- Wasser-Tracking
- Rezepte
- Apple Health / Health Connect
- iCloud / Google Drive Sync
- Datenschutz und Kontrolle

Design direction:

- use the current store screenshots as the canonical visual proof set
- pair screenshots with descriptive headings, short explanations, and captions
- avoid turning the page into a generic screenshot gallery

### Intent Page: `/kalorienzaehler-ohne-abo`

Purpose:

- target high-intent German subscription-avoidance queries

Content direction:

- explain what users are trying to avoid with subscription trackers
- explain what Intake includes despite being a one-time purchase
- reinforce that the product is full-featured, not stripped down
- feature section should mention stats, nutrients, fasting, water, and health integrations

### Intent Page: `/kalorien-tracker-ohne-konto`

Purpose:

- target privacy and low-friction intent around tracking without mandatory signup

Content direction:

- emphasize no forced account
- explain on-device privacy posture clearly
- connect privacy to real workflows rather than abstract claims
- support the page with related features like stats, water, and fasting so it still feels product-complete

### Comparison Hub: `/vergleiche`

Purpose:

- central index for competitor and category comparison intent

Content direction:

- explain how Intake differs from typical subscription trackers
- link to specific comparison pages
- keep the copy helpful and restrained rather than adversarial

### Comparison Pages

#### `/vergleiche/yazio-alternative`

- compare pricing model
- compare account requirements
- compare privacy framing
- compare feature depth
- mention relevant Intake strengths such as nutrient statistics, fasting, water tracking, and health integrations

#### `/vergleiche/fddb-alternative`

- same structure as above, tailored to the user decision criteria for FDDB searches

Comparison page rules:

- stay factual
- acknowledge trade-offs
- avoid unverified claims
- remain useful even if the reader does not choose Intake

## Screenshot Strategy

The App Store screenshots from the provided Google Drive folder should be treated as the source of truth for the new site visuals.

Usage model:

- homepage: small curated subset for proof and feature depth
- feature page: broader, section-aligned use of screenshots
- comparison pages: selective screenshots that support specific claims

Requirements:

- descriptive file naming in the web app
- topic-specific alt text
- captions tied to page intent instead of generic gallery labels

## On-Page SEO Direction

Each evergreen page should have:

- one clear H1
- a short intro that establishes the target intent naturally
- 2-4 meaningful sections with unique copy
- contextual internal links to related pages
- a clear CTA to App Store and Google Play

Keyword strategy:

- use exact terms where natural
- avoid repetitive keyword stacking
- use German phrasing that sounds native, not translated SEO copy

## Technical SEO Direction

### Crawl And Locale Handling

- remove non-German auto-redirect behavior from `/`
- keep `/` always German
- keep `/en` as the explicit English route family
- preserve `/de` redirects for compatibility only

### Metadata

- write page-specific titles and descriptions instead of homepage-adjacent reuse
- ensure German metadata leads with the strongest German phrase for each page
- keep English metadata aligned but secondary in priority

### Structured Data

- keep `SoftwareApplication` schema on core product pages
- expand schema descriptions and feature lists to include the deeper product surface
- add `FAQPage` only where a meaningful FAQ exists
- add `BreadcrumbList` on subpages
- consider `CollectionPage` or `ItemList` semantics for the comparison hub if it improves clarity
- avoid unsupported ratings or speculative pricing claims

### Prerender And Sitemap

- prerender every canonical evergreen route
- include only canonical routes in sitemap output
- keep runtime head tags and prerender output aligned

## Internal Linking Rules

- homepage links to all primary evergreen pages
- feature page links to the two intent pages and the comparison hub
- each intent page links back to homepage and at least one related sibling page
- comparison hub links to each comparison page
- comparison pages link back to the hub and relevant product pages
- footer links cover the full evergreen route set

## Success Criteria

The redesign is successful if:

- `getintake.de/` is crawled and indexed as the German canonical homepage
- the site exposes a small but meaningful set of German-first evergreen pages
- core differentiators are visible in crawlable copy, not only screenshots
- navigation and footer improve discovery of important pages
- comparison content is useful and non-spammy
- runtime SEO, prerender output, sitemap, and locale routing all stay consistent
- the site has better ranking potential for brand, no-subscription, no-account, and comparison-intent searches
