import { Language } from "@/i18n/translations";

export const PROMO_VIDEO_SOURCES_BY_LANGUAGE: Record<Language, { webm: string; mp4: string }> = {
  de: {
    webm: "/promo-video.webm",
    mp4: "/promo-video.mp4",
  },
  en: {
    webm: "/promo-video-en.webm",
    mp4: "/promo-video-en.mp4",
  },
} as const;

export const PROMO_VIDEO_SOURCES = PROMO_VIDEO_SOURCES_BY_LANGUAGE.de;
export type PromoVideoFormat = keyof typeof PROMO_VIDEO_SOURCES;

const AV1_WEBM_MIME_TYPES = [
  'video/webm; codecs="av01.0.05M.08"',
  'video/webm; codecs="av1"',
];

export function getPromoVideoSourceForCapabilities(
  canPlayType: (type: string) => string,
  language: Language = "de"
): string {
  const format = getPromoVideoFormatForCapabilities(canPlayType);
  return PROMO_VIDEO_SOURCES_BY_LANGUAGE[language][format];
}

export function getPromoVideoFormatForCapabilities(
  canPlayType: (type: string) => string
): PromoVideoFormat {
  const supportsAv1Webm = AV1_WEBM_MIME_TYPES.some((type) => {
    const supportLevel = canPlayType(type);
    return supportLevel === "probably" || supportLevel === "maybe";
  });

  return supportsAv1Webm ? "webm" : "mp4";
}
