import { describe, expect, it } from 'vitest';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error - plain .mjs module, shared with astro.config.mjs
import { remarkVideo, resolveVideoUrl, versionFromPath } from './remarkVideo.mjs';

const FILE = { path: '/repo/content/whats-new/2.2.0/de.md' };

const run = (tree: any, file: unknown = FILE) => {
  remarkVideo()(tree, file);
  return tree;
};

// Converting a node to type 'html' opts out of Astro's asset pipeline, so the URL is
// emitted verbatim and never resolved or copied. A bare "assets/x.mp4" on
// /whats-new/2.2.0/ therefore 404s — every release-note video was broken this way.
describe('video URL resolution', () => {
  it('derives the version from the markdown file path', () => {
    expect(versionFromPath('/repo/content/whats-new/2.5.1/en.md')).toBe('2.5.1');
    expect(versionFromPath(undefined)).toBeNull();
  });

  it('rewrites both authored forms to an absolute served path', () => {
    expect(resolveVideoUrl('assets/nutrients.mp4', '2.2.0')).toBe(
      '/whats-new-assets/2.2.0/nutrients.mp4',
    );
    expect(resolveVideoUrl('./assets/fasting.mp4', '2.2.0')).toBe(
      '/whats-new-assets/2.2.0/fasting.mp4',
    );
  });

  it('leaves absolute and remote URLs alone', () => {
    expect(resolveVideoUrl('/already/absolute.mp4', '2.2.0')).toBe('/already/absolute.mp4');
    expect(resolveVideoUrl('https://cdn.example/x.mp4', '2.2.0')).toBe('https://cdn.example/x.mp4');
  });

  it('emits an absolute src in the rendered video element', () => {
    const tree = {
      type: 'root',
      children: [
        { type: 'paragraph', children: [{ type: 'image', url: 'assets/nutrients.mp4', alt: 'x' }] },
      ],
    };
    expect(run(tree).children[0].children[0].value).toContain(
      'src="/whats-new-assets/2.2.0/nutrients.mp4"',
    );
  });
});

describe('remarkVideo', () => {
  it('rewrites an mp4 image node into a video element', () => {
    const tree = {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [{ type: 'image', url: 'assets/nutrients.mp4', alt: 'New Nutrients' }],
        },
      ],
    };
    const node = run(tree).children[0].children[0];
    expect(node.type).toBe('html');
    expect(node.value).toContain('<video');
    expect(node.value).toContain('/whats-new-assets/2.2.0/nutrients.mp4');
    expect(node.value).toContain('New Nutrients');
  });

  it('rewrites webm as well', () => {
    const tree = {
      type: 'root',
      children: [{ type: 'paragraph', children: [{ type: 'image', url: 'a/b.webm', alt: '' }] }],
    };
    expect(run(tree).children[0].children[0].value).toContain('<video');
  });

  it('handles the ./assets/ form used by 31 of the references', () => {
    const tree = {
      type: 'root',
      children: [
        { type: 'paragraph', children: [{ type: 'image', url: './assets/fasting.mp4', alt: 'x' }] },
      ],
    };
    expect(run(tree).children[0].children[0].type).toBe('html');
  });

  it('leaves png images untouched', () => {
    const tree = {
      type: 'root',
      children: [
        { type: 'paragraph', children: [{ type: 'image', url: 'assets/steps.png', alt: 'steps' }] },
      ],
    };
    expect(run(tree).children[0].children[0].type).toBe('image');
  });

  it('escapes quotes in alt text so the attribute cannot break out', () => {
    const tree = {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [{ type: 'image', url: 'a.mp4', alt: 'say "hi" & <b>' }],
        },
      ],
    };
    const value = run(tree).children[0].children[0].value;
    expect(value).not.toContain('say "hi"');
    expect(value).toContain('&quot;hi&quot;');
    expect(value).toContain('&amp;');
  });
});
