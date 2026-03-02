import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Reviews from "@/components/Reviews";
import ScreenshotGallery from "@/components/ScreenshotGallery";
import Features from "@/components/Features";
import FeatureVoting from "@/components/FeatureVoting";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import SeoHead from "@/components/SeoHead";
import Faq from "@/components/Faq";

const Index = () => {
  return (
    <div className="min-h-screen">
      <SeoHead />
      <Header />
      <main>
        <Hero />
        <Reviews />
        <ScreenshotGallery />
        <Features />
        <Faq />
        <FeatureVoting />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
