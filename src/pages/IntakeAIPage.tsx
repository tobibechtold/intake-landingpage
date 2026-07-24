import { Link } from "react-router-dom";
import {
  BadgeCheck,
  Camera,
  Check,
  ClipboardCheck,
  KeyRound,
  MessageCircle,
  Minus,
  ScanLine,
  Sparkles,
} from "lucide-react";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import PhoneFrame from "@/components/PhoneFrame";
import SeoHead from "@/components/SeoHead";
import { useLanguage } from "@/i18n/LanguageContext";
import { buildLocalizedPath } from "@/lib/localeRouting";

const CONTENT = {
  en: {
    breadcrumbs: "Intake AI",
    kicker: "Optional add-on",
    title: "Intake AI",
    description:
      "Describe a meal, take a photo, or scan a label. Intake AI turns it into editable calories and macros so logging is faster when you want the help.",
    coreNote: "The core app stays a one-time purchase and keeps working without AI.",
    primaryCta: "Download Intake",
    secondaryCta: "Read FAQ",
    videoCaption: "See how Intake AI turns text and photos into editable meal suggestions.",
    featureTitle: "Fast logging for messy real meals",
    featureDescription:
      "Intake AI works like a small chat built for food logging. It estimates, explains uncertainty, and lets you correct the result before anything is saved.",
    features: [
      {
        icon: MessageCircle,
        title: "Describe a meal in a sentence",
        body: "Type what you ate and Intake AI estimates calories, protein, carbs, and fat.",
      },
      {
        icon: Camera,
        title: "Take a meal photo",
        body: "Use the camera or library for plates, snacks, and restaurant meals.",
      },
      {
        icon: ScanLine,
        title: "Scan nutrition labels",
        body: "Prefill calories and macros from packaged-food labels before reviewing them.",
      },
      {
        icon: ClipboardCheck,
        title: "Reply naturally to correct the result",
        body: "If the estimate is off, tell Intake AI what changed and review the updated suggestion.",
      },
    ],
    pricingTitle: "Choose how you want to use it",
    pricingDescription:
      "Intake AI is paid because model calls cost money. Using your own API key (BYOK) is free of Intake AI subscription charges.",
    hostedTitle: "Intake AI",
    hostedBody: "Use Intake AI with food-specific prompts, richer logging controls, and automatic improvements.",
    monthly: "3.99 € per month",
    yearly: "39.99 € per year",
    trial: "3 days free trial",
    byokTitle: "Own API key (BYOK)",
    byokBody:
      "Add your own OpenAI, Claude, or Gemini API key in Settings and use basic AI food logging without an Intake AI subscription.",
    providerNote: "Provider terms and any provider-side usage costs still apply.",
    byokCta: "Set up BYOK",
    comparisonKicker: "Feature comparison",
    comparisonTitle: "Intake AI vs. own API key (BYOK)",
    comparisonDescription:
      "Own API key (BYOK) is the basic free AI logging chat with your provider key. Intake AI adds the richer food-logging workflow and is improved continuously.",
    comparisonColumns: {
      feature: "Feature",
      hosted: "Intake AI",
      byok: "Own API key (BYOK)",
    },
    proofTitle: "More control before logging",
    proofDescription:
      "Only Intake AI lets you review recognized ingredients separately, adjust amounts, and correct estimates before saving them.",
    proofItems: [
      {
        title: "Review ingredients separately",
        body: "Switch from one meal to components, review each recognized ingredient, and log them separately.",
        imageSrc: "/intake-ai/meal-card-components-en.jpg",
        imageAlt: "Intake AI shows recognized ingredients separately with component logging controls.",
      },
      {
        title: "Correct estimates in place",
        body: "Edit ingredients, change amounts, pick smaller or larger portions, and adjust calories before logging.",
        imageSrc: "/intake-ai/correction-sheet-en.jpg",
        imageAlt: "Intake AI correction view with ingredients, portion controls, and manual calorie adjustment.",
      },
    ],
    comparisonRows: [
      {
        feature: "Text chat and meal photos",
        hosted:
          "Describe meals or send photos, then review editable suggestions before logging.",
        byok:
          "Send text or images to the supported AI provider of your choice with your own API key (BYOK).",
        hostedLevel: "full",
        byokLevel: "full",
      },
      {
        feature: "Recognized ingredient handling",
        hosted:
          "Log the result as one meal, or show ingredients separately and log them separately.",
        byok:
          'The provider returns a single product or meal item containing the ingredients it recognized.',
        hostedLevel: "full",
        byokLevel: "basic",
      },
      {
        feature: "Estimate corrections before logging",
        hosted:
          "Correct estimates in place, choose larger or smaller portions, remove, edit, or add ingredients and amounts, and manually adjust the calories of an estimate before logging.",
        byok:
          "Basic single-item estimate from your chosen provider. Corrections only work by sending a chat message to the provider.",
        hostedLevel: "full",
        byokLevel: "basic",
      },
      {
        feature: "Nutrition-label product creation",
        hosted:
          "Scan a nutrition label while creating a new product and Intake AI fills out the create-product form with values from the photo.",
        byok: "Not available",
        hostedLevel: "full",
        byokLevel: "none",
      },
      {
        feature: "Ongoing feature work",
        hosted:
          "Continuously improved as Intake AI evolves.",
        byok: "Basic AI food logging chat with your own API key (BYOK) and your provider's terms and costs.",
        hostedLevel: "full",
        byokLevel: "basic",
      },
    ],
    disclaimerTitle: "Review before logging",
    disclaimer:
      "AI results are estimates and can be wrong. Intake AI creates editable suggestions; you decide what gets saved to your diary.",
    privacyTitle: "Clear data flow",
    privacy:
      "Intake AI analysis sends food descriptions, photos, captions, and recent chat context through Intake's backend and AI providers to generate nutrition estimates.",
  },
  de: {
    breadcrumbs: "Intake AI",
    kicker: "Optionales Add-on",
    title: "Intake AI",
    description:
      "Beschreibe eine Mahlzeit, mach ein Foto oder scanne ein Nährwertlabel. Intake AI macht daraus bearbeitbare Kalorien und Makros, damit du schneller loggen kannst.",
    coreNote: "Die Core-App bleibt ein Einmalkauf und funktioniert weiter ohne KI.",
    primaryCta: "Intake herunterladen",
    secondaryCta: "FAQ lesen",
    videoCaption: "So macht Intake AI aus Text und Fotos bearbeitbare Mahlzeitenvorschläge.",
    featureTitle: "Schnelles Logging für echte Mahlzeiten",
    featureDescription:
      "Intake AI funktioniert wie ein kleiner Chat fürs Food-Logging. Die KI schätzt, zeigt Unsicherheit und lässt dich das Ergebnis korrigieren, bevor etwas gespeichert wird.",
    features: [
      {
        icon: MessageCircle,
        title: "Mahlzeit per Satz beschreiben",
        body: "Tippe, was du gegessen hast, und Intake AI schätzt Kalorien, Protein, Kohlenhydrate und Fett.",
      },
      {
        icon: Camera,
        title: "Mahlzeitenfotos analysieren",
        body: "Nutze Kamera oder Mediathek für Teller, Snacks und Restaurant-Mahlzeiten.",
      },
      {
        icon: ScanLine,
        title: "Nährwertlabels scannen",
        body: "Übernimm Kalorien und Makros aus Fotos von Produktlabels und prüfe sie vor dem Speichern.",
      },
      {
        icon: ClipboardCheck,
        title: "Ergebnis natürlich korrigieren",
        body: "Wenn etwas nicht stimmt, antworte im Chat und prüfe den aktualisierten Vorschlag.",
      },
    ],
    pricingTitle: "Wähle, wie du Intake AI nutzen möchtest",
    pricingDescription:
      "Intake AI ist kostenpflichtig, weil Modellanfragen Geld kosten. Ein eigener API-Schlüssel (BYOK) verursacht keine Intake-AI-Abo-Kosten.",
    hostedTitle: "Intake AI",
    hostedBody: "Nutze Intake AI mit Food-spezifischen Prompts, mehr Logging-Bedienelementen und laufenden Verbesserungen.",
    monthly: "3,99 € pro Monat",
    yearly: "39,99 € pro Jahr",
    trial: "3 Tage kostenlos testen",
    byokTitle: "Eigener API-Schlüssel (BYOK)",
    byokBody:
      "Hinterlege deinen eigenen OpenAI-, Claude- oder Gemini-API-Schlüssel in den Einstellungen und nutze grundlegendes KI-Food-Logging ohne Intake-AI-Abo.",
    providerNote: "Die Bedingungen und eventuelle Nutzungskosten des jeweiligen Anbieters gelten trotzdem.",
    byokCta: "BYOK einrichten",
    comparisonKicker: "Funktionsvergleich",
    comparisonTitle: "Intake AI vs. eigener API-Schlüssel (BYOK)",
    comparisonDescription:
      "Eigener API-Schlüssel (BYOK) ist der kostenlose Basic-KI-Food-Logging-Chat mit deinem Anbieter-Schlüssel. Intake AI ergänzt den umfangreicheren Food-Logging-Ablauf und wird kontinuierlich verbessert.",
    comparisonColumns: {
      feature: "Funktion",
      hosted: "Intake AI",
      byok: "Eigener API-Schlüssel (BYOK)",
    },
    proofTitle: "Mehr Kontrolle vor dem Loggen",
    proofDescription:
      "Nur mit Intake AI kannst du erkannte Zutaten einzeln prüfen, Mengen anpassen und Schätzungen korrigieren, bevor du sie speicherst.",
    proofItems: [
      {
        title: "Zutaten getrennt prüfen",
        body: "Wechsle von einer Mahlzeit zu Komponenten, prüfe jede erkannte Zutat und logge sie einzeln.",
        imageSrc: "/intake-ai/meal-card-components-de.jpg",
        imageAlt: "Intake AI zeigt erkannte Zutaten einzeln mit Bedienelementen zum Komponenten-Logging.",
      },
      {
        title: "Schätzungen direkt korrigieren",
        body: "Bearbeite Zutaten, ändere Mengen, wähle kleinere oder größere Portionen und passe Kalorien vor dem Loggen an.",
        imageSrc: "/intake-ai/correction-sheet-de.jpg",
        imageAlt: "Intake AI Korrekturansicht mit Zutaten, Portionssteuerung und manueller Kalorienanpassung.",
      },
    ],
    comparisonRows: [
      {
        feature: "Textchat und Mahlzeitenfotos",
        hosted:
          "Beschreibe Mahlzeiten oder sende Fotos und prüfe bearbeitbare Vorschläge vor dem Loggen.",
        byok:
          "Sende Text oder Bilder mit deinem eigenen API-Schlüssel (BYOK) an den unterstützten KI-Anbieter deiner Wahl.",
        hostedLevel: "full",
        byokLevel: "full",
      },
      {
        feature: "Umgang mit erkannten Zutaten",
        hosted:
          "Logge das Ergebnis als eine Mahlzeit oder lass Zutaten einzeln anzeigen und einzeln loggen.",
        byok:
          "Der Anbieter liefert ein einziges Produkt oder eine Mahlzeit mit allen Zutaten, die er erkannt hat.",
        hostedLevel: "full",
        byokLevel: "basic",
      },
      {
        feature: "Schätzungen vor dem Loggen korrigieren",
        hosted:
          "Korrigiere Schätzungen direkt: Du kannst größere oder kleinere Portionen wählen, Zutaten und Mengen entfernen, bearbeiten oder ergänzen und die Kalorien einer Schätzung vor dem Loggen manuell anpassen.",
        byok:
          "Einfache Schätzung als einzelner Eintrag von deinem gewählten Anbieter. Korrekturen funktionieren nur per Chatnachricht an den Anbieter.",
        hostedLevel: "full",
        byokLevel: "basic",
      },
      {
        feature: "Produkte per Nährwertlabel erstellen",
        hosted:
          "Scanne beim Erstellen eines neuen Produkts ein Nährwertlabel. Intake AI füllt das Formular zum Erstellen eines Produkts automatisch mit den Nährwerten aus dem Foto.",
        byok: "Nicht verfügbar",
        hostedLevel: "full",
        byokLevel: "none",
      },
      {
        feature: "Laufende Weiterentwicklung",
        hosted:
          "Wird kontinuierlich verbessert, während der Chat mit eigenem API-Schlüssel (BYOK) der Basic-KI-Food-Logging-Chat bleibt.",
        byok:
          "Grundlegendes kostenloses KI-Logging mit deinem eigenen API-Schlüssel (BYOK) und den Bedingungen und Kosten deines Anbieters.",
        hostedLevel: "full",
        byokLevel: "basic",
      },
    ],
    disclaimerTitle: "Vor dem Speichern prüfen",
    disclaimer:
      "KI-Ergebnisse sind Schätzungen und können falsch sein. Intake AI erstellt bearbeitbare Vorschläge; du entscheidest, was gespeichert wird.",
    privacyTitle: "Klare Datenverarbeitung",
    privacy:
      "Die Intake-AI-Analyse sendet Essensbeschreibungen, Fotos, Bildunterschriften und den letzten Chat-Kontext über das Intake-Backend und KI-Anbieter, um Nährwertschätzungen zu erstellen.",
  },
} as const;

const ComparisonValue = ({
  level,
  children,
}: {
  level: "full" | "basic" | "none";
  children: string;
}) => {
  const isFull = level === "full";

  return (
    <div className="flex gap-3 text-sm leading-6 text-muted-foreground">
      <span
        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
          isFull ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
        }`}
        aria-hidden="true"
      >
        {isFull ? <Check className="h-4 w-4" /> : <Minus className="h-4 w-4" />}
      </span>
      <span>{children}</span>
    </div>
  );
};

const IntakeAIPage = () => {
  const { language, t } = useLanguage();
  const content = CONTENT[language];
  const homePath = buildLocalizedPath("home", language);
  const helpPath = buildLocalizedPath("help", language);
  const byokGuidePath = buildLocalizedPath("byokGuide", language);
  const demoVideoSrc =
    language === "de" ? "/intake-ai-demo-de.mp4" : "/intake-ai-demo-en.mp4";

  return (
    <div className="min-h-screen">
      <SeoHead />
      <Header />
      <main className="pt-28">
        <section className="hero-gradient overflow-hidden pb-16 pt-8 md:pb-24">
          <div className="container">
            <PageBreadcrumbs
              items={[
                { label: t("homeNav"), href: homePath },
                { label: content.breadcrumbs },
              ]}
            />
            <div className="grid items-center gap-12 md:grid-cols-[minmax(0,1fr)_minmax(260px,0.75fr)]">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <p className="section-kicker">{content.kicker}</p>
                  <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    {t("intakeAIBadge")}
                  </span>
                </div>
                <h1 className="mt-4 text-5xl font-bold leading-tight text-foreground md:text-7xl">
                  {content.title}
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">
                  {content.description}
                </p>
                <p className="mt-4 max-w-xl text-base font-medium text-foreground">
                  {content.coreNote}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link to={`${homePath}#hero`} className="trust-chip-link">
                    {content.primaryCta}
                  </Link>
                  <Link to={`${helpPath}#faq`} className="trust-chip-link">
                    {content.secondaryCta}
                  </Link>
                </div>
              </div>

              <figure className="mx-auto w-full max-w-[300px]">
                <PhoneFrame>
                  <video
                    data-testid="intake-ai-demo-video"
                    src={demoVideoSrc}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="h-full w-full bg-background object-cover"
                  />
                </PhoneFrame>
                <figcaption className="mt-3 text-center text-xs leading-5 text-muted-foreground">
                  {content.videoCaption}
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="section-gradient py-20 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <p className="section-kicker">{t("intakeAINav")}</p>
              <h2 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">
                {content.featureTitle}
              </h2>
              <p className="mt-4 text-base leading-7 text-muted-foreground md:text-lg">
                {content.featureDescription}
              </p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {content.features.map((feature) => (
                <article key={feature.title} className="feature-card">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{feature.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <p className="section-kicker">{language === "de" ? "Preis" : "Pricing"}</p>
              <h2 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">
                {content.pricingTitle}
              </h2>
              <p className="mt-4 text-base leading-7 text-muted-foreground md:text-lg">
                {content.pricingDescription}
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <article className="glass-card border border-primary/20 p-7">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground">{content.hostedTitle}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{content.hostedBody}</p>
                <div className="mt-6 grid gap-3">
                  {[content.monthly, content.yearly].map((price) => (
                    <div
                      key={price}
                      className="rounded-2xl border border-border/70 bg-background/55 px-4 py-3"
                    >
                      <p className="font-semibold text-foreground">{price}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.2em] text-primary">
                        {content.trial}
                      </p>
                    </div>
                  ))}
                </div>
              </article>

              <article className="glass-card border border-border/70 p-7">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <KeyRound className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground">{content.byokTitle}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{content.byokBody}</p>
                <p className="mt-5 rounded-2xl border border-border/70 bg-background/55 px-4 py-3 text-sm leading-6 text-muted-foreground">
                  {content.providerNote}
                </p>
                <Link to={byokGuidePath} className="trust-chip-link mt-5 w-fit">
                  {content.byokCta}
                </Link>
              </article>
            </div>

            <div className="mt-12">
              <div className="mx-auto max-w-3xl text-center">
                <p className="section-kicker">{content.comparisonKicker}</p>
                <h3 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">
                  {content.comparisonTitle}
                </h3>
                <p className="mt-4 text-base leading-7 text-muted-foreground md:text-lg">
                  {content.comparisonDescription}
                </p>
              </div>

              <div
                data-testid="intake-ai-mobile-comparison"
                className="mt-8 space-y-4 md:hidden"
              >
                {content.comparisonRows.map((row) => (
                  <article
                    key={row.feature}
                    className="rounded-3xl border border-border/70 bg-card/70 p-5 shadow-[0_24px_80px_-60px_rgba(255,76,145,0.55)]"
                  >
                    <h4 className="text-base font-semibold leading-6 text-foreground">
                      {row.feature}
                    </h4>
                    <div className="mt-4 space-y-3">
                      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                          {content.comparisonColumns.hosted}
                        </p>
                        <div className="mt-3">
                          <ComparisonValue level={row.hostedLevel}>{row.hosted}</ComparisonValue>
                        </div>
                      </div>
                      <div className="rounded-2xl border border-border/70 bg-background/45 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                          {content.comparisonColumns.byok}
                        </p>
                        <div className="mt-3">
                          <ComparisonValue level={row.byokLevel}>{row.byok}</ComparisonValue>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div
                data-testid="intake-ai-desktop-comparison"
                className="mt-8 hidden overflow-x-auto rounded-[2rem] border border-border/70 bg-card/70 shadow-[0_30px_90px_-60px_rgba(255,76,145,0.7)] md:block"
              >
                <table className="min-w-[760px] border-collapse">
                  <caption className="sr-only">{content.comparisonTitle}</caption>
                  <thead>
                    <tr className="border-b border-border/70 text-left">
                      <th className="w-[24%] px-5 py-4 text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                        {content.comparisonColumns.feature}
                      </th>
                      <th className="w-[40%] bg-primary/10 px-5 py-4 text-sm font-semibold text-foreground">
                        {content.comparisonColumns.hosted}
                      </th>
                      <th className="w-[36%] px-5 py-4 text-sm font-semibold text-foreground/80">
                        {content.comparisonColumns.byok}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {content.comparisonRows.map((row) => (
                      <tr key={row.feature} className="border-b border-border/60 last:border-0">
                        <th className="px-5 py-5 text-left text-sm font-semibold leading-6 text-foreground">
                          {row.feature}
                        </th>
                        <td className="bg-primary/5 px-5 py-5 align-top">
                          <ComparisonValue level={row.hostedLevel}>{row.hosted}</ComparisonValue>
                        </td>
                        <td className="px-5 py-5 align-top">
                          <ComparisonValue level={row.byokLevel}>{row.byok}</ComparisonValue>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-10">
                <div className="mx-auto max-w-3xl text-center">
                  <h4 className="text-2xl font-bold text-foreground md:text-3xl">
                    {content.proofTitle}
                  </h4>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground md:text-base">
                    {content.proofDescription}
                  </p>
                </div>
                <div className="mt-8 grid gap-6 md:grid-cols-2">
                  {content.proofItems.map((item) => (
                    <article
                      key={item.title}
                      className="glass-card overflow-hidden border border-border/70"
                    >
                      <div className="aspect-[4/3] overflow-hidden bg-muted/40">
                        <img
                          src={item.imageSrc}
                          alt={item.imageAlt}
                          width={1200}
                          height={1200}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover object-top"
                        />
                      </div>
                      <div className="p-6">
                        <h5 className="text-lg font-semibold text-foreground">{item.title}</h5>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          {item.body}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-gradient border-y border-border/50 py-20">
          <div className="container">
            <div className="grid gap-6 md:grid-cols-2">
              <article className="feature-card">
                <BadgeCheck className="mb-4 h-7 w-7 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">{content.disclaimerTitle}</h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{content.disclaimer}</p>
              </article>
              <article className="feature-card">
                <BadgeCheck className="mb-4 h-7 w-7 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">{content.privacyTitle}</h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{content.privacy}</p>
              </article>
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default IntakeAIPage;
