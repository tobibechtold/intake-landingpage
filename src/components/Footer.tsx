import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { useLanguage } from "@/i18n/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border/50 bg-card/30">
      <div className="container py-12">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Intake" className="w-8 h-8" />
            <span className="text-lg font-semibold text-foreground">Intake</span>
          </div>

          <div className="flex flex-col md:flex-row gap-6 md:gap-12">
            <div className="flex flex-col gap-3">
              <span className="text-sm font-semibold text-foreground">{t("legal")}</span>
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {t("privacyPolicy")}
              </Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {t("termsOfUse")}
              </Link>
              <a
                href="https://tobibechtold.dev/impressum"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t("imprint")}
              </a>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-sm font-semibold text-foreground">{t("app")}</span>
              <a
                href="https://apps.apple.com/us/app/intake-kalorienz%C3%A4hler/id6757768955"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t("appStore")}
              </a>
              <span className="text-sm text-muted-foreground/50 cursor-default">
                {t("googlePlay")} ({t("comingSoonBadge")})
              </span>
              <a
                href="https://featurevoting.tobibechtold.dev/app/intake/changelog"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t("changelog")}
              </a>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-sm font-semibold text-foreground">{t("social")}</span>
              <a
                href="https://www.instagram.com/getintake.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://www.threads.com/@getintake.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Threads
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/50">
          <p className="text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} Intake. {t("allRightsReserved")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
