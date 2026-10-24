# Intake help center: design

Status: draft for Tobias's review, 2026-10-25. Projects: intake-landingpage (pages), intake2 (iOS entry points), intake-android (Android entry points).

## Why

Tobias keeps getting feature requests and support questions about things Intake already does: of 721 feature-voting posts, dozens ask for existing features (copying a meal to another day, getting steps and workouts in, how the calorie goal is built, recipes, own AI key). He is tired of explaining the same thing again. The help center gives every answer one permanent home so he can answer with a link, and so people find the answer themselves before asking.

Success: Tobias answers a repeat question with one link; people asking from inside the app find the answer without writing.

## Goals

- Explain **every non-trivial feature and every setting** of Intake, on iOS and Android. The first version is complete, not a top-ten.
- One page per topic, each with a short permanent link Tobias can paste into feature-voting comments and support mails.
- Reachable from the web, from a prominent help button in each app's Settings top bar, and from "Mehr erfahren" links on settings screens that need explaining.
- German and English.
- Kept current: part of every release's definition of done, like the notelet and What's New.

## Non-goals

- No other languages than German and English (the apps ship eight; the help center does not).
- No marketing tour of features. Pre-purchase questions (price, privacy, Intake AI in general) stay in the existing FAQ.
- No in-app native help screens; the apps open the web pages.
- No new app features. Gaps the research found (a real "move entry to another day") are separate decisions.

## Anti-goals (would make it a failure even if it works)

- **Too much text.** Tobias's rule: short and clear. A short answer first, one sentence per step, the screenshot carries the rest. A topic that needs a long explanation is split into two.
- Links that break: a slug, once published, never changes (a renamed topic keeps its slug or redirects).
- Pages that describe an older app than the one in the store.

## What a reader sees

### Help home
`/hilfe` (DE) and `/en/help` (EN). Today this page holds an FAQ (6 sections, about 26 questions per language, `src/lib/faqData.ts`) and links the BYOK guide (`/hilfe/eigener-api-schluessel`). The help home becomes search on top and the topics grouped by area.

**Existing content (Tobias):** every FAQ answer and the BYOK guide is reviewed for accuracy against the current apps (iOS 2.8.0, current Android) and migrated into the new structure. Each answer becomes a topic or part of one; answers that are pure pre-purchase questions (price, privacy, what Intake AI is) stay as a short FAQ block on the help home, also reviewed. Old URLs and FAQ anchors keep working (the BYOK guide keeps its URL as a topic; any other moved anchor redirects to its topic).

Areas (from the iOS inventory; Android maps onto the same areas): Heute, Essen erfassen, Rezepte & Bibliothek, Ziele & Wochenbudget, Fasten, Wasser, Gewicht & Körpermaße, Statistik, Apple Health / Health Connect, Sync, Widgets, Watch & Kurzbefehle, Intake AI, Einstellungen.

### Topic page
`/hilfe/<slug>` and `/en/help/<slug>`, e.g. `/hilfe/mahlzeit-kopieren`. Structure (variant A from the mockup Tobias picked):
1. Title as the reader's question or task ("Mahlzeit auf einen anderen Tag kopieren").
2. **Kurz:** one or two sentences that fully answer it.
3. Numbered steps, one sentence each, each with a screenshot.
4. "Warum…" topics (how the weekly budget works, why Health Connect calls calories an estimate) replace steps with a few short paragraphs and, where useful, one screenshot.
5. Related topics, at most three.

### Platform
- **Web:** a sticky iPhone/Android switch at the top swaps every step and screenshot on the page at once. The choice is remembered (local storage) and preset from the user agent on first visit.
- **From an app:** the app opens the page with a platform parameter (e.g. `?platform=ios`); the page then shows only that platform and hides the switch. Opened in the in-app browser (SFSafariViewController on iOS, Custom Tabs on Android).
- **One platform only** (Siri and Kurzbefehle, iPhone Duo layout, Android-only features): the topic stays visible on both; the other platform sees a note at the top, "Nur auf dem iPhone" / "Nur auf Android" (EN: "Only on iPhone" / "Only on Android").
- A topic that works the same on both platforms is written once; only the screenshots differ.

### Screenshots
- Cropped tight to the relevant part of the screen, with the button to tap highlighted. A step without a button frames the explained area.
- Demo data from the screenshot seeders, never real user data.
- Light mode.
- German screenshots on German pages, English on English pages.
- iOS screenshots by the iOS session, Android by the Android session.

## Entry points in the apps

- **Settings top bar:** a prominent help button (both platforms) opening the help home.
- **"Mehr erfahren" links:** a small link in the section footer of settings screens that are hard to understand, opening the matching topic. First candidates: Apple Health / Health Connect setup, activity and workout settings, calorie goal and deficit, weekly budget, sync, Intake AI provider and own key.
- Both open the web page with the platform parameter and the app's language (DE pages for German, EN otherwise).

## Content scope

Every row of the iOS inventory (`2026-10-25-help-center/ios-inventory.md`, 257 rows in 11 areas) and of the Android inventory (requested from the Android session, to be added to the same folder) is covered by some topic. Topics group rows; a setting gets its own topic only when it needs explaining, otherwise it is covered on its screen's topic ("Einstellungen: Aktivität").

The most asked topics (from `2026-10-25-help-center/feature-voting-recon.md`, all 721 posts, incl. closed) must exist at launch:
1. Mahlzeit oder einzelne Einträge auf einen anderen Tag kopieren (about 14 posts)
2. Eintrag in eine andere Mahlzeit, an einen anderen Tag oder auf eine andere Uhrzeit verschieben. Today a day change is only copy then delete; the page says so plainly (about 7 posts)
3. Schritte, Aktivität und Workouts aus Apple Health / Health Connect, incl. "Workouts ohne Doppelzählung", what is not read directly (Garmin, Fitbit, Strava) (about 20 posts)
4. So entsteht dein Kalorienziel: Grundumsatz, Defizit, Tagesziele, Ruheenergie (about 14 posts)
5. Intake AI mit eigenem Anbieter und API-Schlüssel (about 20 posts; the existing guide)
6. Rezepte: Garverlust, roh/gekocht, echtes Gewicht, kopieren (about 12 posts)
7. Was Apple Health / Health Connect liest und was Intake nur schreibt (about 12 posts)
8. Schnell hinzufügen nur mit kcal (about 8 posts)
9. Heute-Seite bearbeiten (about 7 posts)
10. Wasser und Getränke (about 8 posts)
11. Portionen und Einheiten (about 10 posts)
12. Wie das Wochenbudget funktioniert (no written explanation exists yet; written from the 2.8.0 code)
13. Warum Health Connect Kalorien als Schätzung zeigt (Android; partly covered, completed with the Android session)

## Upkeep

- Definition of done for every release that changes a feature or a screen: the matching topics are updated on that platform, in DE and EN, with new screenshots, in the same release as the notelet and What's New. Added to the release-PR definition of done on both platforms.
- New features get a topic in the release that ships them.
- The inventories in `2026-10-25-help-center/` are the coverage checklist; a release that adds a setting adds its row.

## Decided by Tobias

Lives on getintake.de in the landing page; one page per topic (variant A); DE + EN; web switch, app preset; platform-only topics shown with "Nur auf dem iPhone"; cropped screenshots with highlighted button; "Mehr erfahren" links on hard settings screens; complete at launch; the existing help page content is reviewed for accuracy and migrated; upkeep in every release's definition of done; iOS and Android sessions work in parallel; short and clear above all.

## My calls (Tobias to check)

- Pre-purchase FAQ answers stay as a short reviewed FAQ block on the help home; everything else from the old page moves into topics.
- Platform parameter `?platform=ios|android`; first web visit preset from the user agent.
- Topics are content files in the repo (like `content/whats-new/<version>`), one folder per slug with `de.md`, `en.md` and platform screenshot folders; the build checks that every topic has both languages and, unless platform-only, both platforms.
- Search is client-side over titles and short answers (no external service).
- Light mode screenshots only.
- The pages are public and indexed (they double as search-engine pages for "Intake …" questions).

## Review and timing (Tobias, 2026-10-25)

- **Review:** Tobias checks samples; then everything goes live at once. No per-topic draft flag needed; the whole help center is built on a branch and published together.
- **Ships with 2.8.0:** the help button and "Mehr erfahren" links are part of 2.8.0 on both platforms, and the pages go live before 2.8.0 is released. There is no deadline: 2.8.0 is a big release with a refinement round after the build, and is not rushed.

## Calls from the builder check (mine, Tobias to check)

- **Launch waits for both platforms.** "Complete at launch" holds for Android too; the Android inventory joins `2026-10-25-help-center/` before the topic list is frozen. A topic is platform-only only when the feature exists on one platform.
- **Slugs are translated per language**, like the rest of the site (`/hilfe/eigener-api-schluessel` ↔ `/en/help/own-api-key`): each topic has a `de` and an `en` slug, paired for hreflang, both in the sitemap. Tobias pastes the slug of the language he answers in.
- **Slug list first.** The topic list with both slugs is frozen and published as a small JSON manifest in the repo before any app work; the apps hard-code their "Mehr erfahren" targets from it. Pages go live before the app releases that link to them, so no app ever links to a 404.
- **App language:** German pages when the app language is German, English for the other seven.
- **Platform switch is client side:** each page contains both platforms' steps; a tiny inline script in the head hides the other platform before first paint (no flash). Without JavaScript both platforms show under their own headings. Crawlers see both.
- **Old links:** the BYOK guide keeps both URLs as its topic. FAQ anchors on `/hilfe` that moved are mapped to their topic by a small client-side redirect on the help home; server redirects only for whole pages (`vercel.json`). The pre-purchase FAQ block keeps its FAQPage structured data and the existing structured-data test.
- **Screenshots:** WebP through the existing What's New asset path (`whatsNewAssets` / `screenshotAssets.ts`); the highlight is drawn into the image by the capturing session (no coordinates in content files).

## Left to the builder

Page components and styling within the landing page's design; slug list; exact topic grouping per area; screenshot pipeline per platform (iOS: the demo seeder plus simulator capture; Android: the Android session's own); highlight style; search implementation; the app-side button and link components on each platform.
