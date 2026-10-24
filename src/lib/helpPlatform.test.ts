import { runInNewContext } from 'node:vm';
import { describe, expect, it } from 'vitest';
import {
  HELP_PLATFORM_SCRIPT,
  HELP_PLATFORM_STORAGE_KEY,
  platformOnlyNote,
  resolveHelpPlatform,
} from './helpPlatform';

const IPHONE = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15';
const ANDROID = 'Mozilla/5.0 (Linux; Android 15; Pixel 9) AppleWebKit/537.36 Mobile Safari/537.36';
const DESKTOP = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15';
const resolve = (search: string, stored: string | null, userAgent: string) =>
  resolveHelpPlatform({ query: new URLSearchParams(search), stored, userAgent });

describe('resolveHelpPlatform', () => {
  it('hides the switch for an app link', () => {
    expect(resolve('?platform=android&source=app', null, IPHONE)).toEqual({ platform: 'android', hideSwitch: true });
  });
  it('keeps the switch for a mailed link opened on another platform', () => {
    expect(resolve('?platform=ios', null, ANDROID)).toEqual({ platform: 'ios', hideSwitch: false });
  });
  it('uses the stored choice without a query', () => {
    expect(resolve('', 'android', IPHONE).platform).toBe('android');
  });
  it('falls back to the user agent', () => {
    expect(resolve('', null, IPHONE).platform).toBe('ios');
    expect(resolve('', null, ANDROID).platform).toBe('android');
    expect(resolve('', null, DESKTOP).platform).toBe('ios');
  });
  it('falls through an invalid query value to stored, then the user agent', () => {
    expect(resolve('?platform=windows&source=app', 'android', IPHONE)).toEqual({ platform: 'android', hideSwitch: false });
    expect(resolve('?platform=windows', 'nope', ANDROID).platform).toBe('android');
  });
});

describe('HELP_PLATFORM_SCRIPT', () => {
  const run = (search: string, stored: string | null, userAgent: string, throwing = false) => {
    const dataset: Record<string, string> = {};
    runInNewContext(HELP_PLATFORM_SCRIPT, {
      URLSearchParams,
      location: { search },
      navigator: { userAgent },
      localStorage: {
        getItem: (key: string) => {
          if (throwing) throw new Error('blocked');
          return key === HELP_PLATFORM_STORAGE_KEY ? stored : null;
        },
      },
      document: { documentElement: { dataset } },
    });
    return dataset;
  };
  it('stays under 1 KB', () => {
    expect(Buffer.byteLength(HELP_PLATFORM_SCRIPT)).toBeLessThan(1024);
  });
  it('sets the platform and the switch flag', () => {
    expect(run('?platform=android&source=app', null, IPHONE)).toEqual({ helpPlatform: 'android', helpSwitch: 'hidden' });
    expect(run('', 'android', IPHONE)).toEqual({ helpPlatform: 'android' });
  });
  it('survives blocked storage', () => {
    expect(run('', null, ANDROID, true)).toEqual({ helpPlatform: 'android' });
  });
});

describe('platformOnlyNote', () => {
  it('uses the default copy', () => {
    expect(platformOnlyNote('de', 'ios')).toBe('Nur auf dem iPhone');
    expect(platformOnlyNote('de', 'android')).toBe('Nur auf Android');
    expect(platformOnlyNote('en', 'ios')).toBe('Only on iPhone');
    expect(platformOnlyNote('en', 'android')).toBe('Only on Android');
  });
  it('prefers the override', () => {
    expect(platformOnlyNote('en', 'ios', 'Only on iPad')).toBe('Only on iPad');
  });
});
