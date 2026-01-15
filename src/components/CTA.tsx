import { Apple } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const CTA = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-24">
      <div className="container">
        <div className="glass-card p-12 md:p-16 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("ctaTitle")}
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto">
            {t("ctaDescription")}
          </p>
          
          <a 
            href="https://apps.apple.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-appstore"
          >
            <Apple className="w-5 h-5" />
            <div className="flex flex-col items-start">
              <span className="text-xs opacity-80">{t("downloadOn")}</span>
              <span className="text-base font-semibold">{t("appStore")}</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTA;
