import { writeFile } from 'node:fs/promises';
import { PRERENDER_ROUTES } from './prerender-seo.js';

const routes = [...new Set(PRERENDER_ROUTES)].sort();
await writeFile(
  'test/fixtures/production-urls.json',
  JSON.stringify(routes, null, 2) + '\n',
  'utf8',
);
console.log(`froze ${routes.length} routes`);
