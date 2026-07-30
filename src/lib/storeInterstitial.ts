import type { Language } from "@/i18n/translations";

export interface StoreInterstitialOptions {
  storeUrl: string;
  language: Language;
}

interface Copy {
  documentTitle: string;
  heading: string;
  lead: string;
  cta: string;
  fallbackTitle: string;
  stepOne: string;
  stepTwo: string;
  copyLink: string;
  copied: string;
}

const COPY: Record<Language, Copy> = {
  de: {
    documentTitle: "Intake im App Store öffnen",
    heading: "Fast geschafft",
    lead: "Instagram lässt den App Store nicht direkt öffnen. Tippe auf den Button — falls nichts passiert, nimm den Weg darunter.",
    cta: "Im App Store öffnen",
    fallbackTitle: "Wenn der Button nicht reagiert",
    stepOne: "Tippe oben rechts auf ⋯",
    stepTwo: "Wähle „Im Browser öffnen“",
    copyLink: "Link kopieren",
    copied: "Link kopiert ✓",
  },
  en: {
    documentTitle: "Open Intake in the App Store",
    heading: "Almost there",
    lead: "Instagram won't open the App Store directly. Tap the button — if nothing happens, use the route below.",
    cta: "Open in the App Store",
    fallbackTitle: "If the button does nothing",
    stepOne: "Tap ⋯ in the top right",
    stepTwo: 'Choose "Open in browser"',
    copyLink: "Copy link",
    copied: "Link copied ✓",
  },
};

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

// JSON.stringify alone is not enough inside a <script> block: a "</script>" in
// the value would close the element early. Escaping "<" keeps it inert.
const toJsString = (value: string): string => JSON.stringify(value).replace(/</g, "\\u003C");

/**
 * Standalone page served to in-app browsers that silently swallow App Store
 * links, in place of the usual 302.
 *
 * Deliberately does not navigate on load. Auto-redirecting would reproduce the
 * exact failure this page exists to replace — a spinner that resolves to
 * nothing — for the users who are actually affected. The store button is kept
 * as the primary action anyway, because it costs nothing and still works for
 * anyone whose browser is not affected; the manual escape sits directly beneath
 * it rather than behind a "didn't work?" disclosure.
 */
export const buildStoreInterstitial = ({ storeUrl, language }: StoreInterstitialOptions): string => {
  const copy = COPY[language];
  const href = escapeHtml(storeUrl);

  return `<!doctype html>
<html lang="${language}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>${escapeHtml(copy.documentTitle)}</title>
<style>
  * { box-sizing: border-box; }
  body {
    margin: 0; padding: 40px 22px;
    font: 16px/1.55 -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
    background: hsl(240 16% 5%); color: hsl(0 0% 96%);
    min-height: 100vh; display: flex; align-items: center; justify-content: center;
  }
  main { width: 100%; max-width: 24rem; text-align: center; }
  h1 { font-size: 1.6rem; line-height: 1.2; margin: 0 0 10px; letter-spacing: -.02em; }
  .lead { margin: 0 0 28px; color: hsl(0 0% 96% / .68); font-size: .95rem; }
  .cta {
    display: block; padding: 17px 20px; border-radius: 1rem;
    background: linear-gradient(135deg, hsl(338 92% 63%) 0%, hsl(24 95% 65%) 100%);
    color: #fff; text-decoration: none; font-weight: 650; font-size: 1.02rem;
    box-shadow: 0 0 34px -12px hsl(338 92% 63% / .55);
  }
  .fallback {
    margin-top: 30px; padding: 18px; border-radius: 1rem; text-align: left;
    border: 1px solid hsl(0 0% 100% / .12); background: hsl(0 0% 100% / .04);
  }
  .fallback h2 {
    margin: 0 0 12px; font-size: .74rem; font-weight: 650;
    text-transform: uppercase; letter-spacing: .06em; color: hsl(0 0% 96% / .5);
  }
  ol { margin: 0; padding-left: 1.15rem; font-size: .9rem; color: hsl(0 0% 96% / .85); }
  li + li { margin-top: 5px; }
  .copy {
    margin-top: 14px; width: 100%; padding: 12px; border-radius: .75rem; cursor: pointer;
    font: inherit; font-size: .88rem; font-weight: 550; -webkit-appearance: none;
    border: 1px solid hsl(0 0% 100% / .18); background: transparent; color: hsl(0 0% 96% / .9);
  }
</style>
</head>
<body>
<main>
  <h1>${escapeHtml(copy.heading)}</h1>
  <p class="lead">${escapeHtml(copy.lead)}</p>
  <a class="cta" href="${href}">${escapeHtml(copy.cta)}</a>
  <section class="fallback">
    <h2>${escapeHtml(copy.fallbackTitle)}</h2>
    <ol>
      <li>${escapeHtml(copy.stepOne)}</li>
      <li>${escapeHtml(copy.stepTwo)}</li>
    </ol>
    <button class="copy" id="copy">${escapeHtml(copy.copyLink)}</button>
  </section>
</main>
<script>
(function () {
  var url = ${toJsString(storeUrl)};
  var button = document.getElementById("copy");
  button.addEventListener("click", function () {
    var done = function () { button.textContent = ${toJsString(copy.copied)}; };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(done, function () { window.prompt(url); });
    } else {
      window.prompt(url);
    }
  });
})();
</script>
</body>
</html>`;
};
