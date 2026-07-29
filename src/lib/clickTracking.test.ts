import { describe, expect, it } from "vitest";
import { buildClickRow } from "./clickTracking";

const IPHONE_UA =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148";
const NOW = new Date("2026-07-29T10:15:00.000Z");

const base = {
  slug: "ugc-lisa-1",
  userAgent: IPHONE_UA,
  now: NOW,
  secret: "test-secret",
};

describe("buildClickRow", () => {
  it("captures platform, country and user agent", () => {
    const row = buildClickRow({ ...base, country: "DE", ip: "1.2.3.4" });
    expect(row.slug).toBe("ugc-lisa-1");
    expect(row.platform).toBe("ios");
    expect(row.country).toBe("DE");
    expect(row.user_agent).toBe(IPHONE_UA);
  });

  it("marks bots without dropping them", () => {
    const row = buildClickRow({ ...base, userAgent: "facebookexternalhit/1.1" });
    expect(row.is_bot).toBe(true);
    expect(row.bot_reason).toBe("ua");
  });

  it("leaves human traffic unflagged", () => {
    const row = buildClickRow({ ...base, ip: "1.2.3.4" });
    expect(row.is_bot).toBe(false);
    expect(row.bot_reason).toBeNull();
  });

  it("extracts fbclid as the click id", () => {
    const row = buildClickRow({ ...base, query: { fbclid: "abc123" } });
    expect(row.click_id).toBe("abc123");
  });

  it("extracts ttclid as the click id", () => {
    const row = buildClickRow({ ...base, query: { ttclid: "tt-999" } });
    expect(row.click_id).toBe("tt-999");
  });

  it("stores remaining query params but never the slug path param", () => {
    const row = buildClickRow({
      ...base,
      query: { slug: "ugc-lisa-1", fbclid: "abc123", utm_content: "hook-a" },
    });
    expect(row.query_params).toEqual({ fbclid: "abc123", utm_content: "hook-a" });
    expect(row.query_params?.slug).toBeUndefined();
  });

  it("stores null query params when only the slug was present", () => {
    const row = buildClickRow({ ...base, query: { slug: "ugc-lisa-1" } });
    expect(row.query_params).toBeNull();
  });

  it("produces a stable hash for the same visitor within a day", () => {
    const a = buildClickRow({ ...base, ip: "1.2.3.4" });
    const b = buildClickRow({ ...base, ip: "1.2.3.4", now: new Date("2026-07-29T22:00:00.000Z") });
    expect(a.visitor_hash).toBe(b.visitor_hash);
    expect(a.visitor_hash).toMatch(/^[0-9a-f]{64}$/);
  });

  it("rotates the hash across a day boundary", () => {
    const a = buildClickRow({ ...base, ip: "1.2.3.4" });
    const b = buildClickRow({ ...base, ip: "1.2.3.4", now: new Date("2026-07-30T10:15:00.000Z") });
    expect(a.visitor_hash).not.toBe(b.visitor_hash);
  });

  it("separates different visitors on the same day", () => {
    const a = buildClickRow({ ...base, ip: "1.2.3.4" });
    const b = buildClickRow({ ...base, ip: "5.6.7.8" });
    expect(a.visitor_hash).not.toBe(b.visitor_hash);
  });

  it("omits the hash when the ip or secret is unavailable", () => {
    expect(buildClickRow({ ...base, ip: undefined }).visitor_hash).toBeNull();
    expect(buildClickRow({ ...base, ip: "1.2.3.4", secret: undefined }).visitor_hash).toBeNull();
  });

  it("normalises a missing country to null", () => {
    expect(buildClickRow({ ...base, country: "" }).country).toBeNull();
  });
});

describe("buildClickRow prefetch override", () => {
  const PREFETCH = { secPurpose: "prefetch;prerender" };

  it("treats a prefetch-headed hit carrying a ttclid as a real click", () => {
    const row = buildClickRow({ ...base, prefetch: PREFETCH, query: { ttclid: "E_C_P_abc" } });
    expect(row.is_bot).toBe(false);
    expect(row.bot_reason).toBeNull();
    expect(row.click_id).toBe("E_C_P_abc");
  });

  it("treats a prefetch-headed hit carrying an fbclid as a real click", () => {
    const row = buildClickRow({ ...base, prefetch: PREFETCH, query: { fbclid: "fb-123" } });
    expect(row.is_bot).toBe(false);
    expect(row.bot_reason).toBeNull();
  });

  it("still records why the rule fired, so the override is visible in the data", () => {
    const row = buildClickRow({ ...base, prefetch: PREFETCH, query: { ttclid: "E_C_P_abc" } });
    expect(row.bot_detail).toBe("sec-purpose=prefetch;prerender");
  });

  it("keeps flagging a prefetch-headed hit with no click id", () => {
    const row = buildClickRow({ ...base, prefetch: PREFETCH });
    expect(row.is_bot).toBe(true);
    expect(row.bot_reason).toBe("prefetch");
    expect(row.bot_detail).toBe("sec-purpose=prefetch;prerender");
  });

  it("does NOT let a click id rescue a user-agent-detected crawler", () => {
    const row = buildClickRow({
      ...base,
      userAgent: "facebookexternalhit/1.1",
      prefetch: PREFETCH,
      query: { fbclid: "fb-123" },
    });
    expect(row.is_bot).toBe(true);
    expect(row.bot_reason).toBe("ua");
    expect(row.bot_detail).toBe("user-agent~facebookexternalhit");
  });

  it("leaves bot_detail null for ordinary human traffic", () => {
    const row = buildClickRow({ ...base, query: { ttclid: "E_C_P_abc" } });
    expect(row.is_bot).toBe(false);
    expect(row.bot_reason).toBeNull();
    expect(row.bot_detail).toBeNull();
  });
});
