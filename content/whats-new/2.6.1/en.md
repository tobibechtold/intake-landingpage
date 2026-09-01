---
version: "2.6.1"
publishedAt: "2026-09-01"
title: "What's new in Intake 2.6.1"
summary: "Fixes for the new add food screen from 2.6.0, the Quick Log widget and the PDF export, and tenths of a gram in weight fields"
coverImage: "./assets/cover.svg"
highlights:
  - "iOS: The empty screen after a barcode scan is fixed"
  - "iOS: Search results no longer shift right as you tap"
  - "iOS: The switch between barcode and Meal Scan accepts taps on its whole surface"
  - "iOS: An unknown barcode opens as a new product, not as Edit Product"
  - "iOS: Weight fields accept tenths of a gram, a pinch of salt logs as 0.5 g"
  - "Android: The Quick Log widget fills its area, with readable text"
  - "Android: Submit for review on My Products works again"
  - "Android: Drinks are listed in millilitres in the PDF export"
  - "Android: The add food search field is clearly visible in dark mode again"
  - "Android: The plus on My Products opens the product form directly"
  - "Android: An invalid barcode is explained when submitting, products without one can be submitted"
---

## In case you missed 2.6.0

2.6.1 is a small update, but 2.6.0 before it was the biggest release in a long time. If you are coming straight from 2.5, that is why the app looks different in a few places.

The Recipes tab is now called Library and holds everything that is yours: favourites, your own products, recipes, routines and your submissions, with a search across all the lists, your own tags and sorting. The add food screen has been rebuilt from the ground up: it starts with suggestions for the exact meal you are logging, routines log a whole breakfast in one tap, barcodes and Meal Scan share one full-screen camera, and search sits at the bottom, where your thumb is. And grams are no longer the only unit: teaspoons, tablespoons, cups, glasses and millilitres are available for any food.

The whole story with screenshots is in [What's new in Intake 2.6.0](/en/whats-new/2.6.0).

## Bug fixes

A redesign this size has a few corners that only show up in daily use. Thank you to everyone who reported them, the first ones are fixed here.

### iOS

- After scanning a barcode, the product screen could open completely empty. Scan results now show up reliably.
- The search spinner now floats above the list instead of pushing it down, so results no longer shift right as you tap.
- The switch between barcode and Meal Scan accepts taps on its whole surface instead of focusing the camera.
- A scanned barcode with no database match now opens as a new product instead of wrongly saying you are editing one.
- Weight fields accept tenths of a gram. A pinch of salt logs as 0.5 g instead of a full gram, in entries and recipe ingredients.

### Android

- The Quick Log widget now fills its whole area: the tiles grow with the widget, the text scales up instead of staying tiny, and there is no empty band under the tiles any more. It finally looks like its preview.
- "Submit for review" on My Products works again. The product opens prefilled in the form with submission switched on, instead of landing on an empty screen.
- In the PDF export, entries marked as drinks are now listed in millilitres instead of grams.
- The search field at the bottom of the add food screen stands out from the background in dark mode again.
- The plus on My Products opens the product form directly instead of the add food screen. Saving creates the product and returns you to the list, without a diary entry.
- When submitting for review, the app now tells you if a barcode is not a valid EAN/UPC code instead of silently disabling the button. And your own products without a barcode can be submitted as "no barcode".

You can find the full changelog [here](https://featurevoting.tobibechtold.dev/app/intake/changelog).

Thank you for using Intake. I hope you enjoy the new release.

Tobi
