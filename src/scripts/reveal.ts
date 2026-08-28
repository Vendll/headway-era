/**
 * Appear-on-scroll for any element with `data-reveal`.
 * Optional `data-reveal-delay="0.2"` (seconds) for staggering.
 */
export function initReveal() {
  const els = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (!els.length) return;

  for (const el of els) {
    const d = el.dataset.revealDelay;
    if (d) el.style.setProperty('--reveal-delay', `${d}s`);
  }

  // `?static` (debug/screenshots) or no IntersectionObserver → show everything immediately.
  if (!('IntersectionObserver' in window) || new URLSearchParams(location.search).has('static')) {
    els.forEach((el) => el.classList.add('is-in'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const en of entries) {
        if (en.isIntersecting) {
          en.target.classList.add('is-in');
          io.unobserve(en.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -5% 0px' },
  );
  els.forEach((el) => io.observe(el));
}
