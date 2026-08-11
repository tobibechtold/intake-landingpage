// Re-records test/fixtures/page-text-snapshot.json from the current dist/.
// Run only when a text change is intentional:
//   npm run build && node scripts/snapshot-text.mjs
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { createHash } from 'node:crypto';

const walk = (dir, out = []) => {
  for (const e of readdirSync(dir)) {
    const f = join(dir, e);
    if (statSync(f).isDirectory()) walk(f, out);
    else if (e === 'index.html' || e === '404.html') out.push(f);
  }
  return out;
};

export const routeFor = (file) => {
  const rel = relative('dist', file);
  if (rel === '404.html') return '/404';
  const r = '/' + rel.replace(/\/?index\.html$/, '');
  return r === '/' ? '/' : r.replace(/\/$/, '');
};

export const visibleText = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<style[\s\S]*?<\/style>/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const snap = {};
for (const f of walk('dist')) {
  const text = visibleText(readFileSync(f, 'utf8'));
  snap[routeFor(f)] = {
    words: text.split(' ').length,
    sha: createHash('sha256').update(text).digest('hex').slice(0, 16),
  };
}
const sorted = Object.fromEntries(Object.keys(snap).sort().map((k) => [k, snap[k]]));
writeFileSync('test/fixtures/page-text-snapshot.json', JSON.stringify(sorted, null, 2) + '\n');
console.log(`re-recorded ${Object.keys(sorted).length} routes`);
