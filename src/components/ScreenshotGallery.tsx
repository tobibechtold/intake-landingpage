import { useLanguage } from "@/i18n/LanguageContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const screenshots = [
  { id: 1, name: "Onboarding" },
  { id: 2, name: "Dashboard" },
  { id: 3, name: "Feature B" },
  { id: 4, name: "Screenshot 9" },
  { id: 5, name: "Screenshot 11" },
  { id: 6, name: "Screenshot 17" },
  { id: 7, name: "Screenshot 7" },
  { id: 8, name: "Screenshot 13" },
];

const ScreenshotGallery = () => {
  const { t, language } = useLanguage();

  const getScreenshotPath = (id: number, name: string) =>
    `/screenshots/${language}-${id}-${encodeURIComponent(name)}.png`;

  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 animate-fade-in">
          {t("screenshotGalleryHeading")}
        </h2>

        <div className="relative px-12 md:px-16 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {screenshots.map((screenshot) => (
                <CarouselItem
                  key={screenshot.id}
                  className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <div className="p-1">
                    <img
                      src={getScreenshotPath(screenshot.id, screenshot.name)}
                      alt={screenshot.name}
                      className="w-full h-auto rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default ScreenshotGallery;
