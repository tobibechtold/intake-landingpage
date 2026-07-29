import { describe, expect, it } from "vitest";
import { classifyBot, classifyBotReason, isBotOrPrefetch } from "./botDetection";

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

describe("classifyBotReason", () => {
  const HUMAN_UA =
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148";

  it("returns empty-ua for a blank user agent", () => {
    expect(classifyBotReason("   ")).toBe("empty-ua");
  });

  it("returns ua for a known crawler", () => {
    expect(classifyBotReason("facebookexternalhit/1.1")).toBe("ua");
  });

  it("returns prefetch for a speculative navigation header", () => {
    expect(classifyBotReason(HUMAN_UA, { secPurpose: "prefetch;prerender" })).toBe("prefetch");
  });

  it("returns null for a real mobile browser", () => {
    expect(classifyBotReason(HUMAN_UA)).toBeNull();
  });

  it("prefers the user-agent reason over the prefetch header", () => {
    expect(classifyBotReason("Bytespider", { secPurpose: "prefetch" })).toBe("ua");
  });

  it("keeps isBotOrPrefetch consistent with classifyBotReason", () => {
    expect(isBotOrPrefetch(HUMAN_UA)).toBe(false);
    expect(isBotOrPrefetch("Googlebot/2.1")).toBe(true);
    expect(isBotOrPrefetch(HUMAN_UA, { xMoz: "prefetch" })).toBe(true);
  });
});

describe("classifyBot detail", () => {
  const HUMAN_UA =
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148";

  it("names the header and value that triggered a prefetch classification", () => {
    expect(classifyBot(HUMAN_UA, { secPurpose: "prefetch;prerender" })).toEqual({
      reason: "prefetch",
      detail: "sec-purpose=prefetch;prerender",
    });
  });

  it("names the non-matching headers correctly when a later one matches", () => {
    expect(classifyBot(HUMAN_UA, { xMoz: "prefetch" })?.detail).toBe("x-moz=prefetch");
    expect(classifyBot(HUMAN_UA, { xPurpose: "preview" })?.detail).toBe("x-purpose=preview");
  });

  it("reports which user-agent token matched", () => {
    expect(classifyBot("facebookexternalhit/1.1")).toEqual({
      reason: "ua",
      detail: "user-agent~facebookexternalhit",
    });
  });

  it("reports an empty user agent", () => {
    expect(classifyBot("  ")).toEqual({ reason: "empty-ua", detail: "empty user-agent" });
  });

  it("returns null for a real mobile browser", () => {
    expect(classifyBot(HUMAN_UA)).toBeNull();
  });

  it("truncates an overlong header value so detail stays a diagnostic", () => {
    const detail = classifyBot(HUMAN_UA, { secPurpose: `prefetch${"x".repeat(500)}` })?.detail ?? "";
    expect(detail.length).toBeLessThanOrEqual(201);
    expect(detail.endsWith("…")).toBe(true);
  });
});
