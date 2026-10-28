/**
 * Centralized pricing configuration — the single source of truth for
 * every price shown on the site.
 *
 * Consumed by:
 *   - the /pricing page (packages, specialized services, retainers, schema)
 *   - the pricing enquiry form (budget bands, prefill, market defaults)
 *   - FAQ answers in src/lib/faq.ts and src/lib/serviceFaqs.ts
 *   - blog metadata in src/lib/posts.ts and public/llms.txt
 *
 * Market strategy: two served markets, each with its own authoritative
 * price list. Prices are NEVER converted from one currency to another at
 * a live exchange rate — each market carries its own tuned figures, and
 * both are written here explicitly so a single edit updates every surface.
 */

export type Market = 'IN' | 'US';

export type Money = {
  /** Whole units in the market's currency (e.g. 15000 → ₹15,000 / 600 → $600) */
  amount: number;
  /** true for recurring services (care, retainer) */
  monthly?: boolean;
};

export type PricePair = { IN: Money; US: Money };

export type MarketMeta = {
  code: Market;
  label: string;
  shortLabel: string;
  currency: 'INR' | 'USD';
  symbol: string;
  /** toLocaleString locale for correct grouping (₹2,00,000 vs $4,500) */
  locale: string;
  /** "India" / "United States" — used in copy + enquiry form */
  country: string;
};

export const MARKETS: Record<Market, MarketMeta> = {
  IN: {
    code: 'IN',
    label: 'India',
    shortLabel: 'IN',
    currency: 'INR',
    symbol: '₹',
    locale: 'en-IN',
    country: 'India',
  },
  US: {
    code: 'US',
    label: 'United States',
    shortLabel: 'US',
    currency: 'USD',
    symbol: '$',
    locale: 'en-US',
    country: 'United States',
  },
};

export const MARKET_LIST: MarketMeta[] = [MARKETS.IN, MARKETS.US];

/** Grouped, symbol-prefixed price for the active market. No trailing "from" — callers add that. */
export function formatPrice(pair: PricePair, market: Market): string {
  const meta = MARKETS[market];
  const amount = pair[market].amount;
  const formatted = amount.toLocaleString(meta.locale, { maximumFractionDigits: 0 });
  const suffix = pair[market].monthly ? '/mo' : '';
  return `${meta.symbol}${formatted}${suffix}`;
}

/** Grouped, symbol-prefixed amount for a single Money value (used for budget bands). */
export function formatMoney(money: Money, market: Market): string {
  const meta = MARKETS[market];
  const formatted = money.amount.toLocaleString(meta.locale, { maximumFractionDigits: 0 });
  return `${meta.symbol}${formatted}${money.monthly ? '/mo' : ''}`;
}

/* ── Website design & development packages ───────────────────────── */

export type PackageDef = {
  id: string;
  code: string;
  name: string;
  /** One-line positioning */
  tagline: string;
  price: PricePair;
  deliverables: string[];
  /** Explicit exclusions shown before the client commits */
  excludes: string[];
  /** Delivery window in business days, after prerequisites */
  timeline: string;
  /** Number of revision rounds included (drives the commercial terms too) */
  revisions: number;
  cta: string;
  /** Emphasise as the recommended tier (subtle, not a loud badge) */
  recommended?: boolean;
};

export const PACKAGES: PackageDef[] = [
  {
    id: 'launch',
    code: '01',
    name: 'Launch',
    tagline: 'A focused landing page for a business, product, or campaign.',
    price: { IN: { amount: 15000 }, US: { amount: 600 } },
    deliverables: [
      'One custom-designed landing page',
      'Responsive desktop and mobile layouts',
      'Contact form or WhatsApp integration',
      'Basic metadata and technical SEO setup',
      'One revision round',
      'Target delivery: 5–7 business days',
    ],
    excludes: [
      'Complex backend functionality',
      'Extensive copywriting',
      'Advanced animations',
      'Third-party subscription costs',
    ],
    timeline: '5–7 business days',
    revisions: 1,
    cta: 'Start a project',
  },
  {
    id: 'growth',
    code: '02',
    name: 'Growth',
    tagline: 'A complete business website designed to establish credibility and generate enquiries.',
    price: { IN: { amount: 30000 }, US: { amount: 1500 } },
    deliverables: [
      'Up to five pages',
      'Custom visual design and responsive development',
      'Contact forms and lead-generation CTAs',
      'WhatsApp or other agreed contact integrations',
      'On-page SEO fundamentals',
      'Analytics setup, subject to account availability and access',
      'Two revision rounds',
      'Target delivery: 7–14 business days',
    ],
    excludes: [
      'Complex backend or portal functionality',
      'Extensive copywriting or content migration',
      'Third-party subscription costs',
    ],
    timeline: '7–14 business days',
    revisions: 2,
    cta: 'Discuss your website',
    recommended: true,
  },
  {
    id: 'signature',
    code: '03',
    name: 'Signature',
    tagline: 'A bespoke digital experience for established businesses and brands.',
    price: { IN: { amount: 60000 }, US: { amount: 2500 } },
    deliverables: [
      'Up to eight pages',
      'Bespoke visual design and brand-led art direction',
      'Advanced motion and interactions where appropriate',
      'CMS integration for agreed content types',
      'Performance optimization and technical SEO',
      'Analytics and conversion tracking setup',
      'Two revision rounds',
      'Target delivery: 15–21 business days',
    ],
    excludes: [
      'Complex backend or portal functionality',
      'Extensive copywriting or content migration',
      'Third-party subscription costs',
    ],
    timeline: '15–21 business days',
    revisions: 2,
    cta: 'Plan a signature project',
  },
];

/* ── Specialized services ("Beyond websites") ─────────────────────── */

export type ServiceDef = {
  id: string;
  code: string;
  name: string;
  description: string;
  price: PricePair;
  /** Complex scopes get an explicit "scoped after discovery" note */
  scoped?: boolean;
};

export const SERVICES: ServiceDef[] = [
  {
    id: 'redesign',
    code: 'S1',
    name: 'Website redesign',
    description:
      'Rethink an existing site — structure, design and build — without losing what already works.',
    price: { IN: { amount: 25000 }, US: { amount: 1000 } },
    scoped: true,
  },
  {
    id: 'shopify-standard',
    code: 'S2',
    name: 'Standard Shopify development',
    description:
      'A properly built Shopify store on a premium theme — configured, branded and ready to sell.',
    price: { IN: { amount: 60000 }, US: { amount: 1800 } },
    scoped: true,
  },
  {
    id: 'shopify-headless',
    code: 'S3',
    name: 'Headless Shopify commerce',
    description:
      'A custom Shopify storefront decoupled from the theme layer for full design and performance control.',
    price: { IN: { amount: 200000 }, US: { amount: 4500 } },
    scoped: true,
  },
  {
    id: 'web-app',
    code: 'S4',
    name: 'Custom web applications',
    description:
      'Bespoke web software — dashboards, portals, internal tools — built around how your team actually works.',
    price: { IN: { amount: 100000 }, US: { amount: 3500 } },
    scoped: true,
  },
  {
    id: 'ai-integration',
    code: 'S5',
    name: 'AI/API integrations',
    description:
      'Wire AI models and third-party APIs into your product or site for real, working features.',
    price: { IN: { amount: 25000 }, US: { amount: 900 } },
    scoped: true,
  },
  {
    id: 'seo-audit',
    code: 'S6',
    name: 'Technical SEO audits',
    description:
      'A deep technical review of crawlability, speed, structure and metadata — with a prioritized fix list.',
    price: { IN: { amount: 8000 }, US: { amount: 250 } },
  },
  {
    id: 'seo-implementation',
    code: 'S7',
    name: 'SEO implementation',
    description:
      'Put the audit to work — structured data, performance and technical fixes implemented end to end.',
    price: { IN: { amount: 20000 }, US: { amount: 750 } },
    scoped: true,
  },
  {
    id: 'packaging',
    code: 'S8',
    name: 'Packaging design',
    description: 'Distinctive product packaging designed to stand out on shelf and on screen.',
    price: { IN: { amount: 15000 }, US: { amount: 400 } },
  },
  {
    id: 'art-direction',
    code: 'S9',
    name: 'Product presentation & art direction',
    description:
      'Cohesive art direction and product presentation that makes the whole catalogue feel considered.',
    price: { IN: { amount: 10000 }, US: { amount: 300 } },
  },
];

/* ── Ongoing partnerships (recurring) ────────────────────────────── */

export type RetainerDef = {
  id: string;
  code: string;
  name: string;
  description: string;
  price: PricePair;
  includes: string[];
  /** Explicit limits — never promise unlimited anything */
  limits: string;
};

export const RETAINERS: RetainerDef[] = [
  {
    id: 'care',
    code: '01',
    name: 'Website care',
    description: 'Keep a live site healthy — maintained, checked and quietly improving.',
    price: { IN: { amount: 4000, monthly: true }, US: { amount: 125, monthly: true } },
    includes: [
      'Routine maintenance and technical checks',
      'Dependency updates where applicable',
      'A limited, agreed support allowance each month',
    ],
    limits:
      'Includes an explicitly limited support allowance — not unlimited work. Hours, response expectations and rollover terms are defined in the service agreement.',
  },
  {
    id: 'retainer',
    code: '02',
    name: 'Development retainer',
    description: 'Reserved development capacity for ongoing improvements, fixes and feature work.',
    price: { IN: { amount: 20000, monthly: true }, US: { amount: 750, monthly: true } },
    includes: [
      'Ongoing development capacity each month',
      'Agreed improvements, fixes and small features',
      'Prioritised turnaround on agreed work',
    ],
    limits:
      'Capacity is for agreed improvements, fixes and feature work — not unlimited revisions or 24/7 support. Included hours, response expectations, rollover and third-party expenses are defined in the service agreement.',
  },
];

/* ── Enquiry budget bands (market-specific) ──────────────────────── */

export type BudgetBand = { label: string; value: string };

export const BUDGET_BANDS: Record<Market, BudgetBand[]> = {
  IN: [
    { label: 'Under ₹15,000', value: 'under-15k' },
    { label: '₹15,000–₹30,000', value: '15k-30k' },
    { label: '₹30,000–₹60,000', value: '30k-60k' },
    { label: '₹60,000–₹1,00,000', value: '60k-100k' },
    { label: '₹1,00,000+', value: '100k-plus' },
    { label: 'Not sure yet', value: 'not-sure' },
  ],
  US: [
    { label: 'Under $600', value: 'under-600' },
    { label: '$600–$1,500', value: '600-1500' },
    { label: '$1,500–$2,500', value: '1500-2500' },
    { label: '$2,500–$5,000', value: '2500-5000' },
    { label: '$5,000+', value: '5000-plus' },
    { label: 'Not sure yet', value: 'not-sure' },
  ],
};

/* ── Shared engagement copy ──────────────────────────────────────── */

/** "What every project includes" — the standard engagement steps. */
export const ENGAGEMENT_STEPS = [
  { n: '01', title: 'Discovery & requirements', body: 'We establish what you are building, who it is for, and what success looks like.' },
  { n: '02', title: 'Written scope & quotation', body: 'A clear, fixed-scope quote covering deliverables, timeline and price — approved before any work begins.' },
  { n: '03', title: 'Design & implementation', body: 'Design and build, with the same person handling both — no handoff loss.' },
  { n: '04', title: 'Review & agreed revisions', body: 'You review at defined checkpoints with the revision rounds included in your package.' },
  { n: '05', title: 'Testing & handover', body: 'Tested, performance-checked and handed over with everything you need to own it.' },
] as const;

/** Commercial terms — kept in one place so the page and FAQ never drift. */
export const TERMS = [
  { label: 'Payment', body: '50% upfront, 30% at an agreed milestone, and 20% before launch or handover.' },
  { label: 'Revisions', body: 'One round for Launch, two rounds for Growth and Signature. Additional rounds are quoted before they start.' },
  { label: 'Scope changes', body: 'Quoted and approved in writing before any work begins — never sprung as a surprise.' },
  { label: 'Third-party costs', body: 'Hosting, domains, paid APIs, plugins and other third-party expenses are excluded unless explicitly included in the quote.' },
  { label: 'Delivery timelines', body: 'Estimates, subject to timely receipt of content, assets, access and approvals.' },
  { label: 'Taxes', body: 'Applicable taxes are handled according to the agreed quotation and relevant requirements.' },
] as const;
