import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  assertManifest,
  HELP_AREAS,
  loadHelpManifest,
  docsHome,
  docsUrl,
  validateTopicEntry,
  type HelpTopicEntryData,
} from './helpTopics';

const manifest = loadHelpManifest();
const slugPattern = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const helpRoot = join(process.cwd(), 'content/help');
const topicFiles = (): { folder: string; file: string; text: string }[] =>
  readdirSync(helpRoot, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .flatMap((dirent) =>
      readdirSync(join(helpRoot, dirent.name))
        .filter((file) => file.endsWith('.md'))
        .map((file) => ({
          folder: dirent.name,
          file: `${dirent.name}/${file}`,
          text: readFileSync(join(helpRoot, dirent.name, file), 'utf8'),
        })),
    );

const entry = (overrides: Partial<HelpTopicEntryData> = {}): HelpTopicEntryData => ({
  id: 'copy-meal',
  title: 'Mahlzeit kopieren',
  short: 'Öffne die Mahlzeit und kopiere sie über das Menü.',
  ...overrides,
});

describe('help topic manifest', () => {
  it('every manifest id is unique and every slug is unique per language', () => {
    const ids = manifest.topics.map((topic) => topic.id);
    const de = manifest.topics.map((topic) => topic.slugs.de);
    const en = manifest.topics.map((topic) => topic.slugs.en);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(de).size).toBe(de.length);
    expect(new Set(en).size).toBe(en.length);
  });

  it('slugs match ^[a-z0-9]+(-[a-z0-9]+)*$', () => {
    const bad = manifest.topics
      .flatMap((topic) => [topic.slugs.de, topic.slugs.en])
      .filter((slug) => !slugPattern.test(slug));
    expect(bad).toEqual([]);
  });

  it('every topic uses a known area and at least one platform', () => {
    for (const topic of manifest.topics) {
      expect(HELP_AREAS).toContain(topic.area);
      expect(topic.platforms.length).toBeGreaterThan(0);
    }
  });

  it('the byok guide keeps eigener-api-schluessel and own-api-key', () => {
    const guide = manifest.topics.find((topic) => topic.id === 'byok-guide');
    expect(guide?.slugs).toEqual({ de: 'eigener-api-schluessel', en: 'own-api-key' });
  });

  it('assertManifest rejects a duplicate slug, a malformed slug and a moved byok guide', () => {
    const topics = manifest.topics;
    const clone = (mutate: (copy: typeof topics) => void) => {
      const copy = structuredClone(topics);
      mutate(copy);
      return { version: 1, topics: copy };
    };
    expect(() => assertManifest(clone((copy) => (copy[1].slugs.de = copy[0].slugs.de)))).toThrow(/duplicate de slug/);
    expect(() => assertManifest(clone((copy) => (copy[0].slugs.en = 'Bad Slug')))).toThrow(/malformed en slug/);
    expect(() =>
      assertManifest(clone((copy) => (copy.find((topic) => topic.id === 'byok-guide')!.slugs.de = 'byok'))),
    ).toThrow(/must keep the slugs/);
    expect(() => assertManifest(clone((copy) => (copy[1].id = copy[0].id)))).toThrow(/duplicate id/);
  });

  it("docsUrl('copy-meal') is docs.getintake.de/<id> and /en/<id>", () => {
    expect(docsUrl('copy-meal', 'de')).toBe('https://docs.getintake.de/copy-meal');
    expect(docsUrl('copy-meal', 'en')).toBe('https://docs.getintake.de/en/copy-meal');
    expect(() => docsUrl('gibt-es-nicht', 'de')).toThrow(/Unknown help topic/);
    expect(docsHome('de')).toBe('https://docs.getintake.de');
    expect(docsHome('en')).toBe('https://docs.getintake.de/en');
  });
});

describe('validateTopicEntry', () => {
  // Stands in for Astro's resolved image metadata; validation only checks presence.
  const shot = { src: '/shot.webp', width: 1, height: 1, format: 'webp' };

  it('accepts a valid entry', () => {
    expect(
      validateTopicEntry(
        entry({ steps: [{ text: 'Tippe auf die Mahlzeit.', ios: { image: shot }, android: { image: shot } }] }),
        manifest,
      ),
    ).toEqual([]);
  });

  it('flags a step without a screenshot for each platform of the topic', () => {
    const iosOnly = validateTopicEntry(
      entry({ steps: [{ text: 'Tippe auf die Mahlzeit.', ios: { image: shot } }] }),
      manifest,
    );
    expect(iosOnly).toEqual([expect.stringContaining('no android.image')]);
    const none = validateTopicEntry(entry({ steps: [{ text: 'Tippe auf die Mahlzeit.' }] }), manifest);
    expect(none).toHaveLength(2);
  });

  it('asks a one-platform topic only for its own screenshot', () => {
    const wide = { id: 'wide-screen-layout', platformNote: 'Nur auf iPhone Duo und iPad' };
    expect(validateTopicEntry(entry({ ...wide, steps: [{ text: 'Klapp es auf.', ios: { image: shot } }] }), manifest)).toEqual([]);
  });

  it('lets a draft omit screenshots but keeps every other check', () => {
    expect(validateTopicEntry(entry({ draft: true, steps: [{ text: 'Tippe auf die Mahlzeit.' }] }), manifest)).toEqual([]);
    expect(
      validateTopicEntry(entry({ draft: true, steps: [{ text: 'Tippe — dann kopiere.' }] }), manifest).length,
    ).toBeGreaterThan(0);
    expect(validateTopicEntry(entry({ draft: true, steps: [{ text: 'a'.repeat(161) }] }), manifest).length).toBeGreaterThan(0);
    expect(
      validateTopicEntry(entry({ draft: true, steps: [{ text: 'Tippe.', ios: { text: 'Tippe oben.' } }] }), manifest),
    ).toEqual([expect.stringContaining('ios.text has no ios.image')]);
  });

  it('flags a step that has ios.text but no ios.image', () => {
    const errors = validateTopicEntry(
      entry({ steps: [{ text: 'Tippe auf die Mahlzeit.', ios: { text: 'Tippe oben auf den Namen.' } }] }),
      manifest,
    );
    expect(errors.some((error) => error.includes('ios'))).toBe(true);
  });

  it('flags short longer than 220 characters and a step text longer than 160', () => {
    const longShort = validateTopicEntry(entry({ short: 'a'.repeat(221) }), manifest);
    const longStep = validateTopicEntry(entry({ steps: [{ text: 'a'.repeat(161) }] }), manifest);
    expect(longShort.length).toBeGreaterThan(0);
    expect(longStep.length).toBeGreaterThan(0);
  });

  it('flags a title longer than 32 characters or with a colon', () => {
    expect(validateTopicEntry(entry({ title: 'a'.repeat(32) }), manifest)).toEqual([]);
    expect(validateTopicEntry(entry({ title: 'a'.repeat(33) }), manifest).length).toBeGreaterThan(0);
    expect(validateTopicEntry(entry({ title: 'Kalorienring: übrig' }), manifest).length).toBeGreaterThan(0);
  });

  it('allows customPage only on byok-guide and requires it there', () => {
    expect(validateTopicEntry(entry({ customPage: 'byokGuide' }), manifest).length).toBeGreaterThan(0);
    expect(validateTopicEntry(entry({ id: 'byok-guide' }), manifest).length).toBeGreaterThan(0);
    expect(validateTopicEntry(entry({ id: 'byok-guide', customPage: 'byokGuide' }), manifest)).toEqual([]);
  });

  it('allows platformNote only on a one-platform topic, without an em dash', () => {
    const wide = { id: 'wide-screen-layout' };
    expect(validateTopicEntry(entry({ ...wide, platformNote: 'Nur auf iPhone Duo und iPad' }), manifest)).toEqual([]);
    expect(validateTopicEntry(entry({ ...wide, platformNote: 'Nur — iPad' }), manifest).length).toBeGreaterThan(0);
    expect(validateTopicEntry(entry({ platformNote: 'Nur auf dem iPhone' }), manifest).length).toBeGreaterThan(0);
  });

  it('flags an em dash in title, short or any step', () => {
    expect(validateTopicEntry(entry({ title: 'Kopieren — so geht es' }), manifest).length).toBeGreaterThan(0);
    expect(validateTopicEntry(entry({ short: 'Kurz — knapp.' }), manifest).length).toBeGreaterThan(0);
    expect(
      validateTopicEntry(entry({ steps: [{ text: 'Tippe — dann kopiere.' }] }), manifest).length,
    ).toBeGreaterThan(0);
  });
});

describe('help content files', () => {
  it("every file's frontmatter id equals its folder", () => {
    const files = topicFiles();
    expect(files.length).toBeGreaterThan(0);
    for (const { folder, file, text } of files) {
      const id = /^id:\s*["']?([^"'\s]+)["']?\s*$/m.exec(text)?.[1];
      expect(id, file).toBe(folder);
    }
  });

  it('no help markdown file contains an em dash, body included', () => {
    const offenders = topicFiles()
      .filter(({ text }) => text.includes('\u2014'))
      .map(({ file }) => file);
    expect(offenders).toEqual([]);
  });
});

describe('help launch gate', () => {
  // Drafts carry text without screenshots (Task 7a). Task 9 removes this skip before
  // launch: the help center goes live only when no entry is a draft any more.
  it.skip('no help entry is still a draft', () => {
    const drafts = topicFiles()
      .filter(({ text }) => /^draft:\s*true\s*$/m.test(text))
      .map(({ file }) => file);
    expect(drafts).toEqual([]);
  });
});

describe('help content coverage', () => {
  // Runs against the real content/help; un-skipped by Task 8 once every topic is written.
  it.skip('every manifest topic has a de and an en entry, every entry is in the manifest', () => {
    const root = join(process.cwd(), 'content/help');
    const ids = new Set(manifest.topics.map((topic) => topic.id));
    for (const id of ids) {
      expect(existsSync(join(root, id, 'de.md')), `${id}/de.md`).toBe(true);
      expect(existsSync(join(root, id, 'en.md')), `${id}/en.md`).toBe(true);
    }
    const folders = readdirSync(root, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);
    expect(folders.filter((folder) => !ids.has(folder))).toEqual([]);
  });
});
