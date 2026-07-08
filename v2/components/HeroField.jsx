'use client';
import { useEffect, useRef } from 'react';
import { createField } from './field.js';

export default function HeroField({ className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const field = createField(ref.current);
    return () => field.destroy?.();
  }, []);
  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
