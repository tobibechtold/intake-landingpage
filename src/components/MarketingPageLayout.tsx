import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import SeoHead from "@/components/SeoHead";
import { Language } from "@/i18n/translations";
import { MarketingSection, RelatedLink } from "@/lib/marketingPages";
import { buildLocalizedPath, SitePage } from "@/lib/localeRouting";
import { getScreenshotAsset } from "@/lib/screenshotAssets";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface MarketingPageLayoutProps {
  language: Language;
  breadcrumbs: Array<{ label: string; href?: string }>;
  kicker: string;
  title: string;
  description: string;
  sections: MarketingSection[];
  relatedLinks: RelatedLink[];
}

const getRelatedHref = (language: Language, link: RelatedLink) => {
  if (link.detail) {
    return buildLocalizedPath("comparisonDetail", language, link.detail);
  }

  return buildLocalizedPath(link.page as SitePage, language);
};

const MarketingPageLayout = ({
  language,
  breadcrumbs,
  kicker,
  title,
  description,
  sections,
  relatedLinks,
}: MarketingPageLayoutProps) => (
  <div className="min-h-screen">
    <SeoHead />
    <Header />
    <main className="pt-28">
      <section className="hero-gradient overflow-hidden pb-14 pt-8 md:pb-20">
        <div className="container">
          <PageBreadcrumbs items={breadcrumbs} />
          <div className="mx-auto max-w-4xl text-left">
            <p className="section-kicker">{kicker}</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight text-foreground md:text-6xl">
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">
              {description}
            </p>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-20">
        <div className="container space-y-10">
          {sections.map((section, index) => {
            const screenshot = section.screenshot
              ? getScreenshotAsset(language, section.screenshot)
              : null;

            return (
              <article
                key={section.id}
                className={cn(
                  "proof-story-card border-border/70",
                  !screenshot && "proof-story-card--text-only",
                )}
              >
                {screenshot ? (
                  <div className={`${index % 2 === 1 ? "md:order-2" : ""} proof-story-media`}>
                    <figure className="mx-auto w-full max-w-[340px]">
                      <img
                        src={screenshot.src}
                        alt={screenshot.alt}
                        loading="lazy"
                        decoding="async"
                        className="h-auto w-full rounded-[2rem] border border-white/10 shadow-[0_30px_80px_-60px_rgba(255,76,145,0.85)]"
                      />
                      <figcaption className="mt-3 text-sm text-muted-foreground">
                        {screenshot.caption}
                      </figcaption>
                    </figure>
                  </div>
                ) : null}

                <div
                  className={cn(
                    index % 2 === 1 ? "md:order-1" : "",
                    "proof-story-copy",
                    !screenshot && "proof-story-copy--full",
                  )}
                >
                  <h2 className="text-2xl font-semibold text-foreground md:text-3xl">
                    {section.title}
                  </h2>
                  <p className="mt-4 text-base leading-7 text-muted-foreground">{section.body}</p>
                  {section.bullets?.length ? (
                    <ul className="mt-5 flex flex-wrap gap-3">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="trust-chip">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="pb-12">
        <div className="container">
          <div className="glass-card p-8 md:p-10">
            <h2 className="text-2xl font-semibold text-foreground md:text-3xl">
              {language === "de" ? "Weiterführende Seiten" : "Related pages"}
            </h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {relatedLinks.map((link) => (
                <Link key={link.label} to={getRelatedHref(language, link)} className="trust-chip">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </main>
    <Footer />
  </div>
);

export default MarketingPageLayout;
