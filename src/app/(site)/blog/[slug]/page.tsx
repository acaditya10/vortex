import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import CtaBand from '@/components/CtaBand';
import JsonLd from '@/components/JsonLd';
import { POST_MODULES } from '@/content/post-registry';
import { getAllPosts } from '@/lib/posts';
import { assertPostsRegistered } from '@/lib/postRegistry';
import { SITE, SITE_URL } from '@/lib/site';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  const posts = getAllPosts();
  assertPostsRegistered(posts.map((p) => p.slug));
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getAllPosts().find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/blog/${post.slug}`,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [post.author],
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const posts = getAllPosts();
  const post = posts.find((p) => p.slug === slug);
  const MDXContent = POST_MODULES[slug];
  if (!post || !MDXContent) notFound();

  const postIndex = posts.findIndex((p) => p.slug === post.slug);
  const nextPost = posts[postIndex + 1];
  const prevPost = posts[postIndex - 1];

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    url: `${SITE_URL}/blog/${post.slug}`,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: {
      '@type': 'Person',
      name: post.author,
      url: `${SITE_URL}/about`,
      worksFor: { '@id': `${SITE_URL}/#organization` },
    },
    publisher: { '@id': `${SITE_URL}/#organization` },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    inLanguage: 'en',
    keywords: post.tags.join(', '),
    wordCount: post.readingMinutes * 220,
  };

  const faqSchema =
    post.faq && post.faq.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: post.faq.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a },
          })),
        }
      : null;

  return (
    <>
      <JsonLd data={articleSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}

      <article className="relative z-10 px-6 py-14 sm:px-10 sm:py-20 lg:pl-[7vw] lg:pr-[7vw]">
        <Breadcrumbs section={{ label: 'Journal', href: '/blog' }} current={post.title} />

        <header className="mt-12 max-w-3xl">
          {post.tags.length > 0 && (
            <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--accent)]">
              {post.tags.map((t) => t.toUpperCase()).join(' · ')}
            </p>
          )}
          <h1 className="mt-6 text-[clamp(2rem,5.5vw,3.75rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-[var(--fg)]">
            {post.title}
          </h1>
          <div className="divider mt-8 w-16 origin-left" />
          <p className="mt-8 text-base font-light leading-relaxed tracking-wide text-[var(--fg-muted)] sm:text-lg">
            {post.description}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-white/5 pb-8 font-mono text-[10px] tracking-[0.2em] text-[var(--fg-dim)]">
            <span>
              BY{' '}
              <Link href="/about" data-cursor-hover className="text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)]">
                {post.author.toUpperCase()}
              </Link>
            </span>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span>{post.readingMinutes} MIN READ</span>
          </div>
        </header>

        <div className="mt-12 max-w-3xl">
          <MDXContent />
        </div>

        {/* Inline FAQ (from frontmatter) — extractable answers + schema */}
        {post.faq && post.faq.length > 0 && (
          <section className="mt-20 max-w-3xl border-t border-white/5 pt-12">
            <h2 className="text-2xl font-bold tracking-[-0.02em] text-[var(--fg)]">
              Quick answers
            </h2>
            <div className="mt-6">
              {post.faq.map((item) => (
                <div key={item.q} className="border-b border-white/5 py-6 first:border-t first:pt-6">
                  <h3 className="text-base font-medium leading-snug text-[var(--fg)]">{item.q}</h3>
                  <p className="mt-3 text-sm font-light leading-relaxed text-gray-400">{item.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Author byline — E-E-A-T */}
        <section className="mt-16 max-w-3xl border border-white/5 bg-white/[0.015] p-8">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--fg-dim)]">WRITTEN BY</p>
          <p className="mt-4 text-lg font-semibold text-[var(--fg)]">{SITE.founder.name}</p>
          <p className="mt-2 text-sm font-light leading-relaxed text-gray-400">
            {SITE.founder.jobTitle} at Vortex Labs — an independent web design and Next.js
            engineering studio building premium websites for US and EU brands.
          </p>
          <p className="mt-5 font-mono text-[10px] tracking-[0.2em] text-[var(--fg-dim)]">
            <Link href="/about" data-cursor-hover className="transition-colors hover:text-[var(--fg-muted)]">
              ABOUT →
            </Link>
            <span className="mx-3">·</span>
            <Link href="/work" data-cursor-hover className="transition-colors hover:text-[var(--fg-muted)]">
              WORK →
            </Link>
          </p>
        </section>

        {/* Prev / next */}
        <nav aria-label="More articles" className="mt-16 grid gap-px border border-white/5 bg-white/5 sm:grid-cols-2">
          {prevPost ? (
            <Link
              href={`/blog/${prevPost.slug}`}
              data-cursor-hover
              className="group/prev bg-[var(--bg)] p-7 transition-colors hover:bg-[#101010]"
            >
              <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--fg-dim)]">← NEWER</p>
              <p className="mt-3 text-base font-medium text-[var(--fg-muted)] transition-colors group-hover/prev:text-[var(--fg)]">
                {prevPost.title}
              </p>
            </Link>
          ) : (
            <div className="bg-[var(--bg)] p-7 opacity-40">
              <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--fg-dim)]">← NEWER</p>
              <p className="mt-3 text-base font-light text-[var(--fg-dim)]">Start of the journal</p>
            </div>
          )}
          {nextPost ? (
            <Link
              href={`/blog/${nextPost.slug}`}
              data-cursor-hover
              className="group/next bg-[var(--bg)] p-7 text-right transition-colors hover:bg-[#101010]"
            >
              <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--fg-dim)]">OLDER →</p>
              <p className="mt-3 text-base font-medium text-[var(--fg-muted)] transition-colors group-hover/next:text-[var(--fg)]">
                {nextPost.title}
              </p>
            </Link>
          ) : (
            <div className="bg-[var(--bg)] p-7 opacity-40">
              <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--fg-dim)]">OLDER →</p>
              <p className="mt-3 text-base font-light text-[var(--fg-dim)]">End of the journal</p>
            </div>
          )}
        </nav>
      </article>

      <CtaBand />
    </>
  );
}
