'use client';
import { useEffect, useRef } from 'react';
import { createCheckpointRings } from '@/lib/v1/checkpointRings';

/* The mission section's "checkpoint rings" illustration: sources converge onto
   one governed line that passes through three circular checkpoints (policy →
   verify → sign); each ring pulses as a packet clears it, and work earns the
   accent only after the final gate. Decorative canvas; the plain-language claim
   lives in the copy above it. */
export default function CheckpointRingsViz() {
  const ref = useRef(null);
  useEffect(() => {
    const inst = createCheckpointRings(ref.current);
    return () => inst.destroy();
  }, []);
  return (
    <figure
      className="mgate rv"
      style={{ '--i': 2 }}
      role="img"
      aria-label="Sources on the left converge onto a single governed line that passes through three checkpoints — policy, verify, and sign — before reaching production on the right; work is only marked safe once it has cleared the final checkpoint."
    >
      <canvas ref={ref} className="mgate__cvs" aria-hidden="true" />
    </figure>
  );
}
