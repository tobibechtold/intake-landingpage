import { Star } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface Review {
  id: number;
  title: string;
  text: string;
  author: string;
  date: string;
}

const reviews: Review[] = [
  {
    id: 1,
    title: "Übersichtlich & schick",
    text: "Sehr schöne & übersichtliche App. Macht damit genau was sie soll und das sehr gut und ohne Account-Zwang. Die neuen Features (Wasser-Zähler, eigene Rezepte) komplettieren und erweitern die App immer mehr. Freue mich über jedes Update😊",
    author: "ipfreaks",
    date: "23. Jan. 2026",
  },
  {
    id: 2,
    title: "Tolle App",
    text: "Simpel, übersichtlich und ohne Gamification. Die App konzentriert sich auf das wesentliche und kommt ohne teures Abo aus. Danke!",
    author: "Nico Sebastian",
    date: "23. Jan. 2026",
  },
  {
    id: 3,
    title: "Top App",
    text: "Tolle App zum Kalorienzählen – endlich ohne Abo! Sehr übersichtliche und gut durchdachte App zum Kalorien zählen – und das ganz ohne monatliche oder jährliche Zahlung. Genau das habe ich gesucht! Die Anbindung an Apple Health funktioniert zuverlässig und macht das Tracking besonders komfortabel. Auch die innovative Art der Eingabe gefällt mir richtig gut und hebt die App positiv von vielen Mitbewerbern ab. Insgesamt wirkt alles aufgeräumt, modern und intuitiv bedienbar. Fazit: Sehr empfehlenswert",
    author: "©pa.tric",
    date: "23. Jan. 2026",
  },
];

const StarRating = () => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
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

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className={`feature-card opacity-0 ${isVisible ? "animate-fade-scale" : ""}`}
              style={{ animationDelay: `${0.1 + 0.1 * index}s` }}
            >
              <StarRating />
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
