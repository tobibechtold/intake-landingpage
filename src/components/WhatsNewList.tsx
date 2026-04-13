import { Link } from "react-router-dom";
import { Language } from "@/i18n/translations";
import { buildLocalizedPath } from "@/lib/localeRouting";
import { WhatsNewEntry } from "@/lib/whatsNewContent";

interface WhatsNewListProps {
  entries: WhatsNewEntry[];
  language: Language;
}

const WhatsNewList = ({ entries, language }: WhatsNewListProps) => (
  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
    {entries.map((entry) => (
      <Link
        key={`${entry.locale}-${entry.version}`}
        to={buildLocalizedPath("whatsNewEntry", language, entry.version)}
        className="group block rounded-[2rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
      >
        <article className="glass-card overflow-hidden border border-transparent transition-colors group-hover:border-primary/40 group-focus-visible:border-primary/40">
          <img
            src={entry.coverImage}
            alt={entry.title}
            className="h-56 w-full object-cover"
          />
          <div className="space-y-5 p-6">
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-[0.2em] text-primary">
                {language === "de" ? `Version ${entry.version}` : `Version ${entry.version}`}
              </p>
              <h2 className="text-2xl font-semibold text-foreground">{entry.title}</h2>
              <p className="text-sm text-muted-foreground">{entry.summary}</p>
            </div>

            {entry.highlights.length > 0 ? (
              <ul className="grid gap-2 text-sm text-foreground/90 md:grid-cols-2">
                {entry.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="rounded-2xl border border-border/70 bg-background/40 px-4 py-3"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>
            ) : null}

            <span className="inline-flex items-center rounded-full border border-primary/40 px-4 py-2 text-sm font-medium text-primary transition-colors group-hover:border-primary group-hover:bg-primary/10 group-focus-visible:border-primary group-focus-visible:bg-primary/10">
              {language === "de" ? "Mehr erfahren" : "Learn more"}
            </span>
          </div>
        </article>
      </Link>
    ))}
  </div>
);

export default WhatsNewList;
