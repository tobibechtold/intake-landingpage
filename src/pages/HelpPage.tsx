import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SeoHead from "@/components/SeoHead";
import { useLanguage } from "@/i18n/LanguageContext";
import { FAQ_BY_LANGUAGE } from "@/lib/faqData";
import { buildLocalizedPath } from "@/lib/localeRouting";

const HelpPage = () => {
  const { language, t } = useLanguage();
  const faqItems = FAQ_BY_LANGUAGE[language];
  const homePath = buildLocalizedPath("home", language);

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

            <div className="mt-12 grid gap-4">
              {faqItems.map((item) => (
                <article key={item.question} className="feature-card">
                  <h2 className="mb-2 text-lg font-semibold text-foreground">{item.question}</h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
                </article>
              ))}
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
