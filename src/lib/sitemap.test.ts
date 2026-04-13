import { describe, expect, it } from "vitest";
import { buildSitemapXml } from "../../scripts/sitemap.js";

describe("sitemap", () => {
  it("includes the new evergreen german and english seo pages", () => {
    const xml = buildSitemapXml();

    expect(xml).toContain("<loc>https://www.getintake.de/funktionen</loc>");
    expect(xml).toContain("<loc>https://www.getintake.de/kalorienzaehler-ohne-abo</loc>");
    expect(xml).toContain("<loc>https://www.getintake.de/kalorien-tracker-ohne-konto</loc>");
    expect(xml).toContain("<loc>https://www.getintake.de/vergleiche</loc>");
    expect(xml).toContain("<loc>https://www.getintake.de/vergleiche/yazio-alternative</loc>");
    expect(xml).toContain("<loc>https://www.getintake.de/vergleiche/fddb-alternative</loc>");
    expect(xml).toContain("<loc>https://www.getintake.de/hilfe</loc>");
    expect(xml).toContain("<loc>https://www.getintake.de/en/features</loc>");
    expect(xml).toContain(
      "<loc>https://www.getintake.de/en/calorie-counter-no-subscription</loc>"
    );
    expect(xml).toContain("<loc>https://www.getintake.de/en/calorie-tracker-no-account</loc>");
    expect(xml).toContain("<loc>https://www.getintake.de/en/comparisons</loc>");
    expect(xml).toContain("<loc>https://www.getintake.de/en/help</loc>");
  });

  it("includes localized what's new overview and detail URLs", () => {
    const xml = buildSitemapXml();

    expect(xml).toContain("<loc>https://www.getintake.de/whats-new</loc>");
    expect(xml).toContain("<loc>https://www.getintake.de/en/whats-new</loc>");
    expect(xml).toContain("<loc>https://www.getintake.de/whats-new/2.1.1</loc>");
    expect(xml).toContain("<loc>https://www.getintake.de/en/whats-new/2.1.1</loc>");
  });
});
