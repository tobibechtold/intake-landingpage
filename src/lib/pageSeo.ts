// SEO metadata for every static route.
//
// Ported verbatim from the deleted scripts/prerender-seo.js. The German copy is
// hand-tuned for ranking keywords and must not be paraphrased. Only the metadata
// was kept: the 1098 lines of duplicated body content that lived alongside it are
// gone, because Astro now renders the real page content as HTML.

export type Locale = 'de' | 'en';

export interface PageSeo {
  lang: Locale;
  title: string;
  description: string;
  canonical: string;
  ogLocale: 'de_DE' | 'en_US';
}

export const SITE_ORIGIN = 'https://www.getintake.de';

const STATIC_PAGE_SEO: Record<string, PageSeo> = {
  "/": {
    "lang": "de",
    "title": "Intake App - Kalorienzähler ohne Abo für iPhone & Android",
    "description": "Intake ist ein Kalorienzähler ohne Abo und ohne Konto. Tracke Kalorien, Makros, 30+ Nährwerte, Fasten, Wasser, Widgets, Apple Watch und PDF-Export mit optionalem iCloud- oder Google-Drive-Sync.",
    "canonical": "https://www.getintake.de/",
    "ogLocale": "de_DE"
  },
  "/404": {
    "lang": "de",
    "title": "Seite nicht gefunden | Intake",
    "description": "Diese Seite existiert nicht. Zurück zur Intake Startseite.",
    "canonical": "https://www.getintake.de/404",
    "ogLocale": "de_DE"
  },
  "/en": {
    "lang": "en",
    "title": "Intake App - Calorie Counter for iPhone & Android | No Subscription",
    "description": "Intake is a private calorie counter app with no subscription and no account system. Track calories, macros, 30+ nutrients, fasting, water, widgets, Apple Watch, and PDF export with optional iCloud (iOS) or Google Drive (Android) sync.",
    "canonical": "https://www.getintake.de/en",
    "ogLocale": "en_US"
  },
  "/en/calorie-counter-no-subscription": {
    "lang": "en",
    "title": "Calorie Counter Without Subscription | Intake",
    "description": "Intake is a calorie counter without a subscription and without a premium wall. Track calories, macros, nutrients, widgets, Apple Watch, fasting, and water without recurring monthly fees.",
    "canonical": "https://www.getintake.de/en/calorie-counter-no-subscription",
    "ogLocale": "en_US"
  },
  "/en/calorie-tracker-no-account": {
    "lang": "en",
    "title": "Calorie Tracker Without Account | Intake",
    "description": "Intake has no account system at all. Track calories, macros, nutrients, fasting, and water while keeping your data on your device with optional iCloud or Google Drive sync.",
    "canonical": "https://www.getintake.de/en/calorie-tracker-no-account",
    "ogLocale": "en_US"
  },
  "/en/comparisons": {
    "lang": "en",
    "title": "Intake Comparisons and Alternatives",
    "description": "Compare Intake with subscription-led calorie trackers and see how it differs from Yazio and FDDB on pricing, feature gating, account logic, and product focus.",
    "canonical": "https://www.getintake.de/en/comparisons",
    "ogLocale": "en_US"
  },
  "/en/comparisons/fddb-alternative": {
    "lang": "en",
    "title": "FDDB Alternative - Intake vs. FDDB",
    "description": "Compare Intake and FDDB on subscriptions, platform logic, account model, built-in features, and tracking focus.",
    "canonical": "https://www.getintake.de/en/comparisons/fddb-alternative",
    "ogLocale": "en_US"
  },
  "/en/comparisons/yazio-alternative": {
    "lang": "en",
    "title": "Yazio Alternative - Intake vs. Yazio",
    "description": "Compare Intake and Yazio on subscriptions, feature gating, product style, account logic, and core tracking features.",
    "canonical": "https://www.getintake.de/en/comparisons/yazio-alternative",
    "ogLocale": "en_US"
  },
  "/en/features": {
    "lang": "en",
    "title": "Intake Features - Calories, Nutrients, Widgets, Apple Watch, and More",
    "description": "Explore Intake features for calorie tracking, barcode scanning, custom foods and recipes, 30+ nutrients, widgets, Apple Watch, PDF export, intermittent fasting, water, and health integrations.",
    "canonical": "https://www.getintake.de/en/features",
    "ogLocale": "en_US"
  },
  "/en/help": {
    "lang": "en",
    "title": "Help & FAQ | Intake",
    "description": "Answers about pricing, privacy, sync, Apple Health, Health Connect, food data, and the most important Intake features.",
    "canonical": "https://www.getintake.de/en/help",
    "ogLocale": "en_US"
  },
  "/en/help/own-api-key": {
    "lang": "en",
    "title": "Set Up Your Own API Key (BYOK) for Intake AI",
    "description": "Learn how to create and securely add an OpenAI, Claude, or Gemini API key to Intake AI, choose a provider, and optionally select a model.",
    "canonical": "https://www.getintake.de/en/help/own-api-key",
    "ogLocale": "en_US"
  },
  "/en/intake-ai": {
    "lang": "en",
    "title": "Intake AI - Optional AI Food Logging With Text and Photos",
    "description": "Intake AI is an optional add-on for faster meal logging. Describe food, analyze photos, scan nutrition labels, or use your own OpenAI or Claude API key.",
    "canonical": "https://www.getintake.de/en/intake-ai",
    "ogLocale": "en_US"
  },
  "/en/privacy": {
    "lang": "en",
    "title": "Privacy Policy | Intake",
    "description": "Read the Intake Privacy Policy. Learn how calorie and nutrition data is processed, stored, and synced with Apple Health (iOS), Health Connect (Android), iCloud (iOS), and Google Drive (Android).",
    "canonical": "https://www.getintake.de/en/privacy",
    "ogLocale": "en_US"
  },
  "/en/terms": {
    "lang": "en",
    "title": "Terms of Use | Intake",
    "description": "Read the Intake Terms of Use for app usage, legal notes, iOS and Android integrations, and support information.",
    "canonical": "https://www.getintake.de/en/terms",
    "ogLocale": "en_US"
  },
  "/en/whats-new": {
    "lang": "en",
    "title": "What's New | Intake",
    "description": "Release notes, feature updates, screenshots, and product improvements for every Intake version from 2.1.1 onward.",
    "canonical": "https://www.getintake.de/en/whats-new",
    "ogLocale": "en_US"
  },
  "/funktionen": {
    "lang": "de",
    "title": "Intake Funktionen - Kalorien, Nährwerte, Widgets, Apple Watch und mehr",
    "description": "Entdecke die Intake Funktionen für Kalorien, Barcode-Scan, eigene Produkte und Rezepte, 30+ Nährwerte, Widgets, Apple Watch, PDF-Export, Intervallfasten, Wasser und Health-Integrationen.",
    "canonical": "https://www.getintake.de/funktionen",
    "ogLocale": "de_DE"
  },
  "/hilfe": {
    "lang": "de",
    "title": "Hilfe & FAQ | Intake",
    "description": "Antworten zu Preis, Datenschutz, Sync, Apple Health, Health Connect, Lebensmitteldaten und den wichtigsten Intake-Funktionen.",
    "canonical": "https://www.getintake.de/hilfe",
    "ogLocale": "de_DE"
  },
  "/hilfe/eigener-api-schluessel": {
    "lang": "de",
    "title": "Eigenen API-Schlüssel (BYOK) für Intake AI einrichten",
    "description": "Erfahre, wie du einen API-Schlüssel von OpenAI, Claude oder Gemini sicher in Intake AI hinterlegst, den Anbieter wählst und optional ein Modell einträgst.",
    "canonical": "https://www.getintake.de/hilfe/eigener-api-schluessel",
    "ogLocale": "de_DE"
  },
  "/intake-ai": {
    "lang": "de",
    "title": "Intake AI - Optionales KI-Food-Logging mit Text und Fotos",
    "description": "Intake AI ist ein optionales Add-on für schnelleres KI-Food-Logging. Beschreibe Essen, analysiere Fotos, scanne Nährwertlabels oder nutze deinen eigenen API-Schlüssel.",
    "canonical": "https://www.getintake.de/intake-ai",
    "ogLocale": "de_DE"
  },
  "/kalorien-tracker-ohne-konto": {
    "lang": "de",
    "title": "Kalorien-Tracker ohne Konto - Intake",
    "description": "Intake hat gar kein Kontosystem. Tracke Kalorien, Makros, Wasser und Nährwerte lokal auf deinem Gerät mit optionalem iCloud- oder Google-Drive-Sync.",
    "canonical": "https://www.getintake.de/kalorien-tracker-ohne-konto",
    "ogLocale": "de_DE"
  },
  "/kalorienzaehler-ohne-abo": {
    "lang": "de",
    "title": "Kalorienzähler ohne Abo - Intake",
    "description": "Intake ist ein Kalorienzähler ohne Abo und ohne Premium-Wall. Tracke Kalorien, Makros, Nährwerte, Widgets, Apple Watch, Wasser und Intervallfasten ohne monatliche Kosten.",
    "canonical": "https://www.getintake.de/kalorienzaehler-ohne-abo",
    "ogLocale": "de_DE"
  },
  "/privacy": {
    "lang": "de",
    "title": "Datenschutzerklärung | Intake",
    "description": "Lies die Datenschutzerklärung von Intake und erfahre, wie Daten verarbeitet, gespeichert und mit Apple Health (iOS), Health Connect (Android), iCloud (iOS) oder Google Drive (Android) synchronisiert werden.",
    "canonical": "https://www.getintake.de/privacy",
    "ogLocale": "de_DE"
  },
  "/terms": {
    "lang": "de",
    "title": "Nutzungsbedingungen | Intake",
    "description": "Lies die Nutzungsbedingungen von Intake mit Informationen zu App-Nutzung, iOS- und Android-Integrationen, Haftung und Support.",
    "canonical": "https://www.getintake.de/terms",
    "ogLocale": "de_DE"
  },
  "/vergleiche": {
    "lang": "de",
    "title": "Intake Vergleiche und Alternativen",
    "description": "Vergleiche Intake mit Abo-Trackern und sieh dir Alternativen zu Yazio und FDDB an, mit Fokus auf Preis, Premium-Walls, Kontosysteme und Produktstil.",
    "canonical": "https://www.getintake.de/vergleiche",
    "ogLocale": "de_DE"
  },
  "/vergleiche/fddb-alternative": {
    "lang": "de",
    "title": "FDDB Alternative - Intake vs. FDDB",
    "description": "Vergleiche Intake und FDDB bei Abo-Modell, Plattformlogik, Kontosystem, Kernfunktionen und Produktfokus.",
    "canonical": "https://www.getintake.de/vergleiche/fddb-alternative",
    "ogLocale": "de_DE"
  },
  "/vergleiche/yazio-alternative": {
    "lang": "de",
    "title": "Yazio Alternative - Intake vs. Yazio",
    "description": "Vergleiche Intake und Yazio bei Abo-Modell, Premium-Wall, Produktstil, Kontosystem und Kernfunktionen.",
    "canonical": "https://www.getintake.de/vergleiche/yazio-alternative",
    "ogLocale": "de_DE"
  },
  "/whats-new": {
    "lang": "de",
    "title": "Was ist neu | Intake",
    "description": "Release Notes, neue Funktionen, Screenshots und Produktverbesserungen fur jede Intake-Version ab 2.1.1.",
    "canonical": "https://www.getintake.de/whats-new",
    "ogLocale": "de_DE"
  },
  "/presse": {
    "lang": "de",
    "title": "Presse | Intake",
    "description": "Pressematerial zu Intake: Fakten, Zitate, Screenshots und Kontakt. Kalorienzähler ohne Abo und ohne Account, nativ für iOS und Android, KI wahlweise mit eigenem API-Key.",
    "canonical": "https://www.getintake.de/presse",
    "ogLocale": "de_DE"
  },
  "/en/press": {
    "lang": "en",
    "title": "Press | Intake",
    "description": "Press resources for Intake: facts, quotes, screenshots and contact. A calorie counter without a subscription or account, native on iOS and Android, with AI you can run on your own API key.",
    "canonical": "https://www.getintake.de/en/press",
    "ogLocale": "en_US"
  },
};

// The DE <-> EN slug map, previously implicit in the route table of src/App.tsx.
const ROUTE_PAIRS: ReadonlyArray<readonly [string, string]> = [
  ['/', '/en'],
  ['/funktionen', '/en/features'],
  ['/kalorienzaehler-ohne-abo', '/en/calorie-counter-no-subscription'],
  ['/kalorien-tracker-ohne-konto', '/en/calorie-tracker-no-account'],
  ['/intake-ai', '/en/intake-ai'],
  ['/vergleiche', '/en/comparisons'],
  ['/hilfe', '/en/help'],
  ['/hilfe/eigener-api-schluessel', '/en/help/own-api-key'],
  ['/privacy', '/en/privacy'],
  ['/terms', '/en/terms'],
  ['/whats-new', '/en/whats-new'],
  ['/presse', '/en/press'],
];

const WHATS_NEW_ENTRY = /^\/(en\/)?whats-new\/([^/]+)$/;
const COMPARISON_DETAIL = /^\/(?:vergleiche|en\/comparisons)\/([^/]+)$/;

export const getPageSeo = (route: string): PageSeo => {
  const staticSeo = STATIC_PAGE_SEO[route];
  if (staticSeo) {
    return staticSeo;
  }

  const entryMatch = WHATS_NEW_ENTRY.exec(route);
  if (entryMatch) {
    const locale: Locale = entryMatch[1] ? 'en' : 'de';
    const index = STATIC_PAGE_SEO[locale === 'de' ? '/whats-new' : '/en/whats-new'];

    // title and description are overridden per entry by the route file, which has
    // the collection entry in hand. These are only the fallbacks.
    return {
      lang: locale,
      title: index.title,
      description: index.description,
      canonical: `${SITE_ORIGIN}${route}`,
      ogLocale: locale === 'de' ? 'de_DE' : 'en_US',
    };
  }

  throw new Error(`No SEO metadata for route: ${route}`);
};

/**
 * The props every React page component needs, derived from its route alone.
 *
 * Deliberately returns plain values rather than letting the React tree import this
 * module: page components are rendered at build time, but hydrated islands beneath
 * them (FeatureVoting, ScreenshotGallery) would otherwise pull this whole metadata
 * table into the client bundle.
 */
export const pageProps = (route: string): { lang: Locale; alternateHref: string | null } => {
  const lang = getPageSeo(route).lang;
  const pair = getHreflangPair(route);

  return {
    lang,
    alternateHref: pair ? (lang === 'de' ? pair.en : pair.de) : null,
  };
};

export const getHreflangPair = (route: string): { de: string; en: string } | null => {
  const direct = ROUTE_PAIRS.find(([de, en]) => de === route || en === route);
  if (direct) {
    return { de: direct[0], en: direct[1] };
  }

  const entryMatch = WHATS_NEW_ENTRY.exec(route);
  if (entryMatch) {
    const version = entryMatch[2];
    return { de: `/whats-new/${version}`, en: `/en/whats-new/${version}` };
  }

  const comparisonMatch = COMPARISON_DETAIL.exec(route);
  if (comparisonMatch) {
    const slug = comparisonMatch[1];
    return { de: `/vergleiche/${slug}`, en: `/en/comparisons/${slug}` };
  }

  return null;
};
