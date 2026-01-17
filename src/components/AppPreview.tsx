import { useLanguage } from "@/i18n/LanguageContext";
import appPreviewGif from "@/assets/app-preview.gif";

const AppPreview = () => {
  const { t } = useLanguage();

  return (
    <section className="section-gradient py-20 md:py-32">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 animate-fade-in">
          {t("appPreviewHeading")}
        </h2>
        
        <div className="flex justify-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <img
            src={appPreviewGif}
            alt="Intake App Preview"
            className="max-w-[90%] md:max-w-[500px] drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default AppPreview;
