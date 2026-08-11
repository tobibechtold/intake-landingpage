// Release notes author videos with image syntax — ![New Nutrients](assets/nutrients.mp4).
// Astro's markdown pipeline would emit <img src="...mp4"> for those, which renders nothing.
// This plugin rewrites video-extension image nodes into real <video> elements.
//
// Both the bare `assets/...` (63 references) and `./assets/...` (31 references) forms
// appear across the 40 markdown files; neither is normalised here because Astro resolves
// the relative URL itself.

const VIDEO_EXT = /\.(mp4|webm)$/i;

const escapeAttr = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');

export function remarkVideo() {
  return (tree) => {
    const walk = (node) => {
      if (!node.children) return;

      node.children = node.children.map((child) => {
        if (child.type === 'image' && VIDEO_EXT.test(child.url)) {
          return {
            type: 'html',
            value:
              '<video controls playsinline preload="metadata" ' +
              `aria-label="${escapeAttr(child.alt ?? '')}" ` +
              `src="${escapeAttr(child.url)}"></video>`,
          };
        }

        walk(child);
        return child;
      });
    };

    walk(tree);
  };
}
