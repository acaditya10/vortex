'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';

const useBrowserEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
import gsap from 'gsap';

const DISCIPLINES = [
  {
    title: 'NEXT.JS / REACT',
    body: 'Production-grade builds on modern React. Headless architecture, typed end-to-end, deployed to the edge.',
  },
  {
    title: 'MOTION & INTERACTION',
    body: 'GSAP choreography, kinetic typography and scroll systems tuned until they feel engineered — never decorative.',
  },
  {
    title: 'HEADLESS SHOPIFY',
    body: "Decoupled storefronts that bypass template rigidity. Instant loads, full design control, zero backend disruption.",
  },
  {
    title: 'CMS PIPELINES',
    body: 'Serverless editing workflows that let non-technical teams ship content safely — without touching code.',
  },
  {
    title: 'PERFORMANCE ENGINEERING',
    body: 'Core Web Vitals treated as features. Image pipelines, edge delivery and LCP budgets enforced from day one.',
  },
  {
    title: 'SEO FOUNDATIONS',
    body: 'Technical SEO, structured metadata and analytics wired into every build — not bolted on after launch.',
  },
];

export default function Capabilities() {
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
                  section.querySelector('[data-cap-heading]'),
                  { opacity: 0, y: 30 },
                  { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
                )
                .fromTo(
                  section.querySelectorAll('[data-cap-cell]'),
                  { opacity: 0, y: 24 },
                  { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.06 },
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
      id="capabilities"
      className="relative z-10 border-t border-gray-900 bg-[var(--bg)] px-6 py-24 sm:px-10 sm:py-32 lg:pl-[7vw] lg:pr-[7vw]"
    >
      <p className="font-mono text-[10px] tracking-[0.35em] text-[var(--fg-dim)]">
        <span className="text-[var(--accent)]">04</span> {"// CORE DISCIPLINES"}
      </p>

      <h2
        data-cap-heading
        className="mt-6 max-w-3xl text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[0.95] tracking-[-0.03em] text-[var(--fg)] opacity-0"
      >
        Everything a build needs.
      </h2>

      <div className="divider mt-8 w-16 origin-left" />

      <div className="mt-14 grid grid-cols-1 gap-px border border-white/5 bg-white/5 sm:mt-16 md:grid-cols-2 xl:grid-cols-3">
        {DISCIPLINES.map((d, i) => (
          <div
            key={d.title}
            data-cap-cell
            className="group/cell bg-[var(--bg)] p-8 transition-colors duration-500 hover:bg-[#101010] sm:p-10"
          >
            <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--fg-dim)] transition-colors duration-500 group-hover/cell:text-[var(--accent)]">
              {String(i + 1).padStart(2, '0')}
            </p>
            <h3 className="mt-5 font-mono text-sm font-medium tracking-[0.12em] text-[var(--fg)]">
              {d.title}
            </h3>
            <p className="mt-4 max-w-xs text-sm font-light leading-relaxed tracking-wide text-gray-400">
              {d.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
