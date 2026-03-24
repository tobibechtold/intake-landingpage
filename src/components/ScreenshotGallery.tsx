import { useLanguage } from "@/i18n/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Per-language screenshot configs
const screenshotsByLang: Record<string, { id: number; alt: string; file: string }[]> = {
  en: [
    { id: 1, alt: "Onboarding", file: "Onboarding" },
    { id: 2, alt: "Dashboard", file: "Dashboard" },
    { id: 3, alt: "Testimonial", file: "Testimonial" },
    { id: 4, alt: "Add Food", file: "Add-Food" },
    { id: 5, alt: "Scan Food", file: "Scan-Food" },
    { id: 6, alt: "Apple Watch", file: "Apple-Watch" },
    { id: 7, alt: "Health", file: "Health" },
    { id: 8, alt: "Recipes", file: "Recipes" },
    { id: 9, alt: "Statistics", file: "Statistics" },
    { id: 10, alt: "Water", file: "Water" },
  ],
  de: [
    { id: 1, alt: "Onboarding", file: "Onboarding" },
    { id: 2, alt: "Dashboard", file: "Dashboard" },
    { id: 3, alt: "Testimonial", file: "Testimonial" },
    { id: 4, alt: "Lebensmittel hinzufügen", file: "Add-Food" },
    { id: 5, alt: "Barcode scannen", file: "Scan-Food" },
    { id: 6, alt: "Apple Watch", file: "Apple-Watch" },
    { id: 7, alt: "Health Integration", file: "Health" },
    { id: 8, alt: "Rezepte", file: "Recipes" },
    { id: 9, alt: "Statistik", file: "Statistics" },
    { id: 10, alt: "Wasser", file: "Water" },
  ],
};

const ScreenshotGallery = () => {
  const { t, language } = useLanguage();
  const isMobile = useIsMobile();

  const screenshots = screenshotsByLang[language] || screenshotsByLang.en;
  const getScreenshotPath = (id: number, file: string) =>
    `/screenshots/${language}-${id}-${file}.png`;

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-0 md:px-4">
        <h2 className="mb-10 px-4 text-center text-2xl font-bold text-foreground animate-fade-in md:px-0 md:text-3xl">
          {t("screenshotGalleryHeading")}
        </h2>

        <div className="relative px-0 md:px-16 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <Carousel
            opts={{
              align: isMobile ? "center" : "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {screenshots.map((screenshot) => (
                <CarouselItem
                  key={screenshot.id}
                  className="pl-2 md:pl-4 basis-[85%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <div className="p-1">
                    <img
                      src={getScreenshotPath(screenshot.id, screenshot.file)}
                      alt={screenshot.alt}
                      loading="lazy"
                      decoding="async"
                      className="h-auto w-full rounded-[1.5rem] border border-white/10 shadow-[0_30px_80px_-60px_rgba(255,76,145,0.85)]"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 hidden md:flex" />
            <CarouselNext className="right-0 hidden md:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default ScreenshotGallery;
