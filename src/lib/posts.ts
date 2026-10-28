import fs from "node:fs";
import path from "node:path";
import type { PostFaq } from "./faqTypes";

/**
 * Blog post metadata — the single source of truth for post SEO data.
 *
 * Structure: .mdx files in src/content/posts/ hold the article body
 * (pure markdown, no frontmatter). Metadata lives here as a typed
 * record so it participates in type-checking and the build never
 * depends on frontmatter parsing.
 *
 * Adding a post:
 *   1. Create src/content/posts/<slug>.mdx (body only)
 *   2. Add a POST_META entry below with the same slug
 *   3. Register the component in src/content/post-registry.ts
 * The build fails loudly if steps 2 or 3 are skipped.
 */

export type PostMetaEntry = {
  title: string;
  description: string;
  /** ISO date */
  date: string;
  updated?: string;
  tags: string[];
  /** Defaults to Aditya Chandra */
  author?: string;
  /** Rendered as the "Quick answers" block + FAQPage schema */
  faq?: PostFaq[];
};

export const POST_META: Record<string, PostMetaEntry> = {
  "nextjs-website-cost": {
    title: "How Much Does a Next.js Website Cost in 2026?",
    description:
      "Real price ranges for Next.js websites in 2026: landing systems from USD $500 (₹25,000), marketing sites from USD $1,500 (₹75,000), headless commerce from USD $4,000 (₹2,00,000). What drives the number at each tier.",
    date: "2026-10-20",
    tags: ["Next.js", "Pricing", "Web Design"],
    faq: [
      {
        q: "How much does a Next.js website cost?",
        a: "A Next.js landing system starts at USD $500 (₹25,000), a full marketing site at USD $1,500 (₹75,000), and a headless commerce build at USD $4,000 (₹2,00,000). The final number depends on page count, motion complexity, CMS requirements and integrations.",
      },
      {
        q: "Why do Next.js website quotes vary so much?",
        a: "Quotes vary because scope varies: template work and bespoke builds are different products. Agency overhead, account managers and custom design systems also shift prices by multiples. Fixed-scope quotes from independent studios sit between cheap templates and agency pricing.",
      },
      {
        q: "Is hiring a Next.js developer cheaper than using an agency?",
        a: "Usually yes. An independent Next.js studio typically costs 30–50% less than an agency for the same scope, because there is no account management layer or business-development overhead. The trade-off is capacity: one operator cannot run five parallel builds.",
      },
    ],
  },
  "headless-shopify-vs-themes": {
    title: "Headless Shopify vs Shopify Themes: When Each Wins",
    description:
      "A decision guide to headless Shopify in 2026: what it actually is, what it costs, when a premium theme is the smarter choice, and when decoupling pays for itself.",
    date: "2026-10-06",
    tags: ["Shopify", "E-Commerce", "Performance"],
    faq: [
      {
        q: "What is headless Shopify?",
        a: "Headless Shopify keeps Shopify as the backend — admin, inventory, payments, orders — while the customer-facing storefront is rebuilt separately, usually in Next.js, and connected through the Storefront API. The team keeps Shopify operations; the storefront gets full design and performance control.",
      },
      {
        q: "Is headless Shopify worth it?",
        a: "Headless Shopify is worth it when theme limitations measurably cost conversions or brand expression — typically at real catalog and traffic scale. For small stores doing fine on a premium theme, the investment usually pays back more elsewhere.",
      },
      {
        q: "How much does a headless Shopify build cost?",
        a: "Headless Shopify storefronts start at USD $4,000 (₹2,00,000) and scale with catalog complexity, custom checkout and migration work, typically over 6–10 weeks. Simpler catalog structures land at the lower end; large catalogs and migration-heavy projects push the upper end.",
      },
    ],
  },
  "freelancer-vs-agency": {
    title: "Freelancer vs Agency vs In-House: Who Should Build Your Website?",
    description:
      "A practical comparison of the three ways to get a website built — cost, speed, accountability and risk — plus the questions that expose which one fits your project.",
    date: "2026-09-22",
    tags: ["Web Design", "Working Together"],
    faq: [
      {
        q: "Is it better to hire a freelancer or an agency for a website?",
        a: "For most marketing sites and e-commerce builds, an independent senior studio gives agency-grade output at 30–50% lower cost, because there is no account-management overhead. Agencies win on parallel capacity and breadth; freelancers win on price and speed.",
      },
      {
        q: "How much does an agency charge compared to a freelancer?",
        a: "Agencies typically charge 30–50% more than a comparable independent for the same scope, paying for account management, business development and overhead. The deliverable can be identical; the invoice structure is not.",
      },
      {
        q: "When should a company hire in-house instead?",
        a: "Hire in-house when web work is continuous and central to the product — shipping weekly, tied to core roadmap. For periodic brand sites and campaigns, an external specialist is cheaper and usually better, because you access senior output without a full-time salary.",
      },
    ],
  },
};

export type PostMeta = PostMetaEntry & {
  slug: string;
  author: string;
  readingMinutes: number;
};

const POSTS_DIR = path.join(process.cwd(), "src", "content", "posts");

function readingMinutes(body: string): number {
  const words = body.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((file): PostMeta => {
    const slug = file.replace(/\.mdx$/, "");
    const meta = POST_META[slug];
    if (!meta) {
      throw new Error(
        `Missing metadata for post "${slug}" in src/lib/posts.ts (POST_META). ` +
          `Add an entry with the same key.`
      );
    }
    const body = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");

    return {
      ...meta,
      slug,
      author: meta.author ?? "Aditya Chandra",
      readingMinutes: readingMinutes(body),
    };
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostMeta(slug: string): PostMeta | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}
