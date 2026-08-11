/**
 * Prev/next controls for the screenshot row.
 *
 * The row itself is CSS scroll-snap and works without this — touch, trackpad and
 * shift+wheel all scroll it natively. This only adds the desktop affordance that
 * disappeared with embla, at a fraction of its 23 KB.
 *
 * Buttons are hidden until this runs, so they never appear as dead controls.
 */
const init = () => {
  for (const root of document.querySelectorAll<HTMLElement>('[data-carousel]')) {
    const track = root.querySelector<HTMLElement>('[data-carousel-track]');
    const prev = root.querySelector<HTMLButtonElement>('[data-carousel-prev]');
    const next = root.querySelector<HTMLButtonElement>('[data-carousel-next]');
    if (!track || !prev || !next) continue;

    // Scroll by one visible item rather than a fixed pixel amount, so the step keeps
    // matching the responsive basis (85% → 1/2 → 1/3 → 1/4).
    const step = () => track.firstElementChild?.getBoundingClientRect().width ?? track.clientWidth;

    const sync = () => {
      const max = track.scrollWidth - track.clientWidth;
      prev.disabled = track.scrollLeft <= 1;
      next.disabled = track.scrollLeft >= max - 1;
    };

    prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
    next.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
    track.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);

    prev.hidden = false;
    next.hidden = false;
    sync();
  }
};

init();
