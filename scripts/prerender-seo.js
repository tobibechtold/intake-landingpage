import { getLocalizedWhatsNewRoutes, getWhatsNewEntries, getWhatsNewEntry } from "./whats-new-content.js";

const SITE_ORIGIN = "https://www.getintake.de";
const OG_IMAGE_URL = "/og-image.png";

const STATIC_PAGE_SEO = {
  "/": {
    lang: "de",
    title: "Intake App - Kalorienzähler ohne Abo für iPhone & Android",
    description:
      "Intake ist ein Kalorienzähler ohne Abo und ohne Konto. Tracke Kalorien, Makros, 30+ Nährwerte, Fasten, Wasser, Widgets, Apple Watch und PDF-Export mit optionalem iCloud- oder Google-Drive-Sync.",
    canonical: `${SITE_ORIGIN}/`,
    ogLocale: "de_DE",
  },
  "/funktionen": {
    lang: "de",
    title: "Intake Funktionen - Kalorien, Nährwerte, Widgets, Apple Watch und mehr",
    description:
      "Entdecke die Intake Funktionen für Kalorien, Barcode-Scan, eigene Produkte und Rezepte, 30+ Nährwerte, Widgets, Apple Watch, PDF-Export, Intervallfasten, Wasser und Health-Integrationen.",
    canonical: `${SITE_ORIGIN}/funktionen`,
    ogLocale: "de_DE",
  },
  "/kalorienzaehler-ohne-abo": {
    lang: "de",
    title: "Kalorienzähler ohne Abo - Intake",
    description:
      "Intake ist ein Kalorienzähler ohne Abo und ohne Premium-Wall. Tracke Kalorien, Makros, Nährwerte, Widgets, Apple Watch, Wasser und Intervallfasten ohne monatliche Kosten.",
    canonical: `${SITE_ORIGIN}/kalorienzaehler-ohne-abo`,
    ogLocale: "de_DE",
  },
  "/kalorien-tracker-ohne-konto": {
    lang: "de",
    title: "Kalorien-Tracker ohne Konto - Intake",
    description:
      "Intake hat gar kein Kontosystem. Tracke Kalorien, Makros, Wasser und Nährwerte lokal auf deinem Gerät mit optionalem iCloud- oder Google-Drive-Sync.",
    canonical: `${SITE_ORIGIN}/kalorien-tracker-ohne-konto`,
    ogLocale: "de_DE",
  },
  "/vergleiche": {
    lang: "de",
    title: "Intake Vergleiche und Alternativen",
    description:
      "Vergleiche Intake mit Abo-Trackern und sieh dir Alternativen zu Yazio und FDDB an, mit Fokus auf Preis, Premium-Walls, Kontosysteme und Produktstil.",
    canonical: `${SITE_ORIGIN}/vergleiche`,
    ogLocale: "de_DE",
  },
  "/intake-ai": {
    lang: "de",
    title: "Intake AI - Optionales KI-Food-Logging mit Text und Fotos",
    description:
      "Intake AI ist ein optionales Add-on für schnelleres KI-Food-Logging. Beschreibe Essen, analysiere Fotos, scanne Nährwertlabels oder nutze deinen eigenen API-Schlüssel.",
    canonical: `${SITE_ORIGIN}/intake-ai`,
    ogLocale: "de_DE",
  },
  "/hilfe": {
    lang: "de",
    title: "Hilfe & FAQ | Intake",
    description:
      "Antworten zu Preis, Datenschutz, Sync, Apple Health, Health Connect, Lebensmitteldaten und den wichtigsten Intake-Funktionen.",
    canonical: `${SITE_ORIGIN}/hilfe`,
    ogLocale: "de_DE",
  },
  "/vergleiche/yazio-alternative": {
    lang: "de",
    title: "Yazio Alternative - Intake vs. Yazio",
    description:
      "Vergleiche Intake und Yazio bei Abo-Modell, Premium-Wall, Produktstil, Kontosystem und Kernfunktionen.",
    canonical: `${SITE_ORIGIN}/vergleiche/yazio-alternative`,
    ogLocale: "de_DE",
  },
  "/vergleiche/fddb-alternative": {
    lang: "de",
    title: "FDDB Alternative - Intake vs. FDDB",
    description:
      "Vergleiche Intake und FDDB bei Abo-Modell, Plattformlogik, Kontosystem, Kernfunktionen und Produktfokus.",
    canonical: `${SITE_ORIGIN}/vergleiche/fddb-alternative`,
    ogLocale: "de_DE",
  },
  "/privacy": {
    lang: "de",
    title: "Datenschutzerklärung | Intake",
    description:
      "Lies die Datenschutzerklärung von Intake und erfahre, wie Daten verarbeitet, gespeichert und mit Apple Health (iOS), Health Connect (Android), iCloud (iOS) oder Google Drive (Android) synchronisiert werden.",
    canonical: `${SITE_ORIGIN}/privacy`,
    ogLocale: "de_DE",
  },
  "/terms": {
    lang: "de",
    title: "Nutzungsbedingungen | Intake",
    description:
      "Lies die Nutzungsbedingungen von Intake mit Informationen zu App-Nutzung, iOS- und Android-Integrationen, Haftung und Support.",
    canonical: `${SITE_ORIGIN}/terms`,
    ogLocale: "de_DE",
  },
  "/en": {
    lang: "en",
    title: "Intake App - Calorie Counter for iPhone & Android | No Subscription",
    description:
      "Intake is a private calorie counter app with no subscription and no account system. Track calories, macros, 30+ nutrients, fasting, water, widgets, Apple Watch, and PDF export with optional iCloud (iOS) or Google Drive (Android) sync.",
    canonical: `${SITE_ORIGIN}/en`,
    ogLocale: "en_US",
  },
  "/en/features": {
    lang: "en",
    title: "Intake Features - Calories, Nutrients, Widgets, Apple Watch, and More",
    description:
      "Explore Intake features for calorie tracking, barcode scanning, custom foods and recipes, 30+ nutrients, widgets, Apple Watch, PDF export, intermittent fasting, water, and health integrations.",
    canonical: `${SITE_ORIGIN}/en/features`,
    ogLocale: "en_US",
  },
  "/en/calorie-counter-no-subscription": {
    lang: "en",
    title: "Calorie Counter Without Subscription | Intake",
    description:
      "Intake is a calorie counter without a subscription and without a premium wall. Track calories, macros, nutrients, widgets, Apple Watch, fasting, and water without recurring monthly fees.",
    canonical: `${SITE_ORIGIN}/en/calorie-counter-no-subscription`,
    ogLocale: "en_US",
  },
  "/en/calorie-tracker-no-account": {
    lang: "en",
    title: "Calorie Tracker Without Account | Intake",
    description:
      "Intake has no account system at all. Track calories, macros, nutrients, fasting, and water while keeping your data on your device with optional iCloud or Google Drive sync.",
    canonical: `${SITE_ORIGIN}/en/calorie-tracker-no-account`,
    ogLocale: "en_US",
  },
  "/en/comparisons": {
    lang: "en",
    title: "Intake Comparisons and Alternatives",
    description:
      "Compare Intake with subscription-led calorie trackers and see how it differs from Yazio and FDDB on pricing, feature gating, account logic, and product focus.",
    canonical: `${SITE_ORIGIN}/en/comparisons`,
    ogLocale: "en_US",
  },
  "/en/intake-ai": {
    lang: "en",
    title: "Intake AI - Optional AI Food Logging With Text and Photos",
    description:
      "Intake AI is an optional add-on for faster meal logging. Describe food, analyze photos, scan nutrition labels, or use your own OpenAI or Claude API key.",
    canonical: `${SITE_ORIGIN}/en/intake-ai`,
    ogLocale: "en_US",
  },
  "/en/help": {
    lang: "en",
    title: "Help & FAQ | Intake",
    description:
      "Answers about pricing, privacy, sync, Apple Health, Health Connect, food data, and the most important Intake features.",
    canonical: `${SITE_ORIGIN}/en/help`,
    ogLocale: "en_US",
  },
  "/en/comparisons/yazio-alternative": {
    lang: "en",
    title: "Yazio Alternative - Intake vs. Yazio",
    description:
      "Compare Intake and Yazio on subscriptions, feature gating, product style, account logic, and core tracking features.",
    canonical: `${SITE_ORIGIN}/en/comparisons/yazio-alternative`,
    ogLocale: "en_US",
  },
  "/en/comparisons/fddb-alternative": {
    lang: "en",
    title: "FDDB Alternative - Intake vs. FDDB",
    description:
      "Compare Intake and FDDB on subscriptions, platform logic, account model, built-in features, and tracking focus.",
    canonical: `${SITE_ORIGIN}/en/comparisons/fddb-alternative`,
    ogLocale: "en_US",
  },
  "/en/privacy": {
    lang: "en",
    title: "Privacy Policy | Intake",
    description:
      "Read the Intake Privacy Policy. Learn how calorie and nutrition data is processed, stored, and synced with Apple Health (iOS), Health Connect (Android), iCloud (iOS), and Google Drive (Android).",
    canonical: `${SITE_ORIGIN}/en/privacy`,
    ogLocale: "en_US",
  },
  "/en/terms": {
    lang: "en",
    title: "Terms of Use | Intake",
    description:
      "Read the Intake Terms of Use for app usage, legal notes, iOS and Android integrations, and support information.",
    canonical: `${SITE_ORIGIN}/en/terms`,
    ogLocale: "en_US",
  },
};

const WHATS_NEW_INDEX_SEO = {
  en: {
    lang: "en",
    title: "What's New | Intake",
    description:
      "Release notes, feature updates, screenshots, and product improvements for every Intake version from 2.1.1 onward.",
    canonical: `${SITE_ORIGIN}/en/whats-new`,
    ogLocale: "en_US",
  },
  de: {
    lang: "de",
    title: "Was ist neu | Intake",
    description:
      "Release Notes, neue Funktionen, Screenshots und Produktverbesserungen fur jede Intake-Version ab 2.1.1.",
    canonical: `${SITE_ORIGIN}/whats-new`,
    ogLocale: "de_DE",
  },
};

const STATIC_BODY_CONTENT = {
  "/": {
    title: "Intake App - Kalorienzähler ohne Abo für iPhone & Android",
    description:
      "Intake ist ein privater Kalorienzähler ohne Abo und ohne Konto. Tracke Kalorien, Makros, 30+ Nährwerte, Fasten, Wasser, Widgets, Apple Watch und Health-Integrationen.",
    sections: [
      {
        title: "Ohne Abo und ohne Konto",
        body:
          "Intake ist als ruhiger Einmalkauf-Tracker gedacht. Es gibt kein Intake-Konto und keine monatliche Premium-Wall für die normale Nutzung.",
        bullets: ["Einmalkauf", "Kein Konto", "Lokale Daten"],
      },
      {
        title: "Für tägliches Ernährungstracking",
        body:
          "Die App kombiniert Suche, Barcode-Scan, eigene Produkte, Rezepte, Ziele, Statistiken, PDF-Export, Wasser und Intervallfasten.",
        bullets: ["Barcode-Scan", "30+ Nährwerte", "PDF-Export"],
      },
    ],
    links: [
      { label: "Kalorienzähler ohne Abo", href: "/kalorienzaehler-ohne-abo" },
      { label: "Funktionen", href: "/funktionen" },
      { label: "Hilfe", href: "/hilfe" },
    ],
  },
  "/en": {
    title: "Intake App - Calorie Counter for iPhone & Android",
    description:
      "Intake is a private calorie counter app with no subscription and no account system. Track calories, macros, 30+ nutrients, fasting, water, widgets, Apple Watch, and health integrations.",
    sections: [
      {
        title: "No subscription and no account",
        body:
          "Intake is built as a calm one-time-purchase tracker. There is no Intake account and no monthly premium wall for normal use.",
        bullets: ["One-time purchase", "No account", "Local-first data"],
      },
      {
        title: "Built for daily nutrition tracking",
        body:
          "The app combines search, barcode scanning, custom foods, recipes, goals, statistics, PDF export, water, and intermittent fasting.",
        bullets: ["Barcode scanner", "30+ nutrients", "PDF export"],
      },
    ],
    links: [
      { label: "Calorie counter without subscription", href: "/en/calorie-counter-no-subscription" },
      { label: "Features", href: "/en/features" },
      { label: "Help", href: "/en/help" },
    ],
  },
  "/funktionen": {
    title: "Die Intake Funktionen, die im Alltag wirklich wichtig sind",
    description:
      "Intake kombiniert Kalorien, Makros, große Lebensmitteldatenbank, Barcode-Scan, eigene Produkte und Rezepte, 30+ Nährwerte, Wasser, Fasten, Widgets, Apple Watch, PDF-Export und Health-Integrationen.",
    sections: [
      {
        title: "Kalorien tracken mit großer Lebensmitteldatenbank",
        body:
          "Suche, Vorschläge, Barcode-Scan und eigene Einträge helfen beim schnellen Loggen von Mahlzeiten und Produkten.",
        bullets: ["Große Lebensmitteldatenbank", "Barcode-Scanner", "Eigene Produkte"],
      },
      {
        title: "30+ Nährwerte, Ziele und Statistiken",
        body:
          "Neben Kalorien und Makros zeigt Intake Vitamine, Mineralstoffe, Koffein, Wasser, Fasten und detaillierte Auswertungen.",
        bullets: ["30+ Nährwerte", "Eigene Ziele", "PDF-Export"],
      },
      {
        title: "Widgets, Apple Watch und Health",
        body:
          "Intake unterstützt Homescreen- und Lockscreen-Widgets, Apple Watch, Apple Health auf iOS und Health Connect auf Android.",
        bullets: ["Widgets", "Apple Watch", "Apple Health und Health Connect"],
      },
    ],
    links: [
      { label: "Kalorienzähler ohne Abo", href: "/kalorienzaehler-ohne-abo" },
      { label: "Kalorien-Tracker ohne Konto", href: "/kalorien-tracker-ohne-konto" },
    ],
  },
  "/en/features": {
    title: "The Intake features that matter in daily use",
    description:
      "Intake covers calories, macros, a large food database, barcode scanning, custom foods and recipes, 30+ nutrients, water, fasting, widgets, Apple Watch, PDF export, and health integrations.",
    sections: [
      {
        title: "Calorie tracking with a large food database",
        body:
          "Search, suggestions, barcode scanning, and custom entries make daily meal and product logging faster.",
        bullets: ["Large food database", "Barcode scanner", "Custom foods"],
      },
      {
        title: "30+ nutrients, goals, and statistics",
        body:
          "Beyond calories and macros, Intake tracks vitamins, minerals, caffeine, water, fasting, and detailed progress reports.",
        bullets: ["30+ nutrients", "Custom goals", "PDF export"],
      },
      {
        title: "Widgets, Apple Watch, and health sync",
        body:
          "Intake supports Home Screen and Lock Screen widgets, Apple Watch, Apple Health on iOS, and Health Connect on Android.",
        bullets: ["Widgets", "Apple Watch", "Apple Health and Health Connect"],
      },
    ],
    links: [
      { label: "No subscription", href: "/en/calorie-counter-no-subscription" },
      { label: "No account", href: "/en/calorie-tracker-no-account" },
    ],
  },
  "/kalorienzaehler-ohne-abo": {
    title: "Kalorienzähler ohne Abo und ohne Premium-Wall",
    description:
      "Intake ist ein Kalorienzähler ohne Abo, ohne Konto und ohne Monatsgebühr für die normale Nutzung. Die App passt für Menschen, die Kalorien, Makros, Nährwerte, Wasser und Fasten tracken wollen, ohne ständig in ein Premium-Modell geschoben zu werden.",
    sections: [
      {
        title: "Einmalkauf statt dauerhaftem Upsell",
        body:
          "Intake ist nicht um ein Abo herum gebaut. Du zahlst einmal und kannst die wichtigen Tracking-Funktionen weiter nutzen, ohne monatliche Gebühren für den Kern der App.",
        bullets: ["Einmalkauf", "Keine monatliche Gebühr", "Keine Premium-Wall im Alltag"],
      },
      {
        title: "Wichtige Funktionen sind direkt enthalten",
        body:
          "Kalorien, Makros, 30+ Nährwerte, Rezepte, Wasser, Intervallfasten, Widgets, Apple Watch, eigene Ziele und PDF-Export gehören zur App selbst.",
        bullets: ["30+ Nährwerte", "Rezepte und PDF-Export", "Widgets und Apple Watch"],
      },
      {
        title: "Für ruhiges Tracking ohne Konto",
        body:
          "Intake hat kein eigenes Kontosystem. Deine Daten bleiben lokal auf deinem Gerät und syncen nur optional über iCloud auf iOS oder Google Drive auf Android.",
        bullets: ["Kein Konto", "Lokale Daten", "Optionaler Sync"],
      },
    ],
    links: [
      { label: "Alle Funktionen", href: "/funktionen" },
      { label: "Kalorien-Tracker ohne Konto", href: "/kalorien-tracker-ohne-konto" },
      { label: "Vergleiche und Alternativen", href: "/vergleiche" },
    ],
  },
  "/en/calorie-counter-no-subscription": {
    title: "A calorie counter without a subscription and without a premium wall",
    description:
      "Intake is a calorie counter with no subscription, no account system, and no recurring fee for normal use. It is built for people who want to track calories, macros, nutrients, water, and fasting without being pushed into a monthly plan.",
    sections: [
      {
        title: "One-time purchase instead of constant upsells",
        body:
          "Intake is not built around subscription conversion. You pay once and keep using the important tracking features without a monthly fee for the core app.",
        bullets: ["One-time purchase", "No monthly fee for core use", "No daily premium wall"],
      },
      {
        title: "Important features are included",
        body:
          "Calories, macros, 30+ nutrients, recipes, water, intermittent fasting, widgets, Apple Watch, custom goals, and PDF export are part of the app itself.",
        bullets: ["30+ nutrients", "Recipes and PDF export", "Widgets and Apple Watch"],
      },
      {
        title: "Calm tracking without an account",
        body:
          "Intake has no account system. Your data stays local on your device and syncs only if you choose iCloud on iOS or Google Drive on Android.",
        bullets: ["No account", "Local-first data", "Optional sync"],
      },
    ],
    links: [
      { label: "Features", href: "/en/features" },
      { label: "No account", href: "/en/calorie-tracker-no-account" },
      { label: "Comparisons", href: "/en/comparisons" },
    ],
  },
  "/kalorien-tracker-ohne-konto": {
    title: "Kein Konto. Keine Registrierung. Optionaler Sync nur wenn du willst.",
    description:
      "Intake hat kein eigenes Kontosystem. Du kannst Kalorien, Makros, Nährwerte, Wasser und Fasten lokal tracken und optional über iCloud oder Google Drive synchronisieren.",
    sections: [
      {
        title: "Es gibt schlicht kein Konto",
        body:
          "Es gibt keinen Intake-Login, keine Registrierung, kein Passwort und keine E-Mail-Verifizierung.",
        bullets: ["Kein Login", "Keine Registrierung", "Kein Passwort"],
      },
      {
        title: "Lokale Daten mit optionalem Sync",
        body:
          "Deine Daten bleiben auf dem Gerät. Sync über iCloud auf iOS oder Google Drive auf Android ist optional.",
        bullets: ["Lokale Daten", "iCloud Sync", "Google Drive Sync"],
      },
    ],
    links: [
      { label: "Kalorienzähler ohne Abo", href: "/kalorienzaehler-ohne-abo" },
      { label: "Funktionen", href: "/funktionen" },
    ],
  },
  "/en/calorie-tracker-no-account": {
    title: "No account. No signup. Optional sync only if you want it.",
    description:
      "Intake has no account system. You can track calories, macros, nutrients, water, and fasting locally, with optional iCloud or Google Drive sync.",
    sections: [
      {
        title: "There is simply no account",
        body:
          "There is no Intake login, no signup, no password, and no email verification.",
        bullets: ["No login", "No signup", "No password"],
      },
      {
        title: "Local data with optional sync",
        body:
          "Your data stays on device. Sync through iCloud on iOS or Google Drive on Android is optional.",
        bullets: ["Local-first data", "iCloud sync", "Google Drive sync"],
      },
    ],
    links: [
      { label: "No subscription", href: "/en/calorie-counter-no-subscription" },
      { label: "Features", href: "/en/features" },
    ],
  },
  "/vergleiche": {
    title: "Wie sich Intake von Yazio, FDDB und typischen Abo-Trackern unterscheidet",
    description:
      "Vergleiche Intake mit Abo-Trackern bei Preis, Premium-Wall, Kontosystem, Produktstil und enthaltenen Kernfunktionen.",
    sections: [
      {
        title: "Worauf es bei Vergleichen ankommt",
        body:
          "Entscheidend ist, ob Nährwerte, Widgets, Fasten, Rezepte, Export und bessere Auswertungen direkt dabei sind oder ein Premium-Abo brauchen.",
        bullets: ["Abo oder Einmalkauf", "Konto oder lokal", "Kernfunktionen direkt enthalten"],
      },
      {
        title: "Wofür Intake nicht gedacht ist",
        body:
          "Intake ist kein Coaching- oder Gamification-Produkt. Die App konzentriert sich auf Tracken, Auswerten und Kontrolle.",
        bullets: ["Keine Streaks", "Keine Badges", "Keine ungefragten Tipps"],
      },
    ],
    links: [
      { label: "Yazio Alternative", href: "/vergleiche/yazio-alternative" },
      { label: "FDDB Alternative", href: "/vergleiche/fddb-alternative" },
    ],
  },
  "/en/comparisons": {
    title: "How Intake differs from Yazio, FDDB, and typical subscription trackers",
    description:
      "Compare Intake with subscription-led calorie trackers on pricing, premium walls, account logic, product style, and included core features.",
    sections: [
      {
        title: "What matters in comparisons",
        body:
          "The practical question is whether nutrients, widgets, fasting, recipes, export, and better reports are included or require a premium subscription.",
        bullets: ["Subscription or one-time purchase", "Account or local-first", "Core features included"],
      },
      {
        title: "What Intake is not trying to be",
        body:
          "Intake is not a coaching or gamification product. It focuses on tracking, analysis, and control.",
        bullets: ["No streaks", "No badges", "No unwanted tips"],
      },
    ],
    links: [
      { label: "Yazio Alternative", href: "/en/comparisons/yazio-alternative" },
      { label: "FDDB Alternative", href: "/en/comparisons/fddb-alternative" },
    ],
  },
  "/vergleiche/yazio-alternative": {
    title: "Yazio Alternative: Intake vs. Yazio",
    description:
      "Yazio setzt stark auf Pro, Pläne und Coaching. Intake passt besser, wenn du einfach tracken willst, ohne jeden Monat für Kernfunktionen zu zahlen.",
    sections: [
      {
        title: "Abo oder nicht",
        body:
          "Intake: Einmalkauf ohne Monatsabo für normale Nutzung. Yazio: klar auf Pro-Abos, Coaching und zusätzliche Motivationsebenen ausgerichtet.",
        bullets: ["Intake: Einmalkauf", "Yazio: Pro-orientiert", "Kernfunktionen direkt in Intake"],
      },
      {
        title: "Produktstil",
        body:
          "Intake: ruhiger Tracker ohne Streaks, Badges und ungefragte Tipps. Yazio: stärker als Coaching- und Gewohnheitsprodukt positioniert.",
        bullets: ["Ruhiges Tracking", "Keine Gamification", "Keine Coaching-Pflicht"],
      },
    ],
    links: [{ label: "Alle Vergleiche", href: "/vergleiche" }],
  },
  "/en/comparisons/yazio-alternative": {
    title: "Yazio Alternative: Intake vs. Yazio",
    description:
      "Yazio leans heavily into Pro subscriptions, coaching, and motivation layers. Intake is the calmer alternative for people who want to track without paying monthly for core features.",
    sections: [
      {
        title: "Business model",
        body:
          "Intake: one-time purchase without a monthly plan for normal use. Yazio: clearly oriented around Pro subscriptions, coaching, and extra motivation layers.",
        bullets: ["Intake: one-time purchase", "Yazio: Pro-oriented", "Core features included in Intake"],
      },
      {
        title: "Product style",
        body:
          "Intake: calm tracker without streaks, badges, or unwanted tips. Yazio: positioned more as a coaching and habit product.",
        bullets: ["Calm tracking", "No gamification", "No required coaching"],
      },
    ],
    links: [{ label: "All comparisons", href: "/en/comparisons" }],
  },
  "/vergleiche/fddb-alternative": {
    title: "FDDB Alternative: Intake vs. FDDB",
    description:
      "FDDB ist stärker als Portal mit Web-Sync und Premium aufgebaut. Intake passt besser, wenn du lokal und ohne laufende Premium-Stufe tracken willst.",
    sections: [
      {
        title: "Abo und Plattformlogik",
        body:
          "Intake: Einmalkauf, kein Konto, keine Portalpflicht. FDDB: App-plus-Website-Modell mit Premium-Mitgliedschaft und Plattform-Sync.",
        bullets: ["Intake: lokal", "FDDB: Portal", "Premium vs. Einmalkauf"],
      },
      {
        title: "Enthaltene Funktionen",
        body:
          "Intake bündelt Nährwerte, Widgets, Fasten, Wasser, Rezepte, PDF-Export, Ziele, Apple Watch und Personalisierung direkt in der App.",
        bullets: ["30+ Nährwerte", "Widgets und Apple Watch", "PDF-Export"],
      },
    ],
    links: [{ label: "Alle Vergleiche", href: "/vergleiche" }],
  },
  "/en/comparisons/fddb-alternative": {
    title: "FDDB Alternative: Intake vs. FDDB",
    description:
      "FDDB is closer to a platform with web sync and premium subscriptions. Intake fits better if you want local tracking without a recurring premium tier.",
    sections: [
      {
        title: "Business model and platform logic",
        body:
          "Intake: one-time purchase, no account, no portal requirement. FDDB: app-plus-website model with premium membership and platform sync.",
        bullets: ["Intake: local-first", "FDDB: portal", "Premium vs. one-time purchase"],
      },
      {
        title: "Included features",
        body:
          "Intake includes nutrients, widgets, fasting, water, recipes, PDF export, goals, Apple Watch, and personalization directly in the app.",
        bullets: ["30+ nutrients", "Widgets and Apple Watch", "PDF export"],
      },
    ],
    links: [{ label: "All comparisons", href: "/en/comparisons" }],
  },
  "/intake-ai": {
    title: "Intake AI - Optionales KI-Food-Logging mit Text und Fotos",
    description:
      "Intake AI ist ein optionales Add-on für schnelleres Food-Logging per Text, Foto oder Nährwertlabel. Die Core-App bleibt ein Einmalkauf und funktioniert ohne KI.",
    sections: [
      {
        title: "Schneller loggen, wenn du Hilfe willst",
        body:
          "Beschreibe Mahlzeiten, analysiere Fotos, scanne Labels und prüfe bearbeitbare Kalorien- und Makro-Vorschläge vor dem Speichern.",
        bullets: ["Text", "Fotos", "Nährwertlabels"],
      },
      {
        title: "Gehostet oder eigener API-Schlüssel",
        body:
          "Nutze gehostetes Intake AI oder hinterlege deinen eigenen OpenAI- oder Claude-API-Schlüssel.",
        bullets: ["Optionales Add-on", "Bring your own key", "Schätzungen vor dem Speichern prüfen"],
      },
    ],
    links: [{ label: "FAQ", href: "/hilfe" }],
  },
  "/en/intake-ai": {
    title: "Intake AI - Optional AI food logging with text and photos",
    description:
      "Intake AI is an optional add-on for faster food logging with text, photos, or nutrition labels. The core app remains a one-time purchase and works without AI.",
    sections: [
      {
        title: "Faster logging when you want help",
        body:
          "Describe meals, analyze photos, scan labels, and review editable calorie and macro suggestions before saving.",
        bullets: ["Text", "Photos", "Nutrition labels"],
      },
      {
        title: "Hosted or bring your own API key",
        body:
          "Use hosted Intake AI or add your own OpenAI or Claude API key.",
        bullets: ["Optional add-on", "Bring your own key", "Review estimates before logging"],
      },
    ],
    links: [{ label: "FAQ", href: "/en/help" }],
  },
  "/hilfe": {
    title: "Hilfe & FAQ",
    description:
      "Antworten zu Intake Preis, Datenschutz, Sync, Apple Health, Health Connect, Lebensmitteldaten, Intake AI und Kernfunktionen.",
    sections: [
      {
        title: "Ist Intake ein Abo-Modell?",
        body:
          "Nein. Die Core-App von Intake ist ein Einmalkauf ohne laufende Abo-Gebühren. Intake AI ist ein separates optionales Add-on.",
        bullets: ["Einmalkauf", "Kein Abo für die Core-App", "Optionales Intake AI"],
      },
      {
        title: "Brauche ich ein Konto für Intake?",
        body:
          "Nein. Du brauchst kein Konto. Deine Daten bleiben auf deinem Gerät und können optional über iCloud oder Google Drive synchronisiert werden.",
        bullets: ["Kein Konto", "Lokale Daten", "Optionaler Sync"],
      },
    ],
    links: [{ label: "Datenschutzerklärung", href: "/privacy" }],
  },
  "/en/help": {
    title: "Help & FAQ",
    description:
      "Answers about Intake pricing, privacy, sync, Apple Health, Health Connect, food data, Intake AI, and core features.",
    sections: [
      {
        title: "Is Intake a subscription-based app?",
        body:
          "No. The core Intake app is a one-time purchase with no recurring subscription fees. Intake AI is a separate optional add-on.",
        bullets: ["One-time purchase", "No subscription for the core app", "Optional Intake AI"],
      },
      {
        title: "Do I need an account to use Intake?",
        body:
          "No account is required. Your data stays on your device and can optionally sync via iCloud or Google Drive.",
        bullets: ["No account", "Local-first data", "Optional sync"],
      },
    ],
    links: [{ label: "Privacy policy", href: "/en/privacy" }],
  },
  "/privacy": {
    title: "Datenschutzerklärung",
    description:
      "Informationen dazu, wie Intake Daten lokal speichert, optional synchronisiert und mit Apple Health, Health Connect und Intake AI verarbeitet.",
    sections: [
      {
        title: "Lokale Daten und optionaler Sync",
        body:
          "Intake funktioniert ohne Intake-Konto. Deine Tracking-Daten bleiben auf deinem Gerät und syncen nur optional über iCloud oder Google Drive.",
        bullets: ["Kein Konto", "iCloud", "Google Drive"],
      },
      {
        title: "Health und Intake AI",
        body:
          "Apple Health, Health Connect und Intake AI sind optional und werden nur für die jeweils aktivierten Funktionen genutzt.",
        bullets: ["Apple Health", "Health Connect", "Optionales Intake AI"],
      },
    ],
    links: [{ label: "Hilfe", href: "/hilfe" }],
  },
  "/en/privacy": {
    title: "Privacy Policy",
    description:
      "Information about how Intake stores data locally, optionally syncs data, and processes data with Apple Health, Health Connect, and Intake AI.",
    sections: [
      {
        title: "Local data and optional sync",
        body:
          "Intake works without an Intake account. Your tracking data stays on your device and syncs only if you enable iCloud or Google Drive sync.",
        bullets: ["No account", "iCloud", "Google Drive"],
      },
      {
        title: "Health and Intake AI",
        body:
          "Apple Health, Health Connect, and Intake AI are optional and used only for the features you enable.",
        bullets: ["Apple Health", "Health Connect", "Optional Intake AI"],
      },
    ],
    links: [{ label: "Help", href: "/en/help" }],
  },
  "/terms": {
    title: "Nutzungsbedingungen",
    description:
      "Nutzungsbedingungen für Intake mit Hinweisen zur App-Nutzung, Integrationen, Verantwortung und Support.",
    sections: [
      {
        title: "App-Nutzung",
        body:
          "Intake dient dem Ernährungs-Tracking und ersetzt keine medizinische Beratung. Nutzerinnen und Nutzer prüfen ihre Einträge selbst.",
        bullets: ["Ernährungs-Tracking", "Keine medizinische Beratung", "Eigene Verantwortung"],
      },
      {
        title: "Integrationen und Support",
        body:
          "Integrationen wie Apple Health, Health Connect, iCloud, Google Drive und Intake AI hängen von aktivierten Plattformfunktionen ab.",
        bullets: ["Apple Health", "Health Connect", "Support"],
      },
    ],
    links: [{ label: "Datenschutzerklärung", href: "/privacy" }],
  },
  "/en/terms": {
    title: "Terms of Use",
    description:
      "Terms for using Intake, including app usage, integrations, user responsibility, and support.",
    sections: [
      {
        title: "App usage",
        body:
          "Intake is for nutrition tracking and does not replace medical advice. Users review their own entries.",
        bullets: ["Nutrition tracking", "No medical advice", "User responsibility"],
      },
      {
        title: "Integrations and support",
        body:
          "Integrations such as Apple Health, Health Connect, iCloud, Google Drive, and Intake AI depend on enabled platform features.",
        bullets: ["Apple Health", "Health Connect", "Support"],
      },
    ],
    links: [{ label: "Privacy policy", href: "/en/privacy" }],
  },
};

const STATIC_ROUTE_ALTERNATES = {
  "/": { de: "/", en: "/en" },
  "/funktionen": { de: "/funktionen", en: "/en/features" },
  "/kalorienzaehler-ohne-abo": {
    de: "/kalorienzaehler-ohne-abo",
    en: "/en/calorie-counter-no-subscription",
  },
  "/kalorien-tracker-ohne-konto": {
    de: "/kalorien-tracker-ohne-konto",
    en: "/en/calorie-tracker-no-account",
  },
  "/vergleiche": { de: "/vergleiche", en: "/en/comparisons" },
  "/intake-ai": { de: "/intake-ai", en: "/en/intake-ai" },
  "/hilfe": { de: "/hilfe", en: "/en/help" },
  "/vergleiche/yazio-alternative": {
    de: "/vergleiche/yazio-alternative",
    en: "/en/comparisons/yazio-alternative",
  },
  "/vergleiche/fddb-alternative": {
    de: "/vergleiche/fddb-alternative",
    en: "/en/comparisons/fddb-alternative",
  },
  "/privacy": { de: "/privacy", en: "/en/privacy" },
  "/terms": { de: "/terms", en: "/en/terms" },
  "/whats-new": { de: "/whats-new", en: "/en/whats-new" },
  "/en": { de: "/", en: "/en" },
  "/en/features": { de: "/funktionen", en: "/en/features" },
  "/en/calorie-counter-no-subscription": {
    de: "/kalorienzaehler-ohne-abo",
    en: "/en/calorie-counter-no-subscription",
  },
  "/en/calorie-tracker-no-account": {
    de: "/kalorien-tracker-ohne-konto",
    en: "/en/calorie-tracker-no-account",
  },
  "/en/comparisons": { de: "/vergleiche", en: "/en/comparisons" },
  "/en/intake-ai": { de: "/intake-ai", en: "/en/intake-ai" },
  "/en/help": { de: "/hilfe", en: "/en/help" },
  "/en/comparisons/yazio-alternative": {
    de: "/vergleiche/yazio-alternative",
    en: "/en/comparisons/yazio-alternative",
  },
  "/en/comparisons/fddb-alternative": {
    de: "/vergleiche/fddb-alternative",
    en: "/en/comparisons/fddb-alternative",
  },
  "/en/privacy": { de: "/privacy", en: "/en/privacy" },
  "/en/terms": { de: "/terms", en: "/en/terms" },
  "/en/whats-new": { de: "/whats-new", en: "/en/whats-new" },
};

const getAlternateRoutes = (route) => {
  const staticAlternates = STATIC_ROUTE_ALTERNATES[route];
  if (staticAlternates) {
    return staticAlternates;
  }

  const whatsNewMatch = route.match(/^\/(en\/)?whats-new\/([^/]+)$/);
  if (whatsNewMatch) {
    const [, enPrefix, version] = whatsNewMatch;
    return {
      de: `/whats-new/${version}`,
      en: `/en/whats-new/${version}`,
    };
  }

  throw new Error(`Unsupported alternate route mapping: ${route}`);
};

export const PRERENDER_ROUTES = [
  "/",
  "/funktionen",
  "/kalorienzaehler-ohne-abo",
  "/kalorien-tracker-ohne-konto",
  "/vergleiche",
  "/intake-ai",
  "/hilfe",
  "/vergleiche/yazio-alternative",
  "/vergleiche/fddb-alternative",
  "/privacy",
  "/terms",
  ...getLocalizedWhatsNewRoutes("de"),
  "/en",
  "/en/features",
  "/en/calorie-counter-no-subscription",
  "/en/calorie-tracker-no-account",
  "/en/comparisons",
  "/en/intake-ai",
  "/en/help",
  "/en/comparisons/yazio-alternative",
  "/en/comparisons/fddb-alternative",
  "/en/privacy",
  "/en/terms",
  ...getLocalizedWhatsNewRoutes("en"),
];

const getPageSeo = (route) => {
  const staticSeo = STATIC_PAGE_SEO[route];
  if (staticSeo) {
    return staticSeo;
  }

  if (route === "/whats-new") {
    return WHATS_NEW_INDEX_SEO.de;
  }

  if (route === "/en/whats-new") {
    return WHATS_NEW_INDEX_SEO.en;
  }

  const match = route.match(/^\/(en\/)?whats-new\/([^/]+)$/);
  if (!match) {
    throw new Error(`Unsupported prerender route: ${route}`);
  }

  const [, enPrefix, version] = match;
  const locale = enPrefix ? "en" : "de";
  const entry = getWhatsNewEntry(locale, version);

  if (!entry) {
    throw new Error(`Missing What's New entry for prerender route: ${route}`);
  }

  return {
    lang: locale,
    title: `${entry.title} | Intake`,
    description: entry.summary,
    canonical: `${SITE_ORIGIN}${route}`,
    ogLocale: locale === "de" ? "de_DE" : "en_US",
  };
};

const escapeAttr = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const escapeHtml = escapeAttr;

const getWhatsNewBodyContent = (route) => {
  const indexMatch = route.match(/^\/(en\/)?whats-new$/);
  if (indexMatch) {
    const [, enPrefix] = indexMatch;
    const locale = enPrefix ? "en" : "de";
    const entries = getWhatsNewEntries()
      .filter((entry) => entry.locale === locale)
      .slice(0, 5);

    return {
      title: locale === "de" ? "Was ist neu in Intake" : "What's new in Intake",
      description:
        locale === "de"
          ? "Release Notes, neue Funktionen, Screenshots und Produktverbesserungen für Intake."
          : "Release notes, feature updates, screenshots, and product improvements for Intake.",
      sections: entries.map((entry) => ({
        title: `${locale === "de" ? "Version" : "Release"} ${entry.version}: ${entry.title}`,
        body: entry.summary,
        bullets: [entry.publishedAt, entry.version],
      })),
      links: [
        {
          label: locale === "de" ? "Hilfe" : "Help",
          href: locale === "de" ? "/hilfe" : "/en/help",
        },
      ],
    };
  }

  const detailMatch = route.match(/^\/(en\/)?whats-new\/([^/]+)$/);
  if (!detailMatch) {
    return null;
  }

  const [, enPrefix, version] = detailMatch;
  const locale = enPrefix ? "en" : "de";
  const entry = getWhatsNewEntry(locale, version);

  if (!entry) {
    return null;
  }

  return {
    title: entry.title,
    description: entry.summary,
    sections: [
      {
        title: `${locale === "de" ? "Release" : "Release"} ${entry.version}`,
        body: entry.summary,
        bullets: [
          `${locale === "de" ? "Veröffentlicht" : "Published"}: ${entry.publishedAt}`,
          `${locale === "de" ? "Version" : "Version"}: ${entry.version}`,
        ],
      },
    ],
    links: [
      {
        label: locale === "de" ? "Alle Updates" : "All updates",
        href: locale === "de" ? "/whats-new" : "/en/whats-new",
      },
    ],
  };
};

const buildStaticBodyContent = (route, seo) => {
  const bodyContent = STATIC_BODY_CONTENT[route] ?? getWhatsNewBodyContent(route) ?? {
    title: seo.title,
    description: seo.description,
    sections: [],
    links: [],
  };

  const sections = bodyContent.sections
    .map((section) => {
      const bullets = section.bullets?.length
        ? `<ul>
${section.bullets.map((bullet) => `          <li>${escapeHtml(bullet)}</li>`).join("\n")}
        </ul>`
        : "";

      return `      <section>
        <h2>${escapeHtml(section.title)}</h2>
        <p>${escapeHtml(section.body)}</p>
        ${bullets}
      </section>`;
    })
    .join("\n");

  const links = bodyContent.links?.length
    ? `      <nav aria-label="${seo.lang === "de" ? "Weiterführende Seiten" : "Related pages"}">
        <h2>${seo.lang === "de" ? "Weiterführende Seiten" : "Related pages"}</h2>
        <ul>
${bodyContent.links
  .map((link) => `          <li><a href="${escapeAttr(link.href)}">${escapeHtml(link.label)}</a></li>`)
  .join("\n")}
        </ul>
      </nav>`
    : "";

  return `<main id="static-prerender-content" data-route="${escapeAttr(route)}">
      <header>
        <h1>${escapeHtml(bodyContent.title)}</h1>
        <p>${escapeHtml(bodyContent.description)}</p>
      </header>
${sections}
${links}
    </main>`;
};

const buildSeoBlock = (route, seo) => {
  const alternates = getAlternateRoutes(route);
  const alternateDe = `${SITE_ORIGIN}${alternates.de}`;
  const alternateEn = `${SITE_ORIGIN}${alternates.en}`;

  return [
    "<!-- PRERENDER_SEO_START -->",
    '<meta property="og:type" content="website" />',
    '<meta property="og:site_name" content="Intake" />',
    `<meta property="og:title" content="${escapeAttr(seo.title)}" />`,
    `<meta property="og:description" content="${escapeAttr(seo.description)}" />`,
    `<meta property="og:url" content="${escapeAttr(seo.canonical)}" />`,
    `<meta property="og:image" content="${OG_IMAGE_URL}" />`,
    `<meta property="og:image:secure_url" content="${OG_IMAGE_URL}" />`,
    '<meta property="og:image:type" content="image/png" />',
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    '<meta property="og:image:alt" content="Intake calorie counter app on iOS and Android" />',
    `<meta property="og:locale" content="${seo.ogLocale}" />`,
    `<meta property="og:locale:alternate" content="${seo.ogLocale === "en_US" ? "de_DE" : "en_US"}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${escapeAttr(seo.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(seo.description)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE_URL}" />`,
    `<link rel="canonical" href="${escapeAttr(seo.canonical)}" />`,
    `<link rel="alternate" hreflang="en" href="${escapeAttr(alternateEn)}" />`,
    `<link rel="alternate" hreflang="de" href="${escapeAttr(alternateDe)}" />`,
    `<link rel="alternate" hreflang="x-default" href="${SITE_ORIGIN}/" />`,
    "<!-- PRERENDER_SEO_END -->",
  ].join("\n    ");
};

export const buildPrerenderedHtml = (templateHtml, route) => {
  const seo = getPageSeo(route);

  const seoBlock = buildSeoBlock(route, seo);
  const staticBodyContent = buildStaticBodyContent(route, seo);

  let html = templateHtml;
  html = html.replace(/<html lang="[^"]+">/, `<html lang="${seo.lang}">`);
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${seo.title}</title>`);

  if (/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/.test(html)) {
    html = html.replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
      `<meta name="description" content="${escapeAttr(seo.description)}" />`
    );
  } else {
    html = html.replace("</head>", `    <meta name="description" content="${escapeAttr(seo.description)}" />\n  </head>`);
  }

  html = html.replace(/<!-- PRERENDER_SEO_START -->[\s\S]*?<!-- PRERENDER_SEO_END -->\s*/g, "");
  html = html.replace("</head>", `    ${seoBlock}\n  </head>`);
  html = html.replace(
    /<div id="root">[\s\S]*?<\/div>/,
    `<div id="root">\n    ${staticBodyContent}\n    </div>`
  );

  return html;
};
