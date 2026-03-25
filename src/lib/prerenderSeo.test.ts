import { describe, expect, it } from "vitest";
import { buildPrerenderedHtml, PRERENDER_ROUTES } from "../../scripts/prerender-seo.js";

describe("prerender-seo", () => {
  const origin = "https://www.getintake.de";
  const template = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Placeholder</title>
    <meta name="description" content="Placeholder description" />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`;

  it("injects OG metadata for German homepage", () => {
    const html = buildPrerenderedHtml(template, "/");

    expect(html).toContain('<html lang="de">');
    expect(html).toContain("Intake App - Kalorienzähler ohne Abo für iPhone & Android");
    expect(html).toContain("Intake ist ein Kalorienzähler ohne Abo und ohne Konto");
    expect(html).toContain('property="og:title"');
    expect(html).toContain(`content="${origin}/"`);
    expect(html).toContain('property="og:image"');
    expect(html).toContain('content="/og-image.png"');
  });

  it("includes canonical and alternate links", () => {
    const html = buildPrerenderedHtml(template, "/privacy");

    expect(html).toContain(`<link rel="canonical" href="${origin}/privacy" />`);
    expect(html).toContain(`<link rel="alternate" hreflang="de" href="${origin}/privacy" />`);
    expect(html).toContain(`<link rel="alternate" hreflang="en" href="${origin}/en/privacy" />`);
    expect(html).toContain(`<link rel="alternate" hreflang="x-default" href="${origin}/" />`);
  });

  it("uses updated cross-platform SEO copy in prerendered home HTML", () => {
    const html = buildPrerenderedHtml(template, "/en");

    expect(html).toContain("iPhone &amp; Android");
    expect(html).toContain("Health Connect (Android)");
    expect(html).toContain("Google Drive sync (Android)");
    expect(html).toContain('property="og:image:alt" content="Intake calorie counter app on iOS and Android"');
  });

  it("injects release metadata for localized what's new detail pages", () => {
    const html = buildPrerenderedHtml(template, "/en/whats-new/2.1.1");

    expect(html).toContain("What's new in Intake 2.1.1 | Intake");
    expect(html).toContain(`href="${origin}/en/whats-new/2.1.1"`);
    expect(html).toContain(`hreflang="en" href="${origin}/en/whats-new/2.1.1"`);
    expect(html).toContain(`hreflang="de" href="${origin}/whats-new/2.1.1"`);
  });

  it("defines all localized routes that should be emitted", () => {
    expect(PRERENDER_ROUTES).toEqual([
      "/",
      "/privacy",
      "/terms",
      "/whats-new",
      "/whats-new/2.1.3",
      "/whats-new/2.1.2",
      "/whats-new/2.1.1",
      "/en",
      "/en/privacy",
      "/en/terms",
      "/en/whats-new",
      "/en/whats-new/2.1.3",
      "/en/whats-new/2.1.2",
      "/en/whats-new/2.1.1",
    ]);
  });
});
