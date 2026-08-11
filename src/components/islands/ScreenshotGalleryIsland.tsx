import { LanguageProvider } from "@/i18n/LanguageContext";
import type { LocalePageProps } from "@/pages-react/localePage";
import ScreenshotGallery from "@/components/ScreenshotGallery";

/**
 * React context does not cross Astro island boundaries, so each hydrated island
 * carries its own LanguageProvider rather than inheriting one from a page-level tree.
 */
const ScreenshotGalleryIsland = ({ lang, alternateHref }: LocalePageProps) => (
  <LanguageProvider lang={lang} alternateHref={alternateHref}>
    <ScreenshotGallery />
  </LanguageProvider>
);

export default ScreenshotGalleryIsland;
