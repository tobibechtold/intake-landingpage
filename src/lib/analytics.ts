import posthog from "posthog-js";
import { getStoredAttribution } from "./attribution";

const POSTHOG_HOST = "https://eu.i.posthog.com";

let initialized = false;

export const initAnalytics = (): void => {
  const key = import.meta.env.VITE_POSTHOG_KEY as string | undefined;
  if (!key || initialized) {
    return;
  }
  posthog.init(key, {
    api_host: POSTHOG_HOST,
    defaults: "2025-05-24",
    // Cookieless: no persistent identifiers, so no consent banner is required.
    persistence: "memory",
  });
  initialized = true;
};

export type CtaLocation = "hero" | "cta" | "footer" | "navbar";

export const trackStoreCtaClick = (
  platform: "ios" | "android" | "unknown",
  location: CtaLocation,
): void => {
  if (!initialized) {
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
