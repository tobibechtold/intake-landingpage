# Feature Voting Nav Design

Add the external `Feature Voting` destination to both the header navigation and the footer, and make the header navigation feel more obviously clickable.

## Goals

- Expose `https://featurevoting.tobibechtold.dev/app/intake` in the main navigation and footer.
- Keep the label as `Feature Voting` in both German and English.
- Improve header nav affordance without turning every item into a heavy CTA.

## Decision

Use soft pill navigation in the header:

- each nav item gets a rounded-full shape
- each item gets a subtle border and faint background at rest
- hover/focus states strengthen the foreground and surface color
- the primary `Download` button stays visually stronger than the nav

`Feature Voting` should be treated as a real external link in both desktop and mobile navigation. The footer should add the same external destination in the existing `App` link group without broader footer restyling.

## Notes

- Keep internal nav items as router links.
- Keep `Feature Voting` as a standard external anchor with `target="_blank"` and `rel="noopener noreferrer"`.
- Tests should cover the new link targets in header and footer. 
