/**
 * Starting-range pricing — shared by the /pricing page, FAQ answers,
 * blog figures, llms.txt and schema. Edit the numbers here and every
 * surface updates.
 *
 * Strategy: geo-differentiated entry pricing sized to convert maximum
 * enquiries. USD bands sit at the trusted entry points of the US/EU
 * freelance market; INR bands sit above Indian freelancer floors so
 * budget-only seekers filter themselves out. USD ≈ 1.7× INR.
 */

export type PricingTier = {
  code: string;
  name: string;
  from: number;
  fromInr: number;
  timeline: string;
  summary: string;
  includes: string[];
  bestFor: string;
};

export const PRICING: PricingTier[] = [
  {
    code: "01",
    name: "Landing Systems",
    from: 500,
    fromInr: 25000,
    timeline: "1–2 weeks",
    summary:
      "High-conversion landing pages and campaign systems — designed, built and measured. Ideal for launches, funding announcements and paid-traffic destinations.",
    includes: [
      "Custom design (no templates)",
      "Next.js build, deployed to the edge",
      "Copy structure & section strategy",
      "GA4 event tracking on key actions",
      "Core Web Vitals pass on launch",
      "One revision round at design stage",
    ],
    bestFor: "Startups launching a product, campaign, or funding round.",
  },
  {
    code: "02",
    name: "Marketing Sites",
    from: 1500,
    fromInr: 75000,
    timeline: "3–6 weeks",
    summary:
      "Full brand websites with multiple page templates, motion systems and a content setup your team can actually operate. The default engagement for most clients.",
    includes: [
      "Information architecture & page strategy",
      "High-fidelity design across breakpoints",
      "Next.js + headless CMS (content self-serve)",
      "GSAP motion choreography",
      "Technical SEO + structured data",
      "Analytics, Search Console, launch support",
    ],
    bestFor: "Brands and startups that need a site carrying real weight.",
  },
  {
    code: "03",
    name: "Headless Commerce",
    from: 4000,
    fromInr: 200000,
    timeline: "6–10 weeks",
    summary:
      "Shopify decoupled: custom storefronts in Next.js or Hydrogen on the backend your team already knows. Built for catalog scale and conversion.",
    includes: [
      "Storefront architecture & design system",
      "Shopify Storefront API / Hydrogen build",
      "Custom PDP, cart & collection experiences",
      "Edge delivery and image pipelines",
      "Migration & operational continuity",
      "Performance budgets enforced end-to-end",
    ],
    bestFor: "DTC brands outgrowing theme performance or design ceilings.",
  },
  {
    code: "04",
    name: "Care Plans",
    from: 150,
    fromInr: 8000,
    timeline: "Monthly",
    summary:
      "Ongoing improvements, performance monitoring and priority support from the person who built the site. Cancel anytime, no lock-in.",
    includes: [
      "Continuous performance & uptime monitoring",
      "Monthly improvement allotment",
      "Dependency & security updates",
      "Content and iteration support",
      "Quarterly performance reports",
      "Priority response window",
    ],
    bestFor: "Any live site that needs a permanent, accountable owner.",
  },
];

export function formatFrom(n: number) {
  return `USD $${n.toLocaleString("en-US")}+`;
}

export function formatInr(n: number) {
  return `₹${n.toLocaleString("en-IN")}+`;
}
