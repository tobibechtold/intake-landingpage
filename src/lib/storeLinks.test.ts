import { describe, expect, it } from "vitest";
import { getAppStoreUrl, getGooglePlayUrl } from "./storeLinks";

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
});
