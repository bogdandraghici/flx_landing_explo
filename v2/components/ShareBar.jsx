'use client';

/* Social share row for blog articles. The build-time `url` is the canonical
   absolute URL; at click time we prefer the live window.location so it works on
   any host (localhost, Pages, a future domain). Copy-link uses the clipboard
   API with a graceful fallback. v2 styling, amber on hover. */

import { useState } from 'react';

export default function ShareBar({ title, url }) {
  const [copied, setCopied] = useState(false);

  const href = () => (typeof window !== 'undefined' ? window.location.href : url);
  const share = (kind) => {
    const u = encodeURIComponent(href());
    const t = encodeURIComponent(title);
    const map = {
      x: `https://twitter.com/intent/tweet?url=${u}&text=${t}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
      email: `mailto:?subject=${t}&body=${u}`,
    };
    window.open(map[kind], kind === 'email' ? '_self' : '_blank', 'noopener,noreferrer,width=600,height=520');
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(href());
    } catch {
      const ta = document.createElement('textarea');
      ta.value = href();
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); } catch {}
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="share">
      <span className="share__label mono">Share</span>
      <button type="button" className="share__btn" aria-label="Share on X" onClick={() => share('x')}>
        <svg viewBox="0 0 24 24" aria-hidden="true" width="15" height="15"><path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817-5.966 6.817H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
      </button>
      <button type="button" className="share__btn" aria-label="Share on LinkedIn" onClick={() => share('linkedin')}>
        <svg viewBox="0 0 24 24" aria-hidden="true" width="15" height="15"><path fill="currentColor" d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13M7.12 20.45H3.55V9h3.57zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0" /></svg>
      </button>
      <button type="button" className="share__btn" aria-label="Share by email" onClick={() => share('email')}>
        <svg viewBox="0 0 24 24" aria-hidden="true" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
      </button>
      <button type="button" className="share__btn share__btn--copy" aria-label="Copy link" onClick={copy}>
        {copied ? (
          <span className="share__copied mono">Copied</span>
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden="true" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" /><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" /></svg>
        )}
      </button>
    </div>
  );
}
