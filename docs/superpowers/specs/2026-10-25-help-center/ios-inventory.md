# Intake iOS (branch 2.8.0) - help center inventory

Source: repo /Users/xce35g6/dev/private/intake2, strings from Resources/Localization/Localizable.xcstrings (keys via L.t), widget/watch strings from Core/Widgets/WidgetLocalization.swift. Languages in app: en, de, es, fr, pt, it, nl, ja.
Columns: ID | DE label | EN label | Where (path) | What it does | Main file | NEW = new in 2.8.0 (from `git log main..2.8.0`, 228 commits; "?" = could not verify).
Paths: "Settings" = Heute tab > gear icon (top right) > Einstellungen. Tab bar: Heute, Fasten (only if enabled), Bibliothek, Statistik, plus the detached "+" (Lebensmittel hinzufügen).
Path notation uses ">" . Settings root groups: "Profil & Ziele" (Körperdaten, Kalorien, Makro-Ziele, Aktivität, Fasten), "Einstellungen" (Mitteilungen, Darstellung, Region & Einheiten), "Integrationen" (Intake AI, Apple Health, iCloud-Sync), "Daten" (PDF-Bericht exportieren, Daten), then "Über Intake", Feature-Tour, "Rechtliches & Support".

---
## A. Heute (Today page)  [A1-A27]
| ID | DE | EN | Where | What | File | New |
|---|---|---|---|---|---|---|
| A1 | Heute | Today | Tab "Heute" | Daily diary: dashboard ring card, meals, water, activity, weight, mood, body measurements | Features/Today/TodayRootView.swift | |
| A2 | Heute-Seite bearbeiten | Edit Today Page | Heute > page edit (EditTodaySheet) | Sheet to customize the page | Features/Today/EditTodaySheet.swift | |
| A3 | Abschnitte | Sections | Edit Today Page > Abschnitte | Reorder (drag) and hide/show sections: Dashboard, Mahlzeiten, Wasser, Aktivität, Gewicht, Stimmung, Körpermaße. On wide screens (iPad/Duo) Dashboard starts left column, meals right | EditTodaySheet.swift | |
| A4 | Mahlzeiten | Meals | Edit Today Page > Mahlzeiten | Reorder meals, hide meals, create custom meals ("Neue benutzerdefinierte Mahlzeit") with icon ("Mahlzeit-Symbol wählen"), delete custom meal; archived meals shown as "Archiviert" | EditTodaySheet.swift | |
| A5 | Auf Standard zurücksetzen | Reset to default | Edit Today Page | Resets page customization ("Heute-Seite zurücksetzen?") | EditTodaySheet.swift | |
| A6 | Standard-Mahlzeiten | Default meals | Today | Frühstück, Mittagessen, Abendessen, Snacks (meal.*); Home Screen quick actions list up to 4 visible meals | Features/App/AppQuickAction.swift | |
| A7 | Tages-Pager (Wischen zwischen Tagen) | Day pager / swipe between days | Heute (swipe left/right) | Horizontal swipe changes day; title shows Heute/Gestern/Morgen + date; can be switched off in Settings (see N-Appearance) | Features/Today/TodayDayPager.swift | |
| A8 | Datum wählen | Select Date / Choose Date | Heute > calendar icon (top bar) | Month calendar sheet; days colored by calorie status; header shows month count "{green} grün · {yellow} orange · {red} rot" | Features/Today/TodayMonthCalendarSheet.swift | NEW (month colours + count, #690) |
| A9 | Heute (Zurück-Pfeil) | Today (back arrow) | Heute top bar, only when another day is shown | Jumps back to today | TodayRootView.swift | |
| A10 | Wochenleiste / Kalorienstatus | Day strip with calorie status | Heute (top strip) | Week strip with day colors (Kalorien im Plan / werden knapp / über dem Ziel) | Features/Today/DayCalorieStatuses.swift | NEW (shared day colours) |
| A11 | Kalorien-Ring-Karte (Dashboard) | Dashboard ring card | Heute > Dashboard | Ring with kcal übrig / zu viel, Gegessen, Verbrannt, Ziel, macros; "Mehr/Weniger"; "Alle Nährstoffe anzeigen" opens nutrient detail sheet | TodayDashboardCardView.swift, CalorieRingView.swift | |
| A12 | Makro-/Nährstoff-Detail | Macro / nutrient detail | Heute > tap macro or "Alle Nährstoffe" | Which foods contributed ("Keine Lebensmittel haben zu diesem Wert beigetragen"), groups: Makros, Fett- & Kohlenhydratdetails, Vitamine, Mineralstoffe & Elektrolyte, Weitere | TodaySharedTypes.swift, NutrientDetailSheet.swift | |
| A13 | Ziel (Tagesziel anpassen) | Target / Adjust day target | Heute > tap "Ziel" on ring card | Per-day calorie change: "Einmalig für dieses Datum" or "Jeden {Wochentag}"; source "Woher": Zusätzlich / Von den anderen Tagen / Aus dem Wochensaldo; Zurücksetzen | Features/Today/DayTargetAdjustSheet.swift | NEW (source choice, weekly budget) |
| A14 | Woche (Wochenbudget-Zeile) | Week row | Heute > ring card "Woche" | Shows "+x übrig"/"x drüber" for the week; opens weekly overview | TodayDashboardCardView.swift | NEW |
| A15 | Wochenbudget (Übersicht) | Weekly budget overview | Heute > Woche | Week left/over, per-day planned/eaten/running/"nichts eingetragen", "Saldo verschieben", mark day "Nichts gegessen" / "Markierung entfernen", link "Wochenbudget-Einstellungen" | Features/Today/WeeklyBudgetOverviewSheet.swift | NEW |
| A16 | Mahlzeit-Karte | Meal card | Heute > Mahlzeiten | Tap "Hinzufügen" adds food to that meal; collapse/expand a meal (remembered); tap entry to edit | TodaySectionCards.swift | |
| A17 | Eintrag bearbeiten | Edit Food (entry) | Heute > tap entry | Edit name, kcal, macros, portion, "Als Getränk markieren" (counts to water), Mahlzeit chips (change meal), Uhrzeit (time), photo add/change/remove, delete, share | Features/Today/AddFoodEntrySheet.swift | |
| A18 | Mahlzeit-Übersicht | Meal Summary | Heute > tap meal header/summary | Meal totals + menu: "Rezept erstellen", "Mahlzeit kopieren", "Mahlzeit löschen" (also removes synced Apple Health data); share as picture / file | Features/Today/MealSummaryAndWave.swift | |
| A19 | Mahlzeit kopieren (andere Tage) | Copy Meal | Heute > Meal Summary > menu | Pick which products ("Zu kopierende Produkte"), Zieldatum (graphical calendar, any day) and Zielmahlzeit. There is NO separate "move entry to other day"; moving between meals = change Mahlzeit chip in entry edit; across days = copy then delete | MealSummaryAndWave.swift (MealDestinationPickerSheet) | |
| A20 | Mahlzeit teilen / importieren | Share Meal / Import Meal | Meal Summary share icon; opening a shared meal file | Send meal as file; recipient sees preview and "Zum Tagebuch hinzufügen" with date/meal picker | MealSharing.swift | |
| A21 | Bild teilen | Share a picture | Heute > share icon (top bar), meal summary, Statistik | Share-card gallery (Tag/Mahlzeiten/Lebensmittel/Körper), templates Kräftig/Dunkel/Hell/Glas/Sticker/Bilanz, Story 9:16 or Beitrag 4:5, own photo, save to Fotos, Instagram Story | Features/Share/ShareCardSheet.swift, ShareGallery.swift | |
| A22 | Stimmung | Mood | Heute > Stimmung | "Wie fühlst du dich heute?" emoji check-in with optional notes; edit with pencil | TodaySectionCards.swift (TodayMoodCheckInSheet) | |
| A23 | Pull to refresh | Pull to refresh | Heute (pull down), Statistik | Catches up Apple Health first, then fetches iCloud changes | AppStore+HealthCatchUp.swift, TodayRootView.swift | NEW (#696) |
| A24 | Synchronisiert (Spinner) | Syncing | Heute top bar | Small spinner while foreground sync runs | TodayRootView.swift | |
| A25 | Einstellungen | Settings | Heute > gear | Opens settings | TodayRootView.swift | |
| A26 | Home-Bildschirm-Schnellaktionen | Home Screen quick actions | long-press app icon | One entry per visible meal ("Hinzufügen") opens food search for that meal | AppQuickAction.swift | |
| A27 | Foto am Eintrag | Entry photo | entry edit / Today | Optional photo per entry, shown on Today if enabled in Settings > Darstellung > Fotos | Features/Today/FoodPhotoViews.swift | |

## B. Food logging  [B1-B38]
| ID | DE | EN | Where | What | File | New |
|---|---|---|---|---|---|---|
| B1 | Lebensmittel hinzufügen | Add food | "+" button (tab bar / top bar), meal "Hinzufügen" | Opens food search sheet | Features/Today/FoodSearchSheet.swift | |
| B2 | Suche | Search | Add food > search | Search recipes, own products, database foods; "Nach Name oder Marke suchen"; sources Datenbank / Open Food Facts / Grundnahrungsmittel; trust badges Verifiziert / Community | FoodSearchViewModel.swift, FoodSearchRepository.swift | |
| B3 | Kalorien pro 100 g in Suchzeilen | kcal per 100 g in rows | search results | Rows show kcal per 100 g (or per serving) with portion underneath | FoodRowCalorieDisplay.swift | NEW (#478) |
| B4 | Verlauf / Häufig / Favoriten / Eigene | Recent / Frequent / Favorites / Custom segments | Add food (empty search) | Quick lists; sort favorites (Alphabetisch / Hinzugefügt / Am häufigsten geloggt); remove entries from lists | FoodSearchModels.swift | |
| B5 | Favoriten (unbegrenzt) | Favorites (no limit) | heart icon on a food; Bibliothek > Favoriten | Save any food as favorite | Features/Library/LibraryRootView.swift | NEW (#690) |
| B6 | Vorschläge | Suggestions (for meal) | Add food | "Vorschläge ({Mahlzeit})", "{n}× geloggt", Alle anzeigen / Weniger | FoodSelectionMemoryStore.swift | |
| B7 | Barcode scannen | Scan Barcode | Add food > Scannen / camera icon; Widgets/Control "Scannen" | Scans EAN-8/EAN-13/UPC/Code128; or type barcode manually ("Oder Barcode manuell eingeben"); camera permission prompt | Features/Today/Components/CameraCaptureScreen.swift, CameraCaptureController.swift | |
| B8 | Essen scannen (Foto-Modus) | Meal Scan | Camera screen mode switch | Photo mode for Intake AI meal photos | CameraCaptureScreen.swift | |
| B9 | Nährwertlabel scannen | Scan nutrition label | Create product / Quick form > "Nährwertlabel scannen" (Kamera / Mediathek) | Prefills form from a photo of the label; needs active Intake AI subscription (or own API key) | FoodSearchQuickAddForm.swift | |
| B10 | Erstellen (Schnell) | Quick / Create | Add food > Erstellen | Modes "Produkt erstellen" (saves a custom product) or "Nur schnell hinzufügen" (logs without saving); presets Apfel, Banane, Hähnchenbrust, Ei, Haferflocken, Reis | FoodSearchQuickAddForm.swift | |
| B11 | Eigene Produkte | Custom products / My Products | Bibliothek > Meine Produkte; Add food > Erstellen | Create/edit/delete own foods: name, brand, barcode (or "ohne Barcode"), nutrition per 100 g or per serving/weight basis, extended nutrients ("Nährstoff hinzufügen"), portion sizes ("Portionsgröße hinzufügen", set default), beverage flag, photo; edits apply to new entries only | Features/Today/CustomFoodProductSheet.swift | |
| B12 | Zur Prüfung einreichen | Submit for review | Create product toggle; Bibliothek > Einreichungen | Send a product/correction to shared catalogue (needs brand, barcode, name, kcal/fat/carbs/protein per 100 g); statuses Entwurf / In Prüfung / Angenommen / Abgelehnt (rejected stays private) | CustomFoodProductSheet.swift, LibrarySubmissionsView.swift | |
| B13 | Doppelter Barcode | Duplicate barcode | Create product | Warns if barcode exists ("Produkt bereits vorhanden" / "Schon in Meine Produkte") | CustomFoodProductSheet.swift | |
| B14 | Portionen & Einheiten | Portions & units | Food detail | Portion pickers: g, ml, oz, fl oz, Tasse, Glas, EL, TL, serving sizes; "Gewicht anpassen" remembers your weight per unit for that food; "Gewogen: Roh/Gekocht" with factor hint | FoodSearchServingDetailView.swift, HouseholdMeasure.swift | |
| B15 | Uhrzeit & Datum beim Hinzufügen | Time / date when adding | Food detail | Time (Uhrzeit) and date selectable; meal selector | FoodSearchServingDetailView.swift | |
| B16 | Zusammenfassungs-Kapsel | Summary capsule | Add food sheet (all pages), Intake AI chat | Capsule with ring, kcal left count-down and macro panel previewing the selected food on the chosen day (not in ingredient pickers) | Features/Today/DaySummaryCapsule.swift | NEW (#692) |
| B17 | Rezepte beim Hinzufügen | Recipes tab in add sheet | Add food > Rezepte | Search recipes or ingredients; log whole recipe by portion; routine recipes appear on top of their meal | FoodSearchTabViews.swift | |
| B18 | Rezepte | Recipes | Bibliothek > Rezepte | List with categories (add/edit/delete), sort (Name, Zuletzt hinzugefügt, Kalorien pro Portion), search, import via file | Features/Recipes/RecipesParityRootView.swift | |
| B19 | Rezept erstellen/bearbeiten | Create Recipe | Rezepte > + ; Meal Summary > Rezept erstellen | Ingredients, notes, portions, finished weight (total) or calculated weight, beverage recipe (liquid ingredients count to hydration), categories, photo | RecipeComposerSheet.swift | |
| B20 | Routine | Routine | Recipe > Routine; Bibliothek > Routinen | Recipe with fixed meal: top of that meal's add sheet, logs in one tap; "Loggen als: Ein Eintrag / Jede Zutat" | RecipeComposerSheet.swift, LibraryRoutinesView.swift | |
| B21 | Rezept teilen / duplizieren | Share / Duplicate recipe | Recipe detail | Share as file, import via "Rezept importieren" (preview sheet), duplicate ("Kopie") | RecipeSharing.swift, RecipeDetailSheet.swift | |
| B22 | Schlagwörter | Tags | Bibliothek > Meine Produkte > Schlagwörter bearbeiten | Tag foods and filter list | LibraryTagEditorSheet.swift | |
| B23 | Bibliothek | Library | Tab "Bibliothek" | Favoriten, Meine Produkte, Routinen, Einstellungs-frei: Einreichungen, Rezepte; search "Bibliothek durchsuchen" | LibraryRootView.swift | |
| B24 | Intake AI | Intake AI | Add food > "Intake AI" (Text oder Foto); widget/Control Center "Intake AI fragen"/"KI-Kamera" | Chat: describe a meal or add photo, get kcal/macro estimate with ingredients; correct by replying, "Korrigieren" (Lebensmittel/Portion/Nährwerte), portion Halb/Doppelt/Mehr/Weniger, edit ingredients (add/remove), confidence level, log as "Eine Mahlzeit" or "Einzeln (n)"; dictation (Diktieren) | Features/Today/FoodSearchSheet.swift (chat), IntakeAIStoryView.swift | |
| B25 | Intake AI Mahlzeitenkarte | Intake AI meal card | Intake AI chat result | New card with macro bars, list or bento layout, pencil edit, "Schätzung · Quellen"; reply grows from "Wird berechnet …" | Features/Today/IntakeAIMealCardModel.swift | NEW |
| B26 | Intake AI Zusammenfassung | Intake AI summary capsule | Intake AI chat title | Capsule replaces chat title and previews open estimate | DaySummaryCapsule.swift | NEW |
| B27 | Intake AI einrichten | Choose your AI logging setup | First use; Settings > Intake AI | Options: Intake AI (Abo), "Eigenen API-Schlüssel nutzen" (OpenAI/Claude/Gemini), "Ohne KI fortfahren"; intro story ("Du hast die Wahl") | IntakeAIStoryView.swift, SettingsSectionViews.swift | |
| B28 | Intake AI Abo | Intake AI subscription | Paywall; Settings > Intake AI | Monthly/yearly, 3-day trial, restore purchases, manage subscription; includes label scan | IntakeAIPaywallView.swift, Core/Purchases/IntakeAIEntitlementCenter.swift | |
| B29 | Foto-Logging | Photo logging | Intake AI > Kamera/Mediathek | Analyze plate/packaged product photos; caption; one photo per estimate | FoodSearchSheet.swift | |
| B30 | Fotos an Einträgen | Photos on entries | Entry sheets | Add photo to entry/product/recipe | FoodPhotoViews.swift | |
| B31 | Getränke | Beverages | Entry/product/recipe "Als Getränk markieren" | Beverage entries add to today's water ("Zählt zum heutigen Wasserziel"); other beverages listed under Wasser | AddFoodEntrySheet.swift | |
| B32 | Fehlerrückmeldung zu Produkt | Report a product issue | Food detail | "Stimmt etwas nicht oder fehlt etwas?" with issue types e.g. Doppeltes Produkt | FoodSearchServingDetailView.swift | |
| B33 | Lebensmittel-Datenbank Land | Food database country | Settings > Region & Einheiten | Chooses local database; "Ich kaufe auch ein in …" extra regions rank as local | SettingsSectionViews.swift | |
| B34 | Siri: Lebensmittel eintragen | Log Food (Siri) | Siri / Shortcuts | "Lebensmittel in Intake eintragen" with food, amount (g), meal; quick create variants | Core/Intents/DiaryIntents.swift (LogFoodIntent) | |
| B35 | Suche per Siri/Spotlight | Search/Open Food intents | Shortcuts, Visual Intelligence | SearchFoodIntent, OpenFoodIntent, FoodVisualIntelligenceQuery | Core/Intents/FoodIntents.swift | ? |
| B36 | Aktivität hinzufügen | Add Activity | Heute > Aktivität > add | Manual workout: type (Laufen, Gehen, Radfahren, Schwimmen, Fußball, Tennis, HIIT, Yoga, Krafttraining, ...), Dauer, Kalorien berechnet or manuell, custom activities (name, emoji, kcal/h) | AddActivityEntrySheet.swift | |
| B37 | Mahlzeit löschen / alle Einträge | Delete meal | Meal Summary | Removes all entries of the meal | MealSummaryAndWave.swift | |
| B38 | Nährwert-Details | Nutrient details | Food detail > "Alle Nährwerte anzeigen" | Shows only nutrients available for that product; current portion | NutrientDetailSheet.swift | |

## C. Goals & weekly budget  [C1-C22]
| ID | DE | EN | Where | What | File | New |
|---|---|---|---|---|---|---|
| C1 | Körperdaten | Body Data | Settings > Profil & Ziele > Körperdaten | Geschlecht (Männlich/Weiblich), Geburtstag (age derived), Größe (cm or ft/in), Gewicht (kg/lb), Startgewicht with date ("Gesamt" on Today counts from it; Zurücksetzen) | Features/Settings/SettingsEditSheets.swift | |
| C2 | Kalorien | Calories | Settings > Kalorien | Maintenance and daily target, goal Abnehmen / Halten / Zunehmen, "Tägliche Anpassung" slider, "Standard zurücksetzen" | SettingsEditSheets.swift | |
| C3 | Quelle der Erhaltungskalorien | Maintenance source | Settings > Kalorien | "Automatisch berechnen" (Mifflin-St Jeor), "Eigener TDEE", "Apple Health" (7-day average resting energy; needs activity bonus on) | SettingsEditSheets.swift | ? (Apple Health source may be new) |
| C4 | Aktivitätslevel | Activity level | Settings > Kalorien | Wenig aktiv 1.2 / Leicht 1.375 / Moderat 1.55 / Aktiv 1.725 / Sehr aktiv 1.9 | SettingsEditSheets.swift | |
| C5 | Fixes Tagesziel | Fixed daily target | Settings > Kalorien > Erweitert | Overrides TDEE and slider ("Ignoriert TDEE-Berechnung und Anpassungsregler") | SettingsEditSheets.swift | |
| C6 | Tages- und Wochenziele | Daily and weekly goals | Settings > Kalorien > Tages- und Wochenziele | Container for weekly budget and weekday rules | EditDayBasedTargetsSheet in SettingsEditSheets.swift | NEW |
| C7 | Wochenbudget (Schalter) | Weekly budget | Settings > Kalorien > Tages- und Wochenziele | Sum of the week's day goals; unspent calories carry within the week | SettingsEditSheets.swift, Core/Models/WeeklyBudget.swift | NEW |
| C8 | Modus: Automatisch verteilen / Manuell | Spread automatically / Manually | same | Automatic spreads leftover/overeaten calories evenly over remaining days; manual keeps day goals, you move balance yourself in "Tagesziel anpassen" | WeeklyBudgetCalculator.swift | NEW |
| C9 | Untergrenze 1.200 kcal | 1,200 kcal floor | Weekly budget behavior | No day is pushed below 1,200 kcal (or the profile floor); rest stays in "Saldo" | Core/Models/WeeklyBudgetCalculator.swift (weeklyBudgetMinimumFloor) | NEW |
| C10 | Tagesabhängige Kalorienziele | Day-based calorie targets | same screen | Toggle + "Wöchentliche Regeln" per weekday (Montag-Sonntag) with delta and source (zusätzlich / von den anderen Tagen) | SettingsEditSheets.swift | |
| C11 | Wochentagsregeln wieder aktivieren? | Turn weekday rules back on? | when enabling weekly budget with saved rules | Confirmation | SettingsEditSheets.swift | NEW |
| C12 | "Nichts gegessen" Markierung | Ate nothing mark | Weekly overview | Marks a day as intentionally empty; syncs | WeeklyBudgetOverviewSheet.swift | NEW |
| C13 | Makro-Ziele | Macro goals | Settings > Makro-Ziele | Guided: protein target g/kg + "Kohlenhydrat- und Fettstil" (Ausgewogen, Mehr Kohlenhydrate, Etwas weniger Kohlenhydrate, Low Carb, Keto, Weniger Fett); or "Eigene Makros verwenden" (protein/carbs/fat g with kcal mismatch hint) | SettingsEditSheets.swift (EditMacroGoalsSheet) | |
| C14 | Erweiterte Nährstoffe (Ziele) | Extended nutrients | Settings > Makro-Ziele | Defaults: fiber min, sugar max 10 % kcal, sat. fat max 10 % kcal, salt max ~2,300 mg sodium; "Eigene erweiterte Ziele verwenden" | SettingsEditSheets.swift | |
| C15 | Aktivität zum Ziel addieren | Add activity to target | Settings > Aktivität | Toggle: burned calories raise today's target | SettingsSectionViews.swift (ActivitySettingsView) | |
| C16 | Aktivitätsquelle | Activity source | Settings > Aktivität | Segmented: "Alle Aktivität" / "Nur Workouts" | SettingsSectionViews.swift | |
| C17 | Anteil der Aktivitätskalorien | Activity calories counted | Settings > Aktivität | Slider 0-100 % of activity calories credited to target (changes target/remaining only, not the shown total burn) | SettingsSectionViews.swift | |
| C18 | Wissenschaftliche Quellen | Scientific sources | Settings > Rechtliches & Support | Sources for Mifflin-St Jeor, activity levels (FAO/WHO/UNU), macros ranges, protein, EFSA water + disclaimer | Features/Settings/ScientificSourcesView.swift | |
| C19 | Kalorienring nach Status färben | Color calorie ring by status | Settings > Darstellung > Heute | See N | SettingsSectionViews.swift | |
| C20 | Wasserziel | Water goal | Heute > Wasser > goal | "Berechnetes Ziel verwenden" or own daily goal (ml) and glass size (ml) | Features/Today/Components/WaterGoalSheet.swift | |
| C21 | Startgewicht-Datum | Starting weight date | Settings > Körperdaten | see C1 | SettingsEditSheets.swift | |
| C22 | Onboarding Ziel | Onboarding goal | First launch | Goal (Abnehmen/Halten/Zunehmen), about you, calorie source (Körperdaten or Apple Health resting energy), units, optional iCloud + Apple Health | Features/Onboarding/OnboardingRootView.swift | |

## D. Fasting  [D1-D12]
| ID | DE | EN | Where | What | File | New |
|---|---|---|---|---|---|---|
| D1 | Fasten-Tab aktivieren | Enable fasting tab | Settings > Fasten | Shows tab "Fasten" between Heute and Bibliothek | SettingsSectionViews.swift (FastingSettingsView) | |
| D2 | Erste/Letzte Mahlzeit | First/Last meal time | Settings > Fasten > Timer | Defines daily eating window (default 08:00-20:00); fasting = rest of day | SettingsSectionViews.swift, FastingModels.swift | |
| D3 | Fasten-Bildschirm | Fasting screen | Tab Fasten | Ring/timer: state Fasten/Essen, countdown ("Zeit, bis du wieder essen kannst" / "Zeit bis zum nächsten Fasten"), Gestartet/Endet um, schedule card (Essensfenster, Fasten/Essen durations) | Features/Fasting/FastingRootView.swift | |
| D4 | Fasten starten / beenden / zum Zeitplan zurücksetzen | Start / End Fasting / Reset To Schedule | Fasten tab buttons (with confirmation) | Manual override of schedule; end = eat until next scheduled fast | FastingStateResolver.swift, FastingOverrideStore.swift | |
| D5 | Dated overrides | Manual fast never lies ahead of clock | Fasten | Manual override has dates, other devices follow a synced fast | FastingOverrideStore.swift | NEW |
| D6 | Live-Aktivität anzeigen | Show Live Activity | Settings > Fasten > Live-Aktivität | Lock Screen / Dynamic Island timer; bar and ring move on their own; swiping it away keeps it away until next phase | Features/Fasting/FastingLiveActivityCoordinator.swift, Widgets/widgetsLiveActivity.swift | NEW (animation, dismissal) |
| D7 | Benachrichtigen, wenn Essen startet / Fasten startet | Notify when eating / fasting starts | Settings > Fasten > Mahlzeiten-Erinnerungen | Local notifications ("Essensfenster gestartet", "Fasten gestartet"); planned for next 3 days; device-local only | FastingNotificationCoordinator.swift | NEW (3 days ahead) |
| D8 | iOS-Einstellungen öffnen | Open iOS Settings | Settings > Fasten (if denied) | Notification permission hint | SettingsSectionViews.swift | |
| D9 | Fasten per Siri | Start/End Fast (Siri) | Siri | "Fasten in Intake starten/beenden" | DiaryIntents.swift | |
| D10 | Fasten-Zeitplan synchronisiert | Fasting sync | iCloud | Manual fasting state and schedule sync as own record | FastingSyncObserver.swift, Core/Sync | NEW |
| D11 | Fasten-Zusammenfassung | Timer & Live Activity | Settings root row | Summary text in settings list | SettingsRootView.swift | |
| D12 | Tab-Reihenfolge | Tab order | - | Heute, Fasten (optional), Bibliothek, Statistik | AppShellView.swift | |

## E. Water  [E1-E10]
| ID | DE | EN | Where | What | File | New |
|---|---|---|---|---|---|---|
| E1 | Wasser | Water | Heute > Wasser | Glass quick-add (+/-), progress to goal ("Tagesziel: n Gläser"), "Wasser loggen" | TodaySectionCards.swift | |
| E2 | Eigene Menge | Custom amount | Heute > Wasser > Benutzerdefiniert | Enter ml | Features/Today/Components/HydrationCustomAmountSheet.swift | |
| E3 | Wasserziel | Water goal | Heute > Wasser > goal | Calculated (EFSA based) or custom ml; Glasgröße (ml) | WaterGoalSheet.swift | |
| E4 | Weitere Getränke | Other beverages | Heute > Wasser | Beverage entries (food marked as Getränk) counted toward hydration | TodaySectionCards.swift | |
| E5 | Aus Apple Health | From Apple Health | Heute > Wasser (if enabled) | Water logged by other apps shown and counted; "Aktualisieren" | TodaySectionCards.swift | |
| E6 | Wasser aus anderen Apps | Water from other apps | Settings > Apple Health | Toggle; Intake never writes this back | SettingsRootView.swift (AppleHealthSettingsPage) | |
| E7 | Wasser-Erinnerungen | Water reminders | Settings > Mitteilungen | see Settings; notification has "+{amount} ml" action | NotificationsSettingsView.swift | NEW (log from reminder) |
| E8 | Wasser Schnell-Log Widget | Water Quick Log widget | Home Screen widget | Large +/- buttons; writes through app even when closed | Widgets/IntakeWidgets.swift | NEW |
| E9 | Wasser per Siri | Log Water (Siri) | Siri | "Wasser in Intake eintragen" (default 250 ml); lands in diary, Health, iCloud | DiaryIntents.swift | NEW |
| E10 | Wasser auf der Watch | Water on Apple Watch | Watch app | +/- glass, custom amount; lands on its day without opening iPhone app | intake2Watch Watch App/ContentView.swift | NEW |

## F. Weight & body measurements  [F1-F14]
| ID | DE | EN | Where | What | File | New |
|---|---|---|---|---|---|---|
| F1 | Gewicht (Karte) | Weight card | Heute > Gewicht | Tap weight to type; +/- ; Trend ("x seit Datum"), Gesamt (since start weight), Zuletzt erfasst; Apple Health sync status and "Neu synchronisieren" | TodaySectionCards.swift | |
| F2 | Gewicht loggen | Log Weight | Heute weight card; Siri | Siri "Gewicht in Intake eintragen"; writes diary, Health, iCloud | DiaryIntents.swift (LogWeightIntent) | NEW (Siri/watch write layer) |
| F3 | Gewicht auf der Watch | Weight on Watch | Watch app | +/- 0.1 kg | intake2Watch Watch App/ContentView.swift | NEW |
| F4 | Gewicht aus Apple Health synchronisieren | Sync weight from Apple Health | Settings > Apple Health | Toggle two-way weight sync | SettingsRootView.swift | |
| F5 | Gewichtsverlauf importieren | Import weight history | Settings > Apple Health | Choose "Vorhandene Einträge überschreiben" or "Nur fehlende Tage ergänzen" | SettingsRootView.swift | |
| F6 | Körpermaße (Today) | Body Measurements | Heute > Körpermaße | Log Taille, Hüfte, Brust, Hals, Oberarm, Oberschenkel, Körperfett ("Maße eintragen"), reorder | Features/Stats/StatsBodyMeasurementViews.swift, Core/Models/BodyMeasurement.swift | |
| F7 | Körpermaße (Statistik) | Body Measurements stats | Statistik > Körpermaße | Chart per type, Verlauf list (Alle anzeigen), delete ("Messung löschen?"), "Reihenfolge bearbeiten", share | StatsBodyMeasurementViews.swift | |
| F8 | Apple-Health-Körpermaße | Waist & body fat from Health | automatic | Waist and body fat read from and written to Apple Health ("Aus Apple Health" label) | HealthKitService.swift | |
| F9 | Gewichtsverlauf | Weight Trend | Statistik > Gewicht | Range Woche/Monat/Jahr/Alle (month points), Aktuell/Start/Tiefst/Höchst/Änderung; delete entry (removes from Apple Health too) | StatsCardViews.swift | |
| F10 | 7-Tage-Schnitt | 7-day average | Statistik > Gewicht | Toggle line and value "Ø 7 Tage" with delta vs 7 days earlier | Features/Stats/WeightMovingAverage.swift | NEW (#505) |
| F11 | Gewicht teilen | Share weight/body | Stats card share icon | Share card of weight/body trend | Features/Share/BodyTrendShareLoader.swift | |
| F12 | Startgewicht | Starting weight | Settings > Körperdaten | see C1 | SettingsEditSheets.swift | |
| F13 | Maßeinheiten kg/lb, cm/ft-in | Units | Settings > Region & Einheiten | Metric / Imperial | AppLocalization.swift | |
| F14 | Wiegeerinnerung-Hinweis | Consistency hint | Weight card | "Regelmäßige Wiegeeinträge machen deinen Gewichtstrend verlässlicher." | TodaySectionCards.swift | |

## G. Statistik  [G1-G12]
| ID | DE | EN | Where | What | File | New |
|---|---|---|---|---|---|---|
| G1 | Statistik | Stats | Tab Statistik | Cards with charts; range picker Woche (7T), Monat (30T), Jahr (90T/12M); pull to refresh | Features/Stats/StatsRootView.swift | NEW (pull to refresh) |
| G2 | Kalorienaufnahme | Calorie Intake | Statistik card | Bars vs target, Ø kcal, Ø Ziel, Ø vs Ziel, burned credited ("x kcal ins Ziel eingerechnet"), base target | StatsCardViews.swift | |
| G3 | Makronährstoffe | Macronutrients | Statistik card | Protein, Kohlenh., Fett, Zucker, Ges. Fett, Ballast., Salz; tap chip to show/hide in chart; Makro-Durchschnitt | StatsCardViews.swift | |
| G4 | Gewichtsverlauf | Weight Trend | Statistik card | see F9 | StatsCardViews.swift | |
| G5 | Körpermaße | Body Measurements | Statistik card | see F7 | StatsBodyMeasurementViews.swift | |
| G6 | Wasseraufnahme | Water Intake | Statistik card | Ø Wasser, Gesamt, Maximum, Ziel erreicht | StatsCardViews.swift | |
| G7 | Nährstoff-Karten | Nutrient cards | Statistik > Bearbeiten | Add cards for any nutrient (Fett-/Kohlenhydratdetails, Mineralstoffe, Vitamine, Weitere e.g. Koffein); daily averages only count days with a logged value; caffeine = estimate | StatsModels.swift | |
| G8 | Statistiken bearbeiten | Edit Statistics | Statistik > Bearbeiten | Show/hide and reorder cards ("Standard-Statistiken") | StatsCardViews.swift | |
| G9 | Keine Statistiken ausgewählt | No statistics selected | Statistik empty state | Prompt to use Bearbeiten | StatsRootView.swift | |
| G10 | Gesamter Zeitraum | All time | Weight detail range "Alle" | Whole weight history | StatsModels.swift | |
| G11 | Bild teilen | Share picture | Stats cards | Share cards | ShareCardSheet.swift | |
| G12 | PDF-Bericht / Markdown | PDF report / For AI | Settings > Daten > PDF-Bericht exportieren | see N | PDFReportExportSheet.swift | |

## H. Apple Health  [H1-H17]
| ID | DE | EN | Where | What | File | New |
|---|---|---|---|---|---|---|
| H1 | Apple Health verbinden | Connect Apple Health | Settings > Apple Health; onboarding | Requests permissions | SettingsRootView.swift (AppleHealthSettingsPage), AppleHealthOnboardingSheet.swift | |
| H2 | Apple Health verwenden | Use Apple Health | Settings > Apple Health | Master toggle for reading activity | AppleHealthSettingsPage | |
| H3 | READ: Aktivitätskalorien, Ruheenergie, Schritte, Strecke, Workouts, Gewicht, Größe, Taille, Körperfett, Wasser, Geburtstag, Geschlecht | Read set | Health permission sheet | activeEnergyBurned, basalEnergyBurned, stepCount, distanceWalkingRunning, workouts, bodyMass, height, waistCircumference, bodyFatPercentage, dietaryWater; characteristics dateOfBirth/biologicalSex (onboarding prefill) | Core/Health/HealthKitService.swift | |
| H4 | WRITE: Ernährung, Wasser, Gewicht, Taille, Körperfett | Write set | Health permission sheet | Each logged food as nutrition samples (energy, protein, carbs, fat, fiber, sugar, sat. fat, sodium + ~30 vitamins/minerals/caffeine), dietaryWater, bodyMass; waist and body fat optional (declining them does not break required state). Deleting an entry/meal also removes its Health samples | HealthKitService.swift | |
| H5 | Workouts | Workouts | Heute > Aktivität | Imported workouts listed; tap to include/exclude calories from "Gesamt verbrannt"; prompt "Workout-Kalorien hinzufügen?" | TodaySectionCards.swift | |
| H6 | Workouts ohne Doppelzählung | Count workouts without overlap | Settings > Apple Health | Counted workout adds only the calories not already in active calories (matches Move ring) | AppleHealthSettingsPage, AppPreferences | |
| H7 | Kalorien aus Schritten schätzen | Estimate calories from steps | Settings > Apple Health | Only when Health has steps but 0 active calories (iPhone without Watch) | AppleHealthSettingsPage | |
| H8 | Schritte | Steps | Heute > Aktivität | Steps and distance shown | TodaySectionCards.swift | |
| H9 | Gesamt verbrannt | Total burned | Heute > Aktivität | Resting + active + counted workouts | TodaySectionCards.swift | |
| H10 | Berechtigungen erneuern | Renew Apple Health Permissions | Settings > Apple Health (after update added nutrients) | Re-request for new nutrient types | AppleHealthSettingsPage | |
| H11 | Letzten Monat aktualisieren | Refresh last month | Settings > Apple Health | Re-reads last 30 days ("n Tage aktualisiert") | AppleHealthSettingsPage | |
| H12 | Hintergrund-Aktualisierung | Background Health updates | automatic | Apple Health changes arrive in background, only changed days re-summed; catch-up since last read on launch/pull | Core/Health/HealthChangeMonitor.swift, AppStore+HealthCatchUp.swift | NEW |
| H13 | Aktivitätsbonus | Activity bonus | Settings > Aktivität | see C15-C17 | SettingsSectionViews.swift | |
| H14 | Ruheenergie-Quelle | Resting-energy maintenance | Settings > Kalorien | see C3 | SettingsEditSheets.swift | |
| H15 | Gewicht-Sync Status | Weight sync status | Heute weight card | Last synced, errors (Berechtigung, keine Daten) | TodaySectionCards.swift | |
| H16 | Gewichtsverlauf importieren | Import weight history | Settings > Apple Health | see F5 | SettingsRootView.swift | |
| H17 | Foreign samples | Water from other apps | see E5/E6 | read-only | HealthKitService.swift | |

## I. iCloud sync  [I1-I11]
| ID | DE | EN | Where | What | File | New |
|---|---|---|---|---|---|---|
| I1 | iCloud-Sync aktivieren | Enable iCloud Sync | Settings > iCloud-Sync; onboarding | CloudKit sync of profile, diary, library, recipes, products, body measurements across devices | Core/Sync/CloudSyncService.swift | |
| I2 | Jetzt synchronisieren | Sync now | Settings > iCloud-Sync | Manual sync; status "Verbunden", "Zuletzt synchronisiert"/"Noch nie synchronisiert" | SettingsRootView.swift | |
| I3 | Aus iCloud laden (Wiederherstellung) | Pull from iCloud (recovery) | same | Pull latest | SettingsRootView.swift | |
| I4 | Alle Geräte neu abgleichen | Resync all devices | same | Pushes everything; needs Intake 2.7.4+ on all devices; nothing deleted | Features/Settings/SyncRepairSection.swift | |
| I5 | iCloud-Backup exportieren / importieren | Export / Import iCloud backup | same | File backup | CloudSyncBackupTransfer.swift | |
| I6 | Fotos synchronisieren | Sync photos | same | Photos of entries, products, recipes stored in iCloud (max 20 per batch); off = new photos stay local | Core/Sync/FoodPhotoSync.swift | NEW (photos in sync engine) |
| I7 | iCloud-Daten löschen | Delete iCloud data | same | Removes all Intake data from iCloud and switches sync off; device data stays | SettingsRootView.swift | |
| I8 | iCloud-Sync wurde verbessert | iCloud sync is better now | Sheet after update | One-time migration sheet | SyncMigrationSheet.swift | |
| I9 | Fasten-Sync | Fasting sync | automatic | see D10 | Core/Sync/Engine | NEW |
| I10 | Pull to refresh | Pull to refresh | Heute/Statistik | fetches iCloud | AppStore | NEW |
| I11 | Hintergrund-Schreibzugriffe | Background writes | automatic | Siri/widget/watch writes reach iCloud even if process dies | Core/Storage/DiaryWriter.swift | NEW |

## J. Widgets, Watch, Siri, Control Center  [J1-J20]
| ID | DE | EN | Where | What | File | New |
|---|---|---|---|---|---|---|
| J1 | Kalorien übrig | Calories Left | Home Screen widget (small/medium/large), Lock Screen (circular/rectangular) | Calories left + macro progress; follows Today goal and rolls to tomorrow's plan; Today ring-card style | Widgets/IntakeWidgets.swift, Core/Widgets/WidgetRingCard.swift | NEW (ring-card style) |
| J2 | Kalorien gegessen | Calories Eaten | Home (small/medium), Lock Screen | Eaten kcal | IntakeWidgets.swift | |
| J3 | Mahlzeit schnell erfassen | Quick Log Meal | Home (small/medium) | Opens food search for chosen meal | IntakeWidgets.swift | |
| J4 | Wasser schnell erfassen | Water Quick Log | Home (small/medium) | + / - buttons | IntakeWidgets.swift | |
| J5 | Intake AI | Intake AI widget | Home (small/medium) | "Fragen" and "Kamera" shortcuts | IntakeWidgets.swift | |
| J6 | Control Center: Suche / Scannen / Schnell / Intake AI fragen / KI-Kamera | Controls | Control Center / Lock Screen controls | Open food search tab, barcode scan, quick tab, Intake AI chat, AI camera | Widgets/widgetsControl.swift | |
| J7 | Fasten Live-Aktivität | Fasting Live Activity | Lock Screen/Dynamic Island | see D6 | Widgets/widgetsLiveActivity.swift | |
| J8 | Apple Watch App | Apple Watch App | Watch | Pages: calories left ring, weight (+/-0.1), water (glass +/-, custom) | intake2Watch Watch App/ContentView.swift | |
| J9 | Komplikationen | Complications | Watch face | Kalorien übrig, Kalorien gegessen, Wasserfortschritt | watchWidgets/WatchIntakeWidgets.swift | |
| J10 | Widgets-Hilfe | Widgets (help page) | Settings > Darstellung > Widgets | How to add to Home/Lock Screen | SettingsRootView.swift | |
| J11 | Watch-Hilfe | Apple Watch App (help page) | Settings > Darstellung > Apple Watch App | Usage, install, complications | SettingsRootView.swift | |
| J12 | Siri/Shortcuts: Wasser | Log Water | Siri | "Wasser in Intake eintragen / hinzufügen" | DiaryIntents.swift | NEW |
| J13 | Siri: Gewicht | Log Weight | Siri | "Mein Gewicht in Intake eintragen" | DiaryIntents.swift | NEW |
| J14 | Siri: Kalorien übrig | Calories Left | Siri | "Verbleibende Kalorien in Intake" (speaks and shows) | DiaryIntents.swift | |
| J15 | Siri: Fasten starten/beenden | Start/End Fast | Siri | see D9 | DiaryIntents.swift | |
| J16 | Siri: Lebensmittel | Log Food | Siri | see B34 | DiaryIntents.swift | |
| J17 | Watch/Widget Wasser ohne App | Water via widget/watch | - | Written through shared write layer | Core/Widgets/AdjustWaterIntent.swift | NEW |
| J18 | Widgets folgen App-Sprache | Widgets follow in-app language | - | Macro labels full names | Core/Widgets/WidgetLocalization.swift | NEW |
| J19 | Mitteilungs-Banner in der App | In-app banners | notifications | Banner, tap opens right screen | Features/App/NotificationResponder.swift | NEW |
| J20 | Deep links | App open routes | widgets/controls | today, fasting, quickLog(meal), foodSearch(tab), intakeAI(chat/camera), waterQuickLog, openProduct | Features/App/AppOpenRoute.swift | |

## N. Settings (every screen and toggle)  [N1-N74]
| ID | DE | EN | Where | What | File | New |
|---|---|---|---|---|---|---|
| N1 | Neu in dieser Version / Was ist neu? | What's New | top of Settings | Card with release overview | SettingsSectionViews.swift | |
| N2 | Körperdaten | Body Data | Settings > Profil & Ziele | see C1 | SettingsEditSheets.swift | |
| N3 | Kalorien | Calories | same | see C2-C12 | SettingsEditSheets.swift | |
| N4 | Makro-Ziele | Macro goals | same | see C13-C14 | SettingsEditSheets.swift | |
| N5 | Aktivität: Aktivität zum Ziel addieren | Add activity to target | Settings > Aktivität | toggle | SettingsSectionViews.swift | |
| N6 | Aktivität: Aktivitätsquelle | Activity source | same | Alle Aktivität / Nur Workouts | | |
| N7 | Aktivität: Anteil der Aktivitätskalorien | Activity calories counted | same | slider 0-100 % | | |
| N8 | Fasten: Fasten-Tab aktivieren | Enable fasting tab | Settings > Fasten | toggle | | |
| N9 | Fasten: Erste Mahlzeit | First meal time | same | time | | |
| N10 | Fasten: Letzte Mahlzeit | Last meal time | same | time | | |
| N11 | Fasten: Live-Aktivität anzeigen | Show Live Activity | same | toggle | | |
| N12 | Fasten: Benachrichtigen, wenn Essen startet | Notify when eating starts | same | toggle | | |
| N13 | Fasten: Benachrichtigen, wenn Fasten startet | Notify when fasting starts | same | toggle | | |
| N14 | Mitteilungen: Mitteilungsberechtigung | Notification permission | Settings > Mitteilungen | Status Erlaubt / Verweigert / Nicht angefragt + "iOS-Einstellungen öffnen"; permission asked only when you enable a reminder | NotificationsSettingsView.swift | |
| N15 | Mitteilungen: Wasser-Erinnerungen Modus | Water reminders mode | same | Aus / Benutzerdefiniert / Smart (Beta) | | |
| N16 | Mitteilungen: Tagesbeginn / Tagesende | Wake start / Wake end | same | wake window for water reminders | | |
| N17 | Mitteilungen: Intervall | Interval | same | minutes between custom reminders | | |
| N18 | Mitteilungen: Smart Wasser | Smart water | same | Adjusts to how far ahead/behind hydration is (Beta) | | |
| N19 | Mitteilungen: Mahlzeit-Erinnerungen aktivieren | Enable meal reminders | same | master toggle + per-meal toggles/times (built-in meals default times; custom meals off until enabled) | | |
| N20 | Mitteilungen: Erinnerungen über heute hinaus | Reminders reach past today | automatic | Meal and water reminders planned ahead; nightly background refresh keeps them planned | Features/App/DailyRefreshScheduler.swift | NEW |
| N21 | Darstellung: Heute - Zwischen Tagen wischen | Swipe between days | Settings > Darstellung | toggle | SettingsSectionViews.swift | |
| N22 | Darstellung: Kalorienring nach Status färben | Color calorie ring by status | same | toggle | | |
| N23 | Darstellung: Kalorienstatus in der Tagesleiste anzeigen | Show calorie status in day strip | same | toggle | | |
| N24 | Darstellung: Fotos verwenden | Use photos | same | master; photos stay stored when off | | |
| N25 | Darstellung: Fotos auf Heute zeigen | Show photos on Today | same | toggle (needs N24) | | |
| N26 | Darstellung: Fotos bei einzelnen Zutaten | Photos on single ingredients | same | toggle (needs N25) | | |
| N27 | Darstellung: Design | Theme | same | Hell / Dunkel / System | | |
| N28 | Darstellung: Akzentfarbe | Accent Color | same | 5 default + "Mehr Farben" (coral, teal, indigo, violet, amber, gray, green, brown, red, orange, blue, mint, pink, cyan) | | |
| N29 | Darstellung: App-Icon | App Icon | same | Standard, Dunkel, Korallverlauf, Korallverlauf Weiss, Schwarz-Weiss Hell/Dunkel | | |
| N30 | Darstellung: Widgets | Widgets | same | help page J10 | | |
| N31 | Darstellung: Apple Watch App | Apple Watch App | same | help page J11 | | |
| N32 | Region: Sprache | Language | Settings > Region & Einheiten | English, Deutsch, Español, Français, Português, Italiano, Nederlands, 日本語; whole app, widgets, watch follow it; numbers/dates use app locale | AppLocalization.swift | NEW (app locale everywhere) |
| N33 | Region: Maßeinheiten | Measurements | same | Metrisch / Imperial | | |
| N34 | Region: Lebensmittel-Datenbank Land | Food database country | same | see B33 | | |
| N35 | Region: Ich kaufe auch ein in … | I also shop in… | same | multiple extra regions or "Keine" | | |
| N36 | Intake AI: Einrichtung | AI setup | Settings > Intake AI | choose Abo / eigener API-Schlüssel / ohne KI | | |
| N37 | Intake AI: Abo-Status, Abo anzeigen/verwalten, Käufe wiederherstellen | Subscription | same | | | |
| N38 | Intake AI: Anbieter, Modell, API-Schlüssel speichern/löschen | Provider, Model, API key | same | OpenAI / Claude / Gemini; key stored in device Keychain; "Was ist ein API-Schlüssel?" link | | |
| N39 | Apple Health: Apple Health verwenden | Use Apple Health | Settings > Apple Health | toggle | SettingsRootView.swift | |
| N40 | Apple Health: Gewicht synchronisieren | Sync weight | same | toggle | | |
| N41 | Apple Health: Kalorien aus Schritten schätzen | Estimate calories from steps | same | toggle | | |
| N42 | Apple Health: Workouts ohne Doppelzählung | Count workouts without overlap | same | toggle | | |
| N43 | Apple Health: Wasser aus anderen Apps | Water from other apps | same | toggle | | |
| N44 | Apple Health: Gewichtsverlauf importieren | Import weight history | same | action | | |
| N45 | Apple Health: Letzten Monat aktualisieren | Refresh last month | same | action | | |
| N46 | Apple Health: Berechtigungen erneuern | Renew permissions | same | action | | |
| N47 | iCloud: iCloud-Sync aktivieren | Enable iCloud Sync | Settings > iCloud-Sync | toggle | | |
| N48 | iCloud: Fotos synchronisieren | Sync photos | same | toggle | | |
| N49 | iCloud: Jetzt synchronisieren / Aus iCloud laden / Alle Geräte neu abgleichen | actions | same | | | |
| N50 | iCloud: Backup exportieren / importieren | actions | same | | | |
| N51 | iCloud: iCloud-Daten löschen | Delete iCloud data | same | destructive, with confirmation | | |
| N52 | PDF-Bericht exportieren: Format | Format | Settings > PDF-Bericht exportieren | PDF or "Für KI (Markdown)" | PDFReportExportSheet.swift | |
| N53 | PDF: Zeitraum / Zeitraumsvorgabe / Start / Ende | Date range | same | presets + custom dates | | |
| N54 | PDF: Enthaltene Abschnitte | Included sections | same | calorie summary, macros, hydration, weight, workouts, day overview, meal totals | | |
| N55 | PDF: Mahlzeitenoptionen - Uhrzeiten anzeigen | Show meal times | same | toggle | | |
| N56 | PDF: Erstellen | Generate | same | renders in background, opens in preview | Core/Reports | NEW (background render) |
| N57 | Daten: Daten exportieren | Export data | Settings > Daten | JSON of profile, logs, products, recents, recipes, body measurements | SettingsDataTransfer.swift | |
| N58 | Daten: Daten importieren | Import data | same | JSON import replaces local data | | |
| N59 | Daten: Debug-Log exportieren | Export debug log | same | support log file | Core/Debug/DebugLogExport.swift | |
| N60 | Daten: App zurücksetzen | Reset app | same | deletes profile, logs, recipes, products on this device (iCloud kept; use "iCloud-Daten löschen") | | |
| N61 | Über Intake | About | Settings > Über Intake | note from Tobi, links | | |
| N62 | Feature-Tour | Feature Tour | Settings | replays intro | | |
| N63 | Wissenschaftliche Quellen | Scientific sources | Settings > Rechtliches & Support | | | |
| N64 | Nutzungsbedingungen / Datenschutzerklärung | Terms / Privacy | same | | | |
| N65 | Kontakt / Vorschläge & Bugs / App bewerten | Contact / Ideas & Bugs / Rate app | same | support mail lists app, iOS version, device, language | | NEW (support mail info) |
| N66 | Wochenbudget (Schalter) | Weekly budget | Settings > Kalorien > Tages- und Wochenziele | see C7 | | NEW |
| N67 | Modus Automatisch/Manuell | Mode | same | see C8 | | NEW |
| N68 | Tagesabhängige Kalorienziele aktivieren | Enable day-based targets | same | see C10 | | |
| N69 | Wochentagsregeln | Weekday rules | same | per weekday | | |
| N70 | Fixes Tagesziel | Fixed daily target | Settings > Kalorien > Erweitert | | | |
| N71 | Eigene Makros / erweiterte Ziele | Custom macros | Settings > Makro-Ziele | | | |
| N72 | Startgewicht | Starting weight | Settings > Körperdaten | | | |
| N73 | Wasserziel / Glasgröße | Water goal / glass size | Heute > Wasser (not in Settings) | | | |
| N74 | Mood, section visibility | via Heute-Seite bearbeiten | not in Settings | | | |
