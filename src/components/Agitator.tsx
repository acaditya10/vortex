'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';

const useBrowserEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TEXT = 'Bespoke digital experiences driven by fluid motion, kinetic typography, and frictionless interactions.';

export default function Agitator() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useBrowserEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const p = wrapper.querySelector('p');
    if (!p) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(hover: hover) and (pointer: fine)', () => {
        const words = p.querySelectorAll<HTMLElement>('.agitator-word');
        if (!words.length) return;

        gsap.set(words, { yPercent: 110 });

        ScrollTrigger.create({
          trigger: wrapper,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to(words, {
              yPercent: 0,
              duration: 1.2,
              ease: 'power4.out',
              stagger: 0.04,
            });
          },
        });
      });

      mm.add('(hover: none), (pointer: coarse)', () => {
        gsap.set(wrapper, { opacity: 0 });

        ScrollTrigger.create({
          trigger: wrapper,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(wrapper, {
              opacity: 1,
              duration: 1.0,
              ease: 'power2.out',
            });
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const words = TEXT.split(' ');
  const ACCENT_WORDS = new Set(['fluid', 'motion,']);

  return (
    <div ref={wrapperRef} className="border-t border-b border-gray-900 px-6 py-16 sm:px-10 sm:py-24 lg:pl-[7vw]">
      <p className="max-w-none text-[clamp(2rem,5vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.03em] text-[var(--fg-muted)] sm:text-[clamp(2.5rem,5.5vw,5rem)] lg:text-[clamp(3rem,5.5vw,5.5rem)]">
        {words.map((word, i) => (
          <span key={i} className="agitator-word mr-[0.22em] inline-block overflow-hidden align-bottom" style={{ paddingBottom: '0.14em', marginBottom: '-0.14em' }}>
            <span className={`inline-block will-change-transform ${ACCENT_WORDS.has(word) ? 'text-[var(--accent)]' : ''}`}>{word}</span>
          </span>
        ))}
      </p>
    </div>
  );
}
