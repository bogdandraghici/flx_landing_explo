'use client';
import { useEffect, useRef } from 'react';
import { createPolicyGate } from '@/lib/v1/policyGate';

/* The mission section's "policy gate" illustration: many creators on the left,
   production on the right, one policy gate between — packets earn the accent
   only after passing inspection. Decorative canvas; the plain-language claim
   lives in the copy above it. */
export default function PolicyGateViz() {
  const ref = useRef(null);
  useEffect(() => {
    const inst = createPolicyGate(ref.current);
    return () => inst.destroy();
  }, []);
  return (
    <figure
      className="mgate rv"
      style={{ '--i': 2 }}
      role="img"
      aria-label="Many creators on the left flow through a single policy gate to production on the right; work is only marked safe once it has passed inspection."
    >
      <canvas ref={ref} className="mgate__cvs" aria-hidden="true" />
    </figure>
  );
}
