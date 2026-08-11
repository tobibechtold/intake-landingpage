import { detectClientPlatform, getAppStoreUrl, getGooglePlayUrl } from '@/lib/storeLinks';
import type { Language } from '@/i18n/translations';

/**
 * Header behaviour without React.
 *
 * Two things genuinely need the client here:
 *
 *  1. The mobile menu. It was a Radix Sheet, which meant react-dom (129 KB) was loaded
 *     on all 13 pages purely to open a drawer. A native <dialog> gives focus trapping,
 *     Escape-to-close and inert background for free.
 *
 *  2. The download link target, which depends on the user agent. The markup ships the
 *     safe fallback (#hero) so the link works before this runs and if it never does;
 *     this only upgrades it to the store URL on a real phone.
 */
const initMenu = () => {
  const dialog = document.querySelector<HTMLDialogElement>('[data-nav-dialog]');
  const openBtn = document.querySelector<HTMLButtonElement>('[data-nav-open]');
  if (!dialog || !openBtn) return;

  openBtn.addEventListener('click', () => dialog.showModal());

  for (const el of dialog.querySelectorAll('[data-nav-close]')) {
    el.addEventListener('click', () => dialog.close());
  }

  // Clicking the backdrop closes: a click on <dialog> itself lands outside the panel.
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });

  // Any navigation from inside the drawer should not leave it open behind the new page
  // when the browser restores from bfcache.
  for (const link of dialog.querySelectorAll('a[href]')) {
    link.addEventListener('click', () => dialog.close());
  }
};

const upgradeDownloadLinks = () => {
  const platform = detectClientPlatform(navigator.userAgent);
  if (platform === 'unknown') return;

  for (const el of document.querySelectorAll<HTMLAnchorElement>('[data-download-link]')) {
    const lang = (el.getAttribute('data-lang') ?? 'de') as Language;
    el.href = platform === 'android' ? getGooglePlayUrl() : getAppStoreUrl(lang);
    el.target = '_blank';
    el.rel = 'noopener noreferrer';
    // Read by the delegated store-CTA tracker in bootstrap.ts.
    el.setAttribute('data-store-cta', platform);
  }
};

initMenu();
upgradeDownloadLinks();
