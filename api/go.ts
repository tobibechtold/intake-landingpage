import type { VercelRequest, VercelResponse } from "@vercel/node";
// Explicit .js extensions: this function is deployed as unbundled ESM, where
// extensionless relative specifiers do not resolve at runtime.
import type { ClickInput } from "../src/lib/clickTracking.js";
import { deferOrAwait, recordClick } from "../src/lib/clickWriter.js";
import { buildSmartLinkRedirect, LANDING_PAGE_URL } from "../src/lib/smartlink.js";

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  const slug = (typeof req.query.slug === "string" ? req.query.slug : "").toLowerCase();
  const userAgent = typeof req.headers["user-agent"] === "string" ? req.headers["user-agent"] : "";
  const acceptLanguage =
    typeof req.headers["accept-language"] === "string" ? req.headers["accept-language"] : "";

  const redirect = buildSmartLinkRedirect(slug, userAgent, acceptLanguage);
  res.setHeader("cache-control", "no-store");

  if (!redirect) {
    res.redirect(302, LANDING_PAGE_URL);
    return;
  }

  const header = (name: string): string | undefined =>
    typeof req.headers[name] === "string" ? (req.headers[name] as string) : undefined;

  // Crawlers and prefetches are stored with is_bot set rather than dropped, so
  // the history can be re-filtered when the heuristic improves.
  const input: ClickInput = {
    slug,
    userAgent,
    country: header("x-vercel-ip-country"),
    ip: header("x-real-ip") ?? header("x-forwarded-for")?.split(",")[0]?.trim(),
    prefetch: {
      secPurpose: header("sec-purpose"),
      xPurpose: header("x-purpose"),
      xMoz: header("x-moz"),
    },
    query: req.query as Record<string, string | string[] | undefined>,
    now: new Date(),
    secret: process.env.SMARTLINK_HASH_SECRET,
  };

  // With a platform request context the insert is deferred and the redirect is
  // sent immediately; without one it is awaited instead — bounded by the
  // insert's own 2s timeout — because a promise left in flight after the
  // response is sent is not guaranteed to run. deferOrAwait never rejects, so
  // the redirect below is reached either way.
  await deferOrAwait(() => recordClick(input));
  res.redirect(302, redirect.url);
}
