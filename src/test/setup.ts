// This setup file runs for every test file, including those that opt into the
// `node` environment to render .astro components through the Container API
// (Astro 6+ forbids rendering them in jsdom). Everything DOM-specific is therefore
// guarded, and jest-dom is imported dynamically so it never loads without a document.

// jsdom's AbortSignal predates AbortSignal.timeout, which the Node runtime the
// /go function actually runs on has had since Node 17.3.
if (typeof AbortSignal.timeout !== "function") {
  Object.defineProperty(AbortSignal, "timeout", {
    configurable: true,
    writable: true,
    value: (ms: number) => {
      const controller = new AbortController();
      setTimeout(() => controller.abort(new Error("TimeoutError")), ms);
      return controller.signal;
    },
  });
}

if (typeof window !== "undefined") {
  await import("@testing-library/jest-dom");

  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => {},
    }),
  });

  Object.defineProperty(HTMLMediaElement.prototype, "load", {
    configurable: true,
    value: () => {},
  });

  class MockIntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  }

  class MockResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }

  for (const target of [window, globalThis]) {
    Object.defineProperty(target, "IntersectionObserver", {
      writable: true,
      value: MockIntersectionObserver,
    });
    Object.defineProperty(target, "ResizeObserver", {
      writable: true,
      value: MockResizeObserver,
    });
  }
}
