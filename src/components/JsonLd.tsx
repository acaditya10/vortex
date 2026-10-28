/**
 * Renders a JSON-LD script tag. Content is serialized server-side;
 * never insert untrusted strings into `data`.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
