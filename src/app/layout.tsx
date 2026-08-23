import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "@calcom/embed-core/styles.css";
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var C = window.Cal;
                  if (!C) return;
                  C("init", "acaditya10", { origin: "https://cal.com" });
                  C("ui", {
                    theme: "dark",
                    hideEventTypeDetails: false,
                    layout: "month_view",
                    cssVarsPerTheme: {
                      dark: {
                        "cal-brand": "#C8B6A2",
                        "cal-brand-emphasis": "#DED0C2",
                        "cal-brand-text": "#0A0A0A",
                        "cal-brand-subtle": "#8A8580",
                        "cal-brand-accent": "#0A0A0A",
                        "cal-text": "#8A8580",
                        "cal-text-emphasis": "#E8E4DE",
                        "cal-text-subtle": "#6B6560",
                        "cal-text-muted": "#4A4744",
                        "cal-text-inverted": "#0A0A0A",
                        "cal-bg": "#0A0A0A",
                        "cal-bg-emphasis": "#1A1A1A",
                        "cal-bg-subtle": "#141414",
                        "cal-bg-muted": "#111111",
                        "cal-bg-inverted": "#E8E4DE",
                        "cal-border": "rgba(255,255,255,0.08)",
                        "cal-border-emphasis": "rgba(255,255,255,0.15)",
                        "cal-border-subtle": "rgba(255,255,255,0.06)",
                        "cal-border-muted": "rgba(255,255,255,0.04)",
                        "cal-border-booker": "rgba(255,255,255,0.08)",
                        "cal-border-booker-width": "1px",
                        "radius": "0px",
                        "spacing": "1rem",
                      },
                    },
                  });
                } catch (e) {}
              })();
            `,
          }}
        />
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
