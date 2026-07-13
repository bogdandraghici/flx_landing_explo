import { bp } from '@/components/lib/base';
import { absUrl, SITE_NAME } from '@/components/lib/site';
import JsonLd from '@/components/JsonLd';
import { MODELS, HF_ORG } from '@/lib/modelsData';

export const metadata = {
  title: 'FlowX — Open Models',
  description:
    'FlowX.AI open-weight models on Hugging Face: small, on-device scam detection, PII redaction, risky-clause flagging, escalation gating and ontology extraction — benchmarked against frontier models, Apache-2.0.',
};

/* One benchmark chart — reuses the horizontal track+fill bar idiom from the
   ROI calculator. Bars are 0–1 scores; width scales to the row max so the
   leader fills the track and the rest read proportionally. */
function BenchChart({ bench }) {
  const max = Math.max(...bench.bars.map((b) => b.value), 0.001);
  return (
    <div className="mbench">
      <p className="mbench__metric mono">{bench.metric}</p>
      <div className="mbench__bars">
        {bench.bars.map((b, i) => (
          <div className={`mbench__row mbench__row--${b.kind}`} key={i}>
            <span className="mbench__label">{b.label}</span>
            <span className="mbench__track">
              <span className="mbench__fill" style={{ width: `${(b.value / max) * 100}%` }} />
            </span>
            <span className="mbench__val mono">{b.value.toFixed(b.value === 1 ? 2 : 3)}</span>
          </div>
        ))}
      </div>
      <p className="mbench__note">{bench.note}</p>
    </div>
  );
}

export default function ModelsPage() {
  return (
    <main id="top">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'FlowX.AI open models',
        itemListElement: MODELS.map((m, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'SoftwareApplication',
            name: m.name,
            applicationCategory: 'Machine learning model',
            description: m.blurb,
            operatingSystem: 'Cross-platform',
            license: 'https://www.apache.org/licenses/LICENSE-2.0',
            downloadUrl: `https://huggingface.co/${m.repo}`,
            author: { '@type': 'Organization', name: SITE_NAME },
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          },
        })),
      }} />
      {/* ================= HERO ================= */}
      <section className="section roi-hero">
        <div className="shell">
          <div className="section__head">
            <span className="section__no mono">Research · Open models</span>
            <div className="section__headline">
              <h1 className="h2 rv">Small models, frontier-grade where it counts<span className="amber">.</span></h1>
              <p className="section__lede rv" style={{ '--i': 1 }}>
                Open-weight, Apache-2.0 models fine-tuned for the narrow, high-stakes jobs inside regulated
                workflows — scam detection, PII redaction, risky-clause flagging, escalation gating. Small
                enough to run on-device, benchmarked head-to-head against frontier APIs.
              </p>
              <div className="rp__actions rv" style={{ '--i': 2 }}>
                <a className="btn btn--primary btn--lg" href={HF_ORG} target="_blank" rel="noopener">
                  Download on Hugging Face ↗
                </a>
                <a className="btn btn--ghost btn--lg" href="#benchmarks">See the benchmarks</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MODEL CARDS ================= */}
      <section className="section rlist-section" id="overview">
        <div className="shell">
          <ul className="mgrid">
            {MODELS.map((m, i) => (
              <li key={m.slug} className="mcard rv" style={{ '--i': i % 3 }}>
                <div className="mcard__top">
                  <span className="mcard__params mono">{m.params}</span>
                  <span className="mcard__type mono">{m.type}</span>
                </div>
                <h3 className="mcard__name">{m.name}</h3>
                <p className="mcard__repo mono">{m.repo}</p>
                <p className="mcard__blurb">{m.blurb}</p>
                <dl className="mcard__spec">
                  <div><dt className="mono">Base</dt><dd>{m.base}</dd></div>
                  <div><dt className="mono">License</dt><dd>{m.license}</dd></div>
                </dl>
                <div className="mcard__links">
                  <a className="mcard__hf" href={`https://huggingface.co/${m.repo}`} target="_blank" rel="noopener">
                    Model card ↗
                  </a>
                  <a className="mcard__bench mono" href={`#bench-${m.slug}`}>Benchmark ↓</a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ================= BENCHMARKS ================= */}
      <section className="section mbench-section" id="benchmarks">
        <div className="shell">
          <div className="section__head">
            <span className="section__no mono">Benchmarks</span>
            <div className="section__headline">
              <h2 className="h2 rv">Measured against the frontier<span className="amber">.</span></h2>
              <p className="section__lede rv" style={{ '--i': 1 }}>
                Every number below is transcribed from the model card on Hugging Face. Scores are self-reported
                on held-out sets; frontier comparisons use the slice each card published. The point isn&apos;t to
                win every metric — it&apos;s to get frontier-class results on the specific job while running open
                and on-device.
              </p>
            </div>
          </div>

          <div className="mbench-list">
            {MODELS.map((m) => (
              <article key={m.slug} className="mbench-card rv" id={`bench-${m.slug}`}>
                <header className="mbench-card__head">
                  <div>
                    <h3 className="mbench-card__name">{m.name} <span className="mbench-card__params mono">{m.params}</span></h3>
                    <p className="mbench-card__repo mono">{m.repo}</p>
                  </div>
                  <span className={`mbench-card__tag mono${m.bench.frontier ? ' is-frontier' : ''}`}>
                    {m.bench.frontier ? 'vs frontier' : 'self-reported'}
                  </span>
                </header>
                <BenchChart bench={m.bench} />
              </article>
            ))}
          </div>

          <p className="mbench-legend mono">
            <span className="mbench-legend__key"><i className="mbench-sw mbench-sw--flowx" />FlowX model</span>
            <span className="mbench-legend__key"><i className="mbench-sw mbench-sw--frontier" />Frontier API</span>
            <span className="mbench-legend__key"><i className="mbench-sw mbench-sw--baseline" />Baseline</span>
          </p>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="section section--cta">
        <div className="shell">
          <span className="section__no mono">Get the weights</span>
          <h2 className="cta__title">
            <span>Open weights,</span>
            <span>Apache-2.0<span className="amber">.</span></span>
          </h2>
          <p className="abd-cta__sub">Pull any model from Hugging Face and run it in your own perimeter — or ask us to fine-tune one for your data.</p>
          <div className="cta__row">
            <a className="btn btn--primary btn--lg" href={HF_ORG} target="_blank" rel="noopener">Browse on Hugging Face ↗</a>
            <a className="btn btn--ghost btn--lg" href="mailto:hello@flowx.ai?subject=Fine-tuning%20a%20model">Talk to us</a>
          </div>
        </div>
      </section>
    </main>
  );
}
