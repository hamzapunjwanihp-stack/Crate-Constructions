import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/data/site";
import { jsonLdString, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HydrationBoundary } from "@/components/layout/HydrationBoundary";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { CursorLabelLoader } from "@/components/ui/CursorLabelLoader";
import { MotionObserver } from "@/components/layout/MotionObserver";
import "./globals.css";

// Self-hosted (SIL Open Font License) — no runtime or build-time dependency on Google Fonts.
// Archivo is subset to Latin and its variable axes limited to the ranges the design uses
// (weight 300–700, width 84–112%) to keep the critical font payload small.
const archivo = localFont({
  src: "./fonts/Archivo-Variable.woff2",
  variable: "--font-archivo",
  weight: "300 700",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "84% 112%" }],
});

const plexMono = localFont({
  src: "./fonts/IBMPlexMono-Medium.woff2",
  variable: "--font-plex-mono",
  weight: "400 500",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Crate Construction | Dallas General Contractor & Residential Builder",
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "general contractor Dallas TX",
    "Dallas residential construction",
    "Dallas home builder",
    "custom home builder Dallas",
    "home remodeling Dallas",
    "Dallas home renovation contractor",
    "kitchen remodeling Dallas",
    "bathroom remodeling Dallas",
    "home additions Dallas",
  ],
  creator: site.name,
  publisher: site.name,
  category: "construction",
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
    url: "/",
    title: "Crate Construction | Dallas General Contractor & Residential Builder",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Crate Construction | Dallas General Contractor & Residential Builder",
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#111111",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-US" className={`${archivo.variable} ${plexMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Enables scroll-reveal hidden states only when JavaScript runs. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="fixed left-4 top-4 z-[60] -translate-y-24 bg-ink px-5 py-3 text-bone label-caps transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString([organizationJsonLd(), websiteJsonLd()]) }}
        />
        <SmoothScroll />
        <MotionObserver />
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <HydrationBoundary>
          <Footer />
        </HydrationBoundary>
        <CursorLabelLoader />
      </body>
    </html>
  );
}
