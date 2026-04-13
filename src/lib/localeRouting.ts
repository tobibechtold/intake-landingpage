import { Language } from "@/i18n/translations";

export type SitePage =
  | "home"
  | "features"
  | "noSubscription"
  | "noAccount"
  | "comparisons"
  | "help"
  | "comparisonDetail"
  | "privacy"
  | "terms"
  | "whatsNewIndex"
  | "whatsNewEntry"
  | "notFound";

const PAGE_SEGMENT_BY_PAGE: Record<
  Exclude<SitePage, "home" | "comparisonDetail" | "whatsNewEntry" | "notFound">,
  Record<Language, string>
> = {
  features: {
    de: "funktionen",
    en: "features",
  },
  noSubscription: {
    de: "kalorienzaehler-ohne-abo",
    en: "calorie-counter-no-subscription",
  },
  noAccount: {
    de: "kalorien-tracker-ohne-konto",
    en: "calorie-tracker-no-account",
  },
  comparisons: {
    de: "vergleiche",
    en: "comparisons",
  },
  help: {
    de: "hilfe",
    en: "help",
  },
  privacy: {
    de: "privacy",
    en: "privacy",
  },
  terms: {
    de: "terms",
    en: "terms",
  },
  whatsNewIndex: {
    de: "whats-new",
    en: "whats-new",
  },
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
  const match = normalized.match(/^\/(?:(?:de|en)\/)?whats-new\/([^/]+)$/);
  return match?.[1] ?? null;
};

export const getComparisonSlugFromPathname = (pathname: string): string | null => {
  const normalized = normalizePathname(pathname);
  const locale = getLocaleFromPathname(normalized);
  const baseSegment = PAGE_SEGMENT_BY_PAGE.comparisons[locale];
  const withoutLocale =
    normalized === "/de" || normalized === "/en"
      ? "/"
      : normalized.replace(/^\/(?:de|en)(?=\/|$)/, "") || "/";
  const match = withoutLocale.match(new RegExp(`^/${baseSegment}/([^/]+)$`));

  return match?.[1] ?? null;
};

export const getLocaleFromPathname = (pathname: string): Language => {
  const normalized = normalizePathname(pathname);
  return normalized === "/en" || normalized.startsWith("/en/") ? "en" : "de";
};

export const getPageFromPathname = (pathname: string): SitePage => {
  const normalized = normalizePathname(pathname);
  const locale = getLocaleFromPathname(normalized);
  const noLocale =
    normalized === "/de" || normalized === "/en"
      ? "/"
      : normalized.replace(/^\/(?:de|en)(?=\/|$)/, "") || "/";
  const localizedSegments = Object.fromEntries(
    Object.entries(PAGE_SEGMENT_BY_PAGE).map(([page, segments]) => [page, segments[locale]])
  ) as Record<Exclude<SitePage, "home" | "comparisonDetail" | "whatsNewEntry" | "notFound">, string>;

  if (/^\/whats-new\/[^/]+$/.test(noLocale)) {
    return "whatsNewEntry";
  }

  if (noLocale === `/${localizedSegments.whatsNewIndex}`) {
    return "whatsNewIndex";
  }

  if (noLocale === `/${localizedSegments.comparisons}`) {
    return "comparisons";
  }

  if (noLocale === `/${localizedSegments.help}`) {
    return "help";
  }

  if (noLocale.startsWith(`/${localizedSegments.comparisons}/`)) {
    return "comparisonDetail";
  }

  if (noLocale === `/${localizedSegments.features}`) {
    return "features";
  }

  if (noLocale === `/${localizedSegments.noSubscription}`) {
    return "noSubscription";
  }

  if (noLocale === `/${localizedSegments.noAccount}`) {
    return "noAccount";
  }

  if (noLocale === `/${localizedSegments.privacy}`) {
    return "privacy";
  }

  if (noLocale === `/${localizedSegments.terms}`) {
    return "terms";
  }

  if (noLocale === "/") {
    return "home";
  }

  return "notFound";
};

export const buildLocalizedPath = (page: SitePage, locale: Language, detail?: string): string => {
  const prefix = locale === "de" ? "" : "/en";

  if (page === "comparisonDetail") {
    if (!detail) {
      throw new Error("buildLocalizedPath requires a comparison slug for comparisonDetail routes.");
    }

    const comparisonsSegment = PAGE_SEGMENT_BY_PAGE.comparisons[locale];
    return `${prefix}/${comparisonsSegment}/${detail}`;
  }

  if (page === "whatsNewEntry") {
    if (!detail) {
      throw new Error("buildLocalizedPath requires a version for whatsNewEntry routes.");
    }

    return `${prefix}/whats-new/${detail}`;
  }

  const basePath =
    page === "home" || page === "notFound"
      ? "/"
      : `/${PAGE_SEGMENT_BY_PAGE[page][locale]}`;

  if (locale === "de") {
    return basePath;
  }

  return basePath === "/" ? "/en" : `/en${basePath}`;
};

export const getLegacyGermanRedirectPath = (pathname: string): string | null => {
  const normalized = normalizePathname(pathname);

  if (normalized === "/de") {
    return "/";
  }

  if (normalized.startsWith("/de/")) {
    return normalized.replace(/^\/de(?=\/)/, "") || "/";
  }

  return null;
};

export const buildAlternateUrls = (pathname: string, origin: string) => {
  const locale = getLocaleFromPathname(pathname);
  const page = getPageFromPathname(pathname);
  const detail =
    page === "whatsNewEntry"
      ? getWhatsNewVersionFromPathname(pathname)
      : page === "comparisonDetail"
        ? getComparisonSlugFromPathname(pathname)
        : undefined;
  const canonicalPath = buildLocalizedPath(page, locale, detail ?? undefined);

  return {
    canonical: `${origin}${canonicalPath}`,
    en: `${origin}${buildLocalizedPath(page, "en", detail ?? undefined)}`,
    de: `${origin}${buildLocalizedPath(page, "de", detail ?? undefined)}`,
    xDefault: `${origin}/`,
  };
};
