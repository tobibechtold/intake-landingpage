import { useLanguage } from "@/i18n/LanguageContext";
import { getPressMentionLabel, PRESS_MENTIONS } from "@/lib/pressMentions";

const PressMentions = () => {
  const { t, language } = useLanguage();

  return (
    <section className="border-y border-border/40 bg-background/55 py-6">
      <div className="container">
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-8">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-muted-foreground">
            {t("pressMentionsLabel")}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 md:justify-start">
            {PRESS_MENTIONS.map((mention) => (
              <a
                key={mention.name}
                href={mention.articleUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={getPressMentionLabel(language, mention)}
                className="flex items-center gap-2 opacity-65 transition-opacity duration-200 hover:opacity-100"
              >
                <img
                  src={mention.logoSrc}
                  alt=""
                  aria-hidden="true"
                  className="h-5 w-auto text-foreground md:h-6"
                />
                {mention.visibleLabel ? (
                  <span className="text-sm font-medium text-muted-foreground">
                    {mention.visibleLabel}
                  </span>
                ) : null}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PressMentions;
