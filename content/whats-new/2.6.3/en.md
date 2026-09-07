---
version: "2.6.3"
publishedAt: "2026-09-06"
title: "What's new in Intake 2.6.3"
summary: "Share what you eat: one sheet for the day, a meal, a food, an Intake AI estimate or a body trend, as stickers on your photo or finished pictures. Sending a product in for review asks for less: name, brand, barcode and the four core macros. Submissions refresh when you open them and on a pull, finished reviews sit in their own section, and a rejection comes with the reviewer's reason. On both platforms"
coverImage: "./assets/cover.svg"
highlights:
  - "Both: Share what you eat as a sticker on your photo or a finished picture, from one sheet"
  - "Both: Submitting a product for review needs only name, brand, barcode and the four core macros"
  - "iOS: A rejected product no longer sits under Submissions as in review for days"
  - "iOS: Submissions refresh when you open them and when you pull down"
  - "iOS: Finished reviews in their own section, with the reason for a rejection"
  - "iOS: The barcode scanner opens faster"
  - "iOS: The week strip sits right and straightens itself out"
  - "Android: A rejected product no longer sits under Submissions as in review for days"
  - "Android: Submissions refresh when you open them and when you pull down"
  - "Android: Finished reviews in their own section, with the reason for a rejection"
---

## Share what you eat

**One place to share.** The picture button on the day, a meal, a food, an Intake AI estimate or a body measurement opens the same sheet. Pick what to share, then the card.

![The share sheet](assets/share-sheet-en.mp4)

**Story stickers, on your photo.** Every card has a transparent version for your Instagram story, and a 4:5 one for carousels on Instagram and TikTok. Pick or take the photo in Intake and the sticker lands on it. An Intake AI photo estimate brings your food photo along.

![A story sticker on a photo](assets/share-sticker-en.jpg)

**Day, meal or food.** The whole day with target and burned calories, a meal with its foods, or a single food, as 4:5 pictures. The same picture on iPhone and Android.

**Your trend, one number.** Share how your weight or any body measurement moved over the last week, month, three months or year, as one big number and one line.

## Simpler review submissions

The two apps asked for different things before a product could go in for review: iOS for no nutrition values at all, Android for all eight. Neither matched what the reviewer actually scores. Both now follow one rule: a new product needs a name, a brand, a barcode or the "no barcode" mark, and calories, fat, carbs and protein per 100 g filled in. Zero is a value, an empty field is not. Everything else is optional. A correction to a shared product needs a name, a brand unless the shared product had none, and at least one visible change; it never asks for nutrition values. The form tells you what is still missing, field by field.

## Finished reviews

Library › Submissions has a new "Finished reviews" section. It lists every review that has been decided, newest first, with the verdict, the decision date and, for a rejection, the reviewer's reason. Open submissions stay at the top. Tapping a finished review does nothing; it is a record, not a way back into the product.

## The scanner opens faster

The camera preview held up the app for about a second while the barcode scanner started. It is now created before the camera is configured, and the scanner is ready at once.

## Bug fixes

### iOS

- A product you sent in for review could stay listed as in review for days after it had been rejected. The verdict never reached the product because its id was compared case-sensitively. It lands now.
- Submissions refresh when you open the screen, if the last check is older than five minutes, and any time you pull the list down. When the status cannot be checked, the list says so instead of pretending nothing changed.
- A rejected product keeps the reviewer's reason and shows it under "Reason".
- The Submissions row in the Library counts only what is still in review. Six finished reviews used to read as six things waiting.
- The week strip could open a couple of days off, so the week seemed to start midweek, and drift further after a visit to Settings. It lands on the current week every time now and straightens itself out.

### Android

- A product you sent in for review could stay listed as in review for good. The app signed in to the catalogue as a new anonymous user on every start, so it could no longer see what its previous self had submitted. It keeps its identity now, and the verdict lands. Products sent in before this update were submitted by identities the app no longer has and will stay listed as in review; send them again if you still want them reviewed.
- Submissions refresh when you open the screen, if the last check is older than five minutes, and any time you pull the list down, also on the empty list. When the status cannot be checked, the list says so instead of pretending nothing changed.
- A rejected product keeps the reviewer's reason and shows it under "Reason". The reason is part of your Google Drive backup.

You can find the full changelog [here](https://featurevoting.tobibechtold.dev/app/intake/changelog).

Thank you for using Intake.

Tobi
