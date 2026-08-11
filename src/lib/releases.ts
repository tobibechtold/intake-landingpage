/**
 * Plain, framework-free shape of a release note as the React components need it.
 *
 * The Astro layer owns reading the content collection and maps entries into this
 * shape; React components receive it as props. That keeps astro:content out of the
 * React tree and means no component globs markdown at import time the way the
 * deleted whatsNewContent.ts did.
 */
export interface ReleaseSummary {
  version: string;
  publishedAt: string;
  title: string;
  summary: string;
  /** Already-resolved URL, not the raw "./assets/cover.svg" frontmatter value. */
  coverImage: string;
  highlights: string[];
  href: string;
}

/** Newest first, comparing version segments numerically rather than lexically. */
export const compareVersionsDesc = (left: string, right: string): number => {
  const l = left.split('.').map((part) => Number.parseInt(part, 10));
  const r = right.split('.').map((part) => Number.parseInt(part, 10));

  for (let i = 0; i < Math.max(l.length, r.length); i += 1) {
    const diff = (r[i] ?? 0) - (l[i] ?? 0);
    if (diff !== 0) return diff;
  }

  return 0;
};
