import MarketingPageLayout from "@/components/MarketingPageLayout";
import { useLanguage } from "@/i18n/LanguageContext";
import { getMarketingPageContent } from "@/lib/marketingPages";
import { buildLocalizedPath } from "@/lib/localeRouting";

const NoSubscriptionPage = () => {
  const { language, t } = useLanguage();
  const content = getMarketingPageContent("noSubscription", language);

  return (
    <MarketingPageLayout
      language={language}
      breadcrumbs={[
        { label: t("homeNav"), href: buildLocalizedPath("home", language) },
        { label: t("noSubscriptionNav") },
      ]}
      kicker={content.kicker}
      title={content.title}
      description={content.description}
      sections={content.sections}
      relatedLinks={content.relatedLinks}
    />
  );
};

export default NoSubscriptionPage;
