import type { PostHog } from "posthog-js";
import { getStoredAttribution } from "./attribution";

const POSTHOG_HOST = "https://eu.i.posthog.com";

/**
 * posthog-js is ~217 KB — larger than react-dom, and previously the single biggest
 * script on every page because it was imported at module scope. It is now loaded
 * dynamically so it never sits in the critical path.
 *
 * Ordering still holds: initAnalytics() starts the load, and trackStoreCtaClick()
 * awaits the same promise, so a click that lands before PostHog finishes loading is
 * still captured rather than dropped.
 */
let posthogPromise: Promise<PostHog> | null = null;
let initPromise: Promise<PostHog | null> | null = null;

const getKey = (): string | undefined =>
  import.meta.env.VITE_POSTHOG_KEY as string | undefined;

const loadPosthog = (): Promise<PostHog> => {
  posthogPromise ??= import("posthog-js").then((module) => module.default);
  return posthogPromise;
};

export const initAnalytics = (): Promise<PostHog | null> => {
  initPromise ??= (async () => {
    const key = getKey();
    if (!key) {
      return null;
    }

    const posthog = await loadPosthog();
    posthog.init(key, {
      api_host: POSTHOG_HOST,
      defaults: "2025-05-24",
      // Cookieless: no persistent identifiers, so no consent banner is required.
      persistence: "memory",
    });
    return posthog;
  })();

  return initPromise;
};

export type CtaLocation = "hero" | "cta" | "footer" | "navbar";

export const trackStoreCtaClick = async (
  platform: "ios" | "android" | "unknown",
  location: CtaLocation,
): Promise<void> => {
  const posthog = await initAnalytics();
  if (!posthog) {
    return;
  }

  const attribution = getStoredAttribution();
  posthog.capture("store_cta_click", {
    platform,
    location,
    campaign: attribution?.campaign ?? "website",
    source: attribution?.source ?? "website",
  });
};
