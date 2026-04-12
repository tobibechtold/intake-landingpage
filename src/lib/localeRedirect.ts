import { getLegacyGermanRedirectPath } from "@/lib/localeRouting";

export const getGermanRedirectPath = (
  pathname: string,
  _browserLanguage: string | undefined,
  preferredLanguage?: string | null
): string | null => {
  const legacyGermanRedirect = getLegacyGermanRedirectPath(pathname);
  if (legacyGermanRedirect) {
    return legacyGermanRedirect;
  }

  void preferredLanguage;
  return null;
};
