---
version: "2.8.0"
publishedAt: "2026-10-26"
title: "What's new in Intake 2.8.0"
summary: "With the weekly budget, your week counts instead of every single day, and the new month calendar shows how your month went. Intake AI has a new design, and the new help center explains every feature for iPhone and Android. On iPhone, reminders, the Live Activity, widgets and Apple Watch now keep going even when Intake is closed."
coverImage: "./assets/cover.svg"
highlights:
  - "iOS: on a half-open iPhone Duo the columns meet at the fold"
  - "iOS and Android: weekly budget, your calories spread across the whole week"
  - "iOS and Android: a month calendar that shows how each day went"
  - "iOS and Android: Intake AI in a new design"
  - "iOS: reminders and the Live Activity keep running on their own"
  - "iOS: widgets and Apple Watch in the style of Today, water and weight even with the app closed"
  - "iOS and Android: a new help center with a guide for every feature"
  - "Android: the meal widget opens its search straight away"
---

## iPhone Duo

Half open, the two columns of Today meet exactly at the fold, and Stats puts the gap between its tiles on the fold. No card or text sits under the crease.

## Weekly budget

Not every day is the same. With the weekly budget, what counts is the sum of your day goals from Monday to Sunday: whatever you don't eat one day stays available for the week, and a dinner out with friends evens out over the other days. On iPhone, turn it on under Settings, "Daily and weekly goals". On Android, it's under Settings, "Calories".

With "Spread automatically", Intake spreads calories you have left over, or ate on top, evenly across the remaining days. With "Manually", your day goals stay as planned and you move the balance yourself. On Today, the "Week" row shows how much you have left this week. Tap it to see the week day by day, and mark a past day with no entries as "Ate nothing".

In "Adjust day target" you choose where the calories come from: "On top", "From the other days" or "From the weekly balance". No day ever drops below your resting metabolic rate, and never below 1,200 kcal.

The help center explains it all in detail under [Weekly budget](https://docs.getintake.de/en/weekly-budget/).

## Month calendar

Tap the calendar on Today to see the whole month at a glance. Every day has a small ring that fills just like the big ring on Today, in green, orange or red, and the top of the month tells you how many days ended up in each color. Tap a day to jump straight to it.

## Intake AI in a new design

The Intake AI chat has a new design, and so does the result card, for a more modern look.

## See what's left while you add food

When you add food, you always know how much is left for the day: it sits right under the title.

The big number in search is now per 100 g, or per 100 ml for drinks, so you can compare products directly, with the portion underneath. On iPhone you can also keep as many favorites as you like.

## Reminders and the Live Activity on iPhone

Meal, water and fasting reminders are planned for the next few days and still arrive if you don't open Intake for a while. On a water reminder, "+250 ml" logs your glass without opening the app, using your own glass size. Tapping a reminder takes you to the right place: the search for that meal, Today or Fasting. If Intake is open, the reminder shows up as a banner.

The fasting Live Activity keeps moving on the Lock Screen and in the Dynamic Island on its own, bar, ring and countdown, and switches to the next phase by itself when one ends. Swipe it away and it stays away until the next phase.

## Widgets, Apple Watch and Siri

The "Calories Left" widget now looks like the calorie ring on Today, shows the same goal as Today, and uses the language you set in Intake. At midnight, widgets and Apple Watch move on to the new day by themselves.

Water and weight from your Apple Watch, a widget or Siri go straight into Intake, Apple Health and your other devices, even when Intake is closed on your iPhone.

## Always up to date

Whatever changes in Apple Health, like a new weight from your scale or a deleted workout, reaches Intake by itself, in the background too. If you don't want to wait, pull down on Today or in Stats: Intake reads Apple Health or Health Connect again right away, and on iPhone it also brings in the changes from your other devices.

On iPhone your fasting now syncs through iCloud too. Start a fast on your iPhone and it runs on your iPad as well. Reminders stay on the device where you turned them on.

## Weight, numbers and times

For weight, Stats now shows your 7-day average as a line and as a value, "7-day avg". You can show or hide it.

Numbers and dates follow the language you set in Intake, and times follow your phone's 12/24-hour setting.

## The new help center

[docs.getintake.de](https://docs.getintake.de/en/) now explains every Intake feature step by step, with pictures from iPhone and Android. You reach it from Settings with the help button at the top, and with "Learn more" under many settings, such as the weekly budget, calories and Intake AI.

## Bug fixes

### iOS

- **Your weight is saved.** However you close the keyboard after typing your weight, it is saved, in Apple Health too.
- **Weight change from the first weigh-in.** "Change" in Stats counts from the first weigh-in of the period, in the year view too.
- **A tidy Apple Health.** When you edit a weight or a measurement, Apple Health keeps only the new value. Delete an entry on your iPad and it also leaves Apple Health on your iPhone.
- **Ingredients with your own key.** With your own OpenAI key and gpt-5.4, Intake AI breaks your meal down into its ingredients too.
- **Stats in large text.** Tile numbers stay on one line, with the unit underneath.
- **Proper plurals.** 1 serving, 2 servings, in every language.
- **PDF report in a preview.** The PDF report is prepared in the background and opens in a preview.
- **A calm water wave.** With Reduce Motion on, the water wave on Today stands still.

### Android

- **The widget opens the meal.** In the "Quick Log Meal" widget, tapping a meal opens its search straight away, even when the app was closed.
- **Fasting across the clock change.** A fast that spans the daylight saving change shows its real duration.
- **Stats in large text.** Labels wrap onto two lines, and the tiles in a row are the same height.
- **Shared recipes in your language.** When you open a shared recipe, the question and the nutrients are in your language.
- **A clear message on import.** If a meal or recipe can't be imported, Intake shows a message you can understand.
- **The right words.** "1 other beverage", "No ingredients yet" for a recipe without ingredients, and language names with their accents: Español, Français, Português.
- **TalkBack.** TalkBack reads the buttons for sending, favorites, the water goal and Health Connect sync correctly.

As always, you can find the full changelog [here](https://featurevoting.tobibechtold.dev/app/intake/changelog).

Thank you for using Intake.

Tobi
