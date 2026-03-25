import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { buildLocalizedPath } from "@/lib/localeRouting";
import { getWhatsNewEntries } from "@/lib/whatsNewContent";

const ProductUpdatesPreview = () => {
  const { language } = useLanguage();
  const entries = getWhatsNewEntries(language).slice(0, 3);
  const dateFormatter = new Intl.DateTimeFormat(language === "de" ? "de-DE" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  if (entries.length === 0) {
    return null;
  }

  return (
    <section className="section-gradient border-y border-border/50 py-20">
      <div className="container space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-primary">
              {language === "de" ? "Neueste Releases" : "Latest releases"}
            </p>
            <h2 className="text-3xl font-bold text-foreground md:text-5xl">
              {language === "de" ? "Produktupdates" : "Product Updates"}
            </h2>
            <p className="text-base text-muted-foreground md:text-lg">
              {language === "de"
                ? "Neue Releases zeigen, dass Intake aktiv weiterentwickelt wird, ohne den Core-Tracker hinter ein Abo zu sperren."
                : "Recent releases show Intake keeps improving without hiding the core tracker behind a subscription."}
            </p>
          </div>

          <Link
            to={buildLocalizedPath("whatsNewIndex", language)}
            className="inline-flex items-center rounded-full border border-primary/40 px-4 py-2 text-sm font-medium text-primary transition-colors hover:border-primary hover:bg-primary/10"
          >
            {language === "de" ? "Alle Updates ansehen" : "View all updates"}
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {entries.map((entry) => (
            <article
              key={`${entry.locale}-${entry.version}`}
              className="glass-card overflow-hidden border border-border/70"
            >
              <img src={entry.coverImage} alt={entry.title} className="h-48 w-full object-cover" />
              <div className="space-y-4 p-6">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.25em] text-primary">
                    {language === "de" ? `Version ${entry.version}` : `Version ${entry.version}`}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {dateFormatter.format(new Date(entry.publishedAt))}
                  </p>
                  <h3 className="text-xl font-semibold text-foreground">{entry.title}</h3>
                  <p className="text-sm leading-6 text-muted-foreground">{entry.summary}</p>
                </div>

                {entry.highlights.length > 0 ? (
                  <ul className="grid gap-2 text-sm text-foreground/90">
                    {entry.highlights.slice(0, 2).map((highlight) => (
                      <li
                        key={highlight}
                        className="rounded-2xl border border-border/70 bg-background/40 px-4 py-3"
                      >
                        {highlight}
                      </li>
                    ))}
                  </ul>
                ) : null}

                <Link
                  to={buildLocalizedPath("whatsNewEntry", language, entry.version)}
                  className="inline-flex items-center text-sm font-medium text-primary transition-colors hover:text-primary/80"
                >
                  {language === "de" ? "Update lesen" : "Read update"}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductUpdatesPreview;
