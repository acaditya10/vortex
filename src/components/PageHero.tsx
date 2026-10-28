/**
 * Shared page intro for interior pages — same design language as
 * the homepage section kickers ("04 // CORE DISCIPLINES").
 */
export default function PageHero({
  kicker,
  title,
  intro,
  children,
}: {
  kicker: string;
  title: string;
  intro?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="max-w-4xl">
      <p className="font-mono text-[10px] tracking-[0.35em] text-[var(--fg-dim)]">
        {kicker}
      </p>
      <h1 className="mt-6 text-[clamp(2.25rem,6vw,4.25rem)] font-extrabold leading-[0.98] tracking-[-0.03em] text-[var(--fg)]">
        {title}
      </h1>
      <div className="divider mt-8 w-16 origin-left" />
      {intro && (
        <p className="mt-8 max-w-2xl text-base font-light leading-relaxed tracking-wide text-[var(--fg-muted)] sm:text-lg">
          {intro}
        </p>
      )}
      {children}
    </div>
  );
}
