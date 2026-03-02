import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getSeoContent } from "@/lib/seo";

const SITE_ORIGIN = "https://intake.tobibechtold.dev";

const upsertMeta = (attr: "name" | "property", key: string, content: string) => {
  const selector = `meta[${attr}="${key}"][data-seo-managed="true"]`;
  const existing = document.head.querySelector(selector) as HTMLMetaElement | null;
  const meta = existing ?? document.createElement("meta");
  meta.setAttribute(attr, key);
  meta.setAttribute("content", content);
  meta.setAttribute("data-seo-managed", "true");
  if (!existing) {
    document.head.appendChild(meta);
  }
};

const upsertLink = (rel: string, attrs: Record<string, string>) => {
  const attrSelector = Object.entries(attrs)
    .map(([k, v]) => `[${k}="${v}"]`)
    .join("");
  const selector = `link[rel="${rel}"]${attrSelector}[data-seo-managed="true"]`;
  const existing = document.head.querySelector(selector) as HTMLLinkElement | null;
  const link = existing ?? document.createElement("link");

  link.setAttribute("rel", rel);
  Object.entries(attrs).forEach(([k, v]) => link.setAttribute(k, v));
  link.setAttribute("data-seo-managed", "true");

  if (!existing) {
    document.head.appendChild(link);
  }
};

const removeManagedSeoNodes = () => {
  document.head.querySelectorAll('[data-seo-managed="true"]').forEach((node) => node.remove());
};

const SeoHead = () => {
  const location = useLocation();

  useEffect(() => {
    const seo = getSeoContent(location.pathname, SITE_ORIGIN);

    removeManagedSeoNodes();
    document.title = seo.title;

    upsertMeta("name", "description", seo.description);
    upsertMeta(
      "name",
      "robots",
      seo.noIndex
        ? "noindex, nofollow"
        : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
    );

    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:site_name", "Intake");
    upsertMeta("property", "og:title", seo.title);
    upsertMeta("property", "og:description", seo.description);
    upsertMeta("property", "og:url", seo.canonical);
    upsertMeta("property", "og:image", `${SITE_ORIGIN}/og-image.png`);
    upsertMeta("property", "og:image:secure_url", `${SITE_ORIGIN}/og-image.png`);
    upsertMeta("property", "og:image:type", "image/png");
    upsertMeta("property", "og:image:width", "1200");
    upsertMeta("property", "og:image:height", "630");
    upsertMeta("property", "og:image:alt", "Intake calorie counter app on iPhone");
    upsertMeta("property", "og:locale", seo.ogLocale);
    upsertMeta("property", "og:locale:alternate", seo.locale === "en" ? "de_DE" : "en_US");

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", seo.title);
    upsertMeta("name", "twitter:description", seo.description);
    upsertMeta("name", "twitter:image", `${SITE_ORIGIN}/og-image.png`);

    upsertLink("canonical", { href: seo.canonical });
    upsertLink("alternate", { hreflang: "en", href: seo.alternates.en });
    upsertLink("alternate", { hreflang: "de", href: seo.alternates.de });
    upsertLink("alternate", { hreflang: "x-default", href: seo.alternates.xDefault });

    if (seo.homeSchema) {
      seo.homeSchema.forEach((item) => {
        const script = document.createElement("script");
        script.setAttribute("type", "application/ld+json");
        script.setAttribute("data-seo-managed", "true");
        script.textContent = JSON.stringify(item);
        document.head.appendChild(script);
      });
    }
  }, [location.pathname]);

  return null;
};

export default SeoHead;
