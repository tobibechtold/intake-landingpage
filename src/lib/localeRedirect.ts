import { buildLocalizedPath, getPageFromPathname } from "@/lib/localeRouting";

export const getGermanRedirectPath = (
  pathname: string,
  browserLanguage: string | undefined,
  preferredLanguage?: string | null
): string | null => {
  if (preferredLanguage === "en") {
    return null;
  }

  const lang = (browserLanguage ?? "").toLowerCase();
  if (!lang.startsWith("de")) {
    return null;
  }

  if (pathname === "/de" || pathname.startsWith("/de/")) {
    return null;
  }

  const page = getPageFromPathname(pathname);
  if (page === "notFound") {
    return null;
  }

  return buildLocalizedPath(page, "de");
};
