import { Language } from "@/i18n/translations";

export type SitePage = "home" | "privacy" | "terms" | "notFound";

const PAGE_SEGMENT_BY_PAGE: Record<Exclude<SitePage, "home" | "notFound">, string> = {
  privacy: "privacy",
  terms: "terms",
};

const normalizePathname = (pathname: string): string => {
  if (!pathname) {
    return "/";
  }

  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return path.length > 1 ? path.replace(/\/+$/, "") || "/" : path;
};

export const getLocaleFromPathname = (pathname: string): Language => {
  const normalized = normalizePathname(pathname);
  return normalized === "/de" || normalized.startsWith("/de/") ? "de" : "en";
};

export const getPageFromPathname = (pathname: string): SitePage => {
  const normalized = normalizePathname(pathname);
  const noLocale = normalized === "/de" ? "/" : normalized.replace(/^\/de(?=\/|$)/, "") || "/";

  if (noLocale === "/privacy") {
    return "privacy";
  }

  if (noLocale === "/terms") {
    return "terms";
  }

  if (noLocale === "/") {
    return "home";
  }

  return "notFound";
};

export const buildLocalizedPath = (page: SitePage, locale: Language): string => {
  const basePath = page === "home" || page === "notFound" ? "/" : `/${PAGE_SEGMENT_BY_PAGE[page]}`;

  if (locale === "en") {
    return basePath;
  }

  return basePath === "/" ? "/de" : `/de${basePath}`;
};

export const buildAlternateUrls = (pathname: string, origin: string) => {
  const locale = getLocaleFromPathname(pathname);
  const page = getPageFromPathname(pathname);
  const canonicalPath = buildLocalizedPath(page, locale);

  return {
    canonical: `${origin}${canonicalPath}`,
    en: `${origin}${buildLocalizedPath(page, "en")}`,
    de: `${origin}${buildLocalizedPath(page, "de")}`,
    xDefault: `${origin}/`,
  };
};
