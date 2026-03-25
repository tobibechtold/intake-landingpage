import { getLocalizedWhatsNewRoutes, getWhatsNewEntries } from "./whats-new-content.js";

const SITE_ORIGIN = "https://www.getintake.de";

const STATIC_URLS = [
  { path: "/", lastmod: "2026-03-02", changefreq: "weekly", priority: "1.0" },
  { path: "/de", lastmod: "2026-03-02", changefreq: "weekly", priority: "0.9" },
  { path: "/privacy", lastmod: "2026-03-02", changefreq: "monthly", priority: "0.5" },
  { path: "/de/privacy", lastmod: "2026-03-02", changefreq: "monthly", priority: "0.5" },
  { path: "/terms", lastmod: "2026-03-02", changefreq: "monthly", priority: "0.5" },
  { path: "/de/terms", lastmod: "2026-03-02", changefreq: "monthly", priority: "0.5" },
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
    path: entry.locale === "de" ? `/de/whats-new/${entry.version}` : `/whats-new/${entry.version}`,
    lastmod: entry.publishedAt,
    changefreq: "monthly",
    priority: "0.8",
  }));

  const overviewEntries = [
    { path: "/whats-new", lastmod: latestPublishedAt, changefreq: "weekly", priority: "0.8" },
    { path: "/de/whats-new", lastmod: latestPublishedAt, changefreq: "weekly", priority: "0.8" },
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
