import type { VercelRequest, VercelResponse } from "@vercel/node";
import { waitUntil } from "@vercel/functions";
// Explicit .js extension: this function is deployed as unbundled ESM, where
// extensionless relative specifiers do not resolve at runtime.
import { buildClickRow, type ClickInput } from "../src/lib/clickTracking.js";
import { buildSmartLinkRedirect, LANDING_PAGE_URL } from "../src/lib/smartlink.js";

const recordClick = async (input: ClickInput): Promise<void> => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    return;
  }
  try {
    const row = buildClickRow(input);
    const response = await fetch(`${supabaseUrl}/rest/v1/smartlink_clicks`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        apikey: serviceKey,
        authorization: `Bearer ${serviceKey}`,
        prefer: "return=minimal",
      },
      body: JSON.stringify(row),
      signal: AbortSignal.timeout(2000),
    });
    if (!response.ok) {
      const body = await response.text().catch(() => "(unreadable)");
      const truncated = body.length > 200 ? body.slice(0, 200) + "..." : body;
      console.error(`Supabase insert failed: ${response.status} ${truncated}`);
    }
  } catch (error) {
    // Network errors, timeout, or other issues; analytics must never break the redirect.
    console.error(`Supabase insert error: ${error instanceof Error ? error.message : String(error)}`);
  }
};

export default function handler(req: VercelRequest, res: VercelResponse): void {
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

  // The insert is never awaited — the redirect is sent immediately.
  waitUntil(recordClick(input));
  res.redirect(302, redirect.url);
}
