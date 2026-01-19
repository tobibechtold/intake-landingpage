import { useLanguage } from "@/i18n/LanguageContext";
import PhoneFrame from "./PhoneFrame";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const AppPreview = () => {
  const { t, language } = useLanguage();
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const videoSrc = language === "de" ? "/promo-video-de.mp4" : "/promo-video-en.mp4";

  return (
    <section ref={ref} className="section-gradient py-20 md:py-32">
      <div className="container mx-auto px-4">
        <h2 
          className={`text-3xl md:text-4xl font-bold text-center mb-12 opacity-0 ${
            isVisible ? 'animate-fade-up' : ''
          }`}
        >
          {t("appPreviewHeading")}
        </h2>
        
        <div 
          className={`flex justify-center opacity-0 ${isVisible ? 'animate-fade-scale' : ''}`}
          style={{ animationDelay: "0.2s" }}
        >
          <div className="max-w-[280px] md:max-w-[320px] animate-float" style={{ animationDelay: "0.5s" }}>
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
