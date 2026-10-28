import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import CtaBand from '@/components/CtaBand';
import JsonLd from '@/components/JsonLd';
import { SERVICES, SITE, SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Web design, Next.js development, headless Shopify and performance engineering — four ways to hire Vortex Labs. Fixed-scope projects for US and EU brands, from USD $500 (₹25,000).',
  alternates: { canonical: `${SITE_URL}/services` },
};

const servicesSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Vortex Labs services',
  itemListElement: SERVICES.map((service, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Service',
      name: service.title,
      description: service.description,
      url: `${SITE_URL}/services/${service.slug}`,
      provider: { '@id': `${SITE_URL}/#organization` },
    },
  })),
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={servicesSchema} />
      <section className="relative z-10 px-6 py-20 sm:px-10 sm:py-28 lg:pl-[7vw] lg:pr-[7vw]">
        <PageHero
          kicker="00 // SERVICES"
          title="Four ways to hire the studio."
          intro="Every engagement is fixed-scope, fixed-price and run by one operator end-to-end — the person who scopes your build is the person who ships it. US and EU clients welcome; async by default, calls booked in your timezone."
        />

        <div className="mt-16 space-y-px border border-white/5 bg-white/5">
          {SERVICES.map((service) => (
            <article
              key={service.slug}
              className="grid gap-8 bg-[var(--bg)] p-8 sm:p-10 lg:grid-cols-[40%_60%] lg:gap-14"
            >
              <div>
                <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--fg-dim)]">
                  {service.code}
                </p>
                <h2 className="mt-4 text-2xl font-bold tracking-[-0.02em] text-[var(--fg)] sm:text-3xl">
                  <Link href={`/services/${service.slug}`} data-cursor-hover className="transition-colors hover:text-[var(--accent)]">
                    {service.metaTitle}
                  </Link>
                </h2>
                <p className="mt-4 max-w-md text-sm font-light leading-relaxed text-gray-400">
                  {service.short}
                </p>
                <Link
                  href={`/services/${service.slug}`}
                  data-cursor-hover
                  className="mt-6 inline-block font-mono text-[10px] tracking-[0.2em] text-[var(--fg-dim)] transition-colors hover:text-[var(--fg-muted)]"
                >
                  DETAILS →
                </Link>
              </div>
              <ul className="grid gap-x-10 gap-y-3 sm:grid-cols-2">
                {service.deliverables.map((item) => (
                  <li key={item} className="flex gap-3 text-sm font-light leading-relaxed text-gray-400">
                    <span className="font-mono text-[11px] text-[var(--accent)]">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p className="mt-10 max-w-2xl text-sm font-light leading-relaxed text-[var(--fg-muted)]">
          Not sure which fits? Most projects start with a 30-minute discovery call —{' '}
          <a
            href={SITE.calComUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="text-[var(--fg)] underline decoration-[var(--accent)]/40 underline-offset-4 transition-colors hover:decoration-[var(--accent)]"
          >
            book one here
          </a>{' '}
          or read <Link href="/pricing" data-cursor-hover className="text-[var(--fg)] underline decoration-[var(--accent)]/40 underline-offset-4">starting prices</Link>.
        </p>
      </section>

      <CtaBand />
    </>
  );
}
