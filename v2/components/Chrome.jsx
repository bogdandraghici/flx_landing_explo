'use client';
import { useEffect } from 'react';
import { initChrome } from '@/lib/v1/shared';

/* Runs v1's shared page chrome once after mount: theme toggle, grain overlay,
   nav scroll state, mega-menu disclosure + mobile drawer, scroll reveals, year.
   Nav/Footer are static server markup, so this external DOM enhancement is safe. */
export default function Chrome() {
  useEffect(() => {
    initChrome();
  }, []);
  return null;
}
