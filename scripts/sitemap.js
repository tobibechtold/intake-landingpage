import { getLocalizedWhatsNewRoutes, getWhatsNewEntries } from "./whats-new-content.js";

const SITE_ORIGIN = "https://www.getintake.de";

const STATIC_URLS = [
  { path: "/", lastmod: "2026-03-02", changefreq: "weekly", priority: "1.0" },
  { path: "/funktionen", lastmod: "2026-04-12", changefreq: "weekly", priority: "0.9" },
  {
    path: "/kalorienzaehler-ohne-abo",
    lastmod: "2026-04-12",
    changefreq: "weekly",
    priority: "0.9",
  },
  {
    path: "/kalorien-tracker-ohne-konto",
    lastmod: "2026-04-12",
    changefreq: "weekly",
    priority: "0.8",
  },
  { path: "/vergleiche", lastmod: "2026-04-12", changefreq: "weekly", priority: "0.8" },
  { path: "/hilfe", lastmod: "2026-04-13", changefreq: "weekly", priority: "0.7" },
  {
    path: "/vergleiche/yazio-alternative",
    lastmod: "2026-04-12",
    changefreq: "weekly",
    priority: "0.7",
  },
  {
    path: "/vergleiche/fddb-alternative",
    lastmod: "2026-04-12",
    changefreq: "weekly",
    priority: "0.7",
  },
  { path: "/privacy", lastmod: "2026-03-02", changefreq: "monthly", priority: "0.5" },
  { path: "/terms", lastmod: "2026-03-02", changefreq: "monthly", priority: "0.5" },
  { path: "/en", lastmod: "2026-03-02", changefreq: "weekly", priority: "0.9" },
  { path: "/en/features", lastmod: "2026-04-12", changefreq: "weekly", priority: "0.8" },
  {
    path: "/en/calorie-counter-no-subscription",
    lastmod: "2026-04-12",
    changefreq: "weekly",
    priority: "0.8",
  },
  {
    path: "/en/calorie-tracker-no-account",
    lastmod: "2026-04-12",
    changefreq: "weekly",
    priority: "0.7",
  },
  { path: "/en/comparisons", lastmod: "2026-04-12", changefreq: "weekly", priority: "0.7" },
  { path: "/en/help", lastmod: "2026-04-13", changefreq: "weekly", priority: "0.7" },
  {
    path: "/en/comparisons/yazio-alternative",
    lastmod: "2026-04-12",
    changefreq: "weekly",
    priority: "0.6",
  },
  {
    path: "/en/comparisons/fddb-alternative",
    lastmod: "2026-04-12",
    changefreq: "weekly",
    priority: "0.6",
  },
  { path: "/en/privacy", lastmod: "2026-03-02", changefreq: "monthly", priority: "0.5" },
  { path: "/en/terms", lastmod: "2026-03-02", changefreq: "monthly", priority: "0.5" },
];

const getLatestPublishedAt = () => {
  const entries = getWhatsNewEntries();
  return entries[0]?.publishedAt ?? "2026-03-14";
};

const buildUrlEntry = ({ path, lastmod, changefreq, priority }) => `  <url>
    <loc>${SITE_ORIGIN}${path === "/" ? "/" : path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;

export const buildSitemapXml = () => {
  const latestPublishedAt = getLatestPublishedAt();
  const releaseEntries = getWhatsNewEntries().map((entry) => ({
    path: entry.locale === "de" ? `/whats-new/${entry.version}` : `/en/whats-new/${entry.version}`,
    lastmod: entry.publishedAt,
    changefreq: "monthly",
    priority: "0.8",
  }));

  const overviewEntries = [
    { path: "/whats-new", lastmod: latestPublishedAt, changefreq: "weekly", priority: "0.8" },
    { path: "/en/whats-new", lastmod: latestPublishedAt, changefreq: "weekly", priority: "0.8" },
  ];

  const urls = [...STATIC_URLS, ...overviewEntries, ...releaseEntries];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(buildUrlEntry).join("\n")}
</urlset>`;
};

export const getSitemapRoutes = () => [
  ...STATIC_URLS.map((entry) => entry.path),
  ...getLocalizedWhatsNewRoutes("en"),
  ...getLocalizedWhatsNewRoutes("de"),
];
