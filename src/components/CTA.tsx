import { useLanguage } from "@/i18n/LanguageContext";
// import appStoreBadge from "@/assets/app-store-badge.svg"; // Uncomment when app is released
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const CTA = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  
  return (
    <section ref={ref} className="py-24">
      <div className="container">
        <div 
          className={`glass-card p-12 md:p-16 text-center max-w-3xl mx-auto opacity-0 ${
            isVisible ? 'animate-fade-scale' : ''
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("ctaTitle")}
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto">
            {t("ctaDescription")}
          </p>
          
          {/* Uncomment when app is released:
          <a 
            href="https://apps.apple.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block hover:opacity-80 transition-opacity"
          >
            <img
              src={appStoreBadge}
              alt="Download on the App Store"
              className="h-12 md:h-14"
            />
          </a>
          */}
          <span className="text-lg font-medium text-muted-foreground">
            {t("comingSoon")}
          </span>
        </div>
      </div>
    </section>
  );
};

export default CTA;
