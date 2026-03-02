import { describe, expect, it } from "vitest";
import {
  buildAlternateUrls,
  buildLocalizedPath,
  getLocaleFromPathname,
  getPageFromPathname,
} from "./localeRouting";

describe("localeRouting", () => {
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
    expect(getPageFromPathname("/de/privacy")).toBe("privacy");
    expect(getPageFromPathname("/missing-page")).toBe("notFound");
  });

  it("builds localized path", () => {
    expect(buildLocalizedPath("home", "en")).toBe("/");
    expect(buildLocalizedPath("home", "de")).toBe("/de");
    expect(buildLocalizedPath("privacy", "en")).toBe("/privacy");
    expect(buildLocalizedPath("privacy", "de")).toBe("/de/privacy");
  });

  it("builds alternates for current page", () => {
    expect(buildAlternateUrls("/de/terms", "https://intake.tobibechtold.dev")).toEqual({
      canonical: "https://intake.tobibechtold.dev/de/terms",
      en: "https://intake.tobibechtold.dev/terms",
      de: "https://intake.tobibechtold.dev/de/terms",
      xDefault: "https://intake.tobibechtold.dev/",
    });
  });
});
