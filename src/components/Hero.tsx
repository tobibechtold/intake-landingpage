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
                <div className="flex items-center gap-0.5 mb-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-foreground text-foreground" />
                  ))}
                </div>
                <div className="flex items-center">
                  {/* Left laurel */}
                  <svg viewBox="0 0 36 48" className="w-7 h-10 text-muted-foreground/60" fill="currentColor">
                    <ellipse cx="10" cy="10" rx="5" ry="8" transform="rotate(-30 10 10)" />
                    <ellipse cx="7" cy="20" rx="5" ry="8" transform="rotate(-15 7 20)" />
                    <ellipse cx="6" cy="31" rx="4.5" ry="7.5" transform="rotate(-5 6 31)" />
                    <ellipse cx="8" cy="41" rx="4" ry="6" transform="rotate(10 8 41)" />
                    <rect x="14" y="6" width="2.5" height="40" rx="1.25" transform="rotate(5 15 26)" opacity="0.5" />
                  </svg>
                  <span className="text-3xl font-bold text-foreground -mx-1">4.9</span>
                  {/* Right laurel (mirrored) */}
                  <svg viewBox="0 0 36 48" className="w-7 h-10 text-muted-foreground/60 scale-x-[-1]" fill="currentColor">
                    <ellipse cx="10" cy="10" rx="5" ry="8" transform="rotate(-30 10 10)" />
                    <ellipse cx="7" cy="20" rx="5" ry="8" transform="rotate(-15 7 20)" />
                    <ellipse cx="6" cy="31" rx="4.5" ry="7.5" transform="rotate(-5 6 31)" />
                    <ellipse cx="8" cy="41" rx="4" ry="6" transform="rotate(10 8 41)" />
                    <rect x="14" y="6" width="2.5" height="40" rx="1.25" transform="rotate(5 15 26)" opacity="0.5" />
                  </svg>
                </div>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{t("heroRating")}</span>
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
