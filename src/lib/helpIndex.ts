import type { Language } from '@/i18n/translations';
import { HELP_AREAS, loadHelpManifest, topicPath, type HelpArea } from './helpTopics';
import type { HelpSearchItem } from './helpSearch';

/** One topic on the help home: in the area lists and in the inline search index. */
export interface HelpIndexItem extends HelpSearchItem {
  area: HelpArea;
  href: string;
}

/**
 * The topics that have an entry in this language, in manifest order. Topics without
 * content yet are left out, so the help home never links to a missing page.
 */
export const buildHelpIndex = (entries: HelpSearchItem[], lang: Language): HelpIndexItem[] => {
  const byId = new Map(entries.map((entry) => [entry.id, entry]));
  return loadHelpManifest().topics.flatMap((topic) => {
    const entry = byId.get(topic.id);
    if (!entry) return [];
    return [{ id: topic.id, title: entry.title, short: entry.short, area: topic.area, href: topicPath(topic.id, lang) }];
  });
};

/** Areas in HelpArea order, each with its topics; empty areas are left out. */
export const groupHelpIndexByArea = (index: HelpIndexItem[]): { area: HelpArea; items: HelpIndexItem[] }[] =>
  HELP_AREAS.map((area) => ({ area, items: index.filter((item) => item.area === area) })).filter(
    (group) => group.items.length > 0,
  );
