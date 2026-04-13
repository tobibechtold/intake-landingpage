import { Language } from "@/i18n/translations";
import { ScreenshotAssetKey } from "@/lib/screenshotAssets";

export type MarketingPageKey = "features" | "noSubscription" | "noAccount" | "comparisons";
export type ComparisonSlug = "yazio-alternative" | "fddb-alternative";

export interface MarketingSection {
  id: string;
  title: string;
  body: string;
  bullets?: string[];
  screenshot?: ScreenshotAssetKey;
}

export interface RelatedLink {
  label: string;
  page: MarketingPageKey;
  detail?: ComparisonSlug;
}

export interface MarketingPageContent {
  kicker: string;
  title: string;
  description: string;
  sections: MarketingSection[];
  relatedLinks: RelatedLink[];
}

export interface ComparisonCriterion {
  label: string;
  intake: string;
  other: string;
}

export interface ComparisonPageContent {
  kicker: string;
  title: string;
  description: string;
  criteria: ComparisonCriterion[];
  conclusion: string;
  takeaways: string[];
}

const MARKETING_PAGES: Record<Language, Record<MarketingPageKey, MarketingPageContent>> = {
  de: {
    features: {
      kicker: "Intake Funktionen",
      title: "Die Intake Funktionen, die im Alltag wirklich wichtig sind",
      description:
        "Intake kombiniert die Funktionen, die man beim täglichen Tracken wirklich nutzt: große Lebensmitteldatenbank, Suche, Barcode-Scan, eigene Produkte und Rezepte, 30+ Nährwerte, Apple Health, Widgets, Apple Watch, PDF-Export, Intervallfasten, Wasser und detaillierte Statistiken.",
      sections: [
        {
          id: "database",
          title: "Kalorien tracken mit großer Lebensmitteldatenbank",
          body:
            "Die App ist auf schnelles Tracken ausgelegt: Suche, Vorschläge, Tagesübersicht und ein Logging-Flow, der nicht bei jeder Mahlzeit nach einem Extra-Schritt verlangt.",
          bullets: ["Große Lebensmitteldatenbank", "Schnelle Suche", "Ruhiger Tagesablauf statt Tracking-Stress"],
          screenshot: "addFood",
        },
        {
          id: "logging",
          title: "Suche, Barcode-Scan, eigene Produkte und Rezepte",
          body:
            "Wenn ein Produkt fehlt oder du regelmäßig dasselbe isst, musst du nicht auf den nächsten App-Import warten. Intake unterstützt Barcode-Scan, eigene Produkte und eigene Rezepte für hausgemachte Gerichte.",
          bullets: ["Barcode-Scanner", "Eigene Produkte", "Eigene Rezepte", "Schneller Rezept-Workflow"],
          screenshot: "scanFood",
        },
        {
          id: "nutrients",
          title: "30+ Nährwerte und detaillierte Statistiken",
          body:
            "Neben Kalorien und Makros zeigt Intake auch Vitamine, Mineralstoffe, Koffein und weitere Mikronährstoffe. Dazu kommen Statistiken und ein PDF-Export, wenn du deine Daten mit Ärztin, Arzt oder Ernährungsberatung teilen willst.",
          bullets: ["30+ Nährwerte", "Vitamine und Mineralstoffe", "Koffein und Mikronährstoffe", "PDF-Export"],
          screenshot: "statistics",
        },
        {
          id: "goals",
          title: "Kalorien- und Makroziele so flexibel wie dein Alltag",
          body:
            "Du kannst deine Tagesziele automatisch auf Basis etablierter Formeln berechnen lassen oder komplett selbst definieren. Dazu kommen eigene Makroziele, unterschiedliche Ernährungsformen wie Low Carb, Keto oder Low Fat und wiederkehrende Tagesanpassungen.",
          bullets: [
            "Automatische Kalorienberechnung",
            "Eigene Kalorien- und Makroziele",
            "Low Carb, Keto und Low Fat",
            "Wiederkehrende Zielanpassungen",
          ],
          screenshot: "dashboard",
        },
        {
          id: "activity",
          title: "Aktivität, Workouts und Health-Sync",
          body:
            "Aktivitätskalorien und Workouts können automatisch aus Apple Health oder Health Connect kommen. Zusätzlich kannst du eigene Workouts direkt in der App anlegen und selbst festlegen, wie viel deiner Aktivitätskalorien auf dein Tagesziel angerechnet werden.",
          bullets: [
            "Apple Health und Health Connect",
            "Aktivitätskalorien automatisch übernehmen",
            "Eigene Workouts anlegen",
            "Prozentual anrechenbare Aktivitätskalorien",
          ],
          screenshot: "health",
        },
        {
          id: "fasting",
          title: "Intervallfasten, Wasser und optionale Erinnerungen",
          body:
            "Fasten und Hydration sind nicht in eine Extra-App ausgelagert. Intake bringt Intervallfasten, Wasser-Tracking sowie optionale Erinnerungen für Mahlzeiten und Trinken in denselben Ablauf wie dein Ernährungs-Tracking.",
          bullets: ["Intervallfasten", "Wasser-Tracking", "Meal- und Trink-Erinnerungen"],
          screenshot: "fasting",
        },
        {
          id: "ecosystem",
          title: "Personalisierung, Widgets und Apple Watch",
          body:
            "Du kannst das Dashboard anpassen, Akzentfarben und App-Icons wählen und Intake über Homescreen- und Lockscreen-Widgets, Apple Watch App und Komplikationen nutzen. Die App soll sich nach dir richten und nicht andersherum.",
          bullets: [
            "Anpassbares Dashboard",
            "Eigene Akzentfarben und App-Icons",
            "Homescreen- und Lockscreen-Widgets",
            "Apple Watch App und Komplikationen",
          ],
          screenshot: "appleWatch",
        },
      ],
      relatedLinks: [
        { label: "Kalorienzähler ohne Abo", page: "noSubscription" },
        { label: "Kalorien-Tracker ohne Konto", page: "noAccount" },
        { label: "Vergleiche und Alternativen", page: "comparisons" },
      ],
    },
    noSubscription: {
      kicker: "Ohne Abo",
      title: "Kalorienzähler ohne Abo und ohne Premium-Wall",
      description:
        "Viele Tracker wirken erst günstig und parken dann die guten Funktionen hinter einem Monatsabo. Intake ist anders gedacht: einmal kaufen, weiter tracken, ohne dass Nährwerte, Widgets, Fasten oder Export erst über Premium freigeschaltet werden.",
      sections: [
        {
          id: "value",
          title: "Einmalkauf statt dauerhaftem Upsell",
          body:
            "Bei Intake gibt es keinen wiederkehrenden Preis nur dafür, dass du deine Ernährung weiter normal nutzen kannst. Der Kern des Produkts ist nicht um ein Monatsabo herum gebaut.",
          bullets: ["Einmalkauf statt Monatsabo", "Keine Premium-Wall im Alltag", "Ruhige App statt Dauer-Upsell"],
          screenshot: "dashboard",
        },
        {
          id: "depth",
          title: "Die wichtigen Funktionen sind nicht ausgelagert",
          body:
            "30+ Nährwerte, Rezepte, Intervallfasten, Wasser, Widgets, Apple Watch, PDF-Export, eigene Ziele und Personalisierung gehören zur App selbst und nicht zu einem künstlich besseren Tarif.",
          bullets: ["30+ Nährwerte", "Rezepte und PDF-Export", "Widgets und Apple Watch", "Eigene Ziele und Personalisierung"],
          screenshot: "statistics",
        },
        {
          id: "focus",
          title: "Keine Gamification, keine nervigen Ernährungstipps",
          body:
            "Wenn du einfach tracken willst, brauchst du keine Badges, Streaks, KI-Motivation oder Ratgeber-Overlays. Intake konzentriert sich auf das Loggen und Auswerten selbst.",
          bullets: ["Keine Streaks", "Keine Punkte", "Keine ungefragten Tipps", "Keine Fitness-Spiel-Mechanik"],
        },
      ],
      relatedLinks: [
        { label: "Alle Funktionen", page: "features" },
        { label: "Kalorien-Tracker ohne Konto", page: "noAccount" },
        { label: "Vergleiche und Alternativen", page: "comparisons" },
      ],
    },
    noAccount: {
      kicker: "Ohne Konto",
      title: "Kein Konto. Keine Registrierung. Optionaler Sync nur wenn du willst.",
      description:
        "Intake hat gar kein eigenes Kontosystem. Es gibt keinen Login, kein Passwort und keine Registrierung. Deine Daten bleiben auf deinem Gerät und syncen nur optional über iCloud auf iOS oder Google Drive auf Android.",
      sections: [
        {
          id: "privacy",
          title: "Es gibt schlicht kein Konto",
          body:
            "Du kannst bei Intake kein Profil anlegen, das erst verifiziert, zurückgesetzt oder mit einer E-Mail verbunden werden muss. Die App startet lokal und funktioniert lokal.",
          bullets: ["Kein Login", "Keine Registrierung", "Kein Passwort-Reset", "Daten lokal auf deinem Gerät"],
          screenshot: "onboarding",
        },
        {
          id: "sync",
          title: "Sync und Integrationen bleiben optional",
          body:
            "Wenn du Gerätewechsel oder Backups willst, kannst du iCloud auf iOS oder Google Drive auf Android nutzen. Apple Health und Health Connect können Aktivitätsdaten liefern. All das ist optional und ersetzt kein Kontosystem.",
          bullets: ["Optionales iCloud Sync", "Optionales Google Drive Sync", "Apple Health", "Health Connect"],
          screenshot: "health",
        },
        {
          id: "complete",
          title: "Volle Funktionen auch ohne Konto-Logik",
          body:
            "Trotz lokalem Ansatz bekommst du die komplette App: Kalorien, Makros, 30+ Nährwerte, Wasser, Fasten, Widgets, Apple Watch, PDF-Export, eigene Produkte, eigene Rezepte und detaillierte Statistiken.",
          bullets: ["Kalorien und Makros", "30+ Nährwerte", "Widgets und Apple Watch", "PDF-Export und Statistiken"],
        },
      ],
      relatedLinks: [
        { label: "Alle Funktionen", page: "features" },
        { label: "Kalorienzähler ohne Abo", page: "noSubscription" },
        { label: "Vergleiche und Alternativen", page: "comparisons" },
      ],
    },
    comparisons: {
      kicker: "Vergleiche",
      title: "Wie sich Intake von Yazio, FDDB und typischen Abo-Trackern unterscheidet",
      description:
        "Wenn du Tracker vergleichst, sind meist dieselben Fragen wichtig: Musst du dafür ein Abo zahlen? Brauchst du ein Konto? Und ist für wichtige Funktionen ein Premium-Abo notwendig oder nicht? Genau darum geht es auf diesen Seiten.",
      sections: [
        {
          id: "hub",
          title: "Worauf es bei so einem Vergleich wirklich ankommt",
          body:
            "Am Ende sind nicht die Werbesprüche wichtig, sondern ob Nährwerte, Widgets, Fasten, Rezepte oder bessere Auswertungen direkt dabei sind oder ob dafür ein Premium-Abo notwendig ist. Und ob die App dich einfach tracken lässt oder ständig noch Coaching, Tipps und Motivation obendrauf packt.",
          bullets: ["Abo oder nicht", "Konto nötig oder nicht", "Was direkt in der App steckt", "Einfach tracken oder dauernd Coaching dazu"],
          screenshot: "dashboard",
        },
        {
          id: "intake",
          title: "Wofür Intake nicht gedacht ist",
          body:
            "Intake will keine Coaching-Plattform sein. Die App konzentriert sich aufs Tracken und Auswerten und lässt Streaks, Punkte und ungefragte Tipps bewusst weg.",
          bullets: ["Keine Streaks", "Keine Punkte", "Keine ungefragten Tipps", "Kein Kontosystem"],
        },
      ],
      relatedLinks: [
        { label: "Yazio Alternative", page: "comparisons", detail: "yazio-alternative" },
        { label: "FDDB Alternative", page: "comparisons", detail: "fddb-alternative" },
        { label: "Alle Funktionen", page: "features" },
      ],
    },
  },
  en: {
    features: {
      kicker: "Intake Features",
      title: "The Intake features that matter in daily use",
      description:
        "Intake covers the feature set people actually use day to day: large food database, search, barcode scanning, custom foods and recipes, 30+ nutrients, Apple Health, widgets, Apple Watch, PDF export, intermittent fasting, water tracking, and detailed statistics.",
      sections: [
        {
          id: "database",
          title: "Calorie tracking with a large food database",
          body:
            "The app is built for fast logging: search, suggestions, and a daily flow that does not turn every meal into admin work.",
          bullets: ["Large food database", "Fast search", "Low-friction daily logging"],
          screenshot: "addFood",
        },
        {
          id: "logging",
          title: "Search, barcode scanning, custom foods, and recipes",
          body:
            "If a product is missing or you eat the same meals often, Intake does not make you wait on a catalog update. You can scan barcodes, create your own foods, and save your own recipes.",
          bullets: ["Barcode scanner", "Custom foods", "Custom recipes", "Fast recipe workflow"],
          screenshot: "scanFood",
        },
        {
          id: "nutrients",
          title: "30+ nutrients and detailed statistics",
          body:
            "Intake goes beyond calories and macros with vitamins, minerals, caffeine, and other micronutrients. It also includes statistics and PDF export when you want to share nutrition data with a doctor or nutritionist.",
          bullets: ["30+ nutrients", "Vitamins and minerals", "Caffeine and micronutrients", "PDF export"],
          screenshot: "statistics",
        },
        {
          id: "goals",
          title: "Calorie and macro targets that fit real life",
          body:
            "You can use automatic calorie calculation based on established formulas or define your own targets entirely. Intake also supports custom macro targets, nutrition styles like low carb, keto, and low fat, plus recurring day-based target adjustments.",
          bullets: [
            "Automatic calorie calculation",
            "Custom calorie and macro goals",
            "Low carb, keto, and low fat",
            "Recurring target adjustments",
          ],
          screenshot: "dashboard",
        },
        {
          id: "activity",
          title: "Activity calories, workouts, and health sync",
          body:
            "Activity calories and workouts can sync automatically from Apple Health or Health Connect. You can also add your own workouts in the app and decide how much activity should count toward your daily target.",
          bullets: [
            "Apple Health and Health Connect",
            "Automatic activity calories",
            "Custom workouts in the app",
            "Adjustable activity-to-target percentage",
          ],
          screenshot: "health",
        },
        {
          id: "fasting",
          title: "Intermittent fasting, water, and optional reminders",
          body:
            "Fasting and hydration are part of the same workflow. Intake combines intermittent fasting, water tracking, and optional meal or water reminders inside the app you already use for nutrition.",
          bullets: ["Intermittent fasting", "Water tracking", "Meal and water reminders"],
          screenshot: "fasting",
        },
        {
          id: "ecosystem",
          title: "Personalization, widgets, and Apple Watch",
          body:
            "You can change the dashboard layout, pick accent colors and app icons, and use Intake through Home Screen and Lock Screen widgets, the Apple Watch app, and watch complications. The app adapts to your workflow instead of forcing its own.",
          bullets: [
            "Custom dashboard layout",
            "Custom accent colors and app icons",
            "Home Screen and Lock Screen widgets",
            "Apple Watch app and complications",
          ],
          screenshot: "appleWatch",
        },
      ],
      relatedLinks: [
        { label: "No subscription", page: "noSubscription" },
        { label: "No account", page: "noAccount" },
        { label: "Comparisons", page: "comparisons" },
      ],
    },
    noSubscription: {
      kicker: "No Subscription",
      title: "A calorie counter without a subscription and without a premium wall",
      description:
        "Many trackers look affordable until the interesting features move behind a monthly plan. Intake is built differently: pay once, keep tracking, and do not unlock nutrients, widgets, fasting, or export through a recurring subscription.",
      sections: [
        {
          id: "value",
          title: "A one-time purchase instead of constant upsells",
          body:
            "There is no recurring price just to keep using the app normally. Intake is not designed around a monthly paywall.",
          bullets: ["One-time purchase", "No monthly fee for core use", "Calm product without constant upsells"],
          screenshot: "dashboard",
        },
        {
          id: "depth",
          title: "The good features are part of the app",
          body:
            "30+ nutrients, recipes, intermittent fasting, water tracking, widgets, Apple Watch, PDF export, custom goals, and personalization are part of Intake itself, not something you unlock by moving to a better tier.",
          bullets: ["30+ nutrients", "Recipes and PDF export", "Widgets and Apple Watch", "Custom goals and personalization"],
          screenshot: "statistics",
        },
        {
          id: "focus",
          title: "No gamification and no nutrition nagging",
          body:
            "If you only want to log food, you probably do not need badges, streaks, AI motivation, or extra advice layers. Intake stays focused on tracking and analysis.",
          bullets: ["No streaks", "No badges", "No unwanted tips", "No fitness-game layer"],
        },
      ],
      relatedLinks: [
        { label: "Features", page: "features" },
        { label: "No account", page: "noAccount" },
        { label: "Comparisons", page: "comparisons" },
      ],
    },
    noAccount: {
      kicker: "No Account",
      title: "No account. No signup. Optional sync only if you want it.",
      description:
        "Intake does not offer an account system at all. There is no signup, login, or password to manage. Your data stays on your device and only syncs through iCloud on iOS or Google Drive on Android if you choose that.",
      sections: [
        {
          id: "privacy",
          title: "There is simply no account",
          body:
            "You cannot create an Intake profile that needs email verification, password recovery, or server-first onboarding. The app starts locally and works locally.",
          bullets: ["No signup", "No login", "No password reset flow", "Local-first data"],
          screenshot: "onboarding",
        },
        {
          id: "sync",
          title: "Sync and integrations stay optional",
          body:
            "If you want backups or device sync, you can use iCloud on iOS or Google Drive on Android. Apple Health and Health Connect can also feed in activity data. None of that turns into an account system.",
          bullets: ["Optional iCloud sync", "Optional Google Drive sync", "Apple Health", "Health Connect"],
          screenshot: "health",
        },
        {
          id: "complete",
          title: "Full features without account logic",
          body:
            "You still get the full app: calories, macros, 30+ nutrients, water, fasting, widgets, Apple Watch, PDF export, custom foods, custom recipes, and detailed statistics.",
          bullets: ["Calories and macros", "30+ nutrients", "Widgets and Apple Watch", "PDF export and statistics"],
        },
      ],
      relatedLinks: [
        { label: "Features", page: "features" },
        { label: "No subscription", page: "noSubscription" },
        { label: "Comparisons", page: "comparisons" },
      ],
    },
    comparisons: {
      kicker: "Comparisons",
      title: "How Intake differs from Yazio, FDDB, and typical subscription trackers",
      description:
        "The real comparison questions are usually practical: do the important features sit behind a premium plan, is the product built around coaching and habit layers, and do you need to live inside an account platform just to log food?",
      sections: [
        {
          id: "hub",
          title: "What people actually compare",
          body:
            "What matters is not a slogan but whether nutrients, widgets, fasting, recipes, or better reports require a subscription, and whether the app stays calm or layers motivation systems on top of basic tracking.",
          bullets: ["Subscription model and premium wall", "Account platform vs local-first app", "Calm tracking vs coaching layers", "How much is really included"],
          screenshot: "dashboard",
        },
        {
          id: "intake",
          title: "What Intake is deliberately not trying to be",
          body:
            "Intake is not trying to become a nutrition coach platform. It intentionally avoids streaks, badges, and unsolicited advice layers that keep competing for your attention.",
          bullets: ["No streaks", "No badges", "No unwanted tips", "No account system"],
        },
      ],
      relatedLinks: [
        { label: "Yazio Alternative", page: "comparisons", detail: "yazio-alternative" },
        { label: "FDDB Alternative", page: "comparisons", detail: "fddb-alternative" },
        { label: "Features", page: "features" },
      ],
    },
  },
};

const COMPARISON_PAGES: Record<Language, Record<ComparisonSlug, ComparisonPageContent>> = {
  de: {
    "yazio-alternative": {
      kicker: "Yazio Alternative",
      title: "Yazio Alternative: Intake vs. Yazio",
      description:
        "Yazio setzt stark auf Pro, Pläne und Coaching. Intake passt besser, wenn du einfach tracken willst, ohne für Grundfunktionen jeden Monat zu zahlen.",
      criteria: [
        {
          label: "Abo oder nicht",
          intake: "Einmalkauf. Kein Modell, das dich dauernd Richtung Monatsabo schiebt.",
          other: "Yazio ist klar auf Pro ausgerichtet. Viele Funktionen, mit denen geworben wird, stecken in Yazio Pro.",
        },
        {
          label: "Was du ohne Abo bekommst",
          intake: "30+ Nährwerte, Widgets, Apple Watch, PDF-Export, Rezepte, Fasten und Personalisierung sind direkt in der App drin.",
          other: "Für Dinge wie detaillierte Nährwerte, Smart Food Rating oder Meal Planning ist bei Yazio ein Pro-Abo notwendig.",
        },
        {
          label: "Wie sich die App anfühlt",
          intake: "Fokussierter Tracker ohne Streaks, Badges oder dauernde Motivationsebene.",
          other: "Yazio fühlt sich stärker wie ein Coach- und Gewohnheitsprodukt an, nicht nur wie ein Tracker.",
        },
        {
          label: "Konto und Daten",
          intake: "Kein Konto. Daten bleiben lokal und syncen nur optional.",
          other: "Yazio kann auf iOS zwar ohne Signup starten, insgesamt bleibt es aber ein Dienst mit Account- und Cloud-Logik im Hintergrund.",
        },
        {
          label: "Ziele und Einstellungen",
          intake: "Eigene Kalorien- und Makroziele, automatische Berechnung, wiederkehrende Tagesziele und flexible Aktivitätsanrechnung.",
          other: "Yazio bietet ebenfalls Ziele und Pläne, setzt aber stärker auf geführte Programme und Pro-Funktionen.",
        },
        {
          label: "Apple- und Geräte-Integration",
          intake: "Apple Watch App, Komplikationen, Home- und Lockscreen-Widgets plus Live Activities sind Teil des Produkts.",
          other: "Yazio unterstützt Apple-Geräte auch, wirkt aber eher wie ein Service rund ums Tracking als wie eine anpassbare Apple-native App.",
        },
        {
          label: "Für wen passt was",
          intake: "Für Leute, die einfach essen tracken und auswerten wollen, ohne Abo und ohne Coaching drumherum.",
          other: "Für Leute, die genau solche Coaching-, AI- und Gewohnheitsfunktionen wollen und mit Pro kein Problem haben.",
        },
      ],
      conclusion:
        "Wenn du einfach tracken willst und weder Abo noch Coaching-Layer brauchst, ist Intake die klarere Alternative zu Yazio.",
      takeaways: [
        "Intake packt Nährwerte, Widgets, Rezepte und Export nicht hinter ein Monatsabo.",
        "Yazio setzt deutlich stärker auf Pro, Pläne und Coaching.",
        "Wenn du Streaks, Tipps und Gamification nicht willst, wirkt Intake deutlich direkter.",
      ],
    },
    "fddb-alternative": {
      kicker: "FDDB Alternative",
      title: "FDDB Alternative: Intake vs. FDDB",
      description:
        "FDDB ist stärker als Portal mit Web-Sync und Premium aufgebaut. Intake passt besser, wenn du einfach lokal tracken willst und wichtige Funktionen direkt in der App haben möchtest.",
      criteria: [
        {
          label: "Abo oder nicht",
          intake: "Einmalkauf ohne laufende Premium-Stufe für die normale Nutzung.",
          other: "FDDB Premium ist ein Abo mit automatischer Verlängerung und mehreren Laufzeiten.",
        },
        {
          label: "Konto und Plattform",
          intake: "Kein Konto, kein Web-Portal, keine Registrierung. Daten bleiben lokal mit optionalem Sync.",
          other: "FDDB gehört zu einem Modell mit App und Website und synchronisiert dein Tagebuch zwischen beiden.",
        },
        {
          label: "Was direkt in der App steckt",
          intake: "30+ Nährwerte, Widgets, Fasten, Wasser, Rezepte, PDF-Export, eigene Ziele, Apple Watch und Personalisierung sind direkt dabei.",
          other: "Bei FDDB hängen mehrere Funktionen wie Fasten, Widgets, Tracker-Verbindungen oder Planner am Premium-Abo.",
        },
        {
          label: "Wie sich die App anfühlt",
          intake: "Fokussierte App, die schnell zum Tracken da ist und nicht noch eine Plattform drumherum baut.",
          other: "FDDB wirkt stärker wie ein größeres Portal mit App, Website und zusätzlicher Premium-Ebene.",
        },
        {
          label: "Ziele und Einstellungen",
          intake: "Automatische oder eigene Kalorienziele, eigene Makros, Aktivitätsanrechnung, wiederkehrende Tagesziele und Ernährungsformen wie Low Carb oder Keto.",
          other: "FDDB bietet ebenfalls Ziel- und Planner-Funktionen, bindet einen Teil davon aber stärker an Premium und Plattformfunktionen.",
        },
        {
          label: "Aktivität und Integrationen",
          intake: "Apple Health, Health Connect, manuelle Workouts und flexible Aktivitätskalorien direkt im Tracker.",
          other: "FDDB unterstützt Fitness-Tracker und Health-Apps ebenfalls, platziert solche Anbindungen aber stärker im Premium-Umfeld.",
        },
        {
          label: "Für wen passt was",
          intake: "Für Leute, die eine moderne, lokale App wollen, die schnell ist und keinen Account-Overhead mitbringt.",
          other: "Für Leute, die bewusst ein Portal mit Web-Sync, Premium-Abo und größerem Plattform-Kontext suchen.",
        },
      ],
      conclusion:
        "Wenn du keinen Tracker mit Portal- und Premium-Logik suchst, sondern eine fokussierte App mit lokaler Datenhaltung und starken Funktionen direkt im Produkt, ist Intake die klarere FDDB-Alternative.",
      takeaways: [
        "FDDB ist stärker auf App, Web-Portal und Premium-Mitgliedschaft ausgelegt, Intake nicht.",
        "Intake bleibt lokal und direkt, statt noch eine größere Plattform um dein Tracking herum aufzubauen.",
        "Wenn du wichtige Funktionen lieber direkt in der App hast als in einem Premium-Abo, passt Intake besser.",
      ],
    },
  },
  en: {
    "yazio-alternative": {
      kicker: "Yazio Alternative",
      title: "Yazio Alternative: Intake vs. Yazio",
      description:
        "Yazio leans heavily into Pro subscriptions, coaching, and extra motivation layers. Intake is the calmer alternative for people who mostly want to track without paying monthly for core features.",
      criteria: [
        {
          label: "Business model",
          intake: "One-time purchase. The product is not built around recurring subscription conversion.",
          other: "Yazio is clearly structured around Pro subscriptions, and many of its promoted convenience and analysis features sit inside Yazio Pro.",
        },
        {
          label: "What is included",
          intake: "30+ nutrients, widgets, Apple Watch, PDF export, recipes, fasting, and personalization are part of the core app.",
          other: "Key extras such as detailed nutrition info, Smart Food Rating, or meal planning are positioned as Pro features in Yazio.",
        },
        {
          label: "Product style",
          intake: "A calm tracker without streaks, badges, gamification, or nutrition nudging.",
          other: "Yazio presents itself more as a coaching and habit product with motivation and guidance layers around logging.",
        },
        {
          label: "Account and data model",
          intake: "There is no account system at all. Data stays local unless you opt into sync.",
          other: "Yazio can start without signup on iOS, but the product still operates as a cloud and subscription service rather than a local-first utility.",
        },
        {
          label: "Goals and control",
          intake: "Custom calorie and macro goals, formula-based auto targets, recurring daily adjustments, and configurable activity calorie handling.",
          other: "Yazio also supports goals and planning, but puts more emphasis on planning, coaching, and Pro-led convenience features than on fine-grained tracker control.",
        },
        {
          label: "Apple and device integration",
          intake: "Apple Watch app, complications, Home Screen and Lock Screen widgets, plus Live Activities are part of the product.",
          other: "Yazio covers Apple devices too, but feels more like a service around tracking and motivation than a customizable Apple-native utility.",
        },
        {
          label: "Who it fits better",
          intake: "People who want to log and analyze food without a monthly plan or coaching layer.",
          other: "People who actively want coaching, AI features, and habit-building layers and do not mind a Pro subscription.",
        },
      ],
      conclusion:
        "If you want a calmer calorie tracker without a subscription, streak mechanics, or a built-in coaching layer, Intake is the clearer alternative to Yazio.",
      takeaways: [
        "Intake does not hide core features like nutrients, widgets, recipes, and export behind a recurring plan.",
        "Yazio is more coaching- and Pro-oriented, Intake is more utility-oriented.",
        "If you do not want streaks, gamification, or extra advice layers, Intake stays much more focused.",
      ],
    },
    "fddb-alternative": {
      kicker: "FDDB Alternative",
      title: "FDDB Alternative: Intake vs. FDDB",
      description:
        "FDDB is closer to a platform with web sync, premium subscriptions, and broader portal logic. Intake is the more focused option if you want local tracking and do not want to unlock important features later.",
      criteria: [
        {
          label: "Business model",
          intake: "One-time purchase without a recurring premium tier for normal use.",
          other: "FDDB Premium is a subscription with automatic renewal and multiple terms.",
        },
        {
          label: "Account and platform logic",
          intake: "No account, no web portal, no signup. Data stays local with optional sync only.",
          other: "FDDB is part of an app-plus-website model and syncs diary data between mobile and web.",
        },
        {
          label: "What is included",
          intake: "30+ nutrients, widgets, fasting, water, recipes, PDF export, custom goals, Apple Watch, and personalization are part of the product.",
          other: "Several FDDB features such as fasting, widgets, tracker connections, planners, and broader convenience tooling are positioned inside Premium.",
        },
        {
          label: "Product style",
          intake: "A focused app that feels like a calm tracking utility.",
          other: "FDDB feels more like a broader platform with app, website, premium layer, and surrounding feature logic.",
        },
        {
          label: "Goals and control",
          intake: "Automatic or custom calorie targets, custom macros, activity handling, recurring day targets, and nutrition styles like low carb or keto.",
          other: "FDDB also offers planner and target systems, but more of that control is tied into premium and platform features.",
        },
        {
          label: "Activity and integrations",
          intake: "Apple Health, Health Connect, manual workouts, and flexible activity calories directly in the tracker.",
          other: "FDDB supports fitness trackers and health apps but places those integrations more firmly in its premium environment.",
        },
        {
          label: "Who it fits better",
          intake: "People who want a modern local-first app with less overhead.",
          other: "People who specifically want a portal with web sync, a premium membership, and a broader platform context.",
        },
      ],
      conclusion:
        "If you do not want an account-centric tracker with a premium subscription and would rather have a focused local-first app with strong features built in, Intake is the more modern FDDB alternative.",
      takeaways: [
        "FDDB is more portal- and premium-oriented; Intake is not.",
        "Intake stays local and focused instead of building a larger platform around your diary.",
        "If you want important features directly in the app rather than unlocked through a premium membership, Intake is the cleaner fit.",
      ],
    },
  },
};

export const getMarketingPageContent = (
  page: MarketingPageKey,
  language: Language
): MarketingPageContent => MARKETING_PAGES[language][page];

export const getComparisonPageContent = (
  slug: ComparisonSlug,
  language: Language
): ComparisonPageContent => COMPARISON_PAGES[language][slug];

export const isComparisonSlug = (value: string | undefined): value is ComparisonSlug =>
  value === "yazio-alternative" || value === "fddb-alternative";
