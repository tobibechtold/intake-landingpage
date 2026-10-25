import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sidebar from './src/generated/sidebar.json' with { type: 'json' };
import { PLATFORM_SCRIPT } from './src/scripts/platform.mjs';

export default defineConfig({
  site: 'https://docs.getintake.de',
  // Pin this folder's tsconfig. Left to search, Vite also reads the landing
  // page's tsconfig one level up, whose "astro/tsconfigs/strict" only resolves
  // where the landing page's packages are installed (not on Vercel).
  vite: { tsconfig: './tsconfig.json' },
  integrations: [
    starlight({
      title: 'Intake Docs',
      logo: { src: './src/assets/intake-icon.png', alt: 'Intake' },
      favicon: '/favicon.png',
      defaultLocale: 'root',
      locales: {
        root: { label: 'Deutsch', lang: 'de' },
        en: { label: 'English', lang: 'en' },
      },
      head: [{ tag: 'script', content: PLATFORM_SCRIPT }],
      sidebar,
      // English targets for the getintake.de links, and prev/next without external links.
      routeMiddleware: './src/routeData.ts',
      customCss: ['./src/styles/intake.css', './src/generated/sidebar-icons.css'],
      lastUpdated: false,
    }),
  ],
});
