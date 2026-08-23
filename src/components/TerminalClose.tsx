'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const useBrowserEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
import gsap from 'gsap';
import dynamic from 'next/dynamic';

const CalEmbed = dynamic(() => import('./CalEmbed'), { ssr: false });

type FormState = 'idle' | 'submitting' | 'scheduled';

export default function TerminalClose() {
  const sectionRef = useRef<HTMLElement>(null);
  const promptRef = useRef<HTMLHeadingElement>(null);
  const pricingRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState<FormState>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', projectType: '', notes: '' });

  useBrowserEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const tl = gsap.timeline();

              tl.fromTo(
                promptRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
              )
                .fromTo(
                  pricingRef.current,
                  { opacity: 0, y: 16 },
                  { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
                  '-=0.3'
                )
                .fromTo(
                  formRef.current,
                  { opacity: 0, y: 20 },
                  { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
                  '-=0.25'
                );

              observer.disconnect();
            }
          });
        },
        { threshold: 0.15 }
      );

      observer.observe(section);

      return () => {
        observer.disconnect();
      };
    });

    return () => mm.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');

    try {
      const res = await fetch('https://formsubmit.co/ajax/hi@acaditya10.tech', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `New Discovery Request — ${formData.name}`,
          _captcha: 'false',
          _template: 'box',
          _confirmation: `Hi ${formData.name},\n\nThanks for reaching out. I've received your project notes and will be in touch shortly.\n\nIn the meantime, you can schedule a discovery call directly:\nhttps://cal.com/acaditya10/discovery\n\n— Aditya, Vortex Labs`,
          name: formData.name,
          email: formData.email,
          projectType: formData.projectType,
          notes: formData.notes,
        }),
      });

      if (res.ok) {
        setFormState('scheduled');
      } else {
        setFormState('idle');
      }
    } catch {
      setFormState('idle');
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative z-10 bg-[var(--bg)] px-6 pt-32 pb-20 sm:px-10 sm:pt-40 sm:pb-24 lg:pl-[7vw]"
    >
      <div className="w-full">
        {/* The Command */}
        <h2
          ref={promptRef}
          className="text-[clamp(2.5rem,9vw,8rem)] font-bold leading-[0.92] tracking-[-0.04em] text-[var(--fg)] opacity-0"
        >
          {formState === 'scheduled' ? 'One more step.' : 'Commission a Build.'}
        </h2>

        {/* Pricing Anchor */}
        <p
          ref={pricingRef}
          className="mt-8 max-w-2xl text-sm font-light leading-relaxed tracking-wide text-[var(--fg-muted)] sm:text-base opacity-0"
        >
          {formState === 'scheduled'
            ? 'Book a 30-minute discovery call. No pitch — just a focused technical conversation about your project.'
            : 'Have a website worth building? Tell me what you\'re working on and what you want the experience to become.'}
        </p>

        {/* The Form */}
        {formState !== 'scheduled' ? (
          <form
            ref={formRef}
            className="mt-14 max-w-xl space-y-6 sm:mt-20 opacity-0"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="box" />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block font-mono text-[10px] tracking-[0.25em] text-[var(--fg-muted)]"
                >
                  NAME
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border-b border-white/20 bg-transparent py-3 text-sm font-light tracking-wide text-[var(--fg)] outline-none transition-colors placeholder:text-[#6A6560] focus:border-[var(--accent)] sm:text-base"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block font-mono text-[10px] tracking-[0.25em] text-[var(--fg-muted)]"
                >
                  EMAIL
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border-b border-white/20 bg-transparent py-3 text-sm font-light tracking-wide text-[var(--fg)] outline-none transition-colors placeholder:text-[#6A6560] focus:border-[var(--accent)] sm:text-base"
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="projectType"
                className="mb-2 block font-mono text-[10px] tracking-[0.25em] text-[var(--fg-muted)]"
              >
                PROJECT TYPE
              </label>
              <select
                id="projectType"
                name="projectType"
                required
                value={formData.projectType}
                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                className="w-full border-b border-white/20 bg-transparent py-3 text-sm font-light tracking-wide text-[var(--fg)] outline-none transition-colors focus:border-[var(--accent)] sm:text-base [&>option]:bg-[var(--bg)] [&>option]:text-[var(--fg)]"
              >
                <option value="" disabled>Select a project type</option>
                <option value="new-website">New Website</option>
                <option value="website-redesign">Website Redesign</option>
                <option value="e-commerce">E-Commerce</option>
                <option value="digital-experience">Digital Experience</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="notes"
                className="mb-2 block font-mono text-[10px] tracking-[0.25em] text-[var(--fg-muted)]"
              >
                PROJECT NOTES
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={4}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full resize-none border-b border-white/20 bg-transparent py-3 text-sm font-light tracking-wide text-[var(--fg)] outline-none transition-colors placeholder:text-[#6A6560] focus:border-[var(--accent)] sm:text-base"
                placeholder="What problem are you solving? What does success look like?"
              />
            </div>

            {/* The Action */}
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
                    [ REQUEST DISCOVERY{' '}
                    <span className="inline-block transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5">
                      ↗
                    </span>{' '}
                    ]
                  </>
                )}
              </button>
              <p className="mt-5 font-mono text-[10px] tracking-[0.2em] text-[var(--fg-dim)]">
                [ INVESTMENT ] SCOPED PER PROJECT AT DISCOVERY — NO GENERIC PACKAGES
              </p>
            </div>
          </form>
        ) : (
          /* Scheduling View */
          (() => {
            const calNotes = `[${formData.projectType}] ${formData.notes}`;
            const calLink = `acaditya10/discovery`;

            return (
              <div className="mt-14 sm:mt-20">
                {/* Cal.com Themed Embed */}
                <div className="rounded-none border border-white/[0.06] bg-[#0A0A0A] p-0">
                  <CalEmbed
                    calLink={calLink}
                    name={formData.name}
                    email={formData.email}
                    notes={calNotes}
                  />
                </div>

                {/* Back Button */}
                <div className="mt-8">
                  <button
                    onClick={() => {
                      setFormState('idle');
                      setFormData({ name: '', email: '', projectType: '', notes: '' });
                    }}
                    data-cursor-hover
                    className="font-mono text-[10px] tracking-[0.2em] text-[var(--fg-dim)] outline-none transition-colors hover:text-[var(--fg-muted)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)]"
                  >
                    ← BACK TO FORM
                  </button>
                </div>
              </div>
            );
          })()
        )}

        {/* Footer Bar */}
        <footer className="mt-32 border-t border-white/5 pt-8 sm:mt-40">
          <div className="flex flex-col gap-6 text-[9px] font-mono tracking-wider text-[var(--fg-dim)] sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:text-[10px] md:text-[11px]">
            <span>IMMERSIVE DIGITAL EXPERIENCES / VORTEX LABS</span>
            <div className="flex items-center gap-8">
              <a
                href="mailto:hi@acaditya10.tech"
                data-cursor-hover
                className="outline-none transition-colors duration-300 hover:text-[var(--fg-muted)] focus-visible:text-[var(--fg-muted)]"
              >
                [ EMAIL ↗ ]
              </a>
              <a
                href="https://github.com/acaditya10"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="outline-none transition-colors duration-300 hover:text-[var(--fg-muted)] focus-visible:text-[var(--fg-muted)]"
              >
                [ GITHUB ↗ ]
              </a>
            </div>
            <span>INDIA · REMOTE-FIRST — &copy; {new Date().getFullYear()}</span>
          </div>
        </footer>
      </div>
    </section>
  );
}
