import { LanguageProvider } from "@/i18n/LanguageContext";
import type { LocalePageProps } from "@/pages-react/localePage";
import Reviews from "@/components/Reviews";

/**
 * React context does not cross Astro island boundaries, so each hydrated island
 * carries its own LanguageProvider rather than inheriting one from a page-level tree.
 */
const ReviewsIsland = ({ lang, alternateHref }: LocalePageProps) => (
  <LanguageProvider lang={lang} alternateHref={alternateHref}>
    <Reviews />
  </LanguageProvider>
);

export default ReviewsIsland;
