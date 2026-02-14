import logo from "@/assets/logo-hero.webp";
import appStoreBadge from "@/assets/app-store-badge.svg";
import { Star } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
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

            <div
              className="flex flex-col md:flex-row items-center gap-4 md:gap-6 opacity-0 animate-fade-up"
              style={{ animationDelay: "0.5s" }}
            >
              <a
                href="https://apps.apple.com/us/app/intake-kalorienz%C3%A4hler/id6757768955"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <img
                  src={appStoreBadge}
                  alt="Download on the App Store"
                  className="h-12 md:h-14"
                />
              </a>

              <div className="inline-flex flex-col items-center bg-muted/60 rounded-2xl px-5 py-3">
                <div className="flex items-center gap-0.5 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-foreground text-foreground" />
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  <svg viewBox="0 0 24 40" className="w-5 h-8 text-muted-foreground/50" fill="currentColor">
                    <path d="M12 2C10 6 6 8 4 12C2 16 3 20 6 22C4 18 5 14 8 11C6 16 6 20 8 24C6 20 7 16 10 13C8 18 8 22 10 26C8 22 9 18 12 15C10 20 10 24 12 28C10 24 10 20 12 16C10 22 11 26 12 30C12 26 12 22 12 18C12 14 12 10 12 6V2Z" />
                  </svg>
                  <span className="text-3xl font-bold text-foreground">4.9</span>
                  <svg viewBox="0 0 24 40" className="w-5 h-8 text-muted-foreground/50 scale-x-[-1]" fill="currentColor">
                    <path d="M12 2C10 6 6 8 4 12C2 16 3 20 6 22C4 18 5 14 8 11C6 16 6 20 8 24C6 20 7 16 10 13C8 18 8 22 10 26C8 22 9 18 12 15C10 20 10 24 12 28C10 24 10 20 12 16C10 22 11 26 12 30C12 26 12 22 12 18C12 14 12 10 12 6V2Z" />
                  </svg>
                </div>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">{t("heroRating")}</span>
              </div>
            </div>

            <p
              className="mt-4 text-sm text-primary font-medium opacity-0 animate-fade-up"
              style={{ animationDelay: "0.6s" }}
            >
              {t("oneTimePurchase")}
            </p>
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
