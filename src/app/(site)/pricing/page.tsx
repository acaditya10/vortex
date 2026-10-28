import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import CtaBand from '@/components/CtaBand';
import JsonLd from '@/components/JsonLd';
import { PRICING, formatFrom, formatInr } from '@/lib/pricing';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Pricing — Starting Ranges',
  description:
    'Transparent starting prices for web design, Next.js development, headless Shopify and care plans. Landing pages from USD $500 (₹25,000); marketing sites from USD $1,500 (₹75,000). USD for international clients, INR for India. Fixed-scope quotes after discovery.',
  alternates: { canonical: `${SITE_URL}/pricing` },
};

const pricingSchema = {
  '@context': 'https://schema.org',
  '@type': 'OfferCatalog',
  name: 'Vortex Labs pricing',
  url: `${SITE_URL}/pricing`,
  // One offer per tier per currency so answer engines can cite either.
  itemListElement: PRICING.flatMap((tier, i) => [
    {
      '@type': 'Offer',
      position: i * 2 + 1,
      price: String(tier.from),
      priceCurrency: 'USD',
      itemOffered: {
        '@type': 'Service',
        name: tier.name,
        description: tier.summary,
        provider: { '@id': `${SITE_URL}/#organization` },
      },
    },
    {
      '@type': 'Offer',
      position: i * 2 + 2,
      price: String(tier.fromInr),
      priceCurrency: 'INR',
      itemOffered: {
        '@type': 'Service',
        name: `${tier.name} (India)`,
        description: tier.summary,
        provider: { '@id': `${SITE_URL}/#organization` },
      },
    },
  ]),
};

const FACTORS = [
  {
    title: 'SCOPE & PAGE COUNT',
    body: 'A single landing page and a twelve-template marketing site are different animals. Scope is defined page-by-page before any number is quoted.',
  },
  {
    title: 'MOTION COMPLEXITY',
    body: 'Standard transitions cost little. Bespoke choreography — scroll systems, kinetic type, 3D — is real engineering time, priced honestly.',
  },
  {
    title: 'CONTENT READINESS',
    body: 'Copy and assets in hand keeps budgets tight. Content strategy, copywriting or production can be added when they are not.',
  },
  {
    title: 'INTEGRATIONS',
    body: 'CMS, commerce, analytics, CRM, payments — each integration is scoped and quoted individually, never assumed.',
  },
];

export default function PricingPage() {
  return (
    <>
      <JsonLd data={pricingSchema} />
      <section className="relative z-10 px-6 py-20 sm:px-10 sm:py-28 lg:pl-[7vw] lg:pr-[7vw]">
        <PageHero
          kicker="00 // PRICING"
          title="Starting prices, published."
          intro="Most studios hide pricing to filter you into a sales call. These are real starting ranges — if your project sits near them, the call will be worth both our time. USD for international projects, INR for businesses based in India. Every engagement is fixed-scope: you approve the full number before work begins."
        />

        <div className="mt-16 grid gap-px border border-white/5 bg-white/5 lg:grid-cols-2">
          {PRICING.map((tier) => (
            <article key={tier.code} className="flex flex-col bg-[var(--bg)] p-8 sm:p-10">
              <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--fg-dim)]">
                {tier.code} · {tier.timeline.toUpperCase()}
              </p>
              <h2 className="mt-4 text-2xl font-bold tracking-[-0.02em] text-[var(--fg)]">
                {tier.name}
              </h2>
              <p className="mt-4 font-mono text-lg tracking-wider text-[var(--accent)]">
                FROM {formatFrom(tier.from)}
              </p>
              <p className="mt-1.5 font-mono text-[11px] tracking-[0.15em] text-[var(--fg-dim)]">
                INDIA · FROM {formatInr(tier.fromInr)}
              </p>
              <p className="mt-5 max-w-md text-sm font-light leading-relaxed text-gray-400">
                {tier.summary}
              </p>
              <ul className="mt-7 flex-1 space-y-3">
                {tier.includes.map((item) => (
                  <li key={item} className="flex gap-3 text-sm font-light leading-relaxed text-gray-300">
                    <span className="font-mono text-[11px] text-[var(--accent)]">→</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-8 border-t border-white/5 pt-6 font-mono text-[10px] tracking-[0.2em] text-[var(--fg-dim)]">
                BEST FOR — {tier.bestFor.toUpperCase()}
              </p>
            </article>
          ))}
        </div>

        {/* Dual-currency note */}
        <p className="mt-6 max-w-3xl font-mono text-[11px] leading-relaxed tracking-[0.1em] text-[var(--fg-dim)]">
          USD RATES APPLY TO INTERNATIONAL PROJECTS · INR RATES TO BUSINESSES BASED IN INDIA ·
          FINAL QUOTE FIXED AFTER DISCOVERY, ALWAYS APPROVED BY YOU BEFORE WORK STARTS
        </p>

        {/* What moves the number */}
        <div className="mt-20 grid gap-14 lg:grid-cols-[35%_65%]">
          <div>
            <h2 className="text-2xl font-bold tracking-[-0.02em] text-[var(--fg)]">
              What moves the number
            </h2>
            <div className="divider mt-6 w-12 origin-left" />
            <p className="mt-6 max-w-xs text-sm font-light leading-relaxed text-[var(--fg-muted)]">
              Four variables decide where a project lands inside its range. All four are settled at
              scope — before you commit.
            </p>
          </div>
          <div className="grid gap-px border border-white/5 bg-white/5 sm:grid-cols-2">
            {FACTORS.map((factor) => (
              <div key={factor.title} className="bg-[var(--bg)] p-7">
                <h3 className="font-mono text-[11px] font-medium tracking-[0.15em] text-[var(--fg)]">
                  {factor.title}
                </h3>
                <p className="mt-4 text-sm font-light leading-relaxed text-gray-400">{factor.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Guarantees */}
        <div className="mt-20 grid gap-10 border-t border-white/5 pt-14 lg:grid-cols-[35%_65%]">
          <h2 className="text-2xl font-bold tracking-[-0.02em] text-[var(--fg)]">How billing works</h2>
          <div className="max-w-2xl space-y-6 text-base font-light leading-[1.8] tracking-wide text-gray-300">
            <p>
              Fixed scope, fixed price, milestone-based. A deposit starts the build; the balance
              releases at launch. No hourly meters, no surprise invoices, no change-order theatre —
              scope changes are quoted in writing before anything moves.
            </p>
            <p>
              Not sure where your project fits? A 30-minute discovery call is enough to place it in a
              range — or to tell you honestly if you do not need me at all.
            </p>
            <p className="font-mono text-[10px] tracking-[0.2em] text-[var(--fg-dim)]">
              <Link href="/faq" data-cursor-hover className="transition-colors hover:text-[var(--fg-muted)]">
                MORE ANSWERS IN THE FAQ →
              </Link>
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        title="Know the range? Let's scope the real number."
        text="One call, one honest assessment, one fixed quote. You will hear back within 24 hours."
      />
    </>
  );
}
