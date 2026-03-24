import { useLanguage } from "@/i18n/LanguageContext";

const ProofStories = () => {
  const { t, language } = useLanguage();

  const stories = [
    {
      title: t("proofStoryTrackFastTitle"),
      body: t("proofStoryTrackFastBody"),
      points: [
        t("proofStoryTrackFastPointOne"),
        t("proofStoryTrackFastPointTwo"),
        t("proofStoryTrackFastPointThree"),
      ],
      image: `/screenshots/${language}-4-Add-Food.png`,
      alt: t("proofStoryTrackFastTitle"),
    },
    {
      title: t("proofStorySeeMattersTitle"),
      body: t("proofStorySeeMattersBody"),
      points: [
        t("proofStorySeeMattersPointOne"),
        t("proofStorySeeMattersPointTwo"),
        t("proofStorySeeMattersPointThree"),
      ],
      image: `/screenshots/${language}-9-Statistics.png`,
      alt: t("proofStorySeeMattersTitle"),
    },
    {
      title: t("proofStoryStayControlTitle"),
      body: t("proofStoryStayControlBody"),
      points: [
        t("proofStoryStayControlPointOne"),
        t("proofStoryStayControlPointTwo"),
        t("proofStoryStayControlPointThree"),
      ],
      image: `/screenshots/${language}-2-Dashboard.png`,
      alt: t("proofStoryStayControlTitle"),
    },
  ];

  return (
    <section className="section-gradient py-20 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="section-kicker">{t("comparisonIntake")}</p>
          <h2 className="mt-3 text-3xl font-bold text-foreground md:text-5xl">
            {t("proofStoriesTitle")}
          </h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            {t("proofStoriesSubtitle")}
          </p>
        </div>

        <div className="mt-12 space-y-8">
          {stories.map((story, index) => (
            <article
              key={story.title}
              className={`proof-story-card ${index % 2 === 1 ? "md:[&>.proof-story-media]:order-2" : ""}`}
            >
              <div className="proof-story-media">
                <img
                  src={story.image}
                  alt={story.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full rounded-[1.75rem] border border-white/10 bg-black/20 object-cover shadow-[0_30px_80px_-50px_rgba(255,76,145,0.8)]"
                />
              </div>
              <div className="proof-story-copy">
                <h3 className="text-2xl font-semibold text-foreground md:text-3xl">
                  {story.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-muted-foreground">{story.body}</p>
                <ul className="mt-6 grid gap-3">
                  {story.points.map((point) => (
                    <li
                      key={point}
                      className="rounded-2xl border border-border/70 bg-card/70 px-4 py-3 text-sm font-medium text-foreground"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProofStories;
