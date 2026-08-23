'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    Cal?: {
      (method: string, ...args: unknown[]): void;
      ns?: Record<string, { q?: unknown[] }>;
    };
  }
}

interface CalEmbedProps {
  calLink: string;
  namespace?: string;
  name?: string;
  email?: string;
  notes?: string;
}

export default function CalEmbed({
  calLink,
  namespace = 'acaditya10',
  name,
  email,
  notes,
}: CalEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current || !containerRef.current) return;

    const tryInit = () => {
      const C = window.Cal;
      if (!C) return false;

      try {
        C('inline', {
          elementOrSelector: containerRef.current,
          calLink,
          layout: 'month_view',
          prefill: {
            ...(name ? { name } : {}),
            ...(email ? { email } : {}),
            ...(notes ? { notes } : {}),
          },
        });

        C('ui', {
          theme: 'dark',
          hideEventTypeDetails: false,
          layout: 'month_view',
          cssVarsPerTheme: {
            dark: {
              'cal-brand': '#C8B6A2',
              'cal-brand-emphasis': '#DED0C2',
              'cal-brand-text': '#0A0A0A',
              'cal-brand-subtle': '#8A8580',
              'cal-brand-accent': '#0A0A0A',
              'cal-text': '#8A8580',
              'cal-text-emphasis': '#E8E4DE',
              'cal-text-subtle': '#6B6560',
              'cal-text-muted': '#4A4744',
              'cal-text-inverted': '#0A0A0A',
              'cal-bg': '#0A0A0A',
              'cal-bg-emphasis': '#1A1A1A',
              'cal-bg-subtle': '#141414',
              'cal-bg-muted': '#111111',
              'cal-bg-inverted': '#E8E4DE',
              'cal-border': 'rgba(255,255,255,0.08)',
              'cal-border-emphasis': 'rgba(255,255,255,0.15)',
              'cal-border-subtle': 'rgba(255,255,255,0.06)',
              'cal-border-muted': 'rgba(255,255,255,0.04)',
              'cal-border-booker': 'rgba(255,255,255,0.08)',
              'cal-border-booker-width': '1px',
              'radius': '0px',
              'spacing': '1rem',
            },
          },
        });

        initializedRef.current = true;
        return true;
      } catch {
        return false;
      }
    };

    // Try immediately
    if (tryInit()) return;

    // Retry with MutationObserver
    const observer = new MutationObserver(() => {
      if (tryInit()) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [calLink, name, email, notes]);

  return (
    <div
      ref={containerRef}
      id="cal-inline-target"
      className="cal-embed-wrapper"
    />
  );
}
