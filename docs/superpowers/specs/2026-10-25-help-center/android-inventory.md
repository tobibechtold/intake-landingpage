# Android help-center inventory (app 2.7.5, 2.8.0 items marked)

Two parts: A = Heute, logging, Intake AI, library/recipes, fasting, sharing, Statistik, widgets, reminders, onboarding. B = every Settings screen, Health Connect (incl. what is read/written and why calories are an estimate), backup, data. German labels in tables were checked against values-de strings_ios.xml (2.7.5 and release/2.8.0); rows whose first column is a descriptive name rather than a UI string are not exact labels. iOS differences are only those stated in Android code/docs; the iOS 0.04 kcal/step note is from memory, verify on iOS.

# Help-center inventory, part A (Android, branch fix/2.7.4-bugs = app 2.7.5)

Source: code on `fix/2.7.4-bugs`; labels from `core/ui/src/main/res/values{,-de}/strings_ios.xml` (all UI strings live there, mapped through `IosStrings.kt`). Features that only exist on `release/2.8.0` are marked **(2.8.0)** and use the labels from that branch.

Markers: **[Geste]** = hidden gesture (long press, swipe, tapping a value). **[Premium]** = needs an Intake AI subscription. **[AI]** = needs Intake AI set up (subscription or your own API key). Paths use the German UI labels. "iOS" column: only differences that the code, comments or docs state; otherwise "—".

Navigation basics (2.7.5): the bottom capsule has the tabs **Heute / Today**, **Fasten / Fasting** (only while fasting is on), **Bibliothek / Library**, **Statistik / Stats**. **Einstellungen / Settings** is not a tab: it is the gear in the Heute header (code comment: "matching iOS, which puts a gear beside the calendar"). A round **+** button (quick add) floats next to the capsule on every tab.

---

## 1. Heute: header, days and dashboard

| ID | DE label | EN label | Path | What it does | iOS difference |
|---|---|---|---|---|---|
| D1.1 | Heute (Titel mit Datum) | Today (title with date) | Heute → header | Shows the selected day ("Heute", or the date). | — |
| D1.2 | Heute (Button/Symbol) | Today (button/icon) | Heute → header, only when another day is shown | Jumps back to today; on narrow screens it is a calendar-day icon instead of a pill. | — |
| D1.3 | Bild teilen (Teilen-Symbol) | Share a picture (share icon) | Heute → header → share icon | Opens the share-picture gallery for the day (see section 9). | Comment: share button moved next to date/settings "as on iOS". The icon's accessibility label key `socialShare.shareDay` has no string resource. |
| D1.4 | Datum wählen (Kalender-Symbol) | Select Date / Choose Date | Heute → header → calendar icon | Date picker sheet to jump to any day. | — |
| D1.5 | **(2.8.0)** Monatskalender (Vorheriger/Nächster Monat) | Month calendar (Previous/Next month) | Heute → calendar icon | Whole month, each day coloured by its result; footer counts "{n} grün · {n} orange · {n} rot". Reads only local data, never Health Connect. | — |
| D1.6 | Einstellungen (Zahnrad) | Settings (gear) | Heute → header → gear | Opens Settings. | Same as iOS (gear beside calendar). |
| D1.7 | Wochenleiste | Week strip | Heute → row of 7 days | Tap a day to open it; **[Geste]** swipe the strip sideways to page whole weeks. | — |
| D1.8 | Tagesstreifen-Indikatoren | Day strip indicators | Heute → Wochenleiste (small bar under a day) | Green/yellow/red line under days with logged food (calorie result). Off unless enabled. | — |
| D1.9 | Zwischen Tagen wischen | Swipe between days | **[Geste]** swipe left/right on the Heute cards; toggle in Einstellungen → Darstellung → Interaktionen | Swipe right = previous day, left = next day. | — |
| D1.10 | **(2.8.0)** Zum Aktualisieren ziehen | Pull to refresh | **[Geste]** Heute (and Statistik) → pull down | Re-reads Health Connect for every day since the last read. | — |
| D1.11 | Kalorienring: kcal übrig / kcal zu viel / kcal gegessen | kcal left / kcal too much / kcal eaten | Heute → Dashboard → **[Geste]** tap the ring | Toggles the ring between "left" and "eaten"; the choice is remembered. | — |
| D1.12 | Kalorien-Statusfarben | Calorie status colors | Einstellungen → Darstellung → Interaktionen | Colours the ring green/yellow/red by the day's status instead of the accent colour. | — |
| D1.13 | Ziel | Target | Heute → Dashboard → tap the "Ziel" row (has a chevron, shows a ±delta badge) | 2.7.5: opens Einstellungen → Tagesabhängige Ziele to adjust a day's target. | Code comment: "Android adjusts a day's target in Settings" (iOS has an in-place sheet). Changed in 2.8.0, see next row. |
| D1.14 | **(2.8.0)** Tagesziel anpassen | Adjust day target | Heute → Dashboard → tap "Ziel" | Sheet on Today: amount stepper, scope "Nur {Datum}" / "Jeden {Wochentag}", source "Zusätzlich" / "Von den anderen Tagen" / "Aus dem Wochensaldo"; caps at ±1.000 kcal/day and never below the floor. | Code: "Android no longer edits day changes in Settings" (now like iOS). |
| D1.15 | **(2.8.0)** Woche (Wochenbudget-Zeile) | Week (weekly budget row) | Heute → Dashboard → "Woche" row (only with weekly budget on) | Shows "+{kcal} übrig" / "{kcal} zu viel" for Monday–Sunday; tap opens the weekly overview. | — |
| D1.16 | **(2.8.0)** Wochenübersicht: Nichts gegessen / Markierung entfernen | Weekly overview: Ate nothing / Remove mark | Heute → Woche → overview → day | Marks an empty day as a real zero-day so the budget counts it; "Aus dem Wochensaldo übertragen" moves the balance onto today. "Wochenbudget-Einstellungen" opens the setting. | — |
| D1.17 | Übrig / Gegessen (zweite Zeile) | Left / Eaten | Heute → Dashboard | The complement of what the ring shows. | — |
| D1.18 | Verbrannt | Burned | Heute → Dashboard | Activity calories credited for the day. | — |
| D1.19 | Makros (auf-/zuklappen) | Macros | Heute → Dashboard → "Makros" | Expands/collapses the macro block (remembered). | — |
| D1.20 | Makro antippen → Beitrag | Tap a macro → contribution | **[Geste]** Heute → Dashboard → tap Protein/Kohlenh./Fett/Zucker/… | Sheet listing which foods (incl. recipe ingredients) contributed that macro. | — |
| D1.21 | Alle Nährstoffe anzeigen | Show all nutrients | Heute → Dashboard → Makros → "Alle Nährstoffe anzeigen" | Full daily nutrient overview grouped as Makronährstoffe / Fett- & Kohlenhydratdetails / Mineralstoffe & Elektrolyte / Vitamine / Weitere. | — |
| D1.22 | Heute-Seite bearbeiten | Edit Today Page | Heute → bottom button "Heute-Seite bearbeiten" | Page to arrange sections and meals (next rows). | — |
| D1.23 | Abschnitte (ein-/ausblenden, sortieren) | Sections | Heute-Seite bearbeiten → Abschnitte | Show/hide and reorder Dashboard, Mahlzeiten, Wasser, Aktivität, Gewicht, Stimmung, Körpermaße. **[Geste]** long-press a row, then drag to reorder. Körpermaße is hidden by default. | — |
| D1.24 | Mahlzeiten (ein-/ausblenden, sortieren) | Meals | Heute-Seite bearbeiten → Mahlzeiten | Show/hide and reorder meals; **[Geste]** long-press + drag. | — |
| D1.25 | Neue benutzerdefinierte Mahlzeit | New custom meal | Heute-Seite bearbeiten → Mahlzeiten → add card | Creates an own meal with name and icon ("Mahlzeit-Symbol wählen"); edit or delete it later. A deleted custom meal that still has entries shows as "(Archiviert)". | — |
| D1.26 | Auf Standard zurücksetzen | Reset to default | Heute-Seite bearbeiten → bottom | Resets sections and meals after confirmation ("Heute-Seite zurücksetzen?"). | — |

## 2. Heute: meals and logged entries

| ID | DE label | EN label | Path | What it does | iOS difference |
|---|---|---|---|---|---|
| D2.1 | + (Schnell hinzufügen, schwebend) / „Hinzufügen {Mahlzeit}“ | + (quick add FAB) / "Add {meal}" | Any tab → round + next to the capsule | Menu of the visible meals; opens food search for the chosen meal. With only one visible meal it opens directly. | — |
| D2.2 | Hinzufügen (+ am Mahlzeitkopf) | Add item | Heute → Mahlzeit → round + | Opens food search for that meal, also when the meal is collapsed. | — |
| D2.3 | Mahlzeit ein-/ausklappen | Collapse/expand meal | **[Geste]** Heute → Mahlzeit → tap the kcal total | Collapses/expands the meal's entries (remembered per meal). | — |
| D2.4 | Mahlzeitübersicht (Mahlzeittitel antippen) | Meal overview (tap meal title) | **[Geste]** Heute → tap the meal's icon/title | Sheet with the meal's kcal, macros and foods, plus the actions below. | — |
| D2.5 | Bild teilen | Share picture | Mahlzeitübersicht → share icon | Share-picture sheet for this meal (food photo preselected as background). | — |
| D2.6 | Als Datei senden | Send as file | Mahlzeitübersicht → file icon | Shares the meal as a `.intakemeal` file (via Android share sheet, "Mahlzeit teilen"). | — |
| D2.7 | Mahlzeit kopieren | Copy meal | Mahlzeitübersicht → ⋮ → Mahlzeit kopieren | Pick day + meal ("Tag und Mahlzeit wählen"), untick products you don't want, "Zum Tagebuch hinzufügen". Copies photos too. Used for "move/copy a meal to another day". | — |
| D2.8 | Rezept erstellen | Create Recipe | Mahlzeitübersicht → ⋮ → Rezept erstellen | Opens the recipe editor prefilled with the meal's foods. | — |
| D2.9 | Mahlzeit löschen | Delete meal | Mahlzeitübersicht → ⋮ → Mahlzeit löschen | Deletes all entries of the meal after confirmation ("Dadurch werden {n} erfasste Produkte entfernt."). | — |
| D2.10 | Eintrag bearbeiten (Eintrag antippen) | Edit Food (tap entry) | Heute → tap a logged entry | Full-screen edit page for that entry (rows below). There is no long press or swipe on Today entries. | — |
| D2.11 | Portion / Eigene Menge | Portion / Custom amount | Eintrag bearbeiten | Change servings or a custom amount in g, ml, TL, EL, Tasse, Glas, oz, fl oz. | — |
| D2.12 | Mahlzeit (Eintrag verschieben) | Meal (move entry) | Eintrag bearbeiten → "Mahlzeit" | Moves the entry to another meal of the same day. | — |
| D2.13 | Uhrzeit / Zeit hinzufügen | Time / Add time | Eintrag bearbeiten → "Uhrzeit" | Sets when the food was eaten (used e.g. in the PDF report). | — |
| D2.14 | Gewogen: Roh / Gekocht | Weighed: Raw / Cooked | Eintrag bearbeiten or product page (only for foods with a conversion factor) | Switches between raw and cooked weight; "1 g roh ≈ {x} g gekocht". Entry shows "roh"/"gekocht". | — |
| D2.15 | Als Getränk markieren | Mark as beverage | Eintrag bearbeiten / product page | Counts the amount (ml) toward the water goal ("Wird zu deinem Wasserziel hinzugefügt."). | — |
| D2.16 | Foto hinzufügen / Foto aufnehmen / Aus Galerie wählen / Foto entfernen | Add photo / Take photo / Choose from gallery / Remove photo | Eintrag bearbeiten → photo area | Attaches a photo to the entry (Android photo picker, no storage permission). Only with Einstellungen → Darstellung → Fotos → "Fotos verwenden" on. | — |
| D2.17 | Bild teilen / Als Datei senden (Eintrag) | Share picture / Send as file (entry) | Eintrag bearbeiten → top bar | Share a picture of the single food, or send it as a `.intakemeal` file. | — |
| D2.18 | Löschen | Delete | Eintrag bearbeiten → Löschen | Removes the entry. | — |
| D2.19 | Fotos auf Heute zeigen | Show photos on Today | Einstellungen → Darstellung → Fotos | Shows 40 dp thumbnails in Today rows. "Fotos auf einzelnen Zutaten": ingredients logged from an Intake AI estimate show the whole-meal photo. | — |
| D2.20 | Geteilte Mahlzeit (Import) | Shared Meal (import) | Open a `.intakemeal` file (mail, chat, files) with Intake | Preview sheet → "Zum Tagebuch hinzufügen" → choose day + meal, untick products. Error: "Diese Mahlzeitdatei konnte nicht geöffnet werden." | — |

## 3. Heute: water, weight, activity, mood, measurements

| ID | DE label | EN label | Path | What it does | iOS difference |
|---|---|---|---|---|---|
| D3.1 | Wasser: + / − | Water: + / − | Heute → Wasser | + adds one glass (glass size); − undoes the last added amount. | — |
| D3.2 | Benutzerdefiniert → Benutzerdefinierte Menge | Custom → Custom amount | Heute → Wasser → "Benutzerdefiniert" | Sheet with shortcut amounts and a free amount. | — |
| D3.3 | Wasserziel (Stift) | Water Goal (pencil) | Heute → Wasser → pencil | Sheet to set daily goal and glass size with −/+. Not reachable from Settings (no water-goal row there). | — |
| D3.4 | Andere Getränke anzeigen | Other beverages | Heute → Wasser → "Andere Getränke" | Expands the foods marked as beverages that count toward water; header shows "{n} andere Getränke". | — |
| D3.5 | Tagesziel: {n} Gläser | Daily goal: {n} glasses | Heute → Wasser | Goal in glasses; dots under the wave show progress. | — |
| D3.6 | Gewicht −/+ | Weight −/+ | Heute → Gewicht | Steps the day's weight (0.1 kg or 0.2 lb); saved after ~1 s. | — |
| D3.7 | Gewicht direkt eingeben | Type weight | **[Geste]** Heute → Gewicht → tap the number | Opens inline typing; invalid input is not saved. | — |
| D3.8 | Neu synchronisieren (Health Connect) | Resync | Heute → Gewicht → sync icon | Re-reads weight from Health Connect; asks for permission if missing. Status lines: "Health Connect synchronisiert: {Datum}", "Keine Gewichtseinträge in Health Connect gefunden." | Health Connect instead of Apple Health. |
| D3.9 | Gesamt | Total | Heute → Gewicht → "Gesamt" | Weight change since the starting weight. | — |
| D3.10 | Startgewicht / Zurücksetzen | Starting weight / Reset | Einstellungen → Körperdaten → Startgewicht | Date from which "Gesamt" counts; default is your first logged weight. | — |
| D3.11 | Aktivität: Hinzufügen → Aktivität hinzufügen | Activity: Add → Add Activity | Heute → Aktivität → "Hinzufügen" | Page: Trainingsart (17 presets), Dauer (presets or "Eigene"), Kalorien "Berechnet"/"Manuell" with "Vorschlag: {n} kcal". | — |
| D3.12 | Eigene hinzufügen → Aktivität erstellen | Add custom → Create activity | Aktivität hinzufügen → "Eigene hinzufügen" | Own activity with name, emoji and kcal per hour; reusable. | — |
| D3.13 | Manuelle Aktivität bearbeiten / löschen | Edit / delete manual activity | **[Geste]** Heute → Aktivität → tap a manual activity | Sheet with Bearbeiten / Löschen. | — |
| D3.14 | Health Connect jetzt synchronisieren | Sync Health Connect now | Heute → Aktivität → refresh icon | Pulls steps, calories and workouts now. | — |
| D3.15 | Health Connect-Block (Schritte, Workouts, Hinweis-Zeile) | Health Connect block | Heute → Aktivität | Shows steps/workouts with "über {App} · {Zeit}"; tap the estimate line for an explanation, tap a warning for a diagnosis sheet ("Bericht senden"). Banner "Health Connect ist gerade ausgelastet…". | Health Connect instead of Apple Health. |
| D3.16 | Gesamt verbrannt | Total burned | Heute → Aktivität | Sum of credited activity calories. | — |
| D3.17 | Stimmung: Emoji antippen | Mood: tap an emoji | Heute → Stimmung | Quick check-in; opens "Wie fühlst du dich heute?" with optional notes. "Hinzufügen"/"Bearbeiten"/"Löschen". | — |
| D3.18 | Körpermaße: + → Maße erfassen | Measurements: + → Log Measurements | Heute → Körpermaße (hidden by default; show it in Heute-Seite bearbeiten) | Log Taille, Hüfte, Brust, Oberschenkel, Oberarm, Hals, Körperfett for a date; "Aktualisieren" re-reads Health Connect. | — |

## 4. Logging: add-food screen (search, scan, library, suggestions)

| ID | DE label | EN label | Path | What it does | iOS difference |
|---|---|---|---|---|---|
| D4.1 | Mahlzeit-Auswahl (Titel) | Meal picker (title) | Lebensmittel hinzufügen → tap the title | Switches the target meal without closing the screen. | — |
| D4.2 | **(2.8.0)** Übersichts-Kapsel / Makros anzeigen | Summary capsule / Show macros | Lebensmittel hinzufügen (every page) and Intake-AI chat → small ring under the title | Shows kcal left for the selected day; tap for macro bars "{x} / {y} g · {z} übrig"; previews the amount you are choosing. | — |
| D4.3 | Lebensmittel suchen (Suchfeld unten) | Search food | Lebensmittel hinzufügen → floating search pill at the bottom | Searches recipes, own products and the database. The round button next to it is Scan while empty and Cancel while searching ("matching iOS"). | — |
| D4.4 | Intake AI (Karte) | Intake AI (card) | Lebensmittel hinzufügen → top card | Opens the Intake AI chat (section 6). Hidden when "Ohne KI fortfahren" was chosen; then the card is "Scannen". | — |
| D4.5 | Erstellen (Karte) | Create (card) | Lebensmittel hinzufügen → top card | Create-product form (section 5). | — |
| D4.6 | Scannen → Barcode | Scan → Barcode | Lebensmittel hinzufügen → Scan button/card | Full-screen camera; detects EAN-8/EAN-13/UPC/Code128, flashlight toggle, opens the product. Falls back to Open Food Facts. | Comment: "iOS 2.6.0 parity" camera; OFF fallback "iOS has always done this". |
| D4.7 | Barcode existiert bereits | Barcode already exists | Scan while creating a product | Dialog: "Produkt öffnen" / "Produkt bearbeiten" / "Weiter bearbeiten". | — |
| D4.8 | Mahlzeit scannen (Kamera-Modus) **[AI]** | Meal Scan | Scan camera → mode chip "Mahlzeit scannen" ("Mahlzeit fotografieren") | Takes a meal photo (or gallery) and sends it to Intake AI. Only offered when AI is available. | — |
| D4.9 | Routinen / Alle hinzufügen | Routines / Add all | Lebensmittel hinzufügen → "Routinen" | Recipes with a fixed meal; "Alle hinzufügen" logs a routine in one tap when its meal matches. | — |
| D4.10 | Vorschläge ({Mahlzeit}) | Suggestions ({meal}) | Lebensmittel hinzufügen → "Vorschläge" | Foods you usually log for this meal, "{n}-mal geloggt"; + logs the shown amount instantly; "Alle {n} anzeigen". | — |
| D4.11 | Bibliothek: Favoriten / Meine Produkte / Verlauf / Häufig / Rezepte | Library: Favorites / My products / Recent / Frequent / Recipes | Lebensmittel hinzufügen → "Bibliothek" rows | Each opens a searchable list; tapping a row logs it. Tag chips filter. | Comment: Frequent was removed once in the iOS redesign and came back. |
| D4.12 | Aus Häufig entfernen / Aus Verlauf entfernen | Remove from Frequent / Remove from Recent | **[Geste]** Häufig or Verlauf list → long-press a food, or swipe it left | Removes the food from that list (not from the database). | "as on iOS" |
| D4.13 | Favorit (Herz) | Favorite (heart) | Search result row / product page → heart | Adds/removes a favourite ("Tippe auf das Herzsymbol, um Favoriten zu speichern."). | — |
| D4.14 | Favoriten sortieren | Sort favorites | Favoriten list → sort | Alphabetisch / Zuletzt hinzugefügt / Am häufigsten geloggt. | — |
| D4.15 | Schnell hinzufügen (+ in der Zeile) | Quick add | Search/library row → + | Logs the remembered/default amount without opening the product; "+{kcal} kcal hinzugefügt" overlay. | — |
| D4.16 | Mehr laden | Load more | Search results → bottom | Loads more database results. | — |
| D4.17 | Quellen-Badges | Source badges | Search rows | KI-Schätzungen / Datenbank / Community / Grundnahrungsmittel / Open Food Facts / Verifiziert. | — |
| D4.18 | **(2.8.0)** kcal pro 100 g in der Suche | kcal per 100 g in search | Search rows | Big number is per 100 g (100 ml for drinks) with a portion line "{kcal} kcal pro {Portion} ({Menge})"; Verlauf/Häufig show the last logged amount. | — |
| D4.19 | Lebensmittel-Datenbank Land / Ich kaufe auch ein in | Food database country / I also shop in | Einstellungen → (Region) Lebensmittel-Datenbank Land | Filters Open Food Facts products to your country (plus extra countries). | — |

## 5. Logging: product page, create product, review submissions

| ID | DE label | EN label | Path | What it does | iOS difference |
|---|---|---|---|---|---|
| D5.1 | Portion wählen | Select Portion | Tap a food → product page | Choose a serving, number of portions, or "Eigene Menge" in a unit; CTA adds with kcal. | — |
| D5.2 | {Menge} pro {Einheit}, tippen zum Ändern | {grams} per {unit}, tap to change | **[Geste]** Product page → custom unit → tap the per-unit hint | Asks "Wie viel wiegt {Menge} {Einheit} {Lebensmittel}?" to correct a unit weight. | — |
| D5.3 | Alle Nährwerte anzeigen | See all nutrients | Product page → nutrients | Full nutrient list; only nutrients the product has. | — |
| D5.4 | Sieht gut aus / Problem melden | Looks good / Report issue | Product page (shared database products) | Feedback on a catalogue product; "Problem melden" lets you pick Falsche Nährwerte / Falscher Name oder Marke / Doppeltes Produkt / Falscher Barcode / Portionsangaben fehlen / Sonstiges, or "Stattdessen bearbeiten". | — |
| D5.5 | Produkt bearbeiten | Edit Product | Product page → Produkt bearbeiten | Edit; for catalogue products changes are submitted for review ("Stimmt etwas nicht? …"). Changes never alter already logged entries. | — |
| D5.6 | Produkt erstellen / Nur schnell hinzufügen | Create product / Quick add only | Lebensmittel hinzufügen → Erstellen | Two modes: save a reusable product ("Speichern & hinzufügen") or log once without saving ("Schnell hinzufügen"). | — |
| D5.7 | Nährwerte pro 100 g / pro Portion | Nutrition per 100 g / per serving | Erstellen → Nährwerte | Enter values per 100 g or per a named serving (e.g. "Kapsel", from 0,01 g); Intake converts to 100 g. | — |
| D5.8 | Nährstoff hinzufügen / Nährstoffe auswählen | Add nutrient / Select nutrients | Erstellen → Nährstoff hinzufügen | Adds extra nutrients (vitamins, minerals, caffeine…). | — |
| D5.9 | Portionsgrößen / Portionsgröße hinzufügen / Als Standard | Portion sizes / Add portion size / Set default | Erstellen → Portionsgrößen | Named servings with grams and plural; one can be default. | — |
| D5.10 | Barcode / Dieses Produkt hat keinen Barcode | Barcode / This product has no barcode | Erstellen → Barcode | Scan or type; or mark as without barcode. | — |
| D5.11 | Nährwertlabel scannen **[Premium]** | Scan nutrition label | Erstellen → "Nährwertlabel scannen" (Foto / Kamera) | Photo of the label prefills fields and portion. Needs an active Intake AI subscription (not available with own API key); otherwise the Intake AI paywall/choice opens. | — |
| D5.12 | Zur Prüfung einreichen | Submit for review | Erstellen (toggle) or Bibliothek → Meine Produkte → ⋮ | Sends the product to the shared catalogue review; needs name, brand, valid barcode, kcal/fat/carbs/protein per 100 g. "Es fehlt noch:" lists gaps. | — |
| D5.13 | Prüfung ausstehend / Angenommen / Nicht angenommen / Nicht gesendet | Pending / Approved / Not accepted / Not sent | Bibliothek → Einreichungen | Status list; pull down to refresh; finished reviews with reason. Rejected: your version stays private. | — |

## 6. Intake AI (photo/text logging), paywall, own API key

| ID | DE label | EN label | Path | What it does | iOS difference |
|---|---|---|---|---|---|
| D6.1 | Intake AI (Story beim ersten Öffnen) | Intake AI story | Lebensmittel hinzufügen → Intake AI (first time, no subscription, no key) | 4 story pages ("Spar dir jede Woche Stunden", "KI kostet echtes Geld", …); **[Geste]** tap sides / swipe to move, "Überspringen". Afterwards only the choice step, with "Von vorne beginnen". | — |
| D6.2 | Du hast die Wahl: Intake AI / Dein eigener API-Schlüssel / Ohne KI fortfahren | Your choice: Intake AI / Your own API key / Continue without AI | Story → choice step (also Einstellungen → Intake AI) | Subscription, BYOK, or no AI ("Kein Nachteil – du kannst das jederzeit in den Einstellungen ändern."). | — |
| D6.3 | Paywall: Schneller loggen, 3 Tage kostenlos testen, Jahresabo / Monatsabo, Käufe wiederherstellen **[Premium]** | Food logging, upgraded; Try 3 days free; Yearly / Monthly subscription; Restore purchases | Choice → Intake AI | Google Play subscription (intake_ai_yearly / intake_ai_monthly) with free trial where eligible; carousel auto-advances; links to terms/privacy. | Monthly "Flexibel" badge is "Android-only addition, not on iOS yet". |
| D6.4 | Beschreibe, was du gegessen hast | Describe what you ate | Intake AI chat → text field | Text estimate of a meal, snack or food. | — |
| D6.5 | Foto / Kamera | Photo / Camera | Intake AI chat → composer | Estimate from a gallery photo or new camera photo (plates and packaged foods). | — |
| D6.6 | Diktieren | Dictate | Intake AI chat → mic | Voice input (needs microphone permission). | — |
| D6.7 | Ergebnis-Karte: Hohe/Mittlere/Niedrige Sicherheit, Zutaten, Gemessene Menge | Result card: confidence, ingredients, measured amount | Intake AI chat → answer | Shows kcal/macros, ingredients and confidence; "Schätzung"/"Produkt" badge. | — |
| D6.8 | Weniger / Mehr | Smaller / Larger | Result card → portion stepper | Scales the whole meal before logging. | — |
| D6.9 | Korrigieren | Correct | Result card → Korrigieren | Sheet to edit ingredients, amounts, kcal, "Zutat hinzufügen"; or just reply in chat ("Korrigiere das Ergebnis"). | — |
| D6.10 | Eine Mahlzeit / Zutaten → Mahlzeit loggen / Zutaten loggen | One meal / Ingredients → Log meal / Log ingredients | Result card | Log as one entry or each ingredient separately. The photo becomes the entry photo. | — |
| D6.11 | **(2.8.0)** Neue Mahlzeitenkarte: Eine Mahlzeit / Einzeln ({n}), Mahlzeit ändern, {n} Einträge loggen | New meal card | Intake AI chat → result | Macro bars, dishes grouped into tiles, meal picker. | — |
| D6.12 | Bild teilen (Schätzung) | Share picture (estimate) | Result card → share | Story sticker of the estimate on the food photo. | — |
| D6.13 | Fehler-Blasen: "{Anbieter} ist gerade überlastet", "{Anbieter} hat deinen API-Schlüssel abgelehnt", "{Modell} versuchen" | Error bubbles | Intake AI chat (mainly BYOK) | Explains provider errors; retry; for Gemini offers switching model. | — |
| D6.14 | KI-Ergebnisse sind Schätzungen… | AI results are estimates… | Intake AI chat | Disclaimer. | — |
| D6.15 | Einstellungen → Intake AI: Abo (Aktiv / Nicht aktiv) | Settings → Intake AI: Subscription | Einstellungen → Einstellungen-Bereich → Intake AI | Status, Play subscription management. | — |
| D6.16 | Eigenen API-Schlüssel nutzen: Anbieter, Modell, API-Schlüssel, API-Schlüssel speichern **[AI]** | Bring your own API key: Provider, Model, API key, Save API key | Einstellungen → Intake AI | OpenAI (default gpt-5.2), Claude (claude-sonnet-4-5), Gemini (gemini-3.5-flash); key used only for your own provider. Chat opens as soon as BYOK is chosen; a missing key is reported on send. "Was ist ein API-Schlüssel?" links to getintake.de/hilfe/eigener-api-schluessel (EN: /en/help/own-api-key). | — |

## 7. Bibliothek, recipes, routines, recipe/meal files

| ID | DE label | EN label | Path | What it does | iOS difference |
|---|---|---|---|---|---|
| D7.1 | Bibliothek durchsuchen | Search your library | Bibliothek → search | Searches all sections; hits are named per section. | — |
| D7.2 | Favoriten / Meine Produkte (⋮ Weitere Aktionen) | Favourites / My products (More actions) | Bibliothek → section → row ⋮ | Tags bearbeiten, Aus Favoriten entfernen, Zur Prüfung einreichen, Löschen (with confirmation). Tapping a My-products row opens it for editing. "+" creates a product. | — |
| D7.3 | Tags / Neuer Tag / Alle | Tags / New tag / All | Bibliothek → ⋮ → Tags bearbeiten; tag chips | Own tags on foods; chips filter here and in add-food lists. | — |
| D7.4 | Sortierung: Standard / Hinzugefügt am / A–Z / Am häufigsten geloggt | Sort | Bibliothek → section → sort | Sorts the list. | — |
| D7.5 | Routinen: Rezept bearbeiten / Aus Routinen entfernen | Routines: Edit recipe / Remove from routines | Bibliothek → Routinen → ⋮ | Removing keeps the recipe, only the fixed meal is cleared. | — |
| D7.6 | Rezepte (Liste) / Rezepte sortieren / Kategorien-Filter | Recipes / Sort recipes / category chips | Bibliothek → Rezepte | Sort by Name / Zuletzt bearbeitet / Kalorien; filter by category ("Alle Rezepte"). | — |
| D7.7 | Rezept: Duplizieren / Entfernen | Recipe: Duplicate / Delete | **[Geste]** Bibliothek → Rezepte → long-press a recipe card | Context menu to duplicate or delete. | — |
| D7.8 | Rezept erstellen / bearbeiten | Create / Edit Recipe | Rezepte → + / recipe → Bearbeiten | Name, photo, Zutaten, Portionen, Gewicht pro Portion or "Fertiggewicht (gesamt)", Notizen / Anleitung, Kategorien, "Rezept als Getränk markieren". Leaving asks "Rezept verwerfen?". | 2.7.3 weight rule "same rules as iOS". |
| D7.9 | Routine-Mahlzeit / Loggen als (Einzelne Zutaten / Ein Eintrag) | Routine meal / Log as | Rezept bearbeiten → Routine | Makes the recipe a routine for a meal and sets its default log mode. | — |
| D7.10 | Kategorien bearbeiten / Kategorie hinzufügen | Edit Categories / Add Category | Rezepte → ⋮ → Kategorien bearbeiten | Own categories with colours; deleting removes it from recipes. | — |
| D7.11 | Rezept vorbereiten | Prepare Recipe | Add food → Rezepte → recipe | Adjust ingredients for this log only; log "Als Gericht" or "Zutaten" ("Loggt {n} Zutaten einzeln"). | — |
| D7.12 | Teilen (Rezept) | Share (recipe) | Rezept → share | Sends a `.intakerecipe` file (incl. photo). | Format shared with iOS. |
| D7.13 | Rezept importieren | Import Recipe | Rezepte → ⋮ → Rezept importieren, or open a `.intakerecipe` file | Imports a recipe; only `.intakerecipe` files. | — |

## 8. Fasten

| ID | DE label | EN label | Path | What it does | iOS difference |
|---|---|---|---|---|---|
| D8.1 | Fasten aktivieren | Enable fasting | Einstellungen → Fasten | Turns fasting on; the Fasten tab appears. | — |
| D8.2 | Erste Mahlzeit / Letzte Mahlzeit | First meal time / Last meal time | Einstellungen → Fasten | Defines the daily eating window (Tagesplan). | — |
| D8.3 | Fasten / Essensfenster, Verbleibende Fastenzeit | Fasting / Eating, Fasting remaining | Fasten tab | Current state with countdown, "Aktuelles Fenster", "Nächster Wechsel", "Tagesplan". | — |
| D8.4 | Fasten starten / Fasten beenden | Start fasting / End fasting | Fasten tab | Manual override of the schedule. | — |
| D8.5 | Zurück zum Plan | Back to schedule | Fasten tab (while overridden) | Ends the manual override. | — |
| D8.6 | Live-Update-Benachrichtigung | Live update notification | Einstellungen → Fasten | Ongoing notification with fasting progress ("Fasten läuft – Essensfenster beginnt um {Zeit}"); tap opens the Fasten tab; survives reboot. | Android-specific (hint: "Android zeigt den Fastenfortschritt über eine laufende Live-Update-Benachrichtigung"). |
| D8.7 | Fasten ist deaktiviert / Einstellungen öffnen | Fasting is off / Open settings | Fasten tab while off | Hint with a link to the setting. | — |

## 9. Bild teilen (share cards)

| ID | DE label | EN label | Path | What it does | iOS difference |
|---|---|---|---|---|---|
| D9.1 | Bild teilen (Galerie): Tag / Mahlzeiten / Lebensmittel / Körper | Share a picture: Day / Meals / Foods / Body | Heute → share icon | Pick what to share: whole day, a meal, a food, or a weight/measurement trend. | — |
| D9.2 | Sticker / Karte | Sticker / Card | Share sheet | Transparent sticker for stories or a finished card. | Templates and layout shared with iOS. |
| D9.3 | Story 9:16 / Beitrag 4:5 | Story / Post | Share sheet | Picture size. | — |
| D9.4 | Dein Foto (+) | Your photo | Share sheet → sticker | Sticker on your photo; without one, on a plain background. | — |
| D9.5 | Zeitraum / Messung | Period / Measurement | Share sheet → Körper | letzte Woche / letzter Monat / letzte 3 Monate / letztes Jahr; which measurement. | — |
| D9.6 | In Instagram Story teilen / In Fotos sichern / Teilen | Share to Instagram Story / Save to Photos / Share | Share sheet → actions | Export targets. | — |

## 10. Statistik

| ID | DE label | EN label | Path | What it does | iOS difference |
|---|---|---|---|---|---|
| D10.1 | Statistik (Karten) | Statistics (cards) | Statistik tab | Overview cards: Kalorien, Makros, Gewicht, Wasser, Körpermaße (+ optional nutrient cards); tap opens the detail. | — |
| D10.2 | Sichtbare Karten / Bearbeiten | Visible cards / Edit | Statistik → pencil | Add/remove cards (incl. every nutrient, grouped), **[Geste]** long-press + drag (or drag handle) to reorder. "Standardstatistiken". | — |
| D10.3 | Woche / Monat / Jahr (+ Alle beim Gewicht) | Week / Month / Year (+ All for weight) | Statistik → card detail | Range switch with paging; weight detail also has "Alle" (every stored weight). | — |
| D10.4 | Kalorienaufnahme: Ø / Tag, Ø Ziel, Ø vs Ziel, Tage erfasst, Verzehrt / Basisziel / Verbrannt / Übrig | Calorie detail tiles | Statistik → Kalorien | Averages based on logged days ("Basierend auf {x}/{y} protokollierten Tagen"); "{kcal} kcal ins Ziel eingerechnet". | Burn note "same rule as iOS 2.7.4". |
| D10.5 | Makronährstoffe | Macronutrients | Statistik → Makros | Trend chart; tap a macro card to show/hide it in the chart. | — |
| D10.6 | Gewichtsverlauf: Start / Aktuell / Änderung / Tiefstwert / Höchstwert | Weight Trend tiles | Statistik → Gewicht | Weight statistics for the range. | — |
| D10.7 | **(2.8.0)** Ø 7 Tage | 7-day avg | Statistik → Gewicht | 7-day average line and tile, can be shown/hidden. | — |
| D10.8 | Wasseraufnahme: Gesamt / Ø Wasser / Ziel erreicht / Maximum | Water Intake tiles | Statistik → Wasser | Water statistics. | — |
| D10.9 | Diagrammwert antippen | Tap a chart value | **[Geste]** Statistik → detail → tap a bar/point | Popover with the value. | — |
| D10.10 | Körpermaße: Reihenfolge bearbeiten / Maß hinzufügen / Maß löschen? | Measurements: Edit order / Add Measurement / Delete Measurement? | Statistik → Körpermaße | Reorder types (drag), add with +; **[Geste]** long-press a bar to delete (only manual entries, not in Year view). | — |
| D10.11 | Bild teilen | Share picture | Statistik → detail → share | Share-picture sheet for the trend. | — |

## 11. Widgets

| ID | DE label | EN label | Path | What it does | iOS difference |
|---|---|---|---|---|---|
| D11.1 | Kalorien übrig | Calories Left | Home screen → widgets → Intake | Calories left plus macro progress. | — |
| D11.2 | Kalorien gegessen | Calories Eaten | Home screen widget | Eaten calories. | — |
| D11.3 | Mahlzeit schnell erfassen | Quick Log Meal | Home screen widget | Meal buttons open food search for that meal. **(2.8.0)** fixed: works from a cold start too. | — |
| D11.4 | Wasser schnell erfassen | Water Quick Log | Home screen widget | Large + / − for water without opening the app. | — |
| D11.5 | Widgets (Anleitung) | Widgets (guide) | Einstellungen → Widgets | How to add/resize widgets ("Home-Bildschirm gedrückt halten, Widgets tippen, …"). | Apple Watch complications/app are iOS-only (strings exist, unused on Android). 2.8.0 iPhone widget (Feature 7) not on Android. |

## 12. Reminders and notifications

| ID | DE label | EN label | Path | What it does | iOS difference |
|---|---|---|---|---|---|
| D12.1 | Benachrichtigungen → Berechtigung / Systemeinstellungen öffnen | Notifications → Permission / Open system settings | Einstellungen → Benachrichtigungen | Shows whether notifications are allowed; link to system settings if blocked. | — |
| D12.2 | Trinkerinnerungen: Aus / Benutzerdefiniert / Smart | Water reminders: Off / Custom / Smart | Einstellungen → Benachrichtigungen | Custom: "Intervall (Minuten)" / "Erinnerungen pro Tag" between "Aufwachzeit" and "Schlafenszeit". Smart: only when you are behind your water pace (min. 200 ml, max. every 90 min). | — |
| D12.3 | Mahlzeitenerinnerungen aktivieren / Uhrzeit wählen | Enable meal reminders / Pick time | Einstellungen → Benachrichtigungen | Reminder per meal ("Frühstück protokollieren"), own time per custom meal. | — |

## 13. Onboarding, feature tour, release notes

| ID | DE label | EN label | Path | What it does | iOS difference |
|---|---|---|---|---|---|
| D13.1 | Los geht's (Willkommen) | Get Started | First start | Welcome with terms/privacy consent. | — |
| D13.2 | Was ist dein Ziel? Abnehmen / Gewicht halten / Zunehmen | What's your goal? | Onboarding step 2 | Sets the goal. | — |
| D13.3 | Health Connect (installieren, Berechtigungen, Vorbefüllen) | Health Connect | Onboarding step 3 | Connect HC to prefill height/weight; manual steps if the permission popup doesn't appear; skip possible. | Health Connect replaces Apple Health. |
| D13.4 | Über dich / Maßeinheiten | About you / Measurement system | Onboarding step 4 | Body data, units, activity level. | — |
| D13.5 | Dein Tagesziel / Tracking starten | Your daily target / Start tracking | Onboarding step 5 | Calculated target (Mifflin-St Jeor); "Mehr Infos" disclaimer. | — |
| D13.6 | Verschlüsseltes Google-Drive-Backup | Encrypted Google Drive Backup | Onboarding step 6 | Optional automatic backup with passphrase (min. 8 characters). | Replaces the iOS iCloud step. |
| D13.7 | Neu / Fehlerbehebungen (Notelet) | New / Bug fixes | Shown automatically once after an app update | Paged sheet of the version's changes ("Seite {x} von {y}"). Not shown on fresh installs, not when the app was opened from a widget or notification (waits for the next normal start). | Fresh-install rule mirrors iOS. |
| D13.8 | Feature-Tour | Feature Tour | Einstellungen → Daten → Feature-Tour | Reopens the current notelet. | — |
| D13.9 | Was ist neu? | What's New | Einstellungen → link (fallback, when shown) | Opens the what's-new web page in an in-app browser. | — |
| D13.10 | 2.7.5 notelet: Aus Häufig und Verlauf entfernen; Hilfreichere Support-Mails; Schritte außerhalb von Trainings zählen | 2.7.5 notelet items | Notelet | Current release notes content (VERSION 2.7.5). | — |
| D13.11 | **(2.8.0)** notelet: Wochenbudget, Übersicht beim Hinzufügen, Neue Intake-AI-Karte, kcal pro 100 g; Außerdem: 7-Tage-Durchschnitt, Monatskalender, Zum Aktualisieren ziehen, Zahlen/Daten/Uhrzeiten, Widget öffnet die Mahlzeit | 2.8.0 notelet items | Notelet | 2.8.0 content. | — |
| D13.12 | Bewertungsanfrage | Review prompt | Automatic | Play review dialog once, after food was logged on 3 different days. | Mirrors iOS rule. |

---

### Notes for writers

- Best help topics (gestures/hidden): ring tap toggle, macro tap contribution, collapse by tapping the meal kcal, meal title → overview (copy/share/delete/create recipe), swipe between days (setting), long-press/swipe to remove from Häufig/Verlauf, long-press recipe card, long-press drag in Edit-Today and Stats editors, tap weight to type, long-press a measurement bar to delete, tap per-unit hint to fix a unit weight.
- Premium: nutrition-label scan needs the subscription even with own API key; Meal Scan/chat work with subscription or BYOK.
- The Today "Ziel" row behaves differently in 2.7.5 (opens Settings) and 2.8.0 (sheet on Today); write both or wait for 2.8.0.
- Unused label keys present in strings (do not document): `activity.workoutHint`, `today.mealSummary`, `stats.macroChartToggleHint` (the behaviour exists, the hint text is not shown), `food.orEnterBarcode`, `intakeAI.privacyConsent`, `settings.resetOnboardingOnly` (no reset-onboarding row on Android).


# Help center inventory, part B: Settings and Health Connect (Android)

Source: `intake-android`, branch `fix/2.7.4-bugs` (app 2.7.5, vc113). Items that exist only on `release/2.8.0` are marked **(2.8.0)**.
Labels are the exact strings from `core/ui/src/main/res/values-de/strings_ios.xml` (DE) and `values/strings_ios.xml` (EN), resolved through `IosStrings.kt`. `{{x}}` is a placeholder.
Path notation: "Einstellungen" is opened from the gear button in the Today header (Settings is a pushed screen, not a tab).
"iOS difference" is filled only where code comments, PORT_PLAN.md, docs/ or the strings themselves say so; otherwise "—".

Key source files: `feature/settings/.../SettingsScreen.kt` (main list and most sub-pages), `NotificationSettingsPage.kt`, `FastingSettingsPage.kt`, `WidgetsSettingsPage.kt`, `IntakeAISettingsPage.kt`, `SettingsBusinessLogic.kt`, `core/data/.../health/**`, `core/data/.../backup/**`, `app/.../backup/**`, `app/src/main/AndroidManifest.xml`.

---

## 1. Settings main screen (structure, banners, footer)

Order on screen: (banner) → Profil & Ziele → Einstellungen (Intake AI, Benachrichtigungen, Fasten, Widgets, Darstellung) → Region & Einheiten → Integrationen (Health Connect) → Google-Drive-Backup card → Daten → Feature-Tour → Rechtliches & Support → version line.

| ID | DE label | EN label | Path | What it does | iOS difference |
|---|---|---|---|---|---|
| D14.1 | Einstellungen | Settings | Heute → Zahnrad | Opens Settings; back arrow returns to Today. | — |
| D14.2 | Neu in dieser Version (Banner) | What's New (banner) | Einstellungen (top, once per version) | Card linking to the "what's new" web page for this version in an in-app browser; dismissible per version. | — |
| D14.3 | Produktnotiz / Neu in {version} (Nährstoff-Hinweis) | Product Note / Whats New in {version} | Einstellungen (top, once) | One-time notice about extended nutrients; its button renews Health Connect permissions so the new nutrients can be written. | — |
| D14.4 | Was ist neu? | What's New | Einstellungen → Rechtliches & Support | Fallback link to the what's-new page after the banner was dismissed. | — |
| D14.5 | Version x (Build) | Version x (Build) | Einstellungen (bottom) | Shows versionName and build number. | — |

## 2. Profile & Goals ("Profil & Ziele")

### 2.1 Body data ("Körperdaten")

| ID | DE label | EN label | Path | What it does | iOS difference |
|---|---|---|---|---|---|
| D15.1 | Körperdaten | Body Data | Einstellungen → Profil & Ziele → Körperdaten | Row shows weight • height • age; opens the body editor (saved with "Fertig"). | — |
| D15.2 | Männlich / Weiblich | Male / Female | … → Körperdaten | Sex, used for BMR/TDEE. | — |
| D15.3 | Geburtstag | Birthday | … → Körperdaten | Date picker; hint "Das Alter wird automatisch aus deinem Geburtstag abgeleitet." / "Age is derived from your birthday automatically." | — |
| D15.4 | Größe / Größe (ft) / Größe (in) | Height / Height (ft) / Height (in) | … → Körperdaten | Height in cm, or feet + inches in imperial. | — |
| D15.5 | Gewicht / Gewicht (lb) | Weight / Weight (lb) | … → Körperdaten | Current profile weight (kg or lb). | — |
| D15.6 | Startgewicht (+ Zurücksetzen) | Starting weight (+ Reset) | … → Körperdaten → Startgewicht | Picks the day the Today weight card's "Gesamt"/"Total" counts from (between first stored weight and today); "Zurücksetzen" returns to the first weight. Empty state "Noch kein Gewicht erfasst" / "No weight logged yet". | Comment: same rule "as on iOS" (feature-voting 2dddba3c). |

### 2.2 Calories ("Kalorien")

| ID | DE label | EN label | Path | What it does | iOS difference |
|---|---|---|---|---|---|
| D16.1 | Kalorien | Calories | Einstellungen → Profil & Ziele → Kalorien | Row shows the resulting daily target in kcal; opens the calorie editor. | — |
| D16.2 | Erhaltungskalorien: Automatisch berechnen / Eigener TDEE | Maintenance calories: Auto estimate / Custom TDEE | … → Kalorien | Auto = BMR × activity factor from body data; Custom = type your own maintenance calories ("Verwende deine eigenen Erhaltungskalorien vor jeder Anpassung…"). | — |
| D16.3 | Aktivitätslevel: Wenig aktiv / Leicht aktiv / Moderat aktiv / Aktiv / Sehr aktiv | Activity level: Sedentary / Lightly active / Moderately active / Active / Very active | … → Kalorien (only with Auto) | Activity multiplier 1.2 / 1.375 / 1.55 / 1.725 / 1.9 (descriptions state the factor). | — |
| D16.4 | Ziel: Abnehmen / Halten / Zunehmen | Goal: Lose / Maintain / Gain | … → Kalorien | Sets the goal and resets the daily adjustment to that goal's default. | — |
| D16.5 | Tägliche Anpassung: {{value}} kcal | Daily adjustment: {{value}} kcal | … → Kalorien (slider) | Deficit/surplus on top of maintenance, −1000 … +1000 kcal. | — |
| D16.6 | Erhaltungskalorien / Tagesziel (Vorschau) | Maintenance calories / Daily target (preview) | … → Kalorien | Live preview of maintenance and resulting target before saving. | — |
| D16.7 | Erweitert → Fixes Tagesziel (+ Tagesziel) | Advanced → Fixed daily target (+ Daily target) | … → Kalorien → Erweitert | Switch + number: a fixed daily kcal target that overrides calculation and slider. | — |
| D16.8 | Wochenbudget **(2.8.0)** | Weekly budget **(2.8.0)** | … → Kalorien | Opt-in switch: Mon–Sun is the budget; what you save/eat extra on one day is balanced over the rest of the week; no day below BMR (min. 1,200 kcal). Turning it on while weekday rules exist asks "Wochenbudget einschalten?" / "Turn on the weekly budget?" ("Deine Wochentagsregeln gelten dann wieder: …", button "Einschalten"/"Turn on"). | Rounding, floor, snapshot rules "agreed with iOS" (plan 2026-10-23-280-weekly-budget.md). |
| D16.9 | Automatisch verteilen / Manuell **(2.8.0)** | Spread automatically / Manual **(2.8.0)** | … → Kalorien → Wochenbudget | Automatic: balance spread evenly over today…Sunday; Manual: goals stay as planned, balance only moves via "Aus dem Wochensaldo übertragen". | Agreed with iOS (same plan). |
| D16.10 | Tagesabhängige Ziele (link) **(2.8.0)** | Day-based targets (link) **(2.8.0)** | … → Kalorien → Tagesabhängige Ziele | In 2.8.0 the day-based targets page is linked from the Calories page (in 2.7.5 it is only reachable from Today). | — |

### 2.3 Day-based targets ("Tagesabhängige Ziele")

In 2.7.5 this page is opened by tapping the **Ziel / Target** row of the calorie card on Today (route `SettingsDayBasedTargetsRoute`); there is no row for it in the Settings list.

| ID | DE label | EN label | Path | What it does | iOS difference |
|---|---|---|---|---|---|
| D17.1 | Tagesabhängige Ziele | Day-based targets | Heute → Kalorienkarte → Ziel | Page for weekday rules and one-time kcal deltas on top of the calculated target; the Ziel row shows a ± badge when today has a delta. | PORT_PLAN P3 lists it as iOS-parity editor. |
| D17.2 | Tagesabhängige Kalorienziele aktivieren | Enable day-based calorie targets | … → Tagesabhängige Ziele | Master switch; editing a rule to non-zero switches it on automatically. In 2.8.0 disabled while the weekly budget is on. | — |
| D17.3 | Wöchentliche Regeln (Mo–So, −/+) | Weekly rules (Mon–Sun, −/+) | … → Tagesabhängige Ziele | Per weekday ±50 kcal steps (recurring). **(2.8.0)** each rule also shows its source "zusätzlich" / "von den anderen Tagen" ("on top" / "from the other days"). | — |
| D17.4 | Schnelle Anpassung hinzufügen: Datum, Anpassung, Anwenden als Einmalig / Wöchentliche Regel, Anpassung anwenden | Add quick adjustment: Date, Adjustment, Apply as One-time / Weekly rule, Apply adjustment | … → Tagesabhängige Ziele | Adds a kcal delta for one date or for that date's weekday. Removed from this page in 2.8.0 (moved to the Today sheet). | — |
| D17.5 | Einmalige Anpassungen (+ Löschen) | One-time adjustments (+ Delete) | … → Tagesabhängige Ziele | Lists date deltas; delete individually. Empty: "Keine einmaligen Anpassungen". Removed in 2.8.0. | — |
| D17.6 | Tagesziel anpassen **(2.8.0)** | Adjust day target **(2.8.0)** | Heute → Kalorienkarte → Ziel | Bottom sheet replaces the jump to Settings: ±50 kcal stepper ("{{amount}} kcal mehr/weniger"), scope "Nur {{date}}" / "Jeden {{weekday}}" ("Only …"/"Every …"). | Agreed with iOS. |
| D17.7 | Woher kommen die Kalorien? Zusätzlich / Von den anderen Tagen / Aus dem Wochensaldo **(2.8.0)** | Where do the calories come from? On top / From the other days / From the weekly balance **(2.8.0)** | … → Tagesziel anpassen | On top changes the week total; Other days takes it evenly from the remaining open days; Weekly balance (manual mode, balance > 0) moves saved calories onto one date. Caps: "Begrenzt: kein Tag unter {{floor}} kcal", "Begrenzt auf ±1.000 kcal pro Tag…". | Agreed with iOS. |
| D17.8 | Woche: +{{kcal}} übrig / {{kcal}} zu viel **(2.8.0)** | Week: +{{kcal}} left / {{kcal}} over **(2.8.0)** | Heute → Kalorienkarte (4th row when budget on) | Weekly balance row; tap opens the weekly overview. | — |
| D17.9 | Wochenübersicht: Nichts gegessen / Markierung entfernen, läuft noch, nichts eingetragen, Aus dem Wochensaldo übertragen, Wochenbudget-Einstellungen **(2.8.0)** | Weekly overview: Ate nothing / Remove mark, in progress, nothing logged, Move from weekly balance, Weekly budget settings **(2.8.0)** | Heute → Woche-Zeile | Per-day list Mon–Sun; empty past days are neutral unless marked "Nichts gegessen" (counts as 0 eaten); line "auf {{days}} verteilt: {{kcal}} pro Tag". | — |

### 2.4 Macro goals ("Makro-Ziele")

| ID | DE label | EN label | Path | What it does | iOS difference |
|---|---|---|---|---|---|
| D18.1 | Makro-Ziele | Macro goals | Einstellungen → Profil & Ziele → Makro-Ziele | Row shows "x g/kg, <style>" or "Manuelle Grammwerte"/"Manual grams". | — |
| D18.2 | Proteinziel (g/kg) | Protein target (g/kg) | … → Makro-Ziele | Slider for protein per kg body weight; hint "1,6-2,2 g/kg ist ein guter Bereich fürs Training…". | — |
| D18.3 | Kohlenhydrat- und Fettstil: Ausgewogen / Mehr Kohlenhydrate / Etwas weniger Kohlenhydrate / Low Carb / Keto / Weniger Fett | Carb & fat style: Balanced / More carbs / Slightly lower carb / Low carb / Keto / Lower fat | … → Makro-Ziele | Splits the calories left after protein between carbs and fat. | — |
| D18.4 | Berechnete Ziele | Calculated targets | … → Makro-Ziele | Preview of protein/carbs/fat grams. | — |
| D18.5 | Erweitert → Eigene Makros verwenden (Protein, Kohlenhydrate, Fett) | Advanced → Use custom macro targets | … → Makro-Ziele → Erweitert | Switch + gram fields replacing the calculated macros. | — |
| D18.6 | Eigene erweiterte Ziele verwenden (Ballaststoffe (min), Zucker (max), Gesättigte Fette (max), Salz (max)) | Use custom extended targets (Fiber (min), Sugar (max), Saturated Fat (max), Salt (max)) | … → Makro-Ziele → Erweitert | Overrides the calculated fiber/sugar/sat-fat/salt limits. | — |

### 2.5 Activity & workouts ("Aktivität & Workouts")

| ID | DE label | EN label | Path | What it does | iOS difference |
|---|---|---|---|---|---|
| D19.1 | Aktivität | Activity | Einstellungen → Profil & Ziele → Aktivität | Row shows "<source> · <percent>" or "Deaktiviert". | — |
| D19.2 | Aktivität zum Ziel addieren | Add activity to target | … → Aktivität & Workouts | "Verbrannte Kalorien erhöhen dein Tagesziel" / "Burned calories increase your daily target". | — |
| D19.3 | Kalorienquelle: Gesamte Aktivität / Nur Workouts | Calorie source: All activity / Workouts only | … → Aktivität & Workouts | All activity = Health Connect active calories (or estimate) + manual Intake workouts; Workouts only = Health Connect workout calories + manual workouts. | — |
| D19.4 | Prozentsatz der Aktivitätskalorien (0–100 %) | Percentage of activity calories | … → Aktivität & Workouts | Only this share of burned calories is added to the target. | — |
| D19.5 | So funktioniert es | How this works | … → Aktivität & Workouts | Info card; says Intake estimates active calories from total calories or steps if the app provides none. | — |

## 3. Preferences ("Einstellungen" section)

### 3.1 Intake AI

| ID | DE label | EN label | Path | What it does | iOS difference |
|---|---|---|---|---|---|
| D20.1 | Intake AI | Intake AI | Einstellungen → Einstellungen → Intake AI | Page "Essen per Chat oder Foto loggen" / "Log food with chat or photos"; nutrition-label photos need the subscription. | — |
| D20.2 | Intake-AI-Abo verwenden | Use Intake AI subscription | … → Intake AI | Uses the paid subscription (chat, food photos, nutrition-label scans). | — |
| D20.3 | Abo: Aktiv / Nicht aktiv | Subscription: Active / Not active | … → Intake AI (subscription chosen) | Opens Play subscription management when active, otherwise the paywall. | — |
| D20.4 | Meinen API-Schlüssel verwenden | Use my API key | … → Intake AI | BYOK: own provider for text and meal-photo logging. | — |
| D20.5 | Eigenen API-Schlüssel nutzen: Anbieter (OpenAI / Claude / Gemini), Modell, API-Schlüssel, API-Schlüssel speichern | Bring your own API key: provider, Model, API key, Save API key | … → Intake AI → Meinen API-Schlüssel verwenden | Pick provider (defaults gpt-5.2 / claude-sonnet-4-5 / gemini-3.5-flash), optional model, paste key; status "API-Schlüssel gespeichert" / "Kein API-Schlüssel gespeichert". Key stays on device, used only for your provider; subscription-only features still need Intake AI. | — |
| D20.6 | Was ist ein API-Schlüssel? | What's an API key? | … → Intake AI (BYOK) | Opens the web guide for getting a key. | — |
| D20.7 | Ohne KI fortfahren | Continue without AI | … → Intake AI | Turns AI logging off; app works as before. | — |

### 3.2 Notifications ("Benachrichtigungen")

| ID | DE label | EN label | Path | What it does | iOS difference |
|---|---|---|---|---|---|
| D21.1 | Benachrichtigungen | Notifications | Einstellungen → Einstellungen → Benachrichtigungen | Row shows "Konfiguriert"/"Configured" or "Deaktiviert". | — |
| D21.2 | Berechtigung (erlaubt / nicht erlaubt / blockiert) + Systemeinstellungen öffnen | Permission (allowed / not allowed / blocked) + Open system settings | … → Benachrichtigungen | Shows Android notification permission state and links to system settings. | — |
| D21.3 | Trinkerinnerungen: Aus / Benutzerdefiniert / Smart | Water reminders: Off / Custom / Smart | … → Benachrichtigungen | Mode of water reminders. | — |
| D21.4 | Aufwachzeit / Schlafenszeit | Wake time / Sleep time | … → Trinkerinnerungen | Time window in which water reminders fire. | — |
| D21.5 | Intervall (Minuten) | Interval (minutes) | … → Trinkerinnerungen → Benutzerdefiniert | Fixed reminder interval. | — |
| D21.6 | Smart (Hinweis) | Smart (hint) | … → Trinkerinnerungen → Smart | Adapts to current water intake, skips reminders when ahead of pace. | — |
| D21.7 | Mahlzeitenerinnerungen aktivieren | Enable meal reminders | … → Mahlzeitenerinnerungen | Per-meal reminder times for breakfast/lunch/dinner/snacks plus each custom meal (time picker "Uhrzeit wählen"). | — |

### 3.3 Fasting ("Fasten")

| ID | DE label | EN label | Path | What it does | iOS difference |
|---|---|---|---|---|---|
| D22.1 | Fasten (An/Aus) | Fasting (On/Off) | Einstellungen → Einstellungen → Fasten | Opens fasting settings. | — |
| D22.2 | Fasten aktivieren | Enable fasting | … → Fasten | Turns the fasting feature on; turning off also disables live updates. | — |
| D22.3 | Live-Update-Benachrichtigung | Live update notification | … → Fasten | Ongoing notification with fasting progress. | String itself is Android-specific ("Android zeigt den Fastenfortschritt über eine laufende Live-Update-Benachrichtigung"). |
| D22.4 | Erste Mahlzeit / Letzte Mahlzeit | First meal time / Last meal time | … → Fasten | Eating window that defines the fast. | — |

### 3.4 Widgets

| ID | DE label | EN label | Path | What it does | iOS difference |
|---|---|---|---|---|---|
| D23.1 | Widgets | Widgets | Einstellungen → Einstellungen → Widgets | Info page: available widgets and how to add/resize them. | PORT_PLAN: "Widgets sheet (keep Android-specific instructions)". iOS also has an Apple Watch page (strings exist, unused on Android). |
| D23.2 | Kalorien übrig / Kalorien gegessen / Mahlzeit schnell erfassen / Wasser schnell erfassen | Calories Left / Calories Eaten / Quick Log Meal / Water Quick Log | … → Widgets → Verfügbare Widgets | Lists the four home-screen widgets. | — |
| D23.3 | Zum Home-Bildschirm hinzufügen / Größe anpassen | Add to Home Screen / Resize or customize | … → Widgets | Step-by-step instructions. | — |

### 3.5 Appearance ("Darstellung")

| ID | DE label | EN label | Path | What it does | iOS difference |
|---|---|---|---|---|---|
| D24.1 | Design: System / Hell / Dunkel | Theme: System / Light / Dark | Einstellungen → Einstellungen → Darstellung → Design | App theme. | — |
| D24.2 | Zwischen Tagen wischen | Swipe between days | … → Darstellung → Interaktionen | Swipe left/right on Today to change day. | — |
| D24.3 | Kalorien-Statusfarben | Calorie status colors | … → Darstellung → Interaktionen | Green/yellow/red calorie rings based on the daily target. | — |
| D24.4 | Tagesstreifen-Indikatoren | Day strip indicators | … → Darstellung → Interaktionen | Small status line under days with logged food in the week strip. | — |
| D24.5 | Fotos verwenden | Use photos | … → Darstellung → Fotos | Master switch for food photos; switched-off photos stay stored. | Rows use the iOS string ids (comment). |
| D24.6 | Fotos auf Heute zeigen | Show photos on Today | … → Darstellung → Fotos | Photo thumbnails on Today. | — |
| D24.7 | Fotos bei einzelnen Zutaten | Photos on single ingredients | … → Darstellung → Fotos | Ingredients logged one by one from an Intake AI estimate show the whole-meal photo. | — |
| D24.8 | Akzentfarbe (Koralle, Türkis, Indigo, Violett, Bernstein) + Mehr Farben | Accent Color (Coral, Teal, Indigo, Violet, Amber) + More Colors | … → Darstellung → Akzentfarbe | Accent color; "Mehr Farben" sheet adds Grau, Grün, Braun, Rot, Orange, Blau, Mint, Pink, Cyan, Limette. | — |
| D24.9 | App-Symbol: Standard / Korallenverlauf / Korallenverlauf Weiß / Dunkel / S/W Dunkel / S/W Hell | App Icon: Default / Coral Gradient / Coral Gradient White / Dark / BW Dark / BW Light | … → Darstellung → App-Symbol | Switches launcher icon via activity aliases (`AppIconManager`, `alternate-icons/`). | — |

## 4. Region & Units ("Region & Einheiten")

| ID | DE label | EN label | Path | What it does | iOS difference |
|---|---|---|---|---|---|
| D25.1 | Sprache | Language | Einstellungen → Region & Einheiten → Sprache | In-app language: English, Deutsch, Español, Français, Português, Italiano, Nederlands, 日本語. | — |
| D25.2 | Maßeinheiten: Metrisch / Imperial | Measurements: Metric / Imperial | Einstellungen → Region & Einheiten → Maßeinheiten | Dialog; switches kg/cm vs lb/ft-in. | — |
| D25.3 | Lebensmittel-Datenbank Land → Standardregion | Food database country → Default region | Einstellungen → Region & Einheiten → Lebensmittel-Datenbank Land | Main country for food search/barcodes (30 options). | — |
| D25.4 | Ich kaufe auch ein in | I also shop in | … → Lebensmittel-Datenbank Land | Extra regions whose products rank higher in search. | — |

## 5. Integrations: Health Connect ("Integrationen")

| ID | DE label | EN label | Path | What it does | iOS difference |
|---|---|---|---|---|---|
| D26.1 | Health Connect verwenden | Use Health Connect | Einstellungen → Integrationen | Master switch for reading and writing Health Connect data; subtitle "Verbunden"/"Deaktiviert". | iOS uses Apple Health (string key is `settings.useAppleHealth`); PORT_PLAN: "Health Connect sections -> Health Connect wording/controls". |
| D26.2 | Health-Connect-Berechtigungen erneuern | Renew Health Connect permissions | Einstellungen → Integrationen | Turns HC on and opens the HC permission dialog (or HC settings if the dialog cannot show). Hint text explains it is needed for the new nutrient writes. | — |
| D26.3 | Sync-Status (Bereit zur Synchronisierung / Synchronisiere… / Synchronisierung erfolgreich / Bereits aktuell / fehlgeschlagen / deaktiviert) | Sync status (Ready to sync / Syncing… / Sync successful / Already up to date / Sync failed / Health sync is disabled) | Einstellungen → Integrationen | Two status lines: weight sync and activity sync. | — |
| D26.4 | Health-Connect-Aktivität | Health Connect activity | Einstellungen → Integrationen → Health-Connect-Aktivität | Row shows the chosen "only this app" source or "Noch keine Quelle"; opens the check page (section 6). | — |
| D26.5 | Jetzt synchronisieren | Sync now | Einstellungen → Integrationen | Manual sync (bypasses the passive throttle); disabled while syncing or HC off. | — |
| D26.6 | Health Connect permission prompt on start | — (system dialog) | App start | Asked once per permission schema version when a required permission or background read is missing; declining is respected. | — |
| D26.7 | Datenschutz-Begründung (HC "Warum braucht Intake das?") | — | Health Connect → App-Berechtigungen → Intake → privacy link | `HealthPermissionsRationaleActivity` just opens the app (manifest action `ACTION_SHOW_PERMISSIONS_RATIONALE`). | — |
| D26.8 | Pull to refresh syncs Health Connect **(2.8.0)** | — | Heute (pull down) | 2.8.0 adds a pull-to-refresh that also triggers a Health Connect sync (`RoomAppStoreHealthPullRefreshTest`, plan 2026-10-23-280-pull-to-refresh). | — |

## 6. Health Connect activity check page ("Health-Connect-Aktivität")

| ID | DE label | EN label | Path | What it does | iOS difference |
|---|---|---|---|---|---|
| D27.1 | Health-Connect-Aktivitätsquellen | Health Connect activity sources | Einstellungen → Integrationen → Health-Connect-Aktivität | Today's check rows: Kalorien, Schritte, Trainings, Gewicht ("Calories, Steps, Workouts, Weight") with OK/warning icon, "von {{apps}}" / "from {{apps}}", last data time, or "Keine Daten heute" / "No data today". | Android only (HC overhaul spec, "Android only"). |
| D27.2 | Problemzeile → Diagnose-Sheet | Problem line → diagnosis sheet | … → Aktivitätsquellen (red line, tap) | Sheet with what's wrong, a category chip (Intake / Einstellungen / Health Connect / Fitness-App) and one action. Messages: "Health Connect muss aktualisiert werden", "Health Connect ist nicht verfügbar", "Intake fehlt eine Berechtigung", "Health Connect ist ausgelastet", "Intake konnte nicht synchronisieren", "{{app}} teilt keine Kalorien", "{{app}} hat zuletzt um {{time}} synchronisiert". Actions: "Erlauben", "Aktualisieren", "{{app}} öffnen", "In Health Connect öffnen", "Bericht senden". | — |
| D27.3 | Schätzungshinweis + Mehr dazu | Estimate note + Learn more | … → Kalorien row (and Today activity card) | Note "Aus Gesamtkalorien geschätzt", "Aus Schritten geschätzt", "Trainings plus Schätzung aus Schritten", "Grundumsatz von Intake berechnet", "Keine Kalorien von {{app}}"; sheet explains "Was passiert / So geht Intake damit um / Musst du etwas tun?". | — |
| D27.4 | Training ohne Kalorien | Workout without calories | Heute → Aktivität (workout row) | "{{app}} liefert für dieses Training keine Kalorien" / "{{app}} gives no calories for this workout" instead of a guess. | — |
| D27.5 | Nur diese App verwenden | Use only this app | … → Health-Connect-Aktivität → Nur diese App verwenden | Radio list: count activity from one app only (every app HC reported today, plus the current choice). | Replaces the former "Bevorzugt/Preferred" source (spec decision 2). |
| D27.6 | Reihenfolge in Health Connect | Order in Health Connect | … → Nur diese App verwenden | Default: no override; Health Connect's own app priority ("App-Quellen" / "Datenquellen und Priorität") decides and de-duplicates. | — |
| D27.7 | Diagnose: Status + Zuletzt synchronisiert | Diagnostics: status + Last synced | … → Diagnose | Current activity sync status and last successful sync time. | — |
| D27.8 | Problem mit dem Health-Connect-Anbieter (3 Schritte) + Synchronisierung zurücksetzen | Health Connect provider issue (3 steps) + Reset sync | … → Diagnose (only in that state) | Steps: restart device, update HC from Play Store, data stays visible and sync resumes; reset clears Intake's sync bookkeeping and syncs again. Never advises clearing HC storage. | — |
| D27.9 | Eingeschränkter Sync-Modus aktiv… + Synchronisierung zurücksetzen | Limited sync mode is active… + Reset sync | … → Diagnose (only in that state) | Only the last 7 days update; reset repairs the connection. | — |
| D27.10 | Fehlerbehebung (Text) | Troubleshooting (text) | … → Diagnose | Explains that Intake reads what HC combines in your app order; check your fitness app is a source and may write. | — |
| D27.11 | Jetzt synchronisieren | Sync now | … → Diagnose | User-initiated sync. | — |
| D27.12 | Verbindung testen | Test connection | … → Diagnose | Exactly one HC call, bypassing Intake's cooldown. Results: "Verbindung OK – Kontingent verfügbar", "Weiterhin von Health Connect ratenbegrenzt", "Health Connect nicht verfügbar", "Sync läuft – gleich erneut versuchen", "Test fehlgeschlagen". | — |
| D27.13 | Bericht senden (Debug-Export) | Send report (debug export) | … → Diagnose | Builds a JSON debug export (mirrored records, day aggregates/snapshots, call log, app/HC version, locale, zone) and opens the share sheet. | — |

## 7. Google Drive backup & restore

Card below Integrations (shown when build flag `GOOGLE_DRIVE_BACKUP_ENABLED`, currently true). Backups are end-to-end encrypted (AES-GCM, key from passphrase via PBKDF2-HMAC-SHA256) and stored in the app's hidden Drive `appDataFolder`; the newest 10 snapshots are kept by default.

| ID | DE label | EN label | Path | What it does | iOS difference |
|---|---|---|---|---|---|
| D28.1 | Automatisches Google-Drive-Backup | Automatic Google Drive backup | Einstellungen → Backup-Karte | Switch; connects Google Drive on enable, disconnects on disable. Subtitle shows account e-mail or "Nicht verbunden". | iOS uses iCloud sync; Android substitutes Google Drive backup (PORT_PLAN P3). |
| D28.2 | Konto: … | Account: … | Einstellungen → Backup-Karte | Connected Google account. | — |
| D28.3 | Google Drive verbinden / trennen | Connect / Disconnect Google Drive | Einstellungen → Backup-Karte | Google sign-in / sign-out for Drive. | — |
| D28.4 | Täglich / Wöchentlich | Daily / Weekly | Einstellungen → Backup-Karte | Frequency of the automatic backup (WorkManager periodic job). | — |
| D28.5 | Nur WLAN | Wi-Fi only | Einstellungen → Backup-Karte | Auto backups only on unmetered networks. | — |
| D28.6 | Nur beim Laden | Charging only | Einstellungen → Backup-Karte | Auto backups only while charging. | — |
| D28.7 | Fotos sichern | Back up photos | Einstellungen → Backup-Karte | Food photos are backed up encrypted to Drive too (restored by a background worker). | — |
| D28.8 | Jetzt sichern (Verschlüsseltes Backup, Passphrase, Sichern) | Back up now (Encrypted backup, Passphrase, Back up) | Einstellungen → Backup-Karte → Jetzt sichern | Immediate encrypted upload; first time asks for a passphrase (min. 8 characters), then remembered on the device. | — |
| D28.9 | Backup wiederherstellen | Restore backup | Einstellungen → Backup-Karte → Backup wiederherstellen | Lists Drive snapshots: "Neuestes Backup", "Ältere Backups anzeigen (n)"; enter passphrase; warning "Die Wiederherstellung ersetzt lokale App-Daten durch Backup-Daten."; "Ausgewähltes Backup wiederherstellen". Older backup files stay restorable (compatibility rule in AGENTS.md). | — |
| D28.10 | Passphrase ändern (Alte / Neue Passphrase) | Change passphrase (Old / New passphrase) | Einstellungen → Backup-Karte | Re-keys backups with a new passphrase. | — |
| D28.11 | Passphrase vergessen / zurücksetzen | Forgot passphrase / reset | Einstellungen → Backup-Karte | Sets a new passphrase; old backups become permanently inaccessible (warning shown). | — |
| D28.12 | Status: Bereit. / Zuletzt erfolgreich: … | Status: Ready. / Last success: … | Einstellungen → Backup-Karte | Last backup result and time. | — |

## 8. Data ("Daten")

| ID | DE label | EN label | Path | What it does | iOS difference |
|---|---|---|---|---|---|
| D29.1 | PDF-Bericht exportieren | Export PDF report | Einstellungen → Daten → PDF-Bericht exportieren | Dialog that builds a report and opens the share sheet. | Layout and Markdown wording follow iOS exactly (comments in `pdf/*`: "iOS parity", "character for character"). |
| D29.2 | Format: PDF / Für KI (Markdown) | Format: PDF / For AI (Markdown) | … → PDF-Bericht exportieren → Format | PDF document or a Markdown file meant for AI chats. | Same as iOS. |
| D29.3 | Datumsbereich: Letzte 7 / 30 / 90 Tage, Diesen Monat, Letzten Monat, Benutzerdefiniert (Startdatum, Enddatum) | Date range: Last 7 / 30 / 90 days, This month, Last month, Custom (Start date, End date) | … → PDF-Bericht exportieren → Datumsbereich | Report period. | — |
| D29.4 | Abschnitte: Zeitraumübersicht, Tägliche Mahlzeiten (+ Essenszeiten anzeigen), Tägliche Nährwerte, Tägliche Aktivität und Hydration, Gewichtsübersicht, Stimmung und Notizen | Sections: Period summary, Daily meals (+ Show meal times), Daily nutrition, Daily activity and hydration, Weight summary, Mood and notes | … → PDF-Bericht exportieren → Abschnitte | Choose report sections. | — |
| D29.5 | Daten exportieren | Export data | Einstellungen → Daten | Saves a full, unencrypted JSON backup file (`intake-backup-<time>.json`) via the system file picker. | — |
| D29.6 | Daten importieren | Import data | Einstellungen → Daten | Restores from such a JSON file (replaces local data). | — |
| D29.7 | App zurücksetzen | Reset App | Einstellungen → Daten | Confirm "App zurücksetzen und alle deine Daten löschen?"; deletes local profile, logs, recipes and own products on this install. | Same as iOS: the iOS reset keeps iCloud data too (code and `settings.resetAppSheetBody` agree); both reset this device only. |

## 9. Feature tour, legal & support

| ID | DE label | EN label | Path | What it does | iOS difference |
|---|---|---|---|---|---|
| D30.1 | Feature-Tour | Feature Tour | Einstellungen → Feature-Tour | Reopens the release-notes sheet of the current version. | Comment: equivalent of iOS "Feature-Tour". |
| D30.2 | Über Intake | About | Einstellungen → Rechtliches & Support → Über Intake | "Eine Notiz von Tobi": personal note from the developer, version, button "Verbinde dich mit mir" (Threads). | — |
| D30.3 | Nutzungsbedingungen | Terms of Service | Einstellungen → Rechtliches & Support | Opens terms on the website in the app language. | — |
| D30.4 | Datenschutzerklärung | Privacy Policy | Einstellungen → Rechtliches & Support | Opens privacy policy on the website in the app language. | — |
| D30.5 | Kontakt | Contact | Einstellungen → Rechtliches & Support → Kontakt | Mail to support@getintake.de, subject "Intake Support"; body pre-filled with app version/build, Android version/API, device, Health Connect version/status, language. | Same subject as iOS so mails sort together (comment). |
| D30.6 | Vorschläge & Bugs | Ideas & Bugs | Einstellungen → Rechtliches & Support | Opens the feature-voting board (featurevoting.tobibechtold.dev/app/intake). | — |
| D30.7 | App bewerten | Rate app | Einstellungen → Rechtliches & Support | Opens the Play Store page. | — |

---

## Health Connect: what is read/written and why calories are an estimate

**What Intake reads from Health Connect (and why)**

- *Active calories, total calories, resting (basal) calories:* to work out how many calories you burned through activity, which can raise your daily target (Settings → Aktivität).
- *Steps:* shown on Today, and used to estimate activity calories when no app supplies calories.
- *Distance:* shown alongside steps.
- *Workouts (exercise sessions):* listed on Today with their calories; needed for the "Nur Workouts" option.
- *Weight and height:* to prefill your body data and keep your weight history current.
- *Body fat:* to fill your body measurements (Intake ignores the body-fat values it wrote itself).
- *Optional:* reading history older than 30 days and reading in the background. Without background access, a long sync stops as soon as you leave the app. Intake asks for both but works without them.

Calories, steps and distance are not copied record by record. Intake asks Health Connect for its own day totals, which already follow your app priority and remove duplicates. Today counts from midnight until now. The last 30 days are filled in on first use. Only workouts, weight and body fat are copied into the app.

**What Intake writes to Health Connect (and why)**

- *Nutrition:* one entry per logged food, including the extra nutrients, so other health apps can see what you ate.
- *Hydration:* your daily water total.
- *Weight and body fat:* one value per day when you log them in Intake.

Intake never writes calories burned, steps or workouts. When "Health Connect verwenden" is off, Intake neither reads nor writes.

**Which app counts**

Out of the box, Health Connect decides. Its list under "App-Quellen" / "Datenquellen und Priorität" sets which app wins when several record the same thing. An app missing from that list adds nothing to the totals. If one app's numbers are what you want, choose it under *Health-Connect-Aktivität → Nur diese App verwenden*.

**How active calories are worked out (in this order)**

1. **Measured:** your app writes active calories, and Intake uses them. If "total minus resting" from Health Connect comes out higher, Intake uses that instead. This covers an app that only records part of the day while another records the whole day.
2. **Total minus resting:** your app writes only total calories. Intake subtracts the resting calories Health Connect reports. If Health Connect has no resting calories, Intake uses its own BMR from your profile (height, weight, age, sex) for the time elapsed, and the note says so.
3. **Workouts plus steps:** some apps write calories only for workouts, not for the walking in between (seen with Samsung Health and Garmin). Intake then counts each workout with the calories the app recorded. It estimates the rest of the day from the steps taken outside the workouts. Two apps logging the same workout count once.
4. **Steps only:** about 0.026 kcal per step at 70 kg, scaled by your weight (a 105 kg person gets 1.5×). The estimate is capped at 1,200 kcal per day. This is the net cost of walking, because your resting calories are already counted elsewhere. The earlier value of 0.04 counted them twice.
5. **Nothing:** workouts without calories or steps count 0 kcal, and Intake says so instead of guessing. You can add a workout with calories yourself.

**Why the calorie number is an estimate**

- Apps write different things to Health Connect. Some write active calories, some only totals, some only workout calories, some only steps.
- Resting calories may come from Health Connect or from Intake's formula. Either way it is a model, not a measurement.
- The step formula uses an average walking cost. It ignores pace, incline and fitness, so it can differ from your fitness app.
- Watches and phones estimate calories themselves from heart rate and motion.
- Health Connect sometimes delivers data late (an app hasn't synced yet) or limits how often Intake may ask (rate limit). Intake then shows the last known values with a note.

Whenever a value is estimated, Intake labels it ("Aus Gesamtkalorien geschätzt", "Aus Schritten geschätzt", "Trainings plus Schätzung aus Schritten"). "Mehr dazu" explains what happened and whether you need to do anything. Settings → Aktivität lets you count only a percentage of these calories, which is a cautious choice when you are unsure.

**iOS note:** this calculation and the check page are Android-only; the HC overhaul spec scopes iOS out. Project notes (not code) say iOS still used 0.04 kcal/step as of 2026-10-09. Check this before stating it on a shared help page.
