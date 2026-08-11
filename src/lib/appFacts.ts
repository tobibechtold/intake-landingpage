import { t } from '@/i18n/t';
import type { Language } from '@/i18n/translations';

/**
 * The app's price and store rating, in one place.
 *
 * Every rendered price and rating on the site reads from here, and so does the JSON-LD in
 * structuredData.ts. That is deliberate: Google requires structured data to match what the
 * page displays, so a number that drifts between the two is the kind of mismatch that
 * draws a manual action rather than a rich result. Changing a value here changes it
 * everywhere at once — there are no other copies.
 */

/**
 * Priced per storefront, so each language shows — and declares in `offers` — the currency
 * its readers actually pay in. The App Store localises further than these two tiers; these
 * are the German and US prices, which is what the two versions of the page speak to.
 */
export const APP_PRICE = {
  de: { amount: 6.99, currency: 'EUR' },
  en: { amount: 5.99, currency: 'USD' },
} as const;

export const APP_RATING = {
  /** The App Store average. Shown in the hero, the reviews summary and `aggregateRating`. */
  value: 4.8,
  /** Real number of App Store ratings; null omits `aggregateRating` entirely. */
  count: 310 as number | null,
} as const;

const locale = (lang: Language) => (lang === 'de' ? 'de-DE' : 'en-US');

/** "6,99 €" in German, "$5.99" in English. */
export const formatAppPrice = (lang: Language): string =>
  new Intl.NumberFormat(locale(lang), {
    style: 'currency',
    currency: APP_PRICE[lang].currency,
  }).format(APP_PRICE[lang].amount);

/** "4,8" in German, "4.8" in English. */
export const formatRating = (lang: Language): string =>
  new Intl.NumberFormat(locale(lang), {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(APP_RATING.value);

/** "4,8 App-Store-Bewertung" — the translation carries a {rating} placeholder. */
export const ratingLabel = (lang: Language): string =>
  t(lang, 'heroTrustRating').replace('{rating}', formatRating(lang));
