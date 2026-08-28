/**
 * Types `data-word` into `[data-typewriter] .tw__text` once the element scrolls
 * into view (mirrors the Framer TypewriterEffect: 100ms per character).
 */
export function initTypewriter() {
  const els = document.querySelectorAll<HTMLElement>('[data-typewriter]');
  if (!els.length) return;

  const run = (el: HTMLElement) => {
    const word = el.dataset.word || '';
    const speed = Number(el.dataset.speed || 100);
    const out = el.querySelector<HTMLElement>('.tw__text');
    if (!out) return;
    let i = 0;
    out.textContent = '';
    const step = () => {
      if (i < word.length) {
        out.textContent = word.slice(0, ++i);
        window.setTimeout(step, speed);
      } else {
        el.classList.add('is-done');
      }
    };
    step();
  };

  if (!('IntersectionObserver' in window) || new URLSearchParams(location.search).has('static')) {
    els.forEach((el) => {
      const out = el.querySelector<HTMLElement>('.tw__text');
      if (out) out.textContent = el.dataset.word || '';
      el.classList.add('is-done');
    });
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const en of entries) {
        if (en.isIntersecting) {
          run(en.target as HTMLElement);
          io.unobserve(en.target);
        }
      }
    },
    { threshold: 0.2 },
  );
  els.forEach((el) => io.observe(el));
}
