import { describe, expect, it } from "vitest";
import { getAppStoreUrl, getGooglePlayUrl, getNavbarDownloadUrl } from "./storeLinks";

describe("storeLinks", () => {
  it("returns German App Store URL for de locale", () => {
    expect(getAppStoreUrl("de")).toBe(
      "https://apps.apple.com/de/app/intake-kalorienz%C3%A4hler/id6757768955"
    );
  });

  it("returns US App Store URL for en locale", () => {
    expect(getAppStoreUrl("en")).toBe(
      "https://apps.apple.com/us/app/intake-kalorienz%C3%A4hler/id6757768955"
    );
  });

  it("returns Google Play URL", () => {
    expect(getGooglePlayUrl()).toBe(
      "https://play.google.com/store/apps/details?id=de.bechtoldit.intake"
    );
  });

  it("returns Google Play for Android visitors in the navbar", () => {
    expect(
      getNavbarDownloadUrl(
        "de",
        "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 Chrome/123.0 Mobile Safari/537.36",
        "/#hero",
      )
    ).toBe("https://play.google.com/store/apps/details?id=de.bechtoldit.intake");
  });

  it("returns the localized App Store URL for iOS visitors in the navbar", () => {
    expect(
      getNavbarDownloadUrl(
        "en",
        "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 Version/17.4 Mobile/15E148 Safari/604.1",
        "/en#hero",
      )
    ).toBe("https://apps.apple.com/us/app/intake-kalorienz%C3%A4hler/id6757768955");
  });

  it("falls back to the hero anchor when the navbar platform is unknown", () => {
    expect(getNavbarDownloadUrl("de", "Mozilla/5.0 (X11; Linux x86_64)", "/#hero")).toBe("/#hero");
  });
});
