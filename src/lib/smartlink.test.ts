import { describe, expect, it } from "vitest";
import { buildSmartLinkRedirect } from "./smartlink";

const IPHONE_UA =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1";
const ANDROID_UA =
  "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36";
const DESKTOP_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

describe("buildSmartLinkRedirect", () => {
  it("sends Android users to Play with a single-encoded referrer", () => {
    const redirect = buildSmartLinkRedirect("tiktok-ugc1", ANDROID_UA, "de-DE,de;q=0.9");
    expect(redirect?.platform).toBe("android");
    expect(redirect?.url).toBe(
      "https://play.google.com/store/apps/details?id=de.bechtoldit.intake" +
        "&referrer=utm_source%3Dtiktok%26utm_medium%3Dsmartlink%26utm_campaign%3Dtiktok-ugc1",
    );
  });

  it("sends German iOS users to the DE App Store with the campaign token", () => {
    const redirect = buildSmartLinkRedirect("tiktok-ugc1", IPHONE_UA, "de-DE,de;q=0.9");
    expect(redirect?.url).toBe(
      "https://apps.apple.com/de/app/intake-kalorienz%C3%A4hler/id6757768955?pt=128030281&ct=tiktok-ugc1&mt=8",
    );
  });

  it("sends non-German iOS users to the US App Store", () => {
    const redirect = buildSmartLinkRedirect("meta-ugc2", IPHONE_UA, "en-US,en;q=0.9");
    expect(redirect?.url).toContain("https://apps.apple.com/us/");
    expect(redirect?.url).toContain("ct=meta-ugc2");
  });

  it("sends desktop users to the landing page with utm params", () => {
    const redirect = buildSmartLinkRedirect("threads-bio", DESKTOP_UA, "en-US");
    expect(redirect?.platform).toBe("unknown");
    expect(redirect?.url).toBe(
      "https://www.getintake.de/?utm_source=threads&utm_medium=smartlink&utm_campaign=threads-bio",
    );
  });

  it("rejects invalid slugs", () => {
    expect(buildSmartLinkRedirect("", IPHONE_UA, "de")).toBeNull();
    expect(buildSmartLinkRedirect("Bad_Slug!", IPHONE_UA, "de")).toBeNull();
    expect(buildSmartLinkRedirect("-leading-dash", IPHONE_UA, "de")).toBeNull();
  });
});
