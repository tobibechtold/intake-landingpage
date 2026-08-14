import { type Language } from "@/i18n/translations";

export type ScreenshotAssetKey =
  | "onboarding"
  | "testimonial"
  | "addFood"
  | "scanFood"
  | "dashboard"
  | "health"
  | "appleWatch"
  | "fasting"
  | "statistics"
  | "intakeAi";

interface ScreenshotAsset {
  src: string;
  alt: string;
  caption: string;
}

/**
 * The store screenshot set, currently the 2.5 export. Filenames keep the store
 * ordering prefix so a new export can be dropped in and diffed against the
 * previous one without renaming anything.
 */
const SCREENSHOT_DATA: Record<Language, Record<ScreenshotAssetKey, ScreenshotAsset>> = {
  de: {
    onboarding: {
      src: "/screenshots/de-1-Onboarding.png",
      alt: "Intake Onboarding auf Deutsch",
      caption: "Schneller Start ohne Konto und ohne Abo-Funnel.",
    },
    testimonial: {
      src: "/screenshots/de-5-Testimonials.png",
      alt: "Bewertungs- und Vertrauensscreen von Intake",
      caption: "Bewertungen und Vertrauen als Teil des App-Erlebnisses.",
    },
    addFood: {
      src: "/screenshots/de-4-Add-Food.png",
      alt: "Lebensmittel in Intake hinzufügen",
      caption: "Mahlzeiten schnell erfassen und eigene Einträge anlegen.",
    },
    scanFood: {
      src: "/screenshots/de-6-Scan-Food.png",
      alt: "Barcode-Scanner in Intake",
      caption: "Lebensmittel direkt per Barcode-Scan loggen.",
    },
    dashboard: {
      src: "/screenshots/de-2-Dashboard.png",
      alt: "Dashboard mit Kalorien und Makros in Intake",
      caption: "Dashboard mit Kalorien, Makros und Tagesverlauf.",
    },
    health: {
      src: "/screenshots/de-7-Health.png",
      alt: "Health-Integration in Intake",
      caption: "Apple Health und Health Connect für ein integriertes Tracking.",
    },
    appleWatch: {
      src: "/screenshots/de-8-Apple-Watch.png",
      alt: "Apple Watch und Live Activities in Intake",
      caption: "Fasten und Fortschritt mit iOS Live Activities und Apple Watch im Blick.",
    },
    fasting: {
      src: "/screenshots/de-9-Fasting.png",
      alt: "Intervallfasten in Intake",
      caption: "Intervallfasten mit klarer Timer-Ansicht direkt in der App.",
    },
    statistics: {
      src: "/screenshots/de-10-Statistics.png",
      alt: "Statistiken für Makros, Vitamine, Mineralstoffe und Koffein in Intake",
      caption: "30+ Nährwerte, Vitamine, Mineralstoffe und Koffein in klaren Statistiken.",
    },
    intakeAi: {
      src: "/screenshots/de-3-Intake-AI.png",
      alt: "Mahlzeit per Foto erfassen mit Intake AI",
      caption: "Mahlzeiten per Foto oder Text erfassen, wahlweise im Abo oder mit eigenem API-Key.",
    },
  },
  en: {
    onboarding: {
      src: "/screenshots/en-1-Onboarding.png",
      alt: "Intake onboarding in English",
      caption: "Start tracking quickly without an account or subscription funnel.",
    },
    testimonial: {
      src: "/screenshots/en-5-Testimonials.png",
      alt: "Trust and testimonial screen in Intake",
      caption: "Social proof and product trust built into the experience.",
    },
    addFood: {
      src: "/screenshots/en-4-Add-Food.png",
      alt: "Add food flow in Intake",
      caption: "Add foods quickly and save your own entries.",
    },
    scanFood: {
      src: "/screenshots/en-6-Scan-Food.png",
      alt: "Barcode scanning in Intake",
      caption: "Log foods quickly with barcode scanning.",
    },
    dashboard: {
      src: "/screenshots/en-2-Dashboard.png",
      alt: "Dashboard with calories and macros in Intake",
      caption: "A focused dashboard for calories, macros, and daily progress.",
    },
    health: {
      src: "/screenshots/en-7-Health.png",
      alt: "Health integration in Intake",
      caption: "Apple Health and Health Connect keep the tracker connected.",
    },
    appleWatch: {
      src: "/screenshots/en-8-Apple-Watch.png",
      alt: "Apple Watch and Live Activities support in Intake",
      caption: "Keep fasting and progress visible with Live Activities and Apple Watch support.",
    },
    fasting: {
      src: "/screenshots/en-9-Fasting.png",
      alt: "Intermittent fasting in Intake",
      caption: "Intermittent fasting with a clear timer view inside the app.",
    },
    statistics: {
      src: "/screenshots/en-10-Statistics.png",
      alt: "Statistics for macros, vitamins, minerals, and caffeine in Intake",
      caption: "Track 30+ nutrients including vitamins, minerals, and caffeine.",
    },
    intakeAi: {
      src: "/screenshots/en-3-Intake-AI.png",
      alt: "Logging a meal from a photo with Intake AI",
      caption: "Log meals from a photo or a description, on a subscription or with your own API key.",
    },
  },
};

export const getScreenshotAsset = (language: Language, key: ScreenshotAssetKey): ScreenshotAsset =>
  SCREENSHOT_DATA[language][key];

export const getScreenshotGalleryAssets = (language: Language) => {
  const keys: ScreenshotAssetKey[] = [
    "dashboard",
    "statistics",
    "intakeAi",
    "fasting",
    "appleWatch",
    "addFood",
    "scanFood",
    "health",
    "testimonial",
    "onboarding",
  ];

  return keys.map((key) => ({
    key,
    ...getScreenshotAsset(language, key),
  }));
};
