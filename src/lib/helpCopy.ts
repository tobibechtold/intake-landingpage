import { docsHome } from '@/lib/helpTopics';

/**
 * Copy of the help home (/hilfe, /en/help). The help topics live on the docs site
 * (docs.getintake.de); this page leads there and keeps the BYOK guide and the
 * pre-purchase FAQ.
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
    guideKicker: "Setup guide",
    guideTitle: "Use your own API key with Intake AI",
    guideBody:
      "New to API keys? Learn how to create one with OpenAI, Claude, or Gemini and add it securely in Intake.",
    guideCta: "Open the BYOK setup guide",
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
    guideKicker: "Einrichtungsanleitung",
    guideTitle: "Eigenen API-Schlüssel mit Intake AI nutzen",
    guideBody:
      "Noch nie einen API-Schlüssel verwendet? Erfahre, wie du ihn bei OpenAI, Claude oder Gemini erstellst und sicher in Intake hinterlegst.",
    guideCta: "Anleitung zur BYOK-Einrichtung öffnen",
  },
};
