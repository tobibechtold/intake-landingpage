import { FAQ_SECTIONS_BY_LANGUAGE } from './faqData';
import { SITE_ORIGIN, getPageSeo } from './pageSeo';
import { translations, type Language } from '@/i18n/translations';

/**
 * JSON-LD builders.
 *
 * Rule for everything here: only describe what the page actually shows. Google treats
 * structured data that misrepresents visible content as spam, and the penalty is a
 * manual action on the whole property — a bad trade for a rich result.
 *
 * That rule is why `aggregateRating` and the app price are behind APP_FACTS below and
 * currently omitted: the site displays "4,9 App-Store-Bewertung" with no rating count,
 * and never shows the app's own price. Both are required to be real and verifiable.
 */

/** iOS app id, as used by the Smart App Banner in BaseLayout. */
const APP_STORE_ID = '6757768955';
const PLAY_ID = 'de.bechtoldit.intake';

export const APP_FACTS = {
  /**
   * Fill both in from App Store Connect to enable the rating rich result. `ratingValue`
   * must match what the page displays (4.9) and `ratingCount` must be the real number of
   * ratings — Google requires a count and validates it against the visible page.
   */
  ratingValue: 4.9 as number | null,
  ratingCount: null as number | null,

  /**
   * The one-time purchase price. Left null because no page currently renders it; if the
   * site starts showing it, set it here and it will appear in `offers`.
   */
  price: null as number | null,
  priceCurrency: 'EUR',
};

const appName = 'Intake';

export const softwareApplication = (lang: Language, route: string) => {
  const seo = getPageSeo(route);

  const node: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    name: appName,
    description: seo.description,
    applicationCategory: 'HealthApplication',
    operatingSystem: 'iOS, Android',
    url: seo.canonical,
    image: new URL('/og-image.png', SITE_ORIGIN).href,
    inLanguage: lang,
    downloadUrl: [
      `https://apps.apple.com/app/id${APP_STORE_ID}`,
      `https://play.google.com/store/apps/details?id=${PLAY_ID}`,
    ],
  };

  // Only emitted when both the value and a real count are known.
  if (APP_FACTS.ratingValue != null && APP_FACTS.ratingCount != null) {
    node.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: APP_FACTS.ratingValue,
      ratingCount: APP_FACTS.ratingCount,
      bestRating: 5,
      worstRating: 1,
    };
  }

  if (APP_FACTS.price != null) {
    node.offers = {
      '@type': 'Offer',
      price: APP_FACTS.price,
      priceCurrency: APP_FACTS.priceCurrency,
      availability: 'https://schema.org/InStock',
    };
  }

  return node;
};

/**
 * Built from the same FAQ_SECTIONS_BY_LANGUAGE the help page renders, so the markup
 * cannot drift from what a visitor sees — a requirement for FAQPage.
 */
export const faqPage = (lang: Language) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  inLanguage: lang,
  mainEntity: FAQ_SECTIONS_BY_LANGUAGE[lang].flatMap((section) =>
    section.items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  ),
});

export interface Crumb {
  label: string;
  href?: string;
}

export const breadcrumbList = (items: Crumb[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.label,
    ...(item.href ? { item: new URL(item.href, SITE_ORIGIN).href } : {}),
  })),
});

export const organization = (lang: Language) => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: appName,
  url: SITE_ORIGIN,
  logo: new URL('/favicon-512x512.png', SITE_ORIGIN).href,
  description: translations[lang].heroDescription,
  sameAs: [
    'https://www.instagram.com/getintake.app/',
    'https://www.threads.com/@getintake.app',
  ],
});

export interface ReleaseArticle {
  version: string;
  title: string;
  summary: string;
  publishedAt: string;
  coverImage: string;
  url: string;
}

/**
 * Release notes are dated, titled, authored articles — the one schema type that fits
 * them honestly. Every field maps to something the page renders.
 */
export const releaseArticle = (lang: Language, entry: ReleaseArticle) => ({
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: entry.title,
  description: entry.summary,
  datePublished: entry.publishedAt,
  inLanguage: lang,
  image: new URL(entry.coverImage, SITE_ORIGIN).href,
  mainEntityOfPage: { '@type': 'WebPage', '@id': new URL(entry.url, SITE_ORIGIN).href },
  publisher: organization(lang),
  about: { '@type': 'MobileApplication', name: appName },
});
