'use client';
import { useEffect, useRef } from 'react';

/* Homepage "trusted by" band: the same monochrome customer logos as the
   customers page (inlined server-side so `currentColor` inherits the muted,
   theme-aware band color), scrolling in a seamless loop. Pauses on hover and
   can be dragged to scrub; freezes to a static row under prefers-reduced-motion.
   `items` = [{ name, svg }] where svg is the raw inline SVG markup. */
export default function CustomerMarquee({ items }) {
  const vpRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const vp = vpRef.current;
    const track = trackRef.current;
    if (!vp || !track) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // clone the set once for a seamless loop
    [...track.children].forEach((el) => {
      const c = el.cloneNode(true);
      c.setAttribute('aria-hidden', 'true');
      track.appendChild(c);
    });

    let setWidth = 0;
    const measure = () => { setWidth = track.scrollWidth / 2; };
    measure();
    window.addEventListener('resize', measure);

    // reduced motion: leave the (cloned) row static, no rAF loop, no drag
    if (reduce) {
      return () => window.removeEventListener('resize', measure);
    }

    const speed = 0.4;
    let offset = 0, paused = false, dragging = false, startX = 0, startOffset = 0, raf = 0;
    const wrap = () => { if (!setWidth) return; if (offset <= -setWidth) offset += setWidth; else if (offset > 0) offset -= setWidth; };
    const render = () => { track.style.transform = `translate3d(${offset}px,0,0)`; };
    const frame = () => { if (!paused && !dragging && setWidth) { offset -= speed; wrap(); render(); } raf = requestAnimationFrame(frame); };
    raf = requestAnimationFrame(frame);

    const onEnter = () => { paused = true; };
    const onLeave = () => { if (!dragging) paused = false; };
    const onDown = (e) => { dragging = true; paused = true; startX = e.clientX; startOffset = offset; vp.classList.add('is-grabbing'); try { vp.setPointerCapture(e.pointerId); } catch {} };
    const onMove = (e) => { if (!dragging) return; offset = startOffset + (e.clientX - startX); wrap(); render(); };
    const onUp = (e) => { if (!dragging) return; dragging = false; vp.classList.remove('is-grabbing'); try { vp.releasePointerCapture(e.pointerId); } catch {} paused = vp.matches(':hover'); };

    vp.addEventListener('mouseenter', onEnter);
    vp.addEventListener('mouseleave', onLeave);
    vp.addEventListener('pointerdown', onDown);
    vp.addEventListener('pointermove', onMove);
    vp.addEventListener('pointerup', onUp);
    vp.addEventListener('pointercancel', onUp);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', measure);
      vp.removeEventListener('mouseenter', onEnter); vp.removeEventListener('mouseleave', onLeave);
      vp.removeEventListener('pointerdown', onDown); vp.removeEventListener('pointermove', onMove);
      vp.removeEventListener('pointerup', onUp); vp.removeEventListener('pointercancel', onUp);
    };
  }, []);

  return (
    <div ref={vpRef} className="logo-band__vp">
      <div ref={trackRef} className="logo-band__track">
        {items.map((it) => (
          <div
            key={it.name}
            className="logo-band__logo"
            role="img"
            aria-label={it.name}
            dangerouslySetInnerHTML={{ __html: it.svg }}
          />
        ))}
      </div>
    </div>
  );
}
