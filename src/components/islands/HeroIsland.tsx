import { LanguageProvider } from "@/i18n/LanguageContext";
import type { LocalePageProps } from "@/pages-react/localePage";
import Hero from "@/components/Hero";

/**
 * React context does not cross Astro island boundaries, so each hydrated island
 * carries its own LanguageProvider rather than inheriting one from a page-level tree.
 */
const HeroIsland = ({ lang, alternateHref }: LocalePageProps) => (
  <LanguageProvider lang={lang} alternateHref={alternateHref}>
    <Hero />
  </LanguageProvider>
);

export default HeroIsland;
