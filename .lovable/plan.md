

# Feature Voting Section Implementation Plan

## Overview
Add a new section to the landing page that promotes user participation in shaping the app's future. This section will link to the feature voting tool at `featurevoting.tobibechtold.dev` and emphasize that users have a voice in what features get built.

## Design Concept
A centered, visually engaging section with:
- An icon (like `MessageSquareHeart`, `Vote`, or `Megaphone` from Lucide)
- A compelling headline emphasizing user-driven development
- Description text highlighting the roadmap, feature requests, and bug reporting
- A prominent button linking to the voting tool

The section will use the existing `glass-card` styling to match the CTA section's aesthetic, with the `section-gradient` background for subtle visual separation.

## Section Placement
```text
Current page flow:
Hero → Reviews → AppPreview → ScreenshotGallery → Features → [NEW: FeatureVoting] → CTA → Footer
```

Positioning it after Features and before CTA creates a natural flow: "Here's what the app does" → "Help us decide what's next" → "Ready to download?"

## Files to Create/Modify

### 1. Create: `src/components/FeatureVoting.tsx`

New component with:
- `useScrollAnimation` hook for fade-in animation (consistent with other sections)
- `useLanguage` hook for translations
- Icon from Lucide (e.g., `Megaphone` or `MessageSquareHeart`)
- Glass card container with centered content
- External link button to `https://featurevoting.tobibechtold.dev`

### 2. Modify: `src/i18n/translations.ts`

Add translation keys for both English and German:

| Key | English | German |
|-----|---------|--------|
| `featureVotingTitle` | "You decide what's next." | "Du entscheidest, was als nächstes kommt." |
| `featureVotingDescription` | "View the roadmap, vote on features, and report bugs. Your feedback directly shapes the future of Intake." | "Sieh dir die Roadmap an, stimme für Features ab und melde Bugs. Dein Feedback bestimmt die Zukunft von Intake." |
| `featureVotingButton` | "View Roadmap & Vote" | "Roadmap & Abstimmung" |

### 3. Modify: `src/pages/Index.tsx`

Import and add the new `FeatureVoting` component between `Features` and `CTA`.

## Visual Design

```text
┌─────────────────────────────────────────────────────────┐
│                   section-gradient bg                   │
│                                                         │
│              ┌───────────────────────────┐              │
│              │        glass-card         │              │
│              │                           │              │
│              │     [Megaphone Icon]      │              │
│              │                           │              │
│              │   You decide what's next. │              │
│              │                           │              │
│              │   View the roadmap, vote  │              │
│              │   on features, and report │              │
│              │   bugs. Your feedback...  │              │
│              │                           │              │
│              │   ┌───────────────────┐   │              │
│              │   │ View Roadmap &    │   │              │
│              │   │      Vote   →     │   │              │
│              │   └───────────────────┘   │              │
│              │                           │              │
│              └───────────────────────────┘              │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## Component Structure

```text
<section className="section-gradient py-24">
  <div className="container">
    <div className="glass-card p-12 text-center max-w-3xl mx-auto">
      [Icon in primary/10 circle]
      <h2>[Title - with gradient highlight on key phrase]</h2>
      <p>[Description]</p>
      <a href="https://featurevoting.tobibechtold.dev" target="_blank">
        [Button with arrow icon]
      </a>
    </div>
  </div>
</section>
```

## Styling Details
- Icon: 48x48px in a rounded container with `bg-primary/10` and `text-primary`
- Title: `text-3xl md:text-4xl font-bold` with "what's next" as gradient text
- Description: `text-muted-foreground text-lg`
- Button: Primary styled button with `ArrowRight` icon, hover effect

