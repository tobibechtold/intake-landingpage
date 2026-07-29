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

type HandlerArgs = Parameters<typeof handler>;

const makeReq = (slug: string, userAgent = ANDROID_UA): HandlerArgs[0] =>
  ({
    query: { slug },
    headers: { "user-agent": userAgent, "accept-language": "de-DE" },
  }) as unknown as HandlerArgs[0];

const makeRes = (): { res: HandlerArgs[1]; redirect: ReturnType<typeof vi.fn> } => {
  const redirect = vi.fn();
  const res = { setHeader: vi.fn(), redirect } as unknown as HandlerArgs[1];
  return { res, redirect };
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

  it("redirects unknown slugs to the landing page without recording a click", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const { res, redirect } = makeRes();
    await handler(makeReq("not a slug"), res);

    expect(fetchMock).not.toHaveBeenCalled();
    expect(redirect).toHaveBeenCalledWith(302, LANDING_PAGE_URL);
  });
});
