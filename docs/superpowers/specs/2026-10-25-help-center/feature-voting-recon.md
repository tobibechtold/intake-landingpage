# Help center recon: feature-voting posts answered by existing features

Source: feature-voting app "intake" (iOS + Android), read-only. All ids are INTAKE-<number>.
Method: all 721 posts scanned by title and description; comments read via get_feedback for about 115 posts (all closed/declined ones that looked like a question or an existing feature, plus the open ones that looked the same). Posts without a comment from Tobias are listed as "likely" only where title/description make it clear. Comment reading was NOT exhaustive for the 482 completed posts (many are plain bugs).

## 1. Ranked help topics

### 1. Copy a meal or single entries to another day ("Mahlzeit kopieren" / Copy a meal)
Title DE: Mahlzeiten und einzelne Einträge auf einen anderen Tag kopieren
Title EN: Copy a meal or single items to another day
Posts: about 14 (confirmed by Tobias: 423, 620, 479; request threads on the same feature: 10, 125, 194, 321, 429, 189, 373, 407?, 561, 557, 625, 128). Open duplicates still being asked: 479 (open), 557, 561, 625
Platform: both (feature requests, no platform set)
Confusion: users look at the single entry for a copy button, or ask for it as a new feature.
Existing answer: tap the meal name (e.g. Frühstück) at the top of the meal sheet, then the three-dots menu, then "Mahlzeit kopieren". You choose with checkmarks which items to copy and the target day and meal. Tobias: "ist ein bisschen versteckt, du warst nicht der erste". Meal copy shipped in 2.1.x; 189 and 373 refined it (item selection, today preselected).

### 2. Change the date, time or meal of an entry (move an entry)
Title DE: Eintrag auf anderen Tag oder andere Mahlzeit verschieben / Datum ändern
Title EN: Move an entry to another meal or day
Posts: 6 confirmed or closely related: 660, 721, 479, 211, 68, 693 (open, "Verschieben"), plus 268 (time of a whole meal)
Platform: both
Confusion: user logged on the wrong day and cannot find a way to fix it.
Existing answer: tap the entry, scroll down in the detail sheet, there is the meal list (move to another meal) and the time. A date change is only possible through the meal three-dots menu "kopieren" to another day, then delete the old entry (479: a real date field on the entry does not exist, "nicht unerheblich der Aufwand"; 660 user could not find a date field, which is correct). 721 (Oct 2026): "tap on the meal, three dots, copy/move".

### 3. Activity, steps and workouts: where they come from and how they are counted
Title DE: Aktivität, Schritte und Workouts: woher sie kommen und wie sie zählen
Title EN: Activity, steps and workouts: where they come from and how they are counted
Posts: about 20. Confirmed by Tobias: 664, 465, 300, 535, 221, 271, 253, 649, 387, 191?; related/likely: 348, 398, 329, 320, 292, 156, 330, 396, 387, 418, 508, 512, 392, 455, 471
Platform: both (iOS Apple Health, Android Health Connect)
Confusion: "my workout calories are missing / doubled", "I use Garmin/Fitbit/Strava/Pixel Watch, how do I get it in", "I can't enter steps by hand", "Aktivitätskalorien sind zu viel".
Existing answers:
- Intake only reads Apple Health (iOS) or Health Connect (Android), never Google Health, Garmin Connect or Strava directly. Anything that writes to Health/Health Connect shows up (271, 253, 221, 649). Garmin / Fitbit / Amazfit / Xiaomi requests were declined for that reason (164, 559, 179, 628, 359, 271).
- Manual workout can be added in the app if the watch does not write (221). Calories per manual activity can be typed in (526).
- Settings > Aktivität: choose all activity calories vs workouts only, and a percentage, or switch off entirely (300).
- Settings > Apple Health: "Workouts ohne Doppelzählung" (since 2.7.2), default off, avoids double counting of workouts that Apple Health already includes in active energy (664, 465). The "Einschließen/Ausschließen" toggle per workout is for the rare case the watch did not include the workout, otherwise it double counts (465: user asked for a help text).
- Health Connect settings: steps to kcal "Auto/Ein/Aus", source "Automatisch/Bevorzugt" and pick the right source (535, 649). Android needs the data to land in Health Connect, not just Google Health (649).
- Steps can be converted to kcal (2.3.2, 398, 329, 320).

### 4. How the daily calorie goal is built (maintenance, deficit, daily delta, per-day goals, rest energy)
Title DE: Wie das Kalorienziel berechnet wird (Grundumsatz, Defizit, Tagesdelta, Ruheenergie)
Title EN: How the daily calorie goal is calculated (BMR, deficit, daily delta, resting energy)
Posts: about 14. Confirmed by Tobias: 698, 528, 291, 507, 506, 41, 300, 412; likely: 23, 421, 358, 580, 584, 550, 217, 663 (Android, one-off goal not shown), 437, 139, 45
Platform: both (Apple Health resting energy is iOS only)
Confusion: "why does the Intake maintenance differ from Apple Health", "where do I set a deficit", "my one-off delta does not appear as remaining in the statistics", "I want different goals on different days".
Existing answers:
- Either let the app calculate (from body data) or enter your own BMR/TDEE; deficit is a separate setting (291).
- Resting energy from Apple Health (since 2.4.4, 412/292): average of the last 7 complete days, today does not count; with fewer than 3 days of data it falls back to the estimate from body data; Apple Health weekly view includes today and therefore differs (528).
- Switching modes only changes today and future days, not past days (507; user disagreed, so the explanation is unclear).
- Tagesziel/Tagesdelta (2.0.4 variable goals, "einmalig" delta since 2.7.x): the delta changes the goal itself, so a -300 delta already contains the deficit and does not appear again as "übrig" in the statistics (698).
- Variable goals per weekday replace a "calorie bank" / carry-over wish (41, 584, 550).

### 5. Plain quick-add: log calories without creating a food ("Nur schnell hinzufügen")
Title DE: Kalorien schnell erfassen ohne Lebensmittel anzulegen ("Nur schnell hinzufügen")
Title EN: Quickly log calories without creating a food
Posts: 8 asked as a feature although it exists: 142, 46, 61, 73, 76, 109, 17, 192; related complaints: 536, 695, 462, 644, 538, 337
Platform: both
Confusion: the "Erstellen" tab looks like it is only for building a food product.
Existing answer: Hinzufügen > Erstellen > "Nur schnell hinzufügen"; only name and kcal are required, macros are optional; it is not saved to the library (142). In the earlier version the product was saved, later a switch was added. A 0-kcal item (water, matcha in recipes) is made the same way once and reused (17). No cross-check between kcal and macros on purpose (536, "explizit so gewünscht von vielen").

### 6. Hide or rearrange parts of the Today screen (water, weight, meals, macros)
Title DE: Heute-Seite anpassen: Wasser, Gewicht, Mahlzeiten ausblenden
Title EN: Customise the Today screen: hide water, weight, meals
Posts: 7 confirmed: 87, 90, 162, 175, 673; related/likely: 37, 133 (statistics page edit), 223, 307
Platform: iOS mainly
Confusion: "can I switch off the water tracker / weight / meal slots".
Existing answer: scroll to the very bottom of Today, tap "Heute-Seite bearbeiten", untick or reorder cards (water, weight card etc.); you can disable all meal slots and create one custom meal (90, 87, 175, 162, 673). Not hideable: the "als Getränk markieren" switch while logging, because recipes need it (175). Weight card above the dashboard became allowed after 205.

### 7. Water: what counts, how to count coffee and drinks
Title DE: Wasser und Getränke: was zählt zum Wasserziel
Title EN: Water and drinks: what counts toward the water goal
Posts: 8: 673, 97, 54, 85, 577, 575, 150, 78, 202?, 181 (read water from Apple Health)
Platform: iOS mainly
Confusion: coffee/soft drinks do not raise the water count; amounts show grams not millilitres; "water from another app is not read".
Existing answers: mark the product as "Getränk" before logging so it counts toward water and uses ml (673, 97, 577, 575). Recipes can be marked as liquid (85). Intake writes water to Apple Health but does not read it back, because Health lets the last writer win instead of adding (181; since 2.4.4 reading was added back according to the status, confirm wording with Tobias before publishing). Drink stats include marked drinks (150).

### 8. Recipes: weight after cooking, raw vs cooked, own portions, copying and combining
Title DE: Rezepte: Kochverlust, roh/gekocht, Portionen, Kopieren
Title EN: Recipes: cooking loss, raw vs cooked, portions, copying
Posts: about 12: 101, 615, 549, 616, 15, 80, 119, 347, 349, 571, 413, 298, 380, 408, 581, 614 (open), 711 (open)
Platform: both (549 Android)
Confusion: the recipe weight is the sum of ingredients, but cooked food weighs less; users want to log 150 g of the finished dish; users want a combined coffee-with-milk; users do not find "copy recipe".
Existing answers: when logging a recipe, switch from portions to grams (101, Mar 2026). Untick "errechnetes Gewicht verwenden" in the recipe to type the real cooked weight (615, shipped 2.7.3). Raw/cooked toggle for rice, pasta etc. shipped 2.7.3 (616). To combine things like milk coffee, create a recipe (571, 413); routines were added in 2.6.0. Recipes can be copied (shipped 2.3.2: 347, 349) and sorted (346, 2.5.0). Logging a recipe "Jede Zutat" shows and lets you edit each ingredient (298, 380, 408), while "Ein Eintrag" cannot be split afterwards (614 still open).

### 9. Portion sizes and units (g, ml, Stück, EL, custom portions)
Title DE: Portionsgrößen und Einheiten
Title EN: Portion sizes and units
Posts: about 10: 102, 97, 175?, 399, 577, 575, 116, 130, 118, 543, 438, 562, 592, 403, 176
Platform: both
Confusion: "why only 100 g", "why does switching to portions turn 50 g into 0.5 portions", "can I add my own portion".
Existing answers: the app shows all portions of the database entry; own portions are added by editing the product (102). The app remembers the last amount since 2.1.4 (176). Switching g to portion converts the amount on purpose (399, closed as designed). Household measures (TL/EL/Tasse/Glas) shipped in 2.6.0 (577, 575). Amounts below 1 g shipped in 2.6.1 (592).

### 10. Meals: change defaults and use the history ("Zuletzt/Häufig/Favoriten")
Title DE: Mahlzeiten, Verlauf, Häufig und Favoriten
Title EN: Meals, history, frequent and favourites
Posts: about 12: 651 (feature already existed), 10, 182, 223, 224, 326, 312, 317, 361, 372, 11, 220, 228, 332, 331
Platform: both
Confusion: users ask for per-meal suggestions, auto-default meal by time of day, a daily standard breakfast.
Existing answers: "Zuletzt/Häufig" are contextual per meal (651, user withdrew the request); "Zuletzt" tab to re-add yesterday's ingredients (10); a standard breakfast every day can be built with an iOS Shortcut plus automation (182, Tobias declined a built-in). Newer routines (2.6.0) cover the repeated-meal wish (413, 571).

### 11. Weekly overview / carrying over calories ("Wochenbudget")
Title DE: Wochenübersicht und Kalorien übertragen
Title EN: Weekly view and carrying calories over
Posts: 401 (answered), 240, 207, 155 (planned 2.8.0, 21 votes), 41 (declined), 475, 624 (open), 652 (Android)
Platform: both
Confusion: users want a weekly goal and carry-over of unused or activity calories; the weekly sum already exists in the statistics.
Existing answers: the Statistics tab shows the kcal per week and average (401, 240, 294). Different goals per weekday cover an indirect "bank" (41). Carry-over (155) is planned for 2.8.0, so the help text should wait for that release. Not found in the data: a dedicated "weekly budget" post with Tobias's explanation; this exact term is not in any post title.

### 12. Statistics: how to read the numbers
Title DE: Statistik richtig lesen (Durchschnitt, Jahr, Zukunftstage, Verbrannt)
Title EN: Reading the statistics (average, year, future days, burned)
Posts: 294 (question), 283, 354, 384, 573, 60, 530, 583, 12, 573, 55, 170, 698, 427
Platform: both
Confusion: year view value, average counting days without full logging, "Überkalorien" when the goal changes by activity.
Existing answers: year view sums all values of the year (294); future days were excluded later (354, 384); average over tracked days (283). Later versions fixed several of them, so the help page should state the current rules.

### 13. Apple Health / Health Connect: what is read and what is written
Title DE: Apple Health und Health Connect: was gelesen und geschrieben wird
Title EN: Apple Health and Health Connect: what is read and written
Posts: about 12: 141, 181, 162, 271, 253, 510, 495, 494, 604, 654, 544, 549 (Android), 454/452/434 (0:00 timestamp, Android), 96
Platform: both
Confusion: "why are nutrition values and water from other apps not imported", "why does my watch data from another app not appear", "why are meals written at 00:00 to Health Connect".
Existing answers: Intake writes nutrition to Health but does not read nutrition or water from other apps because apps write nutrition unreliably (141: "Yazio schreibt einen Eintrag pro Tag"); body weight and activity are read; reading is one direction for nutrition (604, "aktuell nur in eine Richtung"); background sync is deliberately sparse (604); deletion in Intake updates Health Connect with a delay (544); for backup use iCloud / Google Drive backup or manual export (141).

### 14. AI food logging (Intake AI): providers, own API keys, why it picks Frühstück
Title DE: Intake AI: eigene API-Schlüssel, Anbieter und Voreinstellungen
Title EN: Intake AI: your own API key, supported providers and defaults
Posts: about 20, almost all wont_do or completed requests about providers: 441, 447, 443, 463, 483, 700, 666, 642, 635, 588, 553, 717, 718 (nutrition label scanner only with Intake AI), 707 (error with Claude key), 516, 464, 446, 449, 568, 613, 647
Platform: iOS mainly
Confusion: users do not know which providers work (ChatGPT, Claude, Gemini via own key), whether an Android or Pro plan covers API use (707: a Claude Pro chat plan is not an API key), why the AI always uses Frühstück.
Existing answer: Settings > Intake AI > own API key (OpenAI, Claude, Gemini); OpenRouter and OpenAI-compatible endpoints are not supported (wont_do 441, 463, 443, 447). Comments of Tobias for 707 were not read in detail (check). 

### 15. Cross-platform, iPad/Mac and sync questions
Title DE: Synchronisierung zwischen iPhone, iPad, Mac und Android
Title EN: Syncing between iPhone, iPad, Mac and Android
Posts: about 8: 269, 185, 124 (no iOS-Android sync), 353 (Mac app discontinued), 432, 662, 9, 106
Platform: both
Existing answer: sync is iCloud (Apple devices) and Google Drive backup (Android); there is no sync between iOS and Android; the Mac app was discontinued (353, 2026-07). Settings like maintenance calories are reported as not syncing across devices (432, wont_do; not an explained feature).

### Other small recurring answers
- Siri / Shortcuts: 689 open (user cannot trigger tracking with Siri; no help text exists), 182 (shortcut + automation for a daily standard meal), 77 (own product via shortcut). Siri phrases are fixed strings per memory notes; user needs the exact phrase.
- Widgets do not update by themselves (560): Apple only lets the app push data, no backend; open the app first.
- Where is the nutrient breakdown per meal: tap the meal name (146 diabetic request, 5, 324, 319). Confirmed answer in 146.
- Export: Settings > Daten exportieren (JSON, full diary, works for AI analysis, 91); PDF export (131, 172, 252, 196, 713, 719, 720).
- Recipe import from other apps: an import exists (129); a file format from other apps does not exist (25).
- Nutrient fields (micros, caffeine, vitamins, 177, 183, 265, 299): partially exist; 265 asks how to add micronutrients (answer not read).

## 2. Real gaps that need a "why it works this way" explanation (not existing features)

- 698 (declined, ios): Tagesdelta changes the goal, so it never shows as "übrig" in the statistics. Explained by Tobias, good FAQ item.
- 536 (declined, ios): "Nur schnell hinzufügen" does not validate kcal against macros; intentional, no calculator.
- 399 (declined, ios): switching g to portions converts the amount; designed so.
- 528 (declined, ios): resting energy average uses the last 7 complete days; Apple Health weekly view includes today.
- 101, 615, 549 (cooking weight): recipe weight is the sum of ingredients; the real weight must be typed in manually; Tobias: "unmöglich zu wissen wie sich jedes Produkt beim Kochen verhält".
- 560 (declined): widget updates only when the app has run, because Apple gives no push for widgets.
- 141, 181, 495, 494, 510 (declined / limited): why nutrition and water from other apps are not imported (unreliable data, Health's last-writer-wins for water).
- 41, 155, 207 (declined / planned): why there is no calorie bank; variable per-day goals instead (Tobias dislikes gamification).
- 175 (declined): "Als Getränk markieren" cannot be hidden because recipes use it.
- 187 (declined): confirm button at the top is the standard iOS sheet pattern.
- 144 (declined): Intake is a calorie counter, not a diet app; no goal-weight automation.
- 162 (declined): you cannot disable manual weight entry; hide the weight card instead.
- 353 (declined): Mac app discontinued, no Apple Health on Mac.
- Health Connect (Android) 392, 455, 508, 512, 387: calories come from whatever Health Connect contains; each writing app counts differently ("jede App kocht ihr eigenes Süppchen", 501). Sources "Bevorzugt" can be changed in settings (649).
- 465, 664: why the workout can be double counted (Apple Health already adds workout calories into active energy).
- 151 (declined, 7 votes): ring colour for over/under budget conflicted with the accent colour feature; ring colour is the accent colour, so no traffic-light colours (mentioned by Tobias).

## 3. Totals: posts scanned per status

| Status | Posts |
|---|---|
| completed | 482 |
| open | 160 |
| wont_do | 70 |
| planned | 9 |
| progress | 0 |
| **Total** | **721** |

Caveats:
- Comments were read for roughly 115 posts (all wont_do items that looked relevant plus selected completed and open items). Many completed posts have no comment from Tobias, so "already exists" is judged from the title only for those and marked "likely".
- Other apps (Feature Voting Tool, ThrowKit) were not scanned.
- Topic 11 ("weekly budgets") and the Android "Health Connect calories are an estimate" topic have no single canonical post with Tobias's explanation in what was read; the nearest evidence is 401, 41, 155, 501 and 649. A targeted comment read of the Android posts 387, 392, 455, 508, 512 would close that gap.
