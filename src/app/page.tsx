import Hero from "@/components/Hero";
import GridBackground from "@/components/GridBackground";
import SystemExhibits from "@/components/SystemExhibits";
import Capabilities from "@/components/Capabilities";
import ServicesPreview from "@/components/ServicesPreview";
import Protocol from "@/components/Protocol";
import Operator from "@/components/Operator";
import Answers from "@/components/Answers";
import JournalTeaser from "@/components/JournalTeaser";
import TerminalClose from "@/components/TerminalClose";
import { FAQS } from "@/lib/faq";

/**
 * FAQPage schema mirrors src/lib/faq.ts — the exact same content
 * rendered by <Answers /> on this page (Google requires parity).
 */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <GridBackground />
      <Hero />
      <SystemExhibits />
      <Capabilities />
      <ServicesPreview />
      <Protocol />
      <Operator />
      <Answers />
      <JournalTeaser />
      <TerminalClose />
    </>
  );
}
