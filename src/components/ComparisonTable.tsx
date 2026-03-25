import { Check, Minus } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const ComparisonValue = ({ positive, text }: { positive: boolean; text: string }) => (
  <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
    <span
      className={`flex h-6 w-6 items-center justify-center rounded-full ${
        positive ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
      }`}
      aria-hidden="true"
    >
      {positive ? <Check className="h-4 w-4" /> : <Minus className="h-4 w-4" />}
    </span>
    <span>{text}</span>
  </span>
);

const ComparisonTable = () => {
  const { t } = useLanguage();

  const rows = [
    {
      label: t("comparisonRowSubscription"),
      intake: { text: t("comparisonNo"), positive: true },
      typical: { text: t("comparisonYes"), positive: false },
    },
    {
      label: t("comparisonRowAccount"),
      intake: { text: t("comparisonNo"), positive: true },
      typical: { text: t("comparisonYes"), positive: false },
    },
    {
      label: t("comparisonRowOnDevice"),
      intake: { text: t("comparisonYes"), positive: true },
      typical: { text: t("comparisonNo"), positive: false },
    },
    {
      label: t("comparisonRowBarcode"),
      intake: { text: t("comparisonYes"), positive: true },
      typical: { text: t("comparisonYes"), positive: false },
    },
    {
      label: t("comparisonRowRecipes"),
      intake: { text: t("comparisonYes"), positive: true },
      typical: { text: t("comparisonYes"), positive: false },
    },
    {
      label: t("comparisonRowStats"),
      intake: { text: t("comparisonYes"), positive: true },
      typical: { text: t("comparisonYes"), positive: false },
    },
    {
      label: t("comparisonRowHealth"),
      intake: { text: t("comparisonYes"), positive: true },
      typical: { text: t("comparisonYes"), positive: false },
    },
    {
      label: t("comparisonRowCost"),
      intake: { text: t("comparisonOneTime"), positive: true },
      typical: { text: t("comparisonRecurring"), positive: false },
    },
  ];

  return (
    <section className="py-20 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="section-kicker">{t("comparisonIntake")}</p>
          <h2 className="mt-3 text-3xl font-bold text-foreground md:text-5xl">
            {t("comparisonTitle")}
          </h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            {t("comparisonSubtitle")}
          </p>
        </div>

        <div className="mt-12 overflow-x-auto rounded-[2rem] border border-border/70 bg-card/70 shadow-[0_30px_90px_-60px_rgba(255,76,145,0.7)]">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="border-b border-border/70 text-left">
                <th className="px-5 py-4 text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  {t("comparisonTitle")}
                </th>
                <th className="bg-primary/10 px-5 py-4 text-sm font-semibold text-foreground">
                  {t("comparisonIntake")}
                </th>
                <th className="px-5 py-4 text-sm font-semibold text-foreground/80">
                  {t("comparisonTypical")}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-b border-border/60 last:border-0">
                  <th className="px-5 py-4 text-left text-sm font-medium text-foreground">
                    {row.label}
                  </th>
                  <td className="bg-primary/5 px-5 py-4">
                    <ComparisonValue positive={row.intake.positive} text={row.intake.text} />
                  </td>
                  <td className="px-5 py-4">
                    <ComparisonValue positive={row.typical.positive} text={row.typical.text} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;
