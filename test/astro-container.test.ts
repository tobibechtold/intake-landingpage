// @vitest-environment node
//
// The node environment is mandatory, not stylistic: Astro 6 removed the ability to
// render Astro components in Vitest client environments ("tests that render Astro
// components must now run in a server environment like `node`"). The suite's global
// environment stays jsdom for the React component tests; this file overrides it.
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, it } from 'vitest';
import BaseLayout from '../src/layouts/BaseLayout.astro';

const render = (props: Record<string, unknown>) =>
  AstroContainer.create().then((container) =>
    container.renderToString(BaseLayout, { props, slots: { default: '<h1>hi</h1>' } }),
  );

describe('BaseLayout', () => {
  it('renders the German canonical and hreflang pair for the homepage', async () => {
    const html = await render({ route: '/' });
    expect(html).toContain('<html lang="de"');
    expect(html).toContain('rel="canonical" href="https://www.getintake.de/"');
    expect(html).toContain('hreflang="en" href="https://www.getintake.de/en"');
    expect(html).toContain('hreflang="x-default" href="https://www.getintake.de/"');
  });

  it('renders the English locale for /en', async () => {
    const html = await render({ route: '/en' });
    expect(html).toContain('<html lang="en"');
    expect(html).toContain('content="en_US"');
  });

  it('pairs translated slugs rather than assuming a shared path', async () => {
    const html = await render({ route: '/funktionen' });
    expect(html).toContain('hreflang="en" href="https://www.getintake.de/en/features"');
  });

  it('lets a What’s New entry override title and description', async () => {
    const html = await render({
      route: '/whats-new/2.5.1',
      title: 'Was ist neu in Intake 2.5.1 | Intake',
      description: 'Körpermaße und mehr',
    });
    expect(html).toContain('<title>Was ist neu in Intake 2.5.1 | Intake</title>');
    expect(html).toContain('content="Körpermaße und mehr"');
    expect(html).toContain('rel="canonical" href="https://www.getintake.de/whats-new/2.5.1"');
  });

  it('carries the Smart App Banner and robots directive rescued from index.html', async () => {
    const html = await render({ route: '/' });
    expect(html).toContain('name="apple-itunes-app" content="app-id=6757768955"');
    expect(html).toContain('max-image-preview:large');
  });
});
