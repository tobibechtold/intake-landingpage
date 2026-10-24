import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { beforeAll, describe, expect, it } from 'vitest';
import urls from './fixtures/production-urls.json';

const distFileFor = (route: string) =>
  route === '/' ? join('dist', 'index.html') : join('dist', route.slice(1), 'index.html');

const read = (route: string) => readFileSync(distFileFor(route), 'utf8');

const visibleWords = (html: string) =>
  html
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<style[\s\S]*?<\/style>/g, '')
    .replace(/<[^>]+>/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;

describe('build output', () => {
  it('emits an HTML file for every frozen production URL', () => {
    const missing = urls.filter((route) => !existsSync(distFileFor(route)));
    expect(missing).toEqual([]);
  });

  // The entire point of the migration: crawlers must receive the real page, not a
  // 200-word shell. The old prerender-seo.js shadow copy of / was ~200 words.
  it.each([
    ['/', 800],
    ['/funktionen', 300],
    ['/kalorienzaehler-ohne-abo', 200],
    ['/hilfe', 600],
    ['/vergleiche/yazio-alternative', 250],
  ])('serves substantial crawlable content on %s', (route, minWords) => {
    expect(visibleWords(read(route))).toBeGreaterThan(minWords);
  });

  // Radix Accordion unmounts collapsed content by default, which silently stripped
  // all 26 FAQ answers out of the static HTML. forceMount in ui/accordion.tsx keeps
  // them in the DOM; this asserts they stay there.
  it('includes FAQ questions in the static HTML of the help pages', () => {
    expect(read('/hilfe')).toContain('Ist Intake ein Abo-Modell?');
    expect(read('/en/help')).toContain('Is Intake a subscription-based app?');
  });

  // Astro resolves src/assets imports to ImageMetadata objects, not URL strings the
  // way the old Vite setup did. `<img src={logo} />` silently emits "[object Object]",
  // which broke the logo, both store badges and the phone bezel on the homepage.
  it('resolves every image src to a real URL, never "[object Object]"', () => {
    for (const route of ['/', '/en', '/funktionen', '/whats-new/2.5.1']) {
      expect(read(route)).not.toContain('[object Object]');
    }
    expect(read('/')).toMatch(/src="\/_astro\/app-store-badge\.[\w-]+\.svg"/);
  });

  it('pairs translated slugs with reciprocal hreflang', () => {
    for (const route of ['/funktionen', '/en/features']) {
      const html = read(route);
      expect(html).toContain('hreflang="de" href="https://www.getintake.de/funktionen"');
      expect(html).toContain('hreflang="en" href="https://www.getintake.de/en/features"');
    }
  });

  it('overrides title per What’s New entry rather than reusing the index title', () => {
    expect(read('/whats-new/2.5.1')).toContain('<title>Was ist neu in Intake 2.5.1 | Intake</title>');
  });

  describe('help topic pages', () => {
    let de = '';
    let en = '';
    beforeAll(() => {
      de = read('/hilfe/mahlzeit-kopieren');
      en = read('/en/help/copy-meal');
    });

    it('renders the title, the short answer and one block per platform', () => {
      expect(de).toContain('Mahlzeit auf einen anderen Tag kopieren');
      expect(de).toContain('Du entscheidest, welche Einträge mitkommen');
      expect(de.match(/data-platform-block="ios"/g)).toHaveLength(1);
      expect(de.match(/data-platform-block="android"/g)).toHaveLength(1);
      expect(en).toContain('Copy a meal to another day');
    });

    it('pairs the translated slugs with reciprocal hreflang', () => {
      for (const html of [de, en]) {
        expect(html).toContain('<link rel="alternate" hreflang="en" href="https://www.getintake.de/en/help/copy-meal">');
        expect(html).toContain('<link rel="alternate" hreflang="de" href="https://www.getintake.de/hilfe/mahlzeit-kopieren">');
      }
    });

    it('uses the topic title per page', () => {
      expect(de).toContain('<title>Mahlzeit auf einen anderen Tag kopieren | Intake</title>');
    });

    it('lists both language URLs in the sitemap', () => {
      const sitemap = readFileSync(join('dist', 'sitemap-0.xml'), 'utf8');
      expect(sitemap).toContain('<loc>https://www.getintake.de/hilfe/mahlzeit-kopieren</loc>');
      expect(sitemap).toContain('<loc>https://www.getintake.de/en/help/copy-meal</loc>');
    });

    it('keeps the BYOK guide on its own static pages', () => {
      expect(read('/hilfe/eigener-api-schluessel')).toContain('data-testid="byok-guide-screenshot"');
      expect(read('/en/help/own-api-key')).toContain('data-testid="byok-guide-screenshot"');
    });
  });
});

