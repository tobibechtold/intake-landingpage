import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = path.resolve(import.meta.dirname, "../..");

describe("favicon and crawl hints", () => {
  it("uses German as the default shell language and homepage metadata", () => {
    const html = readFileSync(path.join(projectRoot, "index.html"), "utf8");

    expect(html).toContain('<html lang="de">');
    expect(html).toContain("<title>Intake App - Kalorienzähler ohne Abo für iPhone &amp; Android</title>");
    expect(html).toContain(
      'content="Intake ist ein Kalorienzähler ohne Abo und ohne Konto. Tracke Kalorien und Makros mit Barcode-Scanner, Apple Health, Health Connect und Daten, die auf deinem Gerät bleiben."'
    );
  });

  it("declares conventional favicon assets on the homepage template", () => {
    const html = readFileSync(path.join(projectRoot, "index.html"), "utf8");

    expect(html).toContain('<link rel="icon" href="/favicon.ico" sizes="any" />');
    expect(html).toContain('<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />');
    expect(html).toContain('<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />');
  });

  it("points robots.txt at the canonical sitemap host", () => {
    const robots = readFileSync(path.join(projectRoot, "public", "robots.txt"), "utf8");

    expect(robots).toContain("Sitemap: https://www.getintake.de/sitemap.xml");
    expect(robots).not.toContain("intake.tobibechtold.dev");
  });
});
