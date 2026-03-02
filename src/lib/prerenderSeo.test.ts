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

  it("defines all localized routes that should be emitted", () => {
    expect(PRERENDER_ROUTES).toEqual([
      "/",
      "/privacy",
      "/terms",
      "/de",
      "/de/privacy",
      "/de/terms",
    ]);
  });
});
