import { describe, expect, it } from "vitest";
import { buildPrerenderedHtml, PRERENDER_ROUTES } from "../../scripts/prerender-seo.js";

describe("prerender-seo", () => {
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
    const html = buildPrerenderedHtml(template, "/de");

    expect(html).toContain('<html lang="de">');
    expect(html).toContain("Kalorienzähler");
    expect(html).toContain('property="og:title"');
    expect(html).toContain('content="https://intake.tobibechtold.dev/de"');
    expect(html).toContain('property="og:image"');
    expect(html).toContain('content="/og-image.png"');
  });

  it("includes canonical and alternate links", () => {
    const html = buildPrerenderedHtml(template, "/privacy");

    expect(html).toContain('<link rel="canonical" href="https://intake.tobibechtold.dev/privacy" />');
    expect(html).toContain(
      '<link rel="alternate" hreflang="de" href="https://intake.tobibechtold.dev/de/privacy" />'
    );
    expect(html).toContain(
      '<link rel="alternate" hreflang="x-default" href="https://intake.tobibechtold.dev/" />'
    );
  });

  it("uses updated cross-platform SEO copy in prerendered home HTML", () => {
    const html = buildPrerenderedHtml(template, "/");

    expect(html).toContain("iPhone &amp; Android");
    expect(html).toContain("Health Connect (Android)");
    expect(html).toContain("Google Drive sync (Android)");
    expect(html).toContain('property="og:image:alt" content="Intake calorie counter app on iOS and Android"');
  });

  it("injects release metadata for localized what's new detail pages", () => {
    const html = buildPrerenderedHtml(template, "/whats-new/2.1.1");

    expect(html).toContain("What's new in Intake 2.1.1 | Intake");
    expect(html).toContain('href="https://intake.tobibechtold.dev/whats-new/2.1.1"');
    expect(html).toContain(
      'hreflang="en" href="https://intake.tobibechtold.dev/whats-new/2.1.1"'
    );
    expect(html).toContain(
      'hreflang="de" href="https://intake.tobibechtold.dev/de/whats-new/2.1.1"'
    );
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
      "/de",
      "/de/privacy",
      "/de/terms",
      "/de/whats-new",
      "/de/whats-new/2.1.3",
      "/de/whats-new/2.1.2",
      "/de/whats-new/2.1.1",
    ]);
  });
});
