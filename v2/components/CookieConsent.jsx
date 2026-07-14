'use client';

/* GDPR cookie consent. Stays out of the way: nothing shows on first paint —
   a small "Cookies" pill fades into the corner only after a short delay (or as
   soon as the visitor scrolls), whichever comes first, so it never competes
   with the first impression. Clicking the pill expands the full Accept/Reject
   panel; the "×" collapses back to the pill. The choice (all | necessary) is
   stored in localStorage and re-emitted as a `cookieconsent` event so any
   future analytics/marketing scripts can gate on it. Reject is given equal
   prominence to Accept (GDPR). No trackers are loaded by this site today — this
   records and honours consent for when they are. */

import { useEffect, useState } from 'react';
import { bp } from '@/components/lib/base';

const KEY = 'flx-cookie-consent';
const REVEAL_DELAY = 4000; // ms before the pill appears if the visitor hasn't scrolled

export default function CookieConsent() {
  // Assume decided until we've checked storage, so nothing flashes on hydration.
  const [decided, setDecided] = useState(true);
  const [revealed, setRevealed] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    let choice = null;
    try { choice = localStorage.getItem(KEY); } catch {}
    if (choice === 'all' || choice === 'necessary') return; // already decided — stay hidden
    setDecided(false);

    let done = false;
    const reveal = () => {
      if (done) return;
      done = true;
      setRevealed(true);
      window.removeEventListener('scroll', onScroll);
    };
    const onScroll = () => reveal();
    const timer = setTimeout(reveal, REVEAL_DELAY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { clearTimeout(timer); window.removeEventListener('scroll', onScroll); };
  }, []);

  const decide = (choice) => {
    try { localStorage.setItem(KEY, choice); } catch {}
    try { window.dispatchEvent(new CustomEvent('cookieconsent', { detail: { choice } })); } catch {}
    setDecided(true);
  };

  if (decided || !revealed) return null;

  if (!expanded) {
    return (
      <button
        type="button"
        className="cc-pill"
        aria-expanded="false"
        aria-controls="cc-panel"
        onClick={() => setExpanded(true)}
      >
        <svg className="cc-pill__ico" width="15" height="15" viewBox="0 0 16 16" aria-hidden="true">
          <circle cx="8" cy="8" r="6.6" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="5.8" cy="6" r="0.95" fill="currentColor" />
          <circle cx="10.2" cy="6.6" r="0.95" fill="currentColor" />
          <circle cx="7" cy="10" r="0.95" fill="currentColor" />
          <circle cx="10.4" cy="10.2" r="0.7" fill="currentColor" />
        </svg>
        Cookies
      </button>
    );
  }

  return (
    <div className="cc" id="cc-panel" role="dialog" aria-modal="false" aria-label="Cookie consent">
      <button type="button" className="cc__min" aria-label="Minimize" onClick={() => setExpanded(false)}>
        ×
      </button>
      <div className="cc__body">
        <p className="cc__text">
          We use cookies to run the site and, with your consent, to measure and improve it. See our{' '}
          <a href={bp('/cookie-policy')}>Cookie Policy</a>.
        </p>
        <div className="cc__actions">
          <button type="button" className="btn btn--ghost btn--sm" onClick={() => decide('necessary')}>
            Reject non-essential
          </button>
          <button type="button" className="btn btn--primary btn--sm" onClick={() => decide('all')}>
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
