import { type Language } from "@/i18n/translations";
import { buildLocalizedPath } from "@/lib/localeRouting";
import type { ReleaseSummary } from "@/lib/releases";

interface WhatsNewListProps {
  entries: ReleaseSummary[];
  language: Language;
}

const WhatsNewList = ({ entries, language }: WhatsNewListProps) => (
  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
    {entries.map((entry) => (
      <a
        key={entry.version}
        href={buildLocalizedPath("whatsNewEntry", language, entry.version)}
        className="group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
      >
        <article className="glass-card overflow-hidden border border-transparent transition-colors group-hover:border-white/[0.12] group-focus-visible:border-white/[0.12]">
          <img
            src={entry.coverImage}
            alt={entry.title}
            className="h-56 w-full object-cover"
          />
          <div className="space-y-5 p-6">
            <div className="space-y-2">
              <p className="section-kicker">
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
                    className="trust-chip"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>
            ) : null}

            <span className="btn-secondary">
              {language === "de" ? "Mehr erfahren" : "Learn more"}
            </span>
          </div>
        </article>
      </a>
    ))}
  </div>
);

export default WhatsNewList;
