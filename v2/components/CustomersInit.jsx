'use client';
import { useEffect } from 'react';
import { createStaticField } from '@/lib/v1/orderField';

/* Customers page: the CTA section's static order-field canvas, plus the
   outcome stat count-ups — same behaviour as the landing page's proof
   section (count on scroll into view, honor reduced motion). */
export default function CustomersInit() {
  useEffect(() => {
    const ctaCanvas = document.querySelector('.cta__canvas');
    if (ctaCanvas) createStaticField(ctaCanvas);

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function countUp(el) {
      const target = parseFloat(el.dataset.count);
      const dec = parseInt(el.dataset.dec, 10);
      if (reduce) { el.textContent = target.toFixed(dec); return; }
      const t0 = performance.now();
      const step = (now) => {
        const p = Math.min((now - t0) / 1400, 1);
        const eased = 1 - Math.pow(1 - p, 4);
        el.textContent = (target * eased).toFixed(dec);
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) { countUp(e.target); io.unobserve(e.target); }
      }
    }, { threshold: 0.6 });
    document.querySelectorAll('.cust-out-section .stats__num').forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);
  return null;
}
