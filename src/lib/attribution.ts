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
