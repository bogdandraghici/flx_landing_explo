'use client';
import { useEffect } from 'react';

/* v1 kept /agents alive as a redirect to /banking (the agents directory became
   the three industry pages). Static-export-friendly client redirect. */
export default function Agents() {
  useEffect(() => {
    window.location.replace('/banking');
  }, []);
  return (
    <main id="top">
      <section className="section">
        <div className="shell">
          <p className="section__lede">The agents directory is now organized by industry — <a href="/banking">continue to Banking</a>.</p>
        </div>
      </section>
    </main>
  );
}
