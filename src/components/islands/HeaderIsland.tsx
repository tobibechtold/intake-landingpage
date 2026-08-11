import { LanguageProvider } from "@/i18n/LanguageContext";
import type { LocalePageProps } from "@/pages-react/localePage";
import Header from "@/components/Header";

/**
 * React context does not cross Astro island boundaries, so each hydrated island
 * carries its own LanguageProvider rather than inheriting one from a page-level tree.
 */
const HeaderIsland = ({ lang, alternateHref }: LocalePageProps) => (
  <LanguageProvider lang={lang} alternateHref={alternateHref}>
    <Header />
  </LanguageProvider>
);

export default HeaderIsland;
