/**
 * Live Pacific-time clock (24h, flickering colons) — mirrors the Framer clock
 * component used in the site header.
 */
export function initClock() {
  const clocks = document.querySelectorAll<HTMLElement>('[data-clock]');
  if (!clocks.length) return;

  const fmt = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  let on = true;
  const tick = () => {
    const parts = fmt.formatToParts(new Date());
    const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '00';
    const h = get('hour') === '24' ? '00' : get('hour');
    on = !on;
    for (const c of clocks) {
      const hh = c.querySelector('[data-h]');
      const mm = c.querySelector('[data-m]');
      const ss = c.querySelector('[data-s]');
      if (hh) hh.textContent = h;
      if (mm) mm.textContent = get('minute');
      if (ss) ss.textContent = get('second');
      c.classList.toggle('is-blink', on);
    }
  };
  tick();
  window.setInterval(tick, 1000);
}
