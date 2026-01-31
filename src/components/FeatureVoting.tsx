import { Megaphone, ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";

const FeatureVoting = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section ref={ref} className="section-gradient py-24">
      <div className="container">
        <div
          className={`glass-card p-12 md:p-16 text-center max-w-3xl mx-auto opacity-0 ${
            isVisible ? "animate-fade-scale" : ""
          }`}
        >
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Megaphone className="w-8 h-8 text-primary" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("featureVotingTitle")}{" "}
            <span className="gradient-text">{t("featureVotingTitleHighlight")}</span>
          </h2>

          <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto">
            {t("featureVotingDescription")}
          </p>

          <Button asChild size="lg" className="gap-2">
            <a
              href="https://featurevoting.tobibechtold.dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("featureVotingButton")}
              <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeatureVoting;
