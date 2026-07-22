# App Download & Buyer Attribution Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Track which source (landing page, Threads bio, individual UGC ad creatives) drives App Store / Google Play downloads and Intake AI subscribers — via campaign-tagged store links, a device-detecting smart-link redirect, PostHog web analytics, and Play Install Referrer capture into Supabase.

**Architecture:** A campaign slug (`tiktok-ugc1`, `threads-bio`, `website`) is the join key across all systems. The landing page appends it to store links (Apple `ct=` token / Play `referrer=`); a Vercel serverless function at `/go/<slug>` redirects ads/bio traffic to the right store carrying the same slug; the Android app reads the Play referrer once at first run and writes it to a new `user_attribution` Supabase table keyed by the anonymous auth user id (the same identity Intake AI purchases are recorded under). iOS attribution is aggregate-only via App Store Connect App Analytics — no iOS code changes.

**Tech Stack:** Vite/React/TS + vitest (landing page), Vercel serverless functions, posthog-js (EU cloud, cookieless), Supabase migrations, Kotlin + WorkManager + supabase-kt + Play Install Referrer 2.2 (Android).

**Spec:** `docs/superpowers/specs/2026-07-22-app-attribution-tracking-design.md` (in intake-landingpage repo).

## Global Constraints

- Three repos are involved. Every task states its working directory. Landing page: `/Users/xce35g6/dev/private/intake-landingpage`. Backend: `/Users/xce35g6/dev/private/intake-backend`. Android: `/Users/xce35g6/dev/private/intake-android`.
- Apple provider token (public, appears in URLs): `pt=128030281`. `ct=` values are free-form; no per-campaign setup in App Store Connect needed.
- Campaign slug format: lowercase `^[a-z0-9][a-z0-9-]{0,63}$`, convention `<source>-<creative>` (e.g. `tiktok-ugc1`). Reserved fallback slug: `website`. `utm_source` is derived as the part before the first `-`.
- Android package name: `de.bechtoldit.intake`. App Store app id: `6757768955`.
- Supabase table name: `user_attribution`, user id column: `auth_user_id` (matches `intake_ai_usage_events` convention).
- PostHog EU host: `https://eu.i.posthog.com`. Client key env var: `VITE_POSTHOG_KEY` (Vite-exposed); serverless key env var: `POSTHOG_KEY`. Same key value. PostHog runs **cookieless** (`persistence: "memory"`) — no consent banner in this milestone.
- No MMP SDK, no Meta/TikTok pixels, no consent banner — explicitly out of scope (spec §7).
- **Files under `src/lib/` that `api/go.ts` transitively imports must use relative imports between each other** (`./storeLinks`, not `@/lib/storeLinks`) — the Vercel function build does not resolve the `@` Vite alias. `import type` from `@/...` is fine (erased at compile).
- Landing page tests: `npm test` (vitest, jsdom, tests live next to sources as `*.test.ts(x)` under `src/`). Android tests: `./gradlew test` (kotlin.test on JUnit4; AGENTS.md requires the full unit test run before completion).
- Commit after every task, in the repo the task touches.

## Manual Steps (user — Tobias)

These cannot be done by the implementing agent:

1. **Create a PostHog project** on PostHog Cloud EU (https://eu.posthog.com), copy the `phc_...` project API key.
2. **Set Vercel env vars** for the landing page project (dashboard or `npx vercel env add`): `VITE_POSTHOG_KEY` and `POSTHOG_KEY` (both = the `phc_` key), all environments. Redeploy after setting them.
3. After deploy: update **Threads bio** to `https://www.getintake.de/go/threads-bio` (and Instagram bio to `/go/instagram-bio` if desired).
4. When launching ads, use one slug per creative as the ad's destination URL: `https://www.getintake.de/go/meta-ugc1`, `/go/tiktok-ugc1`, etc.
5. Verify campaigns appear in App Store Connect → App Analytics → Acquisition (24–48 h latency) and in Play Console acquisition reports.

---

## Phase A — Landing page (`/Users/xce35g6/dev/private/intake-landingpage`)

### Task 1: Attribution capture module

**Files:**
- Create: `src/lib/attribution.ts`
- Test: `src/lib/attribution.test.ts`

**Interfaces:**
- Consumes: nothing (leaf module, no imports).
- Produces: `interface StoredAttribution { source: string; medium: string; campaign: string }`, `sourceFromSlug(slug: string): string`, `captureUtmParams(search: string, storage?: Storage | null): void`, `getStoredAttribution(storage?: Storage | null): StoredAttribution | null`. Storage key `"intake_attribution"` in `sessionStorage`.

- [ ] **Step 1: Write the failing test**

`src/lib/attribution.test.ts`:

```ts
import { beforeEach, describe, expect, it } from "vitest";
import { captureUtmParams, getStoredAttribution, sourceFromSlug } from "./attribution";

describe("sourceFromSlug", () => {
  it("returns the part before the first dash", () => {
    expect(sourceFromSlug("tiktok-ugc1")).toBe("tiktok");
    expect(sourceFromSlug("threads-bio")).toBe("threads");
  });

  it("returns the slug itself when there is no dash", () => {
    expect(sourceFromSlug("website")).toBe("website");
  });
});

describe("captureUtmParams / getStoredAttribution", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  it("stores full utm params", () => {
    captureUtmParams("?utm_source=tiktok&utm_medium=smartlink&utm_campaign=tiktok-ugc1");
    expect(getStoredAttribution()).toEqual({
      source: "tiktok",
      medium: "smartlink",
      campaign: "tiktok-ugc1",
    });
  });

  it("derives source from the campaign slug when utm_source is missing", () => {
    captureUtmParams("?utm_campaign=meta-ugc2");
    expect(getStoredAttribution()).toEqual({
      source: "meta",
      medium: "website",
      campaign: "meta-ugc2",
    });
  });

  it("uses source as campaign when utm_campaign is missing", () => {
    captureUtmParams("?utm_source=newsletter");
    expect(getStoredAttribution()).toEqual({
      source: "newsletter",
      medium: "website",
      campaign: "newsletter",
    });
  });

  it("does nothing when no utm params are present", () => {
    captureUtmParams("?ref=producthunt");
    expect(getStoredAttribution()).toBeNull();
  });

  it("does not overwrite an existing attribution with a later utm-less visit", () => {
    captureUtmParams("?utm_campaign=tiktok-ugc1");
    captureUtmParams("");
    expect(getStoredAttribution()?.campaign).toBe("tiktok-ugc1");
  });

  it("returns null for corrupt stored JSON", () => {
    window.sessionStorage.setItem("intake_attribution", "{not json");
    expect(getStoredAttribution()).toBeNull();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/lib/attribution.test.ts`
Expected: FAIL — cannot resolve `./attribution`.

- [ ] **Step 3: Write the implementation**

`src/lib/attribution.ts`:

```ts
export interface StoredAttribution {
  source: string;
  medium: string;
  campaign: string;
}

const STORAGE_KEY = "intake_attribution";

export const sourceFromSlug = (slug: string): string => slug.split("-")[0] || slug;

const defaultStorage = (): Storage | null => {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    return window.sessionStorage;
  } catch {
    // Safari private mode / blocked storage can throw on access.
    return null;
  }
};

export const captureUtmParams = (
  search: string,
  storage: Storage | null = defaultStorage(),
): void => {
  if (!storage) {
    return;
  }
  const params = new URLSearchParams(search);
  const campaign = params.get("utm_campaign");
  const source = params.get("utm_source");
  if (!campaign && !source) {
    return;
  }
  const resolvedCampaign = campaign ?? source ?? "";
  const attribution: StoredAttribution = {
    campaign: resolvedCampaign,
    source: source ?? sourceFromSlug(resolvedCampaign),
    medium: params.get("utm_medium") ?? "website",
  };
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // Storage full or blocked — store links fall back to the "website" campaign.
  }
};

export const getStoredAttribution = (
  storage: Storage | null = defaultStorage(),
): StoredAttribution | null => {
  if (!storage) {
    return null;
  }
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw) as Partial<StoredAttribution>;
    if (typeof parsed.campaign !== "string" || typeof parsed.source !== "string") {
      return null;
    }
    return {
      campaign: parsed.campaign,
      source: parsed.source,
      medium: typeof parsed.medium === "string" ? parsed.medium : "website",
    };
  } catch {
    return null;
  }
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/lib/attribution.test.ts`
Expected: PASS (7 tests).

- [ ] **Step 5: Commit**

```bash
git add src/lib/attribution.ts src/lib/attribution.test.ts
git commit -m "feat: add utm attribution capture module"
```

### Task 2: Attribution-tagged store links

**Files:**
- Modify: `src/lib/storeLinks.ts` (full rewrite shown below; keeps all existing exports)
- Test: `src/lib/storeLinks.test.ts` (new)

**Interfaces:**
- Consumes: `getStoredAttribution`, `sourceFromSlug`, `StoredAttribution` from `./attribution` (Task 1).
- Produces (new exports on top of existing ones): `APP_STORE_URLS: Record<Language, string>`, `GOOGLE_PLAY_URL: string`, `APPLE_PROVIDER_TOKEN = "128030281"`, `appendAppStoreAttribution(baseUrl: string, campaign: string): string`, `appendGooglePlayAttribution(baseUrl: string, attribution: StoredAttribution): string`. Existing signatures `getAppStoreUrl(language)`, `getGooglePlayUrl()`, `getNavbarDownloadUrl(language, userAgent, fallbackUrl)`, `detectClientPlatform(userAgent)` are **unchanged** — callers (Hero/CTA/Footer/Header) need no href changes.

- [ ] **Step 1: Write the failing test**

`src/lib/storeLinks.test.ts`:

```ts
import { beforeEach, describe, expect, it } from "vitest";
import { captureUtmParams } from "./attribution";
import {
  appendGooglePlayAttribution,
  GOOGLE_PLAY_URL,
  getAppStoreUrl,
  getGooglePlayUrl,
  getNavbarDownloadUrl,
} from "./storeLinks";

const ANDROID_UA =
  "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36";

describe("store links with attribution", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  it("appends the website fallback campaign to the App Store URL", () => {
    expect(getAppStoreUrl("de")).toBe(
      "https://apps.apple.com/de/app/intake-kalorienz%C3%A4hler/id6757768955?pt=128030281&ct=website&mt=8",
    );
  });

  it("appends the stored campaign to the App Store URL", () => {
    captureUtmParams("?utm_source=tiktok&utm_medium=smartlink&utm_campaign=tiktok-ugc1");
    expect(getAppStoreUrl("en")).toBe(
      "https://apps.apple.com/us/app/intake-kalorienz%C3%A4hler/id6757768955?pt=128030281&ct=tiktok-ugc1&mt=8",
    );
  });

  it("single-encodes the Google Play referrer with the website fallback", () => {
    expect(getGooglePlayUrl()).toBe(
      "https://play.google.com/store/apps/details?id=de.bechtoldit.intake" +
        "&referrer=utm_source%3Dwebsite%26utm_medium%3Dwebsite%26utm_campaign%3Dwebsite",
    );
  });

  it("carries the stored campaign into the Play referrer", () => {
    captureUtmParams("?utm_source=tiktok&utm_medium=smartlink&utm_campaign=tiktok-ugc1");
    expect(getGooglePlayUrl()).toContain(
      "referrer=utm_source%3Dtiktok%26utm_medium%3Dsmartlink%26utm_campaign%3Dtiktok-ugc1",
    );
  });

  it("appendGooglePlayAttribution encodes exactly once", () => {
    const url = appendGooglePlayAttribution(GOOGLE_PLAY_URL, {
      source: "meta",
      medium: "smartlink",
      campaign: "meta-ugc1",
    });
    const referrer = new URL(url).searchParams.get("referrer");
    expect(referrer).toBe("utm_source=meta&utm_medium=smartlink&utm_campaign=meta-ugc1");
  });

  it("navbar link keeps platform detection and gains attribution", () => {
    expect(getNavbarDownloadUrl("de", ANDROID_UA, "/#hero")).toContain("referrer=utm_source%3D");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/lib/storeLinks.test.ts`
Expected: FAIL — `appendGooglePlayAttribution` / `GOOGLE_PLAY_URL` not exported, URLs missing params.

- [ ] **Step 3: Rewrite `src/lib/storeLinks.ts`**

```ts
import type { Language } from "@/i18n/translations";
import { getStoredAttribution, type StoredAttribution } from "./attribution";

export const APP_STORE_URLS: Record<Language, string> = {
  en: "https://apps.apple.com/us/app/intake-kalorienz%C3%A4hler/id6757768955",
  de: "https://apps.apple.com/de/app/intake-kalorienz%C3%A4hler/id6757768955",
};

export const GOOGLE_PLAY_URL = "https://play.google.com/store/apps/details?id=de.bechtoldit.intake";

// Apple App Analytics campaign provider token — public, appears in every campaign URL.
export const APPLE_PROVIDER_TOKEN = "128030281";

const WEBSITE_ATTRIBUTION: StoredAttribution = {
  source: "website",
  medium: "website",
  campaign: "website",
};

export const appendAppStoreAttribution = (baseUrl: string, campaign: string): string =>
  `${baseUrl}?pt=${APPLE_PROVIDER_TOKEN}&ct=${encodeURIComponent(campaign)}&mt=8`;

export const appendGooglePlayAttribution = (
  baseUrl: string,
  attribution: StoredAttribution,
): string => {
  const referrer = new URLSearchParams({
    utm_source: attribution.source,
    utm_medium: attribution.medium,
    utm_campaign: attribution.campaign,
  }).toString();
  return `${baseUrl}&referrer=${encodeURIComponent(referrer)}`;
};

const resolveAttribution = (): StoredAttribution => getStoredAttribution() ?? WEBSITE_ATTRIBUTION;

export const getAppStoreUrl = (language: Language): string =>
  appendAppStoreAttribution(APP_STORE_URLS[language], resolveAttribution().campaign);

export const getGooglePlayUrl = (): string =>
  appendGooglePlayAttribution(GOOGLE_PLAY_URL, resolveAttribution());

export type ClientPlatform = "ios" | "android" | "unknown";

export const detectClientPlatform = (userAgent: string): ClientPlatform => {
  if (/android/i.test(userAgent)) {
    return "android";
  }

  // iPadOS can report itself as Macintosh while still exposing a mobile Safari UA.
  if (/(iPad|iPhone|iPod)/i.test(userAgent) || (/Macintosh/i.test(userAgent) && /Mobile/i.test(userAgent))) {
    return "ios";
  }

  return "unknown";
};

export const getNavbarDownloadUrl = (
  language: Language,
  userAgent: string,
  fallbackUrl: string,
): string => {
  const platform = detectClientPlatform(userAgent);

  if (platform === "android") {
    return getGooglePlayUrl();
  }

  if (platform === "ios") {
    return getAppStoreUrl(language);
  }

  return fallbackUrl;
};
```

Note the `./attribution` relative import (Global Constraints — this module is later imported by the Vercel function).

- [ ] **Step 4: Run the full test suite**

Run: `npm test`
Expected: PASS — new storeLinks tests plus all existing component tests (none assert bare store URLs; verified during planning).

- [ ] **Step 5: Commit**

```bash
git add src/lib/storeLinks.ts src/lib/storeLinks.test.ts
git commit -m "feat: append campaign attribution to store links"
```

### Task 3: PostHog init, UTM capture wiring, CTA click events

**Files:**
- Create: `src/lib/analytics.ts`, `.env.example`
- Modify: `src/main.tsx`, `src/components/Hero.tsx`, `src/components/CTA.tsx`, `src/components/Footer.tsx`, `src/components/Header.tsx`, `package.json` (adds `posthog-js`)
- Test: `src/lib/analytics.test.ts`

**Interfaces:**
- Consumes: `captureUtmParams`, `getStoredAttribution` (Task 1).
- Produces: `initAnalytics(): void`, `trackStoreCtaClick(platform: "ios" | "android" | "unknown", location: "hero" | "cta" | "footer" | "navbar"): void`. Both are safe no-ops when `VITE_POSTHOG_KEY` is unset (tests, local dev).

- [ ] **Step 1: Install posthog-js**

Run: `npm install posthog-js`
Expected: added to `dependencies` in `package.json`.

- [ ] **Step 2: Write the failing test**

`src/lib/analytics.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { initAnalytics, trackStoreCtaClick } from "./analytics";

describe("analytics without a configured key", () => {
  it("initAnalytics is a safe no-op", () => {
    expect(() => initAnalytics()).not.toThrow();
  });

  it("trackStoreCtaClick is a safe no-op before init", () => {
    expect(() => trackStoreCtaClick("ios", "hero")).not.toThrow();
  });
});
```

Run: `npm test -- src/lib/analytics.test.ts` — Expected: FAIL (module missing).

- [ ] **Step 3: Write `src/lib/analytics.ts`**

```ts
import posthog from "posthog-js";
import { getStoredAttribution } from "./attribution";

const POSTHOG_HOST = "https://eu.i.posthog.com";

let initialized = false;

export const initAnalytics = (): void => {
  const key = import.meta.env.VITE_POSTHOG_KEY as string | undefined;
  if (!key || initialized) {
    return;
  }
  posthog.init(key, {
    api_host: POSTHOG_HOST,
    defaults: "2025-05-24",
    // Cookieless: no persistent identifiers, so no consent banner is required.
    persistence: "memory",
  });
  initialized = true;
};

export type CtaLocation = "hero" | "cta" | "footer" | "navbar";

export const trackStoreCtaClick = (
  platform: "ios" | "android" | "unknown",
  location: CtaLocation,
): void => {
  if (!initialized) {
    return;
  }
  const attribution = getStoredAttribution();
  posthog.capture("store_cta_click", {
    platform,
    location,
    campaign: attribution?.campaign ?? "website",
    source: attribution?.source ?? "website",
  });
};
```

Run: `npm test -- src/lib/analytics.test.ts` — Expected: PASS.

- [ ] **Step 4: Wire capture + init in `src/main.tsx`**

Replace the file content with:

```tsx
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { captureUtmParams } from "@/lib/attribution";
import { initAnalytics } from "@/lib/analytics";

captureUtmParams(window.location.search);
initAnalytics();

createRoot(document.getElementById("root")!).render(<App />);
```

- [ ] **Step 5: Add click tracking to the four CTA components**

In each file, import `trackStoreCtaClick` from `@/lib/analytics` and add an `onClick` to every store `<a>`:

`src/components/Hero.tsx` — App Store anchor (currently `href={getAppStoreUrl(language)}` around line 106): add `onClick={() => trackStoreCtaClick("ios", "hero")}`; Play anchor (line ~119): add `onClick={() => trackStoreCtaClick("android", "hero")}`.

`src/components/CTA.tsx` — same pattern with location `"cta"` (anchors at lines ~28 and ~41).

`src/components/Footer.tsx` — same pattern with location `"footer"` (anchors at lines ~96 and ~104).

`src/components/Header.tsx` — the download button uses `downloadHref` (computed at line 22). Add imports `detectClientPlatform` from `@/lib/storeLinks` and `trackStoreCtaClick` from `@/lib/analytics`, then below the `downloadHref` declaration add:

```tsx
const downloadPlatform = detectClientPlatform(
  typeof navigator === "undefined" ? "" : navigator.userAgent,
);
```

and add `onClick={() => trackStoreCtaClick(downloadPlatform, "navbar")}` to every element (desktop button and mobile sheet link) whose `href` is `downloadHref`.

- [ ] **Step 6: Add `.env.example`**

```
# PostHog EU project API key (public phc_ key). Leave empty to disable analytics locally.
VITE_POSTHOG_KEY=
```

- [ ] **Step 7: Verify**

Run: `npm test` — Expected: full suite PASS (Hero/Footer/Header component tests still green; `trackStoreCtaClick` no-ops without a key).
Run: `npm run build` — Expected: build + prerender succeed.

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json src/lib/analytics.ts src/lib/analytics.test.ts src/main.tsx src/components/Hero.tsx src/components/CTA.tsx src/components/Footer.tsx src/components/Header.tsx .env.example
git commit -m "feat: add PostHog analytics, utm capture, and store CTA click events"
```

### Task 4: Smart link redirect (`/go/<slug>`)

**Files:**
- Create: `src/lib/smartlink.ts`, `api/go.ts`
- Modify: `vercel.json`, `package.json` (adds dev dep `@vercel/node`)
- Test: `src/lib/smartlink.test.ts`

**Interfaces:**
- Consumes: `APP_STORE_URLS`, `GOOGLE_PLAY_URL`, `appendAppStoreAttribution`, `appendGooglePlayAttribution`, `detectClientPlatform`, `ClientPlatform` from `./storeLinks` (Task 2); `sourceFromSlug` from `./attribution` (Task 1).
- Produces: `buildSmartLinkRedirect(slug: string, userAgent: string, acceptLanguage: string): { url: string; platform: ClientPlatform } | null` (null = invalid slug), `LANDING_PAGE_URL = "https://www.getintake.de/"`, `SLUG_PATTERN`. Public URL `https://www.getintake.de/go/<slug>`.

- [ ] **Step 1: Write the failing test**

`src/lib/smartlink.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { buildSmartLinkRedirect } from "./smartlink";

const IPHONE_UA =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1";
const ANDROID_UA =
  "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36";
const DESKTOP_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

describe("buildSmartLinkRedirect", () => {
  it("sends Android users to Play with a single-encoded referrer", () => {
    const redirect = buildSmartLinkRedirect("tiktok-ugc1", ANDROID_UA, "de-DE,de;q=0.9");
    expect(redirect?.platform).toBe("android");
    expect(redirect?.url).toBe(
      "https://play.google.com/store/apps/details?id=de.bechtoldit.intake" +
        "&referrer=utm_source%3Dtiktok%26utm_medium%3Dsmartlink%26utm_campaign%3Dtiktok-ugc1",
    );
  });

  it("sends German iOS users to the DE App Store with the campaign token", () => {
    const redirect = buildSmartLinkRedirect("tiktok-ugc1", IPHONE_UA, "de-DE,de;q=0.9");
    expect(redirect?.url).toBe(
      "https://apps.apple.com/de/app/intake-kalorienz%C3%A4hler/id6757768955?pt=128030281&ct=tiktok-ugc1&mt=8",
    );
  });

  it("sends non-German iOS users to the US App Store", () => {
    const redirect = buildSmartLinkRedirect("meta-ugc2", IPHONE_UA, "en-US,en;q=0.9");
    expect(redirect?.url).toContain("https://apps.apple.com/us/");
    expect(redirect?.url).toContain("ct=meta-ugc2");
  });

  it("sends desktop users to the landing page with utm params", () => {
    const redirect = buildSmartLinkRedirect("threads-bio", DESKTOP_UA, "en-US");
    expect(redirect?.platform).toBe("unknown");
    expect(redirect?.url).toBe(
      "https://www.getintake.de/?utm_source=threads&utm_medium=smartlink&utm_campaign=threads-bio",
    );
  });

  it("rejects invalid slugs", () => {
    expect(buildSmartLinkRedirect("", IPHONE_UA, "de")).toBeNull();
    expect(buildSmartLinkRedirect("Bad_Slug!", IPHONE_UA, "de")).toBeNull();
    expect(buildSmartLinkRedirect("-leading-dash", IPHONE_UA, "de")).toBeNull();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/lib/smartlink.test.ts`
Expected: FAIL — module missing.

- [ ] **Step 3: Write `src/lib/smartlink.ts`**

```ts
import type { Language } from "@/i18n/translations";
import { sourceFromSlug } from "./attribution";
import {
  APP_STORE_URLS,
  appendAppStoreAttribution,
  appendGooglePlayAttribution,
  detectClientPlatform,
  GOOGLE_PLAY_URL,
  type ClientPlatform,
} from "./storeLinks";

export const SLUG_PATTERN = /^[a-z0-9][a-z0-9-]{0,63}$/;
export const LANDING_PAGE_URL = "https://www.getintake.de/";

export interface SmartLinkRedirect {
  url: string;
  platform: ClientPlatform;
}

const languageFromAcceptLanguage = (acceptLanguage: string): Language =>
  /^de\b/i.test(acceptLanguage.trim()) ? "de" : "en";

export const buildSmartLinkRedirect = (
  slug: string,
  userAgent: string,
  acceptLanguage: string,
): SmartLinkRedirect | null => {
  if (!SLUG_PATTERN.test(slug)) {
    return null;
  }
  const platform = detectClientPlatform(userAgent);

  if (platform === "android") {
    const attribution = { source: sourceFromSlug(slug), medium: "smartlink", campaign: slug };
    return { url: appendGooglePlayAttribution(GOOGLE_PLAY_URL, attribution), platform };
  }

  if (platform === "ios") {
    const storeUrl = APP_STORE_URLS[languageFromAcceptLanguage(acceptLanguage)];
    return { url: appendAppStoreAttribution(storeUrl, slug), platform };
  }

  const params = new URLSearchParams({
    utm_source: sourceFromSlug(slug),
    utm_medium: "smartlink",
    utm_campaign: slug,
  });
  return { url: `${LANDING_PAGE_URL}?${params.toString()}`, platform };
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/lib/smartlink.test.ts`
Expected: PASS.

- [ ] **Step 5: Add the Vercel function**

Run: `npm install -D @vercel/node`

`api/go.ts`:

```ts
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { buildSmartLinkRedirect, LANDING_PAGE_URL } from "../src/lib/smartlink";

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
```

- [ ] **Step 6: Route `/go/<slug>` to the function in `vercel.json`**

Replace the file content with:

```json
{
  "routes": [
    { "src": "^/go/([^/]+)/?$", "dest": "/api/go?slug=$1" },
    { "src": "^/go/?$", "dest": "/api/go" },
    { "handle": "filesystem" },
    { "src": "/.*", "dest": "/index.html" }
  ]
}
```

(The two `/go` routes must come before `handle: filesystem`; the SPA catch-all stays last. The `api/` directory is auto-built by Vercel regardless of `routes`.)

- [ ] **Step 7: Verify build and tests**

Run: `npm test && npm run build`
Expected: all tests PASS, build succeeds. (`api/go.ts` is compiled by Vercel at deploy time, not by Vite — local type check: `npx tsc --noEmit api/go.ts` is optional and may pull its own tsconfig; skipping it is fine.)

- [ ] **Step 8: Commit**

```bash
git add src/lib/smartlink.ts src/lib/smartlink.test.ts api/go.ts vercel.json package.json package-lock.json
git commit -m "feat: add /go smart link redirect with campaign attribution"
```

### Task 5: Deploy and end-to-end smoke test

**Files:** none (deploy + verification).

- [ ] **Step 1: Push to main**

```bash
git push origin main
```

Expected: Vercel auto-deploys (the project is Vercel-connected). Wait for the production deployment to finish (check `npx vercel ls` or the dashboard). If env vars `VITE_POSTHOG_KEY`/`POSTHOG_KEY` are not yet set (Manual Steps), the deploy still works — analytics is a no-op until they exist.

- [ ] **Step 2: Smoke-test the smart link with three user agents**

```bash
curl -sI -A "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 Chrome/126.0.0.0 Mobile Safari/537.36" https://www.getintake.de/go/test-e2e | grep -i "^location"
```
Expected: `location: https://play.google.com/store/apps/details?id=de.bechtoldit.intake&referrer=utm_source%3Dtest%26utm_medium%3Dsmartlink%26utm_campaign%3Dtest-e2e`

```bash
curl -sI -A "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 Version/17.5 Mobile/15E148 Safari/604.1" -H "Accept-Language: de-DE,de;q=0.9" https://www.getintake.de/go/test-e2e | grep -i "^location"
```
Expected: `location: https://apps.apple.com/de/app/intake-kalorienz%C3%A4hler/id6757768955?pt=128030281&ct=test-e2e&mt=8`

```bash
curl -sI -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" https://www.getintake.de/go/test-e2e | grep -i "^location"
curl -sI https://www.getintake.de/go/INVALID_slug | grep -i "^location"
```
Expected: first → `https://www.getintake.de/?utm_source=test&utm_medium=smartlink&utm_campaign=test-e2e`; second → `https://www.getintake.de/`.

- [ ] **Step 3: Verify the SPA still serves**

```bash
curl -s -o /dev/null -w "%{http_code}" https://www.getintake.de/funktionen
```
Expected: `200`.

- [ ] **Step 4: Report deploy status to the user**

Remind about Manual Steps 1–3 (PostHog project, Vercel env vars, Threads bio → `https://www.getintake.de/go/threads-bio`).

---

## Phase B — Backend (`/Users/xce35g6/dev/private/intake-backend`)

### Task 6: `user_attribution` table migration

**Files:**
- Create: `supabase/migrations/<generated-timestamp>_add_user_attribution.sql` (via `supabase migration new`)

**Interfaces:**
- Produces: table `public.user_attribution` with columns `auth_user_id uuid PK`, `platform text`, `source text`, `medium text null`, `campaign text`, `referrer_raw text null`, `installed_at timestamptz null`, `created_at timestamptz default now()`. RLS: authenticated users insert/select **their own** row; service_role full access. The Android app (Task 8) inserts exactly these columns.

- [ ] **Step 1: Create the migration**

```bash
cd /Users/xce35g6/dev/private/intake-backend
supabase migration new add_user_attribution
```

Write into the generated file:

```sql
create table public.user_attribution (
  auth_user_id uuid primary key,
  platform text not null check (platform in ('android', 'ios')),
  source text not null,
  medium text,
  campaign text not null,
  referrer_raw text,
  installed_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.user_attribution enable row level security;

revoke all on table public.user_attribution from anon;
grant select, insert on table public.user_attribution to authenticated;
grant all on table public.user_attribution to service_role;

drop policy if exists "Users insert own attribution" on public.user_attribution;
create policy "Users insert own attribution"
on public.user_attribution
as permissive
for insert
to authenticated
with check (auth.uid() = auth_user_id);

drop policy if exists "Users read own attribution" on public.user_attribution;
create policy "Users read own attribution"
on public.user_attribution
as permissive
for select
to authenticated
using (auth.uid() = auth_user_id);

drop policy if exists "Service role manages user_attribution" on public.user_attribution;
create policy "Service role manages user_attribution"
on public.user_attribution
as permissive
for all
to service_role
using (true)
with check (true);
```

(Policy style copied from `supabase/migrations/20260505020000_add_ai_review_rls_policies.sql`; column naming matches `intake_ai_usage_events`. No update/delete grants — attribution is write-once, first install wins.)

- [ ] **Step 2: Dry-run per repo AGENTS.md**

```bash
supabase db push --linked --dry-run
```
Expected: exactly one new migration listed (`..._add_user_attribution.sql`).

- [ ] **Step 3: Apply**

```bash
supabase db push --linked
```
Expected: migration applied without error.

- [ ] **Step 4: Verify RLS behaves**

In the Supabase SQL editor (or `psql`), as service role:

```sql
select column_name from information_schema.columns where table_name = 'user_attribution' order by ordinal_position;
```
Expected: the 8 columns above.

- [ ] **Step 5: Commit**

```bash
git add supabase/migrations/*_add_user_attribution.sql
git commit -m "feat: add user_attribution table for install attribution"
git push
```

---

## Phase C — Android (`/Users/xce35g6/dev/private/intake-android`)

### Task 7: Install referrer parser + preference store

**Files:**
- Create: `app/src/main/java/com/intake/android/attribution/InstallReferrerParser.kt`
- Create: `app/src/main/java/com/intake/android/attribution/InstallAttributionPreferenceStore.kt`
- Test: `app/src/test/java/com/intake/android/attribution/InstallReferrerParserTest.kt`

**Interfaces:**
- Produces: `data class InstallAttribution(source: String, medium: String?, campaign: String, referrerRaw: String)`, `fun parseInstallReferrer(referrer: String?): InstallAttribution`, `class InstallAttributionPreferenceStore(context) { fun isCaptured(): Boolean; fun markCaptured() }`.

- [ ] **Step 1: Write the failing test**

`app/src/test/java/com/intake/android/attribution/InstallReferrerParserTest.kt`:

```kotlin
package com.intake.android.attribution

import kotlin.test.Test
import kotlin.test.assertEquals

class InstallReferrerParserTest {

    @Test
    fun `parses smartlink referrer`() {
        val result = parseInstallReferrer("utm_source=tiktok&utm_medium=smartlink&utm_campaign=tiktok-ugc1")
        assertEquals("tiktok", result.source)
        assertEquals("smartlink", result.medium)
        assertEquals("tiktok-ugc1", result.campaign)
        assertEquals("utm_source=tiktok&utm_medium=smartlink&utm_campaign=tiktok-ugc1", result.referrerRaw)
    }

    @Test
    fun `parses organic play store referrer`() {
        val result = parseInstallReferrer("utm_source=google-play&utm_medium=organic")
        assertEquals("google-play", result.source)
        assertEquals("organic", result.medium)
        assertEquals("google-play", result.campaign)
    }

    @Test
    fun `treats empty referrer as organic`() {
        val result = parseInstallReferrer("")
        assertEquals("organic", result.source)
        assertEquals(null, result.medium)
        assertEquals("organic", result.campaign)
    }

    @Test
    fun `treats null referrer as organic`() {
        val result = parseInstallReferrer(null)
        assertEquals("organic", result.source)
    }

    @Test
    fun `decodes url-encoded values`() {
        val result = parseInstallReferrer("utm_source=meta&utm_campaign=meta%2Dugc1")
        assertEquals("meta-ugc1", result.campaign)
    }

    @Test
    fun `ignores malformed segments`() {
        val result = parseInstallReferrer("garbage&utm_source=threads&=broken")
        assertEquals("threads", result.source)
    }
}
```

- [ ] **Step 2: Run test to verify it fails**

Run: `./gradlew :app:testDebugUnitTest --tests "com.intake.android.attribution.InstallReferrerParserTest"`
Expected: compilation FAILURE (`parseInstallReferrer` unresolved).

- [ ] **Step 3: Write the parser**

`app/src/main/java/com/intake/android/attribution/InstallReferrerParser.kt`:

```kotlin
package com.intake.android.attribution

import java.net.URLDecoder

data class InstallAttribution(
    val source: String,
    val medium: String?,
    val campaign: String,
    val referrerRaw: String,
)

fun parseInstallReferrer(referrer: String?): InstallAttribution {
    val raw = referrer.orEmpty()
    val params = raw.split("&").mapNotNull { part ->
        val separator = part.indexOf("=")
        if (separator <= 0) return@mapNotNull null
        val key = part.substring(0, separator)
        val value = runCatching {
            URLDecoder.decode(part.substring(separator + 1), "UTF-8")
        }.getOrNull() ?: return@mapNotNull null
        key to value
    }.toMap()
    val source = params["utm_source"]?.takeIf { it.isNotBlank() } ?: "organic"
    return InstallAttribution(
        source = source,
        medium = params["utm_medium"]?.takeIf { it.isNotBlank() },
        campaign = params["utm_campaign"]?.takeIf { it.isNotBlank() } ?: source,
        referrerRaw = raw,
    )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `./gradlew :app:testDebugUnitTest --tests "com.intake.android.attribution.InstallReferrerParserTest"`
Expected: PASS (6 tests).

- [ ] **Step 5: Write the preference store**

`app/src/main/java/com/intake/android/attribution/InstallAttributionPreferenceStore.kt` (pattern copied from `com.intake.android.notifications.NotificationPreferenceStore`):

```kotlin
package com.intake.android.attribution

import android.content.Context

internal class InstallAttributionPreferenceStore(context: Context) {
    private val prefs = context.applicationContext.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)

    fun isCaptured(): Boolean = prefs.getBoolean(KEY_CAPTURED, false)

    fun markCaptured() {
        prefs.edit().putBoolean(KEY_CAPTURED, true).apply()
    }

    companion object {
        private const val PREFS_NAME = "intake_install_attribution"
        private const val KEY_CAPTURED = "captured"
    }
}
```

- [ ] **Step 6: Commit**

```bash
git add app/src/main/java/com/intake/android/attribution app/src/test/java/com/intake/android/attribution
git commit -m "feat: add install referrer parser and attribution capture flag"
```

### Task 8: Supabase attribution data source

**Files:**
- Create: `core/data/src/main/java/com/intake/core/data/attribution/SupabaseInstallReferrerDataSource.kt`
- Test: `core/data/src/test/java/com/intake/core/data/attribution/SupabaseInstallReferrerDataSourceTest.kt`

**Interfaces:**
- Consumes: `SupabaseConfig` from `com.intake.core.data.search` (defined in `SupabaseFoodSearchDataSource.kt:32-38`). Table `public.user_attribution` (Task 6).
- Produces: `class SupabaseInstallReferrerDataSource(config: SupabaseConfig) { suspend fun submitInstallAttribution(source: String, medium: String?, campaign: String, referrerRaw: String, installedAtEpochSeconds: Long?): Boolean }` plus test hook `SupabaseInstallReferrerDataSource.buildInstallAttributionPayloadForTest(...)`.
- Note: a second `createSupabaseClient` instance is the established pattern here (`SupabaseIntakeAIBackendClient` does the same); supabase-kt persists the anonymous session on-device, so all clients resolve to the same anonymous user — the identity Intake AI purchase records use.

- [ ] **Step 1: Write the failing payload test**

`core/data/src/test/java/com/intake/core/data/attribution/SupabaseInstallReferrerDataSourceTest.kt`:

```kotlin
package com.intake.core.data.attribution

import kotlinx.serialization.json.JsonPrimitive
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertTrue

class SupabaseInstallReferrerDataSourceTest {

    @Test
    fun `builds full payload`() {
        val payload = SupabaseInstallReferrerDataSource.buildInstallAttributionPayloadForTest(
            userId = "user-123",
            source = "tiktok",
            medium = "smartlink",
            campaign = "tiktok-ugc1",
            referrerRaw = "utm_source=tiktok&utm_medium=smartlink&utm_campaign=tiktok-ugc1",
            installedAtEpochSeconds = 1_753_142_400L,
        )
        assertEquals(JsonPrimitive("user-123"), payload["auth_user_id"])
        assertEquals(JsonPrimitive("android"), payload["platform"])
        assertEquals(JsonPrimitive("tiktok"), payload["source"])
        assertEquals(JsonPrimitive("smartlink"), payload["medium"])
        assertEquals(JsonPrimitive("tiktok-ugc1"), payload["campaign"])
        assertTrue(payload.containsKey("installed_at"))
    }

    @Test
    fun `omits medium and installed_at when absent`() {
        val payload = SupabaseInstallReferrerDataSource.buildInstallAttributionPayloadForTest(
            userId = "user-123",
            source = "organic",
            medium = null,
            campaign = "organic",
            referrerRaw = "",
            installedAtEpochSeconds = null,
        )
        assertFalse(payload.containsKey("medium"))
        assertFalse(payload.containsKey("installed_at"))
    }
}
```

- [ ] **Step 2: Run test to verify it fails**

Run: `./gradlew :core:data:testDebugUnitTest --tests "com.intake.core.data.attribution.SupabaseInstallReferrerDataSourceTest"`
Expected: compilation FAILURE.

- [ ] **Step 3: Write the data source**

`core/data/src/main/java/com/intake/core/data/attribution/SupabaseInstallReferrerDataSource.kt` (auth helpers mirror `SupabaseFoodSearchDataSource.kt:492-514` exactly; error handling mirrors `submitProductFeedback` at lines 406-432):

```kotlin
package com.intake.core.data.attribution

import android.util.Log
import com.intake.core.data.search.SupabaseConfig
import io.github.jan.supabase.auth.Auth
import io.github.jan.supabase.auth.auth
import io.github.jan.supabase.auth.status.SessionStatus
import io.github.jan.supabase.createSupabaseClient
import io.github.jan.supabase.postgrest.Postgrest
import io.github.jan.supabase.postgrest.from
import java.time.Instant
import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put

class SupabaseInstallReferrerDataSource(private val config: SupabaseConfig) {
    private val tag = "InstallAttribution"
    private val authMutex = Mutex()

    @Volatile
    private var anonAuthReady = false

    private val client by lazy {
        createSupabaseClient(supabaseUrl = config.url, supabaseKey = config.anonKey) {
            install(Auth)
            install(Postgrest)
        }
    }

    suspend fun submitInstallAttribution(
        source: String,
        medium: String?,
        campaign: String,
        referrerRaw: String,
        installedAtEpochSeconds: Long?,
    ): Boolean {
        if (!config.isConfigured) return false
        return try {
            ensureAnonymousAuth()
            val userId = currentUserId() ?: return false
            client.from("user_attribution").insert(
                value = buildInstallAttributionPayload(
                    userId = userId,
                    source = source,
                    medium = medium,
                    campaign = campaign,
                    referrerRaw = referrerRaw,
                    installedAtEpochSeconds = installedAtEpochSeconds,
                )
            )
            true
        } catch (error: Throwable) {
            if (error is CancellationException) return false
            val message = error.message.orEmpty()
            if (message.contains("duplicate key") || message.contains("user_attribution_pkey")) {
                // Row already exists (reinstall or retry race) — attribution is write-once.
                true
            } else {
                Log.e(tag, "Failed to submit install attribution: $message", error)
                false
            }
        }
    }

    private suspend fun ensureAnonymousAuth() {
        if (anonAuthReady) return
        authMutex.withLock {
            if (anonAuthReady) return
            when (client.auth.sessionStatus.value) {
                is SessionStatus.Authenticated -> {
                    anonAuthReady = true
                }
                else -> {
                    client.auth.signInAnonymously()
                    anonAuthReady = true
                }
            }
        }
    }

    private fun currentUserId(): String? {
        return when (val status = client.auth.sessionStatus.value) {
            is SessionStatus.Authenticated -> status.session.user?.id
            else -> null
        }
    }

    companion object {
        internal fun buildInstallAttributionPayload(
            userId: String,
            source: String,
            medium: String?,
            campaign: String,
            referrerRaw: String,
            installedAtEpochSeconds: Long?,
        ): JsonObject = buildJsonObject {
            put("auth_user_id", JsonPrimitive(userId))
            put("platform", JsonPrimitive("android"))
            put("source", JsonPrimitive(source))
            medium?.let { put("medium", JsonPrimitive(it)) }
            put("campaign", JsonPrimitive(campaign))
            put("referrer_raw", JsonPrimitive(referrerRaw))
            installedAtEpochSeconds?.let {
                put("installed_at", JsonPrimitive(Instant.ofEpochSecond(it).toString()))
            }
        }

        fun buildInstallAttributionPayloadForTest(
            userId: String,
            source: String,
            medium: String?,
            campaign: String,
            referrerRaw: String,
            installedAtEpochSeconds: Long?,
        ): JsonObject = buildInstallAttributionPayload(
            userId = userId,
            source = source,
            medium = medium,
            campaign = campaign,
            referrerRaw = referrerRaw,
            installedAtEpochSeconds = installedAtEpochSeconds,
        )
    }
}
```

Important: check the exact supabase-kt import paths against `SupabaseFoodSearchDataSource.kt` (top of file) and match them — the `Auth`/`SessionStatus` package paths differ between supabase-kt 2.x and 3.x, and this project pins 3.2.6.

- [ ] **Step 4: Run test to verify it passes**

Run: `./gradlew :core:data:testDebugUnitTest --tests "com.intake.core.data.attribution.SupabaseInstallReferrerDataSourceTest"`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add core/data/src/main/java/com/intake/core/data/attribution core/data/src/test/java/com/intake/core/data/attribution
git commit -m "feat: add Supabase install attribution data source"
```

### Task 9: Install referrer worker + scheduling

**Files:**
- Modify: `gradle/libs.versions.toml`, `app/build.gradle.kts`
- Create: `app/src/main/java/com/intake/android/attribution/InstallReferrerWorker.kt`
- Create: `app/src/main/java/com/intake/android/attribution/InstallAttributionScheduler.kt`
- Modify: `app/src/main/java/com/intake/android/IntakeApplication.kt` (note: file lives at this path but declares `package de.bechtoldit.intake`)

**Interfaces:**
- Consumes: `parseInstallReferrer`, `InstallAttributionPreferenceStore` (Task 7); `SupabaseInstallReferrerDataSource` (Task 8); `SupabaseConfig` from `com.intake.core.data.search`; `de.bechtoldit.intake.BuildConfig.SUPABASE_URL/SUPABASE_ANON_KEY` (same pattern as `BackupWorker.kt:26-29`).
- Produces: `object InstallAttributionScheduler { fun ensureScheduled(context: Context) }` — one-shot WorkManager job, called from `IntakeApplication.onCreate()`. Behavior note: existing installs get recorded once as `organic` (full-user-base coverage is intended); referrer data is only available ~90 days post-install, older installs read as organic too.

- [ ] **Step 1: Add the Install Referrer dependency**

`gradle/libs.versions.toml` — under `[versions]`:

```toml
installReferrer = "2.2"
```

under `[libraries]`:

```toml
install-referrer = { group = "com.android.installreferrer", name = "installreferrer", version.ref = "installReferrer" }
```

`app/build.gradle.kts` — in the `dependencies` block (next to the other `implementation(libs.*)` lines):

```kotlin
implementation(libs.install.referrer)
```

Run: `./gradlew :app:dependencies --configuration debugRuntimeClasspath | grep installreferrer`
Expected: `com.android.installreferrer:installreferrer:2.2` resolves.

- [ ] **Step 2: Write the worker**

`app/src/main/java/com/intake/android/attribution/InstallReferrerWorker.kt`:

```kotlin
package com.intake.android.attribution

import android.content.Context
import androidx.work.CoroutineWorker
import androidx.work.WorkerParameters
import com.android.installreferrer.api.InstallReferrerClient
import com.android.installreferrer.api.InstallReferrerStateListener
import com.android.installreferrer.api.ReferrerDetails
import com.intake.core.data.attribution.SupabaseInstallReferrerDataSource
import com.intake.core.data.search.SupabaseConfig
import kotlin.coroutines.resume
import kotlinx.coroutines.suspendCancellableCoroutine

internal sealed interface ReferrerFetchResult {
    data class Available(val details: ReferrerDetails) : ReferrerFetchResult
    data object Unsupported : ReferrerFetchResult
    data object TransientFailure : ReferrerFetchResult
}

class InstallReferrerWorker(
    context: Context,
    params: WorkerParameters,
) : CoroutineWorker(context, params) {

    override suspend fun doWork(): Result {
        val prefs = InstallAttributionPreferenceStore(applicationContext)
        if (prefs.isCaptured()) return Result.success()

        val details = when (val fetch = fetchReferrerDetails(applicationContext)) {
            is ReferrerFetchResult.Available -> fetch.details
            ReferrerFetchResult.Unsupported -> {
                // Old Play Store, sideload, or emulator — there is nothing to capture, ever.
                prefs.markCaptured()
                return Result.success()
            }
            ReferrerFetchResult.TransientFailure -> {
                return if (runAttemptCount >= MAX_ATTEMPTS) Result.failure() else Result.retry()
            }
        }

        val attribution = parseInstallReferrer(details.installReferrer)
        val dataSource = SupabaseInstallReferrerDataSource(
            SupabaseConfig(
                url = de.bechtoldit.intake.BuildConfig.SUPABASE_URL,
                anonKey = de.bechtoldit.intake.BuildConfig.SUPABASE_ANON_KEY,
            )
        )
        val uploaded = dataSource.submitInstallAttribution(
            source = attribution.source,
            medium = attribution.medium,
            campaign = attribution.campaign,
            referrerRaw = attribution.referrerRaw,
            installedAtEpochSeconds = details.installBeginTimestampSeconds.takeIf { it > 0 },
        )
        return when {
            uploaded -> {
                prefs.markCaptured()
                Result.success()
            }
            runAttemptCount >= MAX_ATTEMPTS -> Result.failure()
            else -> Result.retry()
        }
    }

    private suspend fun fetchReferrerDetails(context: Context): ReferrerFetchResult =
        suspendCancellableCoroutine { continuation ->
            val client = InstallReferrerClient.newBuilder(context).build()
            continuation.invokeOnCancellation { runCatching { client.endConnection() } }
            client.startConnection(object : InstallReferrerStateListener {
                override fun onInstallReferrerSetupFinished(responseCode: Int) {
                    val result = when (responseCode) {
                        InstallReferrerClient.InstallReferrerResponse.OK ->
                            runCatching { client.installReferrer }.getOrNull()
                                ?.let { ReferrerFetchResult.Available(it) }
                                ?: ReferrerFetchResult.TransientFailure
                        InstallReferrerClient.InstallReferrerResponse.FEATURE_NOT_SUPPORTED,
                        InstallReferrerClient.InstallReferrerResponse.DEVELOPER_ERROR,
                        InstallReferrerClient.InstallReferrerResponse.PERMISSION_ERROR ->
                            ReferrerFetchResult.Unsupported
                        else -> ReferrerFetchResult.TransientFailure
                    }
                    runCatching { client.endConnection() }
                    if (continuation.isActive) continuation.resume(result)
                }

                override fun onInstallReferrerServiceDisconnected() {
                    if (continuation.isActive) continuation.resume(ReferrerFetchResult.TransientFailure)
                }
            })
        }

    companion object {
        private const val MAX_ATTEMPTS = 5
    }
}
```

(If `PERMISSION_ERROR` is not a constant in installreferrer 2.2, drop that line — check `InstallReferrerClient.InstallReferrerResponse` members when compiling.)

- [ ] **Step 3: Write the scheduler**

`app/src/main/java/com/intake/android/attribution/InstallAttributionScheduler.kt` (pattern mirrors `com.intake.android.backup.BackupScheduler`):

```kotlin
package com.intake.android.attribution

import android.content.Context
import androidx.work.BackoffPolicy
import androidx.work.Constraints
import androidx.work.ExistingWorkPolicy
import androidx.work.NetworkType
import androidx.work.OneTimeWorkRequestBuilder
import androidx.work.WorkManager
import java.util.concurrent.TimeUnit

object InstallAttributionScheduler {
    private const val UNIQUE_WORK = "install_attribution_capture"

    fun ensureScheduled(context: Context) {
        if (InstallAttributionPreferenceStore(context).isCaptured()) return
        val request = OneTimeWorkRequestBuilder<InstallReferrerWorker>()
            .setConstraints(
                Constraints.Builder().setRequiredNetworkType(NetworkType.CONNECTED).build()
            )
            .setBackoffCriteria(BackoffPolicy.EXPONENTIAL, 30, TimeUnit.SECONDS)
            .build()
        WorkManager.getInstance(context)
            .enqueueUniqueWork(UNIQUE_WORK, ExistingWorkPolicy.KEEP, request)
    }
}
```

- [ ] **Step 4: Trigger from the Application class**

`app/src/main/java/com/intake/android/IntakeApplication.kt` — add the import and one line in `onCreate()`:

```kotlin
import com.intake.android.attribution.InstallAttributionScheduler
```

```kotlin
    override fun onCreate() {
        super.onCreate()

        WidgetStateMutationHooks.install {
            IntakeWidgetRefreshCoordinator.requestRefresh(applicationContext)
        }
        IntakeWidgetRefreshCoordinator.requestRefresh(applicationContext)
        InstallAttributionScheduler.ensureScheduled(applicationContext)
    }
```

- [ ] **Step 5: Build and run the full unit test suite (required by repo AGENTS.md)**

Run: `./gradlew :app:assembleDebug` — Expected: BUILD SUCCESSFUL.
Run: `./gradlew test` — Expected: all module unit tests PASS (note: `:core:data` suite is large and capped at 1 fork; allow time).

- [ ] **Step 6: Commit**

```bash
git add gradle/libs.versions.toml app/build.gradle.kts app/src/main/java/com/intake/android/attribution app/src/main/java/com/intake/android/IntakeApplication.kt
git commit -m "feat: capture Play install referrer and upload attribution to Supabase"
```

---

## Verification (end-to-end)

1. **Landing page:** `npm test && npm run build` green; after deploy, the three-UA curl matrix in Task 5 returns the expected `location` headers; clicking a store badge on getintake.de (visited via `?utm_campaign=test-web`) opens the store with `ct=test-web` / `referrer=...test-web`.
2. **PostHog** (after user sets keys): `smartlink_click` events appear for `/go/...` hits; `store_cta_click` events appear with `campaign`/`source`/`location` properties; `$pageview` events carry UTM params for funnel building.
3. **Android:** install a build from Play internal testing after clicking `https://play.google.com/store/apps/details?id=de.bechtoldit.intake&referrer=utm_source%3Dtest%26utm_campaign%3Dtest-android` on the device → after first launch with network, `select * from user_attribution` in Supabase shows a row with `campaign = 'test-android'`. An existing-device upgrade records `source = 'organic'` once.
4. **iOS:** open `https://www.getintake.de/go/test-e2e` on an iPhone, confirm the App Store opens; within 24–48 h the campaign `test-e2e` appears in App Store Connect → App Analytics → Acquisition.
5. **Buyer report (the actual goal):** once data flows, Android buyers per campaign via Supabase SQL — `user_attribution` joined against `intake_ai_usage_events` (`entitlement_source = 'subscription'`) on `auth_user_id`; iOS revenue per campaign read directly from App Store Connect campaign proceeds.
