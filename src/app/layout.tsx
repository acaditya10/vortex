import type { Metadata, Viewport } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import WebVitals from "@/components/WebVitals";
import CustomCursor from "@/components/CustomCursor";
import { SITE, SITE_URL, SERVICES } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const PAGE_TITLE = "Vortex Labs — Web Design & Next.js Development Studio";
const PAGE_DESCRIPTION =
  "Web design & Next.js engineering studio building premium websites, headless Shopify storefronts and digital experiences for ambitious brands worldwide. US & EU clients welcome. Projects from USD $500 / ₹25,000.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: PAGE_TITLE,
    template: "%s | Vortex Labs",
  },
  description: PAGE_DESCRIPTION,
  keywords: [
    "web design studio",
    "Next.js development studio",
    "Next.js developer for hire",
    "headless Shopify development",
    "Shopify headless agency",
    "premium web design",
    "web design for startups",
    "React development studio",
    "GSAP animation developer",
    "website performance optimization",
    "Core Web Vitals agency",
    "technical SEO services",
    "custom web development",
    "e-commerce development",
    "UI/UX engineering",
    "hire Next.js developer",
    "web design India",
    "remote web development agency",
  ],
  authors: [{ name: SITE.founder.name, url: SITE.founder.github }],
  creator: SITE.founder.name,
  publisher: SITE.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE.name,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Vortex Labs — Web Design & Next.js Development Studio",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [`${SITE_URL}/og-image.png`],
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
  // TODO: set SITE.googleSiteVerification in src/lib/site.ts once Search Console is set up
  verification: SITE.googleSiteVerification ? { google: SITE.googleSiteVerification } : undefined,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A0A0A",
};

/**
 * Entity graph: Organization + Person + WebSite, cross-linked by @id.
 * Consistent identity facts (name, email, founder, sameAs) are what
 * answer engines use to verify and cite a brand.
 */
const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["ProfessionalService", "LocalBusiness"],
      "@id": `${SITE_URL}/#organization`,
      name: SITE.name,
      legalName: SITE.legalName,
      description: SITE.description,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
      image: `${SITE_URL}/og-image.png`,
      email: SITE.email,
      foundingDate: String(SITE.foundedYear),
      founder: { "@id": `${SITE_URL}/#person` },
      areaServed: SITE.countryServed.map((c) => ({ "@type": "Country", name: c })),
      serviceType: SERVICES.map((s) => s.title),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Web design & engineering services",
        itemListElement: SERVICES.map((s, i) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: s.title,
            description: s.description,
            url: `${SITE_URL}/services/${s.slug}`,
          },
          position: i + 1,
        })),
      },
      sameAs: [
        SITE.founder.github,
        ...(SITE.founder.linkedin ? [SITE.founder.linkedin] : []),
        ...SITE.socials.map((s) => s.url),
      ].filter((v, i, arr) => arr.indexOf(v) === i),
      priceRange: SITE.priceRange,
      knowsAbout: [
        "Web design",
        "Next.js development",
        "React development",
        "Headless Shopify",
        "Motion design",
        "Core Web Vitals optimization",
        "Technical SEO",
      ],
      ...(SITE.city
        ? {
            address: {
              "@type": "PostalAddress",
              addressLocality: SITE.city,
              addressRegion: SITE.region,
              addressCountry: SITE.country,
            },
          }
        : {}),
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: SITE.founder.name,
      jobTitle: SITE.founder.jobTitle,
      url: SITE.founder.github,
      worksFor: { "@id": `${SITE_URL}/#organization` },
      sameAs: [
        SITE.founder.github,
        ...(SITE.founder.linkedin ? [SITE.founder.linkedin] : []),
      ],
      knowsAbout: [
        "Web design",
        "Next.js",
        "React",
        "Shopify headless architecture",
        "GSAP motion engineering",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE.name,
      description: SITE.description,
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${jetbrainsMono.variable} h-full antialiased`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/favicon-16.png" type="image/png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${SITE.ga4Id}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${SITE.ga4Id}', {
              send_page_view: true,
              cookie_domain: 'getvortexlabs.com',
              cookie_flags: 'SameSite=None;Secure',
            });
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col">
        {/* Entity graph — Organization + Person + WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />

        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10001] focus:bg-[var(--bg)] focus:px-4 focus:py-2 focus:text-sm focus:text-[var(--fg)] focus:outline-1 focus:outline-[var(--accent)]"
        >
          Skip to content
        </a>
        <CustomCursor />
        <main id="main-content" className="flex-1 flex flex-col">{children}</main>
        <AnalyticsTracker />
        <WebVitals />
      </body>
    </html>
  );
}
