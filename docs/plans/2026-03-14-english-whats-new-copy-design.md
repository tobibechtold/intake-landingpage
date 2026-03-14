# English What's New Copy Design

## Goal

Rewrite the English `2.1.1` What's New entry so it reads naturally for English-speaking users while staying faithful to the features and scope described in the German source entry.

## Decision

Use the German file as the release source of truth, but do not translate line by line. Rewrite the English version in a cleaner release-note voice with concise product wording and the same core feature coverage.

## Content Scope

- meal sharing, copying, and creating a recipe from a meal
- custom macro percentages in macro goals
- faster and more relevant food search
- the new What's New section in settings
- quarter-step portions and free manual quantity input
- bug fixes and a short closing note

## Structure

Keep the English entry aligned with the German structure:

- updated summary
- updated highlights
- section-by-section body copy matching the shipped features
- existing media embeds preserved where relevant

## Testing

Run the existing What's New parser and page tests to confirm the rewritten markdown still loads and renders correctly.
