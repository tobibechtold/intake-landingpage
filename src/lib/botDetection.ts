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

export type BotReason = "empty-ua" | "ua" | "prefetch";

export interface BotClassification {
  reason: BotReason;
  // Which rule fired and on what input, so an over-broad heuristic can be
  // diagnosed from the stored rows instead of by cross-referencing ad-platform
  // dashboards. Kept short — this is a diagnostic, not a log.
  detail: string;
}

const DETAIL_MAX_LENGTH = 200;

// Header names as they arrive on the wire, so `detail` names the real header
// rather than our camelCase field.
const PREFETCH_HEADER_NAMES: ReadonlyArray<[keyof PrefetchHeaders, string]> = [
  ["secPurpose", "sec-purpose"],
  ["xPurpose", "x-purpose"],
  ["xMoz", "x-moz"],
];

const truncate = (value: string): string =>
  value.length > DETAIL_MAX_LENGTH ? `${value.slice(0, DETAIL_MAX_LENGTH)}…` : value;

export const classifyBot = (
  userAgent: string,
  prefetch: PrefetchHeaders = {},
): BotClassification | null => {
  if (!userAgent.trim()) {
    return { reason: "empty-ua", detail: "empty user-agent" };
  }
  const uaMatch = BOT_UA_PATTERN.exec(userAgent);
  if (uaMatch) {
    return { reason: "ua", detail: truncate(`user-agent~${uaMatch[0].toLowerCase()}`) };
  }
  for (const [field, headerName] of PREFETCH_HEADER_NAMES) {
    const value = prefetch[field];
    if (typeof value === "string" && PREFETCH_PATTERN.test(value)) {
      return { reason: "prefetch", detail: truncate(`${headerName}=${value}`) };
    }
  }
  return null;
};

export const classifyBotReason = (
  userAgent: string,
  prefetch: PrefetchHeaders = {},
): BotReason | null => classifyBot(userAgent, prefetch)?.reason ?? null;

export const isBotOrPrefetch = (userAgent: string, prefetch: PrefetchHeaders = {}): boolean =>
  classifyBot(userAgent, prefetch) !== null;
