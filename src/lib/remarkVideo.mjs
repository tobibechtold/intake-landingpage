// Release notes author videos with image syntax — ![New Nutrients](assets/nutrients.mp4).
// Astro's markdown pipeline would emit <img src="...mp4"> for those, which renders nothing.
// This plugin rewrites video-extension image nodes into real <video> elements.
//
// Both the bare `assets/...` (63 references) and `./assets/...` (31 references) forms
// appear across the 40 markdown files.
//
// IMPORTANT: converting a node to `type: 'html'` opts out of Astro's asset pipeline, so
// the URL is emitted verbatim and never resolved or copied. A bare `assets/x.mp4` on
// /whats-new/2.2.0/ therefore 404s. We rewrite it to an absolute
// /whats-new-assets/<version>/<file> path, and the whatsNewAssets integration copies the
// files there at build time and serves them in dev.

const VIDEO_EXT = /\.(mp4|webm)$/i;

export const WHATS_NEW_ASSET_BASE = '/whats-new-assets';

const escapeAttr = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');

/** content/whats-new/2.2.0/de.md -> "2.2.0" */
export const versionFromPath = (filePath) => {
  if (!filePath) return null;
  const match = /whats-new[/\\]([^/\\]+)[/\\][^/\\]+\.md$/.exec(String(filePath));
  return match ? match[1] : null;
};

/** "assets/nutrients.mp4" | "./assets/nutrients.mp4" -> "/whats-new-assets/2.2.0/nutrients.mp4" */
export const resolveVideoUrl = (url, version) => {
  if (/^(https?:)?\/\//.test(url) || url.startsWith('/')) return url;
  const file = String(url).replace(/^\.\//, '').replace(/^assets\//, '');
  return version ? `${WHATS_NEW_ASSET_BASE}/${version}/${file}` : url;
};

export function remarkVideo() {
  return (tree, file) => {
    const version = versionFromPath(file?.path ?? file?.history?.[0]);

    const walk = (node) => {
      if (!node.children) return;

      node.children = node.children.map((child) => {
        if (child.type === 'image' && VIDEO_EXT.test(child.url)) {
          const src = resolveVideoUrl(child.url, version);
          return {
            type: 'html',
            value:
              '<video controls playsinline preload="metadata" ' +
              `aria-label="${escapeAttr(child.alt ?? '')}" ` +
              `src="${escapeAttr(src)}"></video>`,
          };
        }

        walk(child);
        return child;
      });
    };

    walk(tree);
  };
}
