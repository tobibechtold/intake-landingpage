import { Link } from "react-router-dom";
import logo from "@/assets/logo-hero.png";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/i18n/LanguageContext";

const Header = () => {
  const { t } = useLanguage();
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Intake" className="w-8 h-8" />
          <span className="text-lg font-semibold text-foreground">Intake</span>
        </Link>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <a 
            href="https://apps.apple.com/us/app/intake-kalorienz%C3%A4hler/id6757768955" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            {t("download")}
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
