import { useLanguage } from "@/i18n/LanguageContext";
import appStoreBadge from "@/assets/app-store-badge.svg";
import googlePlayBadge from "@/assets/google-play-badge.png";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { getAppStoreUrl } from "@/lib/storeLinks";

const CTA = () => {
  const { t, language } = useLanguage();
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
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href={getAppStoreUrl(language)} 
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

            <div className="relative inline-block opacity-60 cursor-default">
              <img
                src={googlePlayBadge}
                alt="Get it on Google Play"
                className="h-12 md:h-14"
              />
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] font-semibold px-2 py-0.5 rounded-full">
                {t("comingSoonBadge")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
