const SITE_ORIGIN = "https://intake.tobibechtold.dev";
const OG_IMAGE_URL = "/og-image.png";

const PAGE_SEO = {
  "/": {
    lang: "en",
    title: "Intake - Calorie Counter for iPhone & Android | No Subscription",
    description:
      "Simple calorie tracking for iOS and Android. No subscription, no account required. Track calories with barcode scan, Apple Health (iOS), Health Connect (Android), iCloud (iOS), and Google Drive sync (Android).",
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
    title: "Intake - Kalorienzähler für iPhone & Android | Ohne Abo",
    description:
      "Einfaches Kalorientracking für iOS und Android. Kein Abo, kein Konto notwendig. Mit Barcode-Scanner, Apple Health (iOS), Health Connect (Android), iCloud (iOS) und Google Drive Sync (Android).",
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

export const PRERENDER_ROUTES = Object.keys(PAGE_SEO);

const escapeAttr = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const buildSeoBlock = (route, seo) => {
  const alternateEn = route.startsWith("/de")
    ? `${SITE_ORIGIN}${route.slice(3) || "/"}`
    : `${SITE_ORIGIN}${route === "/" ? "/" : `/de${route}`}`;
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
  const seo = PAGE_SEO[route];
  if (!seo) {
    throw new Error(`Unsupported prerender route: ${route}`);
  }

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
