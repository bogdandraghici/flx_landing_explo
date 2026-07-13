'use client';

/* Client-only "last checked" timestamp for the status page. Rendered on the
   client so the static export stays deterministic (no build-time Date()). */
import { useEffect, useState } from 'react';

export default function StatusTime() {
  const [t, setT] = useState('');
  useEffect(() => {
    const fmt = () => new Date().toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short', month: 'short', day: 'numeric' });
    setT(fmt());
    const id = setInterval(() => setT(fmt()), 60000);
    return () => clearInterval(id);
  }, []);
  return <span className="st-time mono">{t ? `Checked ${t}` : 'Checking…'}</span>;
}
