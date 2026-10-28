import type { Metadata } from 'next';

import PricingBody from './PricingBody';
import JsonLd from '@/components/JsonLd';
import { MarketProvider } from '@/lib/marketContext';
import { PACKAGES, SERVICES, RETAINERS, MARKET_LIST, type PricePair } from '@/lib/pricing';
import { PRICING_FAQS } from '@/lib/pricingFaqs';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Pricing — Clear Starting Prices for Websites & Digital Work',
  description:
    'Transparent starting prices for custom websites, e-commerce, web apps and SEO. Launch from ₹15,000 / $600, Growth from ₹30,000 / $1,500, Signature from ₹60,000 / $2,500. Select India (INR) or United States (USD). Fixed-scope quote before any work begins.',
  alternates: { canonical: `${SITE_URL}/pricing` },
};

/* ── Structured data ─────────────────────────────────────────────── */

type Offer = {
  '@type': 'Offer';
  price: string;
  priceCurrency: 'INR' | 'USD';
  itemOffered: { '@type': 'Service'; name: string; description: string };
};

/** Emit one Offer per market so answer engines can cite either currency. */
function offersFor(name: string, description: string, pair: PricePair): Offer[] {
  return MARKET_LIST.map((m) => ({
    '@type': 'Offer' as const,
    price: String(pair[m.code].amount),
    priceCurrency: m.currency,
    itemOffered: {
      '@type': 'Service' as const,
      name: m.code === 'US' ? `${name} (USD)` : name,
      description,
    },
  }));
}

const allOfferables = [
  ...PACKAGES.map((p) => ({ name: p.name, description: p.tagline, price: p.price })),
  ...SERVICES.map((s) => ({ name: s.name, description: s.description, price: s.price })),
  ...RETAINERS.map((r) => ({ name: `${r.name} (monthly)`, description: r.description, price: r.price })),
];

const offerCatalogSchema = {
  '@context': 'https://schema.org',
  '@type': 'OfferCatalog',
  name: 'Vortex Labs pricing',
  url: `${SITE_URL}/pricing`,
  itemListElement: allOfferables.flatMap((item) =>
    offersFor(item.name, item.description, item.price)
  ),
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: PRICING_FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

/* ── Page ────────────────────────────────────────────────────────── */

export default function PricingPage() {
  return (
    <>
      <JsonLd data={[offerCatalogSchema, faqSchema]} />
      <MarketProvider>
        <PricingBody />
      </MarketProvider>
    </>
  );
}
