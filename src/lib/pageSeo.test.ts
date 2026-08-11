import { describe, expect, it } from 'vitest';
import { getHreflangPair, getPageSeo, SITE_ORIGIN } from './pageSeo';

describe('getPageSeo', () => {
  it('returns German metadata for the homepage', () => {
    const seo = getPageSeo('/');
    expect(seo.lang).toBe('de');
    expect(seo.ogLocale).toBe('de_DE');
    expect(seo.canonical).toBe(`${SITE_ORIGIN}/`);
    expect(seo.title).toContain('Kalorienzähler ohne Abo');
  });

  it('returns English metadata for the English features page', () => {
    const seo = getPageSeo('/en/features');
    expect(seo.lang).toBe('en');
    expect(seo.ogLocale).toBe('en_US');
  });

  it('throws on an unknown route rather than silently returning defaults', () => {
    expect(() => getPageSeo('/does-not-exist')).toThrow();
  });

  it('resolves a What’s New entry route', () => {
    const seo = getPageSeo('/whats-new/2.5.1');
    expect(seo.lang).toBe('de');
    expect(seo.canonical).toBe(`${SITE_ORIGIN}/whats-new/2.5.1`);
  });
});

describe('getHreflangPair', () => {
  it('pairs the German and English homepages', () => {
    expect(getHreflangPair('/')).toEqual({ de: '/', en: '/en' });
  });

  it('pairs translated slugs', () => {
    expect(getHreflangPair('/funktionen')).toEqual({ de: '/funktionen', en: '/en/features' });
  });

  it('pairs comparison detail routes by suffix', () => {
    expect(getHreflangPair('/vergleiche/yazio-alternative')).toEqual({
      de: '/vergleiche/yazio-alternative',
      en: '/en/comparisons/yazio-alternative',
    });
  });

  it('pairs What’s New entries from the English side', () => {
    expect(getHreflangPair('/en/whats-new/2.5.1')).toEqual({
      de: '/whats-new/2.5.1',
      en: '/en/whats-new/2.5.1',
    });
  });
});
