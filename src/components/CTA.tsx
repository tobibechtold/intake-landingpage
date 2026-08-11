import { useLanguage } from "@/i18n/LanguageContext";
import appStoreBadge from "@/assets/app-store-badge.svg";
import googlePlayBadge from "@/assets/google-play-badge.png";
import { getAppStoreUrl, getGooglePlayUrl } from "@/lib/storeLinks";
import { trackStoreCtaClick } from "@/lib/analytics";

const CTA = () => {
  const { t, language } = useLanguage();
  
  return (
    <section id="cta" className="py-24">
      <div className="container">
        <div 
          className="glass-card p-12 md:p-16 text-center max-w-3xl mx-auto reveal"
        >
          <h2 className="text-3xl md:text-4xl text-foreground mb-4">
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
              onClick={() => trackStoreCtaClick("ios", "cta")}
              className="inline-block hover:opacity-80 transition-opacity"
            >
              <img
                src={appStoreBadge.src}
                alt="Download on the App Store"
                className="h-12 md:h-14"
              />
            </a>

            <a
              href={getGooglePlayUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackStoreCtaClick("android", "cta")}
              className="inline-block hover:opacity-80 transition-opacity"
            >
              <img
                src={googlePlayBadge.src}
                alt="Get it on Google Play"
                className="h-12 md:h-14"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
