import { Language } from "@/i18n/translations";

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_BY_LANGUAGE: Record<Language, FaqItem[]> = {
  en: [
    {
      question: "Is Intake a subscription-based app?",
      answer: "No. The core Intake app is a one-time purchase with no recurring subscription fees. Intake AI is a separate optional add-on if you want hosted AI food logging.",
    },
    {
      question: "Is there a trial period?",
      answer: "No. A trial period would move things in the direction of in-app purchases and paywalls, and I do not want that in Intake. I do not want to lock people out or gate features after a certain amount of time. If you do not like the app, you can return it in both stores within the available return period.",
    },
    {
      question: "Do I need an account to use Intake?",
      answer: "No account is required. Your data stays on your device and can sync via your iCloud account or Google Drive.",
    },
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
      question: "Does Intake integrate with Apple Health (iOS) or Health Connect (Android)?",
      answer: "Yes. Intake supports Apple Health on iOS and Health Connect on Android so your nutrition data can sync with your health ecosystem.",
    },
    {
      question: "What data does Intake read from Apple Health / Health Connect?",
      answer: "Intake reads your activity data, including workouts, steps, distance, and calories burned, and also your weight if you use a smart scale.",
    },
    {
      question: "Can I import historical weight data?",
      answer: "Yes. You can import your historical weight data from Apple Health so you can also view your full statistics inside Intake.",
    },
    {
      question: "Are activity calories added to my daily target?",
      answer: "Yes. But only if you want them to be. You can change that at any time in the settings.",
    },
    {
      question: "What data does Intake write to Apple Health / Health Connect?",
      answer: "Intake writes all nutrition values and calories from your meals so you can also use that information in other apps. Intake also writes the water you log in Intake or consume through marked foods.",
    },
    {
      question: "Can I set my own goals in Intake?",
      answer: "Yes. In Intake, you can choose whether you want to lose weight, gain weight, or maintain your weight. You can let Intake calculate your calorie target and macros, or enter your own values.",
    },
    {
      question: "Can I personalize Intake?",
      answer: "Yes. At the bottom of the Today page, you can edit your Today page, show or hide tiles and meals, and create your own meals.",
    },
    {
      question: "Is Intake AI mandatory?",
      answer: "No. Intake AI is an optional add-on. You can keep using Intake with search, barcode scanning, custom foods, recipes, and all core tracking without enabling AI.",
    },
    {
      question: "What does the hosted Intake AI subscription include?",
      answer: "Hosted Intake AI lets you describe meals with text, analyze meal photos, scan nutrition labels, correct results in chat, and review editable calorie and macro estimates before logging. It costs 3.99 € per month or 39.99 € per year, each with a 3-day free trial.",
    },
    {
      question: "Can I use Intake AI with my own API key?",
      answer: "Yes. You can add your own OpenAI or Claude API key in Settings and use Intake AI without paying for the hosted Intake AI subscription. Your chosen provider's terms and usage costs still apply.",
    },
    {
      question: "How do I get an OpenAI or Anthropic API key?",
      answer: "Create or sign in to an account in the OpenAI dashboard or the Anthropic Console, create an API key there, then paste it into Intake's Intake AI settings. Keep the key private and delete it if you no longer want to use it.",
    },
    {
      question: "Are Intake AI nutrition values exact?",
      answer: "No. AI results are estimates and can be wrong, especially with unclear portions or hidden ingredients. Intake AI shows editable suggestions so you can review values before saving them.",
    },
    {
      question: "What data is sent when I use hosted Intake AI?",
      answer: "Hosted Intake AI sends food descriptions, photos, captions, and recent chat context through Intake's backend and AI providers to generate nutrition estimates. Intake does not sell your data or use it for advertising.",
    },
    {
      question: "Is Intake privacy-first?",
      answer: "Yes. All of your Data stays on your device. iCloud and Google Drive Backups are encrypted end-to-end. Intake is designed to work without account tracking and without selling your personal data.",
    },
  ],
  de: [
    {
      question: "Ist Intake ein Abo-Modell?",
      answer: "Nein. Die Core-App von Intake ist ein Einmalkauf ohne laufende Abo-Gebühren. Intake AI ist ein separates optionales Add-on, wenn du gehostetes KI-Food-Logging nutzen möchtest.",
    },
    {
      question: "Gibt es eine Testphase?",
      answer: "Nein. Eine Testphase würde in die Richtung In-App Käufe und Paywalls gehen und das möchte ich in Intake nicht haben. Ich möchte niemanden nach einem bestimmten Zeitraum aussperren oder Features sperren müssen. Wenn dir die App nicht gefällt, kannst du sie in beiden Stores innerhalb eines Zeitraums kostenfrei zurück geben.",
    },
    {
      question: "Brauche ich ein Konto für Intake?",
      answer: "Nein. Du brauchst kein Konto. Deine Daten bleiben auf deinem Gerät und können über iCloud oder Google Drive synchronisiert werden.",
    },
    {
      question: "Wie viele Lebensmittel sind enthalten?",
      answer: "Intake bietet Zugriff auf eine Lebensmitteldatenbank mit über 3 Millionen Einträgen.",
    },
    {
      question: "Woher stammen die Lebensmitteldaten?",
      answer:
        "Intake kombiniert Lebensmitteldaten aus USDA, dem Bundeslebensmittelschlüssel (BLS) und Open Food Facts (daher kommt der Großteil der Einträge). Durch die Kombination dieser Quellen sind Suchergebnisse breiter und genauer. Die Daten werden täglich aktualisiert, um euch immer die aktuellsten Daten zu bieten.",
    },
    {
      question: "Unterstützt Intake Apple Health (iOS) oder Health Connect (Android)?",
      answer: "Ja. Intake unterstützt Apple Health auf iOS und Health Connect auf Android, damit deine Ernährungsdaten in dein Gesundheits-Ökosystem passen.",
    },
    {
      question: "Welche Daten liest Intake aus Apple Health/Health Connect",
      answer: "Intake liest deine Aktivitätsdaten (Workouts, Schritte, Strecke und verbrannte Kalorien) und außerdem dein Gewicht (falls du eine smarte Waage verwendest)",
    },
    {
      question: "Kann ich historische Gewichtsdaten importieren?",
      answer: "Ja du kannst deine historischen Gewichtsdaten aus Apple Health importieren, damit du auch deine vollständige Statistik in Intake ansehen kannst.",
    },
    {
      question: "Werden Aktivitätskalorien zu meinem Tagesziel addiert?",
      answer: "Ja. Aber nur wenn du das möchtest. Du kannst das jederzeit in den Einstellungen ändern.",
    },
    {
      question: "Welche Daten schreibt Intake in Apple Health/Health Connect",
      answer: "Intake schreibt alle Nährwerte und Kalorien deiner Mahlzeiten, damit du diese Informationen auch in anderen Apps verwenden kannst. Außerdem schreibt Intake auch das Wasser was du in Intake einträgst oder durch markierte Lebensmittel zu dir nimmst.",
    },
    {
      question: "Kann ich in Intake eigene Ziele festlegen?",
      answer: "Ja. In Intake kannst du angeben, ob du abnehmen, zunehmen oder dein Gewicht halten möchtest. Dazu kannst du Intake dein Kalorienziel und deine Makronährwerte berechnen lassen, oder eigene Werte angeben.",
    },
    {
      question: "Kann ich Intake personalisieren?",
      answer: "Ja. Du kannst am Ende der Heute Seite deine Heute Seite bearbeiten, Kacheln und Mahlzeiten ein/ausblenden und eigene Mahlzeiten anlegen.",
    },
    {
      question: "Ist Intake AI verpflichtend?",
      answer: "Nein. Intake AI ist ein optionales Add-on. Du kannst Intake weiterhin mit Suche, Barcode-Scan, eigenen Lebensmitteln, Rezepten und allen Kernfunktionen nutzen, ohne KI zu aktivieren.",
    },
    {
      question: "Was ist im gehosteten Intake-AI-Abo enthalten?",
      answer: "Mit dem gehosteten Intake AI kannst du Mahlzeiten per Text beschreiben, Fotos analysieren, Nährwertlabels scannen, Ergebnisse im Chat korrigieren und bearbeitbare Kalorien- und Makro-Schätzungen vor dem Speichern prüfen. Es kostet 3,99 € pro Monat oder 39,99 € pro Jahr, jeweils mit 3 Tagen kostenloser Testphase.",
    },
    {
      question: "Kann ich Intake AI mit eigenem API-Schlüssel nutzen?",
      answer: "Ja. Du kannst in den Einstellungen deinen eigenen OpenAI- oder Claude-API-Schlüssel hinterlegen und Intake AI ohne gehostetes Intake-AI-Abo nutzen. Die Bedingungen und eventuelle Nutzungskosten deines gewählten Anbieters gelten trotzdem.",
    },
    {
      question: "Wie bekomme ich einen OpenAI- oder Anthropic-API-Schlüssel?",
      answer: "Erstelle oder öffne dein Konto im OpenAI-Dashboard oder in der Anthropic Console, erstelle dort einen API-Schlüssel und füge ihn in den Intake-AI-Einstellungen ein. Behandle den Schlüssel vertraulich und lösche ihn, wenn du ihn nicht mehr nutzen möchtest.",
    },
    {
      question: "Sind die Nährwerte von Intake AI exakt?",
      answer: "Nein. KI-Ergebnisse sind Schätzungen und können falsch sein, besonders bei unklaren Portionsgrößen oder versteckten Zutaten. Intake AI zeigt bearbeitbare Vorschläge, die du vor dem Speichern prüfen kannst.",
    },
    {
      question: "Welche Daten werden bei gehostetem Intake AI gesendet?",
      answer: "Gehostetes Intake AI sendet Essensbeschreibungen, Fotos, Bildunterschriften und den letzten Chat-Kontext über das Intake-Backend und KI-Anbieter, um Nährwertschätzungen zu erstellen. Intake verkauft deine Daten nicht und nutzt sie nicht für Werbung.",
    },
    {
      question: "Ist Intake datenschutzfreundlich?",
      answer: "Ja. Alle deine Daten bleiben auf deinem Gerät. iCloud und Google Drive Backups sind Ende-zu-Ende verschlüsselt. Intake ist auf Privatsphäre ausgelegt, ohne Account-Tracking und ohne Verkauf persönlicher Daten.",
    },
  ],
};
