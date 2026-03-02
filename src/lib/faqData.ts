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
      question: "Does Intake integrate with Apple Health (iOS) or HealthConnect (Android)?",
      answer: "Yes. Intake supports Apple Health and HealthConnect integration so nutrition data can sync with your health ecosystem.",
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
      question: "Unterstützt Intake Apple Health (iOS) oder HealthConnect (Android)?",
      answer: "Ja. Intake unterstützt Apple Health und HealthConnect, damit deine Ernährungsdaten in dein Gesundheits-Ökosystem passen.",
    },
    {
      question: "Ist Intake datenschutzfreundlich?",
      answer: "Ja. Intake ist auf Privatsphäre ausgelegt, ohne Account-Tracking und ohne Verkauf persönlicher Daten.",
    },
  ],
};
