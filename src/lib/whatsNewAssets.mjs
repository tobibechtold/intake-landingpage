import { cp, mkdir, readdir } from 'node:fs/promises';
import { existsSync, createReadStream, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Release-note videos live in content/whats-new/<version>/assets/*.{mp4,webm}, outside
// src/ and outside public/. Astro's asset pipeline only processes images referenced from
// markdown, and remarkVideo emits raw HTML which bypasses it entirely — so nothing copies
// these files. This integration does, under the same /whats-new-assets/<version>/ prefix
// that remarkVideo writes into its <video src>.
//
// Videos are deliberately not run through any transform: they are already encoded for the
// web and only need to be served.

const CONTENT_DIR = 'content/whats-new';
const URL_PREFIX = '/whats-new-assets';
const VIDEO_EXT = /\.(mp4|webm)$/i;

/** [{ version, file, absolutePath }] for every release-note video on disk. */
const collectVideos = async (root) => {
  const base = path.join(root, CONTENT_DIR);
  if (!existsSync(base)) return [];

  const out = [];
  for (const version of await readdir(base)) {
    const assets = path.join(base, version, 'assets');
    if (!existsSync(assets)) continue;
    for (const file of await readdir(assets)) {
      if (VIDEO_EXT.test(file)) {
        out.push({ version, file, absolutePath: path.join(assets, file) });
      }
    }
  }
  return out;
};

export function whatsNewAssets() {
  let root = process.cwd();

  return {
    name: 'intake:whats-new-assets',
    hooks: {
      'astro:config:done': ({ config }) => {
        root = fileURLToPath(config.root);
      },

      // Dev server: serve the files straight from content/ so `astro dev` matches prod.
      'astro:server:setup': ({ server }) => {
        server.middlewares.use((req, res, next) => {
          const url = (req.url ?? '').split('?')[0];
          if (!url.startsWith(`${URL_PREFIX}/`)) return next();

          const [, , version, file] = url.split('/');
          if (!version || !file) return next();

          const filePath = path.join(root, CONTENT_DIR, version, 'assets', file);
          if (!existsSync(filePath)) return next();

          res.setHeader('Content-Type', file.endsWith('.webm') ? 'video/webm' : 'video/mp4');
          res.setHeader('Content-Length', statSync(filePath).size);
          createReadStream(filePath).pipe(res);
        });
      },

      // Build: copy them into the output directory.
      'astro:build:done': async ({ dir, logger }) => {
        const outRoot = fileURLToPath(dir);
        const videos = await collectVideos(root);

        for (const { version, file, absolutePath } of videos) {
          const target = path.join(outRoot, URL_PREFIX.slice(1), version, file);
          await mkdir(path.dirname(target), { recursive: true });
          await cp(absolutePath, target);
        }

        logger.info(`copied ${videos.length} release-note videos to ${URL_PREFIX}/`);
      },
    },
  };
}
