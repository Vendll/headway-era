/**
 * Scroll-spy for case-study sidebars: sections carry `data-toc-section`
 * (with an id), links carry `data-toc-link` and `href="#id"`.
 */
export function initToc() {
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-toc-link]'));
  if (!links.length) return;
  const sections = links
    .map((l) => document.querySelector<HTMLElement>(l.getAttribute('href') || ''))
    .filter((s): s is HTMLElement => !!s);
  if (!sections.length) return;

  const setActive = (id: string) => {
    for (const l of links) l.classList.toggle('is-active', l.getAttribute('href') === `#${id}`);
  };

  const update = () => {
    const line = window.innerHeight * 0.35;
    let current = sections[0];
    for (const s of sections) {
      if (s.getBoundingClientRect().top <= line) current = s;
    }
    setActive(current.id);
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
}
