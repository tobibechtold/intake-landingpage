import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { loadHelpManifest, validateTopicEntry } from './lib/helpTopics';

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

// content/help/<topic id>/{de,en}.md — one entry per help topic and language.
// Entry ids take the form "<topic>/<lang>", e.g. "copy-meal/de". The topic ids and
// slugs come from content/help/topics.json; validateTopicEntry fails the build for a
// topic that is not in it, a too-long text, an em dash, or a platform step without
// its own screenshot.
const helpTopics = defineCollection({
  loader: glob({
    pattern: '*/{de,en}.md',
    base: './content/help',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: ({ image }) => {
    const platformStep = z
      .object({
        text: z.string().optional(),
        image: image().optional(),
      })
      .optional();
    return z
      .object({
        id: z.string(),
        title: z.string(),
        short: z.string(),
        related: z.array(z.string()).optional(),
        steps: z
          .array(
            z.object({
              text: z.string(),
              ios: platformStep,
              android: platformStep,
            }),
          )
          .optional(),
        customPage: z.literal('byokGuide').optional(),
      })
      .superRefine((data, ctx) => {
        for (const message of validateTopicEntry(data, loadHelpManifest())) {
          ctx.addIssue({ code: 'custom', message });
        }
      });
  },
});

export const collections = { whatsNew, helpTopics };
