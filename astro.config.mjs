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
  // NOTE: sitemap() is deliberately configured without its `i18n` option.
  // That option assumes the same path under each locale prefix, but this site
  // uses translated slugs (/funktionen <-> /en/features), which it would pair
  // wrongly. hreflang is emitted from BaseLayout instead, which Google treats
  // as equivalent to sitemap-level hreflang.
  integrations: [react(), sitemap()],
  i18n: {
    locales: ['de', 'en'],
    defaultLocale: 'de',
    routing: { prefixDefaultLocale: false },
  },
});
