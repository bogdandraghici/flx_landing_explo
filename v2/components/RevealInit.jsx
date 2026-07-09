'use client';
import { useEffect } from 'react';

// Observes all .rv elements and adds .in when they enter the viewport.
export default function RevealInit() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    document.querySelectorAll('.rv').forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);
  return null;
}
