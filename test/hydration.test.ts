import { existsSync, readFileSync } from 'node:fs';
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
  it.each(['/funktionen', '/privacy', '/terms', '/whats-new', '/vergleiche/yazio-alternative'])(
    '%s ships no framework JavaScript',
    (route) => {
      const html = read(route);
      expect(islandCount(html)).toBe(0);
      expect(html).not.toMatch(/component-url="/);
    },
  );

  it('the homepage hydrates only its genuinely interactive sections', () => {
    const html = read('/');
    // Hero (video format detection), Reviews, ScreenshotGallery (carousel).
    expect(islandCount(html)).toBeGreaterThan(0);
    const urls = [...html.matchAll(/component-url="([^"]+)"/g)].map((m) => m[1]);
    for (const u of urls) {
      expect(existsSync(join('dist', u.replace(/^\//, '')))).toBe(true);
    }
  });

  it('the help page hydrates for its FAQ search and accordions', () => {
    expect(islandCount(read('/hilfe'))).toBeGreaterThan(0);
  });

  // The mobile menu must work without React, and its contents must be in the HTML
  // (a native <dialog> renders children; the old Sheet mounted them only on open).
  it.each(['/', '/funktionen', '/privacy'])('%s has a working no-JS mobile menu', (route) => {
    const html = read(route);
    expect(html).toContain('<dialog');
    expect(html).toContain('data-nav-dialog');
    expect(html).toContain('data-nav-open');
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
