'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import Link from 'next/link';

const useBrowserEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
import gsap from 'gsap';

import { SERVICES } from '@/lib/site';

/**
 * Homepage services gateway — each card links to a rankable
 * service page, distributing link equity to money pages.
 */
export default function ServicesPreview() {
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
                  section.querySelector('[data-svc-heading]'),
                  { opacity: 0, y: 30 },
                  { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
                )
                .fromTo(
                  section.querySelectorAll('[data-svc-card]'),
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
      id="services"
      className="relative z-10 border-t border-gray-900 bg-[var(--bg)] px-6 py-24 sm:px-10 sm:py-32 lg:pl-[7vw] lg:pr-[7vw]"
    >
      <p className="font-mono text-[10px] tracking-[0.35em] text-[var(--fg-dim)]">
        <span className="text-[var(--accent)]">05</span> {"// ENGAGEMENTS"}
      </p>

      <h2
        data-svc-heading
        className="mt-6 max-w-3xl text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[0.95] tracking-[-0.03em] text-[var(--fg)] opacity-0"
      >
        How I get hired.
      </h2>

      <div className="divider mt-8 w-16 origin-left" />

      <div className="mt-14 grid grid-cols-1 gap-px border border-white/5 bg-white/5 md:grid-cols-2">
        {SERVICES.map((service) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            data-svc-card
            data-cursor-hover
            className="group/svc flex flex-col bg-[var(--bg)] p-8 transition-colors duration-500 hover:bg-[#101010] sm:p-10"
          >
            <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--fg-dim)] transition-colors duration-500 group-hover/svc:text-[var(--accent)]">
              {service.code}
            </p>
            <h3 className="mt-5 text-xl font-semibold tracking-[-0.01em] text-[var(--fg)] sm:text-2xl">
              {service.title}
            </h3>
            <p className="mt-4 max-w-md text-sm font-light leading-relaxed tracking-wide text-gray-400">
              {service.short}
            </p>
            <p className="mt-6 font-mono text-[10px] tracking-[0.2em] text-[var(--fg-dim)] transition-colors duration-500 group-hover/svc:text-[var(--fg-muted)]">
              {service.metaTitle.toUpperCase()} →
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
        <Link
          href="/services"
          data-cursor-hover
          className="font-mono text-[10px] tracking-[0.2em] text-[var(--fg-dim)] transition-colors hover:text-[var(--fg-muted)]"
        >
          ALL SERVICES →
        </Link>
        <Link
          href="/pricing"
          data-cursor-hover
          className="font-mono text-[10px] tracking-[0.2em] text-[var(--fg-dim)] transition-colors hover:text-[var(--fg-muted)]"
        >
          STARTING PRICES →
        </Link>
      </div>
    </section>
  );
}
