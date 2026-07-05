import { initChrome } from './shared.js';
import { createStaticField } from './orderField.js';

initChrome();

/* ================= cta static grid ================= */
const ctaCanvas = document.querySelector('.cta__canvas');
if (ctaCanvas) createStaticField(ctaCanvas);

/* ================= segment hover → highlight pipeline stages =================
   Hovering a segment card lights up the stages its agents work on and dims the
   rest of that section's schematic. Progressive enhancement — pure CSS classes,
   nothing breaks without hover (touch devices simply never trigger it). */
document.querySelectorAll('.seg[data-stages]').forEach((seg) => {
  const section = seg.closest('section');
  const vs = section.querySelector('.vs');
  const ids = seg.dataset.stages.split(' ');
  const stages = ids.flatMap((id) => [...section.querySelectorAll(`.vs-stage[data-stage="${id}"]`)]);
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
