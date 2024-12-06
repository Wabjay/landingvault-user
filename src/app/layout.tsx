import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import Navbar from "@/sections/navbar/Navbar";
import Footer from "@/sections/footer/Footer";
import LayoutFallBack from "@/components/FallBack/LayoutFallback";

export const metadata: Metadata = {
  title: `Landingvault: The best landing page design inspiration and Examples`,
  description: ` Landingvault`,
  icons: {
    icon: "/icon.png",
  },
  openGraph: {
    type: "website",
    siteName: "Landingvault",
    title: ` Landingvault: The best landing page design inspiration and Examples`,
    description: `Explore top landing page design inspiration on Landingvault. Get inspired with curated, high-quality landing page examples.`,
    url: `https://landingvault.com`,
    images: [
      {
        url: "/seo-card.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Landingvault: The best landing page design inspiration and Examples`,
    description: `Explore top landing page design inspiration on Landingvault. Get inspired with curated, high-quality landing page examples.`,
    images: [
      {
        url: "/seo-card.png",
      },
    ],
  },
};
export const schemaData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: `Landingvault: The best landing page design inspiration and Examples`,
  description: `Explore top landing page design inspiration on Landingvault. Get inspired with curated, high-quality landing page examples.`,
  url: `https://landingvault.com`,
  author: {
    "@type": "Person",
    name: "Landingvault",
  },
  publisher: {
    "@type": "Organization",
    name: "Pixelgum Studio",
    logo: {
      "@type": "ImageObject",
      url: "/seo-card.png",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-Switzer antialiased`}>
        <Navbar />
        <div className="mt-[60px]">
          {/* Wrap children in Suspense for fallback */}
          <Suspense fallback={<LayoutFallBack />}>
            {children}
          </Suspense>
        </div>
        <Footer />
         <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      </body>
     
    </html>
  );
}
