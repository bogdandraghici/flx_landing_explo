'use client';

/* GDPR cookie consent banner. Shows on first visit until the user makes a
   choice; the choice (all | necessary) is stored in localStorage and re-emitted
   as a `cookieconsent` event so any future analytics/marketing scripts can gate
   on it. Reject is given equal prominence to Accept (GDPR). No trackers are
   loaded by this site today — this records and honours consent for when they are. */

import { useEffect, useState } from 'react';
import { bp } from '@/components/lib/base';

const KEY = 'flx-cookie-consent';

export default function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let choice = null;
    try { choice = localStorage.getItem(KEY); } catch {}
    if (choice !== 'all' && choice !== 'necessary') setOpen(true);
  }, []);

  const decide = (choice) => {
    try { localStorage.setItem(KEY, choice); } catch {}
    try { window.dispatchEvent(new CustomEvent('cookieconsent', { detail: { choice } })); } catch {}
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="cc" role="dialog" aria-modal="false" aria-label="Cookie consent">
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
