import { initScroll } from './scroll';
import { initClock } from './clock';
import { initNav } from './nav';
import { initReveal } from './reveal';
import { initToc } from './toc';
import { initVideo } from './video';
import { initTypewriter } from './typewriter';
import { initHeroRotate } from './hero-rotate';
import { initCountUp } from './countup';

function boot() {
  initScroll();
  initClock();
  initNav();
  initReveal();
  initToc();
  initVideo();
  initTypewriter();
  initHeroRotate();
  initCountUp();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
