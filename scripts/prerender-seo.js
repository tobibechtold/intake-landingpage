import { getLocalizedWhatsNewRoutes, getWhatsNewEntry } from "./whats-new-content.js";

const SITE_ORIGIN = "https://www.getintake.de";
const OG_IMAGE_URL = "/og-image.png";

const STATIC_PAGE_SEO = {
  "/": {
    lang: "de",
    title: "Intake App - Kalorienzähler ohne Abo für iPhone & Android",
    description:
      "Intake ist ein Kalorienzähler ohne Abo und ohne Konto. Tracke Kalorien, Makros, 30+ Nährwerte, Fasten, Wasser, Widgets, Apple Watch und PDF-Export mit optionalem iCloud- oder Google-Drive-Sync.",
    canonical: `${SITE_ORIGIN}/`,
    ogLocale: "de_DE",
  },
  "/funktionen": {
    lang: "de",
    title: "Intake Funktionen - Kalorien, Nährwerte, Widgets, Apple Watch und mehr",
    description:
      "Entdecke die Intake Funktionen für Kalorien, Barcode-Scan, eigene Produkte und Rezepte, 30+ Nährwerte, Widgets, Apple Watch, PDF-Export, Intervallfasten, Wasser und Health-Integrationen.",
    canonical: `${SITE_ORIGIN}/funktionen`,
    ogLocale: "de_DE",
  },
  "/kalorienzaehler-ohne-abo": {
    lang: "de",
    title: "Kalorienzähler ohne Abo - Intake",
    description:
      "Intake ist ein Kalorienzähler ohne Abo und ohne Premium-Wall. Tracke Kalorien, Makros, Nährwerte, Widgets, Apple Watch, Wasser und Intervallfasten ohne monatliche Kosten.",
    canonical: `${SITE_ORIGIN}/kalorienzaehler-ohne-abo`,
    ogLocale: "de_DE",
  },
  "/kalorien-tracker-ohne-konto": {
    lang: "de",
    title: "Kalorien-Tracker ohne Konto - Intake",
    description:
      "Intake hat gar kein Kontosystem. Tracke Kalorien, Makros, Wasser und Nährwerte lokal auf deinem Gerät mit optionalem iCloud- oder Google-Drive-Sync.",
    canonical: `${SITE_ORIGIN}/kalorien-tracker-ohne-konto`,
    ogLocale: "de_DE",
  },
  "/vergleiche": {
    lang: "de",
    title: "Intake Vergleiche und Alternativen",
    description:
      "Vergleiche Intake mit Abo-Trackern und sieh dir Alternativen zu Yazio und FDDB an, mit Fokus auf Preis, Premium-Walls, Kontosysteme und Produktstil.",
    canonical: `${SITE_ORIGIN}/vergleiche`,
    ogLocale: "de_DE",
  },
  "/vergleiche/yazio-alternative": {
    lang: "de",
    title: "Yazio Alternative - Intake vs. Yazio",
    description:
      "Vergleiche Intake und Yazio bei Abo-Modell, Premium-Wall, Produktstil, Kontosystem und Kernfunktionen.",
    canonical: `${SITE_ORIGIN}/vergleiche/yazio-alternative`,
    ogLocale: "de_DE",
  },
  "/vergleiche/fddb-alternative": {
    lang: "de",
    title: "FDDB Alternative - Intake vs. FDDB",
    description:
      "Vergleiche Intake und FDDB bei Abo-Modell, Plattformlogik, Kontosystem, Kernfunktionen und Produktfokus.",
    canonical: `${SITE_ORIGIN}/vergleiche/fddb-alternative`,
    ogLocale: "de_DE",
  },
  "/privacy": {
    lang: "de",
    title: "Datenschutzerklärung | Intake",
    description:
      "Lies die Datenschutzerklärung von Intake und erfahre, wie Daten verarbeitet, gespeichert und mit Apple Health (iOS), Health Connect (Android), iCloud (iOS) oder Google Drive (Android) synchronisiert werden.",
    canonical: `${SITE_ORIGIN}/privacy`,
    ogLocale: "de_DE",
  },
  "/terms": {
    lang: "de",
    title: "Nutzungsbedingungen | Intake",
    description:
      "Lies die Nutzungsbedingungen von Intake mit Informationen zu App-Nutzung, iOS- und Android-Integrationen, Haftung und Support.",
    canonical: `${SITE_ORIGIN}/terms`,
    ogLocale: "de_DE",
  },
  "/en": {
    lang: "en",
    title: "Intake App - Calorie Counter for iPhone & Android | No Subscription",
    description:
      "Intake is a private calorie counter app with no subscription and no account system. Track calories, macros, 30+ nutrients, fasting, water, widgets, Apple Watch, and PDF export with optional iCloud (iOS) or Google Drive (Android) sync.",
    canonical: `${SITE_ORIGIN}/en`,
    ogLocale: "en_US",
  },
  "/en/features": {
    lang: "en",
    title: "Intake Features - Calories, Nutrients, Widgets, Apple Watch, and More",
    description:
      "Explore Intake features for calorie tracking, barcode scanning, custom foods and recipes, 30+ nutrients, widgets, Apple Watch, PDF export, intermittent fasting, water, and health integrations.",
    canonical: `${SITE_ORIGIN}/en/features`,
    ogLocale: "en_US",
  },
  "/en/calorie-counter-no-subscription": {
    lang: "en",
    title: "Calorie Counter Without Subscription | Intake",
    description:
      "Intake is a calorie counter without a subscription and without a premium wall. Track calories, macros, nutrients, widgets, Apple Watch, fasting, and water without recurring monthly fees.",
    canonical: `${SITE_ORIGIN}/en/calorie-counter-no-subscription`,
    ogLocale: "en_US",
  },
  "/en/calorie-tracker-no-account": {
    lang: "en",
    title: "Calorie Tracker Without Account | Intake",
    description:
      "Intake has no account system at all. Track calories, macros, nutrients, fasting, and water while keeping your data on your device with optional iCloud or Google Drive sync.",
    canonical: `${SITE_ORIGIN}/en/calorie-tracker-no-account`,
    ogLocale: "en_US",
  },
  "/en/comparisons": {
    lang: "en",
    title: "Intake Comparisons and Alternatives",
    description:
      "Compare Intake with subscription-led calorie trackers and see how it differs from Yazio and FDDB on pricing, feature gating, account logic, and product focus.",
    canonical: `${SITE_ORIGIN}/en/comparisons`,
    ogLocale: "en_US",
  },
  "/en/comparisons/yazio-alternative": {
    lang: "en",
    title: "Yazio Alternative - Intake vs. Yazio",
    description:
      "Compare Intake and Yazio on subscriptions, feature gating, product style, account logic, and core tracking features.",
    canonical: `${SITE_ORIGIN}/en/comparisons/yazio-alternative`,
    ogLocale: "en_US",
  },
  "/en/comparisons/fddb-alternative": {
    lang: "en",
    title: "FDDB Alternative - Intake vs. FDDB",
    description:
      "Compare Intake and FDDB on subscriptions, platform logic, account model, built-in features, and tracking focus.",
    canonical: `${SITE_ORIGIN}/en/comparisons/fddb-alternative`,
    ogLocale: "en_US",
  },
  "/en/privacy": {
    lang: "en",
    title: "Privacy Policy | Intake",
    description:
      "Read the Intake Privacy Policy. Learn how calorie and nutrition data is processed, stored, and synced with Apple Health (iOS), Health Connect (Android), iCloud (iOS), and Google Drive (Android).",
    canonical: `${SITE_ORIGIN}/en/privacy`,
    ogLocale: "en_US",
  },
  "/en/terms": {
    lang: "en",
    title: "Terms of Use | Intake",
    description:
      "Read the Intake Terms of Use for app usage, legal notes, iOS and Android integrations, and support information.",
    canonical: `${SITE_ORIGIN}/en/terms`,
    ogLocale: "en_US",
  },
};

const WHATS_NEW_INDEX_SEO = {
  en: {
    lang: "en",
    title: "What's New | Intake",
    description:
      "Release notes, feature updates, screenshots, and product improvements for every Intake version from 2.1.1 onward.",
    canonical: `${SITE_ORIGIN}/en/whats-new`,
    ogLocale: "en_US",
  },
  de: {
    lang: "de",
    title: "Was ist neu | Intake",
    description:
      "Release Notes, neue Funktionen, Screenshots und Produktverbesserungen fur jede Intake-Version ab 2.1.1.",
    canonical: `${SITE_ORIGIN}/whats-new`,
    ogLocale: "de_DE",
  },
};

const STATIC_ROUTE_ALTERNATES = {
  "/": { de: "/", en: "/en" },
  "/funktionen": { de: "/funktionen", en: "/en/features" },
  "/kalorienzaehler-ohne-abo": {
    de: "/kalorienzaehler-ohne-abo",
    en: "/en/calorie-counter-no-subscription",
  },
  "/kalorien-tracker-ohne-konto": {
    de: "/kalorien-tracker-ohne-konto",
    en: "/en/calorie-tracker-no-account",
  },
  "/vergleiche": { de: "/vergleiche", en: "/en/comparisons" },
  "/vergleiche/yazio-alternative": {
    de: "/vergleiche/yazio-alternative",
    en: "/en/comparisons/yazio-alternative",
  },
  "/vergleiche/fddb-alternative": {
    de: "/vergleiche/fddb-alternative",
    en: "/en/comparisons/fddb-alternative",
  },
  "/privacy": { de: "/privacy", en: "/en/privacy" },
  "/terms": { de: "/terms", en: "/en/terms" },
  "/whats-new": { de: "/whats-new", en: "/en/whats-new" },
  "/en": { de: "/", en: "/en" },
  "/en/features": { de: "/funktionen", en: "/en/features" },
  "/en/calorie-counter-no-subscription": {
    de: "/kalorienzaehler-ohne-abo",
    en: "/en/calorie-counter-no-subscription",
  },
  "/en/calorie-tracker-no-account": {
    de: "/kalorien-tracker-ohne-konto",
    en: "/en/calorie-tracker-no-account",
  },
  "/en/comparisons": { de: "/vergleiche", en: "/en/comparisons" },
  "/en/comparisons/yazio-alternative": {
    de: "/vergleiche/yazio-alternative",
    en: "/en/comparisons/yazio-alternative",
  },
  "/en/comparisons/fddb-alternative": {
    de: "/vergleiche/fddb-alternative",
    en: "/en/comparisons/fddb-alternative",
  },
  "/en/privacy": { de: "/privacy", en: "/en/privacy" },
  "/en/terms": { de: "/terms", en: "/en/terms" },
  "/en/whats-new": { de: "/whats-new", en: "/en/whats-new" },
};

const getAlternateRoutes = (route) => {
  const staticAlternates = STATIC_ROUTE_ALTERNATES[route];
  if (staticAlternates) {
    return staticAlternates;
  }

  const whatsNewMatch = route.match(/^\/(en\/)?whats-new\/([^/]+)$/);
  if (whatsNewMatch) {
    const [, enPrefix, version] = whatsNewMatch;
    return {
      de: `/whats-new/${version}`,
      en: `/en/whats-new/${version}`,
    };
  }

  throw new Error(`Unsupported alternate route mapping: ${route}`);
};

export const PRERENDER_ROUTES = [
  "/",
  "/funktionen",
  "/kalorienzaehler-ohne-abo",
  "/kalorien-tracker-ohne-konto",
  "/vergleiche",
  "/vergleiche/yazio-alternative",
  "/vergleiche/fddb-alternative",
  "/privacy",
  "/terms",
  ...getLocalizedWhatsNewRoutes("de"),
  "/en",
  "/en/features",
  "/en/calorie-counter-no-subscription",
  "/en/calorie-tracker-no-account",
  "/en/comparisons",
  "/en/comparisons/yazio-alternative",
  "/en/comparisons/fddb-alternative",
  "/en/privacy",
  "/en/terms",
  ...getLocalizedWhatsNewRoutes("en"),
];

const getPageSeo = (route) => {
  const staticSeo = STATIC_PAGE_SEO[route];
  if (staticSeo) {
    return staticSeo;
  }

  if (route === "/whats-new") {
    return WHATS_NEW_INDEX_SEO.de;
  }

  if (route === "/en/whats-new") {
    return WHATS_NEW_INDEX_SEO.en;
  }

  const match = route.match(/^\/(en\/)?whats-new\/([^/]+)$/);
  if (!match) {
    throw new Error(`Unsupported prerender route: ${route}`);
  }

  const [, enPrefix, version] = match;
  const locale = enPrefix ? "en" : "de";
  const entry = getWhatsNewEntry(locale, version);

  if (!entry) {
    throw new Error(`Missing What's New entry for prerender route: ${route}`);
  }

  return {
    lang: locale,
    title: `${entry.title} | Intake`,
    description: entry.summary,
    canonical: `${SITE_ORIGIN}${route}`,
    ogLocale: locale === "de" ? "de_DE" : "en_US",
  };
};

const escapeAttr = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const buildSeoBlock = (route, seo) => {
  const alternates = getAlternateRoutes(route);
  const alternateDe = `${SITE_ORIGIN}${alternates.de}`;
  const alternateEn = `${SITE_ORIGIN}${alternates.en}`;

  return [
    "<!-- PRERENDER_SEO_START -->",
    '<meta property="og:type" content="website" />',
    '<meta property="og:site_name" content="Intake" />',
    `<meta property="og:title" content="${escapeAttr(seo.title)}" />`,
    `<meta property="og:description" content="${escapeAttr(seo.description)}" />`,
    `<meta property="og:url" content="${escapeAttr(seo.canonical)}" />`,
    `<meta property="og:image" content="${OG_IMAGE_URL}" />`,
    `<meta property="og:image:secure_url" content="${OG_IMAGE_URL}" />`,
    '<meta property="og:image:type" content="image/png" />',
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    '<meta property="og:image:alt" content="Intake calorie counter app on iOS and Android" />',
    `<meta property="og:locale" content="${seo.ogLocale}" />`,
    `<meta property="og:locale:alternate" content="${seo.ogLocale === "en_US" ? "de_DE" : "en_US"}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${escapeAttr(seo.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(seo.description)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE_URL}" />`,
    `<link rel="canonical" href="${escapeAttr(seo.canonical)}" />`,
    `<link rel="alternate" hreflang="en" href="${escapeAttr(alternateEn)}" />`,
    `<link rel="alternate" hreflang="de" href="${escapeAttr(alternateDe)}" />`,
    `<link rel="alternate" hreflang="x-default" href="${SITE_ORIGIN}/" />`,
    "<!-- PRERENDER_SEO_END -->",
  ].join("\n    ");
};

export const buildPrerenderedHtml = (templateHtml, route) => {
  const seo = getPageSeo(route);

  const seoBlock = buildSeoBlock(route, seo);

  let html = templateHtml;
  html = html.replace(/<html lang="[^"]+">/, `<html lang="${seo.lang}">`);
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${seo.title}</title>`);

  if (/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/.test(html)) {
    html = html.replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
      `<meta name="description" content="${escapeAttr(seo.description)}" />`
    );
  } else {
    html = html.replace("</head>", `    <meta name="description" content="${escapeAttr(seo.description)}" />\n  </head>`);
  }

  html = html.replace(/<!-- PRERENDER_SEO_START -->[\s\S]*?<!-- PRERENDER_SEO_END -->\s*/g, "");
  html = html.replace("</head>", `    ${seoBlock}\n  </head>`);

  return html;
};
