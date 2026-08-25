import Exhibit from './Exhibit';
import Agitator from './Agitator';

export default function SystemExhibits() {
  return (
    <section id="work" className="relative z-10 bg-[var(--bg)]">
      <Exhibit
        index="01"
        name="WINIT MEDIA"
        hook="Built a kinetic typography system and custom SVG interactive diagrams with buttery-smooth scroll triggers. Architected a secure, multi-domain enterprise platform so their internal team can safely edit content and manage leads without risking the platform's stability."
        quote="We needed a secure, multi-tenant ecosystem for our leads and editors. Vortex engineered a fortress."
        quoteAuthor="Founder"
        quoteRole="Winit Media"
        metaLine="DESIGN + DEVELOPMENT / BRAND WEBSITE / NEXT.JS / GSAP SCROLLTRIGGER / 2026"
        href="https://winitmedia.com"
        imageSrc="/wm1.webp"
        imageAlt="Winit Media enterprise platform interface"
      />

      <Agitator />

      <Exhibit
        index="02"
        name="PRINCE ACHAR"
        hook="Engineered a high-performance headless Shopify build with seamless GSAP page transitions and edge-delivered visual assets. Bypassed Shopify's rigid templates to deliver instant page loads, creating a frictionless shopping experience designed to maximize conversion rates."
        quote="Aditya entirely decoupled our infrastructure, giving us an enterprise-grade storefront without sacrificing our existing operational backend."
        quoteAuthor="Founder"
        quoteRole="Prince Achar"
        metaLine="DESIGN + DEVELOPMENT / E-COMMERCE / NEXT.JS / SHOPIFY / GSAP / 2026"
        href="https://princeachar.com"
        imageSrc="/pa1.webp"
        imageAlt="Prince Achar headless commerce storefront"
        reversed
      />

      <Exhibit
        index="03"
        name="UPMARK MEDIA"
        hook="Orchestrated a highly interactive React frontend with Framer Motion and cinematic scroll reveals. Engineered a zero-deploy, automated content platform allowing their marketing team to instantly upload massive, high-resolution media assets without ever touching code."
        quote="The kinetic UI is flawless, but the real masterpiece is the zero-deploy content pipeline Aditya built for our team."
        quoteAuthor="Founder"
        quoteRole="Upmark Media"
        metaLine="DESIGN + DEVELOPMENT / DIGITAL EXPERIENCE / NEXT.JS / FRAMER MOTION / 2026"
        href="https://upmarkmedia.com"
        imageSrc="/um1.webp"
        imageAlt="Upmark Media content platform interface"
      />

      {/* Cross-link to contact */}
      <div className="border-t border-white/5 bg-[var(--bg)] px-6 py-12 sm:px-10 lg:pl-[7vw] lg:pr-[7vw]">
        <a
          href="#contact"
          data-cursor-hover
          className="font-mono text-[10px] tracking-[0.2em] text-[var(--fg-dim)] transition-colors hover:text-[var(--fg-muted)]"
        >
          WANT SOMETHING LIKE THIS? START A BUILD →
        </a>
      </div>
    </section>
  );
}
