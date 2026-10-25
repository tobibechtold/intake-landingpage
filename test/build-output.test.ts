import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { runInNewContext } from 'node:vm';
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

  // Every remaining FAQ answer must stay in the static HTML so it stays crawlable.
  it('includes FAQ questions in the static HTML of the help pages', () => {
    expect(read('/hilfe')).toContain('Ist Intake ein Abo-Modell?');
    expect(read('/en/help')).toContain('Is Intake a subscription-based app?');
  });

  describe('help home', () => {
    const indexOf = (html: string) =>
      JSON.parse(html.match(/<script type="application\/json" data-help-index>([\s\S]*?)<\/script>/)?.[1] ?? '[]') as {
        id: string;
        title: string;
        short: string;
        href: string;
      }[];

    it('has a search field and an inline index of the topics with content', () => {
      for (const [route, copyMeal, guide] of [
        ['/hilfe', '/hilfe/mahlzeit-kopieren', '/hilfe/eigener-api-schluessel'],
        ['/en/help', '/en/help/copy-meal', '/en/help/own-api-key'],
      ]) {
        const html = read(route);
        expect(html).toContain('data-help-search');
        const index = indexOf(html);
        expect(index.find((item) => item.id === 'copy-meal')?.href).toBe(copyMeal);
        expect(index.find((item) => item.id === 'byok-guide')?.href).toBe(guide);
        // Topics without content yet are not in the index.
        expect(index.map((item) => item.id)).not.toContain('calorie-ring');
      }
    });

    it('lists the topics by area, linking only pages that exist', () => {
      const html = read('/hilfe');
      expect(html).toMatch(/<h2[^>]*>\s*Essen erfassen\s*<\/h2>/);
      expect(html).toContain('href="/hilfe/mahlzeit-kopieren"');
      expect(html).toContain('href="/hilfe/eigener-api-schluessel"');
      expect(html).not.toContain('href="/hilfe/kalorienring"');
      const links = [...html.matchAll(/href="(\/hilfe\/[a-z0-9-]+)"/g)].map((match) => match[1]);
      expect(links.filter((link) => !existsSync(distFileFor(link)))).toEqual([]);
      expect(read('/en/help')).toMatch(/<h2[^>]*>\s*Logging food\s*<\/h2>/);
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

  describe('help topic pages', () => {
    let de = '';
    let en = '';
    beforeAll(() => {
      de = read('/hilfe/mahlzeit-kopieren');
      en = read('/en/help/copy-meal');
    });

    it('renders the title, the short answer and one block per platform for every step', () => {
      expect(de).toContain('Mahlzeit auf einen anderen Tag kopieren');
      expect(de).toContain('Du entscheidest, welche Einträge mitkommen');
      const steps = (de.match(/<li class="flex items-start gap-4">/g) ?? []).length;
      expect(steps).toBeGreaterThan(1);
      expect(de.match(/data-platform-block="ios"/g)).toHaveLength(steps);
      expect(de.match(/data-platform-block="android"/g)).toHaveLength(steps);
      expect(en).toContain('Copy a meal to another day');
    });

    it('renders the steps and the iPhone-only note on an iOS-only topic with steps', () => {
      for (const [route, note] of [
        ['/hilfe/workouts-ohne-doppelzaehlung', 'Nur auf dem iPhone'],
        ['/en/help/workouts-without-double-counting', 'Only on iPhone'],
      ]) {
        const html = read(route);
        expect(html).toContain(`data-platform-note>${note}<`);
        const steps = (html.match(/<li class="flex items-start gap-4">/g) ?? []).length;
        expect(steps).toBeGreaterThan(0);
        expect(html.match(/data-platform-block="ios"/g)).toHaveLength(steps);
        expect(html).not.toContain('data-platform-block="android"');
        expect(html).not.toMatch(/<div[^>]*data-platform-switch/);
      }
      expect(read('/hilfe/workouts-ohne-doppelzaehlung')).toContain('Schalte „Workouts ohne Doppelzählung“ ein.');
    });

    it('pairs the translated slugs with reciprocal hreflang', () => {
      for (const html of [de, en]) {
        expect(html).toContain('<link rel="alternate" hreflang="en" href="https://www.getintake.de/en/help/copy-meal">');
        expect(html).toContain('<link rel="alternate" hreflang="de" href="https://www.getintake.de/hilfe/mahlzeit-kopieren">');
      }
    });

    it('shows both platforms with visible labels and no hidden state without JavaScript', () => {
      for (const html of [de, en]) {
        const blocks = [...html.matchAll(/<div data-platform-block="(ios|android)"[^>]*>([\s\S]*?)<\/div>/g)];
        expect(blocks).toHaveLength(2 * 1 * (html.match(/data-platform-block="ios"/g)?.length ?? 0));
        for (const [, platform, inner] of blocks) {
          const label = inner.match(/<p data-platform-label[^>]*>\s*([^<]*?)\s*<\/p>/)?.[1];
          expect(label).toBe(platform === 'ios' ? 'iPhone' : 'Android');
        }
        expect(html).not.toMatch(/<html[^>]*data-help-platform/);
      }
    });

    it('sets the platform attribute from an inline head script before first paint', () => {
      const head = de.slice(0, de.indexOf('</head>'));
      // Any inline (no src) script in the head that reads the stored platform.
      const script =
        [...head.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)]
          .map((match) => match[1])
          .find((body) => body.includes('intake.help.platform')) ?? '';
      expect(script).not.toBe('');
      expect(Buffer.byteLength(script)).toBeLessThan(1024);
      expect(head).not.toMatch(/<script[^>]*src=[^>]*help-?platform/i);

      // Run the script exactly as built, not the vitest-transformed source.
      const run = (search: string, stored: string | null, userAgent: string) => {
        const dataset: Record<string, string> = {};
        runInNewContext(script, {
          URLSearchParams,
          location: { search },
          navigator: { userAgent },
          localStorage: { getItem: (key: string) => (key === 'intake.help.platform' ? stored : null) },
          document: { documentElement: { dataset } },
        });
        return dataset;
      };
      const android = 'Mozilla/5.0 (Linux; Android 15; Pixel 9) AppleWebKit/537.36 Mobile Safari/537.36';
      const iphone = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15';
      expect(run('?platform=ios', null, android)).toEqual({ helpPlatform: 'ios' });
      expect(run('?platform=android&source=app', null, iphone)).toEqual({ helpPlatform: 'android', helpSwitch: 'hidden' });
      expect(run('', 'android', iphone)).toEqual({ helpPlatform: 'android' });
      expect(run('', null, android)).toEqual({ helpPlatform: 'android' });
    });

    it('hides the switch until the head script has set the platform', () => {
      const css = [...de.matchAll(/<style>([\s\S]*?)<\/style>/g)].map((match) => match[1]).join('\n');
      expect(css).toMatch(/(^|[}\s])\[data-platform-switch\]\{display:none\}/);
      expect(css).toMatch(/html\[data-help-platform\] \[data-platform-switch\]\{display:block\}/);
      // The app-link rule comes after the reveal so it still wins.
      expect(css.lastIndexOf("html[data-help-switch=hidden] [data-platform-switch]")).toBeGreaterThan(
        css.indexOf('html[data-help-platform] [data-platform-switch]'),
      );
    });

    it('renders the switch on a two-platform topic', () => {
      expect(de).toMatch(/<div[^>]*data-platform-switch/);
      expect(de).toContain('data-platform-choice="ios"');
      expect(de).toContain('data-platform-choice="android"');
      expect(de).toMatch(/<style>[^<]*\[data-platform-label\]/);
    });

    it('has no switch and keeps its blocks on a one-platform topic', () => {
      for (const route of ['/hilfe/ipad-iphone-duo', '/en/help/ipad-iphone-duo']) {
        const html = read(route);
        expect(html).not.toMatch(/<div[^>]*data-platform-switch/);
        expect(html).not.toContain('data-platform-block="android"');
      }
      // The block-hiding CSS is guarded by :has(), so a page without a block for the chosen
      // platform never hides its own.
      expect(de).toContain(":has([data-platform-block=");
    });

    it('shows the platformNote override on wide-screen-layout', () => {
      expect(read('/hilfe/ipad-iphone-duo')).toContain('data-platform-note>Nur auf iPhone Duo und iPad<');
      expect(read('/en/help/ipad-iphone-duo')).toContain('data-platform-note>Only on iPhone Duo and iPad<');
      expect(de).not.toContain('data-platform-note');
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

