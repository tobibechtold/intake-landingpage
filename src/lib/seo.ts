import { Language } from "@/i18n/translations";
import { FAQ_BY_LANGUAGE } from "@/lib/faqData";
import {
  SitePage,
  buildAlternateUrls,
  getLocaleFromPathname,
  getPageFromPathname,
} from "@/lib/localeRouting";
import { getAppStoreUrl, getGooglePlayUrl } from "@/lib/storeLinks";

interface PageSeo {
  title: string;
  description: string;
}

interface SeoByLocale {
  home: PageSeo;
  privacy: PageSeo;
  terms: PageSeo;
  notFound: PageSeo;
}

const SEO_COPY: Record<Language, SeoByLocale> = {
  en: {
    home: {
      title: "Intake - Calorie Counter for iPhone & Android | No Subscription",
      description:
        "Simple calorie tracking for iOS and Android. No subscription, no account required. Track calories with barcode scan, Apple Health (iOS), Health Connect (Android), iCloud (iOS), and Google Drive sync (Android).",
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
    notFound: {
      title: "404 - Page Not Found | Intake",
      description: "The requested page could not be found.",
    },
  },
  de: {
    home: {
      title: "Intake - Kalorienzähler für iPhone & Android | Ohne Abo",
      description:
        "Einfaches Kalorientracking für iOS und Android. Kein Abo, kein Konto notwendig. Mit Barcode-Scanner, Apple Health (iOS), Health Connect (Android), iCloud (iOS) und Google Drive Sync (Android).",
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
  const copy = SEO_COPY[locale][page];

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
        alternateName: "Intake Calorie Counter",
        applicationCategory: "HealthApplication",
        operatingSystem: "iOS 15.0+, Android",
        url: canonicalizePath(origin, locale === "de" ? "/de" : "/"),
        downloadUrl: [getAppStoreUrl(locale), getGooglePlayUrl()],
        inLanguage: ["en", "de"],
        image: `${origin}/og-image.png`,
        screenshot: [
          `${origin}/screenshots/en-1-Onboarding.png`,
          `${origin}/screenshots/en-2-Dashboard.png`,
          `${origin}/screenshots/en-3-Testimonial.png`,
        ],
        description: copy.description,
        featureList: [
          "3+ million foods database",
          "Barcode scanner",
          "Apple Health sync (iOS)",
          "Health Connect sync (Android)",
          "iCloud sync (iOS)",
          "Google Drive sync (Android)",
          "No subscription",
          "No account required",
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Intake",
        url: `${origin}/`,
        logo: `${origin}/favicon.webp`,
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
