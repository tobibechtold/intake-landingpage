import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// content/whats-new/<version>/{de,en}.md — 20 versions x 2 locales = 40 entries.
// Entry ids take the form "<version>/<lang>", e.g. "2.5.1/de".
//
// The schema is not decoration: a release note with a missing summary or a malformed
// highlights list now fails the build instead of shipping a blank page.
const whatsNew = defineCollection({
  loader: glob({
    pattern: '*/{de,en}.md',
    base: './content/whats-new',
    // The default generateId slugifies the directory name, turning "2.5.1/de" into
    // "251/de" and making ids unreadable. Keep the version verbatim.
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  // `image()` resolves ./assets/cover.svg to a hashed, emitted asset with .src,
  // replacing the import.meta.glob lookup the old whatsNewContent.ts did by hand.
  schema: ({ image }) =>
    z.object({
      version: z.string(),
      publishedAt: z.string(),
      title: z.string(),
      summary: z.string(),
      coverImage: image(),
      highlights: z.array(z.string()),
    }),
});

export const collections = { whatsNew };
