'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/work', label: 'WORK' },
  { href: '/services', label: 'SERVICES' },
  { href: '/pricing', label: 'PRICING' },
  { href: '/blog', label: 'JOURNAL' },
  { href: '/about', label: 'ABOUT' },
  { href: '/faq', label: 'FAQ' },
];

/**
 * Site-wide header for all interior pages. The homepage keeps its
 * bespoke in-Hero navigation; this mirrors the same design language.
 */
export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="relative z-50 border-b border-white/5 bg-[var(--bg)]">
      <div className="flex items-center justify-between px-6 py-5 sm:px-10 lg:px-[7vw]">
        <Link href="/" className="relative block h-9 w-auto sm:h-10" data-cursor-hover>
          <Image
            src="/logo.png"
            alt="Vortex Labs — web design and Next.js engineering studio"
            width={240}
            height={48}
            className="h-full w-auto"
            priority
          />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 text-[11px] font-mono tracking-wider text-[var(--fg-dim)] lg:flex">
          {NAV_LINKS.map((link, i) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <span key={link.href} className="flex items-center gap-6">
                <Link
                  href={link.href}
                  data-cursor-hover
                  className={`transition-colors hover:text-[var(--fg-muted)] ${active ? 'text-[var(--fg-muted)]' : ''}`}
                >
                  {link.label}
                </Link>
                {i < NAV_LINKS.length - 1 && <span aria-hidden="true" className="text-[var(--fg-dim)]">·</span>}
              </span>
            );
          })}
          <span aria-hidden="true" className="text-[var(--fg-dim)]">·</span>
          <Link href="/#contact" data-cursor-hover className="text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)]">
            [ CONTACT → ]
          </Link>
        </nav>

        <button
          className="flex flex-col gap-1.5 lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          data-cursor-hover
        >
          <span className={`block h-px w-5 bg-[var(--fg)] transition-all duration-300 ${menuOpen ? 'translate-y-[3.5px] rotate-45' : ''}`} />
          <span className={`block h-px w-5 bg-[var(--fg)] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-px w-5 bg-[var(--fg)] transition-all duration-300 ${menuOpen ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-50 flex flex-col items-start justify-center gap-8 bg-[var(--bg)] px-10 transition-opacity duration-300 lg:hidden ${
          menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="font-mono text-lg tracking-[0.15em] text-[var(--fg-muted)]"
            onClick={() => setMenuOpen(false)}
            data-cursor-hover
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/#contact"
          className="font-mono text-lg tracking-[0.15em] text-[var(--fg)]"
          onClick={() => setMenuOpen(false)}
          data-cursor-hover
        >
          [ CONTACT → ]
        </Link>
      </div>
    </header>
  );
}
