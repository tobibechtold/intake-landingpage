// Explicit .js extension: this module is part of the /go function's unbundled
// ESM graph, where extensionless relative specifiers do not resolve at runtime.
import { buildClickRow, type ClickInput } from "./clickTracking.js";

const REQUEST_CONTEXT_SYMBOL = Symbol.for("@vercel/request-context");

// Long enough for a healthy Supabase insert, short enough that the awaited
// fallback path below cannot noticeably stall the redirect.
const INSERT_TIMEOUT_MS = 2000;

interface VercelRequestContext {
  waitUntil?: (promise: Promise<unknown>) => void;
}

interface RequestContextStore {
  get?: () => VercelRequestContext | undefined;
}

/**
 * Reads the Vercel request context the platform stores on `globalThis`.
 *
 * `waitUntil()` from `@vercel/functions` optional-chains through this same
 * symbol and returns `undefined` — no throw, no warning — when the runtime
 * never installed it. Whether it exists depends on Fluid Compute being enabled
 * in the Vercel project dashboard, which nothing in this repo controls or can
 * verify. Reading the context ourselves is what lets us tell "deferred" from
 * "silently dropped".
 */
const describeError = (error: unknown): string =>
  error instanceof Error ? error.message : String(error);

export const getRequestContext = (): VercelRequestContext | undefined => {
  const store = (globalThis as unknown as Record<symbol, RequestContextStore | undefined>)[
    REQUEST_CONTEXT_SYMBOL
  ];
  return store?.get?.();
};

/**
 * Hands `task` to the platform's `waitUntil` when one is available, so the
 * response is not blocked; otherwise awaits it, because a background promise
 * left in flight after the response is sent is not guaranteed to run at all.
 *
 * Never rejects: callers use this on the redirect path and must not depend on
 * the task's own error handling.
 */
export const deferOrAwait = async (task: () => Promise<void>): Promise<void> => {
  let running: Promise<void>;
  try {
    running = Promise.resolve(task());
  } catch (error) {
    console.error(`Click write threw synchronously: ${describeError(error)}`);
    return;
  }

  const guarded = running.catch((error: unknown) => {
    console.error(`Click write rejected: ${describeError(error)}`);
  });

  const context = getRequestContext();
  if (typeof context?.waitUntil === "function") {
    context.waitUntil(guarded);
    return;
  }

  await guarded;
};

/**
 * Inserts one smart link click into Supabase. Swallows every failure — click
 * analytics must never break the redirect — but logs loudly, because this is
 * now the only place the click data is recorded.
 */
export const recordClick = async (input: ClickInput): Promise<void> => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    // Setting these is a manual deploy step, so a missing value is the most
    // likely operational mistake here. Name the variable, never the value.
    const missing = [
      supabaseUrl ? null : "SUPABASE_URL",
      serviceKey ? null : "SUPABASE_SERVICE_ROLE_KEY",
    ]
      .filter((name): name is string => name !== null)
      .join(", ");
    console.warn(
      `Smart link click not recorded: missing environment variable(s) ${missing}. ` +
        `The redirect still works, but no click rows are being written.`,
    );
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
      signal: AbortSignal.timeout(INSERT_TIMEOUT_MS),
    });
    if (!response.ok) {
      const body = await response.text().catch(() => "(unreadable)");
      const truncated = body.length > 200 ? body.slice(0, 200) + "..." : body;
      console.error(`Supabase insert failed: ${response.status} ${truncated}`);
    }
  } catch (error) {
    // Network errors, timeout, or other issues; analytics must never break the redirect.
    console.error(`Supabase insert error: ${describeError(error)}`);
  }
};
