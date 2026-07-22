import { beforeEach, describe, expect, it } from "vitest";
import { captureUtmParams, getStoredAttribution, sourceFromSlug } from "./attribution";

describe("sourceFromSlug", () => {
  it("returns the part before the first dash", () => {
    expect(sourceFromSlug("tiktok-ugc1")).toBe("tiktok");
    expect(sourceFromSlug("threads-bio")).toBe("threads");
  });

  it("returns the slug itself when there is no dash", () => {
    expect(sourceFromSlug("website")).toBe("website");
  });
});

describe("captureUtmParams / getStoredAttribution", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  it("stores full utm params", () => {
    captureUtmParams("?utm_source=tiktok&utm_medium=smartlink&utm_campaign=tiktok-ugc1");
    expect(getStoredAttribution()).toEqual({
      source: "tiktok",
      medium: "smartlink",
      campaign: "tiktok-ugc1",
    });
  });

  it("derives source from the campaign slug when utm_source is missing", () => {
    captureUtmParams("?utm_campaign=meta-ugc2");
    expect(getStoredAttribution()).toEqual({
      source: "meta",
      medium: "website",
      campaign: "meta-ugc2",
    });
  });

  it("uses source as campaign when utm_campaign is missing", () => {
    captureUtmParams("?utm_source=newsletter");
    expect(getStoredAttribution()).toEqual({
      source: "newsletter",
      medium: "website",
      campaign: "newsletter",
    });
  });

  it("does nothing when no utm params are present", () => {
    captureUtmParams("?ref=producthunt");
    expect(getStoredAttribution()).toBeNull();
  });

  it("does not overwrite an existing attribution with a later utm-less visit", () => {
    captureUtmParams("?utm_campaign=tiktok-ugc1");
    captureUtmParams("");
    expect(getStoredAttribution()?.campaign).toBe("tiktok-ugc1");
  });

  it("returns null for corrupt stored JSON", () => {
    window.sessionStorage.setItem("intake_attribution", "{not json");
    expect(getStoredAttribution()).toBeNull();
  });
});
