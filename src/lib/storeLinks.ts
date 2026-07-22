import type { Language } from "@/i18n/translations";
import { getStoredAttribution, type StoredAttribution } from "./attribution";

export const APP_STORE_URLS: Record<Language, string> = {
  en: "https://apps.apple.com/us/app/intake-kalorienz%C3%A4hler/id6757768955",
  de: "https://apps.apple.com/de/app/intake-kalorienz%C3%A4hler/id6757768955",
};

export const GOOGLE_PLAY_URL = "https://play.google.com/store/apps/details?id=de.bechtoldit.intake";

// Apple App Analytics campaign provider token — public, appears in every campaign URL.
export const APPLE_PROVIDER_TOKEN = "128030281";

const WEBSITE_ATTRIBUTION: StoredAttribution = {
  source: "website",
  medium: "website",
  campaign: "website",
};

export const appendAppStoreAttribution = (baseUrl: string, campaign: string): string =>
  `${baseUrl}?pt=${APPLE_PROVIDER_TOKEN}&ct=${encodeURIComponent(campaign)}&mt=8`;

export const appendGooglePlayAttribution = (
  baseUrl: string,
  attribution: StoredAttribution,
): string => {
  const referrer = new URLSearchParams({
    utm_source: attribution.source,
    utm_medium: attribution.medium,
    utm_campaign: attribution.campaign,
  }).toString();
  return `${baseUrl}&referrer=${encodeURIComponent(referrer)}`;
};

const resolveAttribution = (): StoredAttribution => getStoredAttribution() ?? WEBSITE_ATTRIBUTION;

export const getAppStoreUrl = (language: Language): string =>
  appendAppStoreAttribution(APP_STORE_URLS[language], resolveAttribution().campaign);

export const getGooglePlayUrl = (): string =>
  appendGooglePlayAttribution(GOOGLE_PLAY_URL, resolveAttribution());

export type ClientPlatform = "ios" | "android" | "unknown";

export const detectClientPlatform = (userAgent: string): ClientPlatform => {
  if (/android/i.test(userAgent)) {
    return "android";
  }

  // iPadOS can report itself as Macintosh while still exposing a mobile Safari UA.
  if (/(iPad|iPhone|iPod)/i.test(userAgent) || (/Macintosh/i.test(userAgent) && /Mobile/i.test(userAgent))) {
    return "ios";
  }

  return "unknown";
};

export const getNavbarDownloadUrl = (
  language: Language,
  userAgent: string,
  fallbackUrl: string,
): string => {
  const platform = detectClientPlatform(userAgent);

  if (platform === "android") {
    return getGooglePlayUrl();
  }

  if (platform === "ios") {
    return getAppStoreUrl(language);
  }

  return fallbackUrl;
};
