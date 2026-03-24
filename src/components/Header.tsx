import { Link } from "react-router-dom";
import logo from "@/assets/logo-hero.webp";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/i18n/LanguageContext";
import { buildLocalizedPath } from "@/lib/localeRouting";
import { getAppStoreUrl } from "@/lib/storeLinks";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { t, language } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="container mt-4 flex h-16 items-center justify-between rounded-full border border-border/60 bg-background/80 px-5 shadow-[0_20px_60px_-40px_rgba(255,76,145,0.6)] backdrop-blur-xl">
        <Link to={buildLocalizedPath("home", language)} className="flex items-center gap-3">
          <img src={logo} alt="Intake" className="h-8 w-8" />
          <span className="text-lg font-semibold text-foreground">Intake</span>
        </Link>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <a
            href="#why-switch"
            className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground md:inline"
          >
            {t("switchWhy")}
          </a>
          <Button asChild size="sm" className="rounded-full px-4">
            <a href={getAppStoreUrl(language)} target="_blank" rel="noopener noreferrer">
              {t("download")}
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
