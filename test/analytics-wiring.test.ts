import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const read = (route: string) =>
  readFileSync(route === '/' ? 'dist/index.html' : join('dist', route.slice(1), 'index.html'), 'utf8');

/**
 * src/main.tsx used to bootstrap attribution and analytics. It was deleted during the
 * Astro migration and nothing re-homed it, so PostHog never initialised and UTM params
 * from the bio links were never captured — silently, with no error anywhere.
 *
 * These assertions exist because that failure is invisible in a browser.
 */
describe('analytics and attribution wiring', () => {
  it.each(['/', '/en', '/hilfe', '/whats-new/2.5.1'])(
    'loads the client bootstrap on %s',
    (route) => {
      expect(read(route)).toMatch(/<script[^>]+src="\/_astro\/BaseLayout[^"]*\.js"/);
    },
  );

  it('captures UTM params on page load', () => {
    const html = read('/');
    const src = /src="(\/_astro\/BaseLayout[^"]*\.js)"/.exec(html)?.[1];
    expect(src).toBeTruthy();
    const bundle = readFileSync(join('dist', src!.replace(/^\//, '')), 'utf8');
    // captureUtmParams is called with the query string, whatever it minifies to.
    expect(bundle).toContain('window.location.search');
  });

  it('ships Vercel Analytics and Speed Insights', () => {
    const html = read('/');
    expect(html).toContain('_vercel/insights');
    expect(html).toContain('_vercel/speed-insights');
  });

  // Astro's default envPrefix is PUBLIC_. This project's key is VITE_POSTHOG_KEY, so
  // without vite.envPrefix the expression compiles to undefined, initAnalytics()'s guard
  // becomes dead code and Rollup deletes the function outright.
  it('keeps VITE_ readable from client code', async () => {
    const config = readFileSync('astro.config.mjs', 'utf8');
    expect(config).toMatch(/envPrefix:\s*\[[^\]]*'VITE_'/);
  });

  // posthog-js is ~217 KB, larger than react-dom. It must stay behind a dynamic
  // import() so it never blocks first paint; a plain top-level import would silently
  // put it back in the critical path.
  it('keeps posthog out of the statically imported graph', () => {
    const src = readFileSync('src/lib/analytics.ts', 'utf8');
    expect(src).toContain('import("posthog-js")');
    expect(src).not.toMatch(/^import posthog from ["']posthog-js["']/m);
  });

  it('bundles posthog so initAnalytics has something to call', () => {
    const chunks = readdirSync('dist/_astro').filter((f) => f.endsWith('.js'));
    const anyHasPosthog = chunks.some((f) =>
      readFileSync(join('dist/_astro', f), 'utf8').includes('posthog'),
    );
    expect(anyHasPosthog).toBe(true);
  });
});
