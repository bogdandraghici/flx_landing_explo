import { initChrome, reduceMotion } from './shared.js';
import { createStaticField } from './orderField.js';

initChrome();

/* ================= cta static grid ================= */
const ctaCanvas = document.querySelector('.cta__canvas');
if (ctaCanvas) createStaticField(ctaCanvas);

/* ================= segment hover → highlight pipeline stages =================
   Hovering a segment card lights up the stages its agents work on and dims the
   rest of the page's schematic (each industry page has exactly one). Progressive
   enhancement — pure CSS classes, nothing breaks without hover. */
const vs = document.querySelector('.vs');
document.querySelectorAll('.seg[data-stages]').forEach((seg) => {
  const ids = seg.dataset.stages.split(' ');
  const stages = ids.flatMap((id) => [...document.querySelectorAll(`.vs-stage[data-stage="${id}"]`)]);
  if (!vs || !stages.length) return;
  seg.addEventListener('mouseenter', () => {
    vs.classList.add('vs--dimmed');
    stages.forEach((g) => g.classList.add('hot'));
  });
  seg.addEventListener('mouseleave', () => {
    vs.classList.remove('vs--dimmed');
    stages.forEach((g) => g.classList.remove('hot'));
  });
});

/* ================= featured micro-visuals ================= */
/* screener feed — same pattern as the landing's audit ticker */
const fpsFeed = document.querySelector('#fpsFeed');
const FPS_POOL = [
  ['TXN-8841', 'vendor name match', 'cleared'],
  ['TXN-8842', 'recurring payee', 'cleared'],
  ['TXN-8847', 'amount pattern typical', 'cleared'],
  ['TXN-8851', 'geo mismatch', 'escalated'],
  ['TXN-8853', 'known counterparty', 'cleared'],
  ['TXN-8860', 'velocity in range', 'cleared'],
];
let fpsIdx = 0;
function pushFps() {
  const [id, why, st] = FPS_POOL[fpsIdx % FPS_POOL.length];
  fpsIdx++;
  const r = document.createElement('div');
  r.className = 'r';
  r.innerHTML = `<span>${id} · ${why}</span><em${st === 'escalated' ? ' class="amber"' : ''}>${st}</em>`;
  fpsFeed.prepend(r);
  while (fpsFeed.children.length > 4) fpsFeed.lastChild.remove();
}
if (fpsFeed) {
  for (let i = 0; i < 4; i++) pushFps();
  if (!reduceMotion) {
    let fpsTimer = 0;
    const fpsIO = new IntersectionObserver(([e]) => {
      clearInterval(fpsTimer);
      if (e.isIntersecting) fpsTimer = setInterval(pushFps, 2200);
    });
    fpsIO.observe(fpsFeed);
  }
}

/* ================= journey pipelines: swipeable-strip edge fades =================
   The value-stream SVGs are wider than the viewport on mobile and scroll
   horizontally. Toggle can-left / can-right so the CSS edge-fade hints which
   direction still has content. On desktop the SVG fits, so no class is set. */
document.querySelectorAll('.vs__scroll').forEach((strip) => {
  const update = () => {
    const max = strip.scrollWidth - strip.clientWidth;
    strip.classList.toggle('can-left', strip.scrollLeft > 4);
    strip.classList.toggle('can-right', max > 4 && strip.scrollLeft < max - 4);
  };
  update();
  strip.addEventListener('scroll', update, { passive: true });
  addEventListener('resize', update);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(update);
});

/* rate readout — small random walk around $2.41/mi */
const rateVal = document.querySelector('#rateVal');
if (rateVal && !reduceMotion) {
  let rate = 2.41;
  const rateIO = new IntersectionObserver(([e]) => {
    clearInterval(rateVal._t);
    if (e.isIntersecting) {
      rateVal._t = setInterval(() => {
        rate = Math.min(2.6, Math.max(2.2, rate + (Math.random() - 0.5) * 0.04));
        rateVal.textContent = rate.toFixed(2);
      }, 1400);
    }
  });
  rateIO.observe(rateVal);
}
