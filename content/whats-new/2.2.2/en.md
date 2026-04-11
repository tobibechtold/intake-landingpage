---
version: "2.2.2"
publishedAt: "2026-04-12"
title: "What's new in Intake 2.2.2"
summary: "The swipe gesture is back, new Lock Screen widgets speed up logging, and smaller fixes improve reliability."
coverImage: "./assets/cover.svg"
highlights:
  - The swipe gesture is back
  - New Lock Screen widgets
  - Bug fixes and improvements
---

## The big changes are still in 2.2.0

This update builds on the major changes from Intake 2.2.0. If you want the full overview of what changed there, you can read it [here](https://www.getintake.de/en/whats-new/2.2.0).

## The swipe gesture is back

I removed the swipe gesture for switching between days because the old version caused too many bugs.

I kept working on it, though, and after a lot of testing I finally found a clean solution that brings the gesture back without the old stability issues or visual compromises.

If you have not tried it yet, give it a go and let me know how it feels.

![Swipe gesture](./assets/swipe.mp4)

## New Lock Screen widgets

This update adds three new Lock Screen widgets that can replace the default camera or flashlight controls on your iPhone Lock Screen.

These are Control Widgets that open specific Intake actions right from the Lock Screen:

- Scan barcode
- Open search
- Add product

That means you can jump straight into the barcode scanner, search, or product flow without opening the app first.

To add them, long-press your Lock Screen, edit it, and replace the two round controls at the bottom with the Intake widgets.

![New widgets](./assets/widgets.mp4)

## Bug fixes and improvements

As always, this release also includes a number of smaller fixes and improvements based on the issues you keep reporting.

Among other things, this update fixes a bug where nutrition data from Apple Shortcuts was not written to Apple Health. The average calculation in statistics has also been corrected and now uses the right number of logged days.

You can find the full changelog [here](https://featurevoting.tobibechtold.dev/app/intake/changelog).

Thank you for using Intake. I hope you're continuing to enjoy the app.

Tobi ❤️
