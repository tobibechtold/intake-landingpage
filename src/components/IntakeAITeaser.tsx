import { Link } from "react-router-dom";
import { Sparkles, Camera, MessageCircle } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { buildLocalizedPath } from "@/lib/localeRouting";

const IntakeAITeaser = () => {
  const { t, language } = useLanguage();
  const highlights =
    language === "de"
      ? ["Text beschreiben", "Foto analysieren", "Vor dem Speichern prüfen"]
      : ["Describe with text", "Analyze a photo", "Review before logging"];

  return (
    <section className="section-gradient border-y border-border/50 py-20">
      <div className="container">
        <div className="grid items-center gap-8 rounded-[2rem] border border-border/70 bg-card/45 p-8 shadow-[0_28px_90px_-70px_rgba(255,76,145,0.75)] md:grid-cols-[minmax(0,1fr)_minmax(260px,0.8fr)] md:p-10">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="section-kicker">{t("intakeAITeaserKicker")}</h2>
              <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                {t("intakeAIBadge")}
              </span>
            </div>
            <p className="mt-3 max-w-2xl text-3xl font-bold text-foreground md:text-4xl">
              {t("intakeAITeaserTitle")}
            </p>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
              {t("intakeAITeaserDescription")}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to={buildLocalizedPath("intakeAI", language)} className="trust-chip-link">
                {t("intakeAITeaserButton")}
              </Link>
            </div>
          </div>

          <div className="grid gap-3">
            {[MessageCircle, Camera, Sparkles].map((Icon, index) => (
              <div
                key={highlights[index]}
                className="flex items-center gap-3 rounded-2xl border border-border/70 bg-background/55 px-4 py-3"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-sm font-medium text-foreground">{highlights[index]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntakeAITeaser;
