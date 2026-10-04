---
version: "2.7.3"
publishedAt: "2026-10-04"
title: "What's new in Intake 2.7.3"
summary: "On iOS, recipes work with the weight of the finished dish, and you set the portions freely. The weight card on Today shows your total change since a start date, and Stats shows your weight across all years. Plus six fixes, among them for Apple Health and Stats"
coverImage: "./assets/cover.svg"
highlights:
  - "iOS: Recipes with a finished weight, the nutrients are spread over the finished dish"
  - "iOS: Portions set freely when you use your own weight"
  - "iOS: Your total weight change on Today, from a start date you choose"
  - "iOS: Your whole weight history across all years in Stats"
  - "iOS: Apple Health gets everything it allows, even with single nutrients switched off"
  - "iOS: Correct year totals and averages up to today in Stats"
  - "iOS: The scanner starts on the main camera"
---

## New on iOS: recipes by their finished weight

Bread gains weight in the oven, a stew loses it on the stove. So recipes now work with the weight of the finished dish when you give it.

In a recipe, switch off "Use calculated weight" and enter what the finished dish weighs under "Finished weight (total)". Set the portions separately, as many as you like. Below, you see what one portion weighs.

The nutrients of the ingredients are spread over that weight. A bread made from 1,077 g of ingredients with 3,484 kcal that weighs 1,602 g once baked has 871 kcal and about 400 g per portion in four portions, and 100 g of bread have 217 kcal. Intake uses this everywhere: on the recipe page, in search, when you log in grams or portions, and in the nutrient breakdown on Today. Change the amount of an ingredient while logging and the finished weight grows or shrinks with it.

Recipes where you gave your own weight per portion so far keep their values. Open one in the editor and a note points you to the new field. Entries you have already logged stay as they are.

Share a recipe as a file and the finished weight comes along, also between iOS and Android.

## Your total weight change

The weight card on Today has a new row "Total", for example "−8.3 kg since Jan 3". It shows how much you have lost or gained in total since your starting weight, next to the trend against your last weight.

Choose the start date under Settings, Body Data, "Starting weight". Without a choice, Intake starts at the first weight you logged or brought in from Apple Health. That screen also shows which weight counts as the start, and "Reset" takes you back to the first weight. The start date applies to each device on its own.

## Your whole weight history

In Stats, weight now has "All" next to week, month and year. It shows your history across all years, one point per month, with your start, current weight, change, lowest and highest weight and the number of days logged. If your weights are already in Apple Health, bring them into Intake under Settings, Apple Health, "Import weight history".

## Bug fixes

### iOS

- **Every entry stays in the list.** What you add appears on Today and stays there, also while Intake is syncing with iCloud in the background.
- **Apple Health with single types switched off.** If you have switched off some nutrients for Intake in Apple Health, Intake still writes all the others: calories, macros and everything that is allowed.
- **Correct totals for the year.** The year view in Stats adds up every day. Totals, water and the calorie balance now match the week and the month, and "Highest day" really shows one day.
- **Averages up to today.** Stats counts the days up to today. A Wednesday no longer counts the rest of the week, and meals you have already planned for later days do not change your averages.
- **The scanner starts on the main camera.** The barcode scanner opens on the normal lens and still focuses at short distances.
- **Deleting weights in Stats.** Delete a weight with a long press in the week or month view, where it hits exactly that day.

As always, you can find the full changelog [here](https://featurevoting.tobibechtold.dev/app/intake/changelog).

Thank you for using Intake.

Tobi
