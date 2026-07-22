import type { VercelRequest, VercelResponse } from "@vercel/node";
// Explicit .js extension: this function is deployed as unbundled ESM, where
// extensionless relative specifiers do not resolve at runtime.
import { buildSmartLinkRedirect, LANDING_PAGE_URL } from "../src/lib/smartlink.js";

const POSTHOG_HOST = "https://eu.i.posthog.com";

const captureSmartlinkClick = async (
  slug: string,
  platform: string,
  country: string,
): Promise<void> => {
  const key = process.env.POSTHOG_KEY;
  if (!key) {
    return;
  }
  try {
    await fetch(`${POSTHOG_HOST}/capture/`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        api_key: key,
        event: "smartlink_click",
        distinct_id: crypto.randomUUID(),
        properties: { slug, platform, country, $process_person_profile: false },
      }),
      signal: AbortSignal.timeout(800),
    });
  } catch {
    // Analytics must never break or noticeably delay the redirect.
  }
};

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

  const country =
    typeof req.headers["x-vercel-ip-country"] === "string"
      ? req.headers["x-vercel-ip-country"]
      : "unknown";
  await captureSmartlinkClick(slug, redirect.platform, country);
  res.redirect(302, redirect.url);
}
