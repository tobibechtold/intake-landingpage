# Proof Story No-Image Design

Proof story cards that do not have a screenshot should not keep the split desktop layout. Their copy should span the full card width.

## Decision

- keep the existing split media-plus-copy layout for cards with screenshots
- when a card has no screenshot, remove the media column entirely
- let the copy block expand to the full card width instead of staying capped to the text column width

This should be implemented in the shared proof-story layout so both the homepage and marketing pages behave consistently if they render text-only cards.
