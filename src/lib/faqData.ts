import { Language } from "@/i18n/translations";

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_BY_LANGUAGE: Record<Language, FaqItem[]> = {
  en: [
    {
      question: "Is Intake a subscription-based app?",
      answer: "No. Intake is a one-time purchase with no recurring subscription fees. And it will stay that way. Promise.",
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
      question: "Can Intake recognize foods with AI?",
      answer: "Not yet. This feature has intentionally not been implemented yet for privacy and cost reasons. However, it will come once models such as the Apple Foundation Models are strong enough to do this on-device without using third-party servers.",
    },
    {
      question: "Is Intake privacy-first?",
      answer: "Yes. All of your Data stays on your device. iCloud and Google Drive Backups are encrypted end-to-end. Intake is designed to work without account tracking and without selling your personal data.",
    },
  ],
  de: [
    {
      question: "Ist Intake ein Abo-Modell?",
      answer: "Nein. Intake ist ein Einmalkauf ohne laufende Abo-Gebühren. Das wird auch so bleiben. Versprochen.",
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
      question: "Kann Intake per KI Lebensmittel erkennen?",
      answer: "Nein aktuell noch nicht. Dieses Feature wurde bewusst aus datenschutz- und kostengründen noch nicht umgesetzt. Allerdings wird das Feature kommen, sobald z.B. die Apple Foundation Modelle stark genug sind, um soetwas auf dem Gerät (ohne Server von Drittanbietern) zu machen.",
    },
    {
      question: "Ist Intake datenschutzfreundlich?",
      answer: "Ja. Alle deine Daten bleiben auf deinem Gerät. iCloud und Google Drive Backups sind Ende-zu-Ende verschlüsselt. Intake ist auf Privatsphäre ausgelegt, ohne Account-Tracking und ohne Verkauf persönlicher Daten.",
    },
  ],
};
