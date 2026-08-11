import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const read = (route: string) =>
  readFileSync(route === '/' ? 'dist/index.html' : join('dist', route.slice(1), 'index.html'), 'utf8');

const islandCount = (html: string) => (html.match(/<astro-island/g) ?? []).length;

/**
 * Hydration is now the exception, not the rule.
 *
 * The header used to be a Radix Sheet, which meant react-dom (129 KB) shipped on all 13
 * pages to power a drawer. It is a native <dialog> now, so pages with no interactive
 * content ship no framework JavaScript at all. These assertions pin that down in both
 * directions: the static pages must stay static, and the interactive ones must still work.
 */
describe('hydration', () => {
  it.each(['/', '/funktionen', '/privacy', '/terms', '/whats-new', '/hilfe', '/vergleiche/yazio-alternative'])(
    '%s ships no framework JavaScript',
    (route) => {
      const html = read(route);
      expect(islandCount(html)).toBe(0);
      expect(html).not.toMatch(/component-url="/);
    },
  );

  // No page hydrates any more. Hero's webm/mp4 choice is two <source> elements, the
  // gallery is CSS scroll-snap, Reviews' "show more" is a <details>, and the FAQ is
  // <details> plus a small vanilla filter. react-dom is not in the build at all.
  it('the homepage ships no framework JavaScript either', () => {
    const html = read('/');
    expect(islandCount(html)).toBe(0);
    expect(html).toContain('<source');          // native video format selection
    expect(html).toContain('snap-mandatory');   // CSS carousel
    expect(html).toContain('<details');         // review show-more
  });

  it('the help page keeps its FAQ interactive without React', () => {
    const html = read('/hilfe');
    expect(islandCount(html)).toBe(0);
    expect(html).toContain('data-faq-search');
    expect(html).toContain('data-faq-section');
    // Every answer must stay in the DOM so the long-tail Q&A remain crawlable.
    expect(html).toContain('Ist Intake ein Abo-Modell?');
  });

  it('ships no react-dom anywhere in the build', () => {
    const chunks = readdirSync('dist/_astro').filter((f) => f.endsWith('.js'));
    expect(chunks.filter((f) => f.includes('react'))).toEqual([]);
  });

  // The mobile menu must work without React, and its contents must be in the HTML
  // (a native <dialog> renders children; the old Sheet mounted them only on open).
  it.each(['/', '/funktionen', '/privacy'])('%s has a working no-JS mobile menu', (route) => {
    const html = read(route);
    expect(html).toContain('<dialog');
    expect(html).toContain('data-nav-dialog');
    expect(html).toContain('data-nav-open');
  });

  // Below lg the navbar has to fit the EN/DE toggle and the menu button too, so the
  // download CTA is icon-only there and needs an accessible name of its own.
  it('renders the navbar download as an icon with a label until there is room', () => {
    const header = /<header[\s\S]*?<\/header>/.exec(read('/'))![0];
    const cta = /<a[^>]*data-download-link[\s\S]*?<\/a>/.exec(header)![0];
    expect(cta).toMatch(/aria-label="[^"]+"/);
    expect(cta).toContain('<svg');
    expect(cta).toContain('hidden lg:inline');
  });

  // The download link is user-agent dependent. It must ship a working fallback so it is
  // never broken before the upgrade script runs, or if it never runs at all.
  it('ships a working download link before any JS runs', () => {
    const html = read('/funktionen');
    const m = /<a[^>]+data-download-link[^>]*>/.exec(html);
    expect(m).toBeTruthy();
    expect(m![0]).toMatch(/href="\/#hero"/);
  });
});

describe('what’s new video assets', () => {
  const html = () => read('/whats-new/2.2.0');

  it('emits video sources as absolute, resolvable URLs', () => {
    const srcs = [...html().matchAll(/<video[^>]+src="([^"]+)"/g)].map((m) => m[1]);
    expect(srcs.length).toBeGreaterThan(0);
    for (const src of srcs) expect(src.startsWith('/')).toBe(true);
  });

  it('actually writes those video files into dist', () => {
    const srcs = [...html().matchAll(/<video[^>]+src="([^"]+)"/g)].map((m) => m[1]);
    const missing = srcs.filter((src) => !existsSync(join('dist', src.replace(/^\//, ''))));
    expect(missing).toEqual([]);
  });
});
