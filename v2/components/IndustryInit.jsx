'use client';
import { useEffect } from 'react';
import { initIndustry } from '@/lib/v1/industry';

export default function IndustryInit() {
  useEffect(() => {
    initIndustry();
  }, []);
  return null;
}
