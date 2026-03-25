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
    expect(getLocaleFromPathname("/")).toBe("en");
    expect(getLocaleFromPathname("/privacy")).toBe("en");
    expect(getLocaleFromPathname("/de")).toBe("de");
    expect(getLocaleFromPathname("/de/terms")).toBe("de");
  });

  it("detects logical page from pathname", () => {
    expect(getPageFromPathname("/")).toBe("home");
    expect(getPageFromPathname("/privacy")).toBe("privacy");
    expect(getPageFromPathname("/terms")).toBe("terms");
    expect(getPageFromPathname("/whats-new")).toBe("whatsNewIndex");
    expect(getPageFromPathname("/de/whats-new/2.1.1")).toBe("whatsNewEntry");
    expect(getPageFromPathname("/de/privacy")).toBe("privacy");
    expect(getPageFromPathname("/missing-page")).toBe("notFound");
  });

  it("builds localized path", () => {
    expect(buildLocalizedPath("home", "en")).toBe("/");
    expect(buildLocalizedPath("home", "de")).toBe("/de");
    expect(buildLocalizedPath("privacy", "en")).toBe("/privacy");
    expect(buildLocalizedPath("privacy", "de")).toBe("/de/privacy");
    expect(buildLocalizedPath("whatsNewIndex", "en")).toBe("/whats-new");
    expect(buildLocalizedPath("whatsNewIndex", "de")).toBe("/de/whats-new");
    expect(buildLocalizedPath("whatsNewEntry", "en", "2.1.1")).toBe("/whats-new/2.1.1");
    expect(buildLocalizedPath("whatsNewEntry", "de", "2.1.1")).toBe("/de/whats-new/2.1.1");
  });

  it("builds alternates for current page", () => {
    expect(buildAlternateUrls("/de/terms", origin)).toEqual({
      canonical: "https://www.getintake.de/de/terms",
      en: "https://www.getintake.de/terms",
      de: "https://www.getintake.de/de/terms",
      xDefault: "https://www.getintake.de/",
    });

    expect(buildAlternateUrls("/de/whats-new/2.1.1", origin)).toEqual({
      canonical: "https://www.getintake.de/de/whats-new/2.1.1",
      en: "https://www.getintake.de/whats-new/2.1.1",
      de: "https://www.getintake.de/de/whats-new/2.1.1",
      xDefault: "https://www.getintake.de/",
    });
  });
});
