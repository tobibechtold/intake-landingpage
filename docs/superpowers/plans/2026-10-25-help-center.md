# Help Center Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A help center on getintake.de that explains every non-trivial Intake feature and setting for iOS and Android in German and English, opened from both apps.

**Architecture:**
- **Topics:** a frozen topic manifest (`content/help/topics.json`) is the contract between the site and the apps. Each topic is an Astro content entry (`content/help/<id>/{de,en}.md`) with its steps in frontmatter, per platform, and cropped screenshots beside it.
- **Pages:** the site renders one static page per topic and language with both platforms in the HTML; an inline head script shows one.
- **iOS:** a Settings help button and "Mehr erfahren" footer links open those pages in SFSafariViewController.
- **Android:** equivalent work, planned and built by the `intake-android-82` session against the same manifest.

**Tech Stack:** Astro 7 content collections + zod, Vitest, Vercel (landing page); SwiftUI, Swift Testing/XCTest via the Xcode MCP (intake2, branch `2.8.0`).

**Spec:** `docs/superpowers/specs/2026-10-25-help-center-design.md` (with `2026-10-25-help-center/{feature-voting-recon,ios-inventory,android-inventory}.md`)

## Global Constraints

- **Languages:** DE at the root (`/hilfe/<de-slug>`), EN under `/en/help/<en-slug>`. Slugs are translated per language and paired for hreflang, and a published slug never changes.
- **Short and clear:** a short answer first, one sentence per step, the screenshot carries the rest. Topics that need more are split.
- **Platform-only notes:** "Nur auf dem iPhone" / "Nur auf Android" (DE), "Only on iPhone" / "Only on Android" (EN).
- **Settings links:** the link text is "Mehr erfahren" (DE) / "Learn more" (EN), placed in the section footer.
- **Platform parameter:** `?platform=ios|android`. Apps add `&source=app`, which hides the switch.
- **Language from the app:** German app language → DE pages, every other app language → EN pages.
- **Screenshots:**
  - demo data only, light mode, language matching the page;
  - cropped, with the highlight drawn into the image;
  - WebP through the What's New asset path.
- **Existing URLs keep working:** `/hilfe/eigener-api-schluessel`, `/en/help/own-api-key`, `/hilfe`, `/en/help`.
- **Content state:** pages describe the 2.8.0 apps on both platforms.
- **iOS rules:**
  - builds and tests only through the Xcode MCP on "iPhone 17 Pro Max (27.0)";
  - new Swift files are registered in project.pbxproj;
  - strings go in all 8 languages of `Localizable.xcstrings`.
- **Copy:** no em dashes in user-facing copy (DE or EN).
- **Commits:** Conventional Commits ending with `Claude-Session: https://claude.ai/code/session_01Fe4ew1DFH13knXifvryP9N`.

## Review Focus

1. **A mailed link with `?platform=ios` opened on Android:** the switch must stay visible, preset to iPhone, because only `source=app` hides it. Test in Task 3.
2. **An old FAQ link `/hilfe#<faq-anchor>` from a mail or feature-voting comment:** it lands on the topic that replaced the answer. Test in Task 5.
3. **No JavaScript (crawler, reader mode):** both platforms show, each under a heading, and nothing is blank. Test in Task 3.
4. **Search with umlauts and missing ones:** "Gewicht", "gewicht" and "Mahlzeit kopieren" match regardless of case, and "Ubersicht" matches "Übersicht". Test in Task 5.
5. **A topic whose steps differ on one platform but have no screenshot there:** the build fails instead of rendering an empty frame. Test in Task 1.

---

### Task 1: Topic manifest, content schema, coverage checks

**Files:**
- Create: `content/help/topics.json`
- Create: `content/help/<id>/de.md`, `content/help/<id>/en.md` (one placeholder topic, `copy-meal`, to prove the schema)
- Modify: `src/content.config.ts` (add `helpTopics`)
- Create: `src/lib/helpTopics.ts`
- Test: `src/lib/helpTopics.test.ts`

**Interfaces:**
- Produces:
  - `topics.json`: `{ "version": 1, "topics": [{ "id": string, "area": HelpArea, "slugs": { "de": string, "en": string }, "platforms": ("ios"|"android")[], "legacyAnchors"?: string[] }] }`.
  - `HelpArea` values, in display order: `heute`, `logging`, `recipes-library`, `goals-budget`, `fasting`, `water`, `weight-body`, `stats`, `health`, `sync`, `widgets-watch-shortcuts`, `intake-ai`, `settings`.
  - Topic frontmatter:
    - `{ id, title, short, related?: string[], steps?: Step[], customPage?: "byokGuide" }`;
    - `Step = { text: string, ios?: { text?: string, image?: image() }, android?: { text?: string, image?: image() } }`;
    - an optional markdown body for "Warum…" topics.
  - `src/lib/helpTopics.ts`:
    - `loadHelpManifest(): HelpManifest`;
    - `topicPath(id: string, lang: Language): string`;
    - `validateTopicEntry(entry, manifest): string[]` (error messages, empty when valid).

- [ ] **Step 1: Write the topic list into `topics.json`.**
  - Group every row of the iOS and Android inventories into topics. Every top-15 recon topic gets its own topic.
  - Settings rows get a topic per settings screen unless a row needs its own explanation.
  - DE slugs are lowercase ASCII with `ae`/`oe`/`ue`/`ss`; EN slugs are English.
  - `byok-guide` is the existing guide (`customPage: "byokGuide"`, slugs `eigener-api-schluessel` / `own-api-key`).
  - Platform-only topics list one platform.
  - Every `/hilfe` FAQ anchor whose answer moves into a topic is listed in that topic's `legacyAnchors`.
- [ ] **Step 2: Write the failing tests** in `helpTopics.test.ts`. Each test checks one rule:
  - `every manifest id is unique and every slug is unique per language`;
  - `slugs match ^[a-z0-9]+(-[a-z0-9]+)*$`;
  - `the byok guide keeps eigener-api-schluessel and own-api-key`;
  - `topicPath('copy-meal','de') === '/hilfe/' + deSlug` and `topicPath('copy-meal','en') === '/en/help/' + enSlug`;
  - `validateTopicEntry flags a step that has ios.text but no ios.image` (Review Focus 5);
  - `validateTopicEntry flags short longer than 220 characters and a step text longer than 160`;
  - `validateTopicEntry flags an em dash in title, short or any step`;
  - `every manifest topic has a de and an en entry, every entry is in the manifest`. This runs against the real `content/help`; it fails until the content tasks are done. Mark it `it.skip` until Task 8 removes the skip.
- [ ] **Step 3:** Run `npx vitest run src/lib/helpTopics.test.ts`. Expect FAIL (module not found).
- [ ] **Step 4:** Implement `helpTopics.ts` and the `helpTopics` collection.
  - The collection uses the same glob loader as `whatsNew`, with id `<topic>/<lang>`.
  - A zod `superRefine` calls `validateTopicEntry`, so a bad topic fails `astro build`.
  - Add the `copy-meal` placeholder in both languages with one real step.
- [ ] **Step 5:** Run `npx vitest run src/lib/helpTopics.test.ts` and `npm run build`. Expect PASS and a successful build.
- [ ] **Step 6:** Commit `feat(help): frozen topic manifest and help topic content schema`. Send the `topics.json` path to the `intake-android-82` session. From this commit on the slugs are frozen.

### Task 2: Topic page route, hreflang, sitemap

**Files:**
- Create: `src/pages/hilfe/[slug].astro`, `src/pages/en/help/[slug].astro`
- Create: `src/components/astro/HelpTopicPage.astro`
- Modify: `src/lib/localeRouting.ts` (add `helpTopic` with a slug-pair lookup), `src/lib/pageSeo.ts`
- Test: `src/lib/localeRouting.test.ts`, `test/build-output.test.ts`

**Interfaces:**
- Consumes: `loadHelpManifest`, `topicPath` (Task 1).
- Produces: `HelpTopicPage` props `{ lang: Language, topic: CollectionEntry<'helpTopics'> }`; a rendered page with `data-platform-block="ios|android"` wrappers (Task 3 relies on these attributes).

- [ ] **Step 1: Failing tests.**
  - `localeRouting`: the alternate path of `/hilfe/<copy-meal de slug>` is `/en/help/<copy-meal en slug>`, and back.
  - `build-output`: `dist/hilfe/<de slug>.html` contains the title, the short answer, one `data-platform-block="ios"` and one `="android"`, and `<link rel="alternate" hreflang="en" href=".../en/help/<en slug>">`.
  - The sitemap lists both URLs.
- [ ] **Step 2:** Run `npx vitest run src/lib/localeRouting.test.ts test/build-output.test.ts`. Expect FAIL.
- [ ] **Step 3: Implement.** `getStaticPaths` comes from the manifest; `byok-guide` is skipped because its static pages stay.
  - Page order: title, the platform-only note (exact copy from Global Constraints) when the topic has one platform, "Kurz:"/"In short:" with the short answer, numbered steps, the markdown body, then related topics (at most 3).
  - Each step renders the shared text, then an iOS block and an Android block with their text (falling back to the shared text) and image.
  - Use `SiteShell`, `BaseLayout` and `PageBreadcrumbs` like the other pages.
- [ ] **Step 4:** Run the tests and `npm run build`. Expect PASS.
- [ ] **Step 5:** Commit `feat(help): one page per help topic with hreflang pairs`.

### Task 3: Platform switch

**Files:**
- Create: `src/lib/helpPlatform.ts`, `src/components/astro/HelpPlatformSwitch.astro`
- Modify: `HelpTopicPage.astro` (the switch above the title; an inline head script)
- Test: `src/lib/helpPlatform.test.ts`, `test/build-output.test.ts`

**Interfaces:**
- Produces:
  - `resolveHelpPlatform(input: { query: URLSearchParams, stored: string | null, userAgent: string }): { platform: 'ios'|'android', hideSwitch: boolean }`;
  - storage key `intake.help.platform`.

- [ ] **Step 1: Failing tests.**
  - `?platform=android&source=app` gives `{ platform: 'android', hideSwitch: true }`.
  - `?platform=ios` with an Android user agent gives `{ platform: 'ios', hideSwitch: false }` (Review Focus 1).
  - No query, stored `'android'` gives `'android'`.
  - No query and nothing stored: an iPhone user agent gives `'ios'`, an Android user agent gives `'android'`, a desktop user agent gives `'ios'`.
  - An invalid query value falls through to stored, then to the user agent.
  - `build-output`: the topic HTML has both blocks visible without script, with `<h3>` headings "iPhone" and "Android" inside the blocks (Review Focus 3). The inline script sets `document.documentElement.dataset.helpPlatform` before first paint.
- [ ] **Step 2:** Run `npx vitest run src/lib/helpPlatform.test.ts test/build-output.test.ts`. Expect FAIL.
- [ ] **Step 3: Implement.**
  - The CSS hides `[data-platform-block]` not matching `html[data-help-platform]`, and hides the per-block headings once a platform is set.
  - The switch is a sticky two-button segmented control "iPhone" / "Android". It writes the storage key and the attribute and doesn't reload.
  - Wrap storage access in try/catch.
  - The inline script stays under 1 KB and is inlined, not bundled.
- [ ] **Step 4:** Run the tests and `npm run build`. Expect PASS.
- [ ] **Step 5:** Commit `feat(help): iPhone/Android switch, preset from the app`.

### Task 4: iOS help button and "Mehr erfahren" links (intake2, branch 2.8.0)

**Files (repo `/Users/xce35g6/dev/private/intake2`):**
- Modify: `Core/Models/AppLocalization.swift` (`AppPreferences`, next to `intakeAIAPIKeyGuideURL`)
- Create: `Features/Settings/HelpLink.swift`. Register it in project.pbxproj (app target membership list).
- Modify: `Features/Settings/SettingsRootView.swift` (toolbar), `Features/App/AppShellView.swift` (`AppSymbol.help = "questionmark.circle"`), and the settings screens listed in Step 3
- Modify: `Resources/Localization/Localizable.xcstrings` (keys `settings.help`, `help.learnMore`; 8 languages, DE "Hilfe" / "Mehr erfahren", EN "Help" / "Learn more")
- Create: `intake2Tests/Fixtures/help-topics.json` (a copy of the landing page `content/help/topics.json`)
- Test: `intake2Tests/HelpLinkTests.swift` (Swift Testing, registered for intake2Tests)

**Interfaces:**
- Consumes: `topics.json` ids and slugs (Task 1).
- Produces:
  - `enum HelpTopic: String, CaseIterable` with the raw value = the manifest id, covering only the topics the app links to;
  - `AppPreferences.helpURL(topic: HelpTopic?, languageCode: String = currentLanguageCode()) -> URL` (nil topic = help home);
  - `HelpLearnMoreLink(topic: HelpTopic)`, a footer view.

- [ ] **Step 1: Failing tests** in `HelpLinkTests`:
  - `helpURL(topic: nil, languageCode: "de")` is `https://www.getintake.de/hilfe?platform=ios&source=app`;
  - `helpURL(topic: nil, languageCode: "fr")` is `https://www.getintake.de/en/help?platform=ios&source=app`;
  - for every `HelpTopic` case, the fixture manifest has that id with `ios` in `platforms`, and `helpURL(topic:languageCode: "de")` / `"en"` use its DE / EN slug;
  - a source test: `SettingsRootView`'s toolbar contains `AppSymbol.help` and `L.t("settings.help")`;
  - a source test: each screen in Step 3 contains `HelpLearnMoreLink(topic:`.

  Read source files through the fixture helpers, never `#filePath`.
- [ ] **Step 2:** Run `RunSomeTests` for `HelpLinkTests`. Expect a compile failure.
- [ ] **Step 3: Implement.**
  - **Help button:** a `ToolbarItem(placement: .primaryAction)` with `Image(systemName: AppSymbol.help)`, accessibility label `L.t("settings.help")`. It opens `SettingsSafariSheet(url: AppPreferences.helpURL(topic: nil))` through the existing `whatsNewBrowserDestination` sheet.
  - **`HelpLearnMoreLink`:** a plain `Button` in the accent tint, text `L.t("help.learnMore")`, presenting `SettingsSafariSheet` for its topic.
  - **Where the links go:** in the `footer:` of the Apple Health section, Aktivität & Workouts, the Kalorien sheet, the Wochenbudget section, the iCloud sync section and the Intake AI provider section. Use the matching manifest ids.
- [ ] **Step 4:** Run `RunSomeTests` for `HelpLinkTests` and `AppPreferencesAndUnitConverterTests`. Expect PASS. Re-check `git status` for xcstrings churn.
- [ ] **Step 5:** Commit `feat(settings): help button and Mehr erfahren links to the help center`.

### Task 5: Help home, search, migrated FAQ, legacy anchors

**Files:**
- Modify: `src/components/astro/HelpPage.astro`, `src/lib/faqData.ts`, `src/lib/helpCopy.ts`, `src/lib/structuredData.ts`
- Create: `src/lib/helpSearch.ts`, `src/lib/helpLegacyAnchors.ts`
- Test: `src/lib/helpSearch.test.ts`, `src/lib/helpLegacyAnchors.test.ts`, `test/structured-data-matches-page.test.ts`

**Interfaces:**
- Consumes: the manifest and entries (Task 1), `topicPath` (Task 1).
- Produces:
  - `normalizeForSearch(text: string): string`;
  - `searchTopics(index: {id,title,short}[], query: string): string[]` (ids ranked: title hits first);
  - `legacyAnchorTarget(hash: string, lang: Language): string | null`.

- [ ] **Step 1: Review the existing FAQ and BYOK guide.** Check every answer against the iOS and Android inventories and the 2.8.0 apps.
  - Write `docs/superpowers/specs/2026-10-25-help-center/faq-review.md` with one row per question: keep (pre-purchase), move to topic `<id>`, or fix, plus the correction.
  - Copy that page's "move" decisions into `legacyAnchors` in `topics.json`. The slugs don't change.
- [ ] **Step 2: Failing tests.**
  - `normalizeForSearch('Übersicht') === normalizeForSearch('Ubersicht')`.
  - `searchTopics` finds `copy-meal` for "mahlzeit kopieren" and for "Mahlzeit" (Review Focus 4).
  - `legacyAnchorTarget('#<a moved anchor>', 'de')` is that topic's DE path; an unknown anchor gives null (Review Focus 2).
  - The structured-data test still matches the pre-purchase FAQ block.
- [ ] **Step 3:** Run `npx vitest run src/lib/helpSearch.test.ts src/lib/helpLegacyAnchors.test.ts test/structured-data-matches-page.test.ts`. Expect FAIL.
- [ ] **Step 4: Implement.**
  - The help home shows a search field, then the areas in `HelpArea` order with topic titles linking to `topicPath`, then the pre-purchase FAQ block (only "keep" rows, corrected).
  - Search runs client-side over an inline JSON index.
  - A tiny inline script on `/hilfe` and `/en/help` maps a legacy hash with `location.replace`.
  - Remove moved questions from `faqData.ts`.
- [ ] **Step 5:** Run the tests and `npm run build`. Expect PASS.
- [ ] **Step 6:** Commit `feat(help): help home with search, reviewed FAQ, old anchors redirect`.

### Task 6: iOS screenshot capture

**Files (intake2):**
- Create: `scripts/help-screenshots/` (README and capture script)
- Create: a temporary test host or demo-seeder capture, following memory `release-hero-screenshot-pipeline`

**Output:** WebP files written into the landing page as `content/help/<id>/assets/<lang>/ios/<n>.webp`.

**Interfaces:**
- Consumes: the topic steps (Tasks 7-8 write the step lists first per area; this task runs per area after them).
- Produces: a crop + highlight convention.
  - The crop rect and highlight rect come in screen points per shot, listed in `scripts/help-screenshots/shots.json` (`{ topic, lang, step, screen, crop, highlight }`).
  - The highlight is a 3 pt rounded rectangle in the app's coral at 85% opacity.

- [ ] **Step 1:** The capture script reads `shots.json`, launches the 2.8.0 build on the iPhone 18 Pro simulator (402 pt, iOS 27). This is the only simulator the script may use; never the test simulator, never Tobias's iPhone.
  - Launch arguments: `-IntakeScreenshotMode YES`, the screen, and `-intake.language de|en`.
  - It takes a `simctl io screenshot`, crops and draws the highlight (Python + Pillow, run with `python3 -I` from the scripts folder), and writes WebP at quality 82.
- [ ] **Step 2:** Verify by running it for `copy-meal` in DE and EN. Two WebPs exist, open in Preview, show the right crop and highlight, and contain no real user data.
- [ ] **Step 3:** Commit the script in intake2 (`chore(help): iOS help screenshot capture`) and the images in the landing page with their topic.

### Task 7: Content, the top topics (DE + EN, iOS part)

**Files:** `content/help/<id>/{de,en}.md` and their iOS assets, for the 13 launch-critical topics in the spec's "Content scope".

- [ ] **Step 1:** Write DE then EN for each topic.
  - Steps come from the iOS inventory and the 2.8.0 code, and are checked in the simulator.
  - The weekly budget topic is written from the 2.8.0 weekly-budget code.
  - The Health Connect estimate topic and the Android steps come from the Android session.
- [ ] **Step 2:** Run the capture (Task 6) for these topics.
- [ ] **Step 3:** Run `npm run build`. Expect PASS: the schema rejects missing images, overlong text and em dashes.
- [ ] **Step 4:** Commit `docs(help): top topics`.

### Task 8: Content, every remaining topic

Same steps as Task 7, area by area in `HelpArea` order, one commit per area: `docs(help): <area> topics`. Along the way, keep `content/help/coverage.json` as `{ "<inventory row id>": "<topic id>" }`. Use the iOS row ids (A1…N74) from `ios-inventory.md`. The Android session adds its row ids from `android-inventory.md` the same way.

After the last area, remove the `it.skip` from the coverage test (Task 1) and extend it:
- every row id in both inventories is a key in `coverage.json`;
- every value is a manifest id.

Run `npx vitest run src/lib/helpTopics.test.ts`. Expect PASS: every manifest topic exists in both languages and every inventory row maps to a topic.

### Task 9: Upkeep rule, samples, launch

**Files:**
- Modify: `/Users/xce35g6/dev/private/intake2/AGENTS.md` §13 Definition of Done: add "Help center topics updated for changed features or screens (iOS steps and screenshots, DE and EN), like the notelet and What's New."
- Modify: memory `release-pr-definition-of-done`.

- [ ] **Step 1:** Commit the AGENTS.md line (`docs: help center upkeep in the definition of done`).
- [ ] **Step 2:** Run `npm run lint`, `npm run test` and `npm run build` in the landing page; all green.
- [ ] **Step 3:** Send Tobias samples:
  - a Vercel preview link to the help home;
  - 6 topics: `copy-meal`, the Health activity topic, the calorie goal topic, the weekly budget topic, one settings topic and one platform-only topic, each opened once with `?platform=ios&source=app` and once without.
  - Wait for his OK.
- [ ] **Step 4: Launch, only on Tobias's word.** Merge the landing page PR and deploy before the 2.8.0 apps ship, so no app link ever hits a missing page.
