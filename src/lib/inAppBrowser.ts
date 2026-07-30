/**
 * Instagram's in-app browser intercepts App Store destinations and drops them.
 *
 * Established on two iPhones (iOS 26.6, Instagram 440.x, UA token `IABMV/1`):
 * every route to the store fails there — `apps.apple.com` in any form, the
 * legacy `itunes.apple.com` host, the `itms-apps://` scheme, `window.open`, and
 * `x-safari-https://` — including Apple's own canonical link for unrelated apps
 * such as WhatsApp. Nothing else is blocked: ordinary navigation, `tel:`,
 * `sms:`, the clipboard and universal links into other apps all work, and the
 * identical link succeeds in Facebook's in-app browser. So this is a deliberate
 * filter on App Store URLs, not a webview limitation, and no redirect we can
 * emit will get through it.
 *
 * Deliberately narrow. `FBAN`/`FBAV` (Facebook) is excluded because that
 * browser completes the handoff, and Threads is excluded because it has not
 * been tested. Anything matched here loses the fast 302 and pays an extra tap,
 * so a false positive has a real cost.
 *
 * Note the Instagram UA carries no `FBAN`/`FBAV` token at all, despite being a
 * Meta app — matching on those would miss it entirely.
 */
const INSTAGRAM_UA_PATTERN = /\bInstagram\b(?![A-Za-z])/;

export const blocksAppStoreHandoff = (userAgent: string): boolean =>
  INSTAGRAM_UA_PATTERN.test(userAgent);
