import { initChrome } from './shared.js';
import { createStaticField } from './orderField.js';

initChrome();

/* ================= cta static grid ================= */
const ctaCanvas = document.querySelector('.cta__canvas');
if (ctaCanvas) createStaticField(ctaCanvas);

/* ================= mission double helix =================
   each rung is a horizontal base-pair that spins around the vertical axis;
   staggering the phase down the stack traces the twisting double strand.
   Purely decorative (aria-hidden); CSS drives all motion, so reduced-motion
   collapses it to a static ladder. */
const dna = document.querySelector('.dna');
if (dna) {
  const RUNGS = 18;
  for (let i = 0; i < RUNGS; i++) {
    const rung = document.createElement('span');
    rung.className = 'dna__rung';
    rung.style.setProperty('--i', String(i));
    rung.innerHTML =
      '<i class="dna__bar"></i><i class="dna__node dna__node--a"></i><i class="dna__node dna__node--b"></i>';
    dna.appendChild(rung);
  }
}

/* ================= office clocks =================
   live local time per office — content, not decoration, so it also runs
   under prefers-reduced-motion */
const clocks = document.querySelectorAll('.off__clock[data-tz]');
if (clocks.length) {
  const formats = new Map(
    [...clocks].map((el) => [
      el,
      new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: el.dataset.tz,
      }),
    ])
  );
  const tick = () => formats.forEach((fmt, el) => (el.textContent = fmt.format(new Date())));
  tick();
  setInterval(tick, 1000);
}
