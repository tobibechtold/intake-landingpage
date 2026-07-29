import { createHash } from "node:crypto";
// Explicit .js extensions: this module is part of the /go function's unbundled
// ESM graph, where extensionless relative specifiers do not resolve at runtime.
import { classifyBotReason, type BotReason, type PrefetchHeaders } from "./botDetection.js";
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
  const botReason = classifyBotReason(input.userAgent, input.prefetch ?? {});

  return {
    slug: input.slug,
    platform: detectClientPlatform(input.userAgent),
    country: input.country?.trim() ? input.country.trim() : null,
    user_agent: input.userAgent,
    visitor_hash: hashVisitor(input.ip, input.userAgent, input.now, input.secret),
    click_id: extractClickId(query),
    query_params: extractQueryParams(query),
    is_bot: botReason !== null,
    bot_reason: botReason,
  };
};
