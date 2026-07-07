import { initChrome } from './shared.js';
import { createStaticField } from './orderField.js';

initChrome();

/* ================= hero cli typing ================= */
const cliTypeOne = document.querySelector('.fxc-type--one');
const cliTypeTwo = document.querySelector('.fxc-type--two');
const cliCaret = document.querySelector('.fxc-caret');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function initCliTyping() {
  if (!cliTypeOne || !cliTypeTwo || !cliCaret) return;

  const lines = [
    { el: cliTypeOne, len: 108, x: 58, y: 194, start: 0.12, end: 0.24 },
    { el: cliTypeTwo, len: 80, x: 58, y: 214, start: 0.27, end: 0.36 },
  ];
  const duration = 12000;
  let raf = 0;
  let startTime = 0;

  lines.forEach(({ el, len }) => {
    el.setAttribute('x2', el.getAttribute('x1'));
    el.style.opacity = '0';
  });

  const setCaret = (line, progress) => {
    cliCaret.setAttribute('x', `${line.x + line.len * progress + 4}`);
    cliCaret.setAttribute('y', `${line.y - 7}`);
  };

  const setLine = (line, progress, opacity = 1) => {
    line.el.setAttribute('x2', `${line.x + line.len * progress}`);
    line.el.style.opacity = `${opacity}`;
  };

  const render = (phase) => {
    const resetFade = phase >= 0.95 ? Math.max(0, 1 - (phase - 0.95) / 0.05) : 1;

    lines.forEach((line) => {
      if (phase < line.start) {
        setLine(line, 0, 0);
        return;
      }

      const progress = Math.min(1, Math.max(0, (phase - line.start) / (line.end - line.start)));
      setLine(line, progress, resetFade);
    });

    if (phase < lines[0].end) {
      const progress = Math.min(1, Math.max(0, (phase - lines[0].start) / (lines[0].end - lines[0].start)));
      setCaret(lines[0], progress);
      return;
    }

    if (phase < lines[1].start) {
      setCaret(lines[0], 1);
      return;
    }

    const progress = Math.min(1, Math.max(0, (phase - lines[1].start) / (lines[1].end - lines[1].start)));
    setCaret(lines[1], progress);
  };

  if (reduceMotion.matches) {
    lines.forEach((line) => setLine(line, 1));
    setCaret(lines[1], 1);
    return;
  }

  const tick = (time) => {
    if (!startTime) startTime = time;
    render(((time - startTime) % duration) / duration);
    raf = window.requestAnimationFrame(tick);
  };

  raf = window.requestAnimationFrame(tick);

  reduceMotion.addEventListener('change', () => {
    window.cancelAnimationFrame(raf);
    if (reduceMotion.matches) {
      lines.forEach((line) => setLine(line, 1));
      setCaret(lines[1], 1);
      return;
    }
    raf = window.requestAnimationFrame(tick);
  });
}

initCliTyping();

/* ================= cta static grid ================= */
const ctaCanvas = document.querySelector('.cta__canvas');
if (ctaCanvas) createStaticField(ctaCanvas);
