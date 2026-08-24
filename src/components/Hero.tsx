'use client';

import { useLayoutEffect, useEffect, useRef, useCallback, useState } from 'react';
import Image from 'next/image';
import { trackCTAClick } from '@/lib/analytics';

const useBrowserEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
import gsap from 'gsap';

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ→';

function scrambleText(el: HTMLElement, final: string, duration: number) {
  const len = final.length;
  const start = performance.now();
  const tick = (now: number) => {
    const progress = Math.min((now - start) / duration, 1);
    let result = '';
    for (let i = 0; i < len; i++) {
      if (i < len * progress) {
        result += final[i];
      } else {
        result += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }
    }
    el.textContent = result;
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

export default function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const signatureRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const ctaTextRef = useRef<HTMLSpanElement>(null);

  const defaultCTA = '[ START A BUILD ]';
  const hoverCTA = '[ START A BUILD ]';

  const onCTAEnter = useCallback(() => {
    if (ctaTextRef.current) {
      scrambleText(ctaTextRef.current, hoverCTA, 300);
    }
  }, []);

  const onCTALeave = useCallback(() => {
    if (ctaTextRef.current) {
      scrambleText(ctaTextRef.current, defaultCTA, 250);
    }
  }, []);

  useBrowserEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      const ENV_DELAY = 1.6;

      // Nav fade in
      tl.fromTo(
        navRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.4 },
        ENV_DELAY
      );

      // Headline words stagger reveal
      const words = headlineRef.current?.querySelectorAll('.headline-word span');
      if (words) {
        tl.fromTo(
          words,
          { y: '110%', opacity: 0 },
          { y: '0%', opacity: 1, duration: 0.45, stagger: 0.04 },
          ENV_DELAY + 0.1
        );
      }

      // Signature line
      if (signatureRef.current) {
        tl.fromTo(
          signatureRef.current,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.5 },
          ENV_DELAY + 0.35
        );
      }

      // Divider
      tl.fromTo(
        dividerRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.5, ease: 'power2.inOut', transformOrigin: 'left center' },
        ENV_DELAY + 0.25
      );

      // Sub-headline
      tl.fromTo(
        subRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.4 },
        ENV_DELAY + 0.3
      );

      // CTA
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.4 },
        ENV_DELAY + 0.35
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headlineLines = ['Immersive digital experiences.', 'Engineered for the web.'];

  return (
    <section
      ref={sectionRef}
      className="grain relative z-10 flex min-h-dvh flex-col justify-between px-6 py-6 sm:px-10 sm:py-8 md:pl-24 md:pr-16 md:py-10"
    >
      {/* Navigation */}
      <nav ref={navRef} className="relative flex items-center justify-between opacity-0">
        <a href="/" className="relative block h-10 w-auto sm:h-12 md:h-14 lg:h-16" data-cursor-hover>
          <Image
            src="/logo.png"
            alt="Vortex Labs"
            width={240}
            height={48}
            className="h-full w-auto"
            priority
          />
        </a>
        <div className="hidden text-[11px] font-mono tracking-wide text-[var(--fg-muted)] lg:block">
          Independent design &amp; engineering studio by Aditya Chandra.
        </div>
        <div className="hidden items-center gap-6 text-[11px] font-mono tracking-wider text-[var(--fg-dim)] xl:flex">
          <a href="#work" className="transition-colors hover:text-[var(--fg-muted)]" data-cursor-hover>WORK</a>
          <span className="text-[var(--fg-dim)]">·</span>
          <a href="#capabilities" className="transition-colors hover:text-[var(--fg-muted)]" data-cursor-hover>CAPABILITIES</a>
          <span className="text-[var(--fg-dim)]">·</span>
          <a href="#process" className="transition-colors hover:text-[var(--fg-muted)]" data-cursor-hover>PROCESS</a>
          <span className="text-[var(--fg-dim)]">·</span>
          <a href="#about" className="transition-colors hover:text-[var(--fg-muted)]" data-cursor-hover>ABOUT</a>
          <span className="text-[var(--fg-dim)]">·</span>
          <a href="#faq" className="transition-colors hover:text-[var(--fg-muted)]" data-cursor-hover>FAQ</a>
          <span className="text-[var(--fg-dim)]">·</span>
          <a href="#contact" className="text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)]" data-cursor-hover>[ CONTACT → ]</a>
        </div>
      </nav>

      {/* Mobile menu toggle — fixed above overlay */}
      <button
        className="fixed right-6 top-6 z-50 flex flex-col gap-1.5 xl:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        data-cursor-hover
      >
        <span className={`block h-px w-5 bg-[var(--fg)] transition-all duration-300 ${menuOpen ? 'translate-y-[3.5px] rotate-45' : ''}`} />
        <span className={`block h-px w-5 bg-[var(--fg)] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
        <span className={`block h-px w-5 bg-[var(--fg)] transition-all duration-300 ${menuOpen ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
      </button>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 flex flex-col items-start justify-center gap-8 bg-[var(--bg)] px-10 transition-opacity duration-300 xl:hidden ${menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
        <a href="#work" className="font-mono text-lg tracking-[0.15em] text-[var(--fg-muted)]" onClick={() => setMenuOpen(false)} data-cursor-hover>WORK</a>
        <a href="#capabilities" className="font-mono text-lg tracking-[0.15em] text-[var(--fg-muted)]" onClick={() => setMenuOpen(false)} data-cursor-hover>CAPABILITIES</a>
        <a href="#process" className="font-mono text-lg tracking-[0.15em] text-[var(--fg-muted)]" onClick={() => setMenuOpen(false)} data-cursor-hover>PROCESS</a>
        <a href="#about" className="font-mono text-lg tracking-[0.15em] text-[var(--fg-muted)]" onClick={() => setMenuOpen(false)} data-cursor-hover>ABOUT</a>
        <a href="#faq" className="font-mono text-lg tracking-[0.15em] text-[var(--fg-muted)]" onClick={() => setMenuOpen(false)} data-cursor-hover>FAQ</a>
        <a href="#contact" className="font-mono text-lg tracking-[0.15em] text-[var(--fg)]" onClick={() => setMenuOpen(false)} data-cursor-hover>[ CONTACT → ]</a>
      </div>

      {/* Main Content — Left Aligned */}
      <div className="flex flex-1 flex-col justify-center pl-6 pt-20 text-left sm:pl-[7.5vw] md:pt-0">
        <h1
          ref={headlineRef}
          className="max-w-4xl text-[clamp(2.5rem,9vw,4.5rem)] leading-[0.95] font-semibold tracking-[-0.03em] text-[var(--fg)] sm:text-[clamp(2rem,5.4vw,4.5rem)]"
        >
          {headlineLines.map((line, lineIdx) => (
            <span key={lineIdx} className="block">
              {line.split(' ').map((word, wordIdx) => (
                <span key={wordIdx} className="headline-word inline-block overflow-hidden mr-[0.25em]">
                  <span className="inline-block opacity-0">{word}</span>
                </span>
              ))}
              {lineIdx < headlineLines.length - 1 && <br />}
            </span>
          ))}
        </h1>

        {/* Signature line */}
        <div
          ref={signatureRef}
          className="mt-7 font-mono text-[0.65rem] font-medium tracking-[0.2em] text-[var(--fg-muted)] opacity-0 sm:text-[clamp(0.7rem,1.5vw,0.875rem)] md:mt-9"
        >
          — ENGINEERED BY ONE.
        </div>

        <div ref={dividerRef} className="divider mt-8 w-12 origin-left sm:w-16 md:mt-12" />

        <p
          ref={subRef}
          className="mt-8 max-w-lg text-sm font-light leading-relaxed tracking-wide text-[#A0A0A0] opacity-0 sm:text-base md:mt-12"
        >
          Premium websites and digital experiences for ambitious brands,
          <span className="hidden sm:inline"><br /></span>{' '}
          built from strategy through deployment.
        </p>

        {/* CTA — Command-line style */}
        <div ref={ctaRef} className="mt-10 opacity-0 sm:mt-12">
          <a
            href="#contact"
            className="cta-button-wrap cta-button-wrap--wide w-full block"
            data-cursor-hover
            onMouseEnter={onCTAEnter}
            onMouseLeave={onCTALeave}
            onClick={(e) => {
              e.preventDefault();
              trackCTAClick('hero');

              const mainContent = sectionRef.current?.querySelector('.flex.flex-1.flex-col');
              if (!mainContent) return;

              gsap.to(mainContent, {
                opacity: 0,
                y: -30,
                duration: 0.5,
                ease: 'power2.in',
                onComplete: () => {
                  const target = document.getElementById('contact');
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                  }
                  gsap.set(mainContent, { opacity: 1, y: 0 });
                },
              });
            }}
          >
            <div className="cta-fluid-border cta-fluid-border--1" />
            <div className="cta-fluid-border cta-fluid-border--2" />
            <div className="cta-fluid-border cta-fluid-border--3" />
            <span className="cta-button cta-button--wide" ref={ctaTextRef}>
              <span className="cta-label">{defaultCTA}</span>
              <span className="cta-arrow">→</span>
            </span>
          </a>
        </div>

      </div>

      {/* Stats rail — desktop only */}
      <div className="pointer-events-none absolute bottom-28 right-6 hidden flex-col items-end gap-6 text-right lg:flex xl:right-16">
        {[
          ['PROJECTS SHIPPED', '20+'],
          ['AVG. RESPONSE', '<24H'],
          ['COVERAGE', 'GLOBAL'],
        ].map(([label, value]) => (
          <div key={label}>
            <div className="font-mono text-[9px] tracking-[0.25em] text-[var(--fg-dim)]">{label}</div>
            <div className="mt-1 font-mono text-sm tracking-wider text-[var(--fg)]">{value}</div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="flex items-end justify-between text-[9px] font-mono tracking-wider text-[var(--fg-dim)] sm:text-[10px] md:text-[11px]">
        <span>DESIGN / ENGINEERING / DEPLOYMENT</span>
        <span>&copy; {new Date().getFullYear()}</span>
      </footer>
    </section>
  );
}
