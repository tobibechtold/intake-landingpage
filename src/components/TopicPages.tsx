import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { buildLocalizedPath } from "@/lib/localeRouting";

const TopicPages = () => {
  const { language } = useLanguage();

  const items =
    language === "de"
      ? [
          {
            title: "Alle wichtigen Funktionen",
            body: "Von Suche, Barcode-Scan und Rezepten bis zu Widgets, Apple Watch, PDF-Export und 30+ Nährwerten.",
            href: buildLocalizedPath("features", language),
          },
          {
            title: "Kalorienzähler ohne Abo",
            body: "Warum Intake die Alternative ist, wenn du keine monatliche Bezahlschranke für Kernfunktionen willst.",
            href: buildLocalizedPath("noSubscription", language),
          },
          {
            title: "Kein Konto, kein Login",
            body: "Intake hat gar kein Kontosystem. Deine Daten bleiben lokal und syncen nur optional über iCloud oder Google Drive.",
            href: buildLocalizedPath("noAccount", language),
          },
          {
            title: "Vergleiche und Alternativen",
            body: "Was bei Yazio, FDDB und anderen Trackern hinter Abo, Gamification oder Plattformlogik steckt und wie Intake sich davon unterscheidet.",
            href: buildLocalizedPath("comparisons", language),
          },
        ]
      : [
          {
            title: "Core features",
            body: "From search, barcode scanning, and recipes to widgets, Apple Watch, PDF export, and 30+ nutrients.",
            href: buildLocalizedPath("features", language),
          },
          {
            title: "Calorie counter without subscription",
            body: "Why Intake is the better fit if you do not want a monthly paywall in front of the important features.",
            href: buildLocalizedPath("noSubscription", language),
          },
          {
            title: "No account, no login",
            body: "Intake has no account system at all. Your data stays local and only syncs through iCloud or Google Drive if you want that.",
            href: buildLocalizedPath("noAccount", language),
          },
          {
            title: "Comparisons and alternatives",
            body: "See how Intake differs from Yazio, FDDB, and other trackers built around subscriptions, coaching layers, or platform accounts.",
            href: buildLocalizedPath("comparisons", language),
          },
        ];

  return (
    <section className="py-20 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="section-kicker">{language === "de" ? "Mehr zu Intake" : "More on Intake"}</p>
          <h2 className="mt-3 text-3xl font-bold text-foreground md:text-5xl">
            {language === "de"
              ? "Die wichtigsten Seiten auf einen Blick"
              : "The most useful pages in one place"}
          </h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            {language === "de"
              ? "Wenn du Funktionen, Preise oder Alternativen vergleichen willst, kommst du hier direkt zu den relevanten Seiten."
              : "If you want to compare features, pricing, or alternatives, these pages take you straight to the relevant parts of the site."}
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => (
            <Link key={item.title} to={item.href} className="feature-card flex h-full flex-col p-7">
              <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.body}</p>
              <span className="mt-5 text-sm font-medium text-primary">
                {language === "de" ? "Seite ansehen" : "View page"}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopicPages;
