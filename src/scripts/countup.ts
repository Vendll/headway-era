/**
 * Counts up the leading figure of any `[data-countup]` element when it scrolls
 * into view: "+38% lorem" → "+0% lorem" … "+38% lorem". Sign, suffix and the
 * rest of the sentence stay as written; only the digits move. Runs once per
 * element. Honours prefers-reduced-motion and the `?static` screenshot flag by
 * showing the final value outright.
 */
const DURATION_MS = 1100;

export function initCountUp() {
  const els = document.querySelectorAll<HTMLElement>('[data-countup]');
  if (!els.length) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isStatic = new URLSearchParams(location.search).has('static');

  const targets: { num: HTMLElement; value: number }[] = [];
  for (const el of els) {
    const text = el.textContent ?? '';
    // leading figure: optional sign, digits (with , or . or thin spaces), then the rest
    const m = /^(\s*[+\u2212-]?)(\d[\d.,\u00a0\u202f ]*?)(?=\D|$)([\s\S]*)$/.exec(text);
    if (!m) continue;
    const value = parseInt(m[2].replace(/\D/g, ''), 10);
    if (!Number.isFinite(value)) continue;
    const num = document.createElement('span');
    num.textContent = m[2];
    el.textContent = '';
    el.append(m[1], num, m[3]);
    targets.push({ num, value });
  }
  if (!targets.length) return;

  if (reduce || isStatic || !('IntersectionObserver' in window)) return; // final values already in place

  const run = ({ num, value }: (typeof targets)[number]) => {
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION_MS);
      const eased = 1 - Math.pow(1 - p, 3);
      num.textContent = String(Math.round(value * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    num.textContent = '0';
    requestAnimationFrame(tick);
  };

  const io = new IntersectionObserver(
    (entries) => {
      for (const en of entries) {
        if (!en.isIntersecting) continue;
        const t = targets.find((x) => x.num === en.target);
        if (t) run(t);
        io.unobserve(en.target);
      }
    },
    { threshold: 0.6 },
  );
  for (const t of targets) io.observe(t.num);
}
