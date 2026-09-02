---
version: "2.6.2"
publishedAt: "2026-09-02"
title: "What's new in Intake 2.6.2"
summary: "A new button deletes your Intake data in iCloud. Also: tags survive the daily library refresh, Health fills in your birthday, and no more freezes after switching to Health"
coverImage: "./assets/cover.svg"
highlights:
  - "iOS: New: Delete iCloud data, a button in the iCloud settings"
  - "iOS: Tags no longer vanish after the daily library refresh"
  - "iOS: Hidden frequent foods and removed favourites no longer come back"
  - "iOS: Onboarding really takes your date of birth and sex from Health now"
  - "iOS: No more freezes when switching between Intake and Health"
  - "iOS: The reset confirmation says that iCloud data stays, and where to delete it"
  - "iOS: Includes every fix from 2.6.1"
---

## New: Delete iCloud data

The iCloud settings now have a "Delete iCloud data" button. It removes everything Intake stored in iCloud: profile, diary, library, recipes, products and body measurements. The data on your device stays, and iCloud sync is switched off so nothing is uploaded again. Other devices keep their own copies; if their sync is on, they upload their data again.

The button is deliberately separate from the reset: the reset clears only this device and now says so. If you want both, that is two taps.

## Your tags stay

A user reported that all of their tags vanished twice within two days. Their debug log showed the cause: once a day, Intake checks your saved foods against the database so corrected nutrition values reach you. While doing that, the app rewrote the list and left the tags behind. The same happened to frequent foods you had hidden and to removed favourites: after the refresh, they were back.

All three now survive the refresh. If this hit you, I am sorry. The app cannot restore lost tags, as they live only on your device.

### iOS

- Tags on your foods could vanish after the daily library refresh. They now stay.
- Hidden frequent foods and removed favourites came back after the same refresh. They now stay the way you set them.

## Three more bugs from a test report

Another user spent a few days testing Intake thoroughly with Apple Health and sent a list. Three items from it are fixed here; the bigger ones get an update of their own.

### iOS

- Onboarding asked Health for your date of birth and sex but never had permission to read them, so the form stayed on a default birth year. Intake now asks for both permissions, and the values arrive.
- Switching to Health and back could start a second refresh on top of the one still running. With many diary days, the app then froze for seconds. One refresh runs at a time now.
- The reset confirmation promised to delete your data in iCloud too. The app never did that, and the data came back with the next sync. The confirmation now says what really happens: this device is cleared, iCloud data stays, and it points to the new button in the iCloud settings.

## In case you missed 2.6.1 or 2.6.0

On iOS, 2.6.2 also includes every fix from 2.6.1: the empty screen after a barcode scan, shifting search results, the switch between barcode and Meal Scan, unknown barcodes opening as a new product, and tenths of a gram in weight fields. The details are in [What's new in Intake 2.6.1](/en/whats-new/2.6.1).

And if you are coming straight from 2.5: 2.6.0 was the biggest release in a long time, with the new Library, the rebuilt add food screen, and spoons, cups and glasses as units. The whole story with screenshots is in [What's new in Intake 2.6.0](/en/whats-new/2.6.0).

You can find the full changelog [here](https://featurevoting.tobibechtold.dev/app/intake/changelog).

Thank you for using Intake.

Tobi
