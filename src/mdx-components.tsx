import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";

/**
 * Global MDX element map — styles every markdown-rendered element
 * (blog posts, future docs) in the site's design language.
 */
const components: MDXComponents = {
  h1: (props) => (
    <h1
      className="mt-10 text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-[1.05] tracking-[-0.03em] text-[var(--fg)]"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="mt-14 mb-5 text-[clamp(1.375rem,3vw,1.875rem)] font-semibold leading-tight tracking-[-0.02em] text-[var(--fg)]"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mt-10 mb-4 text-lg font-semibold leading-snug text-[var(--fg)] sm:text-xl"
      {...props}
    />
  ),
  p: (props) => (
    <p className="my-5 text-[15px] font-light leading-[1.8] tracking-wide text-gray-300 sm:text-base" {...props} />
  ),
  a: (props) => {
    const href = typeof props.href === "string" ? props.href : "";
    const isExternal = href.startsWith("http");
    if (isExternal) {
      return (
        <a
          className="text-[var(--fg)] underline decoration-[var(--accent)]/40 underline-offset-4 transition-colors hover:decoration-[var(--accent)]"
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        />
      );
    }
    return (
      <Link
        className="text-[var(--fg)] underline decoration-[var(--accent)]/40 underline-offset-4 transition-colors hover:decoration-[var(--accent)]"
        href={href}
        {...props}
      />
    );
  },
  ul: (props) => (
    <ul className="my-6 list-none space-y-3 pl-0" {...props} />
  ),
  ol: (props) => (
    <ol className="my-6 list-none space-y-3 pl-0 counter-decimal" {...props} />
  ),
  li: (props) => (
    <li className="relative pl-6 text-[15px] font-light leading-[1.8] tracking-wide text-gray-300 before:absolute before:left-0 before:font-mono before:text-[11px] before:text-[var(--accent)] before:content-['→'] sm:text-base [&>ul]:mt-2 [&>ul]:mb-0" {...props} />
  ),
  blockquote: (props) => (
    <blockquote
      className="my-8 border-l border-[var(--accent)]/30 py-1 pl-6 text-[15px] font-light italic leading-relaxed text-[var(--fg-muted)] sm:text-base"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="rounded-sm border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[0.8em] text-[var(--accent)]"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="my-8 overflow-x-auto border border-white/10 bg-[#0C0C0C] p-5 font-mono text-[13px] leading-relaxed text-gray-300"
      {...props}
    />
  ),
  table: (props) => (
    <div className="my-8 overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm" {...props} />
    </div>
  ),
  th: (props) => (
    <th className="border-b border-white/10 px-4 py-3 font-mono text-[10px] tracking-[0.2em] text-[var(--fg-dim)]" {...props} />
  ),
  td: (props) => (
    <td className="border-b border-white/5 px-4 py-3 font-light text-gray-300" {...props} />
  ),
  hr: () => <div className="divider my-12" />,
  strong: (props) => <strong className="font-medium text-[var(--fg)]" {...props} />,
  img: ({ alt, ...props }) => (
    <Image
      alt={alt ?? ''}
      className="my-8 h-auto w-full border border-white/10"
      width={1200}
      height={675}
      {...(props as Omit<React.ComponentProps<typeof Image>, 'alt'>)}
    />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
