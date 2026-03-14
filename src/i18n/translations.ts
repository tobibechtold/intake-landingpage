export type Language = "en" | "de";

export const translations = {
  en: {
    // Header
    download: "Download",

    // Hero
    heroTitle: "Calorie counting.",
    heroTitleHighlight: "Simplified.",
    heroDescription:
      "Available on iPhone and Android. No subscriptions. No gamification. No coaching. Just a powerful calorie tracker that respects your privacy and your wallet.",
    downloadOn: "Download on the",
    appStore: "App Store",
    oneTimePurchase: "One-time purchase",
    comingSoonBadge: "Coming Soon",
    googlePlay: "Google Play",
    heroRating: "worldwide rating",
    comingSoon: "Soon on the",
    comingSoonSuffix: "AppStore",

    // Features
    featuresTitle: "Everything you need.",
    featuresTitleHighlight: "Nothing you don't.",
    featuresSubtitle: "A focused calorie counter for iOS and Android that helps you reach your goals without the bloat.",

    privacyFirst: "Privacy First",
    privacyFirstDesc: "All data stays on your device. No account required, no data uploads to servers.",

    reachGoals: "Reach Your Goals",
    reachGoalsDesc: "Set your goal to lose, maintain, or gain weight. Intake calculates your daily calorie limit.",

    millionFoods: "3+ Million Foods",
    millionFoodsDesc: "Huge database of food items. Search, scan barcodes, or create your own entries.",

    barcodeScanner: "Barcode Scanner",
    barcodeScannerDesc: "Quickly log foods by scanning barcodes. Fast and accurate tracking.",

    appleHealthSync: "Apple Health + Health Connect",
    appleHealthSyncDesc: "Sync your data with Apple Health on iOS and Health Connect on Android.",

    icloudSync: "iCloud + Google Drive Sync",
    icloudSyncDesc: "Keep data in sync via iCloud on iOS and Google Drive on Android.",

    // App Preview
    appPreviewHeading: "See it in action",

    // Screenshot Gallery
    screenshotGalleryHeading: "App Screenshots",

    // Reviews
    reviewsTitle: "What Users Say",
    reviewsSubtitle: "Real reviews from the App Store",
    showMore: "Show more",
    showLess: "Show less",

    // FAQ
    faqTitle: "Frequently Asked Questions",
    faqSubtitle: "Quick answers about pricing, privacy, and features.",

    // Feature Voting
    featureVotingTitle: "You decide",
    featureVotingTitleHighlight: "what's next.",
    featureVotingDescription: "View the roadmap, vote on features, and report bugs. Your feedback directly shapes the future of Intake.",
    featureVotingButton: "View Roadmap & Vote",

    // CTA
    ctaTitle: "Ready to start your journey?",
    ctaDescription: "Join thousands of users on iOS and Android who track calories the simple way.",

    // Footer
    legal: "Legal",
    privacyPolicy: "Privacy Policy",
    termsOfUse: "Terms of Use",
    imprint: "Imprint",
    app: "App",
    changelog: "Changelog",
    whatsNew: "What's New",
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
      "Verfügbar für iPhone und Android. Keine Abonnements. Keine Gamification. Kein Coaching. Einfach ein leistungsstarker Kalorientracker, der deine Privatsphäre und dein Portemonnaie respektiert.",
    downloadOn: "Laden im",
    appStore: "App Store",
    oneTimePurchase: "Einmalkauf",
    comingSoonBadge: "Bald verfügbar",
    googlePlay: "Google Play",
    heroRating: "Weltweite Bewertung",
    comingSoon: "Bald im",
    comingSoonSuffix: "AppStore verfügbar",

    // Features
    featuresTitle: "Alles was du brauchst.",
    featuresTitleHighlight: "Nichts, was du nicht brauchst.",
    featuresSubtitle: "Ein fokussierter Kalorienzähler für iOS und Android, der dir hilft, deine Ziele ohne Ballast zu erreichen.",

    privacyFirst: "Datenschutz zuerst",
    privacyFirstDesc: "Alle Daten bleiben auf deinem Gerät. Kein Konto erforderlich, keine Daten-Uploads auf Server.",

    reachGoals: "Erreiche deine Ziele",
    reachGoalsDesc: "Setze dein Ziel: abnehmen, halten oder zunehmen. Intake berechnet dein tägliches Kalorienlimit.",

    millionFoods: "3+ Millionen Lebensmittel",
    millionFoodsDesc: "Riesige Datenbank mit Lebensmitteln. Suchen, Barcodes scannen oder eigene Einträge erstellen.",

    barcodeScanner: "Barcode-Scanner",
    barcodeScannerDesc: "Lebensmittel schnell durch Scannen von Barcodes erfassen. Schnelles und genaues Tracking.",

    appleHealthSync: "Apple Health + Health Connect",
    appleHealthSyncDesc:
      "Synchronisiere deine Daten mit Apple Health auf iOS und Health Connect auf Android.",

    icloudSync: "iCloud + Google Drive Sync",
    icloudSyncDesc: "Synchronisiere Daten über iCloud auf iOS und Google Drive auf Android.",

    // App Preview
    appPreviewHeading: "Erlebe die App",

    // Screenshot Gallery
    screenshotGalleryHeading: "App Screenshots",

    // Reviews
    reviewsTitle: "Was Nutzer sagen",
    reviewsSubtitle: "Echte Bewertungen aus dem AppStore",
    showMore: "Mehr anzeigen",
    showLess: "Weniger anzeigen",

    // FAQ
    faqTitle: "Haufige Fragen",
    faqSubtitle: "Schnelle Antworten zu Preis, Datenschutz und Funktionen.",

    // Feature Voting
    featureVotingTitle: "Du entscheidest,",
    featureVotingTitleHighlight: "was als nächstes kommt.",
    featureVotingDescription: "Sieh dir die Roadmap an, stimme für Features ab und melde Bugs. Dein Feedback bestimmt die Zukunft von Intake.",
    featureVotingButton: "Roadmap & Abstimmung",

    // CTA
    ctaTitle: "Bereit, deine Reise zu beginnen?",
    ctaDescription:
      "Schließe dich Tausenden von Nutzern auf iOS und Android an, die ihre Kalorien einfach tracken.",

    // Footer
    legal: "Rechtliches",
    privacyPolicy: "Datenschutz",
    termsOfUse: "Nutzungsbedingungen",
    imprint: "Impressum",
    app: "App",
    changelog: "Changelog",
    whatsNew: "Was ist neu",
    social: "Social",
    allRightsReserved: "Alle Rechte vorbehalten.",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
