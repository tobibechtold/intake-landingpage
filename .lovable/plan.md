

# Truncated Reviews with "Show More" Button

## Problem
Long reviews (like the "Super Alternative" review with ~150 words) make the cards very tall, creating an uneven carousel experience.

## Solution
Truncate review text after a certain number of lines and add a "Show more" / "Show less" button for longer reviews.

## Implementation Details

### Create a `ReviewCard` Component
Extract the card into its own component with local state to track expanded/collapsed status:

- Use `line-clamp-4` (Tailwind CSS) to limit text to 4 lines when collapsed
- Add a "Show more" button that appears only for reviews that exceed the line limit
- Toggle between truncated and full text on click
- Button text changes to "Show less" when expanded

### Character Threshold
- Only show the "Show more" button for reviews longer than ~200 characters
- This ensures short reviews like "Tolle App" (Nico Sebastian) don't show unnecessary buttons

### Styling
- "Show more" button: subtle text button in primary color, positioned below the review text
- Smooth height transition when expanding/collapsing for polish
- Keep the author/date section always visible at the bottom

## Technical Approach

```text
ReviewCard Component Structure:
┌─────────────────────────────────┐
│ ★★★★★ (StarRating)              │
│ Title                           │
│                                 │
│ Review text that is truncated   │
│ after 4 lines when the content  │
│ is too long to fit...           │
│ [Show more]                     │
│                                 │
│ Author • Date                   │
└─────────────────────────────────┘
```

### Files to Modify
- `src/components/Reviews.tsx`: Add `ReviewCard` component with expand/collapse state and update the carousel to use it

