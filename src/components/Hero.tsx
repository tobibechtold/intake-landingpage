import logo from "@/assets/logo-hero.png";
// import appStoreBadge from "@/assets/app-store-badge.svg"; // Uncomment when app is released
import { useLanguage } from "@/i18n/LanguageContext";
import { Apple } from "lucide-react";

const Hero = () => {
  const { t } = useLanguage();
  
  return (
    <section className="hero-gradient min-h-screen flex items-center justify-center pt-16">
      <div className="container py-20">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div 
            className="w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 mb-10 opacity-0 animate-fade-scale"
            style={{ animationDelay: "0.1s" }}
          >
            <img 
              src={logo} 
              alt="Intake" 
              className="w-full h-full logo-glow"
            />
          </div>
          
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
          
          {/* Uncomment when app is released:
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
          */}
          <span 
            className="text-lg md:text-xl font-medium text-primary text-glow opacity-0 animate-fade-up flex items-center gap-2"
            style={{ animationDelay: "0.5s" }}
          >
            {t("comingSoon").replace("AppStore", "")}
            <Apple className="inline-block" size={20} />
            AppStore
          </span>
          
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
