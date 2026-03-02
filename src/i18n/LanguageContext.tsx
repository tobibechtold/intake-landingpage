import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Language, translations, TranslationKey } from "./translations";
import { useLocation } from "react-router-dom";
import { getLocaleFromPathname } from "@/lib/localeRouting";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      return getLocaleFromPathname(window.location.pathname);
    }

    const stored = localStorage.getItem("language");
    if (stored === "en" || stored === "de") return stored;
    
    // Detect browser language
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith("de")) return "de";
    return "en";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: TranslationKey): string => {
    return translations[language][key];
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    const pathLanguage = getLocaleFromPathname(location.pathname);
    if (pathLanguage !== language) {
      setLanguageState(pathLanguage);
      localStorage.setItem("language", pathLanguage);
    }
  }, [location.pathname, language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
