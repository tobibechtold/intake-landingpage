import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Coins,
  ExternalLink,
  KeyRound,
  ShieldCheck,
} from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import SeoHead from "@/components/SeoHead";
import { useLanguage } from "@/i18n/LanguageContext";
import { buildLocalizedPath } from "@/lib/localeRouting";

const PROVIDER_LINKS = {
  OpenAI: "https://platform.openai.com/api-keys",
  Claude: "https://platform.claude.com/settings/keys",
  Gemini: "https://aistudio.google.com/apikey",
} as const;

const CONTENT = {
  en: {
    breadcrumb: "Set up your own API key",
    kicker: "BYOK setup guide",
    title: "Set up your own API key for Intake AI",
    intro:
      "Bring your own key (BYOK) lets Intake use an AI provider account that belongs to you. Choose OpenAI, Claude, or Gemini, paste your key once, and you can use basic AI food logging without an Intake AI subscription.",
    summary: "Provider, optional model name, API key—that is all Intake needs.",
    primerTitle: "First time using an API key? Start here.",
    apiKeyTitle: "What is an API key?",
    apiKeyBody:
      "An API key is like a private password between an app and an online service. It tells the provider which account is making a request, so the provider can process it and assign any usage to that account.",
    tokenTitle: "What are tokens?",
    tokenBody:
      "AI providers measure usage in tokens: small pieces of text sent to and returned by a model. A short meal description uses fewer tokens than a long conversation or a detailed photo analysis.",
    accountNote:
      "An API account is separate from consumer subscriptions such as ChatGPT Plus or Claude Pro. Follow your chosen provider’s billing instructions if it asks you to add credits or a payment method.",
    providersKicker: "Step 1",
    providersTitle: "Choose a provider and create a key",
    providersDescription:
      "Open the official key page, sign in or create an account, then create a new secret key. Copy it immediately—the provider may show the complete key only once.",
    providerCta: (provider: string) => `Create an API key with ${provider}`,
    providerNotes: {
      OpenAI: "Uses your OpenAI API account and its current usage pricing.",
      Claude: "Uses your Claude API account and its current usage pricing.",
      Gemini:
        "Google currently offers a limited free tier for certain models and regions. Limits and availability can change.",
    },
    setupKicker: "Steps 2–5",
    setupTitle: "Add the key in Intake",
    setupDescription:
      "You only need to configure this once. You can return to Settings later to change the provider, model, or key.",
    steps: [
      {
        title: "Open the Intake AI settings",
        body: "In Intake, open Settings and choose Intake AI, then select the option to use your own API key.",
      },
      {
        title: "Choose OpenAI, Claude, or Gemini",
        body: "Select the same provider you used to create your key. A key from one provider cannot be used with another.",
      },
      {
        title: "Keep the default model or enter another",
        body: "Intake sets a suitable default model for every provider. The model name is optional—only change it when you know the exact supported model name you want to use.",
      },
      {
        title: "Paste your API key",
        body: "Paste the complete key without adding spaces. Save the settings, then send a short meal description to check that everything works.",
      },
    ],
    screenshots: [
      {
        src: "/intake-ai/byok/intake-settings-en.png",
        alt: "Intake dashboard with the gear button that opens Settings highlighted at the top right.",
        label: "Step 2",
        title: "Open Settings",
        body: "Tap the gear button in the top-right corner of the Intake dashboard.",
      },
      {
        src: "/intake-ai/byok/intake-ai-navigation-en.png",
        alt: "Intake AI navigation item in Settings under Integrations.",
        label: "Step 3",
        title: "Open Intake AI",
        body: "Under Integrations, tap Intake AI to open its settings.",
      },
      {
        src: "/intake-ai/byok/byok-form-en.png",
        alt: "BYOK form showing the provider selector, optional model field, and API key input.",
        label: "Steps 4–5",
        title: "Complete the BYOK form",
        body: "Choose your provider, keep or change the model, then enter and save your API key.",
      },
    ],
    securityTitle: "Your key stays on your device",
    securityBody:
      "Your API key is stored securely only on your device. The key itself never leaves your device and is never sent to or stored by Intake.",
    securityDetail:
      "When you use BYOK, Intake sends your food request directly from your device to the provider you selected. The provider processes that request under its own terms and privacy policy.",
    costTitle: "You control the provider costs",
    costBody:
      "BYOK has no Intake AI subscription charge. Your provider may charge for the API usage it processes, usually based on input and output tokens. Some providers require prepaid credits or billing setup, so check their current terms and pricing.",
    geminiNote:
      "Gemini currently has a free tier for certain models and regions. It has usage limits and may be changed or withdrawn by Google in the future.",
    troubleshootingTitle: "If it does not work",
    troubleshooting: [
      {
        title: "The key is reported as invalid",
        body: "Create a new key, copy the complete value, and make sure the selected provider matches the key.",
      },
      {
        title: "The provider reports a billing or credit error",
        body: "Open the provider’s billing page. Your API account may need credits, a payment method, or an active billing project.",
      },
      {
        title: "The model cannot be found",
        body: "Clear the custom model field to return to Intake’s default, or check the exact current model name in the provider’s documentation.",
      },
      {
        title: "Gemini stops responding",
        body: "The free-tier request or token limit may have been reached. Wait for the limit to reset or review the current quota in Google AI Studio.",
      },
    ],
    finishTitle: "You are ready to try BYOK",
    finishBody:
      "Start with a simple request, review the AI estimate, and correct anything that does not look right before saving it.",
    backToHelp: "Back to Help & FAQ",
    intakeAI: "Learn more about Intake AI",
  },
  de: {
    breadcrumb: "Eigenen API-Schlüssel einrichten",
    kicker: "BYOK-Einrichtung",
    title: "Eigenen API-Schlüssel für Intake AI einrichten",
    intro:
      "Mit Bring Your Own Key (BYOK) nutzt Intake ein KI-Anbieterkonto, das dir gehört. Wähle OpenAI, Claude oder Gemini, hinterlege einmal deinen Schlüssel und nutze grundlegendes KI-Food-Logging ohne Intake-AI-Abo.",
    summary: "Anbieter, optionaler Modellname, API-Schlüssel—mehr braucht Intake nicht.",
    primerTitle: "Noch nie einen API-Schlüssel benutzt? Starte hier.",
    apiKeyTitle: "Was ist ein API-Schlüssel?",
    apiKeyBody:
      "Ein API-Schlüssel ist wie ein privates Passwort zwischen einer App und einem Onlinedienst. Er zeigt dem Anbieter, über welches Konto eine Anfrage gestellt wird, damit sie verarbeitet und die Nutzung diesem Konto zugeordnet werden kann.",
    tokenTitle: "Was sind Tokens?",
    tokenBody:
      "KI-Anbieter messen die Nutzung in Tokens: kleine Textbausteine, die an ein Modell gesendet und von ihm zurückgegeben werden. Eine kurze Mahlzeitenbeschreibung benötigt weniger Tokens als ein langer Chat oder eine ausführliche Fotoanalyse.",
    accountNote:
      "Ein API-Konto ist von Abos wie ChatGPT Plus oder Claude Pro getrennt. Folge den Abrechnungshinweisen deines Anbieters, falls du Guthaben oder eine Zahlungsmethode hinterlegen musst.",
    providersKicker: "Schritt 1",
    providersTitle: "Anbieter wählen und Schlüssel erstellen",
    providersDescription:
      "Öffne die offizielle Schlüssel-Seite, melde dich an oder erstelle ein Konto und lege einen neuen geheimen Schlüssel an. Kopiere ihn direkt—manche Anbieter zeigen den vollständigen Schlüssel nur einmal.",
    providerCta: (provider: string) => `API-Schlüssel bei ${provider} erstellen`,
    providerNotes: {
      OpenAI: "Nutzt dein OpenAI-API-Konto und dessen aktuelle Nutzungspreise.",
      Claude: "Nutzt dein Claude-API-Konto und dessen aktuelle Nutzungspreise.",
      Gemini:
        "Google bietet derzeit eine begrenzte kostenlose Stufe für bestimmte Modelle und Regionen. Limits und Verfügbarkeit können sich ändern.",
    },
    setupKicker: "Schritte 2–5",
    setupTitle: "Schlüssel in Intake hinterlegen",
    setupDescription:
      "Du musst diese Einrichtung nur einmal durchführen. Anbieter, Modell oder Schlüssel kannst du später jederzeit in den Einstellungen ändern.",
    steps: [
      {
        title: "Intake-AI-Einstellungen öffnen",
        body: "Öffne in Intake die Einstellungen, wähle Intake AI und anschließend die Option für deinen eigenen API-Schlüssel.",
      },
      {
        title: "OpenAI, Claude oder Gemini wählen",
        body: "Wähle denselben Anbieter, bei dem du den Schlüssel erstellt hast. Ein Schlüssel eines Anbieters funktioniert nicht bei einem anderen.",
      },
      {
        title: "Standardmodell behalten oder anderes eintragen",
        body: "Intake hinterlegt für jeden Anbieter ein passendes Standardmodell. Der Modellname ist optional—ändere ihn nur, wenn du den exakten Namen eines unterstützten Modells kennst.",
      },
      {
        title: "API-Schlüssel einfügen",
        body: "Füge den vollständigen Schlüssel ohne zusätzliche Leerzeichen ein. Speichere die Einstellungen und sende danach eine kurze Mahlzeitenbeschreibung zum Testen.",
      },
    ],
    screenshots: [
      {
        src: "/intake-ai/byok/intake-settings-de.png",
        alt: "Intake-Dashboard mit dem Zahnrad oben rechts, das die Einstellungen öffnet.",
        label: "Schritt 2",
        title: "Einstellungen öffnen",
        body: "Tippe im Intake-Dashboard oben rechts auf das Zahnrad.",
      },
      {
        src: "/intake-ai/byok/intake-ai-navigation-de.png",
        alt: "Navigationspunkt Intake AI in den Einstellungen unter Integrationen.",
        label: "Schritt 3",
        title: "Intake AI öffnen",
        body: "Tippe unter Integrationen auf Intake AI, um die zugehörigen Einstellungen zu öffnen.",
      },
      {
        src: "/intake-ai/byok/byok-form-de.png",
        alt: "BYOK-Formular mit Auswahl für Anbieter und Modell sowie Eingabe für den API-Schlüssel.",
        label: "Schritte 4–5",
        title: "BYOK-Formular ausfüllen",
        body: "Wähle den Anbieter, behalte oder ändere das Modell und trage deinen API-Schlüssel ein.",
      },
    ],
    securityTitle: "Dein Schlüssel bleibt auf deinem Gerät",
    securityBody:
      "Dein API-Schlüssel wird sicher nur auf deinem Gerät gespeichert. Der Schlüssel selbst verlässt dein Gerät nicht und wird weder an Intake gesendet noch von Intake gespeichert.",
    securityDetail:
      "Bei BYOK sendet Intake deine Essensanfrage direkt von deinem Gerät an den gewählten Anbieter. Der Anbieter verarbeitet sie nach seinen eigenen Bedingungen und Datenschutzregeln.",
    costTitle: "Du kontrollierst die Anbieter-Kosten",
    costBody:
      "Für BYOK fällt kein Intake-AI-Abo an. Dein Anbieter kann die verarbeitete API-Nutzung berechnen, meist anhand von Eingabe- und Ausgabe-Tokens. Manche Anbieter verlangen Guthaben oder eine Abrechnungseinrichtung—prüfe deshalb die aktuellen Bedingungen und Preise.",
    geminiNote:
      "Gemini hat derzeit eine kostenlose Stufe für bestimmte Modelle und Regionen. Sie besitzt Nutzungslimits und kann von Google künftig geändert oder eingestellt werden.",
    troubleshootingTitle: "Wenn es nicht funktioniert",
    troubleshooting: [
      {
        title: "Der Schlüssel wird als ungültig gemeldet",
        body: "Erstelle einen neuen Schlüssel, kopiere ihn vollständig und prüfe, ob der ausgewählte Anbieter dazu passt.",
      },
      {
        title: "Der Anbieter meldet ein Abrechnungs- oder Guthabenproblem",
        body: "Öffne die Abrechnungsseite des Anbieters. Dein API-Konto benötigt möglicherweise Guthaben, eine Zahlungsmethode oder ein aktives Abrechnungsprojekt.",
      },
      {
        title: "Das Modell wird nicht gefunden",
        body: "Leere das eigene Modellfeld, um Intakes Standard zu verwenden, oder prüfe den exakten aktuellen Modellnamen in der Dokumentation des Anbieters.",
      },
      {
        title: "Gemini antwortet nicht mehr",
        body: "Möglicherweise wurde ein Anfrage- oder Tokenlimit der kostenlosen Stufe erreicht. Warte auf das Zurücksetzen oder prüfe das aktuelle Kontingent in Google AI Studio.",
      },
    ],
    finishTitle: "Jetzt kannst du BYOK ausprobieren",
    finishBody:
      "Beginne mit einer einfachen Anfrage, prüfe die KI-Schätzung und korrigiere unplausible Angaben vor dem Speichern.",
    backToHelp: "Zurück zu Hilfe & FAQ",
    intakeAI: "Mehr über Intake AI",
  },
} as const;

const ByokGuidePage = () => {
  const { language, t } = useLanguage();
  const content = CONTENT[language];
  const helpPath = buildLocalizedPath("help", language);
  const intakeAIPath = buildLocalizedPath("intakeAI", language);

  return (
    <div className="min-h-screen">
      <SeoHead />
      <Header />
      <main className="pb-24 pt-28">
        <section className="hero-gradient border-b border-border/50 pb-16 pt-8 md:pb-24">
          <div className="container max-w-6xl">
            <PageBreadcrumbs
              items={[
                { label: t("homeNav"), href: buildLocalizedPath("home", language) },
                { label: t("helpNav"), href: helpPath },
                { label: content.breadcrumb },
              ]}
            />
            <div className="max-w-4xl">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <KeyRound className="h-7 w-7" aria-hidden="true" />
              </div>
              <p className="section-kicker mt-6">{content.kicker}</p>
              <h1 className="mt-3 text-4xl font-bold leading-tight text-foreground md:text-6xl">
                {content.title}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground md:text-xl">
                {content.intro}
              </p>
              <p className="mt-5 inline-flex rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-sm font-semibold text-foreground">
                {content.summary}
              </p>
            </div>
          </div>
        </section>

        <section className="section-gradient py-16 md:py-20">
          <div className="container max-w-6xl">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                {content.primerTitle}
              </h2>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <article className="feature-card">
                <KeyRound className="h-7 w-7 text-primary" aria-hidden="true" />
                <h3 className="mt-5 text-xl font-semibold text-foreground">
                  {content.apiKeyTitle}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {content.apiKeyBody}
                </p>
              </article>
              <article className="feature-card">
                <Coins className="h-7 w-7 text-primary" aria-hidden="true" />
                <h3 className="mt-5 text-xl font-semibold text-foreground">
                  {content.tokenTitle}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {content.tokenBody}
                </p>
              </article>
            </div>
            <p className="mx-auto mt-6 max-w-3xl rounded-2xl border border-border/70 bg-background/70 p-5 text-sm leading-7 text-muted-foreground">
              {content.accountNote}
            </p>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container max-w-6xl">
            <div className="max-w-3xl">
              <p className="section-kicker">{content.providersKicker}</p>
              <h2 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">
                {content.providersTitle}
              </h2>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                {content.providersDescription}
              </p>
            </div>
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {(Object.keys(PROVIDER_LINKS) as Array<keyof typeof PROVIDER_LINKS>).map(
                (provider) => (
                  <article key={provider} className="glass-card flex h-full flex-col p-6">
                    <h3 className="text-2xl font-semibold text-foreground">{provider}</h3>
                    <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">
                      {content.providerNotes[provider]}
                    </p>
                    <a
                      href={PROVIDER_LINKS[provider]}
                      target="_blank"
                      rel="noreferrer"
                      className="trust-chip-link mt-6 w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                      {content.providerCta(provider)}
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </article>
                )
              )}
            </div>
          </div>
        </section>

        <section className="section-gradient py-16 md:py-20">
          <div className="container max-w-6xl">
            <div className="max-w-3xl">
              <p className="section-kicker">{content.setupKicker}</p>
              <h2 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">
                {content.setupTitle}
              </h2>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                {content.setupDescription}
              </p>
            </div>
            <ol className="mt-10 grid gap-5 md:grid-cols-2">
              {content.steps.map((step, index) => (
                <li key={step.title} className="feature-card">
                  <div className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      {index + 2}
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.body}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {content.screenshots.map((screenshot) => (
                <figure
                  key={screenshot.label}
                  className="overflow-hidden rounded-[2rem] border border-border/70 bg-background/75 shadow-[0_24px_80px_-60px_rgba(255,76,145,0.55)]"
                >
                  <img
                    data-testid="byok-guide-screenshot"
                    src={screenshot.src}
                    alt={screenshot.alt}
                    width={1600}
                    height={1280}
                    loading="lazy"
                    className="aspect-[5/4] w-full bg-[#e8eaed] object-cover"
                  />
                  <figcaption className="border-t border-border/60 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                      {screenshot.label}
                    </p>
                    <h3 className="mt-2 font-semibold text-foreground">{screenshot.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{screenshot.body}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container max-w-6xl">
            <div className="grid gap-6 lg:grid-cols-2">
              <article className="rounded-[2rem] border border-primary/25 bg-primary/[0.06] p-7 md:p-9">
                <ShieldCheck className="h-8 w-8 text-primary" aria-hidden="true" />
                <h2 className="mt-5 text-2xl font-bold text-foreground">
                  {content.securityTitle}
                </h2>
                <p className="mt-4 text-base leading-7 text-foreground">{content.securityBody}</p>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {content.securityDetail}
                </p>
              </article>
              <article className="rounded-[2rem] border border-border/70 bg-card/60 p-7 md:p-9">
                <Coins className="h-8 w-8 text-primary" aria-hidden="true" />
                <h2 className="mt-5 text-2xl font-bold text-foreground">{content.costTitle}</h2>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{content.costBody}</p>
                <p className="mt-4 rounded-2xl border border-border/70 bg-background/70 p-4 text-sm leading-6 text-foreground">
                  {content.geminiNote}
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="section-gradient py-16 md:py-20">
          <div className="container max-w-4xl">
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              {content.troubleshootingTitle}
            </h2>
            <div className="mt-8 space-y-4">
              {content.troubleshooting.map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-border/70 bg-card/60 p-5"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                    <div>
                      <h3 className="font-semibold text-foreground">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.body}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-12 rounded-[2rem] border border-primary/20 bg-card/70 p-8 text-center shadow-[0_24px_80px_-56px_rgba(255,76,145,0.65)]">
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                {content.finishTitle}
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
                {content.finishBody}
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link to={helpPath} className="trust-chip-link">
                  {content.backToHelp}
                </Link>
                <Link to={intakeAIPath} className="trust-chip-link">
                  {content.intakeAI}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ByokGuidePage;
