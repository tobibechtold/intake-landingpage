import { useLanguage } from "@/i18n/LanguageContext";
import { FAQ_SECTIONS_BY_LANGUAGE } from "@/lib/faqData";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Faq = () => {
  const { language, t } = useLanguage();
  const faqSections = FAQ_SECTIONS_BY_LANGUAGE[language];

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

        <Accordion type="multiple" className="space-y-4">
          {faqSections.map((section) => (
            <AccordionItem
              key={section.title}
              value={section.title}
              className="rounded-2xl border border-border/60 bg-card/55 px-5 shadow-[0_24px_80px_-60px_rgba(255,76,145,0.45)]"
            >
              <AccordionTrigger className="py-5 text-left text-lg font-semibold text-foreground hover:no-underline">
                <span>{section.title}</span>
              </AccordionTrigger>
              <AccordionContent className="pb-5">
                <Accordion type="single" collapsible className="divide-y divide-border/60">
                  {section.items.map((item) => (
                    <AccordionItem key={item.question} value={item.question} className="border-0">
                      <AccordionTrigger className="py-4 text-left text-sm font-semibold text-foreground hover:no-underline">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="pb-4 text-sm leading-relaxed text-muted-foreground">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default Faq;
