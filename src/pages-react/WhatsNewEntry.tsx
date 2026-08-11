import Footer from "@/components/Footer";
import Header from "@/components/Header";
import WhatsNewArticle from "@/components/WhatsNewArticle";
import { useLanguage } from "@/i18n/LanguageContext";
import { getWhatsNewEntry } from "@/lib/whatsNewContent";
import NotFound from "./NotFound";

const WhatsNewEntry = ({ version }: { version: string }) => {
  const { language } = useLanguage();

  if (!version) {
    return <NotFound />;
  }

  const entry = getWhatsNewEntry(version, language);
  if (!entry) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="section-gradient min-h-screen pt-28 pb-20">
        <div className="container max-w-4xl">
          <WhatsNewArticle entry={entry} language={language} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WhatsNewEntry;
