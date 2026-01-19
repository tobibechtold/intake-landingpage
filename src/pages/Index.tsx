import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AppPreview from "@/components/AppPreview";
import ScreenshotGallery from "@/components/ScreenshotGallery";
import Features from "@/components/Features";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <AppPreview />
      <ScreenshotGallery />
      <Features />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
