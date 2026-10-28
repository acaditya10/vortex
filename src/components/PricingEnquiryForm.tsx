'use client';

/**
 * Pricing enquiry form.
 *
 * Reuses the site's existing submission mechanism (FormSubmit AJAX to
 * SITE.email) — no new endpoint, service or database. Extends the
 * homepage contact form with market, service of interest and budget so
 * the studio can qualify an enquiry from the pricing page directly.
 *
 * Accepts prefills (market + service) so package / service CTAs can seed
 * the form, and swaps budget options to match the selected market.
 */

import { useState } from 'react';
import Link from 'next/link';
import { trackFormSubmit, trackFormError, trackScheduleClick } from '@/lib/analytics';
import { SITE } from '@/lib/site';
import {
  MARKETS,
  MARKET_LIST,
  BUDGET_BANDS,
  formatPrice,
  type Market,
  type PricePair,
} from '@/lib/pricing';
import { useMarket } from '@/lib/marketContext';

type FormState = 'idle' | 'submitting' | 'sent' | 'error';

/** id → display name + price, used to seed the "service" select and its label. */
export type ServiceOption = { id: string; name: string; price?: PricePair };

const inputCls =
  'w-full border-b border-white/20 bg-transparent py-3 text-sm font-light tracking-wide text-[var(--fg)] outline-none transition-colors placeholder:text-[#6A6560] focus:border-[var(--accent)] sm:text-base';
const labelCls = 'mb-2 block font-mono text-[10px] tracking-[0.25em] text-[var(--fg-muted)]';
const selectCls =
  inputCls + ' cursor-pointer appearance-none pr-8 [&>option]:bg-[#111] [&>option]:text-[var(--fg)]';

export default function PricingEnquiryForm({
  serviceOptions,
  defaultServiceId,
}: {
  serviceOptions: ServiceOption[];
  defaultServiceId?: string;
}) {
  const { market, setMarket } = useMarket();
  const [formState, setFormState] = useState<FormState>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    market: market,
    service: defaultServiceId ?? '',
    budget: '',
    notes: '',
  });

  const bands = BUDGET_BANDS[market as Market];

  // Keep the select in sync when a package/service CTA seeds it.
  // Adjust-during-render pattern (React docs) — no effect, no cascade.
  const [lastServiceId, setLastServiceId] = useState(defaultServiceId ?? '');
  if ((defaultServiceId ?? '') !== lastServiceId) {
    setLastServiceId(defaultServiceId ?? '');
    setFormData((prev) => ({ ...prev, service: defaultServiceId ?? '' }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${SITE.email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `New Pricing Enquiry — ${formData.name}`,
          _captcha: 'false',
          _template: 'box',
          name: formData.name,
          email: formData.email,
          company: formData.company || '—',
          market: MARKETS[market as Market].country,
          service: serviceOptions.find((s) => s.id === formData.service)?.name || 'Not listed',
          budget:
            bands.find((b) => b.value === formData.budget)?.label || 'Not specified',
          notes: formData.notes,
        }),
      });

      if (res.ok) {
        setFormState('sent');
        trackFormSubmit();
      } else {
        setFormState('error');
        trackFormError('server_error');
      }
    } catch {
      setFormState('error');
      trackFormError('network_error');
    }
  };

  if (formState === 'sent') {
    return (
      <div className="max-w-xl">
        <p className="text-sm font-light leading-relaxed text-[var(--fg-muted)] sm:text-base">
          Thanks — your enquiry is in. You will hear back shortly. If you would rather talk it
          through now, book a call directly.
        </p>
        <a
          href={SITE.calComUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor-hover
          onClick={() => trackScheduleClick('pricing_form_success')}
          className="mt-8 inline-flex items-baseline font-mono text-xs tracking-[0.2em] text-white outline-none transition-colors duration-300 hover:text-gray-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-background"
        >
          [ SCHEDULE A CALL{' '}
          <span className="inline-block transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5">
            ↗
          </span>{' '}
          ]
        </a>
        <button
          onClick={() => {
            setFormState('idle');
            setFormData({
              name: '',
              email: '',
              company: '',
              market,
              service: defaultServiceId ?? '',
              budget: '',
              notes: '',
            });
          }}
          data-cursor-hover
          className="ml-6 font-mono text-[10px] tracking-[0.2em] text-[var(--fg-dim)] outline-none transition-colors hover:text-[var(--fg-muted)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)]"
        >
          ← SEND ANOTHER
        </button>
      </div>
    );
  }

  return (
    <form className="max-w-xl space-y-6" onSubmit={handleSubmit} noValidate={false}>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="pe-name" className={labelCls}>
            NAME
          </label>
          <input
            id="pe-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={inputCls}
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="pe-email" className={labelCls}>
            BUSINESS EMAIL
          </label>
          <input
            id="pe-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={inputCls}
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="pe-company" className={labelCls}>
          COMPANY / BRAND <span className="text-[var(--fg-dim)]">(OPTIONAL)</span>
        </label>
        <input
          id="pe-company"
          name="company"
          type="text"
          autoComplete="organization"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          className={inputCls}
          placeholder="Company or brand name"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="pe-market" className={labelCls}>
            MARKET
          </label>
          <select
            id="pe-market"
            name="market"
            value={market}
            onChange={(e) => {
              const m = e.target.value as Market;
              setMarket(m);
              setFormData((prev) => ({ ...prev, market: m, budget: '' }));
            }}
            className={selectCls}
          >
            {MARKET_LIST.map((m) => (
              <option key={m.code} value={m.code}>
                {m.label} — {m.currency}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="pe-service" className={labelCls}>
            SERVICE OF INTEREST
          </label>
          <select
            id="pe-service"
            name="service"
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            className={selectCls}
          >
            <option value="">Not sure yet</option>
            {serviceOptions.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
                {s.price ? ` — from ${formatPrice(s.price, market)}` : ''}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="pe-budget" className={labelCls}>
          APPROXIMATE BUDGET
        </label>
        <select
          id="pe-budget"
          name="budget"
          value={formData.budget}
          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
          className={selectCls}
        >
          <option value="">Select a range</option>
          {bands.map((b) => (
            <option key={b.value} value={b.value}>
              {b.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="pe-notes" className={labelCls}>
          PROJECT DESCRIPTION
        </label>
        <textarea
          id="pe-notes"
          name="notes"
          rows={4}
          required
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className={inputCls + ' resize-none'}
          placeholder="What are you building, and what does success look like?"
        />
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={formState === 'submitting'}
          data-cursor-hover
          className="group/btn inline-flex items-baseline font-mono text-xs tracking-[0.2em] text-white outline-none transition-colors duration-300 hover:text-gray-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-background disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {formState === 'submitting' ? (
            '[ SENDING... ]'
          ) : (
            <>
              [ SEND ENQUIRY{' '}
              <span className="inline-block transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5">
                ↗
              </span>{' '}
              ]
            </>
          )}
        </button>

        {formState === 'error' && (
          <p role="alert" className="mt-4 font-mono text-[10px] tracking-[0.2em] text-[#D98C7A]">
            SOMETHING WENT WRONG — PLEASE TRY AGAIN OR EMAIL{' '}
            <a
              href={`mailto:${SITE.email}`}
              className="text-[var(--fg-muted)] underline underline-offset-4 transition-colors hover:text-[var(--fg)]"
            >
              {SITE.email.toUpperCase()}
            </a>
          </p>
        )}

        <p className="mt-6 font-mono text-[10px] tracking-[0.2em] text-[var(--fg-dim)]">
          NO OBLIGATION · FIXED SCOPE QUOTED BEFORE ANY WORK BEGINS ·{' '}
          <a
            href={SITE.calComUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            onClick={() => trackScheduleClick('pricing_form_inline')}
            className="text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)]"
          >
            OR BOOK A 30-MIN CALL ↗
          </a>
        </p>
        <p className="mt-5 font-mono text-[10px] tracking-[0.2em] text-[var(--fg-dim)]">
          PREFER EMAIL?{' '}
          <Link
            href={`mailto:${SITE.email}`}
            data-cursor-hover
            className="text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)]"
          >
            {SITE.email.toUpperCase()}
          </Link>
        </p>
      </div>
    </form>
  );
}
