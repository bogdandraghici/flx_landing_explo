import '@fontsource-variable/sora';
import '@fontsource-variable/geist';
import '@fontsource-variable/geist-mono';
import './style.css';

import { createGrain } from './grain.js';

export const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const $ = (sel) => document.querySelector(sel);

/* page chrome shared by every page: grain overlay, nav scroll state,
   scroll reveals, footer year */
export function initChrome() {
  const grainCanvas = $('#grain');
  if (grainCanvas) createGrain(grainCanvas);

  const nav = $('#nav');
  if (nav) {
    const syncNav = () => nav.classList.toggle('scrolled', window.scrollY > 24);
    syncNav(); // set the correct state before enabling transitions
    // enable transitions only after the first paint so the border doesn't
    // animate in from currentColor on load (the white-line-on-nav flash)
    requestAnimationFrame(() => nav.classList.add('nav--ready'));
    let navTick = false;
    window.addEventListener(
      'scroll',
      () => {
        if (navTick) return;
        navTick = true;
        requestAnimationFrame(() => {
          syncNav();
          navTick = false;
        });
      },
      { passive: true }
    );
  }

  const revealIO = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          revealIO.unobserve(e.target);
        }
      }
    },
    { threshold: 0.18, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.rv').forEach((n) => revealIO.observe(n));

  const year = $('#year');
  if (year) year.textContent = String(new Date().getFullYear());
}
