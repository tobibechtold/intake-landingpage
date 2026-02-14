import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Reviews from "@/components/Reviews";
import ScreenshotGallery from "@/components/ScreenshotGallery";
import Features from "@/components/Features";
import FeatureVoting from "@/components/FeatureVoting";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Reviews />
      <ScreenshotGallery />
      <Features />
      <FeatureVoting />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
