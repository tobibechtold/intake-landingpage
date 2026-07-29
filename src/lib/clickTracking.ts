import { createHash } from "node:crypto";
// Explicit .js extensions: this module is part of the /go function's unbundled
// ESM graph, where extensionless relative specifiers do not resolve at runtime.
import { classifyBot, type BotReason, type PrefetchHeaders } from "./botDetection.js";
import { detectClientPlatform, type ClientPlatform } from "./storeLinks.js";

export interface ClickRow {
  slug: string;
  platform: ClientPlatform;
  country: string | null;
  user_agent: string;
  visitor_hash: string | null;
  click_id: string | null;
  query_params: Record<string, string> | null;
  is_bot: boolean;
  bot_reason: BotReason | null;
  bot_detail: string | null;
}

export interface ClickInput {
  slug: string;
  userAgent: string;
  country?: string;
  ip?: string;
  prefetch?: PrefetchHeaders;
  query?: Record<string, string | string[] | undefined>;
  now: Date;
  secret?: string;
}

// Meta appends fbclid and TikTok appends ttclid to outbound ad clicks. Each is
// unique per click, which makes it a far sharper dedup key than the IP hash.
const CLICK_ID_KEYS = ["fbclid", "ttclid", "gclid"] as const;

// The slug arrives as a query param from the /go/<slug> rewrite, not from the
// ad platform, so it must not be stored as campaign metadata.
const RESERVED_QUERY_KEYS = new Set(["slug"]);

const firstValue = (value: string | string[] | undefined): string | undefined =>
  Array.isArray(value) ? value[0] : value;

const dayKey = (now: Date): string => now.toISOString().slice(0, 10);

const hashVisitor = (
  ip: string | undefined,
  userAgent: string,
  now: Date,
  secret: string | undefined,
): string | null => {
  if (!ip || !secret) {
    return null;
  }
  return createHash("sha256")
    .update(`${ip}|${userAgent}|${dayKey(now)}|${secret}`)
    .digest("hex");
};

const extractClickId = (query: Record<string, string | string[] | undefined>): string | null => {
  for (const key of CLICK_ID_KEYS) {
    const value = firstValue(query[key])?.trim();
    if (value) {
      return value;
    }
  }
  return null;
};

const extractQueryParams = (
  query: Record<string, string | string[] | undefined>,
): Record<string, string> | null => {
  const params: Record<string, string> = {};
  for (const [key, raw] of Object.entries(query)) {
    if (RESERVED_QUERY_KEYS.has(key)) {
      continue;
    }
    const value = firstValue(raw);
    if (typeof value === "string" && value.length > 0) {
      params[key] = value;
    }
  }
  return Object.keys(params).length > 0 ? params : null;
};

export const buildClickRow = (input: ClickInput): ClickRow => {
  const query = input.query ?? {};
  const classification = classifyBot(input.userAgent, input.prefetch ?? {});
  const clickId = extractClickId(query);

  // A prefetch header means "not a click", full stop — carrying a platform
  // click id does not redeem it.
  //
  // An earlier version of this file overrode the prefetch rule whenever a
  // ttclid or fbclid was present, on the theory that TikTok's in-app browser
  // sends a preview header on the genuine navigation. That was inferred from
  // six rows (10 distinct ttclids against 8 TikTok-reported clicks) and it was
  // wrong. Measured over the first 10.8 hours of real traffic: 1,764 of 1,996
  // counted hits carried `x-moz=prefetch`, against 239 plain clicks — a 7:1
  // ratio the other way. The override implied a CPC of €0.009; excluding
  // prefetches gives €0.075, which is the plausible figure.
  //
  // Prefetchers mint a fresh click id per request, so a click id proves only
  // that the ad platform issued the URL, never that a person tapped it.
  return {
    slug: input.slug,
    platform: detectClientPlatform(input.userAgent),
    country: input.country?.trim() ? input.country.trim() : null,
    user_agent: input.userAgent,
    visitor_hash: hashVisitor(input.ip, input.userAgent, input.now, input.secret),
    click_id: clickId,
    query_params: extractQueryParams(query),
    is_bot: classification !== null,
    bot_reason: classification?.reason ?? null,
    // Which rule fired and on what input. Kept so a future shift in this ratio
    // is answerable from the stored rows rather than by re-deriving it against
    // ad-platform dashboards, which is what this correction took.
    bot_detail: classification?.detail ?? null,
  };
};
