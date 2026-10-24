import type { Language } from '@/i18n/translations';
import type { HelpArea } from '@/lib/helpTopics';

/** Copy of the help home (/hilfe, /en/help). */
export const HELP_FAQ_COPY = {
  en: {
    searchLabel: "Search help",
    searchPlaceholder: "Search topics, e.g. copy meal",
    resultsTitle: "Matching topics",
    noResultsTitle: "No matching topics",
    noResultsBody: "Try a different search term or clear the search.",
    clearSearch: "Clear search",
    topicsTitle: "Help topics",
    faqKicker: "FAQ",
    faqTitle: "Before you buy",
    guideKicker: "Setup guide",
    guideTitle: "Use your own API key with Intake AI",
    guideBody:
      "New to API keys? Learn how to create one with OpenAI, Claude, or Gemini and add it securely in Intake.",
    guideCta: "Open the BYOK setup guide",
  },
  de: {
    searchLabel: "Hilfe durchsuchen",
    searchPlaceholder: "Themen suchen, z. B. Mahlzeit kopieren",
    resultsTitle: "Passende Themen",
    noResultsTitle: "Keine passenden Themen",
    noResultsBody: "Versuche einen anderen Suchbegriff oder lösche die Suche.",
    clearSearch: "Suche löschen",
    topicsTitle: "Hilfethemen",
    faqKicker: "FAQ",
    faqTitle: "Vor dem Kauf",
    guideKicker: "Einrichtungsanleitung",
    guideTitle: "Eigenen API-Schlüssel mit Intake AI nutzen",
    guideBody:
      "Noch nie einen API-Schlüssel verwendet? Erfahre, wie du ihn bei OpenAI, Claude oder Gemini erstellst und sicher in Intake hinterlegst.",
    guideCta: "Anleitung zur BYOK-Einrichtung öffnen",
  },
};

/** Area headings on the help home, in the language of the page. */
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
