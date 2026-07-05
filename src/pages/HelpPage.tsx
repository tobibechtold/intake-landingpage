import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, X } from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SeoHead from "@/components/SeoHead";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/i18n/LanguageContext";
import { FAQ_SECTIONS_BY_LANGUAGE } from "@/lib/faqData";
import { buildLocalizedPath } from "@/lib/localeRouting";

const HELP_FAQ_COPY = {
  en: {
    searchLabel: "Search FAQ",
    searchPlaceholder: "Search pricing, Intake AI, sync, privacy...",
    noResultsTitle: "No matching questions",
    noResultsBody: "Try a different search term or clear the search.",
    clearSearch: "Clear search",
  },
  de: {
    searchLabel: "FAQ durchsuchen",
    searchPlaceholder: "Preis, Intake AI, Sync, Datenschutz suchen...",
    noResultsTitle: "Keine passenden Fragen",
    noResultsBody: "Versuche einen anderen Suchbegriff oder lösche die Suche.",
    clearSearch: "Suche löschen",
  },
};

const HelpPage = () => {
  const { language, t } = useLanguage();
  const faqSections = FAQ_SECTIONS_BY_LANGUAGE[language];
  const faqCopy = HELP_FAQ_COPY[language];
  const homePath = buildLocalizedPath("home", language);
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const filteredSections = useMemo(() => {
    if (!normalizedQuery) {
      return faqSections;
    }

    return faqSections
      .map((section) => ({
        ...section,
        items: section.items.filter((item) => {
          const searchable = `${section.title} ${item.question} ${item.answer}`.toLowerCase();
          return searchable.includes(normalizedQuery);
        }),
      }))
      .filter((section) => section.items.length > 0);
  }, [faqSections, normalizedQuery]);
  const [openSections, setOpenSections] = useState<string[]>([]);

  useEffect(() => {
    if (!normalizedQuery) {
      return;
    }

    setOpenSections(filteredSections.map((section) => section.title));
  }, [filteredSections, normalizedQuery]);

  return (
    <div className="min-h-screen">
      <SeoHead />
      <Header />
      <main className="pb-24 pt-32 md:pt-36">
        <section className="section-gradient border-y border-border/50 py-20">
          <div className="container max-w-5xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="section-kicker">{t("helpNav")}</p>
              <h1 className="mt-3 text-4xl font-bold text-foreground md:text-6xl">
                {t("helpTitle")}
              </h1>
              <p className="mt-4 text-base text-muted-foreground md:text-lg">
                {t("helpSubtitle")}
              </p>
            </div>

            <div className="mx-auto mt-10 max-w-3xl">
              <label htmlFor="faq-search" className="sr-only">
                {faqCopy.searchLabel}
              </label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="faq-search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={faqCopy.searchPlaceholder}
                  className="h-12 rounded-full border-border/70 bg-background/85 pl-11 pr-12 shadow-[0_18px_60px_-42px_rgba(255,76,145,0.65)]"
                />
                {query ? (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("");
                      setOpenSections([]);
                    }}
                    className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    aria-label={faqCopy.clearSearch}
                  >
                    <X className="h-4 w-4" />
                  </button>
                ) : null}
              </div>
            </div>

            <div className="mt-10">
              {filteredSections.length > 0 ? (
                <Accordion
                  type="multiple"
                  value={openSections}
                  onValueChange={setOpenSections}
                  className="space-y-4"
                >
                  {filteredSections.map((section) => (
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
              ) : (
                <div className="rounded-2xl border border-dashed border-border/70 bg-card/45 p-8 text-center">
                  <h2 className="text-xl font-semibold text-foreground">{faqCopy.noResultsTitle}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {faqCopy.noResultsBody}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-12 rounded-[2rem] border border-border/60 bg-card/50 p-8 text-center shadow-[0_24px_80px_-56px_rgba(255,76,145,0.65)]">
              <p className="section-kicker">{t("download")}</p>
              <h2 className="mt-3 text-2xl font-semibold text-foreground md:text-3xl">
                {t("helpCtaTitle")}
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground md:text-base">
                {t("helpCtaDescription")}
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <Link to={`${homePath}#hero`} className="trust-chip-link">
                  {t("helpCtaButton")}
                </Link>
                <Link
                  to={buildLocalizedPath("features", language)}
                  className="trust-chip-link"
                >
                  {t("featuresNav")}
                </Link>
                <Link
                  to={buildLocalizedPath("comparisons", language)}
                  className="trust-chip-link"
                >
                  {t("comparisonsNav")}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HelpPage;
