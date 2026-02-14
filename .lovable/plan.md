
# Hero Section Redesign — Two-Column Layout

## Overview
Redesign the Hero section from a centered, single-column layout into a two-column layout on desktop. The left column contains the text content, CTA, pricing info, and App Store rating. The right column features the phone mockup with the promo video (currently in the separate AppPreview section). On mobile, the layout stacks vertically with the phone below the text.

## Layout

```text
Desktop (md+):
┌──────────────────────────────────────────────────────────────┐
│  hero-gradient                                               │
│                                                              │
│  ┌──────────────────────────┐  ┌──────────────────────────┐  │
│  │  [App Icon]              │  │                          │  │
│  │                          │  │    ┌──────────────┐      │  │
│  │  Calorie counting.       │  │    │              │      │  │
│  │  Simplified.             │  │    │  Phone Frame │      │  │
│  │                          │  │    │  + Video     │      │  │
│  │  No subscriptions...     │  │    │              │      │  │
│  │                          │  │    │              │      │  │
│  │  [App Store Badge]       │  │    └──────────────┘      │  │
│  │  One-time purchase       │  │                          │  │
│  │  ★★★★★ 4.9 on AppStore  │  │                          │  │
│  └──────────────────────────┘  └──────────────────────────┘  │
│                                                              │
└──────────────────────────────────────────────────────────────┘

Mobile:
┌──────────────────────┐
│  [App Icon]          │
│  Calorie counting.   │
│  Simplified.         │
│  Description...      │
│  [App Store Badge]   │
│  One-time purchase   │
│  ★★★★★ 4.9 on ...   │
│                      │
│   ┌──────────────┐   │
│   │ Phone Frame  │   │
│   │ + Video      │   │
│   └──────────────┘   │
└──────────────────────┘
```

## Changes

### 1. `src/components/Hero.tsx` — Major rewrite
- Change from centered single-column to a two-column grid (`md:grid-cols-2`)
- Left column: left-aligned text (centered on mobile), logo icon (smaller), headline, description, App Store badge, one-time purchase text, and a new star rating row (4.9 stars on the AppStore)
- Right column: PhoneFrame with the language-specific promo video (moved from AppPreview)
- On mobile: single column, text first, phone below
- Import `PhoneFrame` and `Star` icon from lucide-react

### 2. `src/i18n/translations.ts` — Add rating translation keys
- `heroRating`: "4.9 on the AppStore" (EN) / "4.9 im AppStore" (DE)

### 3. `src/pages/Index.tsx` — Remove standalone AppPreview
- Remove the `<AppPreview />` component from the page since the phone mockup is now in the Hero
- Remove the import

### 4. `src/components/AppPreview.tsx` — Can be kept or deleted
- No longer used on the page; can be deleted for cleanup

## Technical Details
- The two-column layout uses `md:grid md:grid-cols-2 md:gap-12 items-center`
- Left column text alignment: `text-center md:text-left` with `items-center md:items-start`
- Logo icon reduced to ~w-20 h-20 on desktop (smaller since it's not the focal point anymore)
- Star rating: 5 filled `Star` icons from lucide-react in primary color + "4.9 on the AppStore" text
- Phone mockup sized at `max-w-[260px] md:max-w-[300px]` centered in the right column
- All existing animations (fade-up, fade-scale) preserved with appropriate delays
- Video uses `key={language}` to re-render on language switch
