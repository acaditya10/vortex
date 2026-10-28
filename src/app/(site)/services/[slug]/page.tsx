import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHero from '@/components/PageHero';
import CtaBand from '@/components/CtaBand';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import { SERVICES, SITE_URL, getService } from '@/lib/site';
import { SERVICE_FAQS } from '@/lib/serviceFaqs';
import { PROJECTS } from '@/lib/work';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return {
    title: service.metaTitle,
    description: service.description.slice(0, 158),
    alternates: { canonical: `${SITE_URL}/services/${service.slug}` },
    openGraph: {
      title: `${service.metaTitle} | Vortex Labs`,
      description: service.short,
      url: `${SITE_URL}/services/${service.slug}`,
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const faqs = SERVICE_FAQS[service.slug] ?? [];
  const relatedProjects = PROJECTS.filter((p) =>
    p.services.some((s) => s === service.title)
  ).slice(0, 2);
  const otherServices = SERVICES.filter((s) => s.slug !== service.slug);

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.metaTitle,
    description: service.description,
    url: `${SITE_URL}/services/${service.slug}`,
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: ['United States', 'European Union', 'Worldwide'],
    serviceType: service.title,
    audience: { '@type': 'Audience', audienceType: service.audience },
  };

  const faqSchema =
    faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a },
          })),
        }
      : null;

  return (
    <>
      <JsonLd data={serviceSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}

      <section className="relative z-10 px-6 py-14 sm:px-10 sm:py-20 lg:pl-[7vw] lg:pr-[7vw]">
        <Breadcrumbs section={{ label: 'Services', href: '/services' }} current={service.metaTitle} />

        <div className="mt-12">
          <PageHero kicker={`00 // ${service.code} ${service.title.toUpperCase()}`} title={service.h1} intro={service.description} />
        </div>

        {/* Deliverables */}
        <div className="mt-20 grid gap-14 lg:grid-cols-[35%_65%]">
          <div>
            <h2 className="text-2xl font-bold tracking-[-0.02em] text-[var(--fg)]">What you get</h2>
            <div className="divider mt-6 w-12 origin-left" />
            <p className="mt-6 max-w-xs text-sm font-light leading-relaxed text-[var(--fg-muted)]">
              Scoped precisely before work begins. Everything below ships as part of the engagement — not as upsells.
            </p>
          </div>
          <ul className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
            {service.deliverables.map((item) => (
              <li key={item} className="flex gap-3 border-b border-white/5 pb-4 text-sm font-light leading-relaxed text-gray-300">
                <span className="font-mono text-[11px] text-[var(--accent)]">→</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Who it's for + related work */}
        <div className="mt-20 grid gap-14 border-t border-white/5 pt-14 lg:grid-cols-[35%_65%]">
          <div>
            <h2 className="text-2xl font-bold tracking-[-0.02em] text-[var(--fg)]">Who it is for</h2>
            <div className="divider mt-6 w-12 origin-left" />
          </div>
          <div>
            <p className="max-w-2xl text-base font-light leading-[1.8] tracking-wide text-gray-300">
              {service.audience}
            </p>

            {relatedProjects.length > 0 && (
              <div className="mt-10">
                <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--fg-dim)]">
                  RELEVANT WORK
                </p>
                <ul className="mt-5 space-y-3">
                  {relatedProjects.map((project) => (
                    <li key={project.slug}>
                      <Link
                        href={`/work/${project.slug}`}
                        data-cursor-hover
                        className="group inline-flex items-baseline gap-3 text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)]"
                      >
                        <span className="font-mono text-[11px] text-[var(--accent)]">→</span>
                        <span className="font-medium">
                          {project.name.charAt(0) + project.name.slice(1).toLowerCase()}
                        </span>
                        <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--fg-dim)]">
                          CASE STUDY →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* FAQ */}
        {faqs.length > 0 && (
          <div className="mt-20 grid gap-14 border-t border-white/5 pt-14 lg:grid-cols-[35%_65%]">
            <div>
              <h2 className="text-2xl font-bold tracking-[-0.02em] text-[var(--fg)]">
                Common questions
              </h2>
              <div className="divider mt-6 w-12 origin-left" />
              <Link
                href="/faq"
                data-cursor-hover
                className="mt-6 inline-block font-mono text-[10px] tracking-[0.2em] text-[var(--fg-dim)] transition-colors hover:text-[var(--fg-muted)]"
              >
                ALL QUESTIONS →
              </Link>
            </div>
            <div>
              {faqs.map((item) => (
                <div key={item.q} className="border-b border-white/5 py-7 first:border-t first:pt-7">
                  <h3 className="text-base font-medium leading-snug text-[var(--fg)]">{item.q}</h3>
                  <p className="mt-3 max-w-2xl text-sm font-light leading-relaxed text-gray-400">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other services */}
        <div className="mt-20 border-t border-white/5 pt-14">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--fg-dim)]">OTHER ENGAGEMENTS</p>
          <div className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
            {otherServices.map((other) => (
              <Link
                key={other.slug}
                href={`/services/${other.slug}`}
                data-cursor-hover
                className="font-mono text-xs tracking-[0.15em] text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)]"
              >
                {other.metaTitle.toUpperCase()} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
