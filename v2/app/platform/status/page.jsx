import { bp } from '@/components/lib/base';
import StatusTime from '@/components/StatusTime';

export const metadata = {
  title: 'Platform Status',
  description:
    'Live operational status of the FlowX.AI platform, API and integrations across the US and EU regions, with 90-day uptime and incident history.',
};

/* Illustrative status data. Each component carries a 90-day history built from a
   fixed set of past incidents (deterministic — no build-time randomness).
   "up" = operational, "degraded" = partial, "down" = outage. */
const DAYS = 90;
function history(incidents = []) {
  const arr = Array.from({ length: DAYS }, () => 'up');
  for (const inc of incidents) {
    const idx = DAYS - 1 - inc.at; // at = days ago (0 = today)
    if (idx >= 0 && idx < DAYS) arr[idx] = inc.status;
  }
  return arr;
}
const LOSS = { up: 0, degraded: 0.15, down: 1 };
function uptime(arr) {
  const lost = arr.reduce((s, d) => s + (LOSS[d] || 0), 0);
  return (((DAYS - lost) / DAYS) * 100).toFixed(2);
}

const REGIONS = [
  {
    id: 'us', label: 'United States', sub: 'us-east · primary',
    comps: [
      { name: 'Platform', incidents: [] },
      { name: 'API', incidents: [{ at: 71, status: 'degraded' }] },
      { name: 'Integrations', incidents: [] },
    ],
  },
  {
    id: 'eu', label: 'European Union', sub: 'eu-central · primary',
    comps: [
      { name: 'Platform', incidents: [] },
      { name: 'API', incidents: [] },
      { name: 'Integrations', incidents: [{ at: 38, status: 'degraded' }] },
    ],
  },
];

const INCIDENTS = [
  { title: 'Elevated API latency', scope: 'United States · API', ago: '71 days ago', dur: '34 min', level: 'degraded', note: 'A subset of API requests saw increased latency. Mitigated by scaling the request tier; no data was affected.' },
  { title: 'Delayed integration webhooks', scope: 'European Union · Integrations', ago: '38 days ago', dur: '1 h 12 min', level: 'degraded', note: 'Outbound webhook delivery was delayed for some connectors. Recovered after a queue drain; all events were delivered.' },
];

const STATUS_LABEL = { up: 'Operational', degraded: 'Degraded', down: 'Outage' };

function Row({ c }) {
  const arr = history(c.incidents);
  const now = arr[DAYS - 1];
  return (
    <div className="st-row">
      <div className="st-row__head">
        <span className="st-row__name">{c.name}</span>
        <span className={`st-badge is-${now}`}><i className="st-dot" />{STATUS_LABEL[now]}</span>
      </div>
      <div className="st-bars" aria-hidden="true">
        {arr.map((d, i) => <i key={i} className={`st-bar is-${d}`} />)}
      </div>
      <div className="st-row__foot mono">
        <span>90 days ago</span>
        <span>{uptime(arr)}% uptime</span>
        <span>Today</span>
      </div>
    </div>
  );
}

export default function StatusPage() {
  const allUp = REGIONS.every((r) => r.comps.every((c) => history(c.incidents)[DAYS - 1] === 'up'));

  return (
    <main id="top">
      {/* ================= HEADER ================= */}
      <section className="section st-hero">
        <div className="shell shell--narrow">
          <p className="section__no mono">Platform · Status</p>
          <div className={`st-banner is-${allUp ? 'up' : 'degraded'}`}>
            <span className="st-banner__dot" />
            <span className="st-banner__title">{allUp ? 'All systems operational' : 'Some systems degraded'}</span>
            <StatusTime />
          </div>
        </div>
      </section>

      {/* ================= COMPONENTS BY REGION ================= */}
      <section className="section st-body">
        <div className="shell shell--narrow">
          {REGIONS.map((r) => (
            <div key={r.id} className="st-region">
              <div className="st-region__head">
                <h2 className="st-region__label">{r.label}</h2>
                <span className="st-region__sub mono">{r.sub}</span>
              </div>
              {r.comps.map((c) => <Row key={c.name} c={c} />)}
            </div>
          ))}

          <div className="st-legend mono">
            <span><i className="st-dot is-up" />Operational</span>
            <span><i className="st-dot is-degraded" />Degraded</span>
            <span><i className="st-dot is-down" />Outage</span>
          </div>

          {/* ================= INCIDENT HISTORY ================= */}
          <div className="st-incidents">
            <h2 className="st-incidents__h">Past incidents</h2>
            {INCIDENTS.length === 0 ? (
              <p className="st-incidents__none mono">No incidents reported in the last 90 days.</p>
            ) : (
              <ul className="st-incidents__list">
                {INCIDENTS.map((inc, i) => (
                  <li key={i} className="st-incident">
                    <div className="st-incident__top">
                      <span className={`st-badge is-${inc.level}`}><i className="st-dot" />{inc.title}</span>
                      <span className="st-incident__meta mono">{inc.scope} · {inc.ago} · {inc.dur}</span>
                    </div>
                    <p className="st-incident__note">{inc.note} <span className="amber">Resolved.</span></p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <p className="st-note mono">
            Illustrative status page. For a production SLA and live monitoring on your deployment, <a href="mailto:hello@flowx.ai?subject=FlowX%20status%20%26%20SLA">talk to us</a>.
          </p>
        </div>
      </section>
    </main>
  );
}
