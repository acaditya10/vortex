/**
 * Post registry — barrel of statically-imported MDX bodies.
 *
 * Adding a post: create src/content/posts/<slug>.mdx, then register it
 * below (one import + one map entry). Static imports let Turbopack
 * compile MDX at build time — no runtime compilation. Post metadata
 * (frontmatter) is read from the same file by src/lib/posts.ts.
 */
import type { ComponentType } from "react";

import { default as NextjsWebsiteCost } from "./posts/nextjs-website-cost.mdx";
import { default as HeadlessShopifyVsThemes } from "./posts/headless-shopify-vs-themes.mdx";
import { default as FreelancerVsAgency } from "./posts/freelancer-vs-agency.mdx";

export const POST_MODULES: Record<string, ComponentType> = {
  "nextjs-website-cost": NextjsWebsiteCost,
  "headless-shopify-vs-themes": HeadlessShopifyVsThemes,
  "freelancer-vs-agency": FreelancerVsAgency,
};
