import { describe, expect, it } from "vitest";
import { isBotOrPrefetch } from "./botDetection";

const IPHONE_UA =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1";
const ANDROID_UA =
  "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36";
const DESKTOP_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

describe("isBotOrPrefetch", () => {
  it("flags Meta's link crawlers", () => {
    expect(
      isBotOrPrefetch("facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)"),
    ).toBe(true);
    expect(
      isBotOrPrefetch(
        "meta-externalagent/1.1 (+https://developers.facebook.com/docs/sharing/webmasters/crawler)",
      ),
    ).toBe(true);
  });

  it("flags TikTok's Bytespider crawler", () => {
    expect(
      isBotOrPrefetch(
        "Mozilla/5.0 (Linux; Android 5.0) AppleWebKit/537.36 (KHTML, like Gecko) Mobile Safari/537.36 (compatible; Bytespider; spider-feedback@bytedance.com)",
      ),
    ).toBe(true);
  });

  it("flags generic crawlers, scanners, and HTTP libraries", () => {
    expect(isBotOrPrefetch("Mozilla/5.0 (compatible; AhrefsBot/7.0; +http://ahrefs.com/robot/)")).toBe(
      true,
    );
    expect(isBotOrPrefetch("curl/8.4.0")).toBe(true);
    expect(isBotOrPrefetch("python-requests/2.31.0")).toBe(true);
    expect(
      isBotOrPrefetch(
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/126.0.0.0 Safari/537.36",
      ),
    ).toBe(true);
  });

  it("flags requests without a user agent", () => {
    expect(isBotOrPrefetch("")).toBe(true);
    expect(isBotOrPrefetch("   ")).toBe(true);
  });

  it("flags browser prefetch and preview requests even from real browser UAs", () => {
    expect(isBotOrPrefetch(IPHONE_UA, { secPurpose: "prefetch;prerender" })).toBe(true);
    expect(isBotOrPrefetch(ANDROID_UA, { xPurpose: "preview" })).toBe(true);
    expect(isBotOrPrefetch(ANDROID_UA, { xMoz: "prefetch" })).toBe(true);
  });

  it("passes real mobile and desktop browsers", () => {
    expect(isBotOrPrefetch(IPHONE_UA)).toBe(false);
    expect(isBotOrPrefetch(ANDROID_UA)).toBe(false);
    expect(isBotOrPrefetch(DESKTOP_UA)).toBe(false);
  });

  it("passes real browsers with empty prefetch headers", () => {
    expect(isBotOrPrefetch(IPHONE_UA, { secPurpose: "", xPurpose: "", xMoz: "" })).toBe(false);
  });
});
