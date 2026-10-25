---
id: fix-icloud-sync
title: "Fix iCloud sync and back up to a file"
short: "If something is missing on one of your devices, tap “Sync now” in Intake’s iCloud settings. If that doesn’t help, “Resync all devices” syncs everything again without deleting anything."
related:
  - icloud-sync
  - delete-icloud-data
  - sync-between-devices
steps:
  - text: "On Today, tap the gear at the top, then “iCloud Sync”."
    ios:
      image: ./assets/en/ios/1.webp
  - text: "Tap “Sync now”. Next to it you see when Intake last synced."
    ios:
      image: ./assets/en/ios/2.webp
  - text: "If something is still missing, tap “Resync all devices” and confirm."
    ios:
      image: ./assets/en/ios/3.webp
  - text: "To be safe, “Export iCloud backup” saves your data to a file."
    ios:
      image: ./assets/en/ios/4.webp
---

“Resync all devices” sends everything on this device to iCloud again. All your devices need Intake 2.7.4 or later for it. Nothing is deleted.

“Pull from iCloud (recovery)” fetches the latest data from iCloud onto this device. “Import iCloud backup” reads an exported file back in, and newer data on the device is kept.

If it says “No iCloud account is signed in.”, sign in to iCloud in your iPhone’s Settings.
