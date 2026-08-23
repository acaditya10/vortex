'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const useBrowserEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
import gsap from 'gsap';

const ANSWERS = [
  {
    q: 'HOW LONG DOES A BUILD TAKE?',
    a: "Every project gets a concrete schedule at scope — and it holds. Landing systems move fastest; full custom sites run longer depending on motion complexity and content readiness. You'll know the timeline before committing, not after.",
  },
  {
    q: 'HOW DO REVISIONS WORK?',
    a: "You review high-fidelity design before a single component ships, so iteration happens early — where it's cheap. During build, changes move fast for one reason: the designer and the developer are the same person. There is no telephone game.",
  },
  {
    q: 'WHO OWNS THE CODE?',
    a: 'You do. Entirely. Repository, deployment pipeline, domain, analytics — everything transfers at handover with documentation. No lock-in. No proprietary platform. No hostage situation.',
  },
  {
    q: 'WHAT HAPPENS AFTER LAUNCH?',
    a: 'Launch ends the project, not the relationship. Structured care plans cover ongoing improvements; ad-hoc support handles everything else. Either way, the person who built your site is the person who maintains it.',
  },
  {
    q: 'WHY SOLO INSTEAD OF AN AGENCY?',
    a: "Agencies coordinate; I build. One accountable operator means decisions happen in hours instead of standups, budgets go into craft instead of overhead — and the person designing your interface writes its production code. That's not a limitation. It's the feature.",
  },
  {
    q: 'WHAT DO YOU NEED FROM ME TO START?',
    a: 'A discovery call first. Then brand assets, content direction and platform access at kickoff. From there you review at defined checkpoints while I handle everything end-to-end.',
  },
];

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
            <span className="text-[var(--accent)]">07</span> {"// DIRECT ANSWERS"}
          </p>

          <h2
            data-ans-heading
            className="mt-6 text-[clamp(2.5rem,5.5vw,4.25rem)] font-extrabold leading-[0.95] tracking-[-0.03em] text-[var(--fg)] opacity-0"
          >
            Before you ask.
          </h2>

          <div className="divider mt-8 w-16 origin-left" />
        </div>

        <div>
          {ANSWERS.map((item, i) => {
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
                      className={`font-mono text-xs font-medium tracking-[0.12em] transition-colors duration-300 sm:text-sm ${
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
