import logo from "@/assets/logo-hero.png";
import appStoreBadge from "@/assets/app-store-badge.svg";
import { useLanguage } from "@/i18n/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();
  
  return (
    <section className="hero-gradient min-h-screen flex items-center justify-center pt-16">
      <div className="container py-20">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <img 
            src={logo} 
            alt="Intake" 
            className="w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 logo-glow mb-10 opacity-0 animate-fade-scale animate-float"
            style={{ animationDelay: "0.1s" }}
          />
          
          <h1 
            className="text-4xl md:text-6xl font-bold text-foreground mb-4 text-balance opacity-0 animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            {t("heroTitle")}{" "}
            <span className="gradient-text">{t("heroTitleHighlight")}</span>
          </h1>
          
          <p 
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl text-balance opacity-0 animate-fade-up"
            style={{ animationDelay: "0.35s" }}
          >
            {t("heroDescription")}
          </p>
          
          <a 
            href="https://apps.apple.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="opacity-0 animate-fade-up hover:opacity-80 transition-opacity"
            style={{ animationDelay: "0.5s" }}
          >
            <img 
              src={appStoreBadge} 
              alt="Download on the App Store" 
              className="h-12 md:h-14"
            />
          </a>
          
          <p 
            className="mt-4 text-sm text-primary font-medium opacity-0 animate-fade-up"
            style={{ animationDelay: "0.6s" }}
          >
            {t("oneTimePurchase")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
