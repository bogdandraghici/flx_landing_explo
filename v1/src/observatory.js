import { initChrome } from './shared.js';
import { createStaticField } from './orderField.js';

initChrome();

/* ================= cta static grid ================= */
const ctaCanvas = document.querySelector('.cta__canvas');
if (ctaCanvas) createStaticField(ctaCanvas);
