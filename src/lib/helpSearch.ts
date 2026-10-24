/**
 * Client-side search over the help topics (title and short answer).
 *
 * No imports on purpose: the help home's search script bundles this module, and it must
 * not pull the topic manifest into the browser.
 */
export interface HelpSearchItem {
  id: string;
  title: string;
  short: string;
}

/**
 * Lowercase, umlauts folded to their base letter (also the ae/oe/ue spelling), ß as ss,
 * whitespace collapsed. "Übersicht", "Ubersicht" and "Uebersicht" all become "ubersicht".
 */
export const normalizeForSearch = (text: string): string =>
  text
    .toLowerCase()
    .replace(/ß/g, 'ss')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/([aou])e/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();

/**
 * Ids of the topics containing every word of the query, title hits first, otherwise in
 * index order. An empty query matches nothing.
 */
export const searchTopics = (index: HelpSearchItem[], query: string): string[] => {
  const words = normalizeForSearch(query).split(' ').filter(Boolean);
  if (words.length === 0) return [];

  const titleHits: string[] = [];
  const otherHits: string[] = [];
  for (const item of index) {
    const title = normalizeForSearch(item.title);
    const haystack = `${title} ${normalizeForSearch(item.short)}`;
    if (!words.every((word) => haystack.includes(word))) continue;
    (words.every((word) => title.includes(word)) ? titleHits : otherHits).push(item.id);
  }
  return [...titleHits, ...otherHits];
};
