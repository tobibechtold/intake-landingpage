import { ShieldCheck, UserRoundX, Wallet } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const WhySwitch = () => {
  const { t } = useLanguage();

  const items = [
    {
      icon: Wallet,
      title: t("whySwitchSubscriptionsTitle"),
      body: t("whySwitchSubscriptionsBody"),
      benefit: t("whySwitchSubscriptionsBenefit"),
    },
    {
      icon: UserRoundX,
      title: t("whySwitchAccountTitle"),
      body: t("whySwitchAccountBody"),
      benefit: t("whySwitchAccountBenefit"),
    },
    {
      icon: ShieldCheck,
      title: t("whySwitchPrivacyTitle"),
      body: t("whySwitchPrivacyBody"),
      benefit: t("whySwitchPrivacyBenefit"),
    },
  ];

  return (
    <section id="why-switch" className="section-gradient py-20 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="section-kicker">{t("heroSecondaryCta")}</p>
          <h2 className="mt-3 text-3xl font-bold text-foreground md:text-5xl">
            {t("whySwitchTitle")}
          </h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            {t("whySwitchSubtitle")}
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {items.map((item) => (
            <article key={item.title} className="feature-card flex h-full flex-col p-7">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.body}</p>
              <p className="mt-5 text-sm font-medium text-primary">{item.benefit}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySwitch;
