import type { Language } from "@/i18n/translations";
import { sourceFromSlug } from "./attribution";
import {
  APP_STORE_URLS,
  appendAppStoreAttribution,
  appendGooglePlayAttribution,
  detectClientPlatform,
  GOOGLE_PLAY_URL,
  type ClientPlatform,
} from "./storeLinks";

export const SLUG_PATTERN = /^[a-z0-9][a-z0-9-]{0,63}$/;
export const LANDING_PAGE_URL = "https://www.getintake.de/";

export interface SmartLinkRedirect {
  url: string;
  platform: ClientPlatform;
}

const languageFromAcceptLanguage = (acceptLanguage: string): Language =>
  /^de\b/i.test(acceptLanguage.trim()) ? "de" : "en";

export const buildSmartLinkRedirect = (
  slug: string,
  userAgent: string,
  acceptLanguage: string,
): SmartLinkRedirect | null => {
  if (!SLUG_PATTERN.test(slug)) {
    return null;
  }
  const platform = detectClientPlatform(userAgent);

  if (platform === "android") {
    const attribution = { source: sourceFromSlug(slug), medium: "smartlink", campaign: slug };
    return { url: appendGooglePlayAttribution(GOOGLE_PLAY_URL, attribution), platform };
  }

  if (platform === "ios") {
    const storeUrl = APP_STORE_URLS[languageFromAcceptLanguage(acceptLanguage)];
    return { url: appendAppStoreAttribution(storeUrl, slug), platform };
  }

  const params = new URLSearchParams({
    utm_source: sourceFromSlug(slug),
    utm_medium: "smartlink",
    utm_campaign: slug,
  });
  return { url: `${LANDING_PAGE_URL}?${params.toString()}`, platform };
};
