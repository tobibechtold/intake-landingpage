import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import snapshot from './fixtures/page-text-snapshot.json';

/**
 * Guards the visible text of every page against the React → .astro conversion.
 *
 * Converting components by hand or by codemod can silently drop or mangle copy, and the
 * legal pages carry text with actual legal meaning. A word count alone would not catch a
 * reordering or a substitution, so this hashes the normalised visible text.
 *
 * If a change is intentional, re-record with:
 *   npm run build && node scripts/snapshot-text.mjs
 */
const visibleText = (html: string) =>
  html
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<style[\s\S]*?<\/style>/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const fileFor = (route: string) =>
  route === '/404' ? join('dist', '404.html')
  : route === '/' ? join('dist', 'index.html')
  : join('dist', route.slice(1), 'index.html');

const routes = Object.keys(snapshot as Record<string, { words: number; sha: string }>);

describe('page text is preserved across the conversion', () => {
  it('still emits every route that was snapshotted', () => {
    expect(routes.filter((r) => !existsSync(fileFor(r)))).toEqual([]);
  });

  it.each(routes)('%s renders identical visible text', (route) => {
    const expected = (snapshot as Record<string, { words: number; sha: string }>)[route];
    const actual = visibleText(readFileSync(fileFor(route), 'utf8'));
    const sha = createHash('sha256').update(actual).digest('hex').slice(0, 16);

    // Word count first: its failure message is far more readable than a hash mismatch.
    expect(actual.split(' ').length).toBe(expected.words);
    expect(sha).toBe(expected.sha);
  });
});
