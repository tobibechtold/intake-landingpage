# Smart App Banner Design

Add Apple’s Smart App Banner metadata to the landing-page HTML so iOS Safari can show the native banner for the Intake App Store listing.

## Decision

- add a static `<meta name="apple-itunes-app" content="app-id=6757768955">` tag to `index.html`
- do not set `app-argument` because there is no current deep-link requirement
- keep the tag in the base HTML template instead of React-managed SEO code so Safari can see it on initial document load

## Notes

- the existing prerender pipeline starts from `dist/index.html`, so a template-level tag will automatically flow into prerendered route HTML
- no route-specific variation is needed because the App Store destination is the same on every page
- verification should cover both the source template and prerender preservation
