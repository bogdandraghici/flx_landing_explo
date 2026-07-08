'use client';
import HeroField from '@/components/HeroField';
import AgentBuilderScene from '@/components/AgentBuilderScene';
import { bp } from '@/components/lib/base';

// Reusable page hero. background: 'field' (grid canvas) | 'scene' (node graph) | null.
// card: wrap copy in the glass card. lines: dim setup lines, big: bright accent line.
export default function Hero({ eyebrow, lines = [], big, sub, ctas = [], background = null, sceneEl = null, card = false, foot }) {
  const d = lines.length;
  const content = (
    <>
      {eyebrow && (
        <p className="hero__eyebrow mono rv-load" style={{ '--d': 0 }}>
          <span className="tick" aria-hidden="true" />{eyebrow}
        </p>
      )}
      {(lines.length > 0 || big) && (
        <h1 className="hero__title">
          {lines.map((l, i) => (
            <span key={i} className="hero__line rv-load" style={{ '--d': 1 + i }}><span className="dim">{l}</span></span>
          ))}
          {big && <span className="hero__line hero__line--big rv-load" style={{ '--d': 1 + d }}>{big}<span className="amber">.</span></span>}
        </h1>
      )}
      {sub && <p className="hero__sub rv-load" style={{ '--d': 2 + d }}>{sub}</p>}
      {ctas.length > 0 && (
        <div className="ab-hero__cta rv-load" style={{ '--d': 3 + d }}>
          {ctas.map((c, i) => (
            <a key={i} className={`btn btn--lg ${c.variant === 'ghost' ? 'btn--ghost' : 'btn--primary'}`} href={bp(c.href)}>{c.label}</a>
          ))}
        </div>
      )}
    </>
  );

  return (
    <section className={`hero tmpl-hero${card ? ' tmpl-hero--card' : ''}`} id="hero">
      {background === 'field' && <HeroField className="hero__canvas" />}
      {background === 'scene' && <AgentBuilderScene className="hero__canvas" />}
      {sceneEl}
      {(background || sceneEl) && <div className="hero__scrim" aria-hidden="true" />}
      <div className="shell hero__inner">
        {card ? <div className="ab-card">{content}</div> : content}
      </div>
      {foot && (
        <div className="hero__foot mono">
          <span>{foot.left || '[ scroll ]'}</span>
          <span className="hero__foot-right">{foot.right}</span>
        </div>
      )}
    </section>
  );
}
