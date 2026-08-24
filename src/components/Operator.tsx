'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import Image from 'next/image';

const useBrowserEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

const NAME = 'ADITYA CHANDRA';

export default function Operator() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLParagraphElement>(null);
  const photoBoxRef = useRef<HTMLDivElement>(null);
  const scrambling = useRef(false);

  useBrowserEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(
        section.querySelectorAll(
          '[data-op-kicker], [data-op-statement] span, [data-op-copy], [data-op-block]'
        ),
        { opacity: 1, y: 0, x: 0 }
      );
    });

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const tl = gsap.timeline();

            tl.fromTo(
              section.querySelector('[data-op-kicker]'),
              { opacity: 0, y: 12 },
              { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }
            )
              .fromTo(
                section.querySelectorAll('[data-op-statement] span'),
                { opacity: 0, y: '110%' },
                { opacity: 1, y: '0%', duration: 0.6, ease: 'power3.out', stagger: 0.05 },
                '-=0.25'
              )
              .fromTo(
                section.querySelector('[data-op-divider]'),
                { scaleX: 0 },
                { scaleX: 1, duration: 0.5, ease: 'power2.inOut', transformOrigin: 'left center' },
                '-=0.3'
              )
              .fromTo(
                section.querySelectorAll('[data-op-copy]'),
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
                '-=0.25'
              )
              .fromTo(
                section.querySelector('[data-op-block]'),
                { opacity: 0, y: 24 },
                { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
                '-=0.35'
              )
              .add(() => {
                if (nameRef.current && !scrambling.current) {
                  scrambling.current = true;
                  scrambleText(nameRef.current, NAME, 850);
                  window.setTimeout(() => (scrambling.current = false), 900);
                }
              }, '-=0.15');

            observer.disconnect();
          });
        },
        { threshold: 0.15 }
      );

      observer.observe(section);

      // --- Idle breath: portrait floats gently while the section is on screen ---
      const box = photoBoxRef.current;
      let breath: gsap.core.Tween | null = null;
      if (box) {
        breath = gsap.to(box, {
          y: -7,
          duration: 3.4,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          paused: true,
        });

        ScrollTrigger.create({
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          onToggle: (self) => {
            if (!breath) return;
            if (self.isActive) breath.play(0);
            else breath.pause();
          },
        });
      }

      // --- Cursor-tracked tilt on the portrait ---
      mm.add('(hover: hover) and (pointer: fine)', () => {
        const wrap = section.querySelector<HTMLElement>('[data-op-portrait]');
        if (!wrap || !box) return;

        gsap.set(box, { transformPerspective: 750 });
        const rotXTo = gsap.quickTo(box, 'rotationX', { duration: 0.7, ease: 'power3.out' });
        const rotYTo = gsap.quickTo(box, 'rotationY', { duration: 0.7, ease: 'power3.out' });

        const onMove = (e: MouseEvent) => {
          const rect = wrap.getBoundingClientRect();
          const dx = (e.clientX - rect.left) / rect.width - 0.5;
          const dy = (e.clientY - rect.top) / rect.height - 0.5;
          rotYTo(dx * 7);
          rotXTo(-dy * 7);
        };
        const onLeave = () => {
          rotXTo(0);
          rotYTo(0);
        };

        wrap.addEventListener('mousemove', onMove);
        wrap.addEventListener('mouseleave', onLeave);

        return () => {
          wrap.removeEventListener('mousemove', onMove);
          wrap.removeEventListener('mouseleave', onLeave);
        };
      });

      return () => {
        observer.disconnect();
        breath?.kill();
      };
    });

    return () => mm.revert();
  }, []);

  const statementLines = [
    ['A', 'studio', 'of', 'one.'],
    ['Built', 'like', 'a', 'team.'],
  ];

  const handleNameEnter = () => {
    if (nameRef.current && !scrambling.current) {
      scrambling.current = true;
      scrambleText(nameRef.current, NAME, 600);
      window.setTimeout(() => (scrambling.current = false), 650);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative z-10 flex min-h-dvh flex-col justify-center border-t border-gray-900 bg-[var(--bg)] px-6 py-20 sm:px-10 lg:py-0 lg:pl-[7vw] lg:pr-[7vw]"
    >
      <div className="w-full lg:grid lg:grid-cols-[1fr_minmax(360px,40%)] lg:items-center lg:gap-8 xl:gap-12">
        {/* Left — statement + principles */}
        <div>
          <p
            data-op-kicker
            className="font-mono text-[11px] tracking-[0.35em] text-[#6B6560] opacity-0"
          >
            <span className="text-[var(--accent)]">06</span> {"// THE OPERATOR"}
          </p>

          <h2 className="mt-6 text-[clamp(2.625rem,5.25vw,4.75rem)] font-extrabold leading-[0.97] tracking-[-0.03em] text-[var(--fg-muted)]">
            {statementLines.map((line, lineIdx) => (
              <span key={lineIdx} className="block">
                {line.map((word, wordIdx) => (
                  <span key={wordIdx} data-op-statement className="mr-[0.24em] inline-block overflow-hidden align-bottom" style={{ paddingBottom: '0.12em', marginBottom: '-0.12em' }}>
                    <span
                      className={`inline-block opacity-0 ${
                        lineIdx === statementLines.length - 1 ? 'text-[var(--fg)]' : ''
                      }`}
                    >
                      {word}
                    </span>
                  </span>
                ))}
              </span>
            ))}
          </h2>

          <div data-op-divider className="mt-6 h-px w-20 origin-left" style={{ background: 'rgba(200, 182, 162, 0.2)' }} />

          <div data-op-copy className="mt-8 max-w-xl opacity-0">
            <p className="text-base font-light leading-[1.75] tracking-[0.01em] text-[#D0CBC5] sm:text-lg">
              Vortex Labs is an independent web design &amp; engineering<br />
              studio based in India, working remotely with ambitious<br />
              brands worldwide.
            </p>
            <p className="mt-8 text-base font-light leading-[1.75] tracking-[0.01em] text-[#7A7570] sm:text-lg">
              I design and engineer the product myself &mdash;<br />
              eliminating the handoffs, layers and translation<br />
              that usually sit between idea and execution.
            </p>
            <p className="mt-8 text-base font-light leading-[1.75] tracking-[0.01em] text-[#7A7570] sm:text-lg">
              You work directly with the person building it.<br />
              No account managers. No dilution. Just clarity,<br />
              ownership and craft from start to finish.
            </p>
            <p className="mt-8 font-mono text-[10px] tracking-[0.2em] text-[var(--fg-dim)]">
              <a href="#capabilities" className="transition-colors hover:text-[var(--fg-muted)]" data-cursor-hover>VIEW CAPABILITIES →</a>
            </p>
          </div>
        </div>

        {/* Right — identity block */}
        <div
          data-op-block
          className="mt-16 opacity-0 lg:ml-auto lg:mt-4 lg:w-full lg:max-w-[390px] xl:max-w-[420px]"
        >
          <div className="group/portrait" data-op-portrait style={{ perspective: '750px' }}>
            <div ref={photoBoxRef} className="will-change-transform">
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src="/portrait.png"
                  alt="Aditya Chandra — founder and engineer behind Vortex Labs"
                  fill
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-cover object-top grayscale contrast-[1.04] brightness-[0.85] transition-[filter] duration-500 ease-out group-hover/portrait:grayscale-0 group-hover/portrait:brightness-100 [-webkit-mask-image:radial-gradient(120%_105%_at_52%_35%,black_42%,transparent_90%)] [mask-image:radial-gradient(120%_105%_at_52%_35%,black_42%,transparent_90%)]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 shadow-[inset_0_0_120px_60px_var(--bg)]"
                />
              </div>
            </div>

            <p
              ref={nameRef}
              onMouseEnter={handleNameEnter}
              className="mt-6 whitespace-nowrap text-[clamp(1.75rem,2.6vw,2.4rem)] font-extrabold leading-none tracking-[-0.03em] text-[var(--fg)]"
            >
              ADITYA CHANDRA
            </p>

            <p className="mt-4 font-mono text-[10px] tracking-[0.15em] text-[#6B6560]">
              INDEPENDENT DIGITAL ARCHITECT · DESIGN + ENGINEERING
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
