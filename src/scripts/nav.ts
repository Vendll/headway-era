/**
 * Scroll-to-top button + the assemble-on-scroll nav.
 *
 * - The scroll-top button appears after 200px.
 * - On pages whose header opts in (`data-nav-assemble`), a single custom
 *   property `--nav-t` is scrubbed from 0 (bare landing state: logo alone,
 *   no surface) to 1 (assembled bar) over the first ASSEMBLE_DISTANCE px.
 *   Every visual property in the header interpolates off it, so the change
 *   is continuous and reversible rather than a class-toggle snap.
 */
const ASSEMBLE_DISTANCE = 120;

function initScrollTop() {
  const scrollTop = document.querySelector<HTMLElement>('[data-scroll-top]');
  if (!scrollTop) return;

  let shown = false;
  const update = () => {
    const s = window.scrollY > 200;
    if (s !== shown) {
      shown = s;
      scrollTop.classList.toggle('is-visible', s);
    }
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
}

function initAssembleNav() {
  const header = document.querySelector<HTMLElement>('[data-nav-assemble]');
  if (!header) return;

  // Honour reduced motion: CSS already pins --nav-t to 1, so leave it alone.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let last = -1;

  const apply = () => {
    const t = Math.min(1, Math.max(0, window.scrollY / ASSEMBLE_DISTANCE));
    if (t === last) return;
    last = t;
    header.style.setProperty('--nav-t', t.toFixed(4));
    header.classList.toggle('is-bare', t < 0.02);
  };

  apply();
  // Runs directly on scroll rather than batching through requestAnimationFrame:
  // the handler only writes style (it never reads layout), so there is nothing to
  // batch, and a "frame already pending" guard would wedge permanently if that
  // frame never fired (throttled/backgrounded tab), freezing the nav mid-transition.
  window.addEventListener('scroll', apply, { passive: true });
  window.addEventListener('resize', apply, { passive: true });
}

export function initNav() {
  initScrollTop();
  initAssembleNav();
}
