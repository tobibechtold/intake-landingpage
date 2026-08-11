import { type Language } from "@/i18n/translations";
import { buildLocalizedPath } from "@/lib/localeRouting";
import type { ReleaseSummary } from "@/lib/releases";
import type { ReactNode } from "react";

interface WhatsNewArticleProps {
  entry: ReleaseSummary;
  language: Language;
  /** Rendered markdown body, passed down as an Astro slot. */
  children?: ReactNode;
}

const WhatsNewArticle = ({ entry, language, children }: WhatsNewArticleProps) => (
  <article className="space-y-8">
    <div className="space-y-4">
      <a
        href={buildLocalizedPath("whatsNewIndex", language)}
        className="btn-ghost"
      >
        {language === "de" ? "Zur Übersicht" : "Back to overview"}
      </a>
      <p className="text-sm uppercase tracking-[0.2em] text-primary">
        {language === "de" ? `Version ${entry.version}` : `Version ${entry.version}`}
      </p>
      <h1 className="text-3xl text-foreground md:text-5xl">{entry.title}</h1>
      <p className="max-w-2xl text-base text-muted-foreground md:text-lg">{entry.summary}</p>
    </div>

    <img
      src={entry.coverImage}
      alt={entry.title}
      className="w-full rounded-xl border border-border/70 bg-card/80 object-cover"
    />

        <div
      className="prose prose-invert max-w-none prose-headings:text-foreground prose-h2:mt-12 prose-h2:text-3xl prose-h2:font-semibold prose-h2:tracking-tight prose-p:text-base prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground prose-li:text-muted-foreground prose-img:rounded-[1.5rem] prose-img:border prose-img:border-border/70 [&_figure]:my-8 [&_video]:block [&_video]:w-full md:[&_video]:max-w-[34rem] [&_video]:rounded-[1.5rem] [&_video]:border [&_video]:border-border/70 [&_video]:bg-card/80"
    >
      {children}
    </div>
  </article>
);

export default WhatsNewArticle;
