import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const walk = (dir: string, out: string[] = []): string[] => {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (/\.(tsx|astro)$/.test(entry) && !entry.endsWith('.test.tsx')) out.push(full);
  }
  return out;
};

// src/components/ui/* is vendored shadcn; its variants are the single place button
// styling is defined for React, so it is exempt from the "no bespoke styles" rules.
// src/pages-react and src/components/ui are gone: the site has no React left.
const sourceFiles = () => [...walk('src/components'), ...walk('src/layouts'), ...walk('src/pages')];

const read = (f: string) => ({ file: f, text: readFileSync(f, 'utf8') });

describe('Refined Dark design system', () => {
  // "I want one consistent look and feel on the entire page." These rules keep new
  // markup from quietly reintroducing a fourth button style.
  it('has no bespoke pink-outline pill buttons', () => {
    const offenders = sourceFiles()
      .map(read)
      .filter(({ text }) => /border-primary\/40[^"]*text-primary/.test(text))
      .map(({ file }) => file);
    expect(offenders).toEqual([]);
  });

  // The audit that produced this system originally only scanned <a> and <button>, and
  // missed "Seite ansehen" / "Update lesen" — CTAs rendered as <span> inside a card that
  // is itself the link. Three components had three different treatments as a result.
  it('has no bare pink-text CTAs masquerading as buttons', () => {
    const offenders = sourceFiles()
      .map(read)
      .filter(({ text }) =>
        // a <span> styled as pink text sitting inside an <a> — an action, not prose
        /<a[^>]*>[\s\S]{0,600}?<span[^>]*(?:className|class)="[^"]*text-primary"[^>]*>/.test(text),
      )
      .map(({ file }) => file);
    expect(offenders).toEqual([]);
  });

  it('has no glow shadows', () => {
    const offenders = sourceFiles()
      .map(read)
      .filter(({ text }) => /shadow-\[[^\]]*(?:255,\s*76,\s*145|hsl\(var\(--primary\))/.test(text))
      .map(({ file }) => file);
    expect(offenders).toEqual([]);
  });

  it('has no 2rem radii left over from the old card style', () => {
    const offenders = sourceFiles()
      .map(read)
      .filter(({ text }) => text.includes('rounded-[2rem]'))
      .map(({ file }) => file);
    expect(offenders).toEqual([]);
  });

  it('defines the button tiers in exactly one place each', () => {
    const css = readFileSync('src/index.css', 'utf8');
    for (const cls of ['.btn-primary', '.btn-secondary', '.btn-ghost', '.badge-accent']) {
      expect(css.split(`${cls} {`).length - 1).toBe(1);
    }
  });

  // There is no React Button any more, so the CSS tiers are the single definition.
  it('defines the primary button as a white fill', () => {
    expect(readFileSync('src/index.css', 'utf8')).toContain('bg-foreground');
  });

  it('has no React left in the source tree', () => {
    const react = sourceFiles().filter((f) => f.endsWith('.tsx'));
    expect(react).toEqual([]);
  });

  it('keeps muted body copy above the AA contrast threshold', () => {
    const css = readFileSync('src/index.css', 'utf8');
    const match = /--muted-foreground:\s*\d+\s+\d+%\s+(\d+)%/.exec(css);
    expect(match).toBeTruthy();
    // 45% fails AA against the 5% background; 58% is the chosen value at 6.4:1.
    expect(Number(match![1])).toBeGreaterThanOrEqual(52);
  });
});

/**
 * Layer ordering.
 *
 * .btn-primary and friends were originally declared in @layer utilities, which meant
 * they were emitted AFTER the atomic utilities and silently beat every call-site
 * override. The visible symptom was the icon-only download button rendering as a blank
 * white square: its `px-0` lost to .btn-primary's `px-5`, so a 36px button carried 40px
 * of horizontal padding and the icon was squeezed to 0px wide.
 *
 * Tailwind emits components before utilities, so these must live in @layer components.
 */
describe('CSS layer ordering', () => {
  const css = () => {
    const dir = 'dist/_astro';
    const file = readdirSync(dir).find((f) => f.endsWith('.css'))!;
    return readFileSync(join(dir, file), 'utf8');
  };

  it.each(['.px-0', '.px-4', '.px-6', '.w-9', '.w-full'])(
    '%s overrides .btn-primary rather than losing to it',
    (util) => {
      const sheet = css();
      const component = sheet.indexOf('.btn-primary{');
      const utility = sheet.indexOf(`${util}{`);
      expect(component).toBeGreaterThan(-1);
      expect(utility).toBeGreaterThan(-1);
      expect(utility).toBeGreaterThan(component);
    },
  );
});

/**
 * Every comparison table must be readable on a phone.
 *
 * Three columns of prose either overflow or squeeze to unreadable widths, so the rows
 * reflow into stacked cards below md. Both the Yazio/FDDB comparisons and the Intake AI
 * vs BYOK table share one component, so they cannot drift apart again.
 */
describe('comparison tables', () => {
  const pages = [
    'dist/vergleiche/yazio-alternative/index.html',
    'dist/vergleiche/fddb-alternative/index.html',
    'dist/en/comparisons/yazio-alternative/index.html',
    'dist/intake-ai/index.html',
    'dist/en/intake-ai/index.html',
  ];

  it.each(pages)('%s uses the shared responsive table', (page) => {
    const html = readFileSync(page, 'utf8');
    expect(html).toContain('class="comparison-table');
  });

  it.each(pages)('%s labels each cell for the stacked mobile layout', (page) => {
    const html = readFileSync(page, 'utf8');
    // data-label drives the ::before column heading when the table reflows
    expect(html).toMatch(/<td[^>]+data-label="[^"]+"/);
  });

  it('reflows rather than duplicating the comparison prose', () => {
    const html = readFileSync('dist/vergleiche/yazio-alternative/index.html', 'utf8');
    // a separate mobile card list would repeat every comparison point in the HTML
    expect(html).not.toContain('data-comparison-mobile');
    expect((html.match(/Einmalkauf\. Kein Modell/g) ?? []).length).toBe(1);
  });
});
