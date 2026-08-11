import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PressMentions from "@/components/PressMentions";
import Reviews from "@/components/Reviews";
import ScreenshotGallery from "@/components/ScreenshotGallery";
import Features from "@/components/Features";
import FeatureVoting from "@/components/FeatureVoting";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import ProductUpdatesPreview from "@/components/ProductUpdatesPreview";
import WhySwitch from "@/components/WhySwitch";
import ProofStories from "@/components/ProofStories";
import TopicPages from "@/components/TopicPages";
import IntakeAITeaser from "@/components/IntakeAITeaser";
import MobileIntakeAIBanner from "@/components/MobileIntakeAIBanner";

import { LanguageProvider } from "@/i18n/LanguageContext";
import type { Language } from "@/i18n/translations";

import type { ReleaseSummary } from "@/lib/releases";

interface PageProps {
  lang: Language;
  alternateHref: string | null;
  releases: ReleaseSummary[];
}

// The <head> is owned by BaseLayout.astro now, so SeoHead is gone from here.
const Index = ({ lang, alternateHref, releases }: PageProps) => {
  return (
    <LanguageProvider lang={lang} alternateHref={alternateHref}>
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <MobileIntakeAIBanner />
        <PressMentions />
        <WhySwitch />
        <TopicPages />
        <ProofStories />
        <IntakeAITeaser />
        <Reviews />
        <ScreenshotGallery />
        <Features />
        <ProductUpdatesPreview releases={releases} />
        <FeatureVoting />
        <CTA />
      </main>
      <Footer />
    </div>
    </LanguageProvider>
  );
};

export default Index;
