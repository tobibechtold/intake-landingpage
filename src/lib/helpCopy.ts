import type { Language } from '@/i18n/translations';

// Extracted verbatim from HelpPage.tsx so the .astro page can share it.
export const HELP_FAQ_COPY = {
  en: {
    searchLabel: "Search FAQ",
    searchPlaceholder: "Search pricing, Intake AI, sync, privacy...",
    noResultsTitle: "No matching questions",
    noResultsBody: "Try a different search term or clear the search.",
    clearSearch: "Clear search",
    guideKicker: "Setup guide",
    guideTitle: "Use your own API key with Intake AI",
    guideBody:
      "New to API keys? Learn how to create one with OpenAI, Claude, or Gemini and add it securely in Intake.",
    guideCta: "Open the BYOK setup guide",
  },
  de: {
    searchLabel: "FAQ durchsuchen",
    searchPlaceholder: "Preis, Intake AI, Sync, Datenschutz suchen...",
    noResultsTitle: "Keine passenden Fragen",
    noResultsBody: "Versuche einen anderen Suchbegriff oder lösche die Suche.",
    clearSearch: "Suche löschen",
    guideKicker: "Einrichtungsanleitung",
    guideTitle: "Eigenen API-Schlüssel mit Intake AI nutzen",
    guideBody:
      "Noch nie einen API-Schlüssel verwendet? Erfahre, wie du ihn bei OpenAI, Claude oder Gemini erstellst und sicher in Intake hinterlegst.",
    guideCta: "Anleitung zur BYOK-Einrichtung öffnen",
  },
};
