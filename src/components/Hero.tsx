import logo from "@/assets/logo-hero.webp";
import appStoreBadge from "@/assets/app-store-badge.svg";
import googlePlayBadge from "@/assets/google-play-badge.png";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import PhoneFrame from "./PhoneFrame";
import { getPromoVideoSourceForCapabilities, PROMO_VIDEO_SOURCES } from "@/lib/videoSupport";
import { getAppStoreUrl, getGooglePlayUrl } from "@/lib/storeLinks";

const RatingComponent = ({ label }: { label: string }) => (
  <div className="inline-flex flex-col items-center px-5 py-1">
    <div className="mb-1.5 flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="h-3 w-3 fill-foreground text-foreground" />
      ))}
    </div>
    <div className="flex items-center">
      <span className="mx-1 text-3xl font-bold text-foreground">4.9</span>
    </div>
    <span className="mt-1 text-[10px] uppercase tracking-wider text-foreground">{label}</span>
  </div>
);

const Hero = () => {
  const { t, language } = useLanguage();
  const [videoSrc, setVideoSrc] = useState(PROMO_VIDEO_SOURCES.mp4);
  const trustChips = [
    t("oneTimePurchase"),
    t("noAccountRequired"),
    t("onDevicePrivacy"),
    t("heroTrustRating"),
  ];

  useEffect(() => {
    const video = document.createElement("video");
    setVideoSrc(getPromoVideoSourceForCapabilities((type) => video.canPlayType(type)));
  }, []);

  return (
    <section className="hero-gradient relative min-h-screen overflow-hidden pt-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_0%,hsl(338_90%_62%_/_0.24),transparent_70%)]" />
      <div className="container relative py-16 md:py-24">
        <div className="items-center md:grid md:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)] md:gap-12">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <div
              className="mb-6 flex flex-col items-center gap-4 opacity-0 animate-fade-scale md:flex-row md:items-center"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="relative h-20 w-20 shrink-0">
                <img
                  src={logo}
                  alt="Intake"
                  className="relative z-10 h-full w-full"
                  loading="eager"
                  decoding="async"
                  width={80}
                  height={80}
                />
                <div
                  className="absolute inset-0 -z-10 scale-[1.8]"
                  style={{
                    background:
                      "radial-gradient(circle at center, hsl(338 92% 63% / 0.52) 0%, hsl(24 95% 59% / 0.22) 42%, transparent 75%)",
                    filter: "blur(40px)",
                  }}
                />
              </div>

              <div className="hidden md:block">
                <RatingComponent label={t("heroRating")} />
              </div>
            </div>

            <h1
              className="max-w-2xl text-4xl font-bold leading-tight text-foreground opacity-0 animate-fade-up md:text-6xl"
              style={{ animationDelay: "0.2s" }}
            >
              {t("heroTitle")} <span className="gradient-text">{t("heroTitleHighlight")}</span>
            </h1>

            <p
              className="mt-5 max-w-xl text-lg text-muted-foreground opacity-0 animate-fade-up md:text-xl"
              style={{ animationDelay: "0.35s" }}
            >
              {t("heroDescription")}
            </p>

            <div
              className="mt-8 flex w-full flex-col items-center gap-5 opacity-0 animate-fade-up md:items-start"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="flex flex-col items-center gap-4 sm:flex-row">
                <a
                  href={getAppStoreUrl(language)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <img
                    src={appStoreBadge}
                    alt="Download on the App Store"
                    className="h-12 md:h-14"
                  />
                </a>

                <a
                  href={getGooglePlayUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <img
                    src={googlePlayBadge}
                    alt="Get it on Google Play"
                    className="h-12 md:h-14"
                  />
                </a>
              </div>

              <div className="md:hidden">
                <RatingComponent label={t("heroRating")} />
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
                {trustChips.map((chip) => (
                  <span key={chip} className="trust-chip">
                    {chip}
                  </span>
                ))}
              </div>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-primary/30 bg-card/60 px-6 text-foreground hover:bg-card/90"
              >
                <a href="#why-switch">{t("heroSecondaryCta")}</a>
              </Button>
            </div>
          </div>

          <div
            className="mt-12 flex justify-center opacity-0 animate-fade-scale md:mt-0"
            style={{ animationDelay: "0.4s" }}
          >
            <PhoneFrame className="max-w-[280px] md:max-w-[320px]">
              <video
                key={language}
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover"
              >
                <source
                  src={videoSrc}
                  type={videoSrc.endsWith(".webm") ? "video/webm" : "video/mp4"}
                />
              </video>
            </PhoneFrame>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
