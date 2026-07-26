export interface PrefetchHeaders {
  secPurpose?: string;
  xPurpose?: string;
  xMoz?: string;
}

// Ad platforms re-scan destination URLs continuously (Meta review, Bytespider,
// link-safety scanners), and in-app browsers speculatively prefetch ad links.
// None of these are human clicks and must not reach analytics.
const BOT_UA_PATTERN =
  /bot|crawler|spider|crawl|scanner|scraper|preview|headless|slurp|curl|wget|python|httpclient|okhttp|axios|go-http|node-fetch|java\/|libwww|facebookexternalhit|meta-externalagent|whatsapp|telegram|skype|slack|discord|pinterest|vkshare|snapchat/i;

const PREFETCH_PATTERN = /prefetch|prerender|preview/i;

export const isBotOrPrefetch = (userAgent: string, prefetch: PrefetchHeaders = {}): boolean => {
  if (!userAgent.trim()) {
    return true;
  }
  if (BOT_UA_PATTERN.test(userAgent)) {
    return true;
  }
  return [prefetch.secPurpose, prefetch.xPurpose, prefetch.xMoz].some(
    (value) => typeof value === "string" && PREFETCH_PATTERN.test(value),
  );
};
