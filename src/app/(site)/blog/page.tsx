import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import CtaBand from '@/components/CtaBand';
import JsonLd from '@/components/JsonLd';
import { getAllPosts } from '@/lib/posts';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Journal — Web Design, Next.js & E-Commerce Notes',
  description:
    'Practical notes on web design, Next.js development, headless Shopify and website performance — written by the engineer doing the work.',
  alternates: { canonical: `${SITE_URL}/blog` },
};

const blogSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'Vortex Labs Journal',
  url: `${SITE_URL}/blog`,
  publisher: { '@id': `${SITE_URL}/#organization` },
  author: { '@id': `${SITE_URL}/#person` },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <JsonLd data={blogSchema} />
      <section className="relative z-10 px-6 py-20 sm:px-10 sm:py-28 lg:pl-[7vw] lg:pr-[7vw]">
        <PageHero
          kicker="00 // JOURNAL"
          title="Notes from the build floor."
          intro="Costs, trade-offs and technical decisions — written from direct experience shipping production sites, not from content marketing calendars."
        />

        {posts.length === 0 ? (
          <p className="mt-16 font-mono text-xs tracking-[0.2em] text-[var(--fg-dim)]">
            FIRST ENTRIES INCOMING.
          </p>
        ) : (
          <ul className="mt-16 border-t border-white/5">
            {posts.map((post) => (
              <li key={post.slug} className="border-b border-white/5">
                <Link
                  href={`/blog/${post.slug}`}
                  data-cursor-hover
                  className="group/post grid gap-4 py-9 transition-colors hover:bg-white/[0.015] lg:grid-cols-[75%_25%] lg:gap-10"
                >
                  <div>
                    <h2 className="max-w-3xl text-xl font-semibold leading-snug tracking-tight text-[var(--fg-muted)] transition-colors group-hover/post:text-[var(--fg)] sm:text-2xl">
                      {post.title}
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm font-light leading-relaxed text-gray-400">
                      {post.description}
                    </p>
                    {post.tags.length > 0 && (
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <li
                            key={tag}
                            className="border border-white/10 px-2.5 py-1 font-mono text-[9px] tracking-[0.2em] text-[var(--fg-dim)]"
                          >
                            {tag.toUpperCase()}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="font-mono text-[10px] tracking-[0.2em] text-[var(--fg-dim)] lg:text-right">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </time>
                    <p className="mt-2">{post.readingMinutes} MIN READ</p>
                    <p className="mt-4 text-[var(--fg-muted)] transition-colors group-hover/post:text-[var(--fg)]">
                      READ →
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <CtaBand
        title="Reading is good. Building is better."
        text="If these notes describe problems you are facing, the fastest fix is a conversation."
      />
    </>
  );
}
