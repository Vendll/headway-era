/** Autoplay muted videos only while they are on screen (saves battery, mirrors Framer). */
export function initVideo() {
  const vids = document.querySelectorAll<HTMLVideoElement>('video[data-autoplay]');
  if (!vids.length) return;
  if (!('IntersectionObserver' in window)) {
    vids.forEach((v) => v.play().catch(() => {}));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const en of entries) {
        const v = en.target as HTMLVideoElement;
        if (en.isIntersecting) {
          if (v.preload !== 'auto') v.preload = 'auto';
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      }
    },
    { threshold: 0.1, rootMargin: '200px 0px' },
  );
  vids.forEach((v) => io.observe(v));
}
