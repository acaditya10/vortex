import Link from 'next/link';
import { SITE } from '@/lib/site';

/**
 * Shared conversion band for interior pages — mirrors the
 * homepage contact section's command-line language.
 */
export default function CtaBand({
  title = 'Commission a build.',
  text = 'Tell me what you are building and what the experience needs to become. You will hear back within 24 hours.',
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="relative z-10 border-t border-white/5 bg-[var(--bg)] px-6 py-24 sm:px-10 sm:py-28 lg:pl-[7vw] lg:pr-[7vw]">
      <h2 className="max-w-3xl text-[clamp(2rem,5.5vw,3.75rem)] font-bold leading-[0.95] tracking-[-0.03em] text-[var(--fg)]">
        {title}
      </h2>
      <div className="divider mt-8 w-16 origin-left" />
      <p className="mt-8 max-w-2xl text-sm font-light leading-relaxed tracking-wide text-[var(--fg-muted)] sm:text-base">
        {text}
      </p>
      <div className="mt-10 flex flex-wrap items-baseline gap-x-8 gap-y-4">
        <Link
          href="/#contact"
          data-cursor-hover
          className="inline-flex items-baseline font-mono text-xs tracking-[0.2em] text-white transition-colors duration-300 hover:text-gray-300"
        >
          [ START A BUILD → ]
        </Link>
        <a
          href={SITE.calComUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor-hover
          className="inline-flex items-baseline font-mono text-xs tracking-[0.2em] text-[var(--fg-muted)] transition-colors duration-300 hover:text-[var(--fg)]"
        >
          [ BOOK A 30-MIN CALL ↗ ]
        </a>
      </div>
    </section>
  );
}
