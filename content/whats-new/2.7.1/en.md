---
version: "2.7.1"
publishedAt: "2026-09-19"
title: "What's new in Intake 2.7.1"
summary: "A bug-fix update. On iOS: the week strip above Today stays on the current week, workouts you deleted in Garmin or Health leave Intake too, and the scanner no longer sits sideways on an iPad in landscape. On Android: suggestions offer the same portions as your favourites, a failed Health Connect sync no longer asks for permissions you have already granted, and your age updates on your birthday"
coverImage: "./assets/cover.svg"
highlights:
  - "iOS: The week strip above Today opens on the current week and puts itself right"
  - "iOS: Workouts deleted in Garmin or Health disappear from Intake too"
  - "iOS: On iPad the scanner follows the way you hold the device"
  - "Android: Suggestions offer the same portions as favourites and frequent foods"
  - "Android: Health Connect no longer asks for permissions you have already granted"
  - "Android: One unreadable Health Connect record no longer blocks steps and calories"
  - "Android: Your age in Settings updates on your birthday"
---

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

You can find the full changelog [here](https://featurevoting.tobibechtold.dev/app/intake/changelog).

Thank you for using Intake.

Tobi
