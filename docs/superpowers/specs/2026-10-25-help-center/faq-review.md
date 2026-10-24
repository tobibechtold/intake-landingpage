# FAQ review (help center, Task 5)

Date: 2026-10-25. Scope: every question of the old `/hilfe` and `/en/help` FAQ (`src/lib/faqData.ts`, 26 per language, DE and EN are parallel) and the BYOK guide (`ByokGuidePage.astro`), checked against the iOS 2.8.0 and Android inventories in this folder, plus the intake2 `2.8.0` branch where an inventory row was not enough.

Rule used for "keep": a question someone asks before buying (price, trial, what Intake AI is and what it costs, own key, privacy and data sources, platform compatibility). Everything that explains how the app works moves into a topic and leaves the FAQ. The FAQ items have no anchors and nothing links to `/hilfe#...`, so no redirect is needed (ruling 1 of Task 5).

Decisions: **keep** (unchanged), **fix** (kept, text corrected), **move to `<topic id>`** (removed from the FAQ; the correction is a note for whoever writes that topic in Task 7/8).

Result per language: 19 kept (12 unchanged, 7 fixed), 7 moved.

## Pricing / Preis

| # | Question (EN / DE) | Decision | Notes and correction |
|---|---|---|---|
| 1 | Is Intake a subscription-based app? / Ist Intake ein Abo-Modell? | keep | Accurate: the app is a one-time purchase, Intake AI is the optional subscription, BYOK works without it (B27, N36, Android §6). |
| 2 | Is there a trial period? / Gibt es eine Testphase? | fix | The answer said a flat "No", but Intake AI has a 3-day free trial (StoreKit config on 2.8.0: `P3D` free intro offer on monthly and yearly; Android paywall "3 Tage kostenlos testen"). Now: "No, not for the app." plus a closing sentence that Intake AI starts with a 3-day free trial. |
| 3 | Why does Intake AI require a subscription? / Warum braucht Intake AI ein Abo? | keep | Accurate. |

## Intake AI

| # | Question | Decision | Notes and correction |
|---|---|---|---|
| 4 | Is Intake AI mandatory? / Ist Intake AI verpflichtend? | keep | Accurate ("Ohne KI fortfahren", B27). |
| 5 | What does the Intake AI subscription include? / Was ist im Intake-AI-Abo enthalten? | fix | Feature list kept, wording aligned with the 2.8.0 meal card (log ingredients separately, correct ingredients and amounts, portion, edit before logging). Price: 3.99 € / 39.99 € is the German App Store price (StoreKit config, ASC per memory). The EN page served it to every country although the US price is $5.99 / $59.99 since 2026-09-09. Now: "In Germany it costs 3.99 € per month or 39.99 € per year ... The App Store and Google Play show the price for your country." **Tobias to confirm:** the Google Play price in Germany is also 3.99 € / 39.99 € (not in either inventory). |
| 6 | What is the difference between Intake AI and own API key (BYOK)? / Unterschied Intake AI und eigener API-Schlüssel? | fix | Out of date for 2.8.0. The answer said BYOK is "the basic AI food logging chat" and that portion controls and calorie adjustment are Intake AI only. On iOS 2.8.0 BYOK gets the same meal card: the portion row is not gated, "log each ingredient" is provider-agnostic since PR #31, the pencil opens the editable entry preview, photos are sent to BYOK providers too (`FoodSearchTabViews.swift` `IntakeAIChatOutcomeCard`, `FoodSearchModels.swift` image inputs). Only the structured correction sheet (`supportsStructuredCorrections`, false for BYOK) and nutrition-label scan (B9) are subscription-only. Android: chat and photos work with BYOK, label scan is [Premium] (Android §5, §6, notes line 254). New text: both log from text and photos, show the estimate as a card and let you change the portion and adjust it before logging; Intake AI adds the correction view and label scanning, needs no key or provider account. **Tobias to confirm:** on Android, is "Korrigieren" (the correction sheet) also subscription-only, like on iOS? The inventory row has no [Premium] marker. The new text only claims it for Intake AI, which holds either way. |
| 7 | Which features are Intake AI exclusive? / Welche Funktionen gibt es nur mit Intake AI? | fix | Same finding as 6: "log ingredients separately", "larger or smaller portions" and "manually adjust calories before logging" are no longer exclusive (iOS 2.8.0 BYOK has all three). Exclusive: the correction view (change food, portion or nutrition values, edit, remove or add ingredients; B24) and nutrition-label scanning that prefills the create-product form (B9, Android §5). Same Android caveat as 6. |
| 8 | Are Intake AI nutrition values exact? / Sind die Nährwerte von Intake AI exakt? | keep | Accurate (confidence level, editable before logging, disclaimer on both platforms). |

## Own API key (BYOK) / Eigener API-Schlüssel

| # | Question | Decision | Notes and correction |
|---|---|---|---|
| 9 | Can I use AI logging with my own API key? / Kann ich KI-Logging mit eigenem API-Schlüssel nutzen? | keep | Accurate (N38, Android §6). |
| 10 | Do I need an Intake AI subscription if I use my own key? / Brauche ich ein Intake-AI-Abo ...? | fix | "Limited to the basic AI chat flow" undersold 2.8.0 BYOK (see 6). Now names what is missing: the correction view and nutrition-label scanning. |
| 11 | Which providers can I use? / Welche Anbieter ...? | keep | Accurate: OpenAI, Claude, Gemini on both platforms. |
| 12 | How do I get an OpenAI, Anthropic, or Gemini API key? / Wie bekomme ich einen ... API-Schlüssel? | move to `byok-guide` | A how-to; the guide covers it step by step with the official key pages. No correction needed. |
| 13 | Does ChatGPT Plus or Claude Pro include an API key? / Enthält ChatGPT Plus oder Claude Pro einen API-Schlüssel? | keep | A cost question before setting up BYOK. Accurate. |

## Privacy & data / Datenschutz & Daten

| # | Question | Decision | Notes and correction |
|---|---|---|---|
| 14 | Do I need an account to use Intake? / Brauche ich ein Konto für Intake? | fix | "Can sync via your iCloud account or Google Drive" is wrong for Android: there is no sync on Android, only an encrypted Google Drive backup (Android §7, "iOS uses iCloud sync; Android substitutes Google Drive backup"). Now: iCloud sync on iPhone, encrypted backup to Google Drive on Android. |
| 15 | What data is sent when I use Intake AI? / Welche Daten werden bei Intake AI gesendet? | keep | Matches the app's privacy story (descriptions, photos, captions, chat context via the backend). The exact payload is not in the inventories; not changed. |
| 16 | What data is sent when I use my own API key? / ... bei eigenem API-Schlüssel gesendet? | keep | Accurate: requests go straight to the chosen provider, the key stays in the Keychain / on the device (N38, Android §6). |
| 17 | Is Intake privacy-first? / Ist Intake datenschutzfreundlich? | fix | "iCloud and Google Drive backups are optional": iCloud is sync, not a backup; Google Drive is Android's encrypted backup. Now: "iCloud sync on iPhone and the encrypted Google Drive backup on Android are optional." |

## Tracking features / Tracking-Funktionen

| # | Question | Decision | Notes and correction |
|---|---|---|---|
| 18 | How many foods are included? / Wie viele Lebensmittel sind enthalten? | keep | Pre-purchase question. **Tobias to confirm:** "over 3 million entries" is still the current count (not in the inventories). |
| 19 | Where does the food data come from? / Woher stammen die Lebensmitteldaten? | keep | Pre-purchase question. Consistent with the search sources in B2 (Datenbank / Open Food Facts / Grundnahrungsmittel). **Tobias to confirm:** USDA and BLS are still the basic-food sources and the data is still updated daily (not in the inventories). |
| 20 | Can I set my own goals in Intake? / Kann ich in Intake eigene Ziele festlegen? | move to `calorie-goal` | How the app works. Accurate as far as it goes; the topic should add: maintenance from body data (Mifflin-St Jeor), own TDEE, or (iPhone) Apple Health resting energy; a fixed daily target overrides all; macros guided by protein g/kg and style, or own grams (C2 to C5, C13; Android §2.2, §2.4). |
| 21 | Can I personalize Intake? / Kann ich Intake personalisieren? | move to `edit-today-page` | How the app works. Correction for the topic: Edit Today Page also reorders sections and meals, deletes custom meals and resets to default (A2 to A5). **Tobias to confirm** the entry point: the answer says "at the bottom of the Today page"; the iOS inventory does not say where the button is. |

## Sync & integrations / Sync & Integrationen

| # | Question | Decision | Notes and correction |
|---|---|---|---|
| 22 | Does Intake integrate with Apple Health (iOS) or Health Connect (Android)? / Unterstützt Intake Apple Health oder Health Connect? | keep | Compatibility question before buying. Accurate. |
| 23 | What data does Intake read from Apple Health / Health Connect? | move to `health-read-write` | Incomplete. iOS also reads resting energy, height, waist, body fat, birthday and sex (onboarding) and, optionally, water from other apps (H3, E6). Android also reads total and resting calories, height and body fat (Android Health Connect section). Weight is read from any source, not only a smart scale. |
| 24 | Can I import historical weight data? | move to `import-weight-history` | iPhone only (topic is `ios` only). Topic should mention the two modes "Vorhandene Einträge überschreiben" / "Nur fehlende Tage ergänzen" (F5). |
| 25 | Are activity calories added to my daily target? | move to `activity-settings` | Accurate but thin. Topic: toggle "Aktivität zum Ziel addieren", source "Alle Aktivität" / "Nur Workouts", share 0 to 100 % (C15 to C17, Android §2.5). |
| 26 | What data does Intake write to Apple Health / Health Connect? | move to `health-read-write` | Incomplete. iOS also writes weight and, optionally, waist and body fat, and deleting an entry removes its samples (H4). Android writes nutrition, the daily water total, weight and body fat, never calories burned, steps or workouts. |

## BYOK guide (`/hilfe/eigener-api-schluessel`, `/en/help/own-api-key`)

Not changed in Task 5 (not in its file list). Findings for whoever touches the guide next:

- **Seven em dashes in copy** (Global Constraints forbid them): EN "Provider, optional model name, API key[em dash]that is all Intake needs.", "Copy it immediately[em dash]the provider may show ...", "The model name is optional[em dash]only change it ..."; DE "API-Schlüssel[em dash]mehr braucht Intake nicht.", "Kopiere ihn direkt[em dash]manche Anbieter ...", "Der Modellname ist optional[em dash]ändere ihn nur ...", "Abrechnungseinrichtung[em dash]prüfe deshalb ...".
- **Android path:** the guide says Intake AI is "under Integrations". True on iOS (Settings > Integrationen > Intake AI); on Android, Intake AI sits in the "Einstellungen" section of Settings (Android part B §1, §3.1). The screenshots are iOS only.
- **"Basic AI food logging"** (intro and the `byok-guide` entry's short): undersells 2.8.0 BYOK (see FAQ 6). Not wrong enough to block; worth rewording when the guide is refreshed for 2.8.0.
- Otherwise accurate: providers, default model per provider, key stored on the device only, requests sent directly to the provider, Gemini free tier caveat.
