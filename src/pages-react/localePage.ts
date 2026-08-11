import type { Language } from '@/i18n/translations';

/**
 * Locale props every page component receives from its Astro route file.
 *
 * React context does not cross Astro island boundaries, so each page must own its
 * own LanguageProvider rather than inheriting one from a layout.
 */
export interface LocalePageProps {
  lang: Language;
  alternateHref: string | null;
}
