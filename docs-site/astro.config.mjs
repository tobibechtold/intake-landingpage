import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sidebar from './src/generated/sidebar.json' with { type: 'json' };
import { PLATFORM_SCRIPT } from './src/scripts/platform.mjs';

export default defineConfig({
  site: 'https://docs.getintake.de',
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
      customCss: ['./src/styles/intake.css', './src/generated/sidebar-icons.css'],
      lastUpdated: false,
      pagination: false,
    }),
  ],
});
