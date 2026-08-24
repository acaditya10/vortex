/**
 * GA4 event tracking helpers.
 * Wraps gtag('event', ...) so components don't need to know about the global.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function send(name: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', name, params);
  }
}

/* ── CTA / Button Clicks ──────────────────────────── */

export function trackCTAClick(location: string) {
  send('cta_click', { location });
}

/* ── Form Events ──────────────────────────────────── */

export function trackFormSubmit() {
  send('form_submit', { form_name: 'discovery_request' });
}

export function trackFormError(error?: string) {
  send('form_error', { form_name: 'discovery_request', error });
}

/* ── Exhibit Interactions ─────────────────────────── */

export function trackExhibitClick(project: string, action: 'video_play' | 'image_reveal') {
  send('exhibit_click', { project, action });
}

/* ── Cal.com Scheduling ───────────────────────────── */

export function trackScheduleClick(source: string) {
  send('schedule_click', { source });
}

/* ── External Links ───────────────────────────────── */

export function trackExternalLink(url: string, label: string) {
  send('external_link', { url, label });
}

/* ── Scroll Depth ─────────────────────────────────── */

const tracked = new Set<string>();

export function trackScrollDepth(percent: number) {
  const key = `scroll_${percent}`;
  if (tracked.has(key)) return;
  tracked.add(key);
  send('scroll_depth', { percent });
}

/* ── Section Visibility ───────────────────────────── */

const sectionTimes = new Map<string, number>();

export function trackSectionEnter(section: string) {
  sectionTimes.set(section, Date.now());
}

export function trackSectionLeave(section: string) {
  const start = sectionTimes.get(section);
  if (start) {
    const duration = Math.round((Date.now() - start) / 1000);
    if (duration > 2) {
      send('section_engagement', { section, duration_seconds: duration });
    }
    sectionTimes.delete(section);
  }
}
