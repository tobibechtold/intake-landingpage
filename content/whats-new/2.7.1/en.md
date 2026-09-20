---
version: "2.7.1"
publishedAt: "2026-09-19"
title: "What's new in Intake 2.7.1"
summary: "Mostly bug fixes. On iOS: the week strip above Today stays on the current week, workouts you deleted in Garmin or Health leave Intake too, and the scanner no longer sits sideways on an iPad in landscape. On Android: suggestions offer the same portions as your favourites, a failed Health Connect sync no longer asks for permissions you have already granted, your age updates on your birthday, Intake AI no longer crashes on very large photos, portions under one gram count correctly, and an unfinished new recipe is kept as a draft"
coverImage: "./assets/cover.svg"
highlights:
  - "iOS: The week strip above Today opens on the current week and puts itself right"
  - "iOS: Workouts deleted in Garmin or Health disappear from Intake too"
  - "iOS: On iPad the scanner follows the way you hold the device"
  - "Android: Suggestions offer the same portions as favourites and frequent foods"
  - "Android: Health Connect no longer asks for permissions you have already granted"
  - "Android: One unreadable Health Connect record no longer blocks steps and calories"
  - "Android: Your age in Settings updates on your birthday"
  - "Android: New: An unfinished new recipe is kept as a draft"
  - "Android: Intake AI no longer crashes on very large photos"
  - "Android: Portions under one gram, such as tablets, count at their real weight"
---

## New on Android: recipe drafts

A new recipe you are putting together is now saved to your device as you go. If the app is closed, crashes or the phone restarts, everything is back the next time you create a recipe: name, notes, portions and ingredients. The draft goes away once you save the recipe or confirm discarding it. Editing an existing recipe has no draft; its saved version stays as it is.

## Bug fixes

### iOS

- **The week strip stays on this week.** The strip of days above Today could open a few days off, or straight on next week, and then stay that way. It mostly hit people who turned "Swipe between days" off. The strip now opens on the current week, and if it does slip, it puts itself right. The week only changes when you swipe it yourself or tap "Today".
- **Deleted workouts disappear.** A workout you deleted in Garmin, Apple Health or another app stayed in Intake and kept counting towards your burned calories, in the statistics too. Intake now checks with Health which workouts still exist and removes the others. Workouts you entered in Intake yourself are left alone.
- **Scanner in landscape on iPad.** With the iPad held sideways the barcode scanner's camera image was turned by 90 degrees. It now follows the way you hold the device, in Split View as well, and photos for Intake AI arrive upright.
- After closing Settings, Intake no longer rebuilds the Today screen every time, only when you changed the accent colour or the appearance.

### Android

- A food opened from Suggestions offered a custom amount only, while the same food from Favourites or Frequent showed its portions. Suggestions now offer the same portions, for example a small, medium or large apple, or a slice of bread.
- Health Connect: when a sync failed, Settings said "Health Connect permissions are required" although every permission was granted, and granting them again changed nothing. Intake now says that the sync failed.
- Health Connect: a single record Intake cannot read, such as a workout from another app, stopped the whole sync. Steps, calories and everything else now come through anyway.
- If the problem persists, "Export debug data" under Health Connect activity now contains the last error. Send me the file and I can see what is wrong.
- Your age in the Settings overview did not change on your birthday. It is now calculated from your date of birth, like your calorie targets.
- Intake AI: a very large photo, for example from a 50-megapixel mode, or a photo that could not be read, could close the app without a message. Photos are now loaded only as large as needed, and an unreadable photo shows an error in the chat.
- A portion under one gram, for example a 0.25 g tablet, was logged as 1 g, with four times the nutrients. It now counts at its real weight, and the product form takes two decimals for a portion weight.
- The name of a quickly created entry could only be changed on its first edit. It can now be changed at any time.
- The fasting notification rebuilt itself every second in the background. It now only updates when the minute it shows changes.

You can find the full changelog [here](https://featurevoting.tobibechtold.dev/app/intake/changelog).

Thank you for using Intake.

Tobi
