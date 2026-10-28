/**
 * Single source of truth for FAQ content.
 * Consumed by: the homepage <Answers /> accordion, the /faq page,
 * and the FAQPage JSON-LD schema — so structured data can never
 * drift from what's rendered on the page (a Google requirement).
 *
 * Question set is shaped for search demand + answer engines:
 * each answer is self-contained and extractable (40–70 words).
 */

export type FaqItem = {
  /** The search-demand / AEO question */
  q: string;
  a: string;
  /** Group for the /faq page: "hiring" | "process" | "technical" */
  group: "hiring" | "process" | "technical";
};

export const FAQS: FaqItem[] = [
  {
    q: "How much does a Next.js website cost?",
    a: "Landing systems start at USD $500 (₹25,000), full marketing sites at USD $1,500 (₹75,000), and headless commerce builds at USD $4,000 (₹2,00,000). Care plans run USD $150/mo (₹8,000/mo). USD pricing applies to international projects, INR to businesses based in India. Every project is quoted at a fixed scope after a free discovery call — you approve the number before anything begins. No hourly billing, no surprise invoices, no generic packages.",
    group: "hiring",
  },
  {
    q: "How long does a website build take?",
    a: "Landing systems ship in 1–2 weeks. Full marketing sites typically take 3–6 weeks. Headless commerce builds run 6–10 weeks, depending on catalog complexity and content readiness. You get a concrete schedule at scope, and it holds — the timeline is agreed before you pay, not guessed mid-build.",
    group: "process",
  },
  {
    q: "What is headless Shopify, and is it worth it?",
    a: "Headless Shopify keeps Shopify's admin, payments and operations as your backend, while the customer-facing storefront is rebuilt in Next.js for full design control and much faster loads. It's worth it when theme limitations cost you conversions or brand expression. It's overkill for stores doing well on a good theme.",
    group: "technical",
  },
  {
    q: "Do you work with clients in the US and Europe?",
    a: "Yes. Vortex Labs is based in India and works remotely with clients across the United States and the European Union. Async updates keep projects moving in your timezone, and scheduled calls are booked at times that work for you — several hours of overlap are available daily.",
    group: "hiring",
  },
  {
    q: "Do you offer pricing in Indian rupees?",
    a: "Yes — every tier is published in both currencies. USD rates apply to international projects; INR rates to businesses based in India: landing systems from ₹25,000, marketing sites from ₹75,000, headless commerce from ₹2,00,000, and care plans from ₹8,000/month. Billing in INR via bank transfer (NEFT/RTGS) or UPI for India-based teams, and in USD via international transfer or Stripe for overseas clients.",
    group: "hiring",
  },
  {
    q: "Who owns the website after it's built?",
    a: "You do — entirely. Repository, deployment pipeline, domain, analytics and documentation all transfer at handover. No proprietary platform, no monthly hostage fees, no dependency on me to make changes. Any competent developer can pick up the codebase the day it ships.",
    group: "hiring",
  },
  {
    q: "Do you offer maintenance and ongoing support?",
    a: "Yes. Structured monthly care plans cover updates, performance monitoring and iterative improvements. Ad-hoc support is available for everything else. Either way, the person who built your site maintains it — there is no second team learning your codebase at your expense.",
    group: "hiring",
  },
  {
    q: "Why hire a solo studio instead of an agency?",
    a: "Agencies coordinate; a studio of one builds. One accountable operator means decisions happen in hours instead of standups, budgets go into craft instead of overhead, and the person designing your interface writes its production code. You get agency-grade output without agency-grade drag.",
    group: "hiring",
  },
  {
    q: "What do you need from me to start a project?",
    a: "A 30-minute discovery call first. Then brand assets, content direction and platform access at kickoff. From there you review at defined checkpoints — design, pre-launch — while everything else is handled end-to-end. Content can also be produced for you if writing isn't your strength.",
    group: "process",
  },
  {
    q: "Which technologies do you build with?",
    a: "Next.js and React with TypeScript, headless Shopify (Hydrogen, Storefront API), modern headless CMSes (Sanity, Contentful, MDX), GSAP for motion, and Vercel for edge deployment. Every build is performance-tested against Core Web Vitals budgets before launch.",
    group: "technical",
  },
  {
    q: "How do revisions work during a build?",
    a: "You review high-fidelity design before a single component ships, so iteration happens early — where it's cheap. During the build phase, changes move fast because the designer and the developer are the same person. There is no telephone game between disciplines, and no change-order theatre.",
    group: "process",
  },
];
