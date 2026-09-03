---
version: "2.6.2"
publishedAt: "2026-09-02"
title: "What's new in Intake 2.6.2"
summary: "A new button deletes your Intake data in iCloud, and submitting a product for review works again, from the Library too. Also: no more freezes when scanning several products in a row, tags survive the daily library refresh, and Health fills in your birthday. On Android: a readable water widget, honest submissions, and PDF boxes that fit"
coverImage: "./assets/cover.svg"
highlights:
  - "iOS: New: Delete iCloud data, a button in the iCloud settings"
  - "iOS: Scanning several products in a row no longer freezes the product screen"
  - "iOS: Submit for review works from the Library, with label scanner, no-barcode option and a list of what is missing"
  - "iOS: Submitting your own product no longer duplicates it, and it shows up under Submissions"
  - "iOS: Tags no longer vanish after the daily library refresh"
  - "iOS: Hidden frequent foods and removed favourites no longer come back"
  - "iOS: Onboarding really takes your date of birth and sex from Health now"
  - "iOS: No more freezes when switching between Intake and Health"
  - "iOS: The reset confirmation says that iCloud data stays, and where to delete it"
  - "iOS: Includes every fix from 2.6.1"
  - "Android: The water widget stays readable at every fill level"
  - "Android: Sent submissions read “Pending”, not “not sent”"
  - "Android: The macro boxes in the PDF export fit on days with workouts"
  - "Android: Submit for review on My products closes after sending and can be cancelled"
---

## New: Delete iCloud data

The iCloud settings now have a "Delete iCloud data" button. It removes everything Intake stored in iCloud: profile, diary, library, recipes, products and body measurements. The data on your device stays, and iCloud sync is switched off so nothing is uploaded again. Other devices keep their own copies; if their sync is on, they upload their data again.

The button is deliberately separate from the reset: the reset clears only this device and now says so. If you want both, that is two taps.

## Scanning several products in a row

A user wrote in: since 2.6.1, scanning several ingredients one after another left the product screen with dead buttons. The amount could not be changed, the checkmark did nothing, and after a few seconds the screen closed on its own. I could reproduce it after four or five scans of the same product.

The cause was not the scanner. Every save after a scan wrote the library several times on the main thread, and by the third or fourth product those writes piled up until the screen could no longer react to a tap. Saving now runs in the background, one write at a time, and the screen stays usable however many products you scan.

### iOS

- Scanning several products in a row could leave the product screen frozen for seconds or close it on its own. Saving now runs in the background, and the screen stays responsive.

## Submit for review, rebuilt

Submitting a product for review was broken in more ways than one, and I found out while testing this very version. Creating a product from the Library had no nutrition label scanner, no way to send it in, and no "no barcode" option. Submitting one of your own products with a barcode that already exists left a second copy in My Products and nothing under Submissions. And the checkmark just greyed out without saying what was missing.

All of that is fixed. The product form is the same everywhere now, and it tells you what a submission still needs, right under the field.

### iOS

- Create a product in the Library and send it in from the same form, with the nutrition label scanner and a "no barcode" option.
- The form lists what is still missing before sending, name, barcode or brand, right where you fill it in, instead of a greyed-out checkmark.
- A barcode that is already in the database no longer creates a duplicate. The app tells you and opens that product for logging instead.
- Submitting one of your own products used to leave a second copy in My Products and nothing under Submissions. It now stays one product, appears under Submissions with its status, and the form says so if sending failed.

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

## Android: water widget, submissions and PDF export

Three reports from the feature voting, all three from 2.6.1 and all three fixed here. Thanks for reporting them.

### Android

- The water widget is readable again. The water was so bright and the surface line so white that the "3/7" line vanished into it as soon as the level reached it. The water is now a deeper blue gradient with a subtle surface, like on iOS, and the white text stays readable at every level. The preview when adding the widget also no longer shows placeholder bars under the text, and the Quick Log preview has dark tiles in dark mode now instead of white ones with invisible labels.
- Under Library › Submissions, a submission you had sent read "Kept on this device only; not sent". The catalogue calls a received submission "submitted", and the app only knew its own "pending" and treated everything else as not sent. Sent submissions now read "Pending".
- "Submit for review" on My products opened a form with no way back: the back arrow did nothing, and after sending, the form just stayed put even though the submission had long gone out. Opening the form had removed the screen underneath instead of stacking on top of it. The back arrow now returns to the list, the form closes by itself after sending, and the list confirms that the submission was sent, or says that it stayed on this device. While a submission is in review, the product reads "Pending" in the list and cannot be submitted a second time.
- Tapping a product in My products now opens the edit form directly, without a submission. Submissions lists each product once, with its latest attempt, instead of once per save. And a submission that did not go out now reads "Not sent" and says how to submit it again, instead of "On this device", which sounded like a rejection.
- Submitting a product whose barcode is already in the database did nothing on Save. A dialog now says the product already exists, with "Open product" (opens the existing product's log screen) and "Keep editing".
- In the PDF export, the macro boxes were too short on days with workouts, and the values spilled out of them. The overview now grows with the workout box, which lists up to three workouts instead of silently showing only the first. Going through the whole report turned up three small things that came along: long notes no longer run out of their box, the "kg" in the weight overview no longer overlaps the top value, and the date column is labelled "Date" instead of "Date range". A day without meals now says exactly that, instead of "no data in range".

## In case you missed 2.6.1 or 2.6.0

On iOS, 2.6.2 also includes every fix from 2.6.1: the empty screen after a barcode scan, shifting search results, the switch between barcode and Meal Scan, unknown barcodes opening as a new product, and tenths of a gram in weight fields. The details are in [What's new in Intake 2.6.1](/en/whats-new/2.6.1).

And if you are coming straight from 2.5: 2.6.0 was the biggest release in a long time, with the new Library, the rebuilt add food screen, and spoons, cups and glasses as units. The whole story with screenshots is in [What's new in Intake 2.6.0](/en/whats-new/2.6.0).

You can find the full changelog [here](https://featurevoting.tobibechtold.dev/app/intake/changelog).

Thank you for using Intake.

Tobi
