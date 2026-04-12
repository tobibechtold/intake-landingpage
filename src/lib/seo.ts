import { Language } from "@/i18n/translations";
import { FAQ_BY_LANGUAGE } from "@/lib/faqData";
import {
  SitePage,
  buildAlternateUrls,
  getLocaleFromPathname,
  getPageFromPathname,
  getWhatsNewVersionFromPathname,
} from "@/lib/localeRouting";
import { getAppStoreUrl, getGooglePlayUrl } from "@/lib/storeLinks";
import { getWhatsNewEntry } from "@/lib/whatsNewContent";

interface PageSeo {
  title: string;
  description: string;
}

interface SeoByLocale {
  home: PageSeo;
  features: PageSeo;
  noSubscription: PageSeo;
  noAccount: PageSeo;
  comparisons: PageSeo;
  comparisonDetail: PageSeo;
  privacy: PageSeo;
  terms: PageSeo;
  whatsNewIndex: PageSeo;
  notFound: PageSeo;
}

const SEO_COPY: Record<Language, SeoByLocale> = {
  en: {
    home: {
      title: "Intake App - Calorie Counter for iPhone & Android | No Subscription",
      description:
        "Intake is a private calorie counter app with no subscription and no account system. Track calories, macros, 30+ nutrients, fasting, water, widgets, Apple Watch, and PDF export with optional iCloud (iOS) or Google Drive (Android) sync.",
    },
    features: {
      title: "Intake Features - Calories, Nutrients, Widgets, Apple Watch, and More",
      description:
        "Explore Intake features for calorie tracking, barcode scanning, custom foods and recipes, 30+ nutrients, widgets, Apple Watch, PDF export, intermittent fasting, water, and health integrations.",
    },
    noSubscription: {
      title: "Calorie Counter Without Subscription | Intake",
      description:
        "Intake is a calorie counter without a subscription and without a premium wall. Track calories, macros, nutrients, widgets, Apple Watch, fasting, and water without recurring monthly fees.",
    },
    noAccount: {
      title: "Calorie Tracker Without Account | Intake",
      description:
        "Intake has no account system at all. Track calories, macros, nutrients, fasting, and water while keeping your data on your device with optional iCloud or Google Drive sync.",
    },
    comparisons: {
      title: "Intake Comparisons and Alternatives",
      description:
        "Compare Intake with subscription-led calorie trackers and see how it differs from Yazio and FDDB on pricing, feature gating, account logic, and product focus.",
    },
    comparisonDetail: {
      title: "Intake Alternative Comparison",
      description:
        "Compare Intake with other calorie trackers on pricing, privacy, features, and overall tracking experience.",
    },
    privacy: {
      title: "Privacy Policy | Intake",
      description:
        "Read the Intake Privacy Policy. Learn how calorie and nutrition data is processed, stored, and synced with Apple Health (iOS), Health Connect (Android), iCloud (iOS), and Google Drive (Android).",
    },
    terms: {
      title: "Terms of Use | Intake",
      description:
        "Read the Intake Terms of Use for app usage, legal notes, iOS and Android integrations, and support information.",
    },
    whatsNewIndex: {
      title: "What's New | Intake",
      description:
        "Release notes, feature updates, screenshots, and product improvements for every Intake version from 2.1.1 onward.",
    },
    notFound: {
      title: "404 - Page Not Found | Intake",
      description: "The requested page could not be found.",
    },
  },
  de: {
    home: {
      title: "Intake App - Kalorienzähler ohne Abo für iPhone & Android",
      description:
        "Intake ist ein Kalorienzähler ohne Abo und ohne Konto. Tracke Kalorien, Makros, 30+ Nährwerte, Fasten, Wasser, Widgets, Apple Watch und PDF-Export mit optionalem iCloud- oder Google-Drive-Sync.",
    },
    features: {
      title: "Intake Funktionen - Kalorien, Nährwerte, Widgets, Apple Watch und mehr",
      description:
        "Entdecke die Intake Funktionen für Kalorien, Barcode-Scan, eigene Produkte und Rezepte, 30+ Nährwerte, Widgets, Apple Watch, PDF-Export, Intervallfasten, Wasser und Health-Integrationen.",
    },
    noSubscription: {
      title: "Kalorienzähler ohne Abo - Intake",
      description:
        "Intake ist ein Kalorienzähler ohne Abo und ohne Premium-Wall. Tracke Kalorien, Makros, Nährwerte, Widgets, Apple Watch, Wasser und Intervallfasten ohne monatliche Kosten.",
    },
    noAccount: {
      title: "Kalorien-Tracker ohne Konto - Intake",
      description:
        "Intake hat gar kein Kontosystem. Tracke Kalorien, Makros, Wasser und Nährwerte lokal auf deinem Gerät mit optionalem iCloud- oder Google-Drive-Sync.",
    },
    comparisons: {
      title: "Intake Vergleiche und Alternativen",
      description:
        "Vergleiche Intake mit Abo-Trackern und sieh dir Alternativen zu Yazio und FDDB an, mit Fokus auf Preis, Premium-Walls, Kontosysteme und Produktstil.",
    },
    comparisonDetail: {
      title: "Intake Alternative im Vergleich",
      description:
        "Vergleiche Intake mit anderen Kalorientrackern bei Preis, Datenschutz, Funktionen und Tracking-Alltag.",
    },
    privacy: {
      title: "Datenschutzerklärung | Intake",
      description:
        "Lies die Datenschutzerklärung von Intake und erfahre, wie Daten verarbeitet, gespeichert und mit Apple Health (iOS), Health Connect (Android), iCloud (iOS) oder Google Drive (Android) synchronisiert werden.",
    },
    terms: {
      title: "Nutzungsbedingungen | Intake",
      description:
        "Lies die Nutzungsbedingungen von Intake mit Informationen zu App-Nutzung, iOS- und Android-Integrationen, Haftung und Support.",
    },
    whatsNewIndex: {
      title: "Was ist neu | Intake",
      description:
        "Release Notes, neue Funktionen, Screenshots und Produktverbesserungen fur jede Intake-Version ab 2.1.1.",
    },
    notFound: {
      title: "404 - Seite nicht gefunden | Intake",
      description: "Die angeforderte Seite wurde nicht gefunden.",
    },
  },
};

const OG_LOCALE: Record<Language, string> = {
  en: "en_US",
  de: "de_DE",
};

export interface SeoContent {
  locale: Language;
  page: SitePage;
  title: string;
  description: string;
  canonical: string;
  alternates: {
    en: string;
    de: string;
    xDefault: string;
  };
  ogLocale: string;
  homeSchema: Record<string, unknown>[] | null;
  noIndex: boolean;
}

export const getSeoContent = (pathname: string, origin: string): SeoContent => {
  const locale = getLocaleFromPathname(pathname);
  const page = getPageFromPathname(pathname);
  const alternates = buildAlternateUrls(pathname, origin);
  const copy =
    page === "whatsNewEntry" ? null : SEO_COPY[locale][page as Exclude<SitePage, "whatsNewEntry">];

  if (page === "whatsNewEntry") {
    const version = getWhatsNewVersionFromPathname(pathname);
    const entry = version ? getWhatsNewEntry(version, locale) : undefined;

    if (!entry) {
      const notFoundCopy = SEO_COPY[locale].notFound;

      return {
        locale,
        page: "notFound",
        title: notFoundCopy.title,
        description: notFoundCopy.description,
        canonical: alternates.canonical,
        alternates,
        ogLocale: OG_LOCALE[locale],
        homeSchema: null,
        noIndex: true,
      };
    }

    return {
      locale,
      page,
      title: `${entry.title} | Intake`,
      description: entry.summary,
      canonical: alternates.canonical,
      alternates,
      ogLocale: OG_LOCALE[locale],
      homeSchema: null,
      noIndex: false,
    };
  }

  if (page !== "home") {
    return {
      locale,
      page,
      title: copy.title,
      description: copy.description,
      canonical: alternates.canonical,
      alternates,
      ogLocale: OG_LOCALE[locale],
      homeSchema: null,
      noIndex: page === "notFound",
    };
  }

  const faq = FAQ_BY_LANGUAGE[locale];
  const schemaDescription =
    locale === "de"
      ? "Intake ist ein Kalorienzähler ohne Abo und ohne Konto. Tracke Kalorien, Makros, 30+ Nährwerte, Fasten und Wasser mit Barcode-Scanner, Apple Health, Health Connect und optionalem iCloud- oder Google-Drive-Sync."
      : "Intake is a private calorie counter app with no subscription and no account system. Track calories, macros, 30+ nutrients, fasting, and water with barcode scan, Apple Health (iOS), Health Connect (Android), and optional iCloud or Google Drive sync.";
  const schemaFeatureList =
    locale === "de"
      ? [
          "Kalorienzähler ohne Abo",
          "Kein Konto",
          "Barcode-Scanner",
          "Daten bleiben auf deinem Gerät",
          "30+ Nährwerte",
          "Vitamine und Mineralstoffe",
          "Koffein und Mikronährstoffe",
          "Intervallfasten mit Live Activities",
          "Wasser-Tracking",
          "Apple Health und Health Connect",
          "iCloud und Google Drive Sync",
        ]
      : [
          "Private calorie counter app",
          "No subscription",
          "No account system",
          "Barcode scanner",
          "30+ nutrients",
          "Vitamins and minerals",
          "Caffeine and micronutrients",
          "Intermittent fasting with Live Activities",
          "Water tracking",
          "Apple Health sync (iOS)",
          "Health Connect sync (Android)",
          "iCloud sync (iOS)",
          "Google Drive sync (Android)",
        ];

  return {
    locale,
    page,
    title: copy.title,
    description: copy.description,
    canonical: alternates.canonical,
    alternates,
    ogLocale: OG_LOCALE[locale],
    homeSchema: [
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Intake",
        alternateName: locale === "de" ? "Intake Kalorienzähler" : "Intake Calorie Counter",
        applicationCategory: "HealthApplication",
        operatingSystem: "iOS 15.0+, Android",
        url: canonicalizePath(origin, locale === "de" ? "/" : "/en"),
        downloadUrl: [getAppStoreUrl(locale), getGooglePlayUrl()],
        inLanguage: ["en", "de"],
        image: `${origin}/og-image.png`,
        screenshot: [
          `${origin}/screenshots/landing/${locale}-dashboard.png`,
          `${origin}/screenshots/landing/${locale}-statistics.png`,
          `${origin}/screenshots/landing/${locale}-apple-watch.png`,
        ],
        description: schemaDescription,
        featureList: schemaFeatureList,
      },
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Intake",
        url: `${origin}/`,
        logo: `${origin}/favicon-512x512.png`,
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
    noIndex: false,
  };
};

const canonicalizePath = (origin: string, pathname: string): string => {
  if (pathname === "/") {
    return `${origin}/`;
  }

  return `${origin}${pathname}`;
};
