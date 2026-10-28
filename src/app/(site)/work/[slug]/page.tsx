import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import CtaBand from '@/components/CtaBand';
import JsonLd from '@/components/JsonLd';
import { PROJECTS, getProject } from '@/lib/work';
import { SITE, SITE_URL } from '@/lib/site';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const title = `${project.name.charAt(0) + project.name.slice(1).toLowerCase()} — Case Study`;
  return {
    title,
    description: project.hook.slice(0, 158),
    alternates: { canonical: `${SITE_URL}/work/${project.slug}` },
    openGraph: {
      title: `${title} | Vortex Labs`,
      description: project.hook.slice(0, 158),
      url: `${SITE_URL}/work/${project.slug}`,
      images: [`${SITE_URL}${project.imageSrc}`],
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const displayName = project.name.charAt(0) + project.name.slice(1).toLowerCase();
  const otherProjects = PROJECTS.filter((p) => p.slug !== project.slug);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: `${displayName} — Vortex Labs case study`,
    description: project.hook,
    url: `${SITE_URL}/work/${project.slug}`,
    image: `${SITE_URL}${project.imageSrc}`,
    dateCreated: project.year,
    creator: { '@id': `${SITE_URL}/#organization` },
    about: project.industry,
    keywords: [...project.services, ...project.stack].join(', '),
    comment: {
      '@type': 'Comment',
      text: project.quote,
      author: {
        '@type': 'Person',
        name: project.quoteAuthor,
        affiliation: { '@type': 'Organization', name: project.quoteRole },
      },
    },
  };

  return (
    <>
      <JsonLd data={schema} />

      <article className="relative z-10 px-6 py-14 sm:px-10 sm:py-20 lg:pl-[7vw] lg:pr-[7vw]">
        <Breadcrumbs section={{ label: 'Work', href: '/work' }} current={displayName} />

        {/* Header */}
        <header className="mt-12 max-w-4xl">
          <p className="font-mono text-[10px] tracking-[0.35em] text-[var(--fg-dim)]">
            <span className="text-[var(--accent)]">{project.index}</span> {`// ${project.industry.toUpperCase()}`}
          </p>
          <h1 className="mt-6 text-[clamp(2.25rem,6.5vw,4.75rem)] font-extrabold leading-[0.95] tracking-[-0.03em] text-[var(--fg)]">
            {displayName}
          </h1>
          <div className="divider mt-8 w-16 origin-left" />
          <p className="mt-8 max-w-2xl text-base font-light leading-relaxed tracking-wide text-gray-300 sm:text-lg">
            {project.hook}
          </p>

          {/* Meta rail */}
          <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-y border-white/5 py-8 sm:grid-cols-4">
            <div>
              <dt className="font-mono text-[9px] tracking-[0.25em] text-[var(--fg-dim)]">SERVICES</dt>
              <dd className="mt-2 text-sm font-light text-[var(--fg-muted)]">{project.services.join(', ')}</dd>
            </div>
            <div>
              <dt className="font-mono text-[9px] tracking-[0.25em] text-[var(--fg-dim)]">INDUSTRY</dt>
              <dd className="mt-2 text-sm font-light text-[var(--fg-muted)]">{project.industry}</dd>
            </div>
            <div>
              <dt className="font-mono text-[9px] tracking-[0.25em] text-[var(--fg-dim)]">YEAR</dt>
              <dd className="mt-2 text-sm font-light text-[var(--fg-muted)]">{project.year}</dd>
            </div>
            <div>
              <dt className="font-mono text-[9px] tracking-[0.25em] text-[var(--fg-dim)]">LIVE</dt>
              <dd className="mt-2 text-sm font-light">
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                  className="text-[var(--fg-muted)] underline decoration-[var(--accent)]/40 underline-offset-4 transition-colors hover:text-[var(--fg)]"
                >
                  Visit site ↗
                </a>
              </dd>
            </div>
          </dl>
        </header>

        {/* Hero image */}
        <figure className="mt-14 border border-white/10 bg-[#0C0C0C]">
          <Image
            src={project.imageSrc}
            alt={project.imageAlt}
            width={1600}
            height={1000}
            sizes="(max-width: 1024px) 100vw, 86vw"
            priority
            className="h-auto w-full"
          />
        </figure>

        {/* Challenge */}
        <section className="mt-20 grid gap-10 lg:grid-cols-[35%_65%]">
          <h2 className="text-2xl font-bold tracking-[-0.02em] text-[var(--fg)]">The challenge</h2>
          <p className="max-w-2xl text-base font-light leading-[1.8] tracking-wide text-gray-300">
            {project.challenge}
          </p>
        </section>

        {/* Approach */}
        <section className="mt-16 grid gap-10 border-t border-white/5 pt-14 lg:grid-cols-[35%_65%]">
          <h2 className="text-2xl font-bold tracking-[-0.02em] text-[var(--fg)]">The approach</h2>
          <ol className="max-w-2xl space-y-6">
            {project.approach.map((step, i) => (
              <li key={i} className="grid grid-cols-[auto_1fr] gap-5">
                <span className="pt-1 font-mono text-[11px] tracking-[0.3em] text-[var(--accent)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-base font-light leading-[1.8] tracking-wide text-gray-300">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Stack */}
        <section className="mt-16 grid gap-10 border-t border-white/5 pt-14 lg:grid-cols-[35%_65%]">
          <h2 className="text-2xl font-bold tracking-[-0.02em] text-[var(--fg)]">Stack</h2>
          <ul className="flex flex-wrap gap-3">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="border border-white/10 px-4 py-2 font-mono text-[10px] tracking-[0.2em] text-[var(--fg-muted)]"
              >
                {tech.toUpperCase()}
              </li>
            ))}
          </ul>
        </section>

        {/* Outcome */}
        <section className="mt-16 grid gap-10 border-t border-white/5 pt-14 lg:grid-cols-[35%_65%]">
          <h2 className="text-2xl font-bold tracking-[-0.02em] text-[var(--fg)]">The outcome</h2>
          <div>
            <ul className="max-w-2xl space-y-4">
              {project.outcome.map((item, i) => (
                <li key={i} className="flex gap-3 text-base font-light leading-[1.8] tracking-wide text-gray-300">
                  <span className="font-mono text-[11px] text-[var(--accent)]">→</span>
                  {item}
                </li>
              ))}
            </ul>

            <figure className="mt-12 max-w-2xl border-l border-white/10 pl-6">
              <blockquote className="text-base italic leading-relaxed text-gray-400 sm:text-[17px]">
                &ldquo;{project.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 font-mono text-[10px] tracking-[0.2em] text-[var(--fg-dim)]">
                — {project.quoteAuthor}, {project.quoteRole}
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Next projects */}
        <nav aria-label="More case studies" className="mt-20 grid gap-px border border-white/5 bg-white/5 sm:grid-cols-2">
          {otherProjects.map((other) => (
            <Link
              key={other.slug}
              href={`/work/${other.slug}`}
              data-cursor-hover
              className="group/next bg-[var(--bg)] p-8 transition-colors duration-500 hover:bg-[#101010]"
            >
              <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--fg-dim)]">
                NEXT CASE STUDY
              </p>
              <p className="mt-4 text-xl font-bold tracking-[-0.01em] text-[var(--fg-muted)] transition-colors group-hover/next:text-[var(--fg)]">
                {other.name.charAt(0) + other.name.slice(1).toLowerCase()} →
              </p>
            </Link>
          ))}
        </nav>

        <p className="mt-10 font-mono text-[10px] tracking-[0.2em] text-[var(--fg-dim)]">
          <Link href="/work" data-cursor-hover className="transition-colors hover:text-[var(--fg-muted)]">
            ← ALL WORK
          </Link>
          <span className="mx-4">·</span>
          <a
            href={SITE.calComUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="transition-colors hover:text-[var(--fg-muted)]"
          >
            DISCUSS A SIMILAR BUILD ↗
          </a>
        </p>
      </article>

      <CtaBand />
    </>
  );
}
