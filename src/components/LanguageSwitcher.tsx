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
      className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] px-2.5 py-1.5 text-[13px] font-medium transition-colors hover:border-white/[0.18]"
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
