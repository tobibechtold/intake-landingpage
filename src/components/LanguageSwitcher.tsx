import { useLanguage } from "@/i18n/LanguageContext";

/**
 * A plain anchor. Every route is a static document now, so switching locale is an
 * ordinary navigation — no router, no client JS, and it works before hydration.
 * The destination comes from the hreflang pair already computed for the page.
 */
const LanguageSwitcher = () => {
  const { language, alternateHref } = useLanguage();

  if (!alternateHref) {
    return null;
  }

  return (
    <a
      href={alternateHref}
      className="flex items-center gap-1.5 px-2 py-1 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
      aria-label={`Switch to ${language === "en" ? "German" : "English"}`}
      data-language-switch={language === "en" ? "de" : "en"}
    >
      <span className={language === "en" ? "text-foreground" : "text-muted-foreground"}>EN</span>
      <span className="text-muted-foreground/50">/</span>
      <span className={language === "de" ? "text-foreground" : "text-muted-foreground"}>DE</span>
    </a>
  );
};

export default LanguageSwitcher;
