import type { Language } from '@/i18n/translations';
import rawManifest from '../../content/help/topics.json';

/**
 * The help topic manifest (content/help/topics.json) is the contract between the
 * site and both apps: the apps hard-code their "Mehr erfahren" targets from it.
 * A published slug never changes.
 *
 * Plain TypeScript with no astro:content import, so vitest and content.config.ts
 * can both use it.
 */

/** Areas in display order. */
export const HELP_AREAS = [
  'heute',
  'logging',
  'recipes-library',
  'goals-budget',
  'fasting',
  'water',
  'weight-body',
  'stats',
  'health',
  'sync',
  'widgets-watch-shortcuts',
  'intake-ai',
  'settings',
] as const;

export type HelpArea = (typeof HELP_AREAS)[number];
export type HelpPlatform = 'ios' | 'android';

export interface HelpTopic {
  id: string;
  area: HelpArea;
  slugs: Record<Language, string>;
  platforms: HelpPlatform[];
  legacyAnchors?: string[];
}

export interface HelpManifest {
  version: number;
  topics: HelpTopic[];
}

export interface HelpStepPlatform {
  text?: string;
  /** Resolved image metadata from Astro's image(); only its presence matters here. */
  image?: unknown;
}

export interface HelpStep {
  text: string;
  ios?: HelpStepPlatform;
  android?: HelpStepPlatform;
}

/** Frontmatter of content/help/<id>/<lang>.md. */
export interface HelpTopicEntryData {
  id: string;
  title: string;
  short: string;
  related?: string[];
  steps?: HelpStep[];
  /** Replaces the default platform-only note, e.g. "Nur auf iPhone Duo und iPad". */
  platformNote?: string;
  /**
   * Text written, screenshots still missing. Only a draft may have steps without a
   * screenshot per platform; the launch gate (helpTopics.test.ts) fails while any
   * entry is still a draft.
   */
  draft?: boolean;
}

/** One line in the docs sidebar. */
export const TITLE_MAX_LENGTH = 32;
export const SHORT_MAX_LENGTH = 220;
export const STEP_TEXT_MAX_LENGTH = 160;
export const RELATED_MAX = 3;
const EM_DASH = '—';
const PLATFORMS: HelpPlatform[] = ['ios', 'android'];
export const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;
export const BYOK_GUIDE_ID = 'byok-guide';
export const BYOK_GUIDE_SLUGS: Record<Language, string> = { de: 'eigener-api-schluessel', en: 'own-api-key' };

/** Throws on a malformed manifest. Runs on import, so `astro build` enforces it. */
export const assertManifest = (value: unknown): HelpManifest => {
  const manifest = value as HelpManifest;
  if (manifest?.version !== 1 || !Array.isArray(manifest.topics)) {
    throw new Error('content/help/topics.json: expected { version: 1, topics: [...] }');
  }
  for (const topic of manifest.topics) {
    if (!HELP_AREAS.includes(topic.area)) {
      throw new Error(`content/help/topics.json: unknown area "${topic.area}" on "${topic.id}"`);
    }
    if (!topic.slugs?.de || !topic.slugs?.en) {
      throw new Error(`content/help/topics.json: "${topic.id}" needs a de and an en slug`);
    }
    if (!topic.platforms?.length || topic.platforms.some((platform) => !PLATFORMS.includes(platform))) {
      throw new Error(`content/help/topics.json: "${topic.id}" has invalid platforms`);
    }
  }

  // Slugs are a public contract with both apps: unique, well-formed, and the BYOK
  // guide keeps its pre-help-center URLs.
  const duplicates = (values: string[]) => values.filter((value, index) => values.indexOf(value) !== index);
  for (const id of duplicates(manifest.topics.map((topic) => topic.id))) {
    throw new Error(`content/help/topics.json: duplicate id "${id}"`);
  }
  for (const lang of ['de', 'en'] as const) {
    const slugs = manifest.topics.map((topic) => topic.slugs[lang]);
    for (const slug of duplicates(slugs)) {
      throw new Error(`content/help/topics.json: duplicate ${lang} slug "${slug}"`);
    }
    for (const slug of slugs) {
      if (!SLUG_PATTERN.test(slug)) throw new Error(`content/help/topics.json: malformed ${lang} slug "${slug}"`);
    }
  }
  const guide = manifest.topics.find((topic) => topic.id === BYOK_GUIDE_ID);
  if (guide?.slugs.de !== BYOK_GUIDE_SLUGS.de || guide?.slugs.en !== BYOK_GUIDE_SLUGS.en) {
    throw new Error(
      `content/help/topics.json: "${BYOK_GUIDE_ID}" must keep the slugs ${BYOK_GUIDE_SLUGS.de} / ${BYOK_GUIDE_SLUGS.en}`,
    );
  }
  return manifest;
};

const manifest = assertManifest(rawManifest);

export const loadHelpManifest = (): HelpManifest => manifest;

export const findTopic = (id: string, source: HelpManifest = manifest): HelpTopic | undefined =>
  source.topics.find((topic) => topic.id === id);

/** The help topics live on the Starlight docs site; getintake.de/hilfe only keeps the FAQ. */
export const DOCS_ORIGIN = 'https://docs.getintake.de';

/** The docs URL of a topic: German at the root, English under /en. */
export const docsUrl = (id: string, lang: Language): string => {
  if (!findTopic(id)) throw new Error(`Unknown help topic "${id}"`);
  return lang === 'de' ? `${DOCS_ORIGIN}/${id}` : `${DOCS_ORIGIN}/en/${id}`;
};

/** The docs home in a language. */
export const docsHome = (lang: Language): string => (lang === 'de' ? DOCS_ORIGIN : `${DOCS_ORIGIN}/en`);

/** Error messages for one topic entry; empty when the entry is valid. */
export const validateTopicEntry = (entry: HelpTopicEntryData, source: HelpManifest): string[] => {
  const errors: string[] = [];
  const topic = findTopic(entry.id, source);
  const label = `help topic "${entry.id}"`;

  if (!topic) errors.push(`${label}: id is not in content/help/topics.json`);

  if (entry.title.includes(EM_DASH)) errors.push(`${label}: title contains an em dash`);
  if (entry.short.includes(EM_DASH)) errors.push(`${label}: short contains an em dash`);
  if (entry.platformNote !== undefined) {
    if (entry.platformNote.includes(EM_DASH)) errors.push(`${label}: platformNote contains an em dash`);
    if (topic && topic.platforms.length > 1) errors.push(`${label}: platformNote on a topic for both platforms`);
  }
  if (entry.title.length > TITLE_MAX_LENGTH) {
    errors.push(`${label}: title is ${entry.title.length} characters, max ${TITLE_MAX_LENGTH}`);
  }
  // Details belong in short; the title is the plain name of the task or thing.
  if (entry.title.includes(':')) errors.push(`${label}: title contains a colon`);
  if (entry.short.length > SHORT_MAX_LENGTH) {
    errors.push(`${label}: short is ${entry.short.length} characters, max ${SHORT_MAX_LENGTH}`);
  }

  const related = entry.related ?? [];
  if (related.length > RELATED_MAX) errors.push(`${label}: at most ${RELATED_MAX} related topics`);
  for (const id of related) {
    if (id === entry.id) errors.push(`${label}: lists itself as related`);
    else if (!findTopic(id, source)) errors.push(`${label}: related topic "${id}" is not in the manifest`);
  }

  (entry.steps ?? []).forEach((step, index) => {
    const stepLabel = `${label}, step ${index + 1}`;
    const texts = [step.text, step.ios?.text, step.android?.text].filter(
      (text): text is string => typeof text === 'string',
    );
    for (const text of texts) {
      if (text.includes(EM_DASH)) errors.push(`${stepLabel}: text contains an em dash`);
      if (text.length > STEP_TEXT_MAX_LENGTH) {
        errors.push(`${stepLabel}: text is ${text.length} characters, max ${STEP_TEXT_MAX_LENGTH}`);
      }
    }
    // Every step shows a screenshot on every platform of the topic. Drafts are the one
    // exception, so text can be reviewed before the capture runs.
    if (topic && !entry.draft) {
      for (const platform of topic.platforms) {
        if (!step[platform]?.image) {
          errors.push(`${stepLabel}: no ${platform}.image (only a draft: true entry may omit screenshots)`);
        }
      }
    }
    for (const platform of PLATFORMS) {
      const block = step[platform];
      if (!block) continue;
      // A platform whose steps differ needs its own screenshot, or the page renders an empty frame.
      if (block.text && !block.image) errors.push(`${stepLabel}: ${platform}.text has no ${platform}.image`);
      if (topic && !topic.platforms.includes(platform)) {
        errors.push(`${stepLabel}: has a ${platform} block but the topic is not on ${platform}`);
      }
    }
  });

  return errors;
};
