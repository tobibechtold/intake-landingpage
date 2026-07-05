import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { buildLocalizedPath } from "@/lib/localeRouting";

const MobileIntakeAIBanner = () => {
  const { t, language } = useLanguage();

  return (
    <section
      data-testid="mobile-intake-ai-banner"
      className="section-gradient border-y border-border/50 py-5 md:hidden"
    >
      <div className="container">
        <Link
          to={buildLocalizedPath("intakeAI", language)}
          className="group flex items-center gap-4 rounded-3xl border border-primary/25 bg-card/75 p-4 shadow-[0_24px_80px_-58px_rgba(255,76,145,0.75)]"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Sparkles className="h-5 w-5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              {t("intakeAITeaserKicker")}
            </span>
            <span className="mt-1 block text-sm font-semibold leading-5 text-foreground">
              {t("intakeAITeaserDescription")}
            </span>
            <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary">
              {t("intakeAITeaserButton")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </span>
        </Link>
      </div>
    </section>
  );
};

export default MobileIntakeAIBanner;
