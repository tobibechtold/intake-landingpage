import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import { unified } from '@astrojs/markdown-remark';
import { remarkVideo } from './src/lib/remarkVideo.mjs';

export default defineConfig({
  site: 'https://www.getintake.de',
  output: 'static',
  adapter: vercel(),
  trailingSlash: 'never',
  build: { format: 'directory' },
  // NOTE: sitemap() is deliberately configured without its `i18n` option.
  // That option assumes the same path under each locale prefix, but this site
  // uses translated slugs (/funktionen <-> /en/features), which it would pair
  // wrongly. hreflang is emitted from BaseLayout instead, which Google treats
  // as equivalent to sitemap-level hreflang.
  integrations: [react(), sitemap()],
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
