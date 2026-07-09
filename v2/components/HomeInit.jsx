'use client';
import { useEffect } from 'react';
import { initHome } from '@/lib/v1/home';

export default function HomeInit() {
  useEffect(() => {
    initHome();
  }, []);
  return null;
}
