import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { normalizeForSearch, searchTopics } from './helpSearch';
import { buildHelpIndex, groupHelpIndexByArea } from './helpIndex';
import { HELP_AREAS, loadHelpManifest } from './helpTopics';
import type { Language } from '@/i18n/translations';

// The real entries in content/help, read the way the help home reads them: the title and
// short answer from each <topic>/<lang>.md frontmatter.
const frontmatterValue = (source: string, key: string) =>
  source.match(new RegExp(`^${key}:\\s*"(.*)"\\s*$`, 'm'))?.[1] ?? '';

const entriesFor = (lang: Language) =>
  readdirSync('content/help', { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory() && existsSync(join('content/help', dirent.name, `${lang}.md`)))
    .map((dirent) => {
      const source = readFileSync(join('content/help', dirent.name, `${lang}.md`), 'utf8');
      return { id: frontmatterValue(source, 'id') || dirent.name, title: frontmatterValue(source, 'title'), short: frontmatterValue(source, 'short') };
    });

describe('normalizeForSearch', () => {
  it('matches with and without umlauts', () => {
    expect(normalizeForSearch('Übersicht')).toBe(normalizeForSearch('Ubersicht'));
    expect(normalizeForSearch('Übersicht')).toBe(normalizeForSearch('Uebersicht'));
    expect(normalizeForSearch('Frühstück')).toBe(normalizeForSearch('fruehstueck'));
    expect(normalizeForSearch('Schlüssel')).toBe(normalizeForSearch('schlussel'));
  });

  it('ignores case, ß and extra whitespace', () => {
    expect(normalizeForSearch('  GEWICHT ')).toBe(normalizeForSearch('gewicht'));
    expect(normalizeForSearch('Maße')).toBe(normalizeForSearch('masse'));
  });
});

describe('searchTopics', () => {
  const de = buildHelpIndex(entriesFor('de'), 'de');
  const en = buildHelpIndex(entriesFor('en'), 'en');

  it('finds copy-meal for "mahlzeit kopieren" and for "Mahlzeit"', () => {
    expect(searchTopics(de, 'mahlzeit kopieren')).toContain('copy-meal');
    expect(searchTopics(de, 'Mahlzeit')).toContain('copy-meal');
    expect(searchTopics(de, 'MAHLZEIT KOPIEREN')).toContain('copy-meal');
    expect(searchTopics(en, 'copy meal')).toContain('copy-meal');
  });

  it('finds the BYOK guide without umlauts', () => {
    expect(searchTopics(de, 'api schlussel')).toContain('byok-guide');
    expect(searchTopics(de, 'API-Schlüssel')).toContain('byok-guide');
  });

  it('matches regardless of case and umlauts', () => {
    const index = [
      { id: 'log-weight', title: 'Gewicht eintragen', short: 'Tippe auf die Gewichtskarte.' },
      { id: 'meal-summary', title: 'Mahlzeit-Übersicht', short: 'Summen einer Mahlzeit.' },
    ];
    expect(searchTopics(index, 'Gewicht')).toEqual(['log-weight']);
    expect(searchTopics(index, 'gewicht')).toEqual(['log-weight']);
    expect(searchTopics(index, 'ubersicht')).toEqual(['meal-summary']);
  });

  it('ranks title hits before hits in the short answer', () => {
    const index = [
      { id: 'short-hit', title: 'Rezept erstellen', short: 'Du kannst eine Mahlzeit als Rezept speichern.' },
      { id: 'title-hit', title: 'Mahlzeit kopieren', short: 'Kopiere Einträge.' },
    ];
    expect(searchTopics(index, 'mahlzeit')).toEqual(['title-hit', 'short-hit']);
  });

  it('needs every word and returns nothing for an empty query', () => {
    const index = [{ id: 'copy-meal', title: 'Mahlzeit kopieren', short: '' }];
    expect(searchTopics(index, 'mahlzeit wasser')).toEqual([]);
    expect(searchTopics(index, '   ')).toEqual([]);
  });
});

describe('buildHelpIndex', () => {
  it('lists only manifest topics with an entry in that language, with their paths', () => {
    const index = buildHelpIndex(
      [
        { id: 'copy-meal', title: 'Mahlzeit kopieren', short: 'Kurz.' },
        { id: 'byok-guide', title: 'Eigener Schlüssel', short: 'Kurz.' },
        { id: 'not-a-topic', title: 'X', short: 'Y' },
      ],
      'de',
    );
    expect(index.map((item) => item.id)).toEqual(['copy-meal', 'byok-guide']);
    expect(index.find((item) => item.id === 'byok-guide')?.href).toBe('/hilfe/eigener-api-schluessel');
    expect(index.find((item) => item.id === 'copy-meal')?.href).toBe('/hilfe/mahlzeit-kopieren');
  });

  it('follows the manifest order', () => {
    const manifestIds = loadHelpManifest().topics.map((topic) => topic.id);
    const ids = buildHelpIndex(entriesFor('en'), 'en').map((item) => item.id);
    expect(ids).toEqual(manifestIds.filter((id) => ids.includes(id)));
  });
});

describe('groupHelpIndexByArea', () => {
  it('groups in HelpArea order and leaves out empty areas', () => {
    const groups = groupHelpIndexByArea(buildHelpIndex(entriesFor('de'), 'de'));
    const areas = groups.map((group) => group.area);
    expect(areas).toEqual(HELP_AREAS.filter((area) => areas.includes(area)));
    expect(groups.every((group) => group.items.length > 0)).toBe(true);
    expect(groups.find((group) => group.area === 'intake-ai')?.items.map((item) => item.id)).toContain('byok-guide');
  });
});
