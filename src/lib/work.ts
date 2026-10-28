/**
 * Case study data — shared by the homepage exhibits, /work index
 * and /work/[slug] pages.
 *
 * Attribution policy: real client names + qualitative outcomes +
 * verifiable technical facts. No invented metrics.
 */

export type Project = {
  slug: string;
  index: string;
  name: string;
  hook: string;
  quote: string;
  quoteAuthor: string;
  quoteRole: string;
  metaLine: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  reversed?: boolean;
  /** For case-study pages */
  industry: string;
  services: string[];
  stack: string[];
  year: string;
  challenge: string;
  approach: string[];
  outcome: string[];
};

export const PROJECTS: Project[] = [
  {
    slug: "winit-media",
    index: "01",
    name: "WINIT MEDIA",
    hook: "Built a kinetic typography system and custom SVG interactive diagrams with buttery-smooth scroll triggers. Architected a secure, multi-domain enterprise platform so their internal team can safely edit content and manage leads without risking the platform's stability.",
    quote:
      "We needed a secure, multi-tenant ecosystem for our leads and editors. Vortex engineered a fortress.",
    quoteAuthor: "Founder",
    quoteRole: "Winit Media",
    metaLine: "DESIGN + DEVELOPMENT / BRAND WEBSITE / NEXT.JS / GSAP SCROLLTRIGGER / 2026",
    href: "https://winitmedia.com",
    imageSrc: "/wm1.webp",
    imageAlt: "Winit Media enterprise platform interface",
    industry: "Media & Marketing",
    services: ["Web Design", "Next.js Development"],
    stack: ["Next.js", "GSAP ScrollTrigger", "Multi-domain architecture"],
    year: "2026",
    challenge:
      "Winit Media's public site and internal operations lived in fragile, template-bound tools. Their editors were one bad edit away from breaking the platform, and the brand's visual ambition had no way to ship.",
    approach: [
      "A kinetic typography and SVG-diagram system built on GSAP ScrollTrigger — expressive, but performant by budget.",
      "A multi-domain architecture separating the public brand surface from the internal platform, so content operations can never endanger the live site.",
      "Role-scoped editing so their team ships content safely, without touching code or risking the platform's stability.",
    ],
    outcome: [
      "Editors publish and manage leads independently, with no developer in the loop.",
      "Public and internal surfaces scaled on separate domains — stability isolated from ambition.",
      "A brand site that performs like a showreel and reads like a product.",
    ],
  },
  {
    slug: "prince-achar",
    index: "02",
    name: "PRINCE ACHAR",
    hook: "Engineered a high-performance headless Shopify build with seamless GSAP page transitions and edge-delivered visual assets. Bypassed Shopify's rigid templates to deliver instant page loads, creating a frictionless shopping experience designed to maximize conversion rates.",
    quote:
      "Aditya entirely decoupled our infrastructure, giving us an enterprise-grade storefront without sacrificing our existing operational backend.",
    quoteAuthor: "Founder",
    quoteRole: "Prince Achar",
    metaLine: "DESIGN + DEVELOPMENT / E-COMMERCE / NEXT.JS / SHOPIFY / GSAP / 2026",
    href: "https://princeachar.com",
    imageSrc: "/pa1.webp",
    imageAlt: "Prince Achar headless commerce storefront",
    reversed: true,
    industry: "DTC E-Commerce",
    services: ["Headless Shopify", "Web Design"],
    stack: ["Next.js", "Shopify Storefront API", "GSAP"],
    year: "2026",
    challenge:
      "The brand had outgrown its Shopify theme: slow page transitions, template-locked layouts and a storefront that couldn't carry the brand's premium positioning.",
    approach: [
      "Decoupled the storefront from Shopify's theme layer — Next.js on the front, Shopify's admin, payments and operations untouched behind it.",
      "GSAP page transitions and edge-delivered imagery for instant, cinematic navigation.",
      "A PDP and cart experience designed around conversion, not template constraints.",
    ],
    outcome: [
      "An enterprise-grade storefront on top of the backend the team already knew.",
      "Instant page loads — theme overhead removed from the critical path.",
      "Full design control with zero disruption to day-to-day operations.",
    ],
  },
  {
    slug: "upmark-media",
    index: "03",
    name: "UPMARK MEDIA",
    hook: "Orchestrated a highly interactive React frontend with Framer Motion and cinematic scroll reveals. Engineered a zero-deploy, automated content platform allowing their marketing team to instantly upload massive, high-resolution media assets without ever touching code.",
    quote:
      "The kinetic UI is flawless, but the real masterpiece is the zero-deploy content pipeline Aditya built for our team.",
    quoteAuthor: "Founder",
    quoteRole: "Upmark Media",
    metaLine: "DESIGN + DEVELOPMENT / DIGITAL EXPERIENCE / NEXT.JS / FRAMER MOTION / 2026",
    href: "https://upmarkmedia.com",
    imageSrc: "/um1.webp",
    imageAlt: "Upmark Media content platform interface",
    industry: "Digital Media",
    services: ["Next.js Development", "Web Design"],
    stack: ["Next.js", "Framer Motion", "Automated media pipeline"],
    year: "2026",
    challenge:
      "Every content update required a developer and a deploy. Their marketing team was bottlenecked on engineering for work that should take minutes.",
    approach: [
      "A cinematic React frontend with Framer Motion scroll reveals, built to stay smooth under heavy media.",
      "An automated content pipeline letting the marketing team upload and publish massive, high-resolution media assets directly.",
      "Zero-deploy publishing: content changes go live without a build pipeline run.",
    ],
    outcome: [
      "Marketing ships content instantly — engineering is out of the critical path.",
      "High-resolution media handled without tanking page performance.",
      "A kinetic interface that stays cinematic under real content loads.",
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
