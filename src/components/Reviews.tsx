import { useState } from "react";
import { Star } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

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
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? "fill-primary text-primary" : "fill-transparent text-muted-foreground/40"}`}
      />
    ))}
  </div>
);

const CHARACTER_THRESHOLD = 200;

const ReviewCard = ({ review }: { review: Review }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useLanguage();
  const isLongReview = review.text.length > CHARACTER_THRESHOLD;

  return (
    <div className="feature-card flex h-full flex-col">
      <StarRating rating={review.rating} />
      <h3 className="mt-3 mb-2 text-lg font-semibold text-foreground">{review.title}</h3>
      <p
        className={`mb-2 text-sm leading-relaxed text-muted-foreground ${
          !isExpanded && isLongReview ? "line-clamp-4" : ""
        }`}
      >
        {review.text}
      </p>
      {isLongReview && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mb-2 text-left text-sm font-medium text-primary hover:underline"
        >
          {isExpanded ? t("showLess") : t("showMore")}
        </button>
      )}
      <div className="mt-auto text-xs text-muted-foreground/70">
        <span className="font-medium">{review.author}</span>
        <span className="mx-2">•</span>
        <span>{review.date}</span>
      </div>
    </div>
  );
};

const Reviews = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section ref={ref} className="section-gradient py-24">
      <div className="container">
        <div className="mb-16 text-center">
          <h2
            className={`mb-4 text-3xl font-bold text-foreground opacity-0 md:text-4xl ${
              isVisible ? "animate-fade-up" : ""
            }`}
          >
            {t("reviewsTitle")}
          </h2>
          <p
            className={`mx-auto max-w-xl text-lg text-muted-foreground opacity-0 ${
              isVisible ? "animate-fade-up" : ""
            }`}
            style={{ animationDelay: "0.1s" }}
          >
            {t("reviewsSubtitle")}
          </p>
        </div>

        <div className="mx-auto mb-12 max-w-3xl rounded-[2rem] border border-primary/15 bg-card/70 px-6 py-6 text-left shadow-[0_20px_80px_-60px_rgba(255,76,145,0.7)] md:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-primary">{t("heroTrustRating")}</p>
              <h3 className="mt-2 text-2xl font-semibold text-foreground">{t("reviewsSummaryTitle")}</h3>
            </div>
            <div className="flex items-center gap-3 rounded-full border border-border/70 bg-background/70 px-4 py-2">
              <Star className="h-5 w-5 fill-primary text-primary" />
              <span className="text-lg font-semibold text-foreground">4.9</span>
              <span className="text-sm text-muted-foreground">App Store</span>
            </div>
          </div>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">{t("reviewsSummaryBody")}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className={`opacity-0 ${isVisible ? "animate-fade-scale" : ""}`}
              style={{ animationDelay: `${0.12 * index}s` }}
            >
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
