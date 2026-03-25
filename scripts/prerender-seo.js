import { getLocalizedWhatsNewRoutes, getWhatsNewEntry } from "./whats-new-content.js";

const SITE_ORIGIN = "https://www.getintake.de";
const OG_IMAGE_URL = "/og-image.png";

const STATIC_PAGE_SEO = {
  "/": {
    lang: "en",
    title: "Intake App - Calorie Counter for iPhone & Android | No Subscription",
    description:
      "Intake is a private calorie counter app with no subscription and no account required. Track calories and macros with barcode scan, Apple Health (iOS), Health Connect (Android), iCloud (iOS), and Google Drive sync (Android).",
    canonical: `${SITE_ORIGIN}/`,
    ogLocale: "en_US",
  },
  "/privacy": {
    lang: "en",
    title: "Privacy Policy | Intake",
    description:
      "Read the Intake Privacy Policy. Learn how calorie and nutrition data is processed, stored, and synced with Apple Health (iOS), Health Connect (Android), iCloud (iOS), and Google Drive (Android).",
    canonical: `${SITE_ORIGIN}/privacy`,
    ogLocale: "en_US",
  },
  "/terms": {
    lang: "en",
    title: "Terms of Use | Intake",
    description:
      "Read the Intake Terms of Use for app usage, legal notes, iOS and Android integrations, and support information.",
    canonical: `${SITE_ORIGIN}/terms`,
    ogLocale: "en_US",
  },
  "/de": {
    lang: "de",
    title: "Intake App - Kalorienzähler ohne Abo für iPhone & Android",
    description:
      "Intake ist ein Kalorienzähler ohne Abo und ohne Konto. Tracke Kalorien und Makros mit Barcode-Scanner, Apple Health, Health Connect und Daten, die auf deinem Gerät bleiben.",
    canonical: `${SITE_ORIGIN}/de`,
    ogLocale: "de_DE",
  },
  "/de/privacy": {
    lang: "de",
    title: "Datenschutzerklärung | Intake",
    description:
      "Lies die Datenschutzerklärung von Intake und erfahre, wie Daten verarbeitet, gespeichert und mit Apple Health (iOS), Health Connect (Android), iCloud (iOS) oder Google Drive (Android) synchronisiert werden.",
    canonical: `${SITE_ORIGIN}/de/privacy`,
    ogLocale: "de_DE",
  },
  "/de/terms": {
    lang: "de",
    title: "Nutzungsbedingungen | Intake",
    description:
      "Lies die Nutzungsbedingungen von Intake mit Informationen zu App-Nutzung, iOS- und Android-Integrationen, Haftung und Support.",
    canonical: `${SITE_ORIGIN}/de/terms`,
    ogLocale: "de_DE",
  },
};

const WHATS_NEW_INDEX_SEO = {
  en: {
    lang: "en",
    title: "What's New | Intake",
    description:
      "Release notes, feature updates, screenshots, and product improvements for every Intake version from 2.1.1 onward.",
    canonical: `${SITE_ORIGIN}/whats-new`,
    ogLocale: "en_US",
  },
  de: {
    lang: "de",
    title: "Was ist neu | Intake",
    description:
      "Release Notes, neue Funktionen, Screenshots und Produktverbesserungen fur jede Intake-Version ab 2.1.1.",
    canonical: `${SITE_ORIGIN}/de/whats-new`,
    ogLocale: "de_DE",
  },
};

export const PRERENDER_ROUTES = [
  "/",
  "/privacy",
  "/terms",
  ...getLocalizedWhatsNewRoutes("en"),
  "/de",
  "/de/privacy",
  "/de/terms",
  ...getLocalizedWhatsNewRoutes("de"),
];

const getPageSeo = (route) => {
  const staticSeo = STATIC_PAGE_SEO[route];
  if (staticSeo) {
    return staticSeo;
  }

  if (route === "/whats-new") {
    return WHATS_NEW_INDEX_SEO.en;
  }

  if (route === "/de/whats-new") {
    return WHATS_NEW_INDEX_SEO.de;
  }

  const match = route.match(/^\/(de\/)?whats-new\/([^/]+)$/);
  if (!match) {
    throw new Error(`Unsupported prerender route: ${route}`);
  }

  const [, dePrefix, version] = match;
  const locale = dePrefix ? "de" : "en";
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
  const alternateEn = route.startsWith("/de")
    ? `${SITE_ORIGIN}${route.slice(3) || "/"}`
    : `${SITE_ORIGIN}${route}`;
  const alternateDe = route.startsWith("/de")
    ? `${SITE_ORIGIN}${route}`
    : `${SITE_ORIGIN}${route === "/" ? "/de" : `/de${route}`}`;

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
