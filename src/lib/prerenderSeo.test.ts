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

  it("injects metadata for the new feature overview routes", () => {
    const germanHtml = buildPrerenderedHtml(template, "/funktionen");
    const englishHtml = buildPrerenderedHtml(template, "/en/features");

    expect(germanHtml).toContain('<html lang="de">');
    expect(germanHtml).toContain(`${origin}/funktionen`);
    expect(germanHtml).toContain(`hreflang="en" href="${origin}/en/features"`);
    expect(germanHtml).toMatch(/Funktionen|Widgets|Apple Watch|Rezepte/);

    expect(englishHtml).toContain('<html lang="en">');
    expect(englishHtml).toContain(`${origin}/en/features`);
    expect(englishHtml).toContain(`hreflang="de" href="${origin}/funktionen"`);
  });

  it("uses updated cross-platform SEO copy in prerendered home HTML", () => {
    const html = buildPrerenderedHtml(template, "/en");

    expect(html).toContain("iPhone &amp; Android");
    expect(html).toContain("no account system");
    expect(html).toContain("Apple Watch");
    expect(html).toContain("Google Drive (Android) sync");
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
    expect(PRERENDER_ROUTES).toEqual(
      expect.arrayContaining([
        "/",
        "/funktionen",
        "/kalorienzaehler-ohne-abo",
        "/kalorien-tracker-ohne-konto",
        "/vergleiche",
        "/vergleiche/yazio-alternative",
        "/vergleiche/fddb-alternative",
        "/privacy",
        "/terms",
        "/whats-new",
        "/whats-new/2.1.4",
        "/whats-new/2.1.3",
        "/whats-new/2.1.2",
        "/whats-new/2.1.1",
        "/en",
        "/en/features",
        "/en/calorie-counter-no-subscription",
        "/en/calorie-tracker-no-account",
        "/en/comparisons",
        "/en/comparisons/yazio-alternative",
        "/en/comparisons/fddb-alternative",
        "/en/privacy",
        "/en/terms",
        "/en/whats-new",
        "/en/whats-new/2.1.4",
        "/en/whats-new/2.1.3",
        "/en/whats-new/2.1.2",
        "/en/whats-new/2.1.1",
      ])
    );
  });
});
