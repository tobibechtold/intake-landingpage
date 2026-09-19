---
version: "2.7.1"
publishedAt: "2026-09-19"
title: "What's new in Intake 2.7.1"
summary: "A bug-fix update. On Android: suggestions offer the same portions as your favourites, a failed Health Connect sync no longer asks for permissions you have already granted, and your age updates on your birthday"
coverImage: "./assets/cover.svg"
highlights:
  - "Android: Suggestions offer the same portions as favourites and frequent foods"
  - "Android: Health Connect no longer asks for permissions you have already granted"
  - "Android: One unreadable Health Connect record no longer blocks steps and calories"
  - "Android: Your age in Settings updates on your birthday"
---

## Bug fixes

### Android

- A food opened from Suggestions offered a custom amount only, while the same food from Favourites or Frequent showed its portions. Suggestions now offer the same portions, for example a small, medium or large apple, or a slice of bread.
- Health Connect: when a sync failed, Settings said "Health Connect permissions are required" although every permission was granted, and granting them again changed nothing. Intake now says that the sync failed.
- Health Connect: a single record Intake cannot read, such as a workout from another app, stopped the whole sync. Steps, calories and everything else now come through anyway.
- If the problem persists, "Export debug data" under Health Connect activity now contains the last error. Send me the file and I can see what is wrong.
- Your age in the Settings overview did not change on your birthday. It is now calculated from your date of birth, like your calorie targets.

You can find the full changelog [here](https://featurevoting.tobibechtold.dev/app/intake/changelog).

Thank you for using Intake.

Tobi
