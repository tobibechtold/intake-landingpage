import { describe, expect, it } from "vitest";
import { getSeoContent } from "./seo";

describe("getSeoContent", () => {
  it("returns German homepage metadata and alternates", () => {
    const seo = getSeoContent("/de", "https://intake.tobibechtold.dev");

    expect(seo.locale).toBe("de");
    expect(seo.page).toBe("home");
    expect(seo.canonical).toBe("https://intake.tobibechtold.dev/de");
    expect(seo.alternates.de).toBe("https://intake.tobibechtold.dev/de");
    expect(seo.alternates.en).toBe("https://intake.tobibechtold.dev/");
    expect(seo.title).toContain("Kalorienz");
    expect(seo.description).toContain("Android");
    expect(seo.homeSchema).not.toBeNull();
  });

  it("includes iOS + Android stores and integrations in homepage schema", () => {
    const seo = getSeoContent("/", "https://intake.tobibechtold.dev");
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
    const seo = getSeoContent("/privacy", "https://intake.tobibechtold.dev");

    expect(seo.locale).toBe("en");
    expect(seo.page).toBe("privacy");
    expect(seo.canonical).toBe("https://intake.tobibechtold.dev/privacy");
    expect(seo.title).toContain("Privacy");
    expect(seo.homeSchema).toBeNull();
    expect(seo.noIndex).toBe(false);
  });

  it("returns overview metadata for localized what's new pages", () => {
    const seo = getSeoContent("/de/whats-new", "https://intake.tobibechtold.dev");

    expect(seo.locale).toBe("de");
    expect(seo.page).toBe("whatsNewIndex");
    expect(seo.canonical).toBe("https://intake.tobibechtold.dev/de/whats-new");
    expect(seo.alternates.en).toBe("https://intake.tobibechtold.dev/whats-new");
    expect(seo.noIndex).toBe(false);
    expect(seo.title).toContain("Was ist neu");
  });

  it("returns release metadata for localized what's new detail pages", () => {
    const seo = getSeoContent("/whats-new/2.1.1", "https://intake.tobibechtold.dev");

    expect(seo.locale).toBe("en");
    expect(seo.page).toBe("whatsNewEntry");
    expect(seo.canonical).toBe("https://intake.tobibechtold.dev/whats-new/2.1.1");
    expect(seo.alternates.de).toBe("https://intake.tobibechtold.dev/de/whats-new/2.1.1");
    expect(seo.noIndex).toBe(false);
    expect(seo.title).toContain("2.1.1");
  });

  it("returns noindex metadata for unknown routes", () => {
    const seo = getSeoContent("/de/missing-page", "https://intake.tobibechtold.dev");

    expect(seo.locale).toBe("de");
    expect(seo.page).toBe("notFound");
    expect(seo.noIndex).toBe(true);
    expect(seo.title).toContain("404");
    expect(seo.homeSchema).toBeNull();
  });

  it("spot checks canonical and locale for key localized routes", () => {
    const origin = "https://intake.tobibechtold.dev";

    const homeEn = getSeoContent("/", origin);
    expect(homeEn.locale).toBe("en");
    expect(homeEn.canonical).toBe(`${origin}/`);

    const homeDe = getSeoContent("/de", origin);
    expect(homeDe.locale).toBe("de");
    expect(homeDe.canonical).toBe(`${origin}/de`);

    const privacyEn = getSeoContent("/privacy", origin);
    expect(privacyEn.locale).toBe("en");
    expect(privacyEn.canonical).toBe(`${origin}/privacy`);

    const privacyDe = getSeoContent("/de/privacy", origin);
    expect(privacyDe.locale).toBe("de");
    expect(privacyDe.canonical).toBe(`${origin}/de/privacy`);
    expect(privacyDe.alternates.en).toBe(`${origin}/privacy`);
    expect(privacyDe.alternates.de).toBe(`${origin}/de/privacy`);
  });
});
