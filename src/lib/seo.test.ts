import { describe, expect, it } from "vitest";
import { getSeoContent } from "./seo";

describe("getSeoContent", () => {
  const origin = "https://www.getintake.de";

  it("returns German homepage metadata and alternates", () => {
    const seo = getSeoContent("/", origin);
    const appSchema = seo.homeSchema?.find((item) => item["@type"] === "SoftwareApplication");

    expect(seo.locale).toBe("de");
    expect(seo.page).toBe("home");
    expect(seo.canonical).toBe("https://www.getintake.de/");
    expect(seo.alternates.de).toBe("https://www.getintake.de/");
    expect(seo.alternates.en).toBe("https://www.getintake.de/en");
    expect(seo.title).toMatch(/Intake App - Kalorienzähler ohne Abo/i);
    expect(seo.description).toMatch(/Kalorienzähler ohne Abo/i);
    expect(seo.description).toMatch(/ohne Konto/i);
    expect(seo.description).toMatch(/Apple Watch|PDF-Export/i);
    expect(seo.homeSchema).not.toBeNull();
    expect(appSchema?.alternateName).toBe("Intake Kalorienzähler");
    expect(appSchema?.description).toMatch(/Kalorienzähler ohne Abo/i);
    expect(appSchema?.featureList).toEqual(
      expect.arrayContaining([
        "Kalorienzähler ohne Abo",
        "Kein Konto",
        "Daten bleiben auf deinem Gerät",
      ])
    );
  });

  it("includes iOS + Android stores and integrations in homepage schema", () => {
    const seo = getSeoContent("/en", origin);
    const appSchema = seo.homeSchema?.find((item) => item["@type"] === "SoftwareApplication");

    expect(appSchema).toBeDefined();
    expect(appSchema?.operatingSystem).toContain("Android");
    expect(appSchema?.downloadUrl).toEqual(
      expect.arrayContaining([
        expect.stringContaining("apps.apple.com"),
        expect.stringContaining("play.google.com/store/apps/details"),
      ])
    );
    expect(appSchema?.featureList).toEqual(
      expect.arrayContaining([
        "Apple Health sync (iOS)",
        "Health Connect sync (Android)",
        "iCloud sync (iOS)",
        "Google Drive sync (Android)",
      ])
    );
  });

  it("returns English privacy metadata and no homepage schema", () => {
    const seo = getSeoContent("/en/privacy", origin);

    expect(seo.locale).toBe("en");
    expect(seo.page).toBe("privacy");
    expect(seo.canonical).toBe("https://www.getintake.de/en/privacy");
    expect(seo.title).toContain("Privacy");
    expect(seo.homeSchema).toBeNull();
    expect(seo.noIndex).toBe(false);
  });

  it("returns page-specific metadata for the new evergreen feature pages", () => {
    const germanFeatures = getSeoContent("/funktionen", origin);
    const englishFeatures = getSeoContent("/en/features", origin);

    expect(germanFeatures.locale).toBe("de");
    expect(germanFeatures.page).toBe("features");
    expect(germanFeatures.canonical).toBe("https://www.getintake.de/funktionen");
    expect(germanFeatures.alternates.en).toBe("https://www.getintake.de/en/features");
    expect(germanFeatures.title).toMatch(/Funktionen|Apple Watch|Widgets/i);
    expect(germanFeatures.description).toMatch(/30\+|Rezepte|PDF-Export|Widgets/i);
    expect(germanFeatures.homeSchema).toBeNull();

    expect(englishFeatures.locale).toBe("en");
    expect(englishFeatures.page).toBe("features");
    expect(englishFeatures.canonical).toBe("https://www.getintake.de/en/features");
    expect(englishFeatures.alternates.de).toBe("https://www.getintake.de/funktionen");
  });

  it("returns overview metadata for localized what's new pages", () => {
    const seo = getSeoContent("/whats-new", origin);

    expect(seo.locale).toBe("de");
    expect(seo.page).toBe("whatsNewIndex");
    expect(seo.canonical).toBe("https://www.getintake.de/whats-new");
    expect(seo.alternates.en).toBe("https://www.getintake.de/en/whats-new");
    expect(seo.noIndex).toBe(false);
    expect(seo.title).toContain("Was ist neu");
  });

  it("returns release metadata for localized what's new detail pages", () => {
    const seo = getSeoContent("/en/whats-new/2.1.1", origin);

    expect(seo.locale).toBe("en");
    expect(seo.page).toBe("whatsNewEntry");
    expect(seo.canonical).toBe("https://www.getintake.de/en/whats-new/2.1.1");
    expect(seo.alternates.de).toBe("https://www.getintake.de/whats-new/2.1.1");
    expect(seo.noIndex).toBe(false);
    expect(seo.title).toContain("2.1.1");
  });

  it("returns noindex metadata for unknown routes", () => {
    const seo = getSeoContent("/en/missing-page", origin);

    expect(seo.locale).toBe("en");
    expect(seo.page).toBe("notFound");
    expect(seo.noIndex).toBe(true);
    expect(seo.title).toContain("404");
    expect(seo.homeSchema).toBeNull();
  });

  it("spot checks canonical and locale for key localized routes", () => {
    const homeDe = getSeoContent("/", origin);
    expect(homeDe.locale).toBe("de");
    expect(homeDe.canonical).toBe(`${origin}/`);

    const homeEn = getSeoContent("/en", origin);
    expect(homeEn.locale).toBe("en");
    expect(homeEn.canonical).toBe(`${origin}/en`);

    const privacyDe = getSeoContent("/privacy", origin);
    expect(privacyDe.locale).toBe("de");
    expect(privacyDe.canonical).toBe(`${origin}/privacy`);
    expect(privacyDe.alternates.en).toBe(`${origin}/en/privacy`);
    expect(privacyDe.alternates.de).toBe(`${origin}/privacy`);

    const privacyEn = getSeoContent("/en/privacy", origin);
    expect(privacyEn.locale).toBe("en");
    expect(privacyEn.canonical).toBe(`${origin}/en/privacy`);
  });
});
