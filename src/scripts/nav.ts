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

/**
 * The logo lockup, expressed in the flat wordmark's viewBox units (556 x 88).
 * In the lockup the letters sit on an arc, rising toward the middle and
 * tilting with it, and the underline beneath follows the same arc. Measured
 * from the original file and fitted as a parabola about the wordmark's centre.
 */
const WM_H = 88; // flat wordmark viewBox height
const WM_CX = 278; // wordmark centre x
const ARC_A = 1.15e-4; // parabola curvature: y = ARC_A * (x - WM_CX)^2
const ARC_HALF = 243; // half-width from the centre to the outer glyph centres
const UNDERLINE_ENDS = 18; // centreline at the ends, below the flat wordmark's bottom edge
const UNDERLINE_MID = 8; // centreline in the middle, below the flat wordmark's bottom edge
const UNDERLINE_STROKE = 8.6; // stroke thickness
const UNDERLINE_GREY = [88, 89, 91];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** "#e3e3e3" | "rgb(1, 2, 3)" → [r, g, b]; anything else → fallback */
function parseColor(value: string, fallback: number[]): number[] {
  const v = value.trim();
  const hex = /^#([0-9a-f]{6})$/i.exec(v);
  if (hex) return [0, 2, 4].map((i) => parseInt(hex[1].slice(i, i + 2), 16));
  const rgb = /^rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/i.exec(v);
  if (rgb) return [+rgb[1], +rgb[2], +rgb[3]];
  return fallback;
}

function initAssembleNav() {
  const header = document.querySelector<HTMLElement>('[data-nav-assemble]');
  if (!header) return;

  // Honour reduced motion: CSS already pins --nav-t to 1 and shows its own
  // static rule, so neither the scrub nor the underline runs.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // The underline: one path that is the lockup's curved underline at t = 0 and
  // the bar's full-width 1px rule at t = 1. Everything in between is a lerp of
  // its endpoints, arch, stroke width and colour, so it is one continuous
  // object - never an underline plus a rule.
  const path = header.querySelector<SVGPathElement>('.site-nav__underline path');
  const logo = header.querySelector<SVGSVGElement | HTMLImageElement>('.site-nav__logo :is(svg, img)');
  const ruleColor = parseColor(getComputedStyle(header).getPropertyValue('--rule'), [227, 227, 227]);
  if (path && logo) header.classList.add('has-underline');

  // The letters: each glyph group is rotated to the arc's tangent and lifted
  // onto the arc at t = 0, and back to the flat baseline at t = 1. The arc is
  // centred vertically so the wordmark's optical centre does not move.
  const glyphs = [...header.querySelectorAll<SVGGElement>('.site-nav__logo .wm__glyph')].map((g) => {
    const b = g.getBBox();
    const cx = b.x + b.width / 2;
    const cy = b.y + b.height / 2;
    const dx = cx - WM_CX;
    const angle = (Math.atan(2 * ARC_A * dx) * 180) / Math.PI;
    const lift = ARC_A * dx * dx - (ARC_A * ARC_HALF * ARC_HALF) / 2;
    return { g, cx, cy, angle, lift };
  });

  const morphWordmark = (t: number) => {
    const k = 1 - t;
    for (const { g, cx, cy, angle, lift } of glyphs) {
      g.setAttribute('transform', `translate(0 ${(lift * k).toFixed(3)}) rotate(${(angle * k).toFixed(3)} ${cx.toFixed(2)} ${cy.toFixed(2)})`);
    }
  };

  const drawUnderline = (t: number) => {
    if (!path || !logo) return;
    const hb = header.getBoundingClientRect();
    const lb = logo.getBoundingClientRect();
    const W = hb.width;
    const H = hb.height;
    const s = lb.height / WM_H; // wordmark units → px at the logo's current size
    const yb = lb.bottom - hb.top; // flat wordmark bottom edge, header coordinates

    const x0 = lerp(lb.left - hb.left, 0, t);
    const x1 = lerp(lb.right - hb.left, W, t);
    const yEnds = lerp(yb + UNDERLINE_ENDS * s, H - 0.5, t);
    const yMid = lerp(yb + UNDERLINE_MID * s, H - 0.5, t);
    // quadratic control point that puts the curve's middle exactly at yMid
    const cy = 2 * yMid - yEnds;
    const f = (n: number) => n.toFixed(2);

    path.setAttribute('d', `M${f(x0)} ${f(yEnds)} Q${f((x0 + x1) / 2)} ${f(cy)} ${f(x1)} ${f(yEnds)}`);
    path.setAttribute('stroke-width', f(lerp(UNDERLINE_STROKE * s, 1, t)));
    const c = UNDERLINE_GREY.map((g, i) => Math.round(lerp(g, ruleColor[i], t)));
    path.setAttribute('stroke', `rgb(${c[0]} ${c[1]} ${c[2]})`);
  };

  let last = -1;

  const apply = (force = false) => {
    const t = Math.min(1, Math.max(0, window.scrollY / ASSEMBLE_DISTANCE));
    if (t === last && !force) return;
    last = t;
    header.style.setProperty('--nav-t', t.toFixed(4));
    header.classList.toggle('is-bare', t < 0.02);
    morphWordmark(t);
    drawUnderline(t);
  };

  apply();
  // Runs directly on scroll rather than batching through requestAnimationFrame:
  // a "frame already pending" guard would wedge permanently if that frame never
  // fired (throttled/backgrounded tab), freezing the nav mid-transition.
  window.addEventListener('scroll', () => apply(), { passive: true });
  // the logo's rect changes with the viewport, so the underline is redrawn even
  // when the scroll position (and so t) has not changed
  window.addEventListener('resize', () => apply(true), { passive: true });
  // and once an <img> wordmark has real dimensions, in case it was not yet laid out
  if (logo instanceof HTMLImageElement && !logo.complete) logo.addEventListener('load', () => apply(true), { once: true });
}

export function initNav() {
  initScrollTop();
  initAssembleNav();
}
