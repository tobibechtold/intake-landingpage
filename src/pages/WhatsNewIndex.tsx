import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SeoHead from "@/components/SeoHead";
import WhatsNewList from "@/components/WhatsNewList";
import { useLanguage } from "@/i18n/LanguageContext";
import { getWhatsNewEntries } from "@/lib/whatsNewContent";

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

          <WhatsNewList entries={entries} language={language} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WhatsNewIndex;
