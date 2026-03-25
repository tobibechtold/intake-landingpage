# Press Mention Inline Brand Labels Design

**Goal:** Make the `iPhone-Ticker` and `iTopnews` items easier to recognize by showing their publication names next to the sourced logos in the homepage press strip.

## Decision

Keep the existing compact press strip and add visible text labels only for the two icon-based outlets:

- `iPhone-Ticker`: show icon plus `iPhone-Ticker`
- `iTopnews`: show logo plus `iTopnews`
- `stadt-bremerhaven.de`: remain logo-only because the Caschy wordmark already identifies the publication clearly

## UI Direction

- Preserve the strip as a low-weight trust row under the hero
- Keep each outlet as a single outbound link
- Render icon/logo and name in one inline lockup
- Use muted text styling so the names improve recognition without turning the strip into a feature grid

## Testing

- Add a component test asserting the visible `iPhone-Ticker` and `iTopnews` labels render in the strip
- Keep the existing link and sourced-asset coverage
