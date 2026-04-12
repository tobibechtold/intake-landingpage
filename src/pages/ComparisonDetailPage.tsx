import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import SeoHead from "@/components/SeoHead";
import { useLanguage } from "@/i18n/LanguageContext";
import { getComparisonPageContent, isComparisonSlug } from "@/lib/marketingPages";
import { buildLocalizedPath } from "@/lib/localeRouting";
import { Link, useParams } from "react-router-dom";

const ComparisonDetailPage = () => {
  const { language, t } = useLanguage();
  const { slug } = useParams();
  const comparisonSlug = isComparisonSlug(slug) ? slug : "yazio-alternative";
  const content = getComparisonPageContent(comparisonSlug, language);

  return (
    <div className="min-h-screen">
      <SeoHead />
      <Header />
      <main className="pt-28">
        <section className="hero-gradient overflow-hidden pb-14 pt-8 md:pb-20">
          <div className="container">
            <PageBreadcrumbs
              items={[
                { label: t("homeNav"), href: buildLocalizedPath("home", language) },
                { label: t("comparisonsNav"), href: buildLocalizedPath("comparisons", language) },
                { label: content.kicker },
              ]}
            />
            <div className="mx-auto max-w-4xl text-left">
              <p className="section-kicker">{content.kicker}</p>
              <h1 className="mt-4 text-4xl font-bold leading-tight text-foreground md:text-6xl">
                {content.title}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground md:text-xl">
                {content.description}
              </p>
            </div>
          </div>
        </section>

        <section className="pb-12">
          <div className="container">
            <div className="glass-card overflow-hidden">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="border-b border-border/60 text-left">
                    <th className="px-5 py-4 text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                      {language === "de" ? "Kriterium" : "Criteria"}
                    </th>
                    <th className="bg-primary/10 px-5 py-4 text-sm font-semibold text-foreground">
                      Intake
                    </th>
                    <th className="px-5 py-4 text-sm font-semibold text-foreground/80">
                      {content.kicker.replace(/ Alternative.*/, "")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {content.criteria.map((criterion) => (
                    <tr key={criterion.label} className="border-b border-border/50 last:border-0">
                      <th className="px-5 py-4 text-left text-sm font-medium text-foreground">
                        {criterion.label}
                      </th>
                      <td className="bg-primary/5 px-5 py-4 text-sm text-foreground">
                        {criterion.intake}
                      </td>
                      <td className="px-5 py-4 text-sm text-muted-foreground">{criterion.other}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
              <article className="glass-card p-8">
                <h2 className="text-2xl font-semibold text-foreground">
                  {language === "de" ? "Fazit" : "Summary"}
                </h2>
                <p className="mt-4 text-base leading-7 text-muted-foreground">
                  {content.conclusion}
                </p>
              </article>

              <aside className="glass-card p-8">
                <h2 className="text-2xl font-semibold text-foreground">
                  {language === "de" ? "Worauf es ankommt" : "What matters here"}
                </h2>
                <ul className="mt-5 space-y-3">
                  {content.takeaways.map((takeaway) => (
                    <li key={takeaway} className="text-sm leading-6 text-muted-foreground">
                      {takeaway}
                    </li>
                  ))}
                </ul>
              </aside>
            </div>

            <div className="mt-6">
              <aside className="glass-card p-8">
                <h2 className="text-2xl font-semibold text-foreground">
                  {language === "de" ? "Nächste Schritte" : "Next steps"}
                </h2>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    to={buildLocalizedPath("comparisons", language)}
                    className="trust-chip"
                  >
                    {language === "de" ? "Alle Vergleiche" : "All comparisons"}
                  </Link>
                  <Link to={buildLocalizedPath("features", language)} className="trust-chip">
                    {language === "de" ? "Alle Funktionen" : "Features"}
                  </Link>
                  <Link to={buildLocalizedPath("home", language)} className="trust-chip">
                    {t("homeNav")}
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default ComparisonDetailPage;
