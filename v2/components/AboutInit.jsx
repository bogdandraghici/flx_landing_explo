'use client';
import { useEffect } from 'react';
import { initAbout } from '@/lib/v1/about';

export default function AboutInit() {
  useEffect(() => {
    initAbout();
  }, []);
  return null;
}
