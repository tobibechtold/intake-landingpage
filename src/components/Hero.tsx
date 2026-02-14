import logo from "@/assets/logo-hero.webp";
import appStoreBadge from "@/assets/app-store-badge.svg";
import { useLanguage } from "@/i18n/LanguageContext";
import { Star } from "lucide-react";
import PhoneFrame from "./PhoneFrame";

const Hero = () => {
  const { t, language } = useLanguage();
  const videoSrc = language === "de" ? "/promo-video-de.mp4" : "/promo-video-en.mp4";

  return (
    <section className="hero-gradient min-h-screen flex items-center justify-center pt-16">
      <div className="container py-20">
        <div className="md:grid md:grid-cols-2 md:gap-12 items-center">
          {/* Left column */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div
              className="w-20 h-20 mb-6 opacity-0 animate-fade-scale relative"
              style={{ animationDelay: "0.1s" }}
            >
              <img
                src={logo}
                alt="Intake"
                className="w-full h-full relative z-10"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                width={80}
                height={80}
              />
              <div
                className="absolute inset-0 -z-10 scale-[1.8]"
                style={{
                  background: 'radial-gradient(circle at center, hsl(185 75% 55% / 0.55) 0%, hsl(185 75% 55% / 0.35) 25%, hsl(185 75% 55% / 0.15) 50%, transparent 75%)',
                  filter: 'blur(40px)',
                }}
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

            <a
              href="https://apps.apple.com/us/app/intake-kalorienz%C3%A4hler/id6757768955"
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

            <div
              className="mt-3 flex items-center gap-1.5 opacity-0 animate-fade-up"
              style={{ animationDelay: "0.7s" }}
            >
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
              <span className="text-sm text-muted-foreground ml-1">
                {t("heroRating")}
              </span>
            </div>
          </div>

          {/* Right column — Phone mockup */}
          <div
            className="flex justify-center mt-12 md:mt-0 opacity-0 animate-fade-scale"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="max-w-[260px] md:max-w-[300px]">
              <PhoneFrame>
                <video
                  key={language}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src={videoSrc} type="video/mp4" />
                </video>
              </PhoneFrame>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
