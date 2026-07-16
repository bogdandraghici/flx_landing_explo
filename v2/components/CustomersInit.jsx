'use client';
import { useEffect } from 'react';
import { createStaticField } from '@/lib/v1/orderField';

/* Customers page has no bespoke interactions — it only needs the CTA
   section's static order-field canvas, same as every other page. */
export default function CustomersInit() {
  useEffect(() => {
    const ctaCanvas = document.querySelector('.cta__canvas');
    if (ctaCanvas) createStaticField(ctaCanvas);
  }, []);
  return null;
}
