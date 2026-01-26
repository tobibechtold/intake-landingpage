

# Reviews Section Implementation Plan

## Overview
Add a new "Reviews" section displaying App Store reviews directly below the Hero section for immediate social proof.

## Reviews Data
Three 5-star reviews from the German App Store:

1. **"Übersichtlich & schick"** - ipfreaks (Jan 23, 2026)
2. **"Tolle App"** - Nico Sebastian (Jan 23, 2026)
3. **"Top App"** - ©pa.tric (Jan 23, 2026)

## Files to Create/Modify

### 1. New File: `src/components/Reviews.tsx`
- Review cards in a responsive grid (1 column mobile, 3 columns desktop)
- 5-star rating display using Star icons from lucide-react
- Glass-card styling matching the site's design
- Scroll-triggered fade-in animations using `useScrollAnimation`
- Reviews kept in original German for authenticity

### 2. Modify: `src/i18n/translations.ts`
Add translation keys:
- `reviewsTitle`: "What Users Say" / "Was Nutzer sagen"
- `reviewsSubtitle`: "Real reviews from the App Store" / "Echte Bewertungen aus dem App Store"

### 3. Modify: `src/pages/Index.tsx`
Update component order:
```text
<Header />
<Hero />
<Reviews />      ← NEW (directly after Hero)
<AppPreview />
<ScreenshotGallery />
<Features />
<CTA />
<Footer />
```

## Design Details
- Section uses `section-gradient` background for subtle visual interest
- Each review card uses `feature-card` styling (glass effect with hover glow)
- Star ratings displayed in primary color (cyan/teal)
- Staggered animation delays (0.1s, 0.2s, 0.3s) for visual polish
- Author names and dates in muted foreground color

