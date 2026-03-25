import { describe, expect, it } from "vitest";
import { buildSitemapXml } from "../../scripts/sitemap.js";

describe("sitemap", () => {
  it("includes localized what's new overview and detail URLs", () => {
    const xml = buildSitemapXml();

    expect(xml).toContain("<loc>https://www.getintake.de/whats-new</loc>");
    expect(xml).toContain("<loc>https://www.getintake.de/de/whats-new</loc>");
    expect(xml).toContain("<loc>https://www.getintake.de/whats-new/2.1.1</loc>");
    expect(xml).toContain("<loc>https://www.getintake.de/de/whats-new/2.1.1</loc>");
  });
});
