import { describe, expect, it } from "vitest";
import { getPromoVideoSourceForCapabilities, PROMO_VIDEO_SOURCES } from "./videoSupport";

describe("getPromoVideoSourceForCapabilities", () => {
  it("returns WebM when AV1 WebM is supported", () => {
    const source = getPromoVideoSourceForCapabilities((type) =>
      type === 'video/webm; codecs="av01.0.05M.08"' ? "probably" : ""
    );

    expect(source).toBe(PROMO_VIDEO_SOURCES.webm);
  });

  it("returns MP4 when AV1 WebM is not supported", () => {
    const source = getPromoVideoSourceForCapabilities(() => "");

    expect(source).toBe(PROMO_VIDEO_SOURCES.mp4);
  });
});
