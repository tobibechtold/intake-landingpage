import {
  buildLocalizedPath,
  getLegacyGermanRedirectPath,
  getPageFromPathname,
  getLocaleFromPathname,
  getWhatsNewVersionFromPathname,
} from "@/lib/localeRouting";

export const getGermanRedirectPath = (
  pathname: string,
  browserLanguage: string | undefined,
  preferredLanguage?: string | null
): string | null => {
  const legacyGermanRedirect = getLegacyGermanRedirectPath(pathname);
  if (legacyGermanRedirect) {
    return legacyGermanRedirect;
  }

  const locale = getLocaleFromPathname(pathname);
  if (locale === "en") {
    return null;
  }

  const page = getPageFromPathname(pathname);
  if (page === "notFound") {
    return null;
  }

  const version = page === "whatsNewEntry" ? getWhatsNewVersionFromPathname(pathname) : undefined;

  if (preferredLanguage === "de") {
    return null;
  }

  if (preferredLanguage === "en") {
    return buildLocalizedPath(page, "en", version ?? undefined);
  }

  if (!browserLanguage) {
    return null;
  }

  const lang = browserLanguage.toLowerCase();
  if (lang.startsWith("de")) {
    return null;
  }

  return buildLocalizedPath(page, "en", version ?? undefined);
};
