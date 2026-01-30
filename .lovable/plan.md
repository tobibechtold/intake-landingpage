

# Reviews Carousel Implementation Plan

## Overview
Transform the Reviews section from a static 3-column grid into a continuously auto-scrolling horizontal carousel. Add the 3 new reviews and implement support for variable star ratings (since one review is 4 stars).

## New Reviews to Add

| Title | Rating | Author | Date |
|-------|--------|--------|------|
| Installiert und direkt geflasht | 5 stars | RalleTeeFau | 26. Jan. 2026 |
| Super Alternative | 4 stars | LennartLesch | 27. Jan. 2026 |
| Tolle App | 5 stars | Anna.N. | 28. Jan. 2026 |

## Implementation Steps

### 1. Install Auto-Scroll Plugin
Add the `embla-carousel-auto-scroll` package for smooth continuous scrolling functionality.

### 2. Update `src/components/Reviews.tsx`

**Changes:**
- Add `rating` field to the Review interface
- Add the 3 new reviews to the data array (total: 6 reviews)
- Update `StarRating` component to accept a `rating` prop and render filled vs empty stars
- Replace the grid layout with the Embla Carousel components
- Configure the auto-scroll plugin with:
  - `speed: 1` (slow, smooth scrolling - 1 pixel per frame)
  - `direction: 'forward'` (left to right)
  - `loop: true` (infinite scroll)
  - `stopOnInteraction: false` (keeps scrolling after user interaction)
  - `stopOnMouseEnter: true` (pause on hover for readability)
- Each carousel item shows ~1.5 cards on mobile, ~2.5 on tablet, ~3.5 on desktop (peek effect)
- Remove individual card animations since the carousel itself provides movement

## Design Details

- Cards maintain `feature-card` glass styling
- Carousel spans full container width
- Smooth continuous movement creates an engaging, dynamic feel
- Pauses on hover so users can read reviews
- No navigation arrows (continuous auto-scroll handles movement)
- Star ratings: filled stars in primary color, empty stars in muted color

## Technical Notes

```text
Auto-scroll plugin configuration:
┌─────────────────────────────────────┐
│  AutoScroll({                       │
│    speed: 1,        // slow scroll  │
│    startDelay: 0,   // start immed. │
│    stopOnInteraction: false,        │
│    stopOnMouseEnter: true           │
│  })                                 │
└─────────────────────────────────────┘
```

The carousel will use `playOnInit: true` to start automatically without needing to call `play()` manually.

