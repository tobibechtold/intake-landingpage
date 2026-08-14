import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

/**
 * vercel.json carries three behaviours that no build output can prove: the smart-link
 * rewrites that every paid ad depends on, the root locale redirect, and the sitemap alias.
 * All three have already broken once in production, so they are asserted here.
 */
const config = JSON.parse(readFileSync('vercel.json', 'utf8'));
const rewrite = (source: string) =>
  config.rewrites.find((r: { source: string }) => r.source === source);

describe('smart links', () => {
  it('routes /go/:slug to the attribution function', () => {
    expect(rewrite('/go/:slug')?.destination).toBe('/api/go?slug=:slug');
    expect(rewrite('/go')?.destination).toBe('/api/go');
  });
});

describe('sitemap', () => {
  /**
   * The pre-Astro site served a hand-written public/sitemap.xml; @astrojs/sitemap emits
   * sitemap-index.xml instead, so the old path 404'd — including for the URL already
   * submitted to Search Console. A rewrite keeps it answering 200.
   */
  it('keeps the legacy /sitemap.xml path serving the index', () => {
    expect(rewrite('/sitemap.xml')?.destination).toBe('/sitemap-index.xml');
  });
});

describe('root locale redirect', () => {
  const redirect = config.redirects.find((r: { source: string }) => r.source === '/');

  it('is temporary, so Google never caches / as English', () => {
    expect(redirect.permanent).toBe(false);
  });

  it('never redirects crawlers — the de-indexing failure mode', () => {
    const botRule = redirect.missing.find(
      (m: { key: string }) => m.key === 'user-agent',
    );
    expect(botRule).toBeDefined();
    for (const ua of ['Googlebot', 'bingbot', 'GPTBot crawler', 'headless chrome']) {
      expect(new RegExp(botRule.value, 'i').test(ua.toLowerCase())).toBe(true);
    }
  });

  it('respects an explicit language choice', () => {
    expect(redirect.missing.some((m: { key: string }) => m.key === 'intake_lang')).toBe(true);
  });

  it('only fires for English Accept-Language', () => {
    const rule = redirect.has.find((h: { key: string }) => h.key === 'accept-language');
    expect(new RegExp(rule.value).test('en-US,en;q=0.9')).toBe(true);
    expect(new RegExp(rule.value).test('de-DE,de;q=0.9')).toBe(false);
  });
});
