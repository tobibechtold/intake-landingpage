import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import urls from './fixtures/production-urls.json';
import { docsUrl, loadHelpManifest } from '../src/lib/helpTopics';

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

  // Every remaining FAQ answer must stay in the static HTML so it stays crawlable.
  it('includes FAQ questions in the static HTML of the help pages', () => {
    expect(read('/hilfe')).toContain('Ist Intake ein Abo-Modell?');
    expect(read('/en/help')).toContain('Is Intake a subscription-based app?');
  });

  describe('help home', () => {
    it('opens with the docs hero, the only h1, linking the docs in the page language', () => {
      for (const [route, title, cta, href] of [
        ['/hilfe', 'Wie geht das in Intake?', 'Zu den Docs', 'https://docs.getintake.de'],
        ['/en/help', 'How do I do that in Intake?', 'Open the docs', 'https://docs.getintake.de/en'],
      ]) {
        const html = read(route);
        const main = html.slice(html.indexOf('<main'));
        // The hero is the first block of the page.
        expect(main.indexOf('data-docs-hero')).toBeGreaterThan(-1);
        expect(main.indexOf('data-docs-hero')).toBeLessThan(main.indexOf('data-faq-section'));
        expect(html.match(/<h1[\s>]/g)).toHaveLength(1);
        expect(html).toMatch(new RegExp(`<h1[^>]*>\\s*${title.replace(/\?/g, '\\?')}\\s*</h1>`));
        const link = /<a[^>]*data-docs-link[^>]*>[\s\S]*?<\/a>/.exec(html)?.[0] ?? '';
        expect(link).toContain(`href="${href}"`);
        expect(link).toContain(cta);
        // Every link into the docs opens in a new tab, so getintake.de stays open.
        expect(link).toContain('target="_blank"');
        for (const docsLink of html.matchAll(/<a[^>]*href="https:\/\/docs\.getintake\.de[^"]*"[^>]*>/g)) {
          expect(docsLink[0]).toContain('target="_blank"');
          expect(docsLink[0]).toContain('rel="noopener"');
        }
        expect(html).toContain('Intake Docs');
      }
    });

    it('has no topic search, topic index or links to topic pages on getintake.de', () => {
      for (const route of ['/hilfe', '/en/help']) {
        const html = read(route);
        expect(html).not.toContain('data-help-search');
        expect(html).not.toContain('data-help-index');
        expect(html).not.toContain('data-help-topics');
      }
      expect([...read('/hilfe').matchAll(/href="(\/hilfe\/[^"]*)"/g)]).toEqual([]);
      expect([...read('/en/help').matchAll(/href="(\/en\/help\/[^"]*)"/g)]).toEqual([]);
    });

    it('lists the docs sections, linking only published docs topics in the page language', () => {
      const topicFiles = (lang: string) =>
        loadHelpManifest().topics.flatMap((topic) => {
          const file = join('content/help', topic.id, `${lang}.md`);
          return existsSync(file) ? [{ id: topic.id, text: readFileSync(file, 'utf8') }] : [];
        });
      const isDraft = (text: string) => /^draft:\s*true\s*$/m.test(text.split(/^---$/m)[1] ?? '');
      const drafts = new Set(['de', 'en'].flatMap((lang) => topicFiles(lang).filter((f) => isDraft(f.text)).map((f) => f.id)));
      const published = loadHelpManifest()
        .topics.map((topic) => topic.id)
        .filter((id) => !drafts.has(id) && ['de', 'en'].every((lang) => existsSync(join('content/help', id, `${lang}.md`))));
      expect(published.length).toBeGreaterThan(0);

      for (const [route, lang] of [['/hilfe', 'de'], ['/en/help', 'en']] as const) {
        const html = read(route);
        const grid = /<section[^>]*data-docs-sections[\s\S]*?<\/section>/.exec(html)?.[0] ?? '';
        expect(grid).not.toBe('');
        const hrefs = [...grid.matchAll(/href="([^"]+)"/g)].map((match) => match[1]);
        expect([...hrefs].sort()).toEqual(published.map((id) => docsUrl(id, lang)).sort());
        // The section grid sits between the docs hero and the FAQ.
        expect(html.indexOf('data-docs-hero')).toBeLessThan(html.indexOf('data-docs-sections'));
        expect(html.indexOf('data-docs-sections')).toBeLessThan(html.indexOf('data-faq-section'));
      }
    });

    it('keeps only the pre-purchase questions in the FAQ', () => {
      expect(read('/hilfe')).not.toContain('Kann ich Intake personalisieren?');
      expect(read('/en/help')).not.toContain('What data does Intake read from Apple Health / Health Connect?');
    });
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

  describe('help topics moved to docs.getintake.de', () => {
    it('builds no help topic pages and lists none in the sitemap', () => {
      for (const route of ['/hilfe/mahlzeit-kopieren', '/en/help/copy-meal', '/hilfe/ipad-iphone-duo']) {
        expect(existsSync(distFileFor(route))).toBe(false);
      }
      const sitemap = readFileSync(join('dist', 'sitemap-0.xml'), 'utf8');
      expect(sitemap).not.toContain('/hilfe/mahlzeit-kopieren<');
      expect(sitemap).not.toContain('/en/help/copy-meal<');
      expect(sitemap).toContain('<loc>https://www.getintake.de/hilfe</loc>');
    });

    it('builds no BYOK guide pages any more and links the guide in the docs', () => {
      expect(existsSync(distFileFor('/hilfe/eigener-api-schluessel'))).toBe(false);
      expect(existsSync(distFileFor('/en/help/own-api-key'))).toBe(false);
      expect(read('/intake-ai')).toContain('href="https://docs.getintake.de/byok-guide"');
      expect(read('/en/intake-ai')).toContain('href="https://docs.getintake.de/en/byok-guide"');
    });
  });
});

