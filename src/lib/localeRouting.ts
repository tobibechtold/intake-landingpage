import { Language } from "@/i18n/translations";

export type SitePage =
  | "home"
  | "privacy"
  | "terms"
  | "whatsNewIndex"
  | "whatsNewEntry"
  | "notFound";

const PAGE_SEGMENT_BY_PAGE: Record<Exclude<SitePage, "home" | "whatsNewEntry" | "notFound">, string> = {
  privacy: "privacy",
  terms: "terms",
  whatsNewIndex: "whats-new",
};

const normalizePathname = (pathname: string): string => {
  if (!pathname) {
    return "/";
  }

  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return path.length > 1 ? path.replace(/\/+$/, "") || "/" : path;
};

export const getWhatsNewVersionFromPathname = (pathname: string): string | null => {
  const normalized = normalizePathname(pathname);
  const match = normalized.match(/^\/(?:de\/)?whats-new\/([^/]+)$/);
  return match?.[1] ?? null;
};

export const getLocaleFromPathname = (pathname: string): Language => {
  const normalized = normalizePathname(pathname);
  return normalized === "/de" || normalized.startsWith("/de/") ? "de" : "en";
};

export const getPageFromPathname = (pathname: string): SitePage => {
  const normalized = normalizePathname(pathname);
  const noLocale = normalized === "/de" ? "/" : normalized.replace(/^\/de(?=\/|$)/, "") || "/";

  if (/^\/whats-new\/[^/]+$/.test(noLocale)) {
    return "whatsNewEntry";
  }

  if (noLocale === "/whats-new") {
    return "whatsNewIndex";
  }

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

export const buildLocalizedPath = (page: SitePage, locale: Language, version?: string): string => {
  if (page === "whatsNewEntry") {
    if (!version) {
      throw new Error("buildLocalizedPath requires a version for whatsNewEntry routes.");
    }

    return locale === "en" ? `/whats-new/${version}` : `/de/whats-new/${version}`;
  }

  const basePath =
    page === "home" || page === "notFound"
      ? "/"
      : `/${PAGE_SEGMENT_BY_PAGE[page]}`;

  if (locale === "en") {
    return basePath;
  }

  return basePath === "/" ? "/de" : `/de${basePath}`;
};

export const buildAlternateUrls = (pathname: string, origin: string) => {
  const locale = getLocaleFromPathname(pathname);
  const page = getPageFromPathname(pathname);
  const version = page === "whatsNewEntry" ? getWhatsNewVersionFromPathname(pathname) : undefined;
  const canonicalPath = buildLocalizedPath(page, locale, version ?? undefined);

  return {
    canonical: `${origin}${canonicalPath}`,
    en: `${origin}${buildLocalizedPath(page, "en", version ?? undefined)}`,
    de: `${origin}${buildLocalizedPath(page, "de", version ?? undefined)}`,
    xDefault: `${origin}/`,
  };
};
