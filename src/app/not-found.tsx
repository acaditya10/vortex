import type { Metadata } from 'next';
import Link from 'next/link';
import { SERVICES } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="relative z-10 flex min-h-[70vh] flex-col justify-center px-6 py-24 sm:px-10 lg:px-[7vw]">
      <p className="font-mono text-[10px] tracking-[0.35em] text-[var(--fg-dim)]">
        <span className="text-[var(--accent)]">404</span> {"// PAGE NOT FOUND"}
      </p>
      <h1 className="mt-6 max-w-2xl text-[clamp(2rem,6vw,4rem)] font-extrabold leading-[0.98] tracking-[-0.03em] text-[var(--fg)]">
        This route does not exist.
      </h1>
      <div className="divider mt-8 w-16 origin-left" />
      <p className="mt-8 max-w-lg text-sm font-light leading-relaxed text-[var(--fg-muted)] sm:text-base">
        The page you requested is gone, or it never shipped. Everything that does exist is below.
      </p>

      <nav aria-label="404 links" className="mt-12">
        <ul className="grid gap-px border border-white/5 bg-white/5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { href: '/', label: 'HOME' },
            { href: '/work', label: 'WORK' },
            { href: '/services', label: 'SERVICES' },
            { href: '/pricing', label: 'PRICING' },
            { href: '/blog', label: 'JOURNAL' },
            { href: '/faq', label: 'FAQ' },
            ...SERVICES.map((s) => ({ href: `/services/${s.slug}`, label: s.title.toUpperCase() })),
          ].map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                data-cursor-hover
                className="block bg-[var(--bg)] p-6 font-mono text-[11px] tracking-[0.2em] text-[var(--fg-muted)] transition-colors hover:bg-[#101010] hover:text-[var(--fg)]"
              >
                {link.label} →
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
