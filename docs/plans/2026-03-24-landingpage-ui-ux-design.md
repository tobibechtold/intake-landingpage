# Landing Page UI/UX Design

## Goal

Redesign the home page to increase App Store installs by making the switch case for Intake much clearer. The page should explain why someone should leave subscription-based calorie trackers behind and choose Intake because it is a one-time purchase, requires no account, and keeps data on-device.

## Fixed Constraints

- keep the demo video in the hero section
- keep the FAQ section
- keep the Product Updates section
- keep the roadmap / feature voting link
- keep competitor framing generic rather than naming specific apps

## Core Positioning

The page should stop behaving like a generic app showcase and start behaving like a switch-focused landing page.

Primary promise:

- no subscription
- no account
- 100% privacy because data stays on the device

Supporting promise:

- Intake still covers the serious tracking features people expect from a modern nutrition app

## Visual Direction

Keep the page dark-mode-first so it matches the app itself. Do not pivot to a bright SaaS marketing style.

### Brand Alignment

The current landing page leans too far into teal/cyan. The app screenshots show a stronger charcoal + pink system with a more restrained supporting palette. The redesign should align the site with the product:

- base: near-black and charcoal surfaces
- primary accent: hot pink / coral pulled from the app UI
- supporting accents: chart colors already present in the app UI
- glow and glass effects: reduced and used more selectively

### Tone

The page should feel:

- direct
- calm
- modern
- private
- premium without being corporate

It should not feel:

- generic dark SaaS
- overly glossy everywhere
- aggressively negative toward competitors

## Information Architecture

Recommended home page order:

1. Hero
2. Why People Switch
3. Generic Comparison
4. Product Proof Stories
5. Social Proof
6. Product Updates
7. FAQ
8. Roadmap / Feature Voting
9. Final CTA

## Section Design

### Hero

Keep the product demo video on the right and use the left side for a much sharper switching message.

Recommended content structure:

- headline focused on leaving subscription-based trackers behind
- subheadline that states the product still delivers serious nutrition tracking
- primary App Store CTA
- secondary anchor CTA to the switch/comparison area
- trust chips directly under the main copy

Recommended trust chips:

- One-time purchase
- No account required
- 100% on-device
- 4.9 App Store rating

This section should answer the core conversion question immediately: why switch to Intake now.

### Why People Switch

Add a short explanatory section directly after the hero. This section should describe the category pain without naming competitors.

Recommended three-column framing:

- tired of subscriptions
- do not want another account
- want private tracking that stays on-device

Each pain point should pair a short problem statement with the Intake alternative.

### Generic Comparison

Add a factual comparison matrix between `Intake` and `Typical subscription trackers`.

Suggested rows:

- subscription required
- account required
- data stored on-device
- barcode scanner
- recipes
- macro and calorie stats
- Apple Health support
- ongoing cost

The table should be scannable, clean, and visually calmer than the glass-heavy sections. Intake should be clearly highlighted as the preferred column.

### Product Proof Stories

The screenshot gallery should stop being a generic carousel-only section. Keep screenshots, but organize them into a more editorial narrative using existing assets.

Recommended story blocks:

- Track fast
- See what matters
- Stay in control

Each block should include:

- one featured screenshot
- one short explanatory paragraph
- two or three short supporting bullets

The existing carousel can remain as a secondary gallery, but the primary emphasis should move to story-driven proof.

### Social Proof

Keep reviews, but make them easier to read and more intentional.

Recommended changes:

- remove or reduce constantly moving auto-scroll behavior
- surface a compact aggregate trust summary near the section heading
- feature a smaller set of stronger, readable reviews first
- preserve the ability to expand longer reviews

This section should reinforce that real users are switching because Intake feels simpler, calmer, and more honest than subscription-heavy alternatives.

### Product Updates

Keep the section. Reframe it as proof that the app is actively improving without relying on subscriptions or account lock-in.

The section should visually sit as supporting evidence rather than distracting from the main switch narrative.

### FAQ

Keep the FAQ and tune its role toward objection handling.

High-priority objections to answer:

- Is it really a one-time purchase?
- Do I need an account?
- Where is my data stored?
- Does it still include the features I expect?
- Is it available on iPhone and Android?

### Roadmap / Feature Voting

Keep the feature voting / roadmap link and position it as evidence that the product is actively shaped by user feedback.

Suggested framing:

- Help shape Intake
- Vote on upcoming features
- See what is planned next

### Final CTA

The final CTA should restate the switch case, not just repeat a generic download prompt.

Recommended message pattern:

- no monthly fee
- no login
- no data leaving your device

## UX Priorities

### Stronger Hierarchy

The current page reuses too many similar glass-card sections, which flattens the experience. The redesign should vary density and section rhythm more deliberately:

- high energy in the hero
- clean and structured comparison section
- editorial screenshot stories
- quieter support sections for updates, FAQ, and roadmap

### Better Narrative Flow

Every section should answer a user question in sequence:

1. What is Intake?
2. Why should I switch?
3. Is it actually better for my needs?
4. Can I trust it?
5. Is the product alive and improving?
6. Where do I download it?

### Accessibility and Mobile

The redesign must preserve a mobile-first layout and improve clarity:

- keep sequential heading structure
- maintain strong text contrast
- avoid relying on color alone for comparison states
- keep touch targets large and obvious
- ensure the hero still communicates well on smaller screens even with the video present
- respect `prefers-reduced-motion`

## Component Impact

Likely components affected:

- `src/components/Header.tsx`
- `src/components/Hero.tsx`
- `src/components/Reviews.tsx`
- `src/components/ScreenshotGallery.tsx`
- `src/components/Features.tsx`
- `src/components/ProductUpdatesPreview.tsx`
- `src/components/Faq.tsx`
- `src/components/FeatureVoting.tsx`
- `src/components/CTA.tsx`
- `src/pages/Index.tsx`
- `src/index.css`

Likely new components:

- `src/components/WhySwitch.tsx`
- `src/components/ComparisonTable.tsx`
- `src/components/ProofStories.tsx`

## Copy Direction

The copy should be clear and confident, not clever for its own sake.

Preferred language:

- switch from subscription-based trackers
- private by default
- one-time purchase
- no account required
- your data stays on your device

Avoid:

- exaggerated claims
- direct attacks on specific brands
- vague “all-in-one wellness” language

## Testing

The redesign should include focused coverage for:

- new switch/comparison sections rendering on the home page
- updated hero CTAs and trust messaging
- preserved FAQ, Product Updates, and Feature Voting sections
- language-specific copy and links where relevant

## Outcome

The redesigned landing page should feel like the marketing site of the actual app, not a generic dark landing page. It should make a stronger conversion case for switching to Intake while preserving the sections that already support trust, product depth, and ongoing product momentum.
