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
const sourceFiles = () =>
  [...walk('src/components'), ...walk('src/pages-react'), ...walk('src/layouts')].filter(
    (f) => !f.includes(`${'components'}/ui/`),
  );

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

  it('keeps the React Button variants aligned with the CSS tiers', () => {
    // Both must render a white primary; a pink fill means they have drifted apart.
    expect(readFileSync('src/components/ui/button.tsx', 'utf8')).toContain(
      'bg-foreground text-background',
    );
    expect(readFileSync('src/index.css', 'utf8')).toContain('bg-foreground');
  });

  it('keeps muted body copy above the AA contrast threshold', () => {
    const css = readFileSync('src/index.css', 'utf8');
    const match = /--muted-foreground:\s*\d+\s+\d+%\s+(\d+)%/.exec(css);
    expect(match).toBeTruthy();
    // 45% fails AA against the 5% background; 58% is the chosen value at 6.4:1.
    expect(Number(match![1])).toBeGreaterThanOrEqual(52);
  });
});
