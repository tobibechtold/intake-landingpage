# Smart Download Nav Design

Make the navbar `Download` button choose the store destination based on the visitor platform, with a safe fallback to the page CTA when the platform is unknown.

## Decision

- Android visitors go to Google Play
- iOS visitors go to the localized App Store URL
- unknown, desktop, and bot traffic fall back to the localized home-page CTA anchor

## Notes

- keep explicit App Store and Google Play links elsewhere on the page
- apply smart detection only to the navbar download button
- use client-side user-agent detection as a convenience hint, not as a hard guarantee
- the fallback should target a real `#cta` section id on the localized home page
