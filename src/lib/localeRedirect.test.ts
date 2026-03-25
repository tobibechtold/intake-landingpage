import { describe, expect, it } from "vitest";
import { getGermanRedirectPath } from "./localeRedirect";

describe("getGermanRedirectPath", () => {
  it("redirects default german routes to english for non-german browsers", () => {
    expect(getGermanRedirectPath("/", "en-US")).toBe("/en");
    expect(getGermanRedirectPath("/privacy", "fr-FR")).toBe("/en/privacy");
    expect(getGermanRedirectPath("/terms", "en-GB")).toBe("/en/terms");
  });

  it("redirects legacy german-prefixed routes to canonical german paths", () => {
    expect(getGermanRedirectPath("/de", "en-US")).toBe("/");
    expect(getGermanRedirectPath("/de/privacy", "en-US")).toBe("/privacy");
    expect(getGermanRedirectPath("/de/whats-new/2.1.1", "fr-FR")).toBe("/whats-new/2.1.1");
  });

  it("does not redirect english routes, german browsers, or unknown paths", () => {
    expect(getGermanRedirectPath("/", "de-DE")).toBeNull();
    expect(getGermanRedirectPath("/en", "en-US")).toBeNull();
    expect(getGermanRedirectPath("/en/privacy", "fr-FR")).toBeNull();
    expect(getGermanRedirectPath("/unknown", "de-DE")).toBeNull();
  });

  it("lets stored preference override browser language", () => {
    expect(getGermanRedirectPath("/", "de-DE", "en")).toBe("/en");
    expect(getGermanRedirectPath("/privacy", "en-US", "de")).toBeNull();
  });
});
