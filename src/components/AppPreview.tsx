import { useLanguage } from "@/i18n/LanguageContext";
import PhoneFrame from "./PhoneFrame";

const AppPreview = () => {
  const { t, language } = useLanguage();
  const videoSrc = language === "de" ? "/promo-video-de.mp4" : "/promo-video-en.mp4";

  return (
    <section className="section-gradient py-20 md:py-32">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 animate-fade-in">
          {t("appPreviewHeading")}
        </h2>
        
        <div className="flex justify-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="max-w-[280px] md:max-w-[320px]">
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
    </section>
  );
};

export default AppPreview;
