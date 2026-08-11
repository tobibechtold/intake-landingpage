import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import { remarkVideo } from './src/lib/remarkVideo.mjs';
import { whatsNewAssets } from './src/lib/whatsNewAssets.mjs';

// ---------------------------------------------------------------------------
// DO NOT ADD @astrojs/vercel HERE.
//
// The adapter switches the build to Vercel's Build Output API, where
// .vercel/output *is* the entire deployment. `api/go.ts` lives outside it, so it
// stops being deployed and the generated route table ends in a catch-all 404 —
// every /go/<slug> smart link, and therefore every paid ad click and its
// attribution, dead-ends.
//
// Without an adapter Astro emits a plain dist/, Vercel zero-config serves it and
// separately auto-detects api/go.ts as a function, exactly as it did before this
// migration. Nothing currently in use depends on adapter-only features.
//
// If you ever need on-demand rendering here, port api/go.ts to
// src/pages/go/[slug].ts first and verify a real /go click end to end.
// ---------------------------------------------------------------------------
export default defineConfig({
  site: 'https://www.getintake.de',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'directory' },
  // NOTE: sitemap() is deliberately configured without its `i18n` option.
  // That option assumes the same path under each locale prefix, but this site
  // uses translated slugs (/funktionen <-> /en/features), which it would pair
  // wrongly. hreflang is emitted from BaseLayout instead, which Google treats
  // as equivalent to sitemap-level hreflang.
  integrations: [sitemap(), whatsNewAssets()],
  vite: {
    // Astro's default envPrefix is PUBLIC_, but this project predates Astro and its
    // PostHog key is named VITE_POSTHOG_KEY (see .env.example, and the Vercel project
    // env). Without this, `import.meta.env.VITE_POSTHOG_KEY` compiles to undefined,
    // initAnalytics()'s guard becomes dead code, Rollup drops the whole function, and
    // analytics silently stops existing. Keep VITE_ here rather than renaming the var
    // in Vercel, so the two cannot drift apart.
    envPrefix: ['VITE_', 'PUBLIC_'],
  },
  markdown: {
    // Astro 7 defaults to Sätteri, its Rust Markdown pipeline. We stay on the unified
    // processor because remarkVideo is an mdast/remark plugin and porting it to a
    // Sätteri mdast plugin buys nothing here — 40 release-note files compile in
    // milliseconds either way. This is the supported `processor` option, NOT the
    // deprecated top-level `markdown.remarkPlugins`.
    processor: unified({
      remarkPlugins: [remarkVideo],
    }),
  },
  i18n: {
    locales: ['de', 'en'],
    defaultLocale: 'de',
    routing: { prefixDefaultLocale: false },
  },
});
