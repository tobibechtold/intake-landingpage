import { LanguageProvider } from "@/i18n/LanguageContext";
import type { LocalePageProps } from "./localePage";
import { useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { buildLocalizedPath } from "@/lib/localeRouting";

const NotFoundInner = () => {
  const { language } = useLanguage();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", window.location.pathname);
  }, []);

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-muted">
        <div className="text-center">
          <h1 className="mb-4 text-4xl">404</h1>
          <p className="mb-4 text-xl text-muted-foreground">
            {language === "de" ? "Seite nicht gefunden" : "Oops! Page not found"}
          </p>
          <a
            href={buildLocalizedPath("home", language)}
            className="text-primary underline hover:text-primary/90"
          >
            {language === "de" ? "Zur Startseite" : "Return to Home"}
          </a>
        </div>
      </div>
    </>
  );
};

const NotFound = ({ lang, alternateHref }: LocalePageProps) => (
  <LanguageProvider lang={lang} alternateHref={alternateHref}>
    <NotFoundInner />
  </LanguageProvider>
);

export default NotFound;
