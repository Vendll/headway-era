import Lenis from 'lenis';

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Smooth scrolling (Lenis) — the live Framer site ships Lenis too. We keep it
 * subtle and disable it for users who prefer reduced motion.
 */
export function initScroll() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const disabled = document.documentElement.hasAttribute('data-no-smooth');

  let lenis: Lenis | undefined;
  if (!reduce && !disabled) {
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1 });
    window.__lenis = lenis;
    const raf = (t: number) => {
      lenis!.raf(t);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }

  const scrollTo = (target: Element | number, offset = 0) => {
    if (lenis) lenis.scrollTo(target as any, { offset, duration: 1.2 });
    else if (typeof target === 'number') window.scrollTo({ top: target, behavior: 'smooth' });
    else target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // In-page anchors
  document.addEventListener('click', (e) => {
    const a = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"], a[href^="/#"]');
    if (!a) return;
    const hash = a.getAttribute('href')!.replace(/^\//, '');
    if (hash === '#' || hash === '#top') {
      e.preventDefault();
      scrollTo(0);
      return;
    }
    const isSamePage = !a.getAttribute('href')!.startsWith('/') || location.pathname === '/';
    if (!isSamePage) return;
    const el = document.querySelector(hash);
    if (!el) return;
    e.preventDefault();
    history.replaceState(null, '', hash);
    scrollTo(el, 0);
  });

  // Landing on /#projects etc.
  if (location.hash && location.hash.length > 1) {
    const el = document.querySelector(location.hash);
    if (el) requestAnimationFrame(() => scrollTo(el, 0));
  }
}
