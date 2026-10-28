import type { FaqItem } from '@/lib/faq';

/**
 * Per-service FAQs for service pages (with their own FAQPage schema).
 * Kept focused on buying questions specific to each engagement.
 */

export const SERVICE_FAQS: Record<string, FaqItem[]> = {
  'web-design': [
    {
      q: 'Do you use website templates or design from scratch?',
      a: 'Every layout is designed from scratch for the brand — no ThemeForest templates, no recycled section libraries. Existing design systems are extended where they exist; new ones are built where they do not.',
      group: 'technical',
    },
    {
      q: 'Do you write the copy for the website too?',
      a: 'Copy structure and section strategy are included — the argument architecture that makes a page convert. Full copywriting can be handled too, or your writer works directly against the design frames.',
      group: 'process',
    },
    {
      q: 'How many design revisions are included?',
      a: 'One structured revision round at the high-fidelity design stage is standard, and it usually suffices because review happens before build starts. Additional rounds are quoted transparently — never sprung as surprise change orders.',
      group: 'process',
    },
  ],
  'nextjs-development': [
    {
      q: 'How much does Next.js website development cost?',
      a: 'Landing systems start at USD $500 (₹25,000) and full marketing sites at USD $1,500 (₹75,000), depending on page count, CMS complexity and motion requirements. USD applies to international projects, INR to India-based teams. Every project is fixed-scope quoted after discovery — you approve the number before the build starts.',
      group: 'hiring',
    },
    {
      q: 'Which CMS do you build on?',
      a: 'Most often Sanity, Contentful or file-based MDX, chosen by team size and editorial workflow. The editing experience is designed for whoever publishes content — marketers get a safe interface, developers get clean structured content.',
      group: 'technical',
    },
    {
      q: 'Can you take over an existing Next.js codebase?',
      a: 'Yes. Audits, performance rescue missions and feature work on existing Next.js apps are routine engagements. The first step is a technical review so you know exactly what state the codebase is in before any work begins.',
      group: 'hiring',
    },
  ],
  'headless-shopify': [
    {
      q: 'How much does headless Shopify cost?',
      a: 'Headless storefronts start at USD $4,000 (₹2,00,000) and scale with catalog complexity, custom UX and migration scope. Shopify Plus brands moving off theme limitations are the typical profile — the exact number is fixed after a scoping call.',
      group: 'hiring',
    },
    {
      q: 'Will my team still manage products in Shopify?',
      a: 'Yes — that is the point of headless. Admin, inventory, payments, orders and fulfilment stay in Shopify exactly as today. Only the customer-facing storefront is rebuilt, on the Storefront API.',
      group: 'technical',
    },
    {
      q: 'Is headless Shopify worth it for a small store?',
      a: 'Usually not. If a well-built premium theme converts fine, the investment belongs elsewhere. Headless pays off when theme constraints cost conversions, page speed or brand expression — typically at real catalog and traffic scale.',
      group: 'technical',
    },
  ],
  'performance-seo': [
    {
      q: 'How long does a Core Web Vitals fix take?',
      a: 'Most performance rescue missions land in one to three weeks: audit in days, fixes prioritized by impact, gains verified against field data. Larger rewrites of rendering architecture take longer and are scoped separately.',
      group: 'process',
    },
    {
      q: 'Do you guarantee first-page Google rankings?',
      a: 'No one honest does. What is guaranteed: a technically flawless foundation — crawlable, fast, structured-data-correct — which is the part an engineer controls. Rankings then depend on content, authority and competition.',
      group: 'hiring',
    },
    {
      q: 'Can you fix performance on a site you did not build?',
      a: 'Yes — most performance engagements are on inherited codebases. The stack matters less than the diagnosis: bundle architecture, rendering strategy, image pipelines and third-party scripts are where speed usually dies.',
      group: 'technical',
    },
  ],
};
