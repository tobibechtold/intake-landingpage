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
// its own screenshot, or (outside a draft: true entry) any step without a screenshot
// per platform. The frontmatter id must equal the folder, or a copied file
// would validate and render as the wrong topic.
//
// No page here renders these entries any more (the topics live on docs.getintake.de,
// built from the same files by docs-site/). The collection stays as the build-time
// content gate.
const helpTopics = defineCollection({
  loader: glob({
    pattern: '*/{de,en}.md',
    base: './content/help',
    generateId: ({ entry, data }) => {
      const id = entry.replace(/\.md$/, '');
      const folder = id.split('/')[0];
      if (data.id !== folder) {
        throw new Error(
          `content/help/${entry}: frontmatter id "${String(data.id)}" must equal its folder "${folder}"`,
        );
      }
      return id;
    },
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
        platformNote: z.string().optional(),
        draft: z.boolean().optional(),
      })
      .superRefine((data, ctx) => {
        for (const message of validateTopicEntry(data, loadHelpManifest())) {
          ctx.addIssue({ code: 'custom', message });
        }
      });
  },
});

export const collections = { whatsNew, helpTopics };
