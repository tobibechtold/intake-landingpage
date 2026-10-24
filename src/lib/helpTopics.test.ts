import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  HELP_AREAS,
  loadHelpManifest,
  topicPath,
  validateTopicEntry,
  type HelpTopicEntryData,
} from './helpTopics';

const manifest = loadHelpManifest();
const slugPattern = /^[a-z0-9]+(-[a-z0-9]+)*$/;

const entry = (overrides: Partial<HelpTopicEntryData> = {}): HelpTopicEntryData => ({
  id: 'copy-meal',
  title: 'Mahlzeit auf einen anderen Tag kopieren',
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

  it("topicPath('copy-meal') is /hilfe/<de-slug> and /en/help/<en-slug>", () => {
    const topic = manifest.topics.find((candidate) => candidate.id === 'copy-meal');
    expect(topic).toBeDefined();
    expect(topicPath('copy-meal', 'de')).toBe('/hilfe/' + topic!.slugs.de);
    expect(topicPath('copy-meal', 'en')).toBe('/en/help/' + topic!.slugs.en);
  });
});

describe('validateTopicEntry', () => {
  it('accepts a valid entry', () => {
    expect(validateTopicEntry(entry({ steps: [{ text: 'Tippe auf die Mahlzeit.' }] }), manifest)).toEqual([]);
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

  it('flags an em dash in title, short or any step', () => {
    expect(validateTopicEntry(entry({ title: 'Kopieren — so geht es' }), manifest).length).toBeGreaterThan(0);
    expect(validateTopicEntry(entry({ short: 'Kurz — knapp.' }), manifest).length).toBeGreaterThan(0);
    expect(
      validateTopicEntry(entry({ steps: [{ text: 'Tippe — dann kopiere.' }] }), manifest).length,
    ).toBeGreaterThan(0);
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
