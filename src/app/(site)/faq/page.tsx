import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import CtaBand from '@/components/CtaBand';
import JsonLd from '@/components/JsonLd';
import { FAQS } from '@/lib/faq';
import { SITE, SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'FAQ — Cost, Timelines, Ownership & Support',
  description:
    'Straight answers on web design and Next.js development costs, build timelines, code ownership, maintenance, working across timezones, and why hire a solo studio over an agency.',
  alternates: { canonical: `${SITE_URL}/faq` },
};

const GROUPS = [
  { id: 'hiring', label: 'Hiring & cost', kicker: '// WORKING TOGETHER' },
  { id: 'process', label: 'Process & timelines', kicker: '// HOW BUILDS RUN' },
  { id: 'technical', label: 'Technical', kicker: '// UNDER THE HOOD' },
] as const;

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <section className="relative z-10 px-6 py-20 sm:px-10 sm:py-28 lg:pl-[7vw] lg:pr-[7vw]">
        <PageHero
          kicker="00 // DIRECT ANSWERS"
          title="Questions, answered straight."
          intro="Everything prospects actually ask before starting a build — cost, timelines, ownership, support and the technical details. No sales script attached."
        />

        <div className="mt-16 space-y-16">
          {GROUPS.map((group, gi) => {
            const items = FAQS.filter((item) => item.group === group.id);
            if (items.length === 0) return null;

            return (
              <div key={group.id}>
                <p className="font-mono text-[10px] tracking-[0.35em] text-[var(--fg-dim)]">
                  <span className="text-[var(--accent)]">{String(gi + 1).padStart(2, '0')}</span> {group.kicker}
                </p>
                <h2 className="mt-4 text-2xl font-bold tracking-[-0.02em] text-[var(--fg)] sm:text-3xl">
                  {group.label}
                </h2>
                <div className="mt-6 border-t border-white/5">
                  {items.map((item, i) => (
                    <div key={item.q} className="grid gap-3 border-b border-white/5 py-7 lg:grid-cols-[40%_60%] lg:gap-10">
                      <h3 className="flex items-baseline gap-4 text-base font-medium leading-snug text-[var(--fg)]">
                        <span className="font-mono text-[10px] tracking-[0.3em] text-[var(--fg-dim)]">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        {item.q}
                      </h3>
                      <p className="max-w-2xl text-sm font-light leading-relaxed text-gray-400 sm:text-[15px]">
                        {item.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-14 max-w-2xl text-sm font-light leading-relaxed text-[var(--fg-muted)]">
          Something not covered?{' '}
          <Link href="/#contact" data-cursor-hover className="text-[var(--fg)] underline decoration-[var(--accent)]/40 underline-offset-4 transition-colors hover:decoration-[var(--accent)]">
            Send it over
          </Link>{' '}
          or{' '}
          <a
            href={SITE.calComUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="text-[var(--fg)] underline decoration-[var(--accent)]/40 underline-offset-4 transition-colors hover:decoration-[var(--accent)]"
          >
            book a 30-minute call
          </a>{' '}
          — answers come from the person who does the work.
        </p>
      </section>

      <CtaBand />
    </>
  );
}
