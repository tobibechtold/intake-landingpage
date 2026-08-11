import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

/**
 * Google treats structured data that contradicts the visible page as spam, and the penalty
 * is a manual action on the whole property. The rating and price are the two numbers most
 * likely to drift, because each is rendered in several places — the bug this guards
 * against is exactly that: `aggregateRating` was updated to 4.8 while four hardcoded
 * "4.9"s kept rendering, so the markup claimed one number and the page showed another.
 */
const PAGES = [
  { file: 'dist/index.html', lang: 'de', rating: '4,8', price: '6,99', currency: 'EUR' },
  { file: 'dist/en/index.html', lang: 'en', rating: '4.8', price: '5.99', currency: 'USD' },
];

const visibleText = (html: string) =>
  html
    .replace(/<(script|style)\b[\s\S]*?<\/\1>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;| /g, ' ')
    .replace(/\s+/g, ' ');

const appNode = (html: string) => {
  const blocks = [...html.matchAll(/application\/ld\+json">([\s\S]*?)<\/script>/g)];
  const node = blocks
    .map((m) => JSON.parse(m[1]))
    .find((n) => n['@type'] === 'MobileApplication');
  if (!node) throw new Error('no MobileApplication node');
  return node;
};

describe.each(PAGES)('$lang homepage structured data', (page) => {
  const html = readFileSync(page.file, 'utf8');
  const node = appNode(html);
  const text = visibleText(html);

  it('declares the rating the page displays', () => {
    expect(String(node.aggregateRating.ratingValue)).toBe(page.rating.replace(',', '.'));
    expect(text).toContain(`${page.rating} `);
  });

  it('never renders a rating other than the declared one', () => {
    const rendered = new Set([...text.matchAll(/\b\d[.,]\d\b(?=\s*(?:App|<|$)| App)/g)].map((m) => m[0]));
    const stale = [...rendered].filter((r) => r !== page.rating);
    expect(stale, `page renders rating(s) that disagree with JSON-LD`).toEqual([]);
  });

  it('declares a rating count, without which Google drops the node', () => {
    expect(node.aggregateRating.ratingCount).toBeGreaterThan(0);
  });

  it('declares the price the page displays, in the page currency', () => {
    expect(node.offers.priceCurrency).toBe(page.currency);
    expect(String(node.offers.price)).toBe(page.price.replace(',', '.'));
    expect(text).toContain(page.price);
  });
});
