import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SeoHead from "@/components/SeoHead";
import WhatsNewList from "@/components/WhatsNewList";
import { useLanguage } from "@/i18n/LanguageContext";
import { getWhatsNewEntries } from "@/lib/whatsNewContent";

const CHANGELOG_URL = "https://featurevoting.tobibechtold.dev/app/intake/changelog";

const WhatsNewIndex = () => {
  const { language } = useLanguage();
  const entries = getWhatsNewEntries(language);

  return (
    <div className="min-h-screen">
      <SeoHead />
      <Header />
      <main className="section-gradient min-h-screen pt-28 pb-20">
        <div className="container space-y-10">
          <div className="max-w-3xl space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-primary">
              {language === "de" ? "Produktupdates" : "Product updates"}
            </p>
            <h1 className="text-4xl font-bold text-foreground md:text-6xl">
              {language === "de" ? "Was ist neu" : "What's New"}
            </h1>
            <p className="text-base text-muted-foreground md:text-lg">
              {language === "de"
                ? "Neue Funktionen, Verbesserungen und kleine Details zu jeder Version ab 2.1.1."
                : "New features, improvements, and release notes for every version starting with 2.1.1."}
            </p>
          </div>

          <section className="glass-card flex flex-col gap-4 rounded-[2rem] border border-border/70 p-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl space-y-2">
              <h2 className="text-xl font-semibold text-foreground">
                {language === "de" ? "Vollständigen Changelog ansehen" : "View the full changelog"}
              </h2>
              <p className="text-sm text-muted-foreground md:text-base">
                {language === "de"
                  ? "Diese Seite hebt größere Produktupdates hervor. Den vollständigen chronologischen Changelog findest du im Feature-Voting-Tool."
                  : "This page highlights bigger product updates. The full chronological changelog lives in the feature voting tool."}
              </p>
            </div>
            <a
              href={CHANGELOG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-primary/40 px-4 py-2 text-sm font-medium text-primary transition-colors hover:border-primary hover:bg-primary/10"
            >
              {language === "de" ? "Changelog öffnen" : "Open changelog"}
            </a>
          </section>

          <WhatsNewList entries={entries} language={language} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WhatsNewIndex;
