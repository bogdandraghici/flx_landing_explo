'use client';
import { useEffect } from 'react';
import { createStaticField } from '@/lib/v1/orderField';

/* Pages whose only page-specific visual is the static field behind the CTA. */
export default function CtaFieldInit() {
  useEffect(() => {
    const c = document.querySelector('.cta__canvas');
    if (c) createStaticField(c);
  }, []);
  return null;
}
