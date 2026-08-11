import { LanguageProvider } from "@/i18n/LanguageContext";
import type { LocalePageProps } from "./localePage";
import WhatsNewArticle from "@/components/WhatsNewArticle";
import { useLanguage } from "@/i18n/LanguageContext";
import type { ReleaseSummary } from "@/lib/releases";
import type { ReactNode } from "react";

const WhatsNewEntryInner = ({
  entry,
  children,
}: {
  entry: ReleaseSummary;
  children?: ReactNode;
}) => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen">
      <main className="section-gradient min-h-screen pt-28 pb-20">
        <div className="container max-w-4xl">
          <WhatsNewArticle entry={entry} language={language}>{children}</WhatsNewArticle>
        </div>
      </main>
    </div>
  );
};

const WhatsNewEntry = ({
  lang,
  alternateHref,
  entry,
  children,
}: LocalePageProps & { entry: ReleaseSummary; children?: ReactNode }) => (
  <LanguageProvider lang={lang} alternateHref={alternateHref}>
    <WhatsNewEntryInner entry={entry}>{children}</WhatsNewEntryInner>
  </LanguageProvider>
);

export default WhatsNewEntry;
