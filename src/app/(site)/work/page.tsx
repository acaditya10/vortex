import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import PageHero from '@/components/PageHero';
import CtaBand from '@/components/CtaBand';
import JsonLd from '@/components/JsonLd';
import { PROJECTS } from '@/lib/work';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Work — Case Studies',
  description:
    'Selected web design and engineering projects: headless Shopify storefronts, enterprise platforms and content systems built with Next.js, GSAP and modern headless architecture.',
  alternates: { canonical: `${SITE_URL}/work` },
};

const workSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Vortex Labs case studies',
  itemListElement: PROJECTS.map((project, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'CreativeWork',
      name: `${project.name.charAt(0) + project.name.slice(1).toLowerCase()} — case study`,
      url: `${SITE_URL}/work/${project.slug}`,
      image: `${SITE_URL}${project.imageSrc}`,
      creator: { '@id': `${SITE_URL}/#organization` },
      about: project.industry,
    },
  })),
};

export default function WorkPage() {
  return (
    <>
      <JsonLd data={workSchema} />
      <section className="relative z-10 px-6 py-20 sm:px-10 sm:py-28 lg:pl-[7vw] lg:pr-[7vw]">
        <PageHero
          kicker="00 // SELECTED WORK"
          title="Built in production. Shipped for real."
          intro="Every project below is live, in production, and run by the client today. Design, engineering and deployment handled end-to-end by one operator."
        />

        <div className="mt-16 grid gap-px border border-white/5 bg-white/5 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              data-cursor-hover
              className="group/work flex flex-col bg-[var(--bg)] transition-colors duration-500 hover:bg-[#101010]"
            >
              <div className="overflow-hidden">
                <Image
                  src={project.imageSrc}
                  alt={project.imageAlt}
                  width={800}
                  height={500}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="aspect-[16/10] w-full object-cover grayscale-[0.6] brightness-90 transition-all duration-500 group-hover/work:grayscale-0 group-hover/work:brightness-100"
                />
              </div>
              <div className="flex flex-1 flex-col p-7 sm:p-8">
                <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--fg-dim)]">
                  {project.index} · {project.industry.toUpperCase()}
                </p>
                <h2 className="mt-4 text-xl font-bold tracking-[-0.01em] text-[var(--fg)]">
                  {project.name.charAt(0) + project.name.slice(1).toLowerCase()}
                </h2>
                <p className="mt-3 flex-1 text-sm font-light leading-relaxed text-gray-400">
                  {project.services.join(' · ')}
                </p>
                <p className="mt-6 font-mono text-[10px] tracking-[0.2em] text-[var(--fg-dim)] transition-colors duration-500 group-hover/work:text-[var(--fg-muted)]">
                  READ CASE STUDY →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CtaBand
        title="Your project could be exhibit 04."
        text="One accountable operator, agency-grade output, no agency drag. Tell me what you are building."
      />
    </>
  );
}
