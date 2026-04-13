import { Link } from "react-router-dom";
import logo from "@/assets/logo-hero.webp";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/i18n/LanguageContext";
import { buildLocalizedPath } from "@/lib/localeRouting";
import { getNavbarDownloadUrl } from "@/lib/storeLinks";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const FEATURE_VOTING_URL = "https://featurevoting.tobibechtold.dev/app/intake";

const Header = () => {
  const { t, language } = useLanguage();
  const homePath = buildLocalizedPath("home", language);
  const downloadHref = getNavbarDownloadUrl(
    language,
    typeof navigator === "undefined" ? "" : navigator.userAgent,
    `${homePath}#hero`,
  );
  const isDownloadExternal = /^https?:\/\//.test(downloadHref);
  const navItems = [
    { label: t("featuresNav"), href: buildLocalizedPath("features", language) },
    { label: t("switchWhy"), href: `${homePath}#why-switch` },
    { label: t("comparisonsNav"), href: buildLocalizedPath("comparisons", language) },
    { label: t("updatesNav"), href: buildLocalizedPath("whatsNewIndex", language) },
    { label: t("featureVotingNav"), href: FEATURE_VOTING_URL, external: true },
    { label: t("faqTitle"), href: `${homePath}#faq` },
  ];
  const desktopNavItemClassName =
    "text-sm font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/55 focus-visible:ring-offset-2 focus-visible:ring-offset-background";
  const mobileNavItemClassName =
    "rounded-full border border-border/60 bg-background/70 px-4 py-3 text-base font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/55 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  const renderNavItem = (
    item: { label: string; href: string; external?: boolean },
    className: string,
  ) => {
    if (item.external) {
      return (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {item.label}
        </a>
      );
    }

    return (
      <Link to={item.href} className={className}>
        {item.label}
      </Link>
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div
        data-site-header-shell
        className="container mt-4 flex h-16 items-center justify-between rounded-full border border-border/60 bg-background/80 px-5 shadow-[0_20px_60px_-40px_rgba(255,76,145,0.6)] backdrop-blur-xl"
      >
        <Link to={homePath} className="flex items-center gap-3">
          <img src={logo} alt="Intake" className="h-8 w-8" />
          <span className="text-lg font-semibold text-foreground">Intake</span>
        </Link>
        <div className="hidden items-center gap-5 lg:flex">
          {navItems.map((item) => (
            <div key={item.label} className="flex items-center">
              {renderNavItem(item, desktopNavItemClassName)}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="rounded-full lg:hidden"
                aria-label={language === "de" ? "Navigation öffnen" : "Open navigation"}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-sm border-border/60 bg-background/95">
              <SheetHeader className="sr-only">
                <SheetTitle>{language === "de" ? "Navigation" : "Navigation"}</SheetTitle>
                <SheetDescription>
                  {language === "de"
                    ? "Springe zu Funktionen, Vergleichen, FAQ und weiteren Seiten."
                    : "Jump to features, comparisons, FAQ, and other pages."}
                </SheetDescription>
              </SheetHeader>
              <div className="mt-8 flex flex-col gap-3">
                <Link to={homePath} className="mb-4 flex items-center gap-3">
                  <img src={logo} alt="Intake" className="h-8 w-8" />
                  <span className="text-lg font-semibold text-foreground">Intake</span>
                </Link>
                {navItems.map((item) => (
                  <SheetClose asChild key={item.label}>
                    {renderNavItem(item, mobileNavItemClassName)}
                  </SheetClose>
                ))}
                <div className="mt-2">
                  <Button asChild className="w-full rounded-full">
                    <a
                      href={downloadHref}
                      target={isDownloadExternal ? "_blank" : undefined}
                      rel={isDownloadExternal ? "noopener noreferrer" : undefined}
                    >
                      {t("download")}
                    </a>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <LanguageSwitcher />
          <Button asChild size="sm" className="hidden rounded-full px-4 sm:inline-flex">
            <a
              href={downloadHref}
              target={isDownloadExternal ? "_blank" : undefined}
              rel={isDownloadExternal ? "noopener noreferrer" : undefined}
            >
              {t("download")}
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
