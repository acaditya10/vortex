'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';

const useBrowserEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TEXT = 'Bespoke digital experiences driven by fluid motion, kinetic typography, and frictionless interactions.';

export default function Agitator() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);

  useBrowserEffect(() => {
    const wrapper = wrapperRef.current;
    const para = paraRef.current;
    if (!wrapper || !para) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        // Static fallback — statement fully visible, nothing moves
        gsap.set(para.querySelectorAll<HTMLElement>('.agitator-inner'), { yPercent: 0, opacity: 1 });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const inners = para.querySelectorAll<HTMLElement>('.agitator-inner');
        const outers = para.querySelectorAll<HTMLElement>('.agitator-word');
        if (!inners.length) return;

        // --- 1. Scroll-scrubbed reveal: replays on every pass through the section ---
        gsap.fromTo(
          inners,
          { yPercent: 120, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            ease: 'none',
            stagger: 0.06,
            scrollTrigger: {
              trigger: wrapper,
              start: 'top 90%',
              end: 'top 40%',
              scrub: 0.6,
            },
          }
        );

        // --- 2. Idle liquid float: each word bobs on its own sine rhythm (outer layer) ---
        const floats: gsap.core.Tween[] = [];
        outers.forEach((w, i) => {
          floats.push(
            gsap.to(w, {
              yPercent: (i % 2 === 0 ? -1 : 1) * (4 + (i % 3) * 2),
              duration: 1.8 + (i % 4) * 0.35,
              delay: i * 0.11,
              ease: 'sine.inOut',
              yoyo: true,
              repeat: -1,
              paused: true,
            })
          );
        });

        ScrollTrigger.create({
          trigger: wrapper,
          start: 'top bottom',
          end: 'bottom top',
          onToggle: (self) => {
            floats.forEach((t) => (self.isActive ? t.play() : t.pause()));
          },
        });

        // --- 3. Velocity smear: text leans with your scroll speed, settles when you stop ---
        mm.add('(hover: hover) and (pointer: fine)', () => {
          gsap.set(para, { transformOrigin: 'center center' });
          const skewTo = gsap.quickTo(para, 'skewY', { duration: 0.6, ease: 'power3.out' });

          const st = ScrollTrigger.create({
            trigger: wrapper,
            start: 'top bottom',
            end: 'bottom top',
            onUpdate: (self) => {
              skewTo(gsap.utils.clamp(-5, 5, self.getVelocity() / -400));
            },
          });

          const onScrollEnd = () => skewTo(0);
          ScrollTrigger.addEventListener('scrollEnd', onScrollEnd);

          return () => {
            ScrollTrigger.removeEventListener('scrollEnd', onScrollEnd);
            st.kill();
          };
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const words = TEXT.split(' ');
  const ACCENT_WORDS = new Set(['fluid', 'motion,']);

  return (
    <div
      ref={wrapperRef}
      className="relative flex min-h-[65vh] flex-col justify-center overflow-hidden border-t border-b border-gray-900 px-6 py-24 sm:px-10 sm:py-32 lg:min-h-[80vh] lg:py-40 lg:pl-[7vw] lg:pr-[7vw]"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(200,182,162,0.055),transparent_70%)]"
      />

      <p className="relative font-mono text-[10px] tracking-[0.35em] text-[var(--fg-dim)]">
        <span className="text-[var(--accent)]">{'///'}</span> SIGNATURE MOTION
      </p>

      <p
        ref={paraRef}
        className="relative mt-10 max-w-none text-[clamp(2.1rem,5.5vw,4.75rem)] font-medium leading-[1.06] tracking-[-0.03em] text-[var(--fg-muted)] sm:text-[clamp(2.5rem,6vw,5.25rem)] lg:mt-14 lg:text-[clamp(2.75rem,6.5vw,6.5rem)] will-change-transform"
      >
        {words.map((word, i) => (
          <span
            key={i}
            className="agitator-word mr-[0.22em] inline-block align-bottom"
            style={{ paddingBottom: '0.16em', marginBottom: '-0.16em' }}
          >
            <span
              className={`agitator-inner inline-block will-change-transform ${
                ACCENT_WORDS.has(word) ? 'fluid-accent' : ''
              }`}
            >
              {word}
            </span>
          </span>
        ))}
      </p>

      <p className="pointer-events-none absolute bottom-6 right-6 font-mono text-[9px] tracking-[0.3em] text-[var(--fg-dim)] sm:right-10 sm:text-[10px]">
        [ FLUID, DEMONSTRATED ]
      </p>
    </div>
  );
}
