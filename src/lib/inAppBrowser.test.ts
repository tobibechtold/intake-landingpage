import { describe, expect, it } from "vitest";
import { blocksAppStoreHandoff } from "./inAppBrowser";

const INSTAGRAM_IOS_UA =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 26_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) " +
  "Mobile/23G71 Instagram 440.0.0.30.81 (iPhone17,5; iOS 26_6; de_DE; de; scale=3.00; 1170x2532; " +
  "IABMV/1; 1025609183) NW/3 Safari/604.1";
const FACEBOOK_IOS_UA =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 26_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) " +
  "Mobile/23G71 [FBAN/FBIOS;FBDV/iPhone17,5;FBSV/26.6;FBLC/de_DE]";
const SAFARI_IOS_UA =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 26_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) " +
  "Version/26.0 Mobile/15E148 Safari/604.1";

describe("blocksAppStoreHandoff", () => {
  it("detects the Instagram in-app browser", () => {
    expect(blocksAppStoreHandoff(INSTAGRAM_IOS_UA)).toBe(true);
  });

  // Facebook's in-app browser completes the App Store handoff normally — verified
  // on device with the same link that fails in Instagram. Sending it the
  // interstitial would cost a tap for nothing.
  it("leaves the Facebook in-app browser on the fast redirect", () => {
    expect(blocksAppStoreHandoff(FACEBOOK_IOS_UA)).toBe(false);
  });

  it("leaves ordinary Safari on the fast redirect", () => {
    expect(blocksAppStoreHandoff(SAFARI_IOS_UA)).toBe(false);
  });

  it("treats an empty user agent as unaffected", () => {
    expect(blocksAppStoreHandoff("")).toBe(false);
  });

  // "Instagram" must match as a word, so an unrelated UA mentioning it in a
  // longer token does not get the interstitial.
  it("does not match a substring inside another token", () => {
    expect(blocksAppStoreHandoff("Mozilla/5.0 InstagramBotChecker/2.1")).toBe(false);
  });
});
