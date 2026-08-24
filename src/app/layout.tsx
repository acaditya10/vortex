import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const SITE_URL = "https://getvortexlabs.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Vortex Labs — Web Design & Engineering Studio",
    template: "%s | Vortex Labs",
  },
  description:
    "Independent web design and engineering studio building premium websites and digital experiences for ambitious brands. Next.js, headless Shopify, motion design — built from strategy through deployment.",
  keywords: [
    "web design studio",
    "web development studio",
    "digital design studio",
    "Next.js development",
    "headless Shopify",
    "React development",
    "motion design",
    "web development India",
    "premium websites",
    "digital experiences",
    "independent studio",
    "freelance web developer",
    "custom web development",
    "e-commerce development",
    "UI/UX engineering",
  ],
  authors: [{ name: "Aditya Chandra", url: SITE_URL }],
  creator: "Aditya Chandra",
  publisher: "Vortex Labs",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Vortex Labs",
    title: "Vortex Labs — Web Design & Engineering Studio",
    description:
      "Independent web design and engineering studio building premium websites and digital experiences for ambitious brands.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vortex Labs — Web Design & Engineering Studio",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vortex Labs — Web Design & Engineering Studio",
    description:
      "Independent web design and engineering studio building premium websites and digital experiences for ambitious brands.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A0A0A",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Google Analytics 4 — replace G-XXXXXXXXXX with your Measurement ID */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX', {
              page_title: document.title,
              page_location: window.location.href,
            });
          `}
        </Script>

        {/* Google Search Console — replace with your verification code */}
        <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE_HERE" />
      </head>
      <body className="min-h-full flex flex-col">
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Vortex Labs",
              description:
                "Independent web design and engineering studio building premium websites and digital experiences for ambitious brands.",
              url: SITE_URL,
              logo: `${SITE_URL}/logo.png`,
              founder: {
                "@type": "Person",
                name: "Aditya Chandra",
                jobTitle: "Founder & Engineer",
                url: "https://github.com/acaditya10",
              },
              areaServed: "Worldwide",
              serviceType: [
                "Web Design",
                "Web Development",
                "E-Commerce Development",
                "UI/UX Engineering",
                "Motion Design",
                "Digital Experience Engineering",
              ],
              sameAs: [
                "https://github.com/acaditya10",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                email: "hi@acaditya10.tech",
                contactType: "customer service",
              },
              priceRange: "$$$$",
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "How long does a build take?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Every project gets a concrete schedule at scope. Landing systems move fastest; full custom sites run longer depending on motion complexity and content readiness.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How do revisions work?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "You review high-fidelity design before a single component ships. During build, changes move fast because the designer and the developer are the same person.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Who owns the code?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "You do. Entirely. Repository, deployment pipeline, domain, analytics — everything transfers at handover with documentation. No lock-in.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What happens after launch?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Launch ends the project, not the relationship. Structured care plans cover ongoing improvements; ad-hoc support handles everything else.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Why solo instead of an agency?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "One accountable operator means decisions happen in hours instead of standups, budgets go into craft instead of overhead — and the person designing your interface writes its production code.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What do you need from me to start?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "A discovery call first. Then brand assets, content direction and platform access at kickoff. From there you review at defined checkpoints while I handle everything end-to-end.",
                  },
                },
              ],
            }),
          }}
        />

        <a
          href="#work"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10001] focus:bg-[var(--bg)] focus:px-4 focus:py-2 focus:text-sm focus:text-[var(--fg)] focus:outline-1 focus:outline-[var(--accent)]"
        >
          Skip to content
        </a>
        <main className="flex-1 flex flex-col">{children}</main>
      </body>
    </html>
  );
}
