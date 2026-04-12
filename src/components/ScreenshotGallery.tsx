import { useLanguage } from "@/i18n/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getScreenshotGalleryAssets } from "@/lib/screenshotAssets";

const ScreenshotGallery = () => {
  const { t, language } = useLanguage();
  const isMobile = useIsMobile();

  const screenshots = getScreenshotGalleryAssets(language);

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
                  key={screenshot.key}
                  className="pl-2 md:pl-4 basis-[85%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <figure className="p-1">
                    <img
                      src={screenshot.src}
                      alt={screenshot.alt}
                      loading="lazy"
                      decoding="async"
                      className="h-auto w-full rounded-[1.5rem] border border-white/10 shadow-[0_30px_80px_-60px_rgba(255,76,145,0.85)]"
                    />
                    <figcaption className="mt-3 px-2 text-sm text-muted-foreground">
                      {screenshot.caption}
                    </figcaption>
                  </figure>
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
