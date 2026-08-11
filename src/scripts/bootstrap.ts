import { captureUtmParams } from '@/lib/attribution';
import { initAnalytics, trackStoreCtaClick, type CtaLocation } from '@/lib/analytics';

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

/**
 * Store CTA tracking, delegated.
 *
 * Static .astro components have no onClick, so store links carry
 * `data-store-cta="ios|android"` and `data-cta-location="hero|cta|footer|navbar"`
 * instead. One listener here covers every such link on every page, including ones
 * rendered inside React islands, so the two never drift apart.
 */
document.addEventListener(
  'click',
  (event) => {
    const target =
      event.target instanceof Element ? event.target.closest('[data-store-cta]') : null;
    if (!target) return;

    const platform = target.getAttribute('data-store-cta');
    const location = target.getAttribute('data-cta-location');
    if (platform !== 'ios' && platform !== 'android') return;

    trackStoreCtaClick(platform, (location ?? 'cta') as CtaLocation);
  },
  { capture: true },
);
