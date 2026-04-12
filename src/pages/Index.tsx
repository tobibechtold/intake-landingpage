import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PressMentions from "@/components/PressMentions";
import Reviews from "@/components/Reviews";
import ScreenshotGallery from "@/components/ScreenshotGallery";
import Features from "@/components/Features";
import FeatureVoting from "@/components/FeatureVoting";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import SeoHead from "@/components/SeoHead";
import Faq from "@/components/Faq";
import ProductUpdatesPreview from "@/components/ProductUpdatesPreview";
import WhySwitch from "@/components/WhySwitch";
import ComparisonTable from "@/components/ComparisonTable";
import ProofStories from "@/components/ProofStories";
import TopicPages from "@/components/TopicPages";

const Index = () => {
  return (
    <div className="min-h-screen">
      <SeoHead />
      <Header />
      <main>
        <Hero />
        <PressMentions />
        <WhySwitch />
        <TopicPages />
        <ComparisonTable />
        <ProofStories />
        <Reviews />
        <ScreenshotGallery />
        <Features />
        <ProductUpdatesPreview />
        <Faq />
        <FeatureVoting />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
