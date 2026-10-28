/**
 * FAQ content for the /pricing page — single source of truth for both
 * the rendered accordion and the FAQPage JSON-LD schema, so structured
 * data can never drift from what's on the page.
 *
 * Answers are written to match the packages, specialized services and
 * commercial terms defined in src/lib/pricing.ts exactly.
 */

export type PricingFaq = { q: string; a: string };

export const PRICING_FAQS: PricingFaq[] = [
  {
    q: 'Why are these starting prices rather than fixed quotes?',
    a: 'Because scope is what sets the final number — page count, integrations, content readiness and complexity all move it. Publishing honest starting prices lets you budget and self-qualify before we ever talk; the exact figure is fixed in a written quote you approve before any work begins.',
  },
  {
    q: 'What if my project does not fit a package?',
    a: 'Most specialized work — e-commerce, custom web apps, AI/API integrations, SEO, packaging — is scoped individually and priced from its own starting figure in the section above. If it does not fit any line, tell us what you are building and we will scope it directly.',
  },
  {
    q: 'How long does a typical project take?',
    a: 'A Launch landing page targets 5–7 business days, Growth 7–14, and Signature 15–21 — each beginning once the deposit, required content, assets and access are received. These are estimates, not guarantees, and they scale with scope and how quickly content and approvals come back.',
  },
  {
    q: 'What is included in the price?',
    a: 'Each package lists its deliverables explicitly — design, responsive build, the agreed integrations, on-page SEO and revision rounds. What is not on the list is not assumed; anything extra is scoped and quoted before it is added, so there are no surprises on the invoice.',
  },
  {
    q: 'Are hosting, domains, and paid subscriptions included?',
    a: 'No — hosting, domains, paid APIs, plugins and other third-party expenses are excluded unless they are explicitly included in your written quote. You own these accounts directly, which keeps you in control and avoids markups.',
  },
  {
    q: 'How do payments work?',
    a: '50% upfront to start, 30% at an agreed milestone, and 20% before launch or handover. It is fixed-scope and milestone-based — no hourly meters and no surprise invoices.',
  },
  {
    q: 'How many revisions are included?',
    a: 'One round for Launch and two rounds for Growth and Signature, reviewed at defined checkpoints. Additional rounds are quoted transparently before they begin — never sprung as surprise change orders.',
  },
  {
    q: 'Can you redesign my existing website?',
    a: 'Yes — website redesign is a listed service, starting from its published price. We keep what already works, fix what does not, and rebuild structure, design and build without losing your existing equity.',
  },
  {
    q: 'Do you work with international clients?',
    a: 'Yes. Vortex Labs is based in India and works remotely with clients across the United States and the European Union. Select the United States pricing view for USD; async updates and scheduled calls keep projects moving in your timezone.',
  },
  {
    q: 'Do you provide ongoing maintenance and support?',
    a: 'Yes — Website care and a Development retainer are listed above as monthly services. They cover maintenance, updates and an agreed support allowance, with included hours, response expectations and rollover terms defined in the service agreement. No unlimited work or 24/7 support is promised.',
  },
];
