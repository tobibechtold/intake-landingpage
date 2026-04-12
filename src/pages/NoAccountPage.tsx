import MarketingPageLayout from "@/components/MarketingPageLayout";
import { useLanguage } from "@/i18n/LanguageContext";
import { getMarketingPageContent } from "@/lib/marketingPages";
import { buildLocalizedPath } from "@/lib/localeRouting";

const NoAccountPage = () => {
  const { language, t } = useLanguage();
  const content = getMarketingPageContent("noAccount", language);

  return (
    <MarketingPageLayout
      language={language}
      breadcrumbs={[
        { label: t("homeNav"), href: buildLocalizedPath("home", language) },
        { label: t("noAccountNav") },
      ]}
      kicker={content.kicker}
      title={content.title}
      description={content.description}
      sections={content.sections}
      relatedLinks={content.relatedLinks}
    />
  );
};

export default NoAccountPage;
