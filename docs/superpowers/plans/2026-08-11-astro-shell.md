# Astro Shell Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Vite SPA shell with Astro static output so every one of the 66 production URLs is served as real, complete HTML at build time, and delete `scripts/prerender-seo.js`.

**Architecture:** Astro takes over routing, `<head>`, layouts and the sitemap. Existing React page components mount as build-time-rendered islands, so crawlers get the full real page before any component is rewritten. Route files stay thin; page content lives once in shared components. No page markup is rewritten in this plan — that is the follow-up plan.

**Tech Stack:** Astro 7.2.0 (static output), `@astrojs/vercel` 11, `@astrojs/react` 6, `@astrojs/sitemap` 3, React 18.3.1, Tailwind 3.4.17 via plain PostCSS, **vitest 4**, npm.

> **Forced during execution:** vitest was bumped 3.2.4 → 4.1.10 and the stale top-level `vite@5.4.19`
> removed. Astro 7 needs Vite ^8; vitest 3 peers Vite 6, and `getViteConfig()` crashed with
> `TypeError: Cannot read properties of undefined (reading 'ssr')` until vitest 4 (peers `^6 || ^7 || ^8`).
> `vite@5.4.19` still resolves transitively via `@vitejs/plugin-react-swc` and `lovable-tagger`;
> both are removed in Task 8, which clears it.

**Spec:** `docs/superpowers/specs/2026-08-11-astro-migration-design.md`

## Global Constraints

- **Branch:** `feat/astro-migration`. Push freely; preview deploys are wanted.
- **Every existing URL must survive byte-for-byte.** No renames, no new redirects except the one locale rule in Task 9. The frozen list in `test/fixtures/production-urls.json` is the contract.
- **`astro.config.mjs` must set `trailingSlash: 'never'`** — otherwise Astro emits `/en/` and the locale redirect chains.
- **`output: 'static'`.** Never `'server'`. No page may set `export const prerender = false` in this plan.
- **Do not modify `api/go.ts`** or the `/go/*` rewrite in `vercel.json`. The attribution chain is cross-repo.
- **Do not use `@astrojs/tailwind`** — it caps at `astro: ^5`. Tailwind 3 is driven by the existing `postcss.config.js`, which Astro loads through Vite automatically.
- **Pin Astro exactly** (`"astro": "7.2.0"`, no caret). The Container API used in Task 10 is experimental and Astro's docs warn it is "subject to breaking changes, even in minor or patch releases".
- **Locale copy is never invented.** German and English strings come from `src/i18n/translations.ts` or `scripts/prerender-seo.js`; never hand-write new marketing copy.
- Commit after every task.

---

### Task 1: Astro scaffolding and build pipeline

Replaces the Vite SPA entry with an Astro build that produces `dist/`. One placeholder page proves the pipeline; real routes come in Task 7.

**Files:**
- Create: `astro.config.mjs`, `src/pages/index.astro`, `src/env.d.ts`
- Modify: `package.json` (scripts + deps), `tsconfig.json`
- Delete: `index.html`, `vite.config.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: a working `npm run build` writing to `dist/`; `astro.config.mjs` exporting the i18n config consumed by Tasks 5 and 7.

- [ ] **Step 1: Install dependencies**

```bash
npm install --save-exact astro@7.2.0
npm install @astrojs/react@^6.0.2 @astrojs/vercel@^11.0.5 @astrojs/sitemap@^3.7.3
```

- [ ] **Step 2: Create `astro.config.mjs`**

```js
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://www.getintake.de',
  output: 'static',
  adapter: vercel(),
  trailingSlash: 'never',
  build: { format: 'directory' },
  integrations: [react(), sitemap()],
  // NOTE: sitemap() is deliberately configured without its `i18n` option.
  // That option assumes the same path under each locale prefix, but this site
  // uses translated slugs (/funktionen ↔ /en/features), which it would pair
  // wrongly. hreflang is emitted from BaseLayout instead (Task 4), which Google
  // treats as equivalent to sitemap-level hreflang.
  i18n: {
    locales: ['de', 'en'],
    defaultLocale: 'de',
    routing: { prefixDefaultLocale: false },
  },
});
```

- [ ] **Step 3: Create `src/env.d.ts`**

```ts
/// <reference types="astro/client" />
```

- [ ] **Step 4: Point `tsconfig.json` at Astro's base**

Replace the contents of `tsconfig.json` with:

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"],
  "compilerOptions": {
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] }
  }
}
```

The `@/*` alias must be preserved — roughly 150 files import through it.

- [ ] **Step 5: Replace the build scripts in `package.json`**

```json
"scripts": {
  "dev": "astro dev",
  "build": "astro build",
  "preview": "astro preview",
  "lint": "eslint .",
  "test": "vitest run",
  "test:watch": "vitest"
}
```

Note `build` no longer chains `node scripts/prerender.mjs`. That script is deleted in Task 8.

- [ ] **Step 6: Teach Tailwind about `.astro` files**

`tailwind.config.ts:7` currently globs only `{ts,tsx}`. Without this change every Tailwind class written in a `.astro` file is purged and pages build silently unstyled. Replace the `content` array with:

```ts
  content: [
    "./src/**/*.{ts,tsx,astro,html,mdx}",
    "./content/**/*.md",
  ],
```

The `./pages/**`, `./components/**` and `./app/**` globs are dropped — those directories do not exist in this repo and never matched anything.

- [ ] **Step 7: Create the placeholder `src/pages/index.astro`**

```astro
---
---
<html lang="de">
  <head><title>Intake</title></head>
  <body><h1>Astro shell online</h1></body>
</html>
```

- [ ] **Step 8: Delete the Vite SPA entry points**

```bash
git rm index.html vite.config.ts
```

`src/main.tsx` and `src/App.tsx` stay for now — Task 7 harvests the route table from `App.tsx` before it is deleted in Task 8.

**Before deleting, note what `index.html` carries that must be re-homed in `BaseLayout` (Task 4):**
the `robots` directive, `theme-color`, `color-scheme`, the 32×32 PNG favicon, the
`apple-itunes-app` Smart App Banner (`app-id=6757768955`), and the three
`apple-mobile-web-app-*` tags. These are captured in Task 4 Step 1 — do not lose them.

- [ ] **Step 9: Verify the build**

Run: `npm run build`
Expected: exits 0, and `dist/index.html` contains `Astro shell online`.

```bash
npm run build && grep -q "Astro shell online" dist/index.html && echo "PIPELINE OK"
```

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "switch build pipeline to astro"
git push
```

---

### Task 2: Freeze the production URL list and write the failing acceptance test

This is the safety net for the whole plan, and its red-to-green transition is the plan's definition of done. Write it now, while `scripts/prerender-seo.js` still exists to generate the list from.

**Files:**
- Create: `test/fixtures/production-urls.json`, `test/build-output.test.ts`, `scripts/freeze-urls.mjs`
- Modify: `vitest.config.ts`

**Interfaces:**
- Consumes: `PRERENDER_ROUTES` from `scripts/prerender-seo.js` (one time, to generate the fixture).
- Produces: `test/fixtures/production-urls.json` — a string array of every production path. Tasks 7 and 8 are complete when this test passes.

- [ ] **Step 1: Write the fixture generator**

Create `scripts/freeze-urls.mjs`:

```js
import { writeFile } from 'node:fs/promises';
import { PRERENDER_ROUTES } from './prerender-seo.js';

const routes = [...new Set(PRERENDER_ROUTES)].sort();
await writeFile(
  'test/fixtures/production-urls.json',
  JSON.stringify(routes, null, 2) + '\n',
  'utf8',
);
console.log(`froze ${routes.length} routes`);
```

- [ ] **Step 2: Generate the fixture**

```bash
mkdir -p test/fixtures && node scripts/freeze-urls.mjs
```

Expected: prints `froze 66 routes`. If the count differs, stop and reconcile before continuing — the number is the contract.

- [ ] **Step 3: Point vitest at Astro's Vite config**

Replace `vitest.config.ts` with:

```ts
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
  },
});
```

- [ ] **Step 4: Write the failing acceptance test**

Create `test/build-output.test.ts`:

```ts
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import urls from './fixtures/production-urls.json';

const distFileFor = (route: string) =>
  route === '/' ? join('dist', 'index.html') : join('dist', route.slice(1), 'index.html');

describe('build output', () => {
  it('emits an HTML file for every frozen production URL', () => {
    const missing = urls.filter((route) => !existsSync(distFileFor(route)));
    expect(missing).toEqual([]);
  });
});
```

- [ ] **Step 5: Run it and confirm it fails**

Run: `npm run build && npx vitest run test/build-output.test.ts`
Expected: FAIL, listing 65 missing routes (only `/` exists from Task 1).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "freeze production url list and add build output acceptance test"
git push
```

---

### Task 3: Port the SEO metadata off prerender-seo.js

`scripts/prerender-seo.js` holds two different things: carefully written German SEO metadata (keep) and 1098 lines of duplicated body content (delete). This task rescues the metadata into a typed module before the file dies.

**Files:**
- Create: `src/lib/pageSeo.ts`, `src/lib/pageSeo.test.ts`
- Reference: `scripts/prerender-seo.js:6-855` (`STATIC_PAGE_SEO`, `WHATS_NEW_INDEX_SEO`)

**Interfaces:**
- Produces:
  ```ts
  export interface PageSeo {
    lang: 'de' | 'en';
    title: string;
    description: string;
    canonical: string;
    ogLocale: 'de_DE' | 'en_US';
  }
  export const SITE_ORIGIN: string;
  export function getPageSeo(route: string): PageSeo;   // throws on unknown route
  export function getHreflangPair(route: string): { de: string; en: string } | null;
  ```
  Consumed by Task 4's `BaseLayout.astro` and Task 10's tests.

- [ ] **Step 1: Write the failing test**

Create `src/lib/pageSeo.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { getHreflangPair, getPageSeo, SITE_ORIGIN } from './pageSeo';

describe('getPageSeo', () => {
  it('returns German metadata for the homepage', () => {
    const seo = getPageSeo('/');
    expect(seo.lang).toBe('de');
    expect(seo.ogLocale).toBe('de_DE');
    expect(seo.canonical).toBe(`${SITE_ORIGIN}/`);
    expect(seo.title).toContain('Kalorienzähler ohne Abo');
  });

  it('returns English metadata for the English features page', () => {
    const seo = getPageSeo('/en/features');
    expect(seo.lang).toBe('en');
    expect(seo.ogLocale).toBe('en_US');
  });

  it('throws on an unknown route rather than silently returning defaults', () => {
    expect(() => getPageSeo('/does-not-exist')).toThrow();
  });
});

describe('getHreflangPair', () => {
  it('pairs the German and English homepages', () => {
    expect(getHreflangPair('/')).toEqual({ de: '/', en: '/en' });
  });

  it('pairs translated slugs', () => {
    expect(getHreflangPair('/funktionen')).toEqual({ de: '/funktionen', en: '/en/features' });
  });
});
```

- [ ] **Step 2: Run it and confirm it fails**

Run: `npx vitest run src/lib/pageSeo.test.ts`
Expected: FAIL with "Failed to resolve import ./pageSeo".

- [ ] **Step 3: Implement `src/lib/pageSeo.ts`**

Copy the `STATIC_PAGE_SEO` and `WHATS_NEW_INDEX_SEO` object literals verbatim from `scripts/prerender-seo.js` — **the German copy is hand-tuned for ranking keywords and must not be paraphrased.** Drop every `body`, `sections` and `headings` key; keep only `lang`, `title`, `description`, `canonical`, `ogLocale`.

Add the route pairing table, which is the DE↔EN slug map already implicit in `src/App.tsx:45-75`:

```ts
const ROUTE_PAIRS: ReadonlyArray<readonly [string, string]> = [
  ['/', '/en'],
  ['/funktionen', '/en/features'],
  ['/kalorienzaehler-ohne-abo', '/en/calorie-counter-no-subscription'],
  ['/kalorien-tracker-ohne-konto', '/en/calorie-tracker-no-account'],
  ['/intake-ai', '/en/intake-ai'],
  ['/vergleiche', '/en/comparisons'],
  ['/hilfe', '/en/help'],
  ['/hilfe/eigener-api-schluessel', '/en/help/own-api-key'],
  ['/privacy', '/en/privacy'],
  ['/terms', '/en/terms'],
  ['/whats-new', '/en/whats-new'],
];
```

Comparison detail and What's New entry routes pair by suffix: `/vergleiche/:slug` ↔ `/en/comparisons/:slug`, `/whats-new/:v` ↔ `/en/whats-new/:v`.

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npx vitest run src/lib/pageSeo.test.ts`
Expected: PASS, 5 tests.

- [ ] **Step 5: Commit**

```bash
git add src/lib/pageSeo.ts src/lib/pageSeo.test.ts
git commit -m "port seo metadata out of prerender-seo into typed module"
git push
```

---

### Task 4: Base layout with head, hreflang and OG tags

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Reference: `src/components/SeoHead.tsx` (the React version being replaced)

**Interfaces:**
- Consumes: `getPageSeo`, `getHreflangPair`, `SITE_ORIGIN` from Task 3.
- Produces: `BaseLayout` accepting `Props { route: string; title?: string; description?: string }`,
  used by every route file in Task 7. Metadata is derived from `route` alone for all 26 static
  routes; the two optional overrides exist solely for the 40 What's New entry routes, whose title
  and description come from the collection entry rather than a static table. Every other route file
  passes `route` only.

- [ ] **Step 1: Write `src/layouts/BaseLayout.astro`**

```astro
---
import { getHreflangPair, getPageSeo, SITE_ORIGIN } from '@/lib/pageSeo';
import '@/index.css';

interface Props { route: string }
const { route } = Astro.props;
const seo = getPageSeo(route);
const pair = getHreflangPair(route);
const ogImage = new URL('/og-image.png', SITE_ORIGIN).href;
---
<!doctype html>
<html lang={seo.lang}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{seo.title}</title>
    <meta name="description" content={seo.description} />
    <link rel="canonical" href={seo.canonical} />
    {pair && (
      <>
        <link rel="alternate" hreflang="de" href={new URL(pair.de, SITE_ORIGIN).href} />
        <link rel="alternate" hreflang="en" href={new URL(pair.en, SITE_ORIGIN).href} />
        <link rel="alternate" hreflang="x-default" href={new URL(pair.de, SITE_ORIGIN).href} />
      </>
    )}
    <meta property="og:type" content="website" />
    <meta property="og:title" content={seo.title} />
    <meta property="og:description" content={seo.description} />
    <meta property="og:url" content={seo.canonical} />
    <meta property="og:locale" content={seo.ogLocale} />
    <meta property="og:image" content={ogImage} />
    <meta name="twitter:card" content="summary_large_image" />

    <!-- Carried over verbatim from the deleted index.html. Every tag below was
         live in production; dropping any of them is a silent regression. -->
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <meta name="theme-color" content="#000000" />
    <meta name="color-scheme" content="dark light" />
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <!-- iOS Safari Smart App Banner — a direct install path on an app landing page. -->
    <meta name="apple-itunes-app" content="app-id=6757768955" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <meta name="apple-mobile-web-app-title" content="Intake" />
  </head>
  <body>
    <slot />
  </body>
</html>
```

`x-default` points at German deliberately — German is the primary market and the default locale.

- [ ] **Step 2: Wire the placeholder page through the layout**

Replace `src/pages/index.astro`:

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
---
<BaseLayout route="/">
  <h1>Astro shell online</h1>
</BaseLayout>
```

- [ ] **Step 3: Verify the head renders**

Run: `npm run build`
Expected: `dist/index.html` contains the German title and the canonical.

```bash
npm run build
grep -q 'hreflang="de"' dist/index.html && \
grep -q 'rel="canonical" href="https://www.getintake.de/"' dist/index.html && \
grep -q 'apple-itunes-app' dist/index.html && \
grep -q 'max-image-preview:large' dist/index.html && \
echo "HEAD OK"
```

The last two assertions guard the tags rescued from `index.html` — the Smart App Banner and the
`robots` directive. They are easy to lose and their absence is invisible in a browser.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "add base layout with canonical, hreflang and og tags"
git push
```

---

### Task 5: What's New content collection and the video remark plugin

**Files:**
- Create: `src/content.config.ts`, `src/lib/remarkVideo.mjs`, `src/lib/remarkVideo.test.ts`
- Modify: `astro.config.mjs` (register the remark plugin)

**Interfaces:**
- Produces: a `whatsNew` collection whose entry ids are `<version>/<lang>` (e.g. `2.5.1/de`), with schema `{ version, publishedAt, title, summary, coverImage, highlights }`. Consumed by the What's New routes in Task 7.

- [ ] **Step 1: Write the failing remark plugin test**

Videos are authored with image syntax — `![New Nutrients](assets/nutrients.mp4)` — across 40 markdown files. Astro's pipeline would emit `<img src="…mp4">`. Create `src/lib/remarkVideo.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { remarkVideo } from './remarkVideo.mjs';

const run = (tree: any) => { remarkVideo()(tree); return tree; };

describe('remarkVideo', () => {
  it('rewrites an mp4 image node into a video element', () => {
    const tree = { type: 'root', children: [
      { type: 'paragraph', children: [
        { type: 'image', url: 'assets/nutrients.mp4', alt: 'New Nutrients' },
      ]},
    ]};
    const out = run(tree);
    const node = out.children[0].children[0];
    expect(node.type).toBe('html');
    expect(node.value).toContain('<video');
    expect(node.value).toContain('assets/nutrients.mp4');
  });

  it('rewrites webm as well', () => {
    const tree = { type: 'root', children: [
      { type: 'paragraph', children: [{ type: 'image', url: 'a/b.webm', alt: '' }] },
    ]};
    expect(run(tree).children[0].children[0].value).toContain('<video');
  });

  it('leaves png images untouched', () => {
    const tree = { type: 'root', children: [
      { type: 'paragraph', children: [{ type: 'image', url: 'assets/steps.png', alt: 'steps' }] },
    ]};
    expect(run(tree).children[0].children[0].type).toBe('image');
  });
});
```

- [ ] **Step 2: Run it and confirm it fails**

Run: `npx vitest run src/lib/remarkVideo.test.ts`
Expected: FAIL, cannot resolve `./remarkVideo.mjs`.

- [ ] **Step 3: Implement `src/lib/remarkVideo.mjs`**

```js
const VIDEO_EXT = /\.(mp4|webm)$/i;

const escapeAttr = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

export function remarkVideo() {
  return (tree) => {
    const walk = (node) => {
      if (!node.children) return;
      node.children = node.children.map((child) => {
        if (child.type === 'image' && VIDEO_EXT.test(child.url)) {
          return {
            type: 'html',
            value:
              `<video controls playsinline preload="metadata" ` +
              `aria-label="${escapeAttr(child.alt ?? '')}" ` +
              `src="${escapeAttr(child.url)}"></video>`,
          };
        }
        walk(child);
        return child;
      });
    };
    walk(tree);
  };
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npx vitest run src/lib/remarkVideo.test.ts`
Expected: PASS, 3 tests.

- [ ] **Step 5: Register the plugin in `astro.config.mjs`**

Add to the config object:

```js
  markdown: {
    remarkPlugins: [remarkVideo],
  },
```

with `import { remarkVideo } from './src/lib/remarkVideo.mjs';` at the top.

- [ ] **Step 6: Create `src/content.config.ts`**

```ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const whatsNew = defineCollection({
  loader: glob({ pattern: '*/{de,en}.md', base: './content/whats-new' }),
  schema: z.object({
    version: z.string(),
    publishedAt: z.string(),
    title: z.string(),
    summary: z.string(),
    coverImage: z.string(),
    highlights: z.array(z.string()),
  }),
});

export const collections = { whatsNew };
```

- [ ] **Step 7: Verify all 40 entries load and validate**

Run: `npm run build`
Expected: build succeeds with no content-collection schema errors. A schema violation fails the build loudly — that is the intended behaviour.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "add whats-new content collection and video remark plugin"
git push
```

---

### Task 6: Thin route pattern, proven on two routes

Establishes the one-page-two-URLs pattern before it is applied 26 times. A reviewer can reject the pattern here cheaply.

**Files:**
- Create: `src/components/pages/HomePage.tsx` (thin wrapper), `src/pages/en/index.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Produces: the route-file convention every route in Task 7 follows — a route file contains only a `BaseLayout` and one page component receiving `lang`.

- [ ] **Step 1: Write the route file for German**

`src/pages/index.astro`:

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import Index from '@/pages-react/Index';
---
<BaseLayout route="/">
  <Index lang="de" />
</BaseLayout>
```

- [ ] **Step 2: Move the React pages out of `src/pages/`**

`src/pages/` is now Astro's routing directory — leaving `.tsx` files there would create bogus routes.

```bash
git mv src/pages src/pages-react
mkdir -p src/pages/en
git mv src/pages-react/index.astro src/pages/index.astro
```

`src/pages-react/` now holds only `.tsx` page components; `src/pages/` holds only `.astro` route files. Nothing else moves.

- [ ] **Step 3: Make the React page accept an explicit `lang` prop**

The React tree currently reads locale from `LanguageContext`, which depended on the router. In `src/pages-react/Index.tsx`, accept `lang` and wrap the subtree:

```tsx
import { LanguageProvider } from '@/i18n/LanguageContext';

const Index = ({ lang }: { lang: 'de' | 'en' }) => (
  <LanguageProvider value={lang}>
    {/* existing page body unchanged */}
  </LanguageProvider>
);
```

`LanguageProvider` must accept a controlled `value` prop instead of deriving locale from `useLocation`. Update `src/i18n/LanguageContext.tsx` accordingly, keeping the existing `useLanguage()` consumer API unchanged so no other component needs editing.

- [ ] **Step 4: Add the English route file**

`src/pages/en/index.astro`:

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import Index from '@/pages-react/Index';
---
<BaseLayout route="/en">
  <Index lang="en" />
</BaseLayout>
```

Note: no `client:` directive. The island renders to static HTML at build time, which is the entire point — crawlers get full content with no JS shipped.

- [ ] **Step 5: Verify both render real content, not an empty shell**

Run: `npm run build`
Expected: both files contain the real hero copy, proving build-time island rendering works.

```bash
npm run build
grep -q "Kalorien tracken" dist/index.html && \
grep -q "without the subscription" dist/en/index.html && \
echo "ISLAND SSR OK"
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "establish thin astro route pattern over react page islands"
git push
```

---

### Task 7: All remaining routes

Mechanical application of the Task 6 pattern. The Task 2 acceptance test goes green here.

**Files:**
- Create: 24 static route files plus `src/pages/vergleiche/[slug].astro`, `src/pages/en/comparisons/[slug].astro`, `src/pages/whats-new/[version].astro`, `src/pages/en/whats-new/[version].astro`, `src/pages/404.astro`
- Reference: `src/App.tsx:45-75` for the authoritative route↔component mapping

**Interfaces:**
- Consumes: `BaseLayout` (Task 4), the `whatsNew` collection (Task 5), the route pattern (Task 6).
- Produces: all 66 frozen URLs present in `dist/`.

- [ ] **Step 1: Strip react-router hooks out of the page components**

`react-router-dom` is deleted in Task 8, so any page still calling `useParams`, `useLocation`, `useNavigate` or rendering `<Link>` will break the build. Convert each to props or plain anchors.

`src/pages-react/ComparisonDetailPage.tsx` is the one that takes a param:

```tsx
// before
const { slug } = useParams();

// after
const ComparisonDetailPage = ({ lang, slug }: { lang: 'de' | 'en'; slug: string }) => {
```

`src/pages-react/WhatsNewEntry.tsx` takes `version` the same way. For `<Link to="…">`, substitute `src/components/NavLink.tsx` with a plain `<a href="…">` — full page loads are correct now that every route is a static document.

Find them all:

```bash
grep -rn "useParams\|useLocation\|useNavigate\|react-router" src/pages-react/ src/components/
```

Expected after this step: no results.

- [ ] **Step 2: Create the static route files**

One file per row, each following the Task 6 pattern exactly. Read the component for each path from `src/App.tsx:45-75`. Worked example for the first row — every other row differs only in the three parameterised values:

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import FeaturesPage from '@/pages-react/FeaturesPage';
---
<BaseLayout route="/funktionen">
  <FeaturesPage lang="de" />
</BaseLayout>
```

| Route file | `route` prop | Component | `lang` |
|---|---|---|---|
| `funktionen.astro` | `/funktionen` | `FeaturesPage` | `de` |
| `kalorienzaehler-ohne-abo.astro` | `/kalorienzaehler-ohne-abo` | `NoSubscriptionPage` | `de` |
| `kalorien-tracker-ohne-konto.astro` | `/kalorien-tracker-ohne-konto` | `NoAccountPage` | `de` |
| `intake-ai.astro` | `/intake-ai` | `IntakeAIPage` | `de` |
| `vergleiche/index.astro` | `/vergleiche` | `ComparisonsIndexPage` | `de` |
| `hilfe/index.astro` | `/hilfe` | `HelpPage` | `de` |
| `hilfe/eigener-api-schluessel.astro` | `/hilfe/eigener-api-schluessel` | `ByokGuidePage` | `de` |
| `privacy.astro` | `/privacy` | `Privacy` | `de` |
| `terms.astro` | `/terms` | `Terms` | `de` |
| `whats-new/index.astro` | `/whats-new` | `WhatsNewIndex` | `de` |
| `en/features.astro` | `/en/features` | `FeaturesPage` | `en` |
| `en/calorie-counter-no-subscription.astro` | `/en/calorie-counter-no-subscription` | `NoSubscriptionPage` | `en` |
| `en/calorie-tracker-no-account.astro` | `/en/calorie-tracker-no-account` | `NoAccountPage` | `en` |
| `en/intake-ai.astro` | `/en/intake-ai` | `IntakeAIPage` | `en` |
| `en/comparisons/index.astro` | `/en/comparisons` | `ComparisonsIndexPage` | `en` |
| `en/help/index.astro` | `/en/help` | `HelpPage` | `en` |
| `en/help/own-api-key.astro` | `/en/help/own-api-key` | `ByokGuidePage` | `en` |
| `en/privacy.astro` | `/en/privacy` | `Privacy` | `en` |
| `en/terms.astro` | `/en/terms` | `Terms` | `en` |
| `en/whats-new/index.astro` | `/en/whats-new` | `WhatsNewIndex` | `en` |

- [ ] **Step 3: Create the comparison detail routes**

`src/pages/vergleiche/[slug].astro`:

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import ComparisonDetailPage from '@/pages-react/ComparisonDetailPage';

export function getStaticPaths() {
  return [{ params: { slug: 'yazio-alternative' } }, { params: { slug: 'fddb-alternative' } }];
}

const { slug } = Astro.params;
---
<BaseLayout route={`/vergleiche/${slug}`}>
  <ComparisonDetailPage lang="de" slug={slug} />
</BaseLayout>
```

`src/pages/en/comparisons/[slug].astro` is identical with `route={`/en/comparisons/${slug}`}` and `lang="en"`.

The two slugs are the complete set — confirmed against `scripts/prerender-seo.js:865-866`.

- [ ] **Step 4: Create the What's New entry routes**

`src/pages/whats-new/[version].astro`:

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '@/layouts/BaseLayout.astro';

export async function getStaticPaths() {
  const entries = await getCollection('whatsNew', (e) => e.id.endsWith('/de'));
  return entries.map((entry) => ({
    params: { version: entry.data.version },
    props: { entry },
  }));
}

const { entry } = Astro.props;
const { Content } = await entry.render();
---
<BaseLayout route={`/whats-new/${entry.data.version}`}>
  <article>
    <h1>{entry.data.title}</h1>
    <p>{entry.data.summary}</p>
    <ul>{entry.data.highlights.map((h) => <li>{h}</li>)}</ul>
    <Content />
  </article>
</BaseLayout>
```

`src/pages/en/whats-new/[version].astro` is identical but filters `e.id.endsWith('/en')` and uses the `/en/whats-new/` route prefix.

- [ ] **Step 5: Create `src/pages/404.astro`**

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import NotFound from '@/pages-react/NotFound';
---
<BaseLayout route="/404">
  <NotFound lang="de" />
</BaseLayout>
```

Add a `/404` entry to `STATIC_PAGE_SEO` in `src/lib/pageSeo.ts` with `noindex` semantics — title `Seite nicht gefunden | Intake`, canonical `${SITE_ORIGIN}/404`.

- [ ] **Step 6: Run the acceptance test — this is the plan's green moment**

Run: `npm run build && npx vitest run test/build-output.test.ts`
Expected: PASS. `missing` is `[]`, all 66 frozen URLs emitted.

If any route is missing, the fixture is the source of truth — add the route, never edit the fixture.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "add all astro route files, acceptance test green"
git push
```

---

### Task 8: Delete the shadow-content pipeline

The payoff task. Everything removed here is now redundant.

**Files:**
- Delete: `scripts/prerender-seo.js`, `scripts/prerender.mjs`, `scripts/sitemap.js`, `scripts/whats-new-content.js`, `scripts/freeze-urls.mjs`, `src/lib/whatsNewContent.ts`, `src/lib/prerenderSeo.test.ts`, `src/lib/sitemap.test.ts`, `src/lib/whatsNewContent.test.ts`, `src/App.tsx`, `src/main.tsx`, `src/components/SeoHead.tsx`, `src/components/LocaleRedirect.tsx`, `src/components/ScrollToTop.tsx`, `src/lib/localeRedirect.ts`, `src/lib/localeRedirect.test.ts`
- Modify: `package.json` (drop dead dependencies)

- [ ] **Step 1: Confirm nothing still imports the doomed modules**

```bash
grep -rn "prerender-seo\|whatsNewContent\|SeoHead\|LocaleRedirect\|ScrollToTop\|localeRedirect" src/ test/ --include=*.ts --include=*.tsx --include=*.astro
```

Expected: no results. Fix any that appear before deleting.

- [ ] **Step 2: Delete the files**

```bash
git rm scripts/prerender-seo.js scripts/prerender.mjs scripts/sitemap.js \
       scripts/whats-new-content.js scripts/freeze-urls.mjs \
       src/lib/whatsNewContent.ts src/lib/prerenderSeo.test.ts \
       src/lib/sitemap.test.ts src/lib/whatsNewContent.test.ts \
       src/lib/localeRedirect.ts src/lib/localeRedirect.test.ts \
       src/App.tsx src/main.tsx src/components/SeoHead.tsx \
       src/components/LocaleRedirect.tsx src/components/ScrollToTop.tsx
```

`test/fixtures/production-urls.json` stays — it is now the only record of the URL contract.

- [ ] **Step 3: Drop the dependencies the SPA needed**

```bash
npm uninstall react-router-dom @tanstack/react-query next-themes \
  lovable-tagger @vitejs/plugin-react-swc
```

Radix and the other UI packages are pruned in the follow-up plan, once page conversions reveal what is genuinely imported.

- [ ] **Step 4: Verify the full suite and build**

Run: `npm run build && npm test`
Expected: build exits 0; all tests pass including `test/build-output.test.ts`.

- [ ] **Step 5: Resolve the sitemap collision and verify**

`public/sitemap.xml` is a tracked static file (last touched in `22b4950`) that used to be
overwritten at build time by `scripts/prerender.mjs`. Astro copies `public/` verbatim, so it would
now sit alongside `@astrojs/sitemap`'s generated `sitemap-index.xml` as a second, stale sitemap.
`public/robots.txt` still advertises the old path.

```bash
git rm public/sitemap.xml
```

Then update the last line of `public/robots.txt`:

```
Sitemap: https://www.getintake.de/sitemap-index.xml
```

Verify only the generated sitemap survives, and that it lists all 66 URLs:

```bash
npm run build
test -f dist/sitemap-index.xml && test ! -f dist/sitemap.xml && echo "SITEMAP OK"
grep -c "<loc>" dist/sitemap-0.xml   # expect 66
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "delete prerender-seo shadow content pipeline"
git push
```

---

### Task 9: vercel.json and the locale redirect gate

**Files:**
- Modify: `vercel.json`

**Interfaces:**
- Consumes: nothing.
- Produces: the deployed redirect behaviour verified by the curl suite below.

> **This task carries the plan's highest risk.** A language redirect previously caused Google to index only the English pages. The `missing` user-agent condition is the sole reason it is safe to re-enable. Do not simplify it away.

- [ ] **Step 1: Rewrite `vercel.json`**

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "rewrites": [
    { "source": "/go/:slug", "destination": "/api/go?slug=:slug" },
    { "source": "/go", "destination": "/api/go" }
  ],
  "redirects": [
    {
      "source": "/",
      "has": [
        { "type": "header", "key": "accept-language", "value": "^en(-[A-Za-z]+)?\\b.*" }
      ],
      "missing": [
        { "type": "cookie", "key": "intake_lang" },
        { "type": "header", "key": "user-agent", "value": ".*(bot|crawler|spider|slurp|headless|preview).*" }
      ],
      "destination": "/en",
      "permanent": false
    }
  ]
}
```

The SPA catch-all `{ "src": "/.*", "dest": "/index.html" }` is gone — Astro's real routes replace it. The `/go/*` rules are preserved verbatim.

- [ ] **Step 2: Push and wait for the preview deploy**

```bash
git add vercel.json
git commit -m "replace spa catch-all with locale redirect"
git push
```

`has` conditions **do not work under `vercel dev`** — Vercel's docs are explicit. This can only be verified on a deployment.

- [ ] **Step 3: Run the verification suite against the preview URL**

```bash
P=https://<preview-deployment-url>

curl -sI -H 'Accept-Language: en-US,en;q=0.9' $P/ | head -1
# expect: HTTP/2 307   (location: /en)

curl -sI -H 'Accept-Language: en-US,en;q=0.9' \
     -A 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' $P/ | head -1
# expect: HTTP/2 200   — the bot bypass, the check that matters most

curl -sI -H 'Accept-Language: de-DE,de;q=0.9' $P/ | head -1
# expect: HTTP/2 200

curl -sI -H 'Accept-Language: en-US' -b 'intake_lang=de' $P/ | head -1
# expect: HTTP/2 200
```

All four must match. **If the Googlebot request returns 307, stop and do not merge** — that is the exact regression that cost the German rankings before.

- [ ] **Step 4: Confirm the German homepage is what a crawler receives**

```bash
curl -s -A 'Mozilla/5.0 (compatible; Googlebot/2.1)' $P/ | grep -o '<title>[^<]*</title>'
# expect: the German title containing "Kalorienzähler ohne Abo"
```

- [ ] **Step 5: If regex in `value` does not work, fall back**

If step 3 shows the redirect never firing (all four return 200), Vercel is treating `value` as an exact match. Fallback per spec: remove the redirect from `vercel.json` and implement it in `src/middleware.ts` with `export const prerender = false` on `src/pages/index.astro` only, accepting that `/` becomes on-demand. Re-run the same four curl checks.

- [ ] **Step 6: Verify attribution still works end-to-end**

```bash
curl -sI "$P/go/ugc-lisa-1" | head -3
# expect: a 3xx to the App Store with pt=128030281 preserved
```

- [ ] **Step 7: Commit any fallback changes**

```bash
git add -A
git commit -m "verify locale redirect on preview deployment"
git push
```

---

### Task 10: Container API test harness

Proves the testing approach the follow-up plan depends on, on one real component.

**Files:**
- Create: `test/astro-container.test.ts`
- Modify: `package.json` (pin note)

**Interfaces:**
- Produces: the working pattern for rendering `.astro` components in vitest, used by every page test in the follow-up plan.

- [ ] **Step 1: Write the failing test**

The `@vitest-environment node` docblock is **mandatory**, not stylistic. Astro 6 removed the ability
to render Astro components in client environments: *"tests that render Astro components must now run
in a server environment like `node`."* The suite's global environment stays `jsdom` for the React
component tests; this file overrides it per-file.

```ts
// @vitest-environment node
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, it } from 'vitest';
import BaseLayout from '../src/layouts/BaseLayout.astro';

describe('BaseLayout', () => {
  it('renders the German canonical and hreflang pair for the homepage', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(BaseLayout, {
      props: { route: '/' },
      slots: { default: '<h1>hi</h1>' },
    });
    expect(html).toContain('<html lang="de"');
    expect(html).toContain('rel="canonical" href="https://www.getintake.de/"');
    expect(html).toContain('hreflang="en" href="https://www.getintake.de/en"');
    expect(html).toContain('hreflang="x-default" href="https://www.getintake.de/"');
  });

  it('renders the English locale for /en', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(BaseLayout, {
      props: { route: '/en' },
      slots: { default: '<h1>hi</h1>' },
    });
    expect(html).toContain('<html lang="en"');
    expect(html).toContain('content="en_US"');
  });
});
```

- [ ] **Step 2: Run it**

Run: `npx vitest run test/astro-container.test.ts`
Expected: PASS. If it fails on module resolution, confirm Task 2 step 3 replaced `vitest.config.ts` with `getViteConfig` — the Container API needs Astro's Vite pipeline to compile `.astro` files.

- [ ] **Step 3: Record the version pin rationale in `README.md`**

JSON has no comments, so this goes in the README. Append a section:

```markdown
## Astro version pin

`astro` is pinned to an exact version (no caret) because the test suite uses
`experimental_AstroContainer`, which Astro documents as "subject to breaking
changes, even in minor or patch releases". Read the Astro CHANGELOG before
bumping, and expect `test/astro-container.test.ts` to be the first thing to break.
```

- [ ] **Step 4: Run the full suite**

Run: `npm test`
Expected: all pass.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "add astro container api test harness"
git push
```

---

## Definition of done

- [ ] `npm run build && npm test` passes, including `test/build-output.test.ts` with all 66 URLs.
- [ ] `scripts/prerender-seo.js` no longer exists.
- [ ] `curl -s -A Googlebot <preview>/ | grep title` returns the **German** title.
- [ ] `dist/index.html` contains the full hero copy, not a 200-word shell.
- [ ] `/go/<slug>` still redirects correctly on the preview deployment.

## Deferred to the follow-up plan

- Refined Dark visual pass and native `.astro` page conversion (spec steps 2–7).
- Pruning the 49 `src/components/ui/` files and 27 Radix packages.
- Porting the 18 component/page `.test.tsx` files to the Container API.
- Generating `llms.txt` / `llms-full.txt` from the content collection.
- Deleting the stale `bun.lockb` — it predates `package-lock.json` by three months, and Vercel prefers it when present, so it may be driving builds from stale dependency resolution. Worth confirming against the Vercel build log before removing.
