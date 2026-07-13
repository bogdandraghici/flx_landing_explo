'use client';

/* "Book a demo" modal. Opens on the #demo hash (any <a href="#demo"> triggers
   it) and embeds FlowX.AI's real HubSpot demo form — the same portal/form the
   flowx.ai site uses — so submissions land in the same CRM with the correct
   fields. Styled to the v2 system via the .demo CSS. */

import { useEffect, useRef, useState } from 'react';

const HS = { portalId: '14487887', formId: '30621fa3-f5f7-4a66-8df9-f7e74cda9b03', region: 'na1' };
const SCRIPT = 'https://js.hsforms.net/forms/embed/v2.js';

export default function DemoModal() {
  const [open, setOpen] = useState(false);
  const created = useRef(false);

  // open when the URL hash is #demo
  useEffect(() => {
    const sync = () => setOpen(window.location.hash === '#demo');
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  const close = () => {
    if (window.location.hash === '#demo') history.replaceState(null, '', window.location.pathname + window.location.search);
    setOpen(false);
  };

  // lock scroll + load HubSpot + render the form once
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);

    const build = () => {
      if (created.current || !window.hbspt) return;
      created.current = true;
      window.hbspt.forms.create({ ...HS, target: '#hs-demo-form' });
    };
    if (window.hbspt) {
      build();
    } else if (!document.querySelector(`script[src="${SCRIPT}"]`)) {
      const s = document.createElement('script');
      s.src = SCRIPT; s.async = true; s.onload = build;
      document.body.appendChild(s);
    } else {
      const t = setInterval(() => { if (window.hbspt) { clearInterval(t); build(); } }, 120);
      setTimeout(() => clearInterval(t), 8000);
    }
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [open]);

  if (!open) return null;

  return (
    <div className="demo" onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
      <div className="demo__card" role="dialog" aria-modal="true" aria-labelledby="demo-title">
        <button type="button" className="demo__close" aria-label="Close" onClick={close}>×</button>
        <h2 className="demo__title" id="demo-title">Accelerate mission-critical value streams with our AI agents</h2>
        <p className="demo__sub mono">Schedule a customized demo</p>
        <div id="hs-demo-form" className="demo__form">
          <p className="demo__loading mono">Loading form…</p>
        </div>
      </div>
    </div>
  );
}
