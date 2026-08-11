import { describe, expect, it } from 'vitest';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error - plain .mjs module, shared with astro.config.mjs
import { remarkVideo } from './remarkVideo.mjs';

const run = (tree: any) => {
  remarkVideo()(tree);
  return tree;
};

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
    expect(node.value).toContain('assets/nutrients.mp4');
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
