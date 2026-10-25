// Builds the Starlight pages from the help topics in ../content/help.
// content/help stays the single source: the landing tests, the coverage map and
// both apps' link fixtures read it. Output (src/content/docs, public/img,
// src/generated) is generated on every build and not committed.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const HELP = process.env.HELP_DIR ?? path.join(ROOT, '..', 'content', 'help');
const DOCS = path.join(ROOT, 'src', 'content', 'docs');
const IMG = path.join(ROOT, 'public', 'img');
const GENERATED = path.join(ROOT, 'src', 'generated');
// Drafts show on previews, never on the production site.
const HIDE_DRAFTS = process.env.VERCEL_ENV === 'production';
const LANGS = ['de', 'en'];

// Lucide icons (same family as getintake.de) for the sidebar entries and start page cards.
const AREA_ICONS = {
  heute: 'sun', logging: 'utensils', 'recipes-library': 'book-open', 'goals-budget': 'target',
  fasting: 'timer', water: 'droplet', 'weight-body': 'scale', stats: 'chart-column',
  health: 'heart-pulse', sync: 'refresh-cw', 'widgets-watch-shortcuts': 'layout-grid',
  'intake-ai': 'sparkles', settings: 'settings',
};
const GETTING_STARTED_ICONS = {
  install: 'download', 'set-up': 'user-cog', 'first-food': 'utensils',
  'understand-today': 'sun', 'weight-and-water': 'scale', 'more-features': 'sparkles',
};
const GETTING_STARTED_ICON = 'rocket';
const ICON_DIR = path.join(ROOT, 'node_modules', 'lucide-static', 'icons');
const iconSvg = (name) => fs.readFileSync(path.join(ICON_DIR, `${name}.svg`), 'utf8').replace(/<!--[\s\S]*?-->/g, '').replace(/\s*\n\s*/g, ' ').trim();
const iconUrl = (name) => `url("data:image/svg+xml,${encodeURIComponent(iconSvg(name))}")`;

// getintake.de pages linked from the docs. External links in the sidebar are the
// same on every locale, so src/routeData.ts swaps the German URL for the English
// one on English pages (from src/generated/external-links.json).
const SITE = 'https://www.getintake.de';
const FAQ_URL = { de: `${SITE}/hilfe`, en: `${SITE}/en/help` };
const PRIVACY_URL = { de: `${SITE}/privacy`, en: `${SITE}/en/privacy` };
const NEW_TAB = { target: '_blank', rel: 'noopener' };

// Store links come from the landing page (src/lib/storeLinks.ts), so both sites
// link the same listings: the German App Store for German pages.
const storeLinks = fs.readFileSync(path.join(ROOT, '..', 'src', 'lib', 'storeLinks.ts'), 'utf8');
const storeUrl = (re) => {
  const m = storeLinks.match(re);
  if (!m) throw new Error(`src/lib/storeLinks.ts: no match for ${re}`);
  return m[1];
};
const STORE = {
  de: { appStore: storeUrl(/\bde:\s*"(https:\/\/apps\.apple\.com\/[^"]+)"/), badgeApple: '/badges/app-store-de.svg', altApple: 'Laden im App Store', badgeGoogle: '/badges/google-play-de.png', altGoogle: 'Jetzt bei Google Play' },
  en: { appStore: storeUrl(/\ben:\s*"(https:\/\/apps\.apple\.com\/[^"]+)"/), badgeApple: '/badges/app-store-en.svg', altApple: 'Download on the App Store', badgeGoogle: '/badges/google-play-en.png', altGoogle: 'Get it on Google Play' },
};
const GOOGLE_PLAY = storeUrl(/GOOGLE_PLAY_URL\s*=\s*"([^"]+)"/);

const AREAS = {
  heute: { de: 'Heute', en: 'Today' },
  logging: { de: 'Essen erfassen', en: 'Logging food' },
  'recipes-library': { de: 'Rezepte & Bibliothek', en: 'Recipes & Library' },
  'goals-budget': { de: 'Ziele & Wochenbudget', en: 'Goals & weekly budget' },
  fasting: { de: 'Fasten', en: 'Fasting' },
  water: { de: 'Wasser', en: 'Water' },
  'weight-body': { de: 'Gewicht & Körpermaße', en: 'Weight & body measurements' },
  stats: { de: 'Statistik', en: 'Stats' },
  health: { de: 'Apple Health & Health Connect', en: 'Apple Health & Health Connect' },
  sync: { de: 'Sync & Backup', en: 'Sync & backup' },
  'widgets-watch-shortcuts': { de: 'Widgets, Watch & Kurzbefehle', en: 'Widgets, Watch & Shortcuts' },
  'intake-ai': { de: 'Intake AI', en: 'Intake AI' },
  settings: { de: 'Einstellungen', en: 'Settings' },
};
const COPY = {
  de: { ios: 'iPhone', android: 'Android', more: 'Mehr erfahren', only: { ios: 'Nur auf dem iPhone', android: 'Nur auf Android' }, draft: 'Entwurf: Diese Seite ist noch nicht veröffentlicht.' },
  en: { ios: 'iPhone', android: 'Android', more: 'Learn more', only: { ios: 'Only on iPhone', android: 'Only on Android' }, draft: 'Draft: this page is not published yet.' },
};
// A body line `<!-- steps -->` places the steps there instead of before the body,
// so a tutorial can explain what to prepare before the in-app steps.
const STEPS_MARKER = '<!-- steps -->';
// A body line `<!-- store-badges -->` becomes the App Store and Google Play badges.
const BADGES_MARKER = '<!-- store-badges -->';
const storeBadges = (lang) => {
  const s = STORE[lang];
  return `<div class="store-badges not-content">
<a href="${s.appStore}" target="_blank" rel="noopener"><img src="${s.badgeApple}" alt="${s.altApple}" height="48" /></a>
<a href="${GOOGLE_PLAY}" target="_blank" rel="noopener"><img src="${s.badgeGoogle}" alt="${s.altGoogle}" height="48" /></a>
</div>`;
};
// Body text to MDX: links rewritten, special characters escaped, markers replaced.
const bodyText = (text, lang) => text.split(BADGES_MARKER).map((s) => esc(rewriteHelpLinks(s.trim()))).join(`\n\n${storeBadges(lang)}\n\n`).trim();

// MDX would read { } < > in plain help text as code.
const esc = (s) => String(s).replace(/[{}<>]/g, (c) => ({ '{': '&#123;', '}': '&#125;', '<': '&lt;', '>': '&gt;' })[c]);
const yamlString = (s) => JSON.stringify(String(s));

function readTopic(id, lang) {
  const file = path.join(HELP, id, `${lang}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, 'utf8');
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) throw new Error(`${file}: no frontmatter`);
  return { data: parse(m[1]), body: m[2].trim() };
}

function stepList(topic, id, lang, platform) {
  return (topic.data.steps ?? []).map((step, i) => {
    const p = step[platform] ?? {};
    let img = '';
    if (p.image) {
      const src = path.join(HELP, id, p.image);
      if (fs.existsSync(src)) {
        const rel = `${id}/${lang}/${platform}/${i + 1}${path.extname(src)}`;
        fs.mkdirSync(path.dirname(path.join(IMG, rel)), { recursive: true });
        fs.copyFileSync(src, path.join(IMG, rel));
        img = `\n\n   <img class="step-shot" src="/img/${rel}" alt="" loading="lazy" decoding="async" />`;
      }
    }
    return `${i + 1}. ${esc(rewriteHelpLinks(p.text ?? step.text))}${img}`;
  }).join('\n\n');
}

// Topic bodies still link the old getintake.de help pages (/hilfe/<slug>,
// /en/help/<slug>). On the docs those become /<id>/ and /en/<id>/; a link to a
// topic that is not published here turns into plain text instead of a 404.
function rewriteHelpLinks(text) {
  return text.replace(/\[([^\]]+)\]\((?:https:\/\/(?:www\.)?getintake\.de)?\/(hilfe|en\/help)\/([a-z0-9-]+)(#[^)]*)?\)/g, (all, label, base, slug) => {
    const lang = base === 'hilfe' ? 'de' : 'en';
    const topic = manifest.topics.find((t) => t.slugs[lang] === slug);
    if (!topic || !published.has(topic.id)) return label;
    return `[${label}](${lang === 'de' ? '' : '/en'}/${topic.id}/)`;
  });
}

const manifest = JSON.parse(fs.readFileSync(path.join(HELP, 'topics.json'), 'utf8'));
for (const dir of [DOCS, IMG, GENERATED]) fs.rmSync(dir, { recursive: true, force: true });

const published = new Set();
const publishedIn = (area) => manifest.topics.filter((x) => x.area === area).flatMap((t) => {
  const entries = Object.fromEntries(LANGS.map((l) => [l, readTopic(t.id, l)]));
  if (!entries.de || !entries.en) return [];
  if (HIDE_DRAFTS && (entries.de.data.draft || entries.en.data.draft)) return [];
  published.add(t.id);
  return [t.id];
});
const gettingStarted = publishedIn('getting-started');
// The manual: one collapsed group per area (the current chapter opens).
const manual = [];
for (const area of Object.keys(AREAS)) {
  const items = publishedIn(area);
  if (items.length) manual.push({ area, label: AREAS[area].de, translations: { en: AREAS[area].en }, collapsed: true, items });
}

for (const t of manifest.topics.filter((x) => published.has(x.id))) {
  for (const lang of LANGS) {
    const topic = readTopic(t.id, lang);
    const c = COPY[lang];
    const both = t.platforms.includes('ios') && t.platforms.includes('android');
    const only = both ? null : t.platforms[0];
    const parts = [`import { Tabs, TabItem, Aside } from '@astrojs/starlight/components';`, '', esc(rewriteHelpLinks(topic.data.short))];
    if (topic.data.draft) parts.splice(2, 0, `<Aside type="caution">${c.draft}</Aside>`, '');
    if (only) parts.push('', `<Aside type="note" title=${yamlString(topic.data.platformNote ?? c.only[only])} />`);
    const [before, after] = topic.body.includes(STEPS_MARKER) ? topic.body.split(STEPS_MARKER).map((s) => s.trim()) : ['', topic.body];
    if (before) parts.push('', bodyText(before, lang));
    if (topic.data.steps?.length) {
      if (both) {
        parts.push('', '<Tabs syncKey="platform">', `<TabItem label="${c.ios}">`, '', stepList(topic, t.id, lang, 'ios'), '', '</TabItem>',
          `<TabItem label="${c.android}">`, '', stepList(topic, t.id, lang, 'android'), '', '</TabItem>', '</Tabs>');
      } else {
        parts.push('', stepList(topic, t.id, lang, only));
      }
    }
    if (after) parts.push('', bodyText(after, lang));
    const related = (topic.data.related ?? []).flatMap((r) => {
      const prefix = lang === 'de' ? '' : '/en';
      return published.has(r) ? [`- [${readTopic(r, lang).data.title}](${prefix}/${r}/)`] : [];
    });
    if (related.length) parts.push('', `## ${c.more}`, '', ...related);
    const fm = `---\ntitle: ${yamlString(topic.data.title)}\ndescription: ${yamlString(topic.data.short)}\n---\n`;
    const dir = lang === 'de' ? DOCS : path.join(DOCS, 'en');
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, `${t.id}.mdx`), fm + parts.join('\n') + '\n');
  }
}

// Home: a regular docs page ("Dokumentation") with a welcome line and one card
// per chapter: Erste Schritte first, then the manual's areas, then the FAQ.
const AREA_CARDS = {
  heute: { de: 'Kalorienring, Mahlzeiten und die Heute-Seite anpassen.', en: 'The calorie ring, your meals and customizing Today.' },
  logging: { de: 'Suchen, scannen, Portionen und schnell erfassen.', en: 'Search, scan, portions and quick logging.' },
  'recipes-library': { de: 'Rezepte, Routinen und eigene Produkte.', en: 'Recipes, routines and your own products.' },
  'goals-budget': { de: 'Kalorienziel, Makros und Wochenbudget.', en: 'Calorie goal, macros and weekly budget.' },
  fasting: { de: 'Zeitplan, Timer und Erinnerungen.', en: 'Schedule, timer and reminders.' },
  water: { de: 'Wasserziel, Getränke und Erinnerungen.', en: 'Water goal, drinks and reminders.' },
  'weight-body': { de: 'Gewicht und Körpermaße eintragen.', en: 'Log your weight and body measurements.' },
  stats: { de: 'Woche, Monat und Jahr im Überblick.', en: 'Week, month and year at a glance.' },
  health: { de: 'Apple Health und Health Connect verbinden.', en: 'Connect Apple Health and Health Connect.' },
  sync: { de: 'iCloud, Backup und mehrere Geräte.', en: 'iCloud, backup and more than one device.' },
  'widgets-watch-shortcuts': { de: 'Widgets, Apple Watch und Kurzbefehle.', en: 'Widgets, Apple Watch and Shortcuts.' },
  'intake-ai': { de: 'Mit KI erfassen, im Abo oder mit eigenem Schlüssel.', en: 'Log with AI, by subscription or with your own key.' },
  settings: { de: 'Alles in den Einstellungen.', en: 'Everything in Settings.' },
};
const LABELS = {
  intro: { de: 'Einführung', en: 'Introduction' },
  docs: { de: 'Dokumentation', en: 'Documentation' },
  faq: { de: 'FAQ', en: 'FAQ' },
  privacy: { de: 'Datenschutz', en: 'Privacy' },
  gettingStarted: { de: 'Erste Schritte', en: 'Getting started' },
  manual: { de: 'Handbuch', en: 'User manual' },
};
const HOME = {
  de: {
    description: 'Willkommen in der Dokumentation von Intake',
    intro: 'Hier findest du jede Funktion von Intake, Schritt für Schritt und mit Screenshots erklärt. Alles gilt für iPhone und Android, wo sich die Apps unterscheiden, zeigt dir jede Seite beide Wege.',
    gettingStarted: 'Intake installieren, einrichten und das erste Essen erfassen.',
    faq: 'Antworten auf die häufigsten Fragen vor dem Kauf.',
  },
  en: {
    description: 'Welcome to the Intake documentation',
    intro: 'Here you’ll find every Intake feature, explained step by step with screenshots. It all applies to iPhone and Android, and where the apps differ, each page shows you both ways.',
    gettingStarted: 'Install Intake, set it up and log your first food.',
    faq: 'Answers to the most common questions before you buy.',
  },
};
const html = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const card = ({ href, icon, title, text, external }) =>
  `<a class="doc-card" href="${href}"${external ? ' target="_blank" rel="noopener"' : ''}><span class="doc-card-icon" aria-hidden="true">${iconSvg(icon)}</span><span class="doc-card-body"><strong>${html(title)}</strong><span>${html(text)}</span></span></a>`;
for (const lang of LANGS) {
  const prefix = lang === 'de' ? '' : '/en';
  const c = HOME[lang];
  const cards = [];
  if (gettingStarted.length) cards.push(card({ href: `${prefix}/${gettingStarted[0]}/`, icon: GETTING_STARTED_ICON, title: LABELS.gettingStarted[lang], text: c.gettingStarted }));
  for (const group of manual) {
    cards.push(card({ href: `${prefix}/${group.items[0]}/`, icon: AREA_ICONS[group.area], title: AREAS[group.area][lang], text: AREA_CARDS[group.area][lang] }));
  }
  cards.push(card({ href: FAQ_URL[lang], icon: 'circle-help', title: LABELS.faq[lang], text: c.faq, external: true }));
  // Markdown, not MDX: the card grid is plain HTML and passes through untouched.
  const page = `---
title: ${yamlString(LABELS.docs[lang])}
description: ${yamlString(c.description)}
---

${c.intro}

<div class="doc-cards not-content">
${cards.join('\n')}
</div>
`;
  const dir = lang === 'de' ? DOCS : path.join(DOCS, 'en');
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.md'), page);
}

// Sidebar: Einführung, Erste Schritte, Handbuch. Internal links are written once;
// Starlight puts /en in front of them on English pages.
const label = (key) => ({ label: LABELS[key].de, translations: { en: LABELS[key].en } });
const icon = (name) => ({ 'data-icon': name });
const sidebar = [
  { ...label('intro'), collapsed: false, items: [
    { ...label('docs'), link: '/', attrs: icon('book-open') },
    { ...label('faq'), link: FAQ_URL.de, attrs: { ...NEW_TAB, ...icon('circle-help') } },
    { ...label('privacy'), link: PRIVACY_URL.de, attrs: { ...NEW_TAB, ...icon('shield') } },
  ] },
];
if (gettingStarted.length) {
  sidebar.push({ ...label('gettingStarted'), collapsed: false, items: gettingStarted.map((id) => {
    const title = Object.fromEntries(LANGS.map((l) => [l, readTopic(id, l).data.title]));
    return { slug: id, label: title.de, translations: { en: title.en }, attrs: icon(GETTING_STARTED_ICONS[id]) };
  }) });
}
sidebar.push({ ...label('manual'), collapsed: false, items: manual.map(({ area, ...group }) => group) });
fs.mkdirSync(GENERATED, { recursive: true });
fs.writeFileSync(path.join(GENERATED, 'sidebar.json'), JSON.stringify(sidebar, null, 2) + '\n');
fs.writeFileSync(path.join(GENERATED, 'external-links.json'), JSON.stringify({ [FAQ_URL.de]: FAQ_URL.en, [PRIVACY_URL.de]: PRIVACY_URL.en }, null, 2) + '\n');

// Sidebar icons. Links carry data-icon; the manual's area groups have no attributes,
// so they are found by position, which is only known here (an area without
// published topics is left out).
const iconNames = new Set(['book-open', 'circle-help', 'shield', ...gettingStarted.map((id) => GETTING_STARTED_ICONS[id])]);
const manualLi = `.sidebar-content ul.top-level > li:nth-child(${sidebar.length}) > details > ul > li`;
const css = [
  ...[...iconNames].map((name) => `.sidebar-content a[data-icon='${name}'] { --entry-icon: ${iconUrl(name)}; }`),
  ...manual.map((group, i) => `${manualLi}:nth-child(${i + 1}) > details > summary { --entry-icon: ${iconUrl(AREA_ICONS[group.area])}; }`),
  `.sidebar-content a[data-icon] > span::before,
${manualLi} > details > summary .group-label > span::before {
  content: '';
  display: inline-block;
  width: 1.15em;
  height: 1.15em;
  margin-inline-end: 0.6em;
  vertical-align: -0.2em;
  background-color: var(--sl-color-accent);
  -webkit-mask: var(--entry-icon) center / contain no-repeat;
  mask: var(--entry-icon) center / contain no-repeat;
}`,
];
fs.writeFileSync(path.join(GENERATED, 'sidebar-icons.css'), `/* Generated by scripts/generate.mjs. */\n${css.join('\n')}\n`);
console.log(`docs: ${published.size} topics, drafts ${HIDE_DRAFTS ? 'hidden' : 'shown'}`);
