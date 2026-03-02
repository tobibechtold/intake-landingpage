import type { Language } from "@/i18n/translations";

const APP_STORE_URLS: Record<Language, string> = {
  en: "https://apps.apple.com/us/app/intake-kalorienz%C3%A4hler/id6757768955",
  de: "https://apps.apple.com/de/app/intake-kalorienz%C3%A4hler/id6757768955",
};

export const getAppStoreUrl = (language: Language): string => APP_STORE_URLS[language];
