'use client';
import { useEffect, useRef } from 'react';
import { bp } from './lib/base';

const LOGOS = [
  ['UniCredit', '/assets/partners/unicredit.svg'],
  ['OTP Bank', '/assets/partners/otp-bank.svg'],
  ['Banca Transilvania', '/assets/customers/banca-transilvania.svg'],
  ['Triglav', '/assets/customers/triglav.svg'],
  ['BNP Paribas', '/assets/partners/bnp-paribas.svg'],
  ['State Street', '/assets/customers/state-street.svg'],
  ['Signal Iduna', '/assets/customers/signal-iduna.svg'],
  ['Legal & General', '/assets/partners/legal-and-general.svg'],
  ['Asirom', '/assets/partners/asirom.svg'],
  ['IBM', '/assets/customers/ibm.svg'],
  ['Kyndryl', '/assets/partners/kyndryl.svg'],
  ['Stefanini', '/assets/partners/stefanini.svg'],
];

export default function LogoStrip() {
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

    const speed = reduce ? 0 : 0.4;
    let offset = 0, paused = false, dragging = false, startX = 0, startOffset = 0, raf = 0;
    const wrap = () => { if (!setWidth) return; if (offset <= -setWidth) offset += setWidth; else if (offset > 0) offset -= setWidth; };
    const render = () => { track.style.transform = `translate3d(${offset}px,0,0)`; };
    const frame = () => { if (!paused && !dragging && setWidth) { offset -= speed; wrap(); render(); } raf = requestAnimationFrame(frame); };
    raf = requestAnimationFrame(frame);

    const onEnter = () => { paused = true; };
    const onLeave = () => { if (!dragging) paused = false; };
    const onDown = (e) => { dragging = true; paused = true; startX = e.clientX; startOffset = offset; vp.classList.add('cursor-grabbing'); try { vp.setPointerCapture(e.pointerId); } catch {} };
    const onMove = (e) => { if (!dragging) return; offset = startOffset + (e.clientX - startX); wrap(); render(); };
    const onUp = (e) => { if (!dragging) return; dragging = false; vp.classList.remove('cursor-grabbing'); try { vp.releasePointerCapture(e.pointerId); } catch {} paused = vp.matches(':hover'); };

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
    <section aria-label="Trusted by leading financial institutions" className="py-[clamp(36px,6vh,64px)] border-b border-line-soft">
      <div className="max-w-[1360px] mx-auto px-[clamp(20px,5vw,72px)]">
        <p className="text-center text-[10.5px] tracking-[0.2em] uppercase text-faint mb-[clamp(24px,4vh,40px)] font-mono">Trusted by leading financial institutions</p>
      </div>
      <div
        ref={vpRef}
        className="overflow-hidden cursor-grab touch-pan-y [mask-image:linear-gradient(90deg,transparent,#000_7%,#000_93%,transparent)]"
      >
        <div ref={trackRef} className="flex w-max items-center will-change-transform">
          {LOGOS.map(([alt, src]) => (
            <div key={alt} className="flex-none flex items-center justify-center px-[clamp(28px,4vw,56px)] h-14">
              <img src={bp(src)} alt={alt} draggable="false" className="h-[30px] w-auto opacity-50 hover:opacity-100 transition-opacity select-none pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
