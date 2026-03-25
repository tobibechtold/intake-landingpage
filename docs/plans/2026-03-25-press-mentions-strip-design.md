# Press Mentions Strip Design

## Goal

Add a lightweight editorial-trust strip to the landing page that shows known press coverage without disrupting the existing conversion flow.

## Approved Direction

- show the press mentions on both German and English routes
- use a subtle logo-first strip rather than a dedicated article section
- place it near the top of the page, directly below the hero
- each publication logo links directly to the corresponding article
- use publication branding only, not article screenshots

## Why This Fits

The page already has strong user proof and product proof through reviews, comparison content, screenshots, and release notes. Press coverage adds a different kind of trust signal: editorial validation. That signal works best when it is immediate and low-friction.

A compact strip is better than a heavier “press section” because:

- it improves trust without competing with the hero CTA
- it avoids turning the landing page into a media page
- it keeps reviews and editorial proof visually distinct

## Placement

Insert the strip directly after the hero and before the `WhySwitch` section.

This placement keeps the trust signal high on the page while preserving the existing narrative:

1. hero and CTA
2. editorial trust
3. product differentiation
4. deeper proof and detail

## Content Model

The strip should contain:

- a small localized label
  - German: `Bekannt aus`
  - English: `Featured in`
- a row of publication logos / wordmarks
- direct outbound links to the articles

The strip should not include:

- article excerpts
- reviewer quotes
- publication summaries
- screenshots of the article pages

## Visual Direction

Keep the component understated and polished:

- monochrome or visually normalized logos
- modest height and generous spacing
- subtle opacity by default, stronger on hover
- no cards, badges, or loud background treatment

The goal is credibility, not visual competition.

## Interaction

Each logo should:

- open the article in a new tab
- use `rel="noopener noreferrer"`
- expose an accessible label that includes the publication name and article title

Hover behavior can slightly increase contrast or opacity, but should remain restrained.

## Asset Strategy

Use publication logos or wordmarks sourced from each outlet, ideally as SVG assets checked into the repo. If only raster logos are available, normalize them so they still look cohesive in one strip.

Initial outlets:

- iPhone-Ticker
- iTopnews
- Stadt-Bremerhaven

The component should be data-driven so more publications can be added later without changing layout code.

## Component Shape

Implement one reusable `PressMentions` component backed by a small list of publication entries:

- publication name
- article URL
- logo asset path
- localized accessible label

This keeps the feature maintainable and easy to extend.

## Success Criteria

The work is successful if:

- press coverage appears as a subtle trust strip on both locales
- the strip feels integrated with the existing design language
- article links are direct and accessible
- the component remains easy to extend with more outlets later
