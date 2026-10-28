import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

/**
 * Shared chrome for every interior page. The homepage keeps its
 * bespoke full-viewport treatment outside this group.
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    return (
    <>
      <SiteHeader />
      <div className="flex-1">{children}</div>
      <SiteFooter />
    </>
  );
}
