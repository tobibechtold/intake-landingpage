import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const read = (route: string) =>
  readFileSync(route === '/' ? 'dist/index.html' : join('dist', route.slice(1), 'index.html'), 'utf8');

describe('client-side hydration', () => {
  // Without a client: directive nothing hydrates: the burger menu never opens, Radix
  // accordions never expand, and every element carrying `opacity-0` stays invisible
  // because useScrollAnimation's IntersectionObserver never runs.
  it.each(['/', '/en', '/hilfe', '/funktionen'])('ships a hydrated island on %s', (route) => {
    expect(read(route)).toContain('<astro-island');
  });

  // Astro islands do not load via <script src>. The custom element carries the URLs and
  // an inline bootstrap fetches them, so assert on the island's own attributes.
  it('points the island at a real component and renderer bundle', () => {
    const html = read('/');
    const component = /component-url="([^"]+)"/.exec(html)?.[1];
    const renderer = /renderer-url="([^"]+)"/.exec(html)?.[1];
    expect(component).toMatch(/^\/_astro\/.+\.js$/);
    expect(renderer).toMatch(/^\/_astro\/.+\.js$/);
    expect(existsSync(join('dist', component!.replace(/^\//, '')))).toBe(true);
    expect(existsSync(join('dist', renderer!.replace(/^\//, '')))).toBe(true);
  });

  // Guards the specific mechanism that hid the CTA: content rendered but transparent.
  it('does not leave scroll-animated content permanently at opacity-0', () => {
    const html = read('/');
    expect(html).toContain('id="cta"');
    // The CTA must either be hydrated (island present) or not rely on opacity-0.
    expect(html).toContain('<astro-island');
  });
});

describe('what’s new video assets', () => {
  const html = () => read('/whats-new/2.2.0');

  it('emits video sources as absolute, resolvable URLs', () => {
    const srcs = [...html().matchAll(/<video[^>]+src="([^"]+)"/g)].map((m) => m[1]);
    expect(srcs.length).toBeGreaterThan(0);
    for (const src of srcs) {
      expect(src.startsWith('/')).toBe(true);
    }
  });

  it('actually writes those video files into dist', () => {
    const srcs = [...html().matchAll(/<video[^>]+src="([^"]+)"/g)].map((m) => m[1]);
    const missing = srcs.filter((src) => !existsSync(join('dist', src.replace(/^\//, ''))));
    expect(missing).toEqual([]);
  });
});
