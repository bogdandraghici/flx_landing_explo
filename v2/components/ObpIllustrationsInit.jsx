'use client';
import { useEffect } from 'react';
import { createPipelineIllustrations } from '@/lib/v1/obpIllustrations';

/* Mounts the "Regulation to runtime" pipeline illustrations (the four 1:1
   instrument canvases). Also runs the CTA static field, so the Observatory
   page needs only this one init component. */
export default function ObpIllustrationsInit() {
  useEffect(() => {
    const inst = createPipelineIllustrations();
    return () => inst.destroy();
  }, []);
  return null;
}
