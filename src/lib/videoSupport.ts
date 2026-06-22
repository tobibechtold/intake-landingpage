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

const AV1_WEBM_MIME_TYPES = [
  'video/webm; codecs="av01.0.05M.08"',
  'video/webm; codecs="av1"',
];

export function getPromoVideoSourceForCapabilities(
  canPlayType: (type: string) => string,
  language: Language = "de"
): string {
  const supportsAv1Webm = AV1_WEBM_MIME_TYPES.some((type) => {
    const supportLevel = canPlayType(type);
    return supportLevel === "probably" || supportLevel === "maybe";
  });

  const sources = PROMO_VIDEO_SOURCES_BY_LANGUAGE[language];
  return supportsAv1Webm ? sources.webm : sources.mp4;
}
