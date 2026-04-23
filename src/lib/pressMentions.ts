import iphoneTickerLogo from "@/assets/press/image-icon-256-01-small.png";
import iTopnewsLogo from "@/assets/press/cropped-cropped-201504_10_iTN-Logo801.png";
import macweltLogo from "@/assets/press/macwelt-logo.svg";
import stadtBremerhavenLogo from "@/assets/press/caschy-logo.svg";
import { Language } from "@/i18n/translations";

export interface PressMention {
  name: string;
  articleTitle: string;
  articleUrl: string;
  logoSrc: string;
  visibleLabel?: string;
}

export const PRESS_MENTIONS: PressMention[] = [
  {
    name: "Macwelt",
    articleTitle: 'iPhone-Kalorienzähler "Intake" – mein persönliches Experiment',
    articleUrl:
      "https://www.macwelt.de/article/3108243/iphone-kalorienzahler-intake-mein-personliches-experiment.html",
    logoSrc: macweltLogo,
  },
  {
    name: "iPhone-Ticker",
    articleTitle: "Beliebte Kalorien-App Intake: Nährstofftracking und Intervallfasten",
    articleUrl:
      "https://www.iphone-ticker.de/beliebte-kalorien-app-intake-naehrstofftracking-und-intervallfasten-276388",
    logoSrc: iphoneTickerLogo,
    visibleLabel: "iPhone-Ticker",
  },
  {
    name: "iTopnews",
    articleTitle: "Intake: Kalorien zählen ohne Abo und Tracking",
    articleUrl:
      "https://www.itopnews.de/2026/03/intake-kalorien-zaehlen-ohne-abo-und-tracking/",
    logoSrc: iTopnewsLogo,
    visibleLabel: "iTopnews",
  },
  {
    name: "stadt-bremerhaven.de",
    articleTitle:
      "Intake: Schlanke Alternative zum Foodtracking ohne Gamification und Abonnements",
    articleUrl:
      "https://stadt-bremerhaven.de/intake-schlanke-alternative-zum-foodtracking-ohne-gamification-und-abonnements/",
    logoSrc: stadtBremerhavenLogo,
  },
];

export const getPressMentionLabel = (language: Language, mention: PressMention): string =>
  `${mention.name}: ${mention.articleTitle}`;
