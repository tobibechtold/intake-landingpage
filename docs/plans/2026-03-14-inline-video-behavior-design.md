# Inline Video Behavior Design

## Goal

Make embedded feature videos in What's New markdown autoplay and loop, while keeping them visually integrated with the article instead of stretching full width on desktop.

## Decision

Keep the current inline markdown video syntax and adjust both generated markup and prose styling:

- inline markdown videos autoplay
- inline markdown videos loop
- inline markdown videos are muted and play inline so autoplay works reliably
- inline markdown videos remain full width on mobile
- inline markdown videos are constrained on desktop so they sit inside the reading flow

## Rationale

The current parser already emits dedicated inline video blocks for markdown media. Changing the emitted attributes is the smallest way to improve behavior, and constraining video width at the article container level avoids introducing per-video authoring controls.

## Alternatives Considered

### Per-video alignment controls

Rejected because all feature videos should currently behave the same and extra authoring syntax is unnecessary.

### React-side post processing

Rejected because the parser already knows when a media block is a video, so reprocessing the rendered HTML in React would add complexity without improving flexibility.

## Rendering Rules

- Markdown video blocks render with `autoplay`, `loop`, `muted`, `playsinline`, and `preload="metadata"`.
- Desktop styling constrains inline video width and aligns it to the left within the prose column.
- Mobile styling keeps inline videos full width.
- Existing image rendering stays unchanged.
- The top-level frontmatter `video` remains unchanged.

## Testing

Add coverage for:

- inline markdown video HTML containing autoplay and loop-related attributes
- the What's New detail page rendering an inline video element with the autoplay/loop behavior
- desktop-oriented inline video styling being attached through the article prose container
