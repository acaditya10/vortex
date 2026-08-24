'use client';

import { useEffect } from 'react';
import { onCLS, onINP, onLCP, type Metric } from 'web-vitals';

function sendToGA({ name, delta, id }: Metric) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', name, {
      event_category: 'Core Web Vitals',
      event_label: id,
      value: Math.round(name === 'CLS' ? delta * 1000 : delta),
      non_interaction: true,
    });
  }
}

export default function WebVitals() {
  useEffect(() => {
    onLCP(sendToGA);
    onINP(sendToGA);
    onCLS(sendToGA);
  }, []);

  return null;
}
