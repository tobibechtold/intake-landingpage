---
version: "2.6.2"
publishedAt: "2026-09-02"
title: "What's new in Intake 2.6.2"
summary: "A button to delete your iCloud data, submit for review working again, no more freezes when scanning several products in a row, and tags that survive the daily library refresh. On Android: a readable water widget, honest submissions, and a PDF export that fits"
coverImage: "./assets/cover.svg"
highlights:
  - "iOS: New: Delete iCloud data, a button in the iCloud settings"
  - "iOS: Scanning several products in a row no longer freezes the product screen"
  - "iOS: Submit for review works again, from the Library too"
  - "iOS: Tags, hidden foods and removed favourites survive the daily library refresh"
  - "iOS: Onboarding takes your date of birth and sex from Health"
  - "Android: The water widget stays readable at every fill level"
  - "Android: Submissions show their real status and can be sent from My products"
  - "Android: The PDF export fits on days with workouts"
---

## New on iOS: Delete iCloud data

The iCloud settings have a new "Delete iCloud data" button. It removes everything Intake stored in iCloud and switches sync off. The data on your device stays. The reset in the data settings clears only this device and now says so.

## Bug fixes

### iOS

- Scanning several products in a row could freeze the product screen or close it on its own. It stays responsive now.
- Creating a product in the Library now offers the nutrition label scanner, a "no barcode" option and submit for review, the same form as everywhere else.
- Before sending a product for review, the form tells you what is still missing: name, brand, or barcode.
- A barcode that is already in the database no longer creates a duplicate. The app offers to open that product instead.
- Submitting one of your own products no longer leaves a second copy in My Products. It appears under Submissions with its status.
- A product that is already in review cannot be sent a second time.
- "Create" on the add food screen returns to the add food screen after the add instead of staying on the emptied form.
- Tags on your foods no longer vanish after the daily library refresh. Hidden frequent foods and removed favourites no longer come back either.
- Onboarding now has permission to read your date of birth and sex from Health, so the form no longer sits on a default birth year.
- Switching to Health and back no longer freezes the app for seconds.
- The reset confirmation now says what happens: this device is cleared, iCloud data stays.
- Everything from 2.6.1 is included: the empty screen after a barcode scan, shifting search results, unknown barcodes opening as a new product, and tenths of a gram in weight fields. Details in [What's new in Intake 2.6.1](/en/whats-new/2.6.1).

### Android

- The water widget is readable at every fill level, and its previews no longer show placeholder bars or white tiles in dark mode.
- Sent submissions read "Pending" under Library › Submissions instead of "not sent".
- "Submit for review" on My products has a working back arrow, closes after sending, and confirms in the list whether the submission went out. A product in review cannot be sent a second time.
- Tapping a product in My products opens the edit form directly. Submissions lists each product once, and a submission that did not go out reads "Not sent" with a hint how to resend.
- Submitting a product whose barcode already exists now says so and offers to open the existing product.
- Your own products can be submitted without a barcode, and an edit is kept locally even if sending fails.
- In the PDF export, the macro boxes fit on days with workouts, up to three workouts are listed, long notes stay in their box, and the "kg" no longer overlaps the top weight value.

You can find the full changelog [here](https://featurevoting.tobibechtold.dev/app/intake/changelog).

Thank you for using Intake.

Tobi
