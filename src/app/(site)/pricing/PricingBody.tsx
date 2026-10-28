'use client';

/**
 * Interactive body of the /pricing page.
 *
 * The market selector (India / United States) drives every price, budget
 * band, market copy string and enquiry default through the centralized
 * config in lib/pricing — nothing is hardcoded here. Kept in a separate
 * client component so the page itself stays a server component (metadata
 * + JSON-LD render statically while this hydrates).
 *
 * Design language matches the rest of the site: dark, editorial, mono
 * kickers, subtle 1px borders, generous whitespace, restrained motion
 * that respects prefers-reduced-motion.
 */

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';

import PricingEnquiryForm, { type ServiceOption } from '@/components/PricingEnquiryForm';
import {
  PACKAGES,
  SERVICES,
  RETAINERS,
  ENGAGEMENT_STEPS,
  TERMS,
  MARKET_LIST,
  formatPrice,
  type Market,
  type ServiceDef,
} from '@/lib/pricing';
import { PRICING_FAQS } from '@/lib/pricingFaqs';
import { useMarket } from '@/lib/marketContext';

/* ── Shared small pieces ─────────────────────────────────────────── */

function SectionHead({
  n,
  kicker,
  title,
  intro,
}: {
  n: string;
  kicker: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="font-mono text-[10px] tracking-[0.35em] text-[var(--fg-dim)]">
        <span className="text-[var(--accent)]">{n}</span> {kicker}
      </p>
      <h2 className="mt-5 text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-[1.02] tracking-[-0.03em] text-[var(--fg)]">
        {title}
      </h2>
      <div className="divider mt-6 w-12 origin-left" />
      {intro && (
        <p className="mt-6 max-w-xl text-sm font-light leading-relaxed tracking-wide text-[var(--fg-muted)] sm:text-base">
          {intro}
        </p>
      )}
    </div>
  );
}

function MarketSelector({ compact = false }: { compact?: boolean }) {
  const { market, setMarket } = useMarket();
  return (
    <div
      role="group"
      aria-label="Select pricing market"
      className={`inline-flex border border-white/10 ${compact ? '' : 'p-1'}`}
    >
      {MARKET_LIST.map((m) => {
        const active = m.code === market;
        return (
          <button
            key={m.code}
            type="button"
            aria-pressed={active}
            onClick={() => setMarket(m.code as Market)}
            data-cursor-hover
            className={`font-mono text-[10px] tracking-[0.2em] outline-none transition-colors duration-300 focus-visible:ring-1 focus-visible:ring-[var(--accent)] ${
              compact ? 'px-3 py-1.5' : 'px-4 py-2'
            } ${
              active
                ? 'bg-[var(--accent)] text-[#0A0A0A]'
                : 'text-[var(--fg-muted)] hover:text-[var(--fg)]'
            }`}
          >
            {m.label.toUpperCase()} · {m.currency}
          </button>
        );
      })}
    </div>
  );
}

/* ── Section B — core packages ───────────────────────────────────── */

function PackageCard({ pkg }: { pkg: (typeof PACKAGES)[number] }) {
  const { market } = useMarket();
  const accent = pkg.recommended;

  return (
    <article
      className={`relative flex flex-col border p-8 sm:p-10 ${
        accent ? 'border-[var(--accent)]/40 bg-[#0d0c0b]' : 'border-white/10 bg-[var(--bg)]'
      }`}
    >
      {accent && (
        <span className="absolute -top-2.5 left-8 bg-[var(--accent)] px-2 py-0.5 font-mono text-[9px] tracking-[0.25em] text-[#0A0A0A]">
          RECOMMENDED
        </span>
      )}

      <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--fg-dim)]">
        {pkg.code}
      </p>
      <h3 className="mt-4 text-2xl font-bold tracking-[-0.02em] text-[var(--fg)]">
        {pkg.name}
      </h3>
      <p className="mt-3 max-w-sm text-sm font-light leading-relaxed text-[var(--fg-muted)]">
        {pkg.tagline}
      </p>

      <p className="mt-6 font-mono text-2xl tracking-[0.02em] text-[var(--accent)]">
        {formatPrice(pkg.price, market)}
      </p>
      <p className="mt-1 font-mono text-[10px] tracking-[0.2em] text-[var(--fg-dim)]">
        STARTING PRICE · {pkg.timeline.toUpperCase()} · {pkg.revisions} REVISION
        {pkg.revisions > 1 ? 'S' : ''}
      </p>

      <ul className="mt-7 flex-1 space-y-3">
        {pkg.deliverables.map((d) => (
          <li key={d} className="flex gap-3 text-sm font-light leading-relaxed text-gray-300">
            <span className="font-mono text-[11px] text-[var(--accent)]">→</span>
            {d}
          </li>
        ))}
      </ul>

      <p className="mt-7 border-t border-white/5 pt-5 font-mono text-[10px] tracking-[0.15em] text-[var(--fg-dim)]">
        NOT INCLUDED
      </p>
      <ul className="mt-3 space-y-2">
        {pkg.excludes.map((x) => (
          <li key={x} className="flex gap-3 text-xs font-light leading-relaxed text-[var(--fg-dim)]">
            <span className="font-mono">·</span>
            {x}
          </li>
        ))}
      </ul>

      <a
        href="#enquire"
        data-cursor-hover
        onClick={() => {
          // seed the form's service select with this package
          document.dispatchEvent(
            new CustomEvent('pricing:select-service', { detail: `pkg-${pkg.id}` })
          );
        }}
        className={`mt-8 inline-flex w-full items-center justify-center border px-6 py-3 font-mono text-[11px] tracking-[0.2em] outline-none transition-colors duration-300 focus-visible:ring-1 focus-visible:ring-[var(--accent)] ${
          accent
            ? 'border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[#0A0A0A]'
            : 'border-white/15 text-[var(--fg)] hover:border-white/40'
        }`}
      >
        {pkg.cta.toUpperCase()} →
      </a>
    </article>
  );
}

/* ── Section C — specialized services ────────────────────────────── */

function ServiceRow({ svc }: { svc: ServiceDef }) {
  const { market } = useMarket();
  return (
    <div className="grid grid-cols-1 gap-3 border-b border-white/5 py-6 lg:grid-cols-[auto_1fr_auto] lg:items-baseline lg:gap-8">
      <span className="font-mono text-[10px] tracking-[0.3em] text-[var(--fg-dim)] lg:w-10">
        {svc.code}
      </span>
      <div>
        <h3 className="text-base font-medium tracking-tight text-[var(--fg)]">{svc.name}</h3>
        <p className="mt-1.5 max-w-xl text-sm font-light leading-relaxed text-gray-400">
          {svc.description}
        </p>
        {svc.scoped && (
          <p className="mt-2 font-mono text-[10px] tracking-[0.15em] text-[var(--fg-dim)]">
            FINAL SCOPE &amp; QUOTE AFTER DISCOVERY
          </p>
        )}
      </div>
      <div className="flex items-baseline gap-6 lg:flex-col lg:items-end lg:gap-2">
        <p className="font-mono text-base tracking-wide text-[var(--accent)]">
          {formatPrice(svc.price, market)}
        </p>
        <a
          href="#enquire"
          data-cursor-hover
          onClick={() => {
            document.dispatchEvent(
              new CustomEvent('pricing:select-service', { detail: svc.id })
            );
          }}
          className="font-mono text-[10px] tracking-[0.2em] text-[var(--fg-muted)] outline-none transition-colors hover:text-[var(--fg)] focus-visible:ring-1 focus-visible:ring-[var(--accent)]"
        >
          DISCUSS →
        </a>
      </div>
    </div>
  );
}

/* ── Main body ───────────────────────────────────────────────────── */

export default function PricingBody() {
  const { market, selectedServiceId, setSelectedServiceId } = useMarket();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Package "CTA" seeds the enquiry form's service select via a DOM event.
  useEffect(() => {
    const handler = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      setSelectedServiceId(id);
    };
    document.addEventListener('pricing:select-service', handler);
    return () => document.removeEventListener('pricing:select-service', handler);
  }, [setSelectedServiceId]);

  // Gentle, reduced-motion-aware reveal — mirrors the site's
  // IntersectionObserver + matchMedia pattern (see Answers.tsx).
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (els.length === 0) return;

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.set(els, { opacity: 0, y: 18 });
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              gsap.to(entry.target, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' });
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      els.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    });
    return () => mm.revert();
  }, []);

  // Build the service <select> options: packages first, then specialized services.
  const serviceOptions: ServiceOption[] = useMemo(
    () => [
      ...PACKAGES.map((p) => ({ id: `pkg-${p.id}`, name: `${p.name} package`, price: p.price })),
      ...SERVICES.map((s) => ({ id: s.id, name: s.name, price: s.price })),
    ],
    []
  );

  return (
    <>
      {/* ── Section A — Hero ─────────────────────────────────────── */}
      <section className="relative z-10 px-6 pt-24 pb-10 sm:px-10 sm:pt-32 lg:pl-[7vw] lg:pr-[7vw]">
        <div className="max-w-3xl">
          <p className="font-mono text-[10px] tracking-[0.35em] text-[var(--fg-dim)]">
            00 // PRICING
          </p>
          <h1 className="mt-6 text-[clamp(2.25rem,6vw,4.5rem)] font-extrabold leading-[0.98] tracking-[-0.03em] text-[var(--fg)]">
            Clear pricing. Exceptional digital work.
          </h1>
          <div className="divider mt-8 w-16 origin-left" />
          <p className="mt-8 max-w-2xl text-base font-light leading-relaxed tracking-wide text-[var(--fg-muted)] sm:text-lg">
            Thoughtfully designed websites and custom digital solutions, with clear starting
            prices and a scope tailored to your business.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <a
              href="#enquire"
              data-cursor-hover
              className="inline-flex items-baseline border border-white/15 px-7 py-3 font-mono text-xs tracking-[0.2em] text-[var(--fg)] outline-none transition-colors duration-300 hover:border-white/40 focus-visible:ring-1 focus-visible:ring-[var(--accent)]"
            >
              DISCUSS YOUR PROJECT →
            </a>
            <Link
              href="/services"
              data-cursor-hover
              className="font-mono text-xs tracking-[0.2em] text-[var(--fg-muted)] outline-none transition-colors hover:text-[var(--fg)] focus-visible:ring-1 focus-visible:ring-[var(--accent)]"
            >
              EXPLORE SERVICES
            </Link>
          </div>

          {/* Market selector */}
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <span className="font-mono text-[10px] tracking-[0.25em] text-[var(--fg-dim)]">
              PRICING FOR
            </span>
            <MarketSelector />
            <span className="font-mono text-[10px] leading-relaxed tracking-[0.15em] text-[var(--fg-dim)]">
              {market === 'IN'
                ? 'FOR BUSINESSES BASED IN INDIA · BILLED IN INR'
                : 'FOR INTERNATIONAL PROJECTS · BILLED IN USD'}
            </span>
          </div>
        </div>
      </section>

      {/* ── Section B — core packages ────────────────────────────── */}
      <section
        data-reveal
        className="relative z-10 px-6 py-16 sm:px-10 lg:pl-[7vw] lg:pr-[7vw]"
      >
        <SectionHead
          n="01"
          kicker="// WEBSITES"
          title="Three ways to start."
          intro="The core offering — three website packages with clear starting prices. Every one is custom-designed; the difference is scale, depth and how much of your brand we build in."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {PACKAGES.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
        <p className="mt-6 max-w-3xl font-mono text-[10px] leading-relaxed tracking-[0.1em] text-[var(--fg-dim)]">
          ALL PRICES ARE STARTING PRICES · THE FINAL QUOTE DEPENDS ON SCOPE, COMPLEXITY,
          INTEGRATIONS, CONTENT AND DELIVERABLES · TIMELINES BEGIN ONCE DEPOSIT, CONTENT,
          ASSETS AND ACCESS ARE RECEIVED
        </p>
      </section>

      {/* ── Section C — specialized services ─────────────────────── */}
      <section
        data-reveal
        className="relative z-10 border-t border-white/5 px-6 py-16 sm:px-10 lg:pl-[7vw] lg:pr-[7vw]"
      >
        <SectionHead
          n="02"
          kicker="// BEYOND WEBSITES"
          title="Beyond websites."
          intro="Specialized work, scoped individually and priced from its own starting figure. Complex engagements are quoted after discovery so the number reflects exactly what you need."
        />
        <div className="mt-10 border-t border-white/5">
          {SERVICES.map((svc) => (
            <ServiceRow key={svc.id} svc={svc} />
          ))}
        </div>
      </section>

      {/* ── Section D — ongoing partnerships ─────────────────────── */}
      <section
        data-reveal
        className="relative z-10 border-t border-white/5 px-6 py-16 sm:px-10 lg:pl-[7vw] lg:pr-[7vw]"
      >
        <SectionHead
          n="03"
          kicker="// ONGOING"
          title="Ongoing partnerships."
          intro="After launch, keep the site healthy or reserve development capacity. Monthly, no lock-in beyond the agreement, with limits stated plainly."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {RETAINERS.map((r) => (
            <article key={r.id} className="flex flex-col border border-white/10 bg-[var(--bg)] p-8 sm:p-10">
              <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--fg-dim)]">{r.code}</p>
              <h3 className="mt-4 text-2xl font-bold tracking-[-0.02em] text-[var(--fg)]">
                {r.name}
              </h3>
              <p className="mt-3 max-w-sm text-sm font-light leading-relaxed text-[var(--fg-muted)]">
                {r.description}
              </p>
              <p className="mt-6 font-mono text-2xl tracking-wide text-[var(--accent)]">
                {formatPrice(r.price, market)}
              </p>
              <p className="mt-1 font-mono text-[10px] tracking-[0.2em] text-[var(--fg-dim)]">
                STARTING PRICE · MONTHLY
              </p>
              <ul className="mt-7 space-y-3">
                {r.includes.map((i) => (
                  <li key={i} className="flex gap-3 text-sm font-light leading-relaxed text-gray-300">
                    <span className="font-mono text-[11px] text-[var(--accent)]">→</span>
                    {i}
                  </li>
                ))}
              </ul>
              <p className="mt-7 border-t border-white/5 pt-5 text-xs font-light leading-relaxed text-[var(--fg-dim)]">
                {r.limits}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* ── Section E — what every project includes ──────────────── */}
      <section
        data-reveal
        className="relative z-10 border-t border-white/5 px-6 py-16 sm:px-10 lg:pl-[7vw] lg:pr-[7vw]"
      >
        <SectionHead
          n="04"
          kicker="// PROCESS"
          title="What every project includes."
          intro="However big or small the build, the engagement follows the same five steps — clear communication, agreed deliverables and a defined handover."
        />
        <div className="mt-12 grid gap-px border border-white/5 bg-white/5 sm:grid-cols-2 lg:grid-cols-5">
          {ENGAGEMENT_STEPS.map((s) => (
            <div key={s.n} className="flex flex-col bg-[var(--bg)] p-6">
              <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--accent)]">{s.n}</p>
              <h3 className="mt-4 text-sm font-medium leading-snug tracking-tight text-[var(--fg)]">
                {s.title}
              </h3>
              <p className="mt-3 text-xs font-light leading-relaxed text-gray-400">{s.body}</p>
            </div>
          ))}
        </div>

        {/* Commercial terms */}
        <div className="mt-16 grid gap-10 lg:grid-cols-[35%_65%]">
          <h3 className="text-xl font-bold tracking-[-0.02em] text-[var(--fg)]">Commercial terms</h3>
          <div className="border-t border-white/5">
            {TERMS.map((t) => (
              <div key={t.label} className="grid gap-1 border-b border-white/5 py-5 sm:grid-cols-[30%_70%] sm:gap-6">
                <p className="font-mono text-[10px] tracking-[0.2em] text-[var(--fg-dim)]">
                  {t.label.toUpperCase()}
                </p>
                <p className="text-sm font-light leading-relaxed text-gray-400">{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section G — FAQ ──────────────────────────────────────── */}
      <section
        data-reveal
        className="relative z-10 border-t border-white/5 px-6 py-16 sm:px-10 lg:pl-[7vw] lg:pr-[7vw]"
      >
        <SectionHead n="05" kicker="// FAQ" title="Pricing questions." />
        <div className="mt-10 border-t border-white/5">
          {PRICING_FAQS.map((item, i) => {
            const isOpen = openFaq === i;
            const panelId = `pricing-faq-panel-${i}`;
            const buttonId = `pricing-faq-button-${i}`;
            return (
              <div key={item.q} className="border-b border-white/5">
                <button
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  data-cursor-hover
                  className="group/row flex w-full items-center justify-between gap-6 py-6 text-left outline-none transition-colors focus-visible:text-gray-300"
                >
                  <span className="flex items-baseline gap-4 sm:gap-6">
                    <span
                      className={`font-mono text-[10px] tracking-[0.3em] transition-colors duration-300 ${
                        isOpen ? 'text-[var(--accent)]' : 'text-[var(--fg-dim)]'
                      }`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`text-sm font-medium tracking-tight transition-colors duration-300 sm:text-base ${
                        isOpen ? 'text-[var(--fg)]' : 'text-[var(--fg-muted)] group-hover/row:text-[var(--fg)]'
                      }`}
                    >
                      {item.q}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className={`shrink-0 font-mono text-base leading-none transition-transform duration-300 ${
                      isOpen ? 'rotate-45 text-[var(--accent)]' : 'text-[var(--fg-dim)]'
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`grid transition-[grid-template-rows] duration-400 ease-out ${
                    isOpen ? '[grid-template-rows:1fr]' : '[grid-template-rows:0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-7 pl-8 pr-4 text-sm font-light leading-relaxed text-gray-400 sm:pl-10 sm:text-base">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Section H — enquiry ──────────────────────────────────── */}
      <section
        id="enquire"
        className="relative z-10 border-t border-white/5 px-6 py-20 sm:px-10 sm:py-24 lg:pl-[7vw] lg:pr-[7vw]"
      >
        <div className="grid gap-14 lg:grid-cols-[45%_55%]">
          <div>
            <p className="font-mono text-[10px] tracking-[0.35em] text-[var(--fg-dim)]">
              <span className="text-[var(--accent)]">06</span> {'// START'}
            </p>
            <h2 className="mt-5 text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[0.98] tracking-[-0.03em] text-[var(--fg)]">
              Have a project in mind?
            </h2>
            <div className="divider mt-6 w-12 origin-left" />
            <p className="mt-6 max-w-md text-sm font-light leading-relaxed tracking-wide text-[var(--fg-muted)] sm:text-base">
              Tell us what you&apos;re building. We&apos;ll help define the right scope, approach,
              and investment.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                href="/work"
                data-cursor-hover
                className="font-mono text-xs tracking-[0.2em] text-[var(--fg-muted)] outline-none transition-colors hover:text-[var(--fg)] focus-visible:ring-1 focus-visible:ring-[var(--accent)]"
              >
                EXPLORE OUR WORK →
              </Link>
            </div>
          </div>

          <PricingEnquiryForm
            serviceOptions={serviceOptions}
            defaultServiceId={selectedServiceId}
          />
        </div>
      </section>
    </>
  );
}
