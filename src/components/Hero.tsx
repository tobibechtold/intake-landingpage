import { Apple } from "lucide-react";
import logo from "@/assets/logo-hero.png";
import { useLanguage } from "@/i18n/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();
  
  return (
    <section className="hero-gradient min-h-screen flex items-center justify-center pt-16">
      <div className="container py-20">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <img 
            src={logo} 
            alt="Intake" 
            className="w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 logo-glow mb-10 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          />
          
          <h1 
            className="text-4xl md:text-6xl font-bold text-foreground mb-4 text-balance animate-fade-in opacity-0"
            style={{ animationDelay: "0.2s" }}
          >
            {t("heroTitle")}{" "}
            <span className="gradient-text">{t("heroTitleHighlight")}</span>
          </h1>
          
          <p 
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl text-balance animate-fade-in opacity-0"
            style={{ animationDelay: "0.3s" }}
          >
            {t("heroDescription")}
          </p>
          
          <a 
            href="https://apps.apple.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-appstore animate-fade-in opacity-0"
            style={{ animationDelay: "0.4s" }}
          >
            <Apple className="w-5 h-5" />
            <div className="flex flex-col items-start">
              <span className="text-xs opacity-80">{t("downloadOn")}</span>
              <span className="text-base font-semibold">{t("appStore")}</span>
            </div>
          </a>
          
          <p 
            className="mt-4 text-sm text-primary font-medium animate-fade-in opacity-0"
            style={{ animationDelay: "0.5s" }}
          >
            {t("oneTimePurchase")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
