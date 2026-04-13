import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { useLanguage } from "@/i18n/LanguageContext";
import { buildLocalizedPath } from "@/lib/localeRouting";
import { getAppStoreUrl, getGooglePlayUrl } from "@/lib/storeLinks";

const FEATURE_VOTING_URL = "https://featurevoting.tobibechtold.dev/app/intake";
const CHANGELOG_URL = "https://featurevoting.tobibechtold.dev/app/intake/changelog";

const Footer = () => {
  const { t, language } = useLanguage();

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
              <span className="text-sm font-semibold text-foreground">{t("discover")}</span>
              <Link
                to={buildLocalizedPath("features", language)}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t("featuresNav")}
              </Link>
              <Link
                to={buildLocalizedPath("noSubscription", language)}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t("noSubscriptionNav")}
              </Link>
              <Link
                to={buildLocalizedPath("noAccount", language)}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t("noAccountNav")}
              </Link>
              <Link
                to={buildLocalizedPath("comparisons", language)}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t("comparisonsNav")}
              </Link>
              <Link
                to={buildLocalizedPath("help", language)}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t("helpNav")}
              </Link>
              <Link
                to={buildLocalizedPath("comparisonDetail", language, "yazio-alternative")}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t("yazioAlternative")}
              </Link>
              <Link
                to={buildLocalizedPath("comparisonDetail", language, "fddb-alternative")}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t("fddbAlternative")}
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-sm font-semibold text-foreground">{t("legal")}</span>
              <Link to={buildLocalizedPath("privacy", language)} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {t("privacyPolicy")}
              </Link>
              <Link to={buildLocalizedPath("terms", language)} className="text-sm text-muted-foreground hover:text-primary transition-colors">
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
                href={getAppStoreUrl(language)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t("appStore")}
              </a>
              <a
                href={getGooglePlayUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t("googlePlay")}
              </a>
              <Link
                to={buildLocalizedPath("whatsNewIndex", language)}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t("whatsNew")}
              </Link>
              <a
                href={FEATURE_VOTING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t("featureVotingNav")}
              </a>
              <a
                href={CHANGELOG_URL}
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
