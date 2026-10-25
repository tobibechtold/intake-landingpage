---
id: steps-workouts
title: "Steps and workouts"
short: "Intake reads steps, active calories and workouts from Apple Health or Health Connect. Garmin, Fitbit or Strava only show up when they write their data there."
related:
  - workouts-without-double-counting
  - health-read-write
  - calorie-goal
steps:
  - text: "On Today, tap the gear at the top, then “Apple Health”."
    ios:
      image: ./assets/en/ios/1.webp
    android:
      text: "On Today, tap the gear at the top and scroll to “Integrations”."
      image: ./assets/en/android/1.webp
  - text: "The first time, tap “Connect Apple Health” and allow access; after that the page shows “Use Apple Health”."
    ios:
      image: ./assets/en/ios/2.webp
    android:
      text: "Turn on “Use Health Connect” and allow access in Health Connect."
      image: ./assets/en/android/2.webp
  - text: "The “Activity” card on Today then shows active calories, steps, distance and your workouts."
    ios:
      image: ./assets/en/ios/3.webp
    android:
      image: ./assets/en/android/3.webp
  - text: "Tap a workout to include or exclude its calories from “Total burned”."
    ios:
      image: ./assets/en/ios/4.webp
    android:
      text: "If several apps write your activity, pick the one that counts under Settings > “Health Connect activity” > “Use only this app”."
      image: ./assets/en/android/4.webp
  - text: "No watch? Log a workout yourself with “Add” on the “Activity” card."
    ios:
      image: ./assets/en/ios/5.webp
    android:
      image: ./assets/en/android/5.webp
---

**Does activity count toward your goal?** You decide under Settings > “Activity”: whether activity raises your daily target, whether all activity or only workouts count, and how much of it.

**iPhone: workout counted twice?** Apple Health usually already includes workout calories in your active calories. With [“Count workouts without overlap”](/en/help/workouts-without-double-counting), a workout only adds the calories that are still missing there.

**iPhone without Apple Watch:** “Estimate calories from steps” under Settings > “Apple Health” steps in when Apple Health reports steps but no active calories.

**Android:** Intake only counts apps listed in Health Connect under “Data and access” > “Activity” > “Data sources and priority”. If your app writes no active calories, Intake estimates them from total calories or steps, see [“Why Health Connect calories are shown as an estimate”](/en/help/health-connect-estimate).
