import { Language } from "@/i18n/translations";

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_BY_LANGUAGE: Record<Language, FaqItem[]> = {
  en: [
    {
      question: "Is Intake a subscription-based app?",
      answer: "No. Intake is a one-time purchase with no recurring subscription fees.",
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
        "Intake combines food data from USDA, the German Bundeslebensmittelschlüssel (BLS), and Open Food Facts (which provides most entries). By combining these sources, search results are broader and more accurate.",
    },
    {
      question: "Does Intake integrate with Apple Health (iOS) or Health Connect (Android)?",
      answer: "Yes. Intake supports Apple Health on iOS and Health Connect on Android so your nutrition data can sync with your health ecosystem.",
    },
    {
      question: "Is Intake privacy-first?",
      answer: "Yes. Intake is designed to work without account tracking and without selling your personal data.",
    },
  ],
  de: [
    {
      question: "Ist Intake ein Abo-Modell?",
      answer: "Nein. Intake ist ein Einmalkauf ohne laufende Abo-Gebühren.",
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
        "Intake kombiniert Lebensmitteldaten aus USDA, dem Bundeslebensmittelschlüssel (BLS) und Open Food Facts (daher kommt der Großteil der Einträge). Durch die Kombination dieser Quellen sind Suchergebnisse breiter und genauer.",
    },
    {
      question: "Unterstützt Intake Apple Health (iOS) oder Health Connect (Android)?",
      answer: "Ja. Intake unterstützt Apple Health auf iOS und Health Connect auf Android, damit deine Ernährungsdaten in dein Gesundheits-Ökosystem passen.",
    },
    {
      question: "Ist Intake datenschutzfreundlich?",
      answer: "Ja. Intake ist auf Privatsphäre ausgelegt, ohne Account-Tracking und ohne Verkauf persönlicher Daten.",
    },
  ],
};
