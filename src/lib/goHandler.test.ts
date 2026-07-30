// Tests for the /go/<slug> Vercel function. The test file lives under src/
// rather than next to api/go.ts on purpose: anything inside api/ is deployed as
// a route, and vitest only collects src/**/*.test.ts.
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import handler from "../../api/go.js";
import { LANDING_PAGE_URL } from "./smartlink";

const REQUEST_CONTEXT_SYMBOL = Symbol.for("@vercel/request-context");

type GlobalWithContext = Record<symbol, unknown>;

const globalWithContext = globalThis as unknown as GlobalWithContext;

const ANDROID_UA =
  "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Mobile Safari/537.36";
const INSTAGRAM_IOS_UA =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 26_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) " +
  "Mobile/23G71 Instagram 440.0.0.30.81 (iPhone17,5; iOS 26_6; de_DE; de; IABMV/1) NW/3 Safari/604.1";
const INSTAGRAM_ANDROID_UA =
  "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 " +
  "Mobile Safari/537.36 Instagram 440.0.0.30.81 Android";
const FACEBOOK_IOS_UA =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 26_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) " +
  "Mobile/23G71 [FBAN/FBIOS;FBDV/iPhone17,5;FBSV/26.6]";
const DESKTOP_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36";

type HandlerArgs = Parameters<typeof handler>;

const makeReq = (slug: string, userAgent = ANDROID_UA): HandlerArgs[0] =>
  ({
    query: { slug },
    headers: { "user-agent": userAgent, "accept-language": "de-DE" },
  }) as unknown as HandlerArgs[0];

interface ResHarness {
  res: HandlerArgs[1];
  redirect: ReturnType<typeof vi.fn>;
  send: ReturnType<typeof vi.fn>;
  status: ReturnType<typeof vi.fn>;
  setHeader: ReturnType<typeof vi.fn>;
}

const makeRes = (): ResHarness => {
  const redirect = vi.fn();
  const send = vi.fn();
  const setHeader = vi.fn();
  const status = vi.fn(() => ({ send }));
  const res = { setHeader, redirect, status, send } as unknown as HandlerArgs[1];
  return { res, redirect, send, status, setHeader };
};

const deferred = <T,>(): { promise: Promise<T>; resolve: (value: T) => void } => {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((r) => {
    resolve = r;
  });
  return { promise, resolve };
};

const tick = (): Promise<void> => new Promise((resolve) => setTimeout(resolve, 0));

describe("/go handler", () => {
  beforeEach(() => {
    delete globalWithContext[REQUEST_CONTEXT_SYMBOL];
    vi.stubEnv("SUPABASE_URL", "https://project.supabase.co");
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "service-key");
    vi.stubEnv("SMARTLINK_HASH_SECRET", "hash-secret");
  });

  afterEach(() => {
    delete globalWithContext[REQUEST_CONTEXT_SYMBOL];
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("awaits the click insert before redirecting when there is no request context", async () => {
    const pending = deferred<{ ok: boolean; status: number }>();
    const fetchMock = vi.fn(() => pending.promise);
    vi.stubGlobal("fetch", fetchMock);

    const { res, redirect } = makeRes();
    const done = handler(makeReq("ugc-lisa-1"), res);

    await tick();
    // Without a platform waitUntil there is nothing to keep the invocation
    // alive after the response, so the insert must be in flight and awaited.
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(redirect).not.toHaveBeenCalled();

    pending.resolve({ ok: true, status: 201 });
    await done;

    expect(redirect).toHaveBeenCalledTimes(1);
    expect(redirect.mock.calls[0][0]).toBe(302);
    expect(redirect.mock.calls[0][1]).toContain("play.google.com");
  });

  it("defers the insert and redirects immediately when a request context exposes waitUntil", async () => {
    const deferredWork: Array<Promise<unknown>> = [];
    globalWithContext[REQUEST_CONTEXT_SYMBOL] = {
      get: () => ({
        waitUntil: (promise: Promise<unknown>) => {
          deferredWork.push(promise);
        },
      }),
    };
    const pending = deferred<{ ok: boolean; status: number }>();
    const fetchMock = vi.fn(() => pending.promise);
    vi.stubGlobal("fetch", fetchMock);

    const { res, redirect } = makeRes();
    await handler(makeReq("ugc-lisa-1"), res);

    expect(redirect).toHaveBeenCalledTimes(1);
    expect(deferredWork).toHaveLength(1);
    expect(fetchMock).toHaveBeenCalledTimes(1);

    pending.resolve({ ok: true, status: 201 });
    await deferredWork[0];
  });

  it("still redirects when the click insert fails", async () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new Error("supabase unreachable");
      }),
    );

    const { res, redirect } = makeRes();
    await expect(handler(makeReq("ugc-lisa-1"), res)).resolves.toBeUndefined();

    expect(redirect).toHaveBeenCalledTimes(1);
    expect(redirect.mock.calls[0][0]).toBe(302);
    expect(error).toHaveBeenCalled();
  });

  it("still redirects when the click tracking configuration is missing", async () => {
    vi.stubEnv("SUPABASE_URL", "");
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "");
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const { res, redirect } = makeRes();
    await handler(makeReq("ugc-lisa-1"), res);

    expect(fetchMock).not.toHaveBeenCalled();
    expect(warn).toHaveBeenCalledTimes(1);
    expect(redirect).toHaveBeenCalledTimes(1);
  });

  // Instagram's in-app browser drops App Store navigations, so a 302 there is a
  // silent dead end. See src/lib/inAppBrowser.ts for the evidence.
  describe("Instagram in-app browser", () => {
    beforeEach(() => {
      vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, status: 201 })));
    });

    it("serves the interstitial instead of redirecting iOS visitors to the App Store", async () => {
      const { res, redirect, status, send, setHeader } = makeRes();
      await handler(makeReq("ugc-lisa-1", INSTAGRAM_IOS_UA), res);

      expect(redirect).not.toHaveBeenCalled();
      expect(status).toHaveBeenCalledWith(200);
      expect(setHeader).toHaveBeenCalledWith("content-type", "text/html; charset=utf-8");

      const html = send.mock.calls[0][0] as string;
      expect(html).toContain("apps.apple.com");
      expect(html).toContain("ct=ugc-lisa-1");
    });

    it("still records the click when it serves the interstitial", async () => {
      const fetchMock = vi.fn(async () => ({ ok: true, status: 201 }));
      vi.stubGlobal("fetch", fetchMock);

      const { res } = makeRes();
      await handler(makeReq("ugc-lisa-1", INSTAGRAM_IOS_UA), res);

      expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    // Play Store links are ordinary web pages needing no app handoff, and they
    // open normally in that browser — an interstitial would be pure friction.
    it("leaves Android visitors on the fast Play Store redirect", async () => {
      const { res, redirect, send } = makeRes();
      await handler(makeReq("ugc-lisa-1", INSTAGRAM_ANDROID_UA), res);

      expect(send).not.toHaveBeenCalled();
      expect(redirect).toHaveBeenCalledTimes(1);
      expect(redirect.mock.calls[0][1]).toContain("play.google.com");
    });

    it("leaves the Facebook in-app browser on the fast App Store redirect", async () => {
      const { res, redirect, send } = makeRes();
      await handler(makeReq("ugc-lisa-1", FACEBOOK_IOS_UA), res);

      expect(send).not.toHaveBeenCalled();
      expect(redirect).toHaveBeenCalledTimes(1);
      expect(redirect.mock.calls[0][1]).toContain("apps.apple.com");
    });

    it("leaves desktop visitors on the landing page redirect", async () => {
      const { res, redirect, send } = makeRes();
      await handler(makeReq("ugc-lisa-1", DESKTOP_UA), res);

      expect(send).not.toHaveBeenCalled();
      expect(redirect).toHaveBeenCalledTimes(1);
      expect(redirect.mock.calls[0][1]).toContain("utm_medium=smartlink");
    });
  });

  it("redirects unknown slugs to the landing page without recording a click", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const { res, redirect } = makeRes();
    await handler(makeReq("not a slug"), res);

    expect(fetchMock).not.toHaveBeenCalled();
    expect(redirect).toHaveBeenCalledWith(302, LANDING_PAGE_URL);
  });
});
