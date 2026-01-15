import { useLanguage } from "@/i18n/LanguageContext";
import { Language } from "@/i18n/translations";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "de" : "en");
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 px-2 py-1 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
      aria-label={`Switch to ${language === "en" ? "German" : "English"}`}
    >
      <span className={language === "en" ? "text-foreground" : "text-muted-foreground"}>EN</span>
      <span className="text-muted-foreground/50">/</span>
      <span className={language === "de" ? "text-foreground" : "text-muted-foreground"}>DE</span>
    </button>
  );
};

export default LanguageSwitcher;
