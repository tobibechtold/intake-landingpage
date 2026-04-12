import { describe, expect, it } from "vitest";
import { getGermanRedirectPath } from "./localeRedirect";

describe("getGermanRedirectPath", () => {
  it("redirects legacy german-prefixed routes to canonical german paths", () => {
    expect(getGermanRedirectPath("/de", "en-US")).toBe("/");
    expect(getGermanRedirectPath("/de/privacy", "en-US")).toBe("/privacy");
    expect(getGermanRedirectPath("/de/whats-new/2.1.1", "fr-FR")).toBe("/whats-new/2.1.1");
  });

  it("does not redirect canonical german or english routes automatically", () => {
    expect(getGermanRedirectPath("/", "en-US")).toBeNull();
    expect(getGermanRedirectPath("/privacy", "fr-FR")).toBeNull();
    expect(getGermanRedirectPath("/terms", "en-GB")).toBeNull();
    expect(getGermanRedirectPath("/en", "en-US")).toBeNull();
    expect(getGermanRedirectPath("/en/privacy", "fr-FR")).toBeNull();
    expect(getGermanRedirectPath("/unknown", "de-DE")).toBeNull();
  });

  it("ignores stored preference for automatic locale redirects on canonical routes", () => {
    expect(getGermanRedirectPath("/", "de-DE", "en")).toBeNull();
    expect(getGermanRedirectPath("/privacy", "en-US", "de")).toBeNull();
  });
});
