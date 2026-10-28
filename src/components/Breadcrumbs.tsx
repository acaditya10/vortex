import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { SITE_URL } from '@/lib/site';

export type Crumb = { label: string; href: string };

/**
 * Visual breadcrumb trail + BreadcrumbList JSON-LD.
 * First crumb should be the section root; the current page is
 * passed via `current` and is not linked.
 */
export default function Breadcrumbs({
  section,
  current,
}: {
  section: Crumb;
  current: string;
}) {
  const crumbs = [section, { label: current, href: '' }];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.label,
      item: `${SITE_URL}${crumb.href}`,
    })),
  };

  return (
    <>
      <JsonLd data={schema} />
      <nav aria-label="Breadcrumb" className="font-mono text-[10px] tracking-[0.2em] text-[var(--fg-dim)]">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" data-cursor-hover className="transition-colors hover:text-[var(--fg-muted)]">
              HOME
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href={section.href} data-cursor-hover className="transition-colors hover:text-[var(--fg-muted)]">
              {section.label.toUpperCase()}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-[var(--fg-muted)]">{current.toUpperCase()}</li>
        </ol>
      </nav>
    </>
  );
}
