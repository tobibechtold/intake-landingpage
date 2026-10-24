import { type Language } from "@/i18n/translations";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqSection {
  title: string;
  items: FaqItem[];
}

/**
 * The pre-purchase FAQ on the help home (price, Intake AI, own key, privacy, food data,
 * Health compatibility). Everything about how the app works lives in help topics; see
 * docs/superpowers/specs/2026-10-25-help-center/faq-review.md for what moved where.
 */
export const FAQ_SECTIONS_BY_LANGUAGE: Record<Language, FaqSection[]> = {
  en: [
    {
      title: "Pricing",
      items: [
        {
          question: "Is Intake a subscription-based app?",
          answer:
            "No. The core Intake app is a one-time purchase with no recurring subscription fees. Intake AI is a separate optional add-on for richer AI food logging, and own API key (BYOK) logging is available without an Intake AI subscription.",
        },
        {
          question: "Is there a trial period?",
          answer:
            "Not for the app: it is a one-time purchase, and you can return it within the store's return period. Intake AI, the optional subscription, starts with a 3-day free trial for new subscribers.",
        },
        {
          question: "Why does Intake AI require a subscription?",
          answer:
            "Intake AI uses model calls that create ongoing costs, especially for photos and longer conversations. The subscription covers those hosted AI costs while the core app remains a one-time purchase.",
        },
      ],
    },
    {
      title: "Intake AI",
      items: [
        {
          question: "Is Intake AI mandatory?",
          answer:
            "No. Intake AI is optional. You can keep using Intake with search, barcode scanning, custom foods, recipes, and all core tracking without enabling AI.",
        },
        {
          question: "What does the Intake AI subscription include?",
          answer:
            "Intake AI lets you describe meals with text, analyze meal photos, scan nutrition labels, log recognized ingredients separately, correct ingredients and amounts in place, adjust portions, and edit calories before logging. In Germany it costs 3.99 € per month or 39.99 € per year, each with a 3-day free trial. The App Store and Google Play show the price for your country.",
        },
        {
          question: "What is the difference between Intake AI and own API key (BYOK)?",
          answer:
            "Both log meals from a text description or a photo, show the estimate as a card, and let you change the portion and log it as one meal or ingredient by ingredient. Intake AI adds the correction view for ingredients and amounts and nutrition-label scanning, works without a key or provider account, and keeps improving. With your own API key (BYOK) you use your own provider account and pay its usage costs.",
        },
        {
          question: "Which features are Intake AI exclusive?",
          answer:
            "Two features need Intake AI: the correction view, where you correct the food, amounts or nutrition values and edit, remove or add ingredients, and nutrition-label scanning, which fills in the create-product form from a photo of the label.",
        },
        {
          question: "Are Intake AI nutrition values exact?",
          answer:
            "No. AI results are estimates and can be wrong, especially with unclear portions or hidden ingredients. Intake AI shows editable suggestions so you can review values before saving them.",
        },
      ],
    },
    {
      title: "Own API key (BYOK)",
      items: [
        {
          question: "Can I use AI logging with my own API key (BYOK)?",
          answer:
            "Yes. You can add your own OpenAI, Claude, or Gemini API key in Settings and log meals by text or photo with AI without paying for the Intake AI subscription. Your chosen provider's terms and usage costs still apply.",
        },
        {
          question: "Do I need an Intake AI subscription if I use my own API key (BYOK)?",
          answer:
            "No. Own API key (BYOK) logging does not require an Intake AI subscription. It does not include the two Intake AI features: the correction view and nutrition-label scanning.",
        },
        {
          question: "Which providers can I use with my own API key (BYOK)?",
          answer:
            "Intake supports own API key (BYOK) logging with OpenAI, Anthropic Claude, and Google Gemini providers.",
        },
        {
          question: "Does ChatGPT Plus or Claude Pro include an API key?",
          answer:
            "No. ChatGPT Plus, ChatGPT Pro, Claude Pro, and Claude Max do not include API keys or API credits. API access is separate and requires a developer/API account with the provider.",
        },
      ],
    },
    {
      title: "Privacy & data",
      items: [
        {
          question: "Do I need an account to use Intake?",
          answer:
            "No account is required. Your data stays on your device. On iPhone it can sync through your own iCloud account, and on Android you can turn on an encrypted backup to your Google Drive.",
        },
        {
          question: "What data is sent when I use Intake AI?",
          answer:
            "Intake AI sends food descriptions, photos, captions, and recent chat context through Intake's backend and AI providers to generate nutrition estimates. Intake does not sell your data or use it for advertising.",
        },
        {
          question: "What data is sent when I use my own API key (BYOK)?",
          answer:
            "When you use your own API key (BYOK), requests are sent to the provider you selected. That provider's terms, privacy rules, and usage costs apply to those requests.",
        },
        {
          question: "Is Intake privacy-first?",
          answer:
            "Yes. All of your data stays on your device by default. iCloud sync on iPhone and the encrypted Google Drive backup on Android are optional. Intake is designed to work without account tracking and without selling your personal data.",
        },
      ],
    },
    {
      title: "Food data",
      items: [
        {
          question: "How many foods are included?",
          answer: "Intake includes access to a food database with over 3 million entries.",
        },
        {
          question: "Where does the food data come from?",
          answer:
            "Intake combines food data from USDA, the German Bundeslebensmittelschlüssel (BLS), and Open Food Facts (which provides most entries). By combining these sources, search results are broader and more accurate. The data is updated daily so you always get the latest information.",
        },
      ],
    },
    {
      title: "Integrations",
      items: [
        {
          question: "Does Intake integrate with Apple Health (iOS) or Health Connect (Android)?",
          answer:
            "Yes. Intake supports Apple Health on iOS and Health Connect on Android so your nutrition data can sync with your health ecosystem.",
        },
      ],
    },
  ],
  de: [
    {
      title: "Preis",
      items: [
        {
          question: "Ist Intake ein Abo-Modell?",
          answer:
            "Nein. Die Core-App von Intake ist ein Einmalkauf ohne laufende Abo-Gebühren. Intake AI ist ein separates optionales Add-on für mehr KI-Food-Logging-Funktionen, und Logging mit eigenem API-Schlüssel (BYOK) ist ohne Intake-AI-Abo möglich.",
        },
        {
          question: "Gibt es eine Testphase?",
          answer:
            "Nicht für die App: Sie ist ein Einmalkauf, und du kannst sie innerhalb der Rückgabefrist des Stores zurückgeben. Intake AI, das optionale Abo, startet für neue Abonnenten mit 3 Tagen kostenloser Testphase.",
        },
        {
          question: "Warum braucht Intake AI ein Abo?",
          answer:
            "Intake AI nutzt Modellanfragen, die laufende Kosten verursachen, besonders bei Fotos und längeren Chats. Das Abo deckt diese gehosteten KI-Kosten ab, während die Core-App weiterhin ein Einmalkauf bleibt.",
        },
      ],
    },
    {
      title: "Intake AI",
      items: [
        {
          question: "Ist Intake AI verpflichtend?",
          answer:
            "Nein. Intake AI ist optional. Du kannst Intake weiterhin mit Suche, Barcode-Scan, eigenen Lebensmitteln, Rezepten und allen Kernfunktionen nutzen, ohne KI zu aktivieren.",
        },
        {
          question: "Was ist im Intake-AI-Abo enthalten?",
          answer:
            "Mit Intake AI kannst du Mahlzeiten per Text beschreiben, Fotos analysieren, Nährwertlabels scannen, erkannte Zutaten einzeln loggen, Zutaten und Mengen direkt korrigieren, Portionen anpassen und Kalorien vor dem Loggen bearbeiten. In Deutschland kostet es 3,99 € pro Monat oder 39,99 € pro Jahr, jeweils mit 3 Tagen kostenloser Testphase. Im App Store und bei Google Play siehst du den Preis für dein Land.",
        },
        {
          question: "Was ist der Unterschied zwischen Intake AI und eigenem API-Schlüssel (BYOK)?",
          answer:
            "Beide erfassen Mahlzeiten aus einer Beschreibung oder einem Foto, zeigen die Schätzung als Karte und lassen dich die Portion ändern und als eine Mahlzeit oder Zutat für Zutat loggen. Intake AI hat zusätzlich die Korrekturansicht für Zutaten und Mengen und das Scannen von Nährwertlabels, funktioniert ohne Schlüssel und Anbieterkonto und wird laufend verbessert. Mit eigenem API-Schlüssel (BYOK) nutzt du dein eigenes Anbieterkonto und zahlst dessen Nutzungskosten.",
        },
        {
          question: "Welche Funktionen gibt es nur mit Intake AI?",
          answer:
            "Zwei Funktionen gibt es nur mit Intake AI: die Korrekturansicht, in der du Lebensmittel, Mengen oder Nährwerte korrigierst und Zutaten bearbeitest, entfernst oder ergänzt, und das Scannen von Nährwertlabels, das das Formular zum Erstellen eines Produkts aus einem Foto des Labels ausfüllt.",
        },
        {
          question: "Sind die Nährwerte von Intake AI exakt?",
          answer:
            "Nein. KI-Ergebnisse sind Schätzungen und können falsch sein, besonders bei unklaren Portionsgrößen oder versteckten Zutaten. Intake AI zeigt bearbeitbare Vorschläge, die du vor dem Speichern prüfen kannst.",
        },
      ],
    },
    {
      title: "Eigener API-Schlüssel (BYOK)",
      items: [
        {
          question: "Kann ich KI-Logging mit eigenem API-Schlüssel (BYOK) nutzen?",
          answer:
            "Ja. Du kannst in den Einstellungen deinen eigenen OpenAI-, Claude- oder Gemini-API-Schlüssel hinterlegen und Mahlzeiten per Text oder Foto mit KI erfassen, ohne für das Intake-AI-Abo zu zahlen. Die Bedingungen und eventuelle Nutzungskosten deines gewählten Anbieters gelten trotzdem.",
        },
        {
          question: "Brauche ich ein Intake-AI-Abo, wenn ich meinen eigenen API-Schlüssel (BYOK) nutze?",
          answer:
            "Nein. Logging mit eigenem API-Schlüssel (BYOK) braucht kein Intake-AI-Abo. Die zwei Intake-AI-Funktionen sind dann nicht dabei: die Korrekturansicht und das Scannen von Nährwertlabels.",
        },
        {
          question: "Welche Anbieter kann ich mit eigenem API-Schlüssel (BYOK) nutzen?",
          answer:
            "Intake unterstützt Logging mit eigenem API-Schlüssel (BYOK) über OpenAI, Anthropic Claude und Google Gemini.",
        },
        {
          question: "Enthält ChatGPT Plus oder Claude Pro einen API-Schlüssel?",
          answer:
            "Nein. ChatGPT Plus, ChatGPT Pro, Claude Pro und Claude Max enthalten keine API-Schlüssel und kein API-Guthaben. API-Zugriff ist separat und benötigt einen Entwickler- beziehungsweise API-Account beim Anbieter.",
        },
      ],
    },
    {
      title: "Datenschutz & Daten",
      items: [
        {
          question: "Brauche ich ein Konto für Intake?",
          answer:
            "Nein. Du brauchst kein Konto. Deine Daten bleiben auf deinem Gerät. Auf dem iPhone können sie über dein eigenes iCloud-Konto synchronisiert werden, auf Android kannst du ein verschlüsseltes Backup in dein Google Drive einschalten.",
        },
        {
          question: "Welche Daten werden bei Intake AI gesendet?",
          answer:
            "Intake AI sendet Essensbeschreibungen, Fotos, Bildunterschriften und den letzten Chat-Kontext über das Intake-Backend und KI-Anbieter, um Nährwertschätzungen zu erstellen. Intake verkauft deine Daten nicht und nutzt sie nicht für Werbung.",
        },
        {
          question: "Welche Daten werden bei eigenem API-Schlüssel (BYOK) gesendet?",
          answer:
            "Wenn du deinen eigenen API-Schlüssel (BYOK) nutzt, werden Anfragen an den von dir gewählten Anbieter gesendet. Für diese Anfragen gelten die Bedingungen, Datenschutzregeln und Nutzungskosten dieses Anbieters.",
        },
        {
          question: "Ist Intake datenschutzfreundlich?",
          answer:
            "Ja. Alle deine Daten bleiben standardmäßig auf deinem Gerät. Der iCloud-Sync auf dem iPhone und das verschlüsselte Google-Drive-Backup auf Android sind optional. Intake ist auf Privatsphäre ausgelegt, ohne Account-Tracking und ohne Verkauf persönlicher Daten.",
        },
      ],
    },
    {
      title: "Lebensmitteldaten",
      items: [
        {
          question: "Wie viele Lebensmittel sind enthalten?",
          answer: "Intake bietet Zugriff auf eine Lebensmitteldatenbank mit über 3 Millionen Einträgen.",
        },
        {
          question: "Woher stammen die Lebensmitteldaten?",
          answer:
            "Intake kombiniert Lebensmitteldaten aus USDA, dem Bundeslebensmittelschlüssel (BLS) und Open Food Facts. Von Open Food Facts stammt der Großteil der Einträge. Durch die Kombination dieser Quellen sind Suchergebnisse breiter und genauer. Die Daten werden täglich aktualisiert.",
        },
      ],
    },
    {
      title: "Integrationen",
      items: [
        {
          question: "Unterstützt Intake Apple Health (iOS) oder Health Connect (Android)?",
          answer:
            "Ja. Intake unterstützt Apple Health auf iOS und Health Connect auf Android, damit deine Ernährungsdaten in dein Gesundheits-Ökosystem passen.",
        },
      ],
    },
  ],
};

export const FAQ_BY_LANGUAGE: Record<Language, FaqItem[]> = {
  en: FAQ_SECTIONS_BY_LANGUAGE.en.flatMap((section) => section.items),
  de: FAQ_SECTIONS_BY_LANGUAGE.de.flatMap((section) => section.items),
};
