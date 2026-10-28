'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';

const useBrowserEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
import gsap from 'gsap';

import { FAQS } from '@/lib/faq';

export default function Answers() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
                  section.querySelector('[data-ans-heading]'),
                  { opacity: 0, y: 30 },
                  { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
                )
                .fromTo(
                  section.querySelectorAll('[data-ans-row]'),
                  { opacity: 0, y: 16 },
                  { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out', stagger: 0.05 },
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
      id="faq"
      className="relative z-10 border-t border-gray-900 bg-[var(--bg)] px-6 py-24 sm:px-10 sm:py-32 lg:pl-[7vw] lg:pr-[7vw]"
    >
      <div className="lg:grid lg:grid-cols-[35%_65%]">
        <div className="pb-12 lg:sticky lg:top-24 lg:self-start lg:pb-0 lg:pr-20">
          <p className="font-mono text-[10px] tracking-[0.35em] text-[var(--fg-dim)]">
            <span className="text-[var(--accent)]">08</span> {"// DIRECT ANSWERS"}
          </p>

          <h2
            data-ans-heading
            className="mt-6 text-[clamp(2.5rem,5.5vw,4.25rem)] font-extrabold leading-[0.95] tracking-[-0.03em] text-[var(--fg)] opacity-0"
          >
            Before you ask.
          </h2>

          <div className="divider mt-8 w-16 origin-left" />

          <p className="mt-8 max-w-xs text-sm font-light leading-relaxed tracking-wide text-[var(--fg-muted)]">
            Cost, timeline, ownership, support — answered straight, no sales script.
          </p>

          <p className="mt-6 font-mono text-[10px] tracking-[0.2em] text-[var(--fg-dim)]">
            <Link href="/faq" data-cursor-hover className="transition-colors hover:text-[var(--fg-muted)]">
              ALL QUESTIONS →
            </Link>
          </p>
        </div>

        <div>
          {FAQS.slice(0, 6).map((item, i) => {
            const isOpen = openIndex === i;
            const panelId = `faq-panel-${i}`;
            const buttonId = `faq-button-${i}`;

            return (
              <div key={item.q} data-ans-row className="border-b border-white/5 first:border-t">
                <button
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  data-cursor-hover
                  className="group/row flex w-full items-center justify-between gap-6 py-6 text-left outline-none transition-colors focus-visible:text-gray-300"
                >
                  <span className="flex items-baseline gap-4 sm:gap-6">
                    <span
                      className={`font-mono text-[10px] tracking-[0.3em] transition-colors duration-300 ${
                        isOpen ? 'text-[var(--accent)]' : 'text-[var(--fg-dim)]'
                      }`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`font-mono text-xs font-medium uppercase tracking-[0.12em] transition-colors duration-300 sm:text-sm ${
                        isOpen ? 'text-[var(--fg)]' : 'text-[var(--fg-muted)] group-hover/row:text-[var(--fg)]'
                      }`}
                    >
                      {item.q}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className={`shrink-0 font-mono text-base leading-none transition-transform duration-300 ${
                      isOpen ? 'rotate-45 text-[var(--accent)]' : 'text-[var(--fg-dim)]'
                    }`}
                  >
                    +
                  </span>
                </button>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`grid transition-[grid-template-rows] duration-400 ease-out ${
                    isOpen ? '[grid-template-rows:1fr]' : '[grid-template-rows:0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-xl pb-7 pl-8 pr-4 text-sm font-light leading-relaxed tracking-wide text-gray-400 sm:pl-10 sm:text-base">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
