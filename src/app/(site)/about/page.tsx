import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import CtaBand from '@/components/CtaBand';
import JsonLd from '@/components/JsonLd';
import { SITE, SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About — Aditya Chandra, Founder & Engineer',
  description:
    'Aditya Chandra is the designer and engineer behind Vortex Labs — an independent web design and Next.js studio building premium websites for US and EU brands from India.',
  alternates: { canonical: `${SITE_URL}/about` },
};

const aboutSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  url: `${SITE_URL}/about`,
  mainEntity: {
    '@id': `${SITE_URL}/#person`,
    '@type': 'Person',
    name: SITE.founder.name,
    jobTitle: SITE.founder.jobTitle,
    url: SITE.founder.github,
    worksFor: { '@id': `${SITE_URL}/#organization` },
    knowsAbout: [
      'Web design',
      'Next.js',
      'React',
      'TypeScript',
      'Headless Shopify',
      'GSAP motion engineering',
      'Core Web Vitals optimization',
      'Technical SEO',
    ],
    sameAs: [SITE.founder.github, ...(SITE.founder.linkedin ? [SITE.founder.linkedin] : [])],
  },
};

const PRINCIPLES = [
  {
    title: 'ONE ACCOUNTABLE OPERATOR',
    body: 'No account managers, no junior handoffs, no telephone game. The person who scopes your build is the person who designs it, writes its code and ships it.',
  },
  {
    title: 'DESIGN AND CODE ARE ONE CRAFT',
    body: 'Design decisions are made with production constraints in mind, and engineering decisions with design intent. Nothing gets lost in translation because there is no translation.',
  },
  {
    title: 'PERFORMANCE IS A FEATURE',
    body: 'Core Web Vitals budgets are enforced from the first commit, not rescued before launch. A beautiful site that loads slowly is an unfinished site.',
  },
  {
    title: 'YOU OWN EVERYTHING',
    body: 'Repository, domain, deployment, analytics, documentation — all of it transfers at handover. No proprietary platform, no lock-in, no hostages.',
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={aboutSchema} />
      <section className="relative z-10 px-6 py-20 sm:px-10 sm:py-28 lg:pl-[7vw] lg:pr-[7vw]">
        <PageHero
          kicker="00 // THE OPERATOR"
          title="A studio of one, built like a team."
          intro="Vortex Labs is Aditya Chandra — an independent web designer and engineer building premium websites, headless storefronts and digital experiences for ambitious brands across the US and EU."
        />

        <div className="mt-16 grid gap-14 lg:grid-cols-[1fr_minmax(300px,38%)] lg:gap-20">
          {/* Bio */}
          <div className="max-w-2xl space-y-7 text-[15px] font-light leading-[1.85] tracking-wide text-gray-300 sm:text-base">
            <p>
              Most websites fail in the gap between the people who design them and the people who
              build them. A designer hands off to a developer, who interprets a spec written by a
              manager — and by launch, the original idea has been diluted three times over.
            </p>
            <p>
              Vortex Labs exists to collapse that gap. I design the interface and write its
              production code, which means decisions happen in hours instead of standups, feedback
              loops stay tight, and what gets shipped is what got designed — pixel for pixel,
              motion for motion.
            </p>
            <p>
              The work itself: Next.js and React builds, headless Shopify storefronts, motion
              systems engineered with GSAP, and the performance and technical SEO foundations that
              make sites findable. Based in India, working remotely with clients across the United
              States and European Union — async by default, calls booked in your timezone.
            </p>
            <p>
              Before independent practice, I shipped production systems for media companies,
              e-commerce brands and marketing agencies — the kind of work that has to survive real
              traffic, real editors and real deadlines.
            </p>
            <p className="font-mono text-[10px] tracking-[0.2em] text-[var(--fg-dim)]">
              <Link href="/work" data-cursor-hover className="transition-colors hover:text-[var(--fg-muted)]">
                SEE THE WORK →
              </Link>
              <span className="mx-3">·</span>
              <Link href="/services" data-cursor-hover className="transition-colors hover:text-[var(--fg-muted)]">
                SERVICES →
              </Link>
            </p>
          </div>

          {/* Portrait + facts */}
          <aside>
            <div className="relative aspect-[3/4] w-full overflow-hidden border border-white/10 bg-[#0C0C0C]">
              <Image
                src="/portrait.png"
                alt={`${SITE.founder.name} — founder and engineer behind Vortex Labs`}
                fill
                sizes="(max-width: 1024px) 100vw, 380px"
                className="object-cover object-top grayscale"
              />
            </div>
            <dl className="mt-8 space-y-5">
              {[
                ['ROLE', 'Designer & Engineer'],
                ['STUDIO', 'Vortex Labs (independent)'],
                ['BASED IN', 'India · remote-first'],
                ['WORKING ACROSS', 'US & EU timezones'],
                ['STACK', 'Next.js · React · TypeScript · Shopify · GSAP'],
                ['PROJECTS SHIPPED', '20+'],
                ['RESPONSE TIME', 'Within 24 hours'],
              ].map(([term, value]) => (
                <div key={term} className="border-b border-white/5 pb-4">
                  <dt className="font-mono text-[9px] tracking-[0.25em] text-[var(--fg-dim)]">{term}</dt>
                  <dd className="mt-1.5 text-sm font-light text-[var(--fg-muted)]">{value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>

        {/* Principles */}
        <div className="mt-24 border-t border-white/5 pt-16">
          <h2 className="max-w-2xl text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-tight tracking-[-0.02em] text-[var(--fg)]">
            Operating principles.
          </h2>
          <div className="divider mt-8 w-16 origin-left" />
          <div className="mt-12 grid gap-px border border-white/5 bg-white/5 sm:grid-cols-2">
            {PRINCIPLES.map((principle) => (
              <div key={principle.title} className="bg-[var(--bg)] p-8 sm:p-10">
                <h3 className="font-mono text-[11px] font-medium tracking-[0.15em] text-[var(--fg)]">
                  {principle.title}
                </h3>
                <p className="mt-4 max-w-md text-sm font-light leading-relaxed text-gray-400">
                  {principle.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Work directly with the person building it."
        text="No account managers. No dilution. One operator, from first call to launch handover."
      />
    </>
  );
}
