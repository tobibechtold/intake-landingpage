import { Language } from "@/i18n/translations";

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
  | "recipes";

interface ScreenshotAsset {
  src: string;
  alt: string;
  caption: string;
}

const SCREENSHOT_DATA: Record<Language, Record<ScreenshotAssetKey, ScreenshotAsset>> = {
  de: {
    onboarding: {
      src: "/screenshots/landing/de-onboarding.png",
      alt: "Intake Onboarding auf Deutsch",
      caption: "Schneller Start ohne Konto und ohne Abo-Funnel.",
    },
    testimonial: {
      src: "/screenshots/landing/de-testimonial.png",
      alt: "Bewertungs- und Vertrauensscreen von Intake",
      caption: "Bewertungen und Vertrauen als Teil des App-Erlebnisses.",
    },
    addFood: {
      src: "/screenshots/landing/de-add-food.png",
      alt: "Lebensmittel in Intake hinzufügen",
      caption: "Mahlzeiten schnell erfassen und eigene Einträge anlegen.",
    },
    scanFood: {
      src: "/screenshots/landing/de-scan-food.png",
      alt: "Barcode-Scanner in Intake",
      caption: "Lebensmittel direkt per Barcode-Scan loggen.",
    },
    dashboard: {
      src: "/screenshots/landing/de-dashboard.png",
      alt: "Dashboard mit Kalorien und Makros in Intake",
      caption: "Dashboard mit Kalorien, Makros und Tagesverlauf.",
    },
    health: {
      src: "/screenshots/landing/de-health.png",
      alt: "Health-Integration in Intake",
      caption: "Apple Health und Health Connect für ein integriertes Tracking.",
    },
    appleWatch: {
      src: "/screenshots/landing/de-apple-watch.png",
      alt: "Apple Watch und Live Activities in Intake",
      caption: "Fasten und Fortschritt mit iOS Live Activities und Apple Watch im Blick.",
    },
    fasting: {
      src: "/screenshots/landing/de-water.png",
      alt: "Intervallfasten in Intake",
      caption: "Intervallfasten mit klarer Timer-Ansicht direkt in der App.",
    },
    statistics: {
      src: "/screenshots/landing/de-statistics.png",
      alt: "Statistiken für Makros, Vitamine, Mineralstoffe und Koffein in Intake",
      caption: "30+ Nährwerte, Vitamine, Mineralstoffe und Koffein in klaren Statistiken.",
    },
    recipes: {
      src: "/screenshots/landing/de-recipes.png",
      alt: "Rezepte in Intake",
      caption: "Rezepte speichern und wiederverwenden statt Mahlzeiten jedes Mal neu einzutragen.",
    },
  },
  en: {
    onboarding: {
      src: "/screenshots/landing/en-onboarding.png",
      alt: "Intake onboarding in English",
      caption: "Start tracking quickly without an account or subscription funnel.",
    },
    testimonial: {
      src: "/screenshots/landing/en-testimonial.png",
      alt: "Trust and testimonial screen in Intake",
      caption: "Social proof and product trust built into the experience.",
    },
    addFood: {
      src: "/screenshots/landing/en-add-food.png",
      alt: "Add food flow in Intake",
      caption: "Add foods quickly and save your own entries.",
    },
    scanFood: {
      src: "/screenshots/landing/en-scan-food.png",
      alt: "Barcode scanning in Intake",
      caption: "Log foods quickly with barcode scanning.",
    },
    dashboard: {
      src: "/screenshots/landing/en-dashboard.png",
      alt: "Dashboard with calories and macros in Intake",
      caption: "A focused dashboard for calories, macros, and daily progress.",
    },
    health: {
      src: "/screenshots/landing/en-health.png",
      alt: "Health integration in Intake",
      caption: "Apple Health and Health Connect keep the tracker connected.",
    },
    appleWatch: {
      src: "/screenshots/landing/en-apple-watch.png",
      alt: "Apple Watch and Live Activities support in Intake",
      caption: "Keep fasting and progress visible with Live Activities and Apple Watch support.",
    },
    fasting: {
      src: "/screenshots/landing/en-water.png",
      alt: "Intermittent fasting in Intake",
      caption: "Intermittent fasting with a clear timer view inside the app.",
    },
    statistics: {
      src: "/screenshots/landing/en-statistics.png",
      alt: "Statistics for macros, vitamins, minerals, and caffeine in Intake",
      caption: "Track 30+ nutrients including vitamins, minerals, and caffeine.",
    },
    recipes: {
      src: "/screenshots/landing/en-recipes.png",
      alt: "Recipe management in Intake",
      caption: "Save recipes and reuse them instead of rebuilding meals.",
    },
  },
};

export const getScreenshotAsset = (language: Language, key: ScreenshotAssetKey): ScreenshotAsset =>
  SCREENSHOT_DATA[language][key];

export const getScreenshotGalleryAssets = (language: Language) => {
  const keys: ScreenshotAssetKey[] = [
    "dashboard",
    "statistics",
    "fasting",
    "appleWatch",
    "addFood",
    "scanFood",
    "health",
    "recipes",
    "testimonial",
    "onboarding",
  ];

  return keys.map((key) => ({
    key,
    ...getScreenshotAsset(language, key),
  }));
};
