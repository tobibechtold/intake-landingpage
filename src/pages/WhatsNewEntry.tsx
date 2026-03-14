import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SeoHead from "@/components/SeoHead";
import WhatsNewArticle from "@/components/WhatsNewArticle";
import { useLanguage } from "@/i18n/LanguageContext";
import { getWhatsNewEntry } from "@/lib/whatsNewContent";
import NotFound from "./NotFound";
import { useParams } from "react-router-dom";

const WhatsNewEntry = () => {
  const { language } = useLanguage();
  const { version } = useParams<{ version: string }>();

  if (!version) {
    return <NotFound />;
  }

  const entry = getWhatsNewEntry(version, language);
  if (!entry) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen">
      <SeoHead />
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
