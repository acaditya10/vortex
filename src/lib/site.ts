/**
 * Single source of truth for the brand entity.
 * Used by metadata, JSON-LD, header, footer, and every page.
 * Keeping this in one place is an AEO requirement: answer engines
 * cross-check that identity facts are identical everywhere.
 */

export const SITE_URL = "https://getvortexlabs.com";

export const SITE = {
  name: "Vortex Labs",
  legalName: "Vortex Labs",
  tagline: "Web Design & Next.js Engineering Studio",
  description:
    "Vortex Labs is an independent web design and Next.js engineering studio building premium websites, headless Shopify storefronts and digital experiences for ambitious brands worldwide. Founded by Aditya Chandra, working across the US and EU from India.",
  url: SITE_URL,
  email: "hello@getvortexlabs.com",
  /** TODO: Set your city, e.g. "Bengaluru" — powers local/GEO signals (schema, footer, llms.txt). */
  city: "",
  /** TODO: Set your state/region if applicable, e.g. "Karnataka". */
  region: "",
  country: "India",
  countryServed: ["United States", "European Union", "Worldwide"],
  foundedYear: 2025,
  priceRange: "$$$",
  founder: {
    name: "Aditya Chandra",
    jobTitle: "Founder & Engineer",
    github: "https://github.com/acaditya10",
    /** TODO: Add LinkedIn profile URL — sameAs links are strong entity-verification signals. */
    linkedin: "",
  },
  socials: [
    { label: "GitHub", url: "https://github.com/acaditya10" },
    /** TODO: Add LinkedIn, X, Dribbble, etc. — more sameAs profiles = stronger entity. */
  ],
  ga4Id: "G-SXTGB1D8LJ",
  /** TODO: Paste your Google Search Console verification token (HTML method). */
  googleSiteVerification: "",
  calComUrl: "https://cal.com/acaditya10/discovery",
} as const;

export const SERVICES = [
  {
    slug: "web-design",
    code: "01",
    title: "Web Design",
    metaTitle: "Premium Web Design Studio",
    h1: "Web design that earns attention — and converts it.",
    short:
      "High-fidelity websites for brands that refuse to look templated. Strategy, interface design and build in one operator.",
    description:
      "Premium web design for brands, startups and e-commerce companies. High-fidelity interface design, information architecture and conversion-focused page systems — designed and built by the same person, with no handoff loss.",
    deliverables: [
      "Marketing sites & brand websites",
      "Landing page systems",
      "Design systems & component libraries",
      "Information architecture & wireframes",
      "Responsive design (mobile-first)",
      "Conversion-focused page structure",
    ],
    audience: "Startups, established brands, e-commerce companies and agencies needing white-label design.",
  },
  {
    slug: "nextjs-development",
    code: "02",
    title: "Next.js Development",
    metaTitle: "Next.js Development Studio",
    h1: "Next.js engineering, typed end-to-end.",
    short:
      "Production Next.js and React builds — headless architecture, edge delivery, Core Web Vitals treated as features.",
    description:
      "Next.js and React development for teams that need speed. App Router builds with TypeScript, headless CMS integration, edge deployment and enforced performance budgets. The same engineer who designs the interface ships its production code.",
    deliverables: [
      "Next.js App Router builds",
      "TypeScript end-to-end",
      "Headless CMS integration (Sanity, Contentful, MDX)",
      "Edge deployment on Vercel",
      "Core Web Vitals budgets enforced from day one",
      "Analytics & SEO wired in at build time",
    ],
    audience: "Startups, SaaS companies, agencies needing a build partner, and brands rebuilding slow sites.",
  },
  {
    slug: "headless-shopify",
    code: "03",
    title: "Headless Shopify",
    metaTitle: "Headless Shopify Development",
    h1: "Shopify, decoupled. Full control, zero template tax.",
    short:
      "Hydrogen and Next.js storefronts on Shopify's backend — instant loads, custom UX, no disruption to operations.",
    description:
      "Headless Shopify development for brands outgrowing theme limitations. Next.js or Hydrogen storefronts on Shopify's backend — custom shopping experiences, instant page loads and full design control, while your team keeps the admin and operations they already know.",
    deliverables: [
      "Next.js / Hydrogen storefronts",
      "Shopify Storefront API integration",
      "Custom cart, PDP & collection experiences",
      "Sub-second page loads at the edge",
      "Zero disruption to existing Shopify operations",
      "CRO-minded checkout flows",
    ],
    audience: "DTC and e-commerce brands on Shopify hitting theme performance or design ceilings.",
  },
  {
    slug: "performance-seo",
    code: "04",
    title: "Performance & SEO",
    metaTitle: "Website Performance & Technical SEO",
    h1: "Speed is a feature. So is being findable.",
    sub: "",
    short:
      "Core Web Vitals rescue missions, technical SEO foundations and structured data — engineered into the build, not bolted on.",
    description:
      "Website performance engineering and technical SEO for sites that are slow, invisible, or both. Core Web Vitals optimization, image and delivery pipelines, structured data (JSON-LD), crawlability and analytics — treated as product features, not afterthoughts.",
    deliverables: [
      "Core Web Vitals audits & fixes (LCP, INP, CLS)",
      "Rendering & bundle architecture review",
      "Image pipeline & edge delivery",
      "Structured data / JSON-LD implementation",
      "Sitemaps, robots, canonical & metadata systems",
      "GA4 + Search Console measurement setup",
    ],
    audience: "Any site losing traffic or conversions to slow loads and weak technical SEO — whatever the stack.",
  },
] as const;

export type Service = (typeof SERVICES)[number];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
