// Writes the help-topic redirects into vercel.json. The help topics moved from
// getintake.de/hilfe/<slug> and /en/help/<slug> to the docs site, so every published
// slug (the apps and old links still use them) gets a permanent redirect:
//   /hilfe/<de slug>   -> https://docs.getintake.de/<topic id>
//   /en/help/<en slug> -> https://docs.getintake.de/en/<topic id>
// Topics with a customPage (the BYOK guide) keep their own page and get none.
//
// Vercel passes the incoming query string on to the destination by default, so
// ?platform=ios&source=app survives without a pattern; the destinations carry no query.
//
// Only redirects pointing at the docs site are replaced; every other rewrite and
// redirect stays as it is. Run after a topic is added to content/help/topics.json:
//   node scripts/help-redirects.mjs
// test/vercel-config.test.ts fails while vercel.json is out of date.
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const DOCS_ORIGIN = 'https://docs.getintake.de';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');

/** True when content/help/<id>/<lang>.md declares a customPage in its frontmatter. */
const hasCustomPage = (id, root) =>
  ['de', 'en'].some((lang) => {
    const file = join(root, 'content/help', id, `${lang}.md`);
    if (!existsSync(file)) return false;
    const frontmatter = /^---\n([\s\S]*?)\n---/.exec(readFileSync(file, 'utf8'))?.[1] ?? '';
    return /^customPage:/m.test(frontmatter);
  });

/** The help redirects for the current manifest, in manifest order. */
export const helpRedirects = (root = ROOT) => {
  const manifest = JSON.parse(readFileSync(join(root, 'content/help/topics.json'), 'utf8'));
  return manifest.topics
    .filter((topic) => !hasCustomPage(topic.id, root))
    .flatMap((topic) => [
      { source: `/hilfe/${topic.slugs.de}`, destination: `${DOCS_ORIGIN}/${topic.id}`, permanent: true },
      { source: `/en/help/${topic.slugs.en}`, destination: `${DOCS_ORIGIN}/en/${topic.id}`, permanent: true },
    ]);
};

/** A help redirect is any redirect whose destination is on the docs site. */
export const isHelpRedirect = (redirect) =>
  typeof redirect.destination === 'string' && redirect.destination.startsWith(DOCS_ORIGIN);

// Keeps the file's style: short objects on one line, the rest expanded.
const format = (value, indent = '') => {
  const inner = indent + '  ';
  if (Array.isArray(value)) {
    if (value.length === 0) return '[]';
    return `[\n${value.map((item) => inner + format(item, inner)).join(',\n')}\n${indent}]`;
  }
  if (value && typeof value === 'object') {
    const entries = Object.entries(value);
    const oneLine = `{ ${entries.map(([key, item]) => `${JSON.stringify(key)}: ${JSON.stringify(item)}`).join(', ')} }`;
    const nested = entries.some(([, item]) => item && typeof item === 'object');
    // Array items of a top-level list (rewrites, redirects) stay on one line; deeper ones only when short.
    if (!nested && (indent.length <= 4 || oneLine.length + indent.length <= 100)) return oneLine;
    return `{\n${entries.map(([key, item]) => `${inner}${JSON.stringify(key)}: ${format(item, inner)}`).join(',\n')}\n${indent}}`;
  }
  return JSON.stringify(value);
};

export const writeHelpRedirects = (root = ROOT) => {
  const file = join(root, 'vercel.json');
  const config = JSON.parse(readFileSync(file, 'utf8'));
  const redirects = helpRedirects(root);
  config.redirects = [...(config.redirects ?? []).filter((redirect) => !isHelpRedirect(redirect)), ...redirects];
  writeFileSync(file, format(config) + '\n');
  return redirects.length;
};

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const count = writeHelpRedirects();
  console.log(`vercel.json: ${count} help redirects`);
}
