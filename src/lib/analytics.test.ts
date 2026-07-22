import { describe, expect, it } from "vitest";
import { initAnalytics, trackStoreCtaClick } from "./analytics";

describe("analytics without a configured key", () => {
  it("initAnalytics is a safe no-op", () => {
    expect(() => initAnalytics()).not.toThrow();
  });

  it("trackStoreCtaClick is a safe no-op before init", () => {
    expect(() => trackStoreCtaClick("ios", "hero")).not.toThrow();
  });
});
