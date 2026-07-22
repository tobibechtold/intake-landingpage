import { beforeEach, describe, expect, it } from "vitest";
import { captureUtmParams } from "./attribution";
import {
  appendGooglePlayAttribution,
  GOOGLE_PLAY_URL,
  getAppStoreUrl,
  getGooglePlayUrl,
  getNavbarDownloadUrl,
} from "./storeLinks";

const ANDROID_UA =
  "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36";
const IPHONE_UA =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 Version/17.4 Mobile/15E148 Safari/604.1";

describe("store links with attribution", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  it("appends the website fallback campaign to the App Store URL", () => {
    expect(getAppStoreUrl("de")).toBe(
      "https://apps.apple.com/de/app/intake-kalorienz%C3%A4hler/id6757768955?pt=128030281&ct=website&mt=8",
    );
  });

  it("appends the stored campaign to the App Store URL", () => {
    captureUtmParams("?utm_source=tiktok&utm_medium=smartlink&utm_campaign=tiktok-ugc1");
    expect(getAppStoreUrl("en")).toBe(
      "https://apps.apple.com/us/app/intake-kalorienz%C3%A4hler/id6757768955?pt=128030281&ct=tiktok-ugc1&mt=8",
    );
  });

  it("single-encodes the Google Play referrer with the website fallback", () => {
    expect(getGooglePlayUrl()).toBe(
      "https://play.google.com/store/apps/details?id=de.bechtoldit.intake" +
        "&referrer=utm_source%3Dwebsite%26utm_medium%3Dwebsite%26utm_campaign%3Dwebsite",
    );
  });

  it("carries the stored campaign into the Play referrer", () => {
    captureUtmParams("?utm_source=tiktok&utm_medium=smartlink&utm_campaign=tiktok-ugc1");
    expect(getGooglePlayUrl()).toContain(
      "referrer=utm_source%3Dtiktok%26utm_medium%3Dsmartlink%26utm_campaign%3Dtiktok-ugc1",
    );
  });

  it("appendGooglePlayAttribution encodes exactly once", () => {
    const url = appendGooglePlayAttribution(GOOGLE_PLAY_URL, {
      source: "meta",
      medium: "smartlink",
      campaign: "meta-ugc1",
    });
    const referrer = new URL(url).searchParams.get("referrer");
    expect(referrer).toBe("utm_source=meta&utm_medium=smartlink&utm_campaign=meta-ugc1");
  });

  it("returns Google Play with attribution for Android visitors in the navbar", () => {
    expect(getNavbarDownloadUrl("de", ANDROID_UA, "/#hero")).toBe(
      "https://play.google.com/store/apps/details?id=de.bechtoldit.intake" +
        "&referrer=utm_source%3Dwebsite%26utm_medium%3Dwebsite%26utm_campaign%3Dwebsite",
    );
  });

  it("returns the localized App Store URL with attribution for iOS visitors in the navbar", () => {
    expect(getNavbarDownloadUrl("en", IPHONE_UA, "/en#hero")).toBe(
      "https://apps.apple.com/us/app/intake-kalorienz%C3%A4hler/id6757768955?pt=128030281&ct=website&mt=8",
    );
  });

  it("falls back to the hero anchor when the navbar platform is unknown", () => {
    expect(getNavbarDownloadUrl("de", "Mozilla/5.0 (X11; Linux x86_64)", "/#hero")).toBe("/#hero");
  });
});
