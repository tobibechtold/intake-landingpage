import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const DEFAULT_HEADER_OFFSET = 96;
const EXTRA_GAP = 16;

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ left: 0, top: 0 });
      return;
    }

    const targetId = decodeURIComponent(location.hash.slice(1));
    let frameId = 0;
    let timeoutId = 0;
    let attempts = 0;
    let cancelled = false;

    const getHeaderOffset = () => {
      const headerShell = document.querySelector<HTMLElement>("[data-site-header-shell]");
      if (!headerShell) {
        return DEFAULT_HEADER_OFFSET;
      }

      return Math.ceil(headerShell.getBoundingClientRect().bottom + EXTRA_GAP);
    };

    const scrollToHashTarget = (behavior: ScrollBehavior) => {
      if (cancelled) {
        return;
      }

      const element = document.getElementById(targetId);

      if (!element) {
        if (attempts < 14) {
          attempts += 1;
          timeoutId = window.setTimeout(() => {
            frameId = window.requestAnimationFrame(() => scrollToHashTarget("auto"));
          }, 120);
        }
        return;
      }

      const top = Math.max(
        0,
        window.scrollY + element.getBoundingClientRect().top - getHeaderOffset()
      );
      window.scrollTo({ left: 0, top, behavior });

      if (attempts < 10) {
        attempts += 1;
        timeoutId = window.setTimeout(() => {
          frameId = window.requestAnimationFrame(() => scrollToHashTarget("auto"));
        }, 160);
      }
    };

    timeoutId = window.setTimeout(() => {
      frameId = window.requestAnimationFrame(() => scrollToHashTarget("smooth"));
    }, 0);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
      window.cancelAnimationFrame(frameId);
    };
  }, [location.pathname, location.hash]);

  return null;
};

export default ScrollToTop;
