import { getCollection } from 'astro:content';
import { compareVersionsDesc, type ReleaseSummary } from './releases';
import type { Locale } from './pageSeo';

/**
 * Astro-side bridge between the whatsNew content collection and the plain
 * ReleaseSummary shape the React components consume.
 *
 * Imports astro:content, so this module is only ever imported from .astro files —
 * never from a React component or a vitest unit test.
 */
export const loadReleases = async (lang: Locale): Promise<ReleaseSummary[]> => {
  const entries = await getCollection('whatsNew', (entry) => entry.id.endsWith(`/${lang}`));

  return entries
    .sort((a, b) => compareVersionsDesc(a.data.version, b.data.version))
    .map((entry) => ({
      version: entry.data.version,
      publishedAt: entry.data.publishedAt,
      title: entry.data.title,
      summary: entry.data.summary,
      coverImage: entry.data.coverImage.src,
      highlights: entry.data.highlights,
      href: lang === 'de'
        ? `/whats-new/${entry.data.version}`
        : `/en/whats-new/${entry.data.version}`,
    }));
};
