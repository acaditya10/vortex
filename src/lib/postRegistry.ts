/**
 * Ensures every .mdx in src/content/posts is registered in
 * post-registry.ts. Fails the production build loudly rather than
 * silently dropping a post from the site.
 */
import { POST_MODULES } from "@/content/post-registry";

export function assertPostsRegistered(slugs: string[]) {
  const missing = slugs.filter((slug) => !POST_MODULES[slug]);
  if (missing.length > 0) {
    throw new Error(
      `Missing post registration in src/content/post-registry.ts for: ${missing.join(", ")}. ` +
        `Add an import + map entry for each.`
    );
  }
}
