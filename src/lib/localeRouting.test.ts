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
    expect(getPageFromPathname("/funktionen")).toBe("features");
    expect(getPageFromPathname("/kalorienzaehler-ohne-abo")).toBe("noSubscription");
    expect(getPageFromPathname("/kalorien-tracker-ohne-konto")).toBe("noAccount");
    expect(getPageFromPathname("/vergleiche")).toBe("comparisons");
    expect(getPageFromPathname("/vergleiche/yazio-alternative")).toBe("comparisonDetail");
    expect(getPageFromPathname("/hilfe")).toBe("help");
    expect(getPageFromPathname("/privacy")).toBe("privacy");
    expect(getPageFromPathname("/terms")).toBe("terms");
    expect(getPageFromPathname("/whats-new")).toBe("whatsNewIndex");
    expect(getPageFromPathname("/en/features")).toBe("features");
    expect(getPageFromPathname("/en/help")).toBe("help");
    expect(getPageFromPathname("/en/comparisons/yazio-alternative")).toBe("comparisonDetail");
    expect(getPageFromPathname("/en/whats-new")).toBe("whatsNewIndex");
    expect(getPageFromPathname("/en/whats-new/2.1.1")).toBe("whatsNewEntry");
    expect(getPageFromPathname("/de/whats-new/2.1.1")).toBe("whatsNewEntry");
    expect(getPageFromPathname("/de/privacy")).toBe("privacy");
    expect(getPageFromPathname("/missing-page")).toBe("notFound");
  });

  it("builds localized path", () => {
    expect(buildLocalizedPath("home", "de")).toBe("/");
    expect(buildLocalizedPath("home", "en")).toBe("/en");
    expect(buildLocalizedPath("features", "de")).toBe("/funktionen");
    expect(buildLocalizedPath("features", "en")).toBe("/en/features");
    expect(buildLocalizedPath("noSubscription", "de")).toBe("/kalorienzaehler-ohne-abo");
    expect(buildLocalizedPath("noSubscription", "en")).toBe("/en/calorie-counter-no-subscription");
    expect(buildLocalizedPath("comparisons", "de")).toBe("/vergleiche");
    expect(buildLocalizedPath("comparisons", "en")).toBe("/en/comparisons");
    expect(buildLocalizedPath("help", "de")).toBe("/hilfe");
    expect(buildLocalizedPath("help", "en")).toBe("/en/help");
    expect(buildLocalizedPath("privacy", "de")).toBe("/privacy");
    expect(buildLocalizedPath("privacy", "en")).toBe("/en/privacy");
    expect(buildLocalizedPath("whatsNewIndex", "de")).toBe("/whats-new");
    expect(buildLocalizedPath("whatsNewIndex", "en")).toBe("/en/whats-new");
    expect(buildLocalizedPath("whatsNewEntry", "de", "2.1.1")).toBe("/whats-new/2.1.1");
    expect(buildLocalizedPath("whatsNewEntry", "en", "2.1.1")).toBe("/en/whats-new/2.1.1");
  });

  it("builds alternates for current page", () => {
    expect(buildAlternateUrls("/funktionen", origin)).toEqual({
      canonical: "https://www.getintake.de/funktionen",
      en: "https://www.getintake.de/en/features",
      de: "https://www.getintake.de/funktionen",
      xDefault: "https://www.getintake.de/",
    });

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
