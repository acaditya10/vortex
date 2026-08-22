'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import Image from 'next/image';

const useBrowserEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
import gsap from 'gsap';

export type ExhibitProps = {
  index: string;
  name: string;
  hook: string;
  quote: string;
  quoteAuthor: string;
  quoteRole: string;
  metaLine: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  reversed?: boolean;
};

export default function Exhibit({
  index,
  name,
  hook,
  quote,
  quoteAuthor,
  quoteRole,
  metaLine,
  href,
  imageSrc,
  imageAlt,
  reversed = false,
}: ExhibitProps) {
  const dossierRef = useRef<HTMLDivElement>(null);
  const artRef = useRef<HTMLDivElement>(null);

  useBrowserEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const art = artRef.current;
      const dossier = dossierRef.current;
      if (!art || !dossier) return;

      const zoom = gsap.to(art, {
        scale: 1.05,
        duration: 1.4,
        ease: 'power2.out',
        paused: true,
      });

      const enter = () => zoom.play();
      const leave = () => zoom.reverse();

      dossier.addEventListener('mouseenter', enter);
      dossier.addEventListener('mouseleave', leave);
      dossier.addEventListener('focusin', enter);
      dossier.addEventListener('focusout', leave);

      return () => {
        dossier.removeEventListener('mouseenter', enter);
        dossier.removeEventListener('mouseleave', leave);
        dossier.removeEventListener('focusin', enter);
        dossier.removeEventListener('focusout', leave);
        zoom.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <article className="group/exhibit relative">
      <div
        className={
          reversed ? 'lg:grid lg:grid-cols-[55%_45%]' : 'lg:grid lg:grid-cols-[35%_65%]'
        }
      >
        {/* Dossier */}
        <div
          ref={dossierRef}
          className={`order-1 flex flex-col justify-center px-6 py-16 sm:px-10 lg:py-24 xl:py-32 ${
            reversed
              ? 'lg:order-2 lg:pl-14 lg:pr-[7vw] xl:pl-20'
              : 'lg:order-1 lg:pl-[7vw] lg:pr-14 xl:pr-20'
          }`}
        >
          <p className="font-mono text-[10px] tracking-[0.35em] text-[var(--fg-dim)]">
            <span className="text-[var(--accent)]">{index}</span> // SYSTEM EXHIBIT
          </p>

          <h2 className="mt-6 text-[clamp(2.75rem,6vw,5rem)] font-extrabold leading-[0.95] tracking-[-0.03em] text-[var(--fg)]">
            {name}
          </h2>

          <div className="divider mt-8 w-16 origin-left" />

          <p className="mt-8 max-w-xl text-base font-light leading-relaxed tracking-wide text-gray-300 sm:text-lg">
            {hook}
          </p>

          <figure className="mt-10 max-w-xl border-l border-white/10 pl-6">
            <blockquote className="text-sm italic leading-relaxed text-gray-400 sm:text-[15px]">
              &ldquo;{quote}&rdquo;
            </blockquote>
            <figcaption className="mt-4 font-mono text-[10px] tracking-[0.2em] text-[var(--fg-dim)]">
              — {quoteAuthor}, {quoteRole}
            </figcaption>
          </figure>

          <a
            href={href}
            data-cursor-hover
            className="group/cta mt-12 inline-flex items-baseline self-start font-mono text-xs tracking-[0.2em] text-white outline-none transition-colors duration-300 hover:text-gray-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            [ VISIT LIVE SITE{' '}
            <span className="inline-block transition-transform duration-300 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5">
              ↗
            </span>{' '}
            ]
          </a>
        </div>

        {/* Artwork */}
        <div
          className={`order-2 px-6 pb-16 sm:px-10 lg:p-6 xl:p-8 ${
            reversed ? 'lg:order-1' : 'lg:order-2'
          }`}
        >
          <div className="lg:sticky lg:top-0 lg:flex lg:h-dvh lg:items-center lg:justify-center">
            <div
              ref={artRef}
              className="exhibit-art mx-auto w-full max-w-[540px] border border-gray-800 bg-[#0C0C0C] overflow-hidden will-change-transform transition-colors duration-500 group-hover/exhibit:border-white/25"
            >
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={1200}
                height={800}
                sizes="(max-width: 1024px) 100vw, 65vw"
                placeholder="blur"
                blurDataURL="data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAEfQ//g=="
                className="block h-auto w-full grayscale-[0.6] brightness-90 transition-[filter] duration-500 ease-out group-hover/exhibit:grayscale-0 group-hover/exhibit:brightness-100"
              />
            </div>
          </div>
          <div className="mt-5 px-6 font-mono text-[10px] tracking-[0.18em] text-[var(--fg-dim)] sm:px-10 sm:text-[11px]">
            {metaLine}
          </div>
        </div>
      </div>
    </article>
  );
}
