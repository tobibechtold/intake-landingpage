import { Star } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import AutoScroll from "embla-carousel-auto-scroll";

interface Review {
  id: number;
  title: string;
  text: string;
  author: string;
  date: string;
  rating: number;
}

const reviews: Review[] = [
  {
    id: 1,
    title: "Übersichtlich & schick",
    text: "Sehr schöne & übersichtliche App. Macht damit genau was sie soll und das sehr gut und ohne Account-Zwang. Die neuen Features (Wasser-Zähler, eigene Rezepte) komplettieren und erweitern die App immer mehr. Freue mich über jedes Update😊",
    author: "ipfreaks",
    date: "23. Jan. 2026",
    rating: 5,
  },
  {
    id: 2,
    title: "Tolle App",
    text: "Simpel, übersichtlich und ohne Gamification. Die App konzentriert sich auf das wesentliche und kommt ohne teures Abo aus. Danke!",
    author: "Nico Sebastian",
    date: "23. Jan. 2026",
    rating: 5,
  },
  {
    id: 3,
    title: "Top App",
    text: "Tolle App zum Kalorienzählen – endlich ohne Abo! Sehr übersichtliche und gut durchdachte App zum Kalorien zählen – und das ganz ohne monatliche oder jährliche Zahlung. Genau das habe ich gesucht! Die Anbindung an Apple Health funktioniert zuverlässig und macht das Tracking besonders komfortabel. Auch die innovative Art der Eingabe gefällt mir richtig gut und hebt die App positiv von vielen Mitbewerbern ab. Insgesamt wirkt alles aufgeräumt, modern und intuitiv bedienbar. Fazit: Sehr empfehlenswert",
    author: "©pa.tric",
    date: "23. Jan. 2026",
    rating: 5,
  },
  {
    id: 4,
    title: "Installiert und direkt geflasht",
    text: "Das Einrichten ist einfach! Kein Account notwendig Keine Werbung Keine sinnlosen Streaks. Was ich mir wünsche, das die Hydration auch von der Health App übernommen wird, Da ich mit eine Hydration über die App Waterlama Tracke und diese ist auch mit Health App verknüpft. Ansonsten ist es diese App die ich wirklich brauchte ohne schnick Schnack.",
    author: "RalleTeeFau",
    date: "26. Jan. 2026",
    rating: 5,
  },
  {
    id: 5,
    title: "Super Alternative",
    text: "Super Alternative zu Yazio! Bin gestern zufällig über Threads auf die App aufmerksam geworden. Gecatcht hat mich, dass es kein Abo Modell ist. Nach Jahren der Nutzung mit Yazio bin ich nun sehr froh, nicht mehr an das Premium Abo gebunden zu sein. Zuden kann die App alles wichtige, sieht mMn schöner minimalistischer aus und ist insgesamt ohne das Abo Modell attraktiver. Verbesserungsvorschläge: 1. Es wäre cool, wenn man in der Hauptübersicht die einzelnen Mahlzeiten auf- und zuklappen könnte, damit der Bildschirm nicht so überladen wirkt. Das zerstört etwas den Minimalismus 2. bei den Rezepten wäre eine Notizfunktion mega, sodass man neben den Zutaten auch die Zubereitung eintragen kann 3. es ist schade, dass man 0 kcal Zutaten nicht einfügen kann, wie bspw. Wasser. Für manche Einträge (insb bei Rezepten) wichtig, auch wenn es keine kcal hat Also all in all: grds. sehr zufrieden!!",
    author: "LennartLesch",
    date: "27. Jan. 2026",
    rating: 4,
  },
  {
    id: 6,
    title: "Tolle App",
    text: "Die Bedienung ist sehr gut, der Scanner funktioniert schnell und unkompliziert. Teilweise sind auch schon realistische Mengenangaben möglich, zT noch optimierbar. Ich mag, dass es es nicht viel Schnickschnack hat, aber trotzdem viele Daten auswerten und anzeigen kann. Ich würde mich freuen, wenn die Wasseraufnahme noch optimiert wird, derzeit kann eine Einnahme nur á 250ml vorgenommen werden (Meine Teetasse hat z.B. 400ml Fassungsvermögen)",
    author: "Anna.N.",
    date: "28. Jan. 2026",
    rating: 5,
  },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating
            ? "fill-primary text-primary"
            : "fill-transparent text-muted-foreground/40"
        }`}
      />
    ))}
  </div>
);

const Reviews = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section ref={ref} className="section-gradient py-24">
      <div className="container">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl md:text-4xl font-bold text-foreground mb-4 opacity-0 ${
              isVisible ? "animate-fade-up" : ""
            }`}
          >
            {t("reviewsTitle")}
          </h2>
          <p
            className={`text-muted-foreground text-lg max-w-xl mx-auto opacity-0 ${
              isVisible ? "animate-fade-up" : ""
            }`}
            style={{ animationDelay: "0.1s" }}
          >
            {t("reviewsSubtitle")}
          </p>
        </div>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          AutoScroll({
            speed: 1,
            startDelay: 0,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
            playOnInit: true,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent className="-ml-4 px-4 md:px-8">
          {reviews.map((review) => (
            <CarouselItem
              key={review.id}
              className="pl-4 basis-[85%] sm:basis-[45%] lg:basis-[32%]"
            >
              <div className="feature-card h-full">
                <StarRating rating={review.rating} />
                <h3 className="text-lg font-semibold text-foreground mt-3 mb-2">
                  {review.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {review.text}
                </p>
                <div className="text-xs text-muted-foreground/70">
                  <span className="font-medium">{review.author}</span>
                  <span className="mx-2">•</span>
                  <span>{review.date}</span>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default Reviews;
