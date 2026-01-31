export type Language = "en" | "de";

export const translations = {
  en: {
    // Header
    download: "Download",

    // Hero
    heroTitle: "Calorie counting.",
    heroTitleHighlight: "Simplified.",
    heroDescription:
      "No subscriptions. No gamification. No coaching. Just a powerful calorie tracker that respects your privacy and your wallet.",
    downloadOn: "Download on the",
    appStore: "App Store",
    oneTimePurchase: "One-time purchase • iOS only",
    comingSoon: "Soon on the",
    comingSoonSuffix: "AppStore",

    // Features
    featuresTitle: "Everything you need.",
    featuresTitleHighlight: "Nothing you don't.",
    featuresSubtitle: "A focused calorie counter that helps you reach your goals without the bloat.",

    privacyFirst: "Privacy First",
    privacyFirstDesc: "All data stays on your device. No account required, no data uploads to servers.",

    reachGoals: "Reach Your Goals",
    reachGoalsDesc: "Set your goal to lose, maintain, or gain weight. Intake calculates your daily calorie limit.",

    millionFoods: "3+ Million Foods",
    millionFoodsDesc: "Huge database of food items. Search, scan barcodes, or create your own entries.",

    barcodeScanner: "Barcode Scanner",
    barcodeScannerDesc: "Quickly log foods by scanning barcodes. Fast and accurate tracking.",

    appleHealthSync: "Apple Health Sync",
    appleHealthSyncDesc: "Seamlessly sync your data with Apple Health for a complete health overview.",

    icloudSync: "iCloud Sync",
    icloudSyncDesc: "Your data syncs across all your devices via iCloud. Always up to date.",

    // App Preview
    appPreviewHeading: "See it in action",

    // Screenshot Gallery
    screenshotGalleryHeading: "App Screenshots",

    // Reviews
    reviewsTitle: "What Users Say",
    reviewsSubtitle: "Real reviews from the App Store",
    showMore: "Show more",
    showLess: "Show less",

    // Feature Voting
    featureVotingTitle: "You decide",
    featureVotingTitleHighlight: "what's next.",
    featureVotingDescription: "View the roadmap, vote on features, and report bugs. Your feedback directly shapes the future of Intake.",
    featureVotingButton: "View Roadmap & Vote",

    // CTA
    ctaTitle: "Ready to start your journey?",
    ctaDescription: "Join thousands of users who track their calories the simple way. One purchase, lifetime access.",

    // Footer
    legal: "Legal",
    privacyPolicy: "Privacy Policy",
    termsOfUse: "Terms of Use",
    imprint: "Imprint",
    app: "App",
    social: "Social",
    allRightsReserved: "All rights reserved.",
  },
  de: {
    // Header
    download: "Herunterladen",

    // Hero
    heroTitle: "Kalorien zählen.",
    heroTitleHighlight: "Leicht gemacht.",
    heroDescription:
      "Keine Abonnements. Keine Gamification. Kein Coaching. Einfach ein leistungsstarker Kalorientracker, der deine Privatsphäre und dein Portemonnaie respektiert.",
    downloadOn: "Laden im",
    appStore: "App Store",
    oneTimePurchase: "Einmalkauf • Nur iOS",
    comingSoon: "Bald im",
    comingSoonSuffix: "AppStore verfügbar",

    // Features
    featuresTitle: "Alles was du brauchst.",
    featuresTitleHighlight: "Nichts, was du nicht brauchst.",
    featuresSubtitle: "Ein fokussierter Kalorienzähler, der dir hilft, deine Ziele ohne Ballast zu erreichen.",

    privacyFirst: "Datenschutz zuerst",
    privacyFirstDesc: "Alle Daten bleiben auf deinem Gerät. Kein Konto erforderlich, keine Daten-Uploads auf Server.",

    reachGoals: "Erreiche deine Ziele",
    reachGoalsDesc: "Setze dein Ziel: abnehmen, halten oder zunehmen. Intake berechnet dein tägliches Kalorienlimit.",

    millionFoods: "3+ Millionen Lebensmittel",
    millionFoodsDesc: "Riesige Datenbank mit Lebensmitteln. Suchen, Barcodes scannen oder eigene Einträge erstellen.",

    barcodeScanner: "Barcode-Scanner",
    barcodeScannerDesc: "Lebensmittel schnell durch Scannen von Barcodes erfassen. Schnelles und genaues Tracking.",

    appleHealthSync: "Apple Health Sync",
    appleHealthSyncDesc:
      "Synchronisiere deine Daten nahtlos mit Apple Health für einen vollständigen Gesundheitsüberblick.",

    icloudSync: "iCloud Sync",
    icloudSyncDesc: "Deine Daten werden über iCloud auf all deinen Geräten synchronisiert. Immer aktuell.",

    // App Preview
    appPreviewHeading: "Erlebe die App",

    // Screenshot Gallery
    screenshotGalleryHeading: "App Screenshots",

    // Reviews
    reviewsTitle: "Was Nutzer sagen",
    reviewsSubtitle: "Echte Bewertungen aus dem AppStore",
    showMore: "Mehr anzeigen",
    showLess: "Weniger anzeigen",

    // Feature Voting
    featureVotingTitle: "Du entscheidest,",
    featureVotingTitleHighlight: "was als nächstes kommt.",
    featureVotingDescription: "Sieh dir die Roadmap an, stimme für Features ab und melde Bugs. Dein Feedback bestimmt die Zukunft von Intake.",
    featureVotingButton: "Roadmap & Abstimmung",

    // CTA
    ctaTitle: "Bereit, deine Reise zu beginnen?",
    ctaDescription:
      "Schließe dich Tausenden von Nutzern an, die ihre Kalorien auf die einfache Weise tracken. Ein Kauf, lebenslanger Zugang.",

    // Footer
    legal: "Rechtliches",
    privacyPolicy: "Datenschutz",
    termsOfUse: "Nutzungsbedingungen",
    imprint: "Impressum",
    app: "App",
    social: "Social",
    allRightsReserved: "Alle Rechte vorbehalten.",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
