import type { Language } from "@/i18n/translations";

const APP_STORE_URLS: Record<Language, string> = {
  en: "https://apps.apple.com/us/app/intake-kalorienz%C3%A4hler/id6757768955",
  de: "https://apps.apple.com/de/app/intake-kalorienz%C3%A4hler/id6757768955",
};

const GOOGLE_PLAY_URL = "https://play.google.com/store/apps/details?id=de.bechtoldit.intake";

export const getAppStoreUrl = (language: Language): string => APP_STORE_URLS[language];
export const getGooglePlayUrl = (): string => GOOGLE_PLAY_URL;

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
