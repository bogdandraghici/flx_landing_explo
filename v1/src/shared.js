import '@fontsource-variable/sora';
import '@fontsource-variable/geist';
import '@fontsource-variable/geist-mono';
import './style.css';

import { createGrain } from './grain.js';
import { initMegaMenu } from './megamenu.js';

export const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const $ = (sel) => document.querySelector(sel);

/* ---------------------------------------------------------------------------
   THEME
   The initial theme is set before first paint by a tiny inline script in each
   page's <head> (no-flash). Here we build the nav toggle and broadcast changes
   so the canvases (order field, grain) can re-read their palettes live.
   --------------------------------------------------------------------------- */
const THEME_KEY = 'flx-theme';
const currentTheme = () =>
  document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';

function applyTheme(theme, persist) {
  document.documentElement.dataset.theme = theme;
  if (persist) {
    try { localStorage.setItem(THEME_KEY, theme); } catch { /* storage blocked */ }
  }
  window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
}

function initTheme() {
  const right = $('.nav__right');
  if (!right) return;

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'nav__theme';
  btn.innerHTML =
    '<svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4l1.4-1.4M18 6l1.4-1.4"/></svg>' +
    '<svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/></svg>';

  const sync = () => {
    const light = currentTheme() === 'light';
    btn.setAttribute('aria-pressed', String(light));
    const next = light ? 'dark' : 'light';
    btn.setAttribute('aria-label', `Switch to ${next} theme`);
    btn.title = `Switch to ${next} theme`;
  };
  sync();

  btn.addEventListener('click', () => {
    applyTheme(currentTheme() === 'light' ? 'dark' : 'light', true);
    sync();
  });
  // toggle leads the demo CTA / burger in the nav rail
  right.insertBefore(btn, right.firstChild);
}

/* page chrome shared by every page: grain overlay, nav scroll state,
   scroll reveals, footer year */
export function initChrome() {
  initTheme();

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

  // Primary nav: mega-menu disclosure panels + mobile drawer (megamenu.js)
  initMegaMenu();

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
