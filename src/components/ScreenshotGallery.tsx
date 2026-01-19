import { useLanguage } from "@/i18n/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Note: Filenames use hyphens instead of spaces (URL-safe)
const screenshots = [
  { id: 1, alt: "Onboarding", file: "Onboarding" },
  { id: 2, alt: "Dashboard", file: "Dashboard" },
  { id: 3, alt: "Feature B", file: "Feature-B" },
  { id: 4, alt: "Screenshot 9", file: "Screenshot-9" },
  { id: 5, alt: "Screenshot 11", file: "Screenshot-11" },
  { id: 6, alt: "Screenshot 17", file: "Screenshot-17" },
  { id: 7, alt: "Screenshot 7", file: "Screenshot-7" },
  { id: 8, alt: "Screenshot 13", file: "Screenshot-13" },
];

const ScreenshotGallery = () => {
  const { t, language } = useLanguage();
  const isMobile = useIsMobile();

  const getScreenshotPath = (id: number, file: string) =>
    `/screenshots/${language}-${id}-${file}.png`;

  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-0 md:px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 px-4 md:px-0 animate-fade-in">
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
                      className="w-full h-auto rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
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
