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

  it("injects crawlable static body content for no-subscription intent pages", () => {
    const englishHtml = buildPrerenderedHtml(template, "/en/calorie-counter-no-subscription");
    const germanHtml = buildPrerenderedHtml(template, "/kalorienzaehler-ohne-abo");

    expect(englishHtml).toContain('<main id="static-prerender-content"');
    expect(englishHtml).toContain("A calorie counter without a subscription");
    expect(englishHtml).toContain("One-time purchase");
    expect(englishHtml).toContain('href="/en/features"');

    expect(germanHtml).toContain('<main id="static-prerender-content"');
    expect(germanHtml).toContain("Kalorienzähler ohne Abo");
    expect(germanHtml).toContain("Einmalkauf");
    expect(germanHtml).toContain('href="/funktionen"');
  });

  it("injects route-specific static body content for every major page family", () => {
    const featuresHtml = buildPrerenderedHtml(template, "/en/features");
    const comparisonHtml = buildPrerenderedHtml(template, "/en/comparisons/yazio-alternative");
    const helpHtml = buildPrerenderedHtml(template, "/en/help");
    const whatsNewHtml = buildPrerenderedHtml(template, "/en/whats-new/2.1.1");

    expect(featuresHtml).toContain("Calorie tracking with a large food database");
    expect(featuresHtml).toContain("Barcode scanner");

    expect(comparisonHtml).toContain("Business model");
    expect(comparisonHtml).toContain("Intake:");

    expect(helpHtml).toContain("Is Intake a subscription-based app?");
    expect(helpHtml).toContain("No account is required");

    expect(whatsNewHtml).toContain("Release");
    expect(whatsNewHtml).toContain("2.1.1");
  });

  it("emits section-level static body content for every prerendered route", () => {
    PRERENDER_ROUTES.forEach((route) => {
      const html = buildPrerenderedHtml(template, route);

      expect(html, route).toContain('<main id="static-prerender-content"');
      expect(html, route).toContain("<section>");
    });
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

  it("injects metadata for localized Intake AI pages", () => {
    const germanHtml = buildPrerenderedHtml(template, "/intake-ai");
    const englishHtml = buildPrerenderedHtml(template, "/en/intake-ai");

    expect(germanHtml).toContain('<html lang="de">');
    expect(germanHtml).toContain(`${origin}/intake-ai`);
    expect(germanHtml).toContain(`hreflang="en" href="${origin}/en/intake-ai"`);
    expect(germanHtml).toMatch(/Intake AI|KI-Food-Logging|API-Schlüssel/);

    expect(englishHtml).toContain('<html lang="en">');
    expect(englishHtml).toContain(`${origin}/en/intake-ai`);
    expect(englishHtml).toContain(`hreflang="de" href="${origin}/intake-ai"`);
    expect(englishHtml).toMatch(/Intake AI|AI Food Logging|API key/);
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
        "/intake-ai",
        "/vergleiche/yazio-alternative",
        "/vergleiche/fddb-alternative",
        "/hilfe",
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
        "/en/intake-ai",
        "/en/comparisons/yazio-alternative",
        "/en/comparisons/fddb-alternative",
        "/en/help",
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

  it("injects metadata for localized help pages", () => {
    const germanHtml = buildPrerenderedHtml(template, "/hilfe");
    const englishHtml = buildPrerenderedHtml(template, "/en/help");

    expect(germanHtml).toContain('<html lang="de">');
    expect(germanHtml).toContain(`${origin}/hilfe`);
    expect(germanHtml).toContain(`hreflang="en" href="${origin}/en/help"`);
    expect(germanHtml).toMatch(/Hilfe &amp; FAQ|Preis|Datenschutz|Sync/);

    expect(englishHtml).toContain('<html lang="en">');
    expect(englishHtml).toContain(`${origin}/en/help`);
    expect(englishHtml).toContain(`hreflang="de" href="${origin}/hilfe"`);
  });
});
