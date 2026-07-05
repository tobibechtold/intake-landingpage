import { Language } from "@/i18n/translations";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqSection {
  title: string;
  items: FaqItem[];
}

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
            "No. A trial period would move things in the direction of in-app purchases and paywalls, and I do not want that in Intake. I do not want to lock people out or gate features after a certain amount of time. If you do not like the app, you can return it in both stores within the available return period.",
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
            "Intake AI lets you describe meals with text, analyze meal photos, scan nutrition labels, review recognized ingredients separately, correct estimates in place, adjust portions and amounts, and edit calories before logging. It costs 3.99 € per month or 39.99 € per year, each with a 3-day free trial.",
        },
        {
          question: "What is the difference between Intake AI and own API key (BYOK)?",
          answer:
            "Intake AI has the richer food-logging workflow: separate ingredient review, in-place corrections, portion controls, manual calorie adjustments, nutrition-label product creation, and continuous improvements. Own API key (BYOK) is the basic AI food logging chat using your provider key.",
        },
        {
          question: "Which features are Intake AI exclusive?",
          answer:
            "Intake AI exclusive features include logging recognized ingredients separately, editing ingredient names and amounts directly, choosing larger or smaller portions, removing or adding ingredients, manually adjusting calories before logging, and scanning nutrition labels to prefill the create-product form.",
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
            "Yes. You can add your own OpenAI, Claude, or Gemini API key in Settings and use basic AI food logging without paying for the Intake AI subscription. Your chosen provider's terms and usage costs still apply.",
        },
        {
          question: "Do I need an Intake AI subscription if I use my own API key (BYOK)?",
          answer:
            "No. Own API key (BYOK) logging does not require an Intake AI subscription. It is still limited to the basic AI chat flow and does not include Intake AI exclusive controls.",
        },
        {
          question: "Which providers can I use with my own API key (BYOK)?",
          answer:
            "Intake supports own API key (BYOK) logging with OpenAI, Anthropic Claude, and Google Gemini providers.",
        },
        {
          question: "How do I get an OpenAI, Anthropic, or Gemini API key?",
          answer:
            "Create or sign in to an account in the OpenAI dashboard, the Anthropic Console, or Google AI Studio, create an API key there, then paste it into Intake's AI settings. Keep the key private and delete it if you no longer want to use it.",
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
            "No account is required. Your data stays on your device and can sync via your iCloud account or Google Drive.",
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
            "Yes. All of your data stays on your device by default. iCloud and Google Drive backups are optional. Intake is designed to work without account tracking and without selling your personal data.",
        },
      ],
    },
    {
      title: "Tracking features",
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
        {
          question: "Can I set my own goals in Intake?",
          answer:
            "Yes. In Intake, you can choose whether you want to lose weight, gain weight, or maintain your weight. You can let Intake calculate your calorie target and macros, or enter your own values.",
        },
        {
          question: "Can I personalize Intake?",
          answer:
            "Yes. At the bottom of the Today page, you can edit your Today page, show or hide tiles and meals, and create your own meals.",
        },
      ],
    },
    {
      title: "Sync & integrations",
      items: [
        {
          question: "Does Intake integrate with Apple Health (iOS) or Health Connect (Android)?",
          answer:
            "Yes. Intake supports Apple Health on iOS and Health Connect on Android so your nutrition data can sync with your health ecosystem.",
        },
        {
          question: "What data does Intake read from Apple Health / Health Connect?",
          answer:
            "Intake reads your activity data, including workouts, steps, distance, and calories burned, and also your weight if you use a smart scale.",
        },
        {
          question: "Can I import historical weight data?",
          answer:
            "Yes. You can import your historical weight data from Apple Health so you can also view your full statistics inside Intake.",
        },
        {
          question: "Are activity calories added to my daily target?",
          answer:
            "Yes. But only if you want them to be. You can change that at any time in the settings.",
        },
        {
          question: "What data does Intake write to Apple Health / Health Connect?",
          answer:
            "Intake writes all nutrition values and calories from your meals so you can also use that information in other apps. Intake also writes the water you log in Intake or consume through marked foods.",
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
            "Nein. Eine Testphase würde in die Richtung In-App-Käufe und Paywalls gehen und das möchte ich in Intake nicht haben. Ich möchte niemanden nach einem bestimmten Zeitraum aussperren oder Features sperren müssen. Wenn dir die App nicht gefällt, kannst du sie in beiden Stores innerhalb des jeweiligen Rückgabezeitraums zurückgeben.",
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
            "Mit Intake AI kannst du Mahlzeiten per Text beschreiben, Fotos analysieren, Nährwertlabels scannen, erkannte Zutaten einzeln prüfen, Schätzungen direkt korrigieren, Portionen und Mengen anpassen und Kalorien vor dem Loggen bearbeiten. Es kostet 3,99 € pro Monat oder 39,99 € pro Jahr, jeweils mit 3 Tagen kostenloser Testphase.",
        },
        {
          question: "Was ist der Unterschied zwischen Intake AI und eigenem API-Schlüssel (BYOK)?",
          answer:
            "Intake AI bietet den umfangreicheren Food-Logging-Ablauf: einzelne Zutaten prüfen, direkte Korrekturen, Portionssteuerung, manuelle Kalorienanpassung, Produkterstellung per Nährwertlabel und kontinuierliche Verbesserungen. Eigener API-Schlüssel (BYOK) ist der grundlegende KI-Food-Logging-Chat mit deinem Anbieter-Schlüssel.",
        },
        {
          question: "Welche Funktionen gibt es nur mit Intake AI?",
          answer:
            "Nur Intake AI kann erkannte Zutaten einzeln loggen, Zutaten und Mengen direkt bearbeiten, größere oder kleinere Portionen wählen, Zutaten entfernen oder ergänzen, Kalorien vor dem Loggen manuell anpassen und Nährwertlabels nutzen, um das Formular zum Erstellen eines Produkts vorauszufüllen.",
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
            "Ja. Du kannst in den Einstellungen deinen eigenen OpenAI-, Claude- oder Gemini-API-Schlüssel hinterlegen und grundlegendes KI-Food-Logging nutzen, ohne für das Intake-AI-Abo zu zahlen. Die Bedingungen und eventuelle Nutzungskosten deines gewählten Anbieters gelten trotzdem.",
        },
        {
          question: "Brauche ich ein Intake-AI-Abo, wenn ich meinen eigenen API-Schlüssel (BYOK) nutze?",
          answer:
            "Nein. Logging mit eigenem API-Schlüssel (BYOK) braucht kein Intake-AI-Abo. Es bleibt aber auf den grundlegenden KI-Chat beschränkt und enthält nicht die exklusiven Intake-AI-Bedienelemente.",
        },
        {
          question: "Welche Anbieter kann ich mit eigenem API-Schlüssel (BYOK) nutzen?",
          answer:
            "Intake unterstützt Logging mit eigenem API-Schlüssel (BYOK) über OpenAI, Anthropic Claude und Google Gemini.",
        },
        {
          question: "Wie bekomme ich einen OpenAI-, Anthropic- oder Gemini-API-Schlüssel?",
          answer:
            "Erstelle oder öffne dein Konto im OpenAI-Dashboard, in der Anthropic Console oder in Google AI Studio, erstelle dort einen API-Schlüssel und füge ihn in den KI-Einstellungen von Intake ein. Behandle den Schlüssel vertraulich und lösche ihn, wenn du ihn nicht mehr nutzen möchtest.",
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
            "Nein. Du brauchst kein Konto. Deine Daten bleiben auf deinem Gerät und können über iCloud oder Google Drive synchronisiert werden.",
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
            "Ja. Alle deine Daten bleiben standardmäßig auf deinem Gerät. iCloud- und Google-Drive-Backups sind optional. Intake ist auf Privatsphäre ausgelegt, ohne Account-Tracking und ohne Verkauf persönlicher Daten.",
        },
      ],
    },
    {
      title: "Tracking-Funktionen",
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
        {
          question: "Kann ich in Intake eigene Ziele festlegen?",
          answer:
            "Ja. In Intake kannst du angeben, ob du abnehmen, zunehmen oder dein Gewicht halten möchtest. Dazu kannst du Intake dein Kalorienziel und deine Makronährwerte berechnen lassen oder eigene Werte angeben.",
        },
        {
          question: "Kann ich Intake personalisieren?",
          answer:
            "Ja. Du kannst am Ende der Heute-Seite deine Heute-Seite bearbeiten, Kacheln und Mahlzeiten ein- oder ausblenden und eigene Mahlzeiten anlegen.",
        },
      ],
    },
    {
      title: "Sync & Integrationen",
      items: [
        {
          question: "Unterstützt Intake Apple Health (iOS) oder Health Connect (Android)?",
          answer:
            "Ja. Intake unterstützt Apple Health auf iOS und Health Connect auf Android, damit deine Ernährungsdaten in dein Gesundheits-Ökosystem passen.",
        },
        {
          question: "Welche Daten liest Intake aus Apple Health / Health Connect?",
          answer:
            "Intake liest deine Aktivitätsdaten, also Workouts, Schritte, Strecke und verbrannte Kalorien, und außerdem dein Gewicht, falls du eine smarte Waage verwendest.",
        },
        {
          question: "Kann ich historische Gewichtsdaten importieren?",
          answer:
            "Ja. Du kannst deine historischen Gewichtsdaten aus Apple Health importieren, damit du auch deine vollständige Statistik in Intake ansehen kannst.",
        },
        {
          question: "Werden Aktivitätskalorien zu meinem Tagesziel addiert?",
          answer:
            "Ja. Aber nur, wenn du das möchtest. Du kannst das jederzeit in den Einstellungen ändern.",
        },
        {
          question: "Welche Daten schreibt Intake in Apple Health / Health Connect?",
          answer:
            "Intake schreibt alle Nährwerte und Kalorien deiner Mahlzeiten, damit du diese Informationen auch in anderen Apps verwenden kannst. Außerdem schreibt Intake auch das Wasser, das du in Intake einträgst oder durch markierte Lebensmittel zu dir nimmst.",
        },
      ],
    },
  ],
};

export const FAQ_BY_LANGUAGE: Record<Language, FaqItem[]> = {
  en: FAQ_SECTIONS_BY_LANGUAGE.en.flatMap((section) => section.items),
  de: FAQ_SECTIONS_BY_LANGUAGE.de.flatMap((section) => section.items),
};
