import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { docsUrl, loadHelpManifest } from '../src/lib/helpTopics';

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

describe('/de locale alias', () => {
  /**
   * German is served unprefixed (/whats-new), but shipped iOS builds link the
   * /de/whats-new variant, so every one of those links 404'd. Old app versions stay
   * installed forever, so this alias is permanent even though the redirect is a 307 —
   * temporary keeps it reversible if the site ever adopts real /de/ prefixes, and no
   * browser caches the mapping past that point.
   */
  const redirect = (source: string) =>
    config.redirects.find((r: { source: string }) => r.source === source);

  it('maps /de/:path* onto the unprefixed German routes', () => {
    expect(redirect('/de/:path*')?.destination).toBe('/:path*');
  });

  it('maps bare /de onto the German home page', () => {
    expect(redirect('/de')?.destination).toBe('/');
  });

  it('stays temporary, so the alias can be withdrawn later', () => {
    expect(redirect('/de')?.permanent).toBe(false);
    expect(redirect('/de/:path*')?.permanent).toBe(false);
  });

  it('is ordered after the root locale redirect, which must win on /', () => {
    const sources = config.redirects.map((r: { source: string }) => r.source);
    expect(sources.indexOf('/')).toBeLessThan(sources.indexOf('/de'));
  });
});

describe('help topic redirects', () => {
  /**
   * The help topics moved to docs.getintake.de. Both apps hard-code /hilfe/<de slug> and
   * /en/help/<en slug> from content/help/topics.json, so every published slug needs a
   * permanent redirect to its docs page. scripts/help-redirects.mjs writes them; a new
   * topic without a redirect fails here. The BYOK guide is a docs topic like every other.
   */
  type Redirect = { source: string; destination: string; permanent?: boolean };
  const helpRedirects = (config.redirects as Redirect[]).filter((r) =>
    r.destination.startsWith('https://docs.getintake.de'),
  );
  const expected = loadHelpManifest()
    .topics.flatMap((topic) => [
      { source: `/hilfe/${topic.slugs.de}`, destination: docsUrl(topic.id, 'de'), permanent: true },
      { source: `/en/help/${topic.slugs.en}`, destination: docsUrl(topic.id, 'en'), permanent: true },
    ]);

  it('has exactly one permanent redirect per topic and language, and nothing else', () => {
    const bySource = (a: Redirect, b: Redirect) => a.source.localeCompare(b.source);
    expect([...helpRedirects].sort(bySource)).toEqual([...expected].sort(bySource));
  });

  it('sends copy-meal to the docs in both languages', () => {
    const find = (source: string) => helpRedirects.find((r) => r.source === source)?.destination;
    expect(find('/hilfe/mahlzeit-kopieren')).toBe('https://docs.getintake.de/copy-meal');
    expect(find('/en/help/copy-meal')).toBe('https://docs.getintake.de/en/copy-meal');
  });

  it('sends the old BYOK guide URLs to the docs', () => {
    const find = (source: string) => helpRedirects.find((r) => r.source === source)?.destination;
    expect(find('/hilfe/eigener-api-schluessel')).toBe('https://docs.getintake.de/byok-guide');
    expect(find('/en/help/own-api-key')).toBe('https://docs.getintake.de/en/byok-guide');
  });

  it('leaves the help home on getintake.de', () => {
    const sources = (config.redirects as Redirect[]).map((r) => r.source);
    for (const source of ['/hilfe', '/en/help']) {
      expect(sources).not.toContain(source);
    }
  });

  it('keeps the query string: Vercel appends it only to a destination without its own', () => {
    // ?platform=ios&source=app from the apps must reach the docs page.
    expect(helpRedirects.filter((r) => r.destination.includes('?'))).toEqual([]);
    expect(helpRedirects.filter((r) => /[:(*]/.test(r.source))).toEqual([]);
  });
});
