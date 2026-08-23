'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';

const useBrowserEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
import gsap from 'gsap';

const STEPS = [
  {
    title: 'DISCOVERY',
    body: "A focused technical conversation about your business, your audience and what success looks like. No pitch.",
  },
  {
    title: 'SCOPE',
    body: 'Deliverables, architecture and investment defined precisely. Nothing begins until you approve it.',
  },
  {
    title: 'DESIGN',
    body: 'Interface, motion language and content structure explored at high fidelity — reviewed directly with the person who will build it.',
  },
  {
    title: 'BUILD',
    body: 'Design lands as production code. Performance-tested, content-ready, zero translation loss.',
  },
  {
    title: 'LAUNCH & HANDOVER',
    body: 'Deployment, analytics, documentation, clean handover. You own everything — permanently.',
  },
];

export default function Protocol() {
  const sectionRef = useRef<HTMLElement>(null);

  useBrowserEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              gsap.timeline()
                .fromTo(
                  section.querySelector('[data-pro-heading]'),
                  { opacity: 0, y: 30 },
                  { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
                )
                .fromTo(
                  section.querySelectorAll('[data-pro-step]'),
                  { opacity: 0, y: 20 },
                  { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.08 },
                  '-=0.3'
                );

              observer.disconnect();
            }
          });
        },
        { threshold: 0.15 }
      );

      observer.observe(section);
      return () => observer.disconnect();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative z-10 border-t border-gray-900 bg-[var(--bg)] px-6 py-24 sm:px-10 sm:py-32 lg:pl-[7vw] lg:pr-[7vw]"
    >
      <div className="lg:grid lg:grid-cols-[35%_65%]">
        <div className="pb-14 lg:sticky lg:top-24 lg:self-start lg:pb-0 lg:pr-20">
          <p className="font-mono text-[10px] tracking-[0.35em] text-[var(--fg-dim)]">
            <span className="text-[var(--accent)]">05</span> {"// OPERATING PROTOCOL"}
          </p>

          <h2
            data-pro-heading
            className="mt-6 text-[clamp(2.5rem,5.5vw,4.25rem)] font-extrabold leading-[0.95] tracking-[-0.03em] text-[var(--fg)] opacity-0"
          >
            How builds happen.
          </h2>

          <div className="divider mt-8 w-16 origin-left" />

          <p className="mt-8 max-w-xs text-sm font-light leading-relaxed tracking-wide text-[var(--fg-muted)]">
            Five phases. One accountable operator at every step — the same person who scopes
            your build is the person who ships it.
          </p>
        </div>

        <ol>
          {STEPS.map((step, i) => (
            <li
              key={step.title}
              data-pro-step
              className="group/step grid grid-cols-[auto_1fr] gap-6 border-t border-white/5 py-8 transition-colors duration-500 first:border-t-0 hover:bg-white/[0.015] sm:gap-10 sm:py-10 lg:first:border-t lg:first:pt-10"
            >
              <span className="pt-1 font-mono text-[11px] tracking-[0.3em] text-[var(--fg-dim)] transition-colors duration-500 group-hover/step:text-[var(--accent)]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="font-mono text-sm font-medium tracking-[0.15em] text-[var(--fg)]">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-xl text-sm font-light leading-relaxed tracking-wide text-gray-400 sm:text-base">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
          <li className="border-t border-white/5" aria-hidden="true" />
        </ol>
      </div>
    </section>
  );
}
