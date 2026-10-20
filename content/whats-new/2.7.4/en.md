---
version: "2.7.4"
publishedAt: "2026-10-21"
title: "What's new in Intake 2.7.4"
summary: "On iOS, iCloud sync is rebuilt: changes from your other devices arrive by themselves within seconds, and your tags and meals now sync too. Recipes show their photos when you log, plus ten fixes, among them for Suggestions, water and large text."
coverImage: "./assets/cover.svg"
highlights:
  - "iOS: iCloud sync is rebuilt, changes arrive within seconds"
  - "iOS: Tags and meals sync between your devices"
  - "iOS: Recipe photos when you add food"
  - "iOS: Suggestions log the right calories every time"
  - "iOS: Water from the widget, Apple Watch and Siri counts exactly once"
  # ANDROID: add highlights here, prefixed with "Android: "
---

## New on iOS: iCloud sync

Sync between your devices is rebuilt from the ground up. Whatever you log, change or delete on your iPhone shows up on your iPad within seconds, without tapping anything, switching days or restarting the app. A device that isn't in use picks up the changes the next time you open it.

Your tags and your meals now sync too. The layout of Today stays per device, so your iPad can look different from your iPhone.

The first time you open 2.7.4, Intake moves your data into the new sync once, in the background. It usually takes seconds. With a lot of data, a small screen shows the progress. You can close it and keep using Intake as usual.

The new sync needs Intake 2.7.4 on all your devices. A device on an older version syncs again once you update it, and nothing is lost.

If something looks different on one device than on another, go to Settings, iCloud, "Resync all devices". Intake then syncs everything once more in full and deletes nothing.

Data from Apple Health stays on each device as before and never goes to iCloud.

## Recipe photos when you log

Your recipes now show their photos when you add food under "Recipes", just like in your Library, so you spot the dish at a glance.

## Bug fixes

### iOS

- **Suggestions with the right calories.** An entry from Suggestions logs the amount and the calories that belong to it, however often you log it again.
- **Water counts once.** Water from a widget, your Apple Watch or Siri is counted exactly once.
- **The smart water reminder waits.** After a glass from the widget or Siri, Intake doesn't remind you to drink right away.
- **The complication stays current.** The complication on your Apple Watch shows your numbers shortly after every change on your iPhone.
- **Burned in Stats.** The Burned tile shows your activity calories as Today does, and below it how much of them counts toward your target.
- **Drink recipes count as water.** A recipe marked as a drink counts toward your water goal when you log it.
- **Search stays open.** When you delete your search word, the search stays open and you just keep typing.
- **Portions with two decimals.** 1.75 portions stay 1.75, also when you edit an entry later.
- **Easy to read with large text.** Today, Stats and your food lists stay readable with large text and Display Zoom, and long names get more lines.
- **Your birthday stays the same.** Your date of birth is the same day on all your devices, also in another time zone.

### Android

<!-- ANDROID: add rows here -->

As always, you can find the full changelog [here](https://featurevoting.tobibechtold.dev/app/intake/changelog).

Thank you for using Intake.

Tobi
