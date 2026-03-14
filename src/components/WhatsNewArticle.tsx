import { Link } from "react-router-dom";
import { Language } from "@/i18n/translations";
import { buildLocalizedPath } from "@/lib/localeRouting";
import { WhatsNewEntry } from "@/lib/whatsNewContent";

interface WhatsNewArticleProps {
  entry: WhatsNewEntry;
  language: Language;
}

const WhatsNewArticle = ({ entry, language }: WhatsNewArticleProps) => (
  <article className="space-y-8">
    <div className="space-y-4">
      <Link
        to={buildLocalizedPath("whatsNewIndex", language)}
        className="inline-flex text-sm text-primary transition-colors hover:text-primary/80"
      >
        {language === "de" ? "Zur Übersicht" : "Back to overview"}
      </Link>
      <p className="text-sm uppercase tracking-[0.2em] text-primary">
        {language === "de" ? `Version ${entry.version}` : `Version ${entry.version}`}
      </p>
      <h1 className="text-3xl font-bold text-foreground md:text-5xl">{entry.title}</h1>
      <p className="max-w-2xl text-base text-muted-foreground md:text-lg">{entry.summary}</p>
    </div>

    <img
      src={entry.coverImage}
      alt={entry.title}
      className="w-full rounded-[2rem] border border-border/70 bg-card/80 object-cover"
    />

    {entry.video ? (
      <video
        controls
        className="w-full rounded-[2rem] border border-border/70 bg-card/80"
        src={entry.video}
      />
    ) : null}

    <div
      className="prose prose-invert max-w-none prose-headings:text-foreground prose-h2:mt-12 prose-h2:text-3xl prose-h2:font-semibold prose-h2:tracking-tight prose-p:text-base prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground prose-li:text-muted-foreground prose-img:rounded-[1.5rem] prose-img:border prose-img:border-border/70"
      dangerouslySetInnerHTML={{ __html: entry.bodyHtml }}
    />
  </article>
);

export default WhatsNewArticle;
