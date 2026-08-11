import { createContext, useContext, ReactNode } from "react";
import { type Language, translations, type TranslationKey } from "./translations";

interface LanguageContextType {
  language: Language;
  /** URL of this same page in the other locale, or null if it has no counterpart. */
  alternateHref: string | null;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  lang: Language;
  alternateHref: string | null;
  children: ReactNode;
}

/**
 * Locale is now a static property of the route, resolved at build time, rather than
 * something derived from the router at runtime. Each Astro route file passes the
 * values in via pageProps(); there is no useLocation and no locale state to sync.
 */
export const LanguageProvider = ({ lang, alternateHref, children }: LanguageProviderProps) => {
  const setLanguage = (next: Language) => {
    localStorage.setItem("language", next);
  };

  const t = (key: TranslationKey): string => translations[lang][key];

  return (
    <LanguageContext.Provider value={{ language: lang, alternateHref, setLanguage, t }}>
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
