import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

// Ported from src/lib/favicon.test.ts, which read the now-deleted index.html template.
// Asserting against dist/ is strictly stronger: it tests what is actually served.
// These tags were carried by hand into BaseLayout.astro and are easy to lose silently.
const home = () => readFileSync('dist/index.html', 'utf8');

describe('favicon and crawl hints', () => {
  it('serves German as the default shell language and homepage metadata', () => {
    const html = home();
    expect(html).toContain('<html lang="de"');
    expect(html).toContain('Kalorienzähler ohne Abo');
  });

  it('declares conventional favicon assets', () => {
    const html = home();
    expect(html).toContain('href="/favicon.ico"');
    expect(html).toContain('href="/favicon-32x32.png"');
    expect(html).toContain('href="/apple-touch-icon.png"');
  });

  it('declares the iOS Smart App Banner', () => {
    // A direct install path on an app landing page — invisible in a browser if lost.
    expect(home()).toContain('<meta name="apple-itunes-app" content="app-id=6757768955">');
  });

  it('declares the robots directive with rich preview limits', () => {
    expect(home()).toContain('max-image-preview:large');
  });

  it('points robots.txt at the generated sitemap index', () => {
    const robots = readFileSync('public/robots.txt', 'utf8');
    expect(robots).toContain('Sitemap: https://www.getintake.de/sitemap-index.xml');
    expect(robots).not.toContain('intake.tobibechtold.dev');
  });
});
