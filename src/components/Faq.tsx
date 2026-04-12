import { useLanguage } from "@/i18n/LanguageContext";
import { FAQ_BY_LANGUAGE } from "@/lib/faqData";

const Faq = () => {
  const { language, t } = useLanguage();
  const faqItems = FAQ_BY_LANGUAGE[language];

  return (
    <section className="section-gradient py-24">
      <div className="container max-w-4xl">
        <div id="faq" className="mb-12 scroll-mt-28 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("faqTitle")}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t("faqSubtitle")}
          </p>
        </div>

        <div className="grid gap-4">
          {faqItems.map((item) => (
            <article key={item.question} className="feature-card">
              <h3 className="text-lg font-semibold text-foreground mb-2">{item.question}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
