import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

/**
 * Journal teaser — latest articles, server-rendered.
 * Fresh content signals + internal links to ranking assets.
 */
export default function JournalTeaser() {
  const posts = getAllPosts().slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section
      id="journal"
      className="relative z-10 border-t border-gray-900 bg-[var(--bg)] px-6 py-24 sm:px-10 sm:py-28 lg:pl-[7vw] lg:pr-[7vw]"
    >
      <div className="lg:grid lg:grid-cols-[35%_65%]">
        <div className="pb-10 lg:pb-0 lg:pr-20">
          <p className="font-mono text-[10px] tracking-[0.35em] text-[var(--fg-dim)]">
            <span className="text-[var(--accent)]">09</span> {"// FIELD NOTES"}
          </p>
          <h2 className="mt-6 text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[0.95] tracking-[-0.03em] text-[var(--fg)]">
            Notes from the build floor.
          </h2>
          <div className="divider mt-8 w-16 origin-left" />
        </div>

        <ul>
          {posts.map((post) => (
            <li key={post.slug} className="border-t border-white/5 first:border-t-0">
              <Link
                href={`/blog/${post.slug}`}
                data-cursor-hover
                className="group/post block py-7 transition-colors hover:bg-white/[0.015]"
              >
                <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
                  <h3 className="max-w-2xl text-lg font-medium leading-snug tracking-tight text-[var(--fg-muted)] transition-colors group-hover/post:text-[var(--fg)] sm:text-xl">
                    {post.title}
                  </h3>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--fg-dim)]">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                    })}
                    {' · '}
                    {post.readingMinutes} MIN READ
                  </span>
                </div>
                <p className="mt-3 max-w-2xl text-sm font-light leading-relaxed text-gray-400">
                  {post.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <Link
          href="/blog"
          data-cursor-hover
          className="font-mono text-[10px] tracking-[0.2em] text-[var(--fg-dim)] transition-colors hover:text-[var(--fg-muted)]"
        >
          READ THE JOURNAL →
        </Link>
      </div>
    </section>
  );
}
