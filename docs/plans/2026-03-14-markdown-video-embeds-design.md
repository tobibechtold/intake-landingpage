# Markdown Video Embeds Design

## Goal

Allow feature videos to be embedded directly inside What's New markdown articles without adding a custom authoring syntax.

## Current State

The What's New content pipeline parses a small markdown subset in `src/lib/whatsNewContent.ts`. Standalone media blocks using `![alt](path)` are always rendered as `<img>`, regardless of asset type. This breaks existing `.mp4` references in release content because browsers do not display them as playable media.

## Decision

Keep the existing image-style markdown syntax and detect video files by extension. When a standalone media block points to `.mp4`, `.webm`, or `.ogg`, render it as a `<video controls preload="metadata">` inside a `<figure>`. Continue rendering image formats as `<img>`.

## Alternatives Considered

### Custom Video Syntax

Add a dedicated syntax such as `@[video](./assets/demo.mp4)`.

Rejected because it adds authoring friction and does not fix already-authored content.

### Frontmatter-Only Videos

Keep inline markdown media image-only and require videos through the top-level `video` frontmatter field.

Rejected because it only supports a single top-level video and does not let release articles place videos next to specific sections.

## Rendering Rules

- `![Alt](./assets/demo.mp4)` renders to a video block.
- `![Alt](./assets/demo.webm)` renders to a video block.
- `![Alt](./assets/demo.ogg)` renders to a video block.
- Existing image extensions continue rendering to image blocks.
- The existing optional top-level `video` frontmatter field remains unchanged.

## Testing

Add unit coverage in `src/lib/whatsNewContent.test.ts` to verify:

- `.mp4` markdown media resolves to video HTML
- image markdown media still resolves to image HTML
- the seeded German release entry now contains a video block for the embedded `.mp4`
