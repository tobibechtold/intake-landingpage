import { Link } from "react-router-dom";
import {
  BadgeCheck,
  Camera,
  ClipboardCheck,
  KeyRound,
  MessageCircle,
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
      "Hosted Intake AI is paid because model calls cost money. Bringing your own key is free of Intake AI subscription charges.",
    hostedTitle: "Hosted Intake AI",
    hostedBody: "Use Intake's hosted AI provider with food-specific prompts and automatic improvements.",
    monthly: "3.99 € per month",
    yearly: "39.99 € per year",
    trial: "3 days free trial",
    byokTitle: "Bring your own key",
    byokBody:
      "Add your own OpenAI or Claude API key in Settings and use supported models without an Intake AI subscription.",
    providerNote: "Provider terms and any provider-side usage costs still apply.",
    disclaimerTitle: "Review before logging",
    disclaimer:
      "AI results are estimates and can be wrong. Intake AI creates editable suggestions; you decide what gets saved to your diary.",
    privacyTitle: "Clear data flow",
    privacy:
      "Hosted analysis sends food descriptions, photos, captions, and recent chat context through Intake's backend and AI providers to generate nutrition estimates.",
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
      "Gehostete KI ist kostenpflichtig, weil Modellanfragen Geld kosten. Ein eigener Schlüssel verursacht keine Intake-AI-Abo-Kosten.",
    hostedTitle: "Gehostetes Intake AI",
    hostedBody: "Nutze unseren gehosteten KI-Anbieter mit Food-spezifischen Prompts und laufenden Verbesserungen.",
    monthly: "3,99 € pro Monat",
    yearly: "39,99 € pro Jahr",
    trial: "3 Tage kostenlos testen",
    byokTitle: "Eigener API-Schlüssel",
    byokBody:
      "Hinterlege deinen eigenen OpenAI- oder Claude-API-Schlüssel in den Einstellungen und nutze unterstützte Modelle ohne Intake-AI-Abo.",
    providerNote: "Die Bedingungen und eventuelle Nutzungskosten des jeweiligen Anbieters gelten trotzdem.",
    disclaimerTitle: "Vor dem Speichern prüfen",
    disclaimer:
      "KI-Ergebnisse sind Schätzungen und können falsch sein. Intake AI erstellt bearbeitbare Vorschläge; du entscheidest, was gespeichert wird.",
    privacyTitle: "Klare Datenverarbeitung",
    privacy:
      "Die gehostete Analyse sendet Essensbeschreibungen, Fotos, Bildunterschriften und den letzten Chat-Kontext über das Intake-Backend und KI-Anbieter, um Nährwertschätzungen zu erstellen.",
  },
} as const;

const IntakeAIPage = () => {
  const { language, t } = useLanguage();
  const content = CONTENT[language];
  const homePath = buildLocalizedPath("home", language);
  const helpPath = buildLocalizedPath("help", language);
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
                    {t("comingSoonBadge")}
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
              </article>
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
