import { captureUtmParams } from '@/lib/attribution';
import { initAnalytics } from '@/lib/analytics';

/**
 * Client bootstrap, formerly src/main.tsx.
 *
 * When the SPA entry point was deleted during the Astro migration these two calls went
 * with it, and nothing re-homed them. The consequences were silent:
 *
 *  - initAnalytics() never ran, so `initialized` stayed false and every
 *    trackStoreCtaClick() call returned early. No PostHog events at all.
 *  - captureUtmParams() never ran, so ?utm_source=... on a landing visit was never
 *    stored — which is what the bio links (insta-bio, threads-bio) depend on, and what
 *    /go later reads back as stored attribution.
 *
 * This runs on every page because it is imported from BaseLayout. Keep it that way:
 * attribution has to be captured on the visitor's first page, whichever one that is.
 */
captureUtmParams(window.location.search);
initAnalytics();
