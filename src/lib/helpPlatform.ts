import type { Language } from '@/i18n/translations';

/** localStorage key holding the platform the reader picked last. */
export const HELP_PLATFORM_STORAGE_KEY = 'intake.help.platform';

export type HelpPlatformChoice = 'ios' | 'android';

export interface HelpPlatformInput {
  query: URLSearchParams;
  stored: string | null;
  userAgent: string;
}

/**
 * Which platform a help page shows first.
 * Order: ?platform=, then the stored choice, then the user agent (Android, otherwise iPhone).
 * Only an app link (valid ?platform plus source=app) hides the switch; a mailed
 * ?platform=ios opened on Android keeps it so the reader can change.
 *
 * Self-contained on purpose: HELP_PLATFORM_SCRIPT inlines this function's source into the
 * page head, so it must not reference anything outside its own body.
 */
export function resolveHelpPlatform(input: HelpPlatformInput): { platform: HelpPlatformChoice; hideSwitch: boolean } {
  const valid = (value: string | null | undefined) => (value === 'ios' || value === 'android' ? value : null);
  const fromQuery = valid(input.query.get('platform'));
  const platform =
    fromQuery ?? valid(input.stored) ?? (/android/i.test(input.userAgent) ? 'android' : 'ios');
  return { platform, hideSwitch: fromQuery !== null && input.query.get('source') === 'app' };
}

/**
 * Inline head script: runs before first paint so the page never flashes the wrong platform.
 * Without JavaScript the attribute is absent and both platforms show.
 */
export const HELP_PLATFORM_SCRIPT = `(function(){var r=${resolveHelpPlatform.toString()};var s=null;try{s=localStorage.getItem(${JSON.stringify(
  HELP_PLATFORM_STORAGE_KEY,
)})}catch(e){}var x=r({query:new URLSearchParams(location.search),stored:s,userAgent:navigator.userAgent});var d=document.documentElement;d.dataset.helpPlatform=x.platform;if(x.hideSwitch)d.dataset.helpSwitch="hidden"})()`;

const PLATFORM_ONLY_NOTE: Record<Language, Record<HelpPlatformChoice, string>> = {
  de: { ios: 'Nur auf dem iPhone', android: 'Nur auf Android' },
  en: { ios: 'Only on iPhone', android: 'Only on Android' },
};

/** Note shown on a one-platform topic: the entry's platformNote, else the default copy. */
export const platformOnlyNote = (lang: Language, platform: HelpPlatformChoice, override?: string): string =>
  override ?? PLATFORM_ONLY_NOTE[lang][platform];
