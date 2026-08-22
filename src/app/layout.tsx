import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vortex Labs — Digital Design & Engineering Studio",
  description:
    "Premium websites and digital experiences for ambitious brands. Immersive, engineered, and built from strategy through deployment.",
  openGraph: {
    title: "Vortex Labs — Digital Design & Engineering Studio",
    description:
      "Premium websites and digital experiences for ambitious brands.",
    type: "website",
    locale: "en_US",
    siteName: "Vortex Labs",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vortex Labs — Digital Design & Engineering Studio",
    description:
      "Premium websites and digital experiences for ambitious brands.",
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
      </head>
      <body className="min-h-full flex flex-col">
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
