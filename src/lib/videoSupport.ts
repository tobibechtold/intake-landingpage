export const PROMO_VIDEO_SOURCES = {
  webm: "/promo-video.webm",
  mp4: "/promo-video.mp4",
} as const;

const AV1_WEBM_MIME_TYPES = [
  'video/webm; codecs="av01.0.05M.08"',
  'video/webm; codecs="av1"',
];

export function getPromoVideoSourceForCapabilities(
  canPlayType: (type: string) => string
): string {
  const supportsAv1Webm = AV1_WEBM_MIME_TYPES.some((type) => {
    const supportLevel = canPlayType(type);
    return supportLevel === "probably" || supportLevel === "maybe";
  });

  return supportsAv1Webm ? PROMO_VIDEO_SOURCES.webm : PROMO_VIDEO_SOURCES.mp4;
}
