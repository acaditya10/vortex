'use client';

import { useEffect } from 'react';
import { trackScrollDepth, trackSectionEnter, trackSectionLeave } from '@/lib/analytics';

const SECTIONS = ['work', 'capabilities', 'process', 'about', 'faq', 'contact'];
const DEPTHS = [25, 50, 75, 100];
const tracked = new Set<number>();
const sectionObservers: IntersectionObserver[] = [];

export default function AnalyticsTracker() {
  useEffect(() => {
    /* ── Scroll Depth ─────────────────────────────── */
    const onScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const percent = Math.round((scrollY / docHeight) * 100);

      for (const d of DEPTHS) {
        if (percent >= d && !tracked.has(d)) {
          tracked.add(d);
          trackScrollDepth(d);
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ── Section Visibility ───────────────────────── */
    for (const id of SECTIONS) {
      const el = document.getElementById(id);
      if (!el) continue;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              trackSectionEnter(id);
            } else {
              trackSectionLeave(id);
            }
          });
        },
        { threshold: 0.3 }
      );

      observer.observe(el);
      sectionObservers.push(observer);
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      sectionObservers.forEach((o) => o.disconnect());
      sectionObservers.length = 0;
    };
  }, []);

  return null;
}
