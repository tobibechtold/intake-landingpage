import { defineRouteMiddleware } from '@astrojs/starlight/route-data';
import externalLinks from './generated/external-links.json' with { type: 'json' };

type SidebarEntry = StarlightRouteData['sidebar'][number];
type StarlightRouteData = App.Locals['starlightRoute'];
type SidebarLink = Extract<SidebarEntry, { type: 'link' }>;

const links = (entries: SidebarEntry[]): SidebarLink[] =>
  entries.flatMap((entry) => (entry.type === 'group' ? links(entry.entries) : [entry]));

/**
 * Sidebar links to getintake.de (FAQ, privacy) are written once, in German. On English
 * pages they point to the English page. Previous/next links skip them, so the guided
 * path reads Dokumentation > Intake installieren > ... instead of leaving the docs.
 */
export const onRequest = defineRouteMiddleware((context) => {
  const route = context.locals.starlightRoute;
  const all = links(route.sidebar);
  if (route.locale === 'en') {
    const english = externalLinks as Record<string, string>;
    for (const link of all) if (english[link.href]) link.href = english[link.href];
  }
  const internal = all.filter((link) => link.href.startsWith('/'));
  const current = internal.findIndex((link) => link.isCurrent);
  if (current > -1) {
    if (route.pagination.prev) route.pagination.prev = internal[current - 1];
    if (route.pagination.next) route.pagination.next = internal[current + 1];
  }
});
