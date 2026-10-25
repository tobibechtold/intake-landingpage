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
// Pages that live on getintake.de, linked from the docs instead of copied.
const EXTERNAL = {
  byokGuide: { de: 'https://www.getintake.de/hilfe/eigener-api-schluessel', en: 'https://www.getintake.de/en/help/own-api-key' },
};

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
    return `${i + 1}. ${esc(p.text ?? step.text)}${img}`;
  }).join('\n\n');
}

const manifest = JSON.parse(fs.readFileSync(path.join(HELP, 'topics.json'), 'utf8'));
for (const dir of [DOCS, IMG, GENERATED]) fs.rmSync(dir, { recursive: true, force: true });

const published = new Set();
const sidebar = [];
const external = [];
for (const area of Object.keys(AREAS)) {
  const items = [];
  for (const t of manifest.topics.filter((x) => x.area === area)) {
    const entries = Object.fromEntries(LANGS.map((l) => [l, readTopic(t.id, l)]));
    if (!entries.de || !entries.en) continue;
    if (HIDE_DRAFTS && (entries.de.data.draft || entries.en.data.draft)) continue;
    const custom = entries.de.data.customPage;
    if (custom) external.push({ id: t.id, ...EXTERNAL[custom] });
    published.add(t.id);
    items.push(t.id);
  }
  if (items.length) sidebar.push({ label: AREAS[area].de, translations: { en: AREAS[area].en }, collapsed: true, items });
}

for (const t of manifest.topics.filter((x) => published.has(x.id))) {
  for (const lang of LANGS) {
    const topic = readTopic(t.id, lang);
    const c = COPY[lang];
    const both = t.platforms.includes('ios') && t.platforms.includes('android');
    const only = both ? null : t.platforms[0];
    const ext = external.find((e) => e.id === t.id);
    if (ext) {
      const cta = lang === 'de' ? 'Zur Anleitung' : 'Open the guide';
      const page = `---\ntitle: ${yamlString(topic.data.title)}\ndescription: ${yamlString(topic.data.short)}\n---\nimport { LinkButton } from '@astrojs/starlight/components';\n\n${esc(topic.data.short)}\n\n<LinkButton href=${yamlString(ext[lang])}>${cta}</LinkButton>\n`;
      const dir = lang === 'de' ? DOCS : path.join(DOCS, 'en');
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, `${t.id}.mdx`), page);
      continue;
    }
    const parts = [`import { Tabs, TabItem, Aside } from '@astrojs/starlight/components';`, '', esc(topic.data.short)];
    if (topic.data.draft) parts.splice(2, 0, `<Aside type="caution">${c.draft}</Aside>`, '');
    if (only) parts.push('', `<Aside type="note" title=${yamlString(topic.data.platformNote ?? c.only[only])} />`);
    if (topic.data.steps?.length) {
      if (both) {
        parts.push('', '<Tabs syncKey="platform">', `<TabItem label="${c.ios}">`, '', stepList(topic, t.id, lang, 'ios'), '', '</TabItem>',
          `<TabItem label="${c.android}">`, '', stepList(topic, t.id, lang, 'android'), '', '</TabItem>', '</Tabs>');
      } else {
        parts.push('', stepList(topic, t.id, lang, only));
      }
    }
    if (topic.body) parts.push('', esc(topic.body));
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

// Home: one card per area, linking its topics.
for (const lang of LANGS) {
  const prefix = lang === 'de' ? '' : '/en';
  const home = lang === 'de'
    ? { title: 'Intake Docs', tagline: 'Jede Funktion von Intake, Schritt für Schritt erklärt. Für iPhone und Android.' }
    : { title: 'Intake Docs', tagline: 'Every Intake feature, explained step by step. On iPhone and Android.' };
  const cards = sidebar.map((group) => {
    const label = lang === 'de' ? group.label : group.translations.en;
    const links = group.items.map((id) => `- [${readTopic(id, lang).data.title}](${prefix}/${id}/)`).join('\n');
    return `<Card title=${yamlString(label)}>\n\n${links}\n\n</Card>`;
  }).join('\n\n');
  const page = `---\ntitle: ${yamlString(home.title)}\ndescription: ${yamlString(home.tagline)}\ntemplate: splash\nhero:\n  tagline: ${yamlString(home.tagline)}\n---\nimport { Card, CardGrid } from '@astrojs/starlight/components';\n\n<CardGrid>\n\n${cards}\n\n</CardGrid>\n`;
  const dir = lang === 'de' ? DOCS : path.join(DOCS, 'en');
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.mdx'), page);
}

fs.mkdirSync(GENERATED, { recursive: true });
fs.writeFileSync(path.join(GENERATED, 'sidebar.json'), JSON.stringify(sidebar, null, 2) + '\n');
console.log(`docs: ${published.size} topics, ${external.length} external, drafts ${HIDE_DRAFTS ? 'hidden' : 'shown'}`);
