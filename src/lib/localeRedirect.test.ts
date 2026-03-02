import { describe, expect, it } from "vitest";
import { getGermanRedirectPath } from "./localeRedirect";

describe("getGermanRedirectPath", () => {
  it("redirects English routes when browser language is German", () => {
    expect(getGermanRedirectPath("/", "de-DE")).toBe("/de");
    expect(getGermanRedirectPath("/privacy", "de")).toBe("/de/privacy");
    expect(getGermanRedirectPath("/terms", "de-AT")).toBe("/de/terms");
  });

  it("does not redirect already-localized german routes", () => {
    expect(getGermanRedirectPath("/de", "de-DE")).toBeNull();
    expect(getGermanRedirectPath("/de/privacy", "de-DE")).toBeNull();
  });

  it("does not redirect for non-german browsers or unknown paths", () => {
    expect(getGermanRedirectPath("/", "en-US")).toBeNull();
    expect(getGermanRedirectPath("/privacy", "fr-FR")).toBeNull();
    expect(getGermanRedirectPath("/unknown", "de-DE")).toBeNull();
  });

  it("does not redirect when user explicitly prefers english", () => {
    expect(getGermanRedirectPath("/", "de-DE", "en")).toBeNull();
    expect(getGermanRedirectPath("/privacy", "de-DE", "en")).toBeNull();
  });
});
