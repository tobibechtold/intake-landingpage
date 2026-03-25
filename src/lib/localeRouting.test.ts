import { describe, expect, it } from "vitest";
import {
  buildAlternateUrls,
  buildLocalizedPath,
  getLocaleFromPathname,
  getPageFromPathname,
} from "./localeRouting";

describe("localeRouting", () => {
  const origin = "https://www.getintake.de";

  it("detects locale from pathname", () => {
    expect(getLocaleFromPathname("/")).toBe("de");
    expect(getLocaleFromPathname("/privacy")).toBe("de");
    expect(getLocaleFromPathname("/en")).toBe("en");
    expect(getLocaleFromPathname("/en/terms")).toBe("en");
    expect(getLocaleFromPathname("/de")).toBe("de");
    expect(getLocaleFromPathname("/de/terms")).toBe("de");
  });

  it("detects logical page from pathname", () => {
    expect(getPageFromPathname("/")).toBe("home");
    expect(getPageFromPathname("/privacy")).toBe("privacy");
    expect(getPageFromPathname("/terms")).toBe("terms");
    expect(getPageFromPathname("/whats-new")).toBe("whatsNewIndex");
    expect(getPageFromPathname("/en/whats-new")).toBe("whatsNewIndex");
    expect(getPageFromPathname("/en/whats-new/2.1.1")).toBe("whatsNewEntry");
    expect(getPageFromPathname("/de/whats-new/2.1.1")).toBe("whatsNewEntry");
    expect(getPageFromPathname("/de/privacy")).toBe("privacy");
    expect(getPageFromPathname("/missing-page")).toBe("notFound");
  });

  it("builds localized path", () => {
    expect(buildLocalizedPath("home", "de")).toBe("/");
    expect(buildLocalizedPath("home", "en")).toBe("/en");
    expect(buildLocalizedPath("privacy", "de")).toBe("/privacy");
    expect(buildLocalizedPath("privacy", "en")).toBe("/en/privacy");
    expect(buildLocalizedPath("whatsNewIndex", "de")).toBe("/whats-new");
    expect(buildLocalizedPath("whatsNewIndex", "en")).toBe("/en/whats-new");
    expect(buildLocalizedPath("whatsNewEntry", "de", "2.1.1")).toBe("/whats-new/2.1.1");
    expect(buildLocalizedPath("whatsNewEntry", "en", "2.1.1")).toBe("/en/whats-new/2.1.1");
  });

  it("builds alternates for current page", () => {
    expect(buildAlternateUrls("/terms", origin)).toEqual({
      canonical: "https://www.getintake.de/terms",
      en: "https://www.getintake.de/en/terms",
      de: "https://www.getintake.de/terms",
      xDefault: "https://www.getintake.de/",
    });

    expect(buildAlternateUrls("/en/whats-new/2.1.1", origin)).toEqual({
      canonical: "https://www.getintake.de/en/whats-new/2.1.1",
      en: "https://www.getintake.de/en/whats-new/2.1.1",
      de: "https://www.getintake.de/whats-new/2.1.1",
      xDefault: "https://www.getintake.de/",
    });
  });
});
