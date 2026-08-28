/**
 * Types / deletes the rotating word in the hero headline.
 *
 * Words come from `data-rotate` (pipe-separated) on the wrapper. The wrapper
 * reserves the width of its longest word via a hidden sizer span, so the
 * headline never reflows as the word changes.
 *
 * Honours prefers-reduced-motion and the `?static` screenshot flag by showing
 * the first word outright, matching the behaviour of the site's other
 * typewriter (see scripts/typewriter.ts).
 */
const TYPE_MS = 70;
const DELETE_MS = 38;
const HOLD_MS = 1900;
const BETWEEN_MS = 320;
const START_MS = 500;

export function initHeroRotate() {
  const el = document.querySelector<HTMLElement>('[data-rotate]');
  if (!el) return;

  const words = (el.dataset.rotate || '').split('|').filter(Boolean);
  const out = el.querySelector<HTMLElement>('.rot__text');
  if (!words.length || !out) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isStatic = new URLSearchParams(location.search).has('static');

  if (reduce || isStatic) {
    out.textContent = words[0];
    el.classList.add('is-done');
    return;
  }

  let word = 0;
  let chars = 0;
  let deleting = false;
  let timer = 0;

  const tick = () => {
    const current = words[word];

    if (!deleting) {
      out.textContent = current.slice(0, ++chars);
      if (chars === current.length) {
        deleting = true;
        timer = window.setTimeout(tick, HOLD_MS);
        return;
      }
      timer = window.setTimeout(tick, TYPE_MS);
      return;
    }

    out.textContent = current.slice(0, --chars);
    if (chars === 0) {
      deleting = false;
      word = (word + 1) % words.length;
      timer = window.setTimeout(tick, BETWEEN_MS);
      return;
    }
    timer = window.setTimeout(tick, DELETE_MS);
  };

  out.textContent = '';
  timer = window.setTimeout(tick, START_MS);

  // Stop churning while the tab is hidden; resume from where it left off.
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      window.clearTimeout(timer);
    } else {
      window.clearTimeout(timer);
      timer = window.setTimeout(tick, BETWEEN_MS);
    }
  });
}
