import Image from 'next/image';
import Link from 'next/link';
import { SITE, SERVICES } from '@/lib/site';

const STUDIO_LINKS = [
  { href: '/work', label: 'Work' },
  { href: '/services', label: 'Services' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/blog', label: 'Journal' },
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQ' },
];

/**
 * Site-wide footer. Doubles as the GEO "NAP" block: location and
 * contact facts rendered consistently on every page.
 */
export default function SiteFooter() {
  const location = [SITE.city, SITE.region, SITE.country].filter(Boolean).join(', ');

  return (
    <footer className="relative z-10 border-t border-white/5 bg-[var(--bg)] px-6 pt-16 pb-10 sm:px-10 lg:px-[7vw]">
      <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <Image
            src="/logo.png"
            alt="Vortex Labs"
            width={140}
            height={28}
            className="h-6 w-auto opacity-80"
          />
          <p className="mt-5 max-w-[26ch] text-sm font-light leading-relaxed text-[var(--fg-muted)]">
            Independent web design &amp; Next.js engineering studio. Designed, built and shipped by one operator.
          </p>
          {location && (
            <p className="mt-5 font-mono text-[10px] tracking-[0.2em] text-[var(--fg-dim)]">
              {location.toUpperCase()} · REMOTE-FIRST
            </p>
          )}
        </div>

        {/* Studio */}
        <nav aria-label="Studio">
          <h2 className="font-mono text-[10px] tracking-[0.3em] text-[var(--fg-dim)]">STUDIO</h2>
          <ul className="mt-5 space-y-3">
            {STUDIO_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  data-cursor-hover
                  className="text-sm font-light text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Services */}
        <nav aria-label="Services">
          <h2 className="font-mono text-[10px] tracking-[0.3em] text-[var(--fg-dim)]">SERVICES</h2>
          <ul className="mt-5 space-y-3">
            {SERVICES.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  data-cursor-hover
                  className="text-sm font-light text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)]"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <h2 className="font-mono text-[10px] tracking-[0.3em] text-[var(--fg-dim)]">CONTACT</h2>
          <ul className="mt-5 space-y-3">
            <li>
              <a
                href={`mailto:${SITE.email}`}
                data-cursor-hover
                className="text-sm font-light text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)]"
              >
                {SITE.email}
              </a>
            </li>
            <li>
              <Link href="/#contact" data-cursor-hover className="text-sm font-light text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)]">
                Start a build →
              </Link>
            </li>
            <li>
              <a
                href={SITE.calComUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="text-sm font-light text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)]"
              >
                Book a discovery call ↗
              </a>
            </li>
          </ul>
          <ul className="mt-6 flex gap-4">
            {SITE.socials.map((social) => (
              <li key={social.url}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer me"
                  data-cursor-hover
                  className="font-mono text-[10px] tracking-[0.2em] text-[var(--fg-dim)] transition-colors hover:text-[var(--fg-muted)]"
                >
                  {social.label.toUpperCase()} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-14 flex flex-col gap-3 border-t border-white/5 pt-8 font-mono text-[9px] tracking-wider text-[var(--fg-dim)] sm:flex-row sm:items-center sm:justify-between sm:text-[10px] md:text-[11px]">
        <span>
          © {new Date().getFullYear()} {SITE.legalName} — DESIGN / ENGINEERING / DEPLOYMENT
        </span>
        <span>ENGINEERED BY ONE · {SITE.country.toUpperCase()}</span>
      </div>
    </footer>
  );
}
