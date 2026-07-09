---
version: "2.4.5"
publishedAt: "2026-07-08"
title: "What's new in Intake 2.4.5"
summary: "Faster meal actions, better Health data, and many everyday fixes"
coverImage: "./assets/cover.svg"
highlights:
  - Copy meals to today's date by default
  - Delete a full meal from the three-dot menu
  - Better Apple Watch calorie burn and Apple Health water data support
  - More stable Health data, AI chat, fasting status, and Android search
---

## Faster meal actions

Intake 2.4.5 makes repeated meals easier to manage.

When you copy a meal, today's date is now selected by default. That saves a step when you often track similar meals across multiple days. You can also delete an entire meal directly from the three-dot menu instead of removing every item one by one.

![sharing](assets/delete-meal-en.mp4)

## Apple Health as your calorie target base

On iOS, Intake can now use the resting calories calculated by Apple Health as the base for your calorie target.

![sharing](assets/calorie-source-en.png)

Until now, Intake calculated your target from your body data and activity level, or used the custom TDEE you entered yourself. With this update, you can use Apple Health resting calories instead. These are the calories your body burns without additional activity.

Important: this can make your target look lower at first because activity calories are not included in that base. They are added throughout the day as Intake receives your activity data. If you use this option, you should keep the setting that adds activity calories to your target enabled.

Water data from Apple Health can also be read when you enable it in settings. This release fixes several Health-related issues too: weight entries can be deleted again, yesterday's activity calories no longer go missing, and activity data should no longer unexpectedly reset to 0.

![sharing](assets/water-en.png)

On Android, the Health Connect integration has been improved further. Swipe gestures also no longer mix up calorie burn values.

## Smoother day-to-day use

This update also removes several small but noticeable interruptions.

You can find the full changelog [here](https://featurevoting.tobibechtold.dev/app/intake/changelog).

Thank you for using Intake. I hope you enjoy the new release.

Tobi
