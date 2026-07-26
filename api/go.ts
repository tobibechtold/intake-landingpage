import type { VercelRequest, VercelResponse } from "@vercel/node";
// Explicit .js extension: this function is deployed as unbundled ESM, where
// extensionless relative specifiers do not resolve at runtime.
import { isBotOrPrefetch } from "../src/lib/botDetection.js";
import { buildSmartLinkRedirect, LANDING_PAGE_URL } from "../src/lib/smartlink.js";

const POSTHOG_HOST = "https://eu.i.posthog.com";

const captureSmartlinkClick = async (
  slug: string,
  platform: string,
  country: string,
  userAgent: string,
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
        properties: {
          slug,
          platform,
          country,
          user_agent: userAgent,
          $process_person_profile: false,
        },
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

  const header = (name: string): string | undefined =>
    typeof req.headers[name] === "string" ? (req.headers[name] as string) : undefined;

  // Crawlers and speculative prefetches still get redirected (Meta's ad review
  // must be able to fetch the URL), but they must not count as clicks.
  if (
    !isBotOrPrefetch(userAgent, {
      secPurpose: header("sec-purpose"),
      xPurpose: header("x-purpose"),
      xMoz: header("x-moz"),
    })
  ) {
    const country = header("x-vercel-ip-country") ?? "unknown";
    await captureSmartlinkClick(slug, redirect.platform, country, userAgent);
  }
  res.redirect(302, redirect.url);
}
