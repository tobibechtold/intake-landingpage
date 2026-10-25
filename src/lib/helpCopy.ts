import type { Language } from '@/i18n/translations';
import { docsHome, type HelpArea } from '@/lib/helpTopics';

/**
 * Copy of the help home (/hilfe, /en/help). The help topics live on the docs site
 * (docs.getintake.de); this page leads there, lists the docs sections and keeps
 * the pre-purchase FAQ.
 */
export const HELP_FAQ_COPY = {
  en: {
    docsKicker: "Intake Docs",
    docsTitle: "How do I do that in Intake?",
    docsBody:
      "The Intake docs walk you through every feature step by step, with screenshots for iPhone and Android.",
    docsCta: "Open the docs",
    docsHref: docsHome('en'),
    faqKicker: "FAQ",
    faqTitle: "Before you buy",
    sectionsTitle: "Topics in the docs",
  },
  de: {
    docsKicker: "Intake Docs",
    docsTitle: "Wie geht das in Intake?",
    docsBody:
      "Die Intake Docs erklären jede Funktion Schritt für Schritt, mit Screenshots für iPhone und Android.",
    docsCta: "Zu den Docs",
    docsHref: docsHome('de'),
    faqKicker: "FAQ",
    faqTitle: "Vor dem Kauf",
    sectionsTitle: "Themen in den Docs",
  },
};

/** Area names on the help home, the same as the docs sidebar chapters. */
export const HELP_AREA_LABELS: Record<Language, Record<HelpArea, string>> = {
  de: {
    heute: "Heute",
    logging: "Essen erfassen",
    "recipes-library": "Rezepte & Bibliothek",
    "goals-budget": "Ziele & Wochenbudget",
    fasting: "Fasten",
    water: "Wasser",
    "weight-body": "Gewicht & Körpermaße",
    stats: "Statistik",
    health: "Apple Health & Health Connect",
    sync: "Sync & Backup",
    "widgets-watch-shortcuts": "Widgets, Watch & Kurzbefehle",
    "intake-ai": "Intake AI",
    settings: "Einstellungen",
  },
  en: {
    heute: "Today",
    logging: "Logging food",
    "recipes-library": "Recipes & Library",
    "goals-budget": "Goals & weekly budget",
    fasting: "Fasting",
    water: "Water",
    "weight-body": "Weight & body measurements",
    stats: "Stats",
    health: "Apple Health & Health Connect",
    sync: "Sync & backup",
    "widgets-watch-shortcuts": "Widgets, Watch & Shortcuts",
    "intake-ai": "Intake AI",
    settings: "Settings",
  },
};
