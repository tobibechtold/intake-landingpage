import { Shield, Barcode, Heart, Database, Cloud, Target } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { TranslationKey } from "@/i18n/translations";

const Features = () => {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: Shield,
      titleKey: "privacyFirst" as TranslationKey,
      descKey: "privacyFirstDesc" as TranslationKey,
    },
    {
      icon: Target,
      titleKey: "reachGoals" as TranslationKey,
      descKey: "reachGoalsDesc" as TranslationKey,
    },
    {
      icon: Database,
      titleKey: "millionFoods" as TranslationKey,
      descKey: "millionFoodsDesc" as TranslationKey,
    },
    {
      icon: Barcode,
      titleKey: "barcodeScanner" as TranslationKey,
      descKey: "barcodeScannerDesc" as TranslationKey,
    },
    {
      icon: Heart,
      titleKey: "appleHealthSync" as TranslationKey,
      descKey: "appleHealthSyncDesc" as TranslationKey,
    },
    {
      icon: Cloud,
      titleKey: "icloudSync" as TranslationKey,
      descKey: "icloudSyncDesc" as TranslationKey,
    },
  ];

  return (
    <section className="section-gradient py-24">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("featuresTitle")}{" "}
            <span className="gradient-text">{t("featuresTitleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            {t("featuresSubtitle")}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={feature.titleKey} 
              className="feature-card animate-fade-in opacity-0"
              style={{ animationDelay: `${0.1 * (index + 1)}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {t(feature.titleKey)}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t(feature.descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
