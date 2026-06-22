import { describe, expect, it } from "vitest";
import {
  getPromoVideoSourceForCapabilities,
  PROMO_VIDEO_SOURCES_BY_LANGUAGE,
} from "./videoSupport";

describe("getPromoVideoSourceForCapabilities", () => {
  it("returns WebM when AV1 WebM is supported", () => {
    const source = getPromoVideoSourceForCapabilities((type) =>
      type === 'video/webm; codecs="av01.0.05M.08"' ? "probably" : ""
    );

    expect(source).toBe(PROMO_VIDEO_SOURCES_BY_LANGUAGE.de.webm);
  });

  it("returns MP4 when AV1 WebM is not supported", () => {
    const source = getPromoVideoSourceForCapabilities(() => "");

    expect(source).toBe(PROMO_VIDEO_SOURCES_BY_LANGUAGE.de.mp4);
  });

  it("returns the English WebM when AV1 WebM is supported for English", () => {
    const source = getPromoVideoSourceForCapabilities(
      (type) => (type === 'video/webm; codecs="av01.0.05M.08"' ? "probably" : ""),
      "en"
    );

    expect(source).toBe(PROMO_VIDEO_SOURCES_BY_LANGUAGE.en.webm);
  });

  it("returns the English MP4 when AV1 WebM is not supported for English", () => {
    const source = getPromoVideoSourceForCapabilities(() => "", "en");

    expect(source).toBe(PROMO_VIDEO_SOURCES_BY_LANGUAGE.en.mp4);
  });
});
