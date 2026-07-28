import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { deferOrAwait, getRequestContext, recordClick } from "./clickWriter";
import type { ClickInput } from "./clickTracking";

const REQUEST_CONTEXT_SYMBOL = Symbol.for("@vercel/request-context");

type GlobalWithContext = Record<symbol, unknown>;

const globalWithContext = globalThis as unknown as GlobalWithContext;

const installContext = (context: unknown): void => {
  globalWithContext[REQUEST_CONTEXT_SYMBOL] = { get: () => context };
};

const clearContext = (): void => {
  delete globalWithContext[REQUEST_CONTEXT_SYMBOL];
};

const input = (): ClickInput => ({
  slug: "ugc-lisa-1",
  userAgent: "Mozilla/5.0 (Linux; Android 14)",
  now: new Date("2026-07-29T10:00:00Z"),
});

describe("getRequestContext", () => {
  afterEach(() => {
    clearContext();
  });

  it("returns undefined when the platform never installed the context symbol", () => {
    clearContext();
    expect(getRequestContext()).toBeUndefined();
  });

  it("returns the context the platform stored on globalThis", () => {
    const context = { waitUntil: () => {} };
    installContext(context);
    expect(getRequestContext()).toBe(context);
  });

  it("tolerates a context store without a get() function", () => {
    globalWithContext[REQUEST_CONTEXT_SYMBOL] = {};
    expect(getRequestContext()).toBeUndefined();
  });
});

describe("deferOrAwait", () => {
  afterEach(() => {
    clearContext();
    vi.restoreAllMocks();
  });

  it("hands the task to waitUntil without awaiting it when a context exists", async () => {
    const deferred: Array<Promise<unknown>> = [];
    installContext({
      waitUntil: (promise: Promise<unknown>) => {
        deferred.push(promise);
      },
    });

    let settled = false;
    let release = (): void => {};
    const task = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          release = () => {
            settled = true;
            resolve();
          };
        }),
    );

    await deferOrAwait(task);

    // The task was started and handed off, but deferOrAwait returned before it
    // finished — that is the whole point of the waitUntil path.
    expect(task).toHaveBeenCalledTimes(1);
    expect(deferred).toHaveLength(1);
    expect(settled).toBe(false);

    release();
    await deferred[0];
    expect(settled).toBe(true);
  });

  it("preserves the context as the receiver of waitUntil", async () => {
    const context = {
      calls: 0,
      waitUntil(this: { calls: number }) {
        this.calls += 1;
      },
    };
    installContext(context);

    await deferOrAwait(async () => {});

    expect(context.calls).toBe(1);
  });

  it("awaits the task when no request context is installed", async () => {
    clearContext();
    let settled = false;
    await deferOrAwait(async () => {
      await Promise.resolve();
      settled = true;
    });

    expect(settled).toBe(true);
  });

  it("awaits the task when the context exists but exposes no waitUntil", async () => {
    installContext({});
    let settled = false;
    await deferOrAwait(async () => {
      settled = true;
    });

    expect(settled).toBe(true);
  });

  it("resolves instead of rejecting when the awaited task rejects", async () => {
    clearContext();
    const error = vi.spyOn(console, "error").mockImplementation(() => {});

    await expect(deferOrAwait(async () => {
      throw new Error("insert exploded");
    })).resolves.toBeUndefined();

    expect(error).toHaveBeenCalledWith(expect.stringContaining("insert exploded"));
  });

  it("resolves instead of rejecting when the task throws synchronously", async () => {
    clearContext();
    const error = vi.spyOn(console, "error").mockImplementation(() => {});

    await expect(
      deferOrAwait((() => {
        throw new Error("built the row wrong");
      }) as () => Promise<void>),
    ).resolves.toBeUndefined();

    expect(error).toHaveBeenCalledWith(expect.stringContaining("built the row wrong"));
  });

  it("hands a non-rejecting promise to waitUntil so the platform never sees an unhandled rejection", async () => {
    const deferred: Array<Promise<unknown>> = [];
    installContext({
      waitUntil: (promise: Promise<unknown>) => {
        deferred.push(promise);
      },
    });
    vi.spyOn(console, "error").mockImplementation(() => {});

    await deferOrAwait(async () => {
      throw new Error("deferred failure");
    });

    await expect(deferred[0]).resolves.toBeUndefined();
  });
});

describe("recordClick", () => {
  beforeEach(() => {
    clearContext();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("warns and skips the insert when SUPABASE_URL is missing", async () => {
    vi.stubEnv("SUPABASE_URL", "");
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "service-key");
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    await recordClick(input());

    expect(fetchMock).not.toHaveBeenCalled();
    expect(warn).toHaveBeenCalledTimes(1);
    const message = warn.mock.calls[0][0] as string;
    expect(message).toContain("SUPABASE_URL");
    expect(message).not.toContain("SUPABASE_SERVICE_ROLE_KEY");
    expect(message).not.toContain("service-key");
  });

  it("warns and skips the insert when the service role key is missing", async () => {
    vi.stubEnv("SUPABASE_URL", "https://project.supabase.co");
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "");
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    await recordClick(input());

    expect(fetchMock).not.toHaveBeenCalled();
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn.mock.calls[0][0]).toContain("SUPABASE_SERVICE_ROLE_KEY");
  });

  it("names both variables when neither is configured", async () => {
    vi.stubEnv("SUPABASE_URL", "");
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "");
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.stubGlobal("fetch", vi.fn());

    await recordClick(input());

    const message = warn.mock.calls[0][0] as string;
    expect(message).toContain("SUPABASE_URL");
    expect(message).toContain("SUPABASE_SERVICE_ROLE_KEY");
  });

  it("posts the click row to the smartlink_clicks REST endpoint", async () => {
    vi.stubEnv("SUPABASE_URL", "https://project.supabase.co");
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "service-key");
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const fetchMock = vi.fn(async () => ({ ok: true, status: 201 }));
    vi.stubGlobal("fetch", fetchMock);

    await recordClick({ ...input(), slug: "ugc-lisa-2" });

    expect(warn).not.toHaveBeenCalled();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("https://project.supabase.co/rest/v1/smartlink_clicks");
    expect(init.method).toBe("POST");
    expect(JSON.parse(init.body as string).slug).toBe("ugc-lisa-2");
  });

  it("logs and swallows a non-ok response", async () => {
    vi.stubEnv("SUPABASE_URL", "https://project.supabase.co");
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "service-key");
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({ ok: false, status: 401, text: async () => "no permission" })),
    );

    await expect(recordClick(input())).resolves.toBeUndefined();
    expect(error).toHaveBeenCalledWith(expect.stringContaining("401"));
  });

  it("logs and swallows a network failure", async () => {
    vi.stubEnv("SUPABASE_URL", "https://project.supabase.co");
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "service-key");
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new Error("socket hang up");
      }),
    );

    await expect(recordClick(input())).resolves.toBeUndefined();
    expect(error).toHaveBeenCalledWith(expect.stringContaining("socket hang up"));
  });
});
