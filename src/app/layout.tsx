import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = GeistMono;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://homecare.sevalinkcare.com";
const mainSiteUrl = process.env.NEXT_PUBLIC_MAIN_SITE_URL ?? "https://www.sevalinkcare.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "SevaLink Home Care \u2014 Professional Nursing & Elder Care in Rajkot",
    template: "%s \u2014 SevaLink Home Care",
  },

  description:
    "Book verified home care services in Rajkot. Nurse at home, elder care, doctor home visits & post-surgery care by SevaLink\u2019s trusted professionals.",

  keywords: [
    "home care Rajkot",
    "nurse at home Rajkot",
    "elder care Gujarat",
    "doctor home visit Rajkot",
    "post surgery care at home",
    "homecare services",
    "SevaLink",
    "home nursing Rajkot",
  ],

  authors: [{ name: "SevaLink" }],

  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },

  alternates: {
    canonical: siteUrl,
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "SevaLink Home Care",
    title: "SevaLink Home Care \u2014 Nursing & Elder Care in Rajkot",
    description:
      "Book verified home care professionals in Rajkot. Nursing, elder care, doctor visits & post-surgery support.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SevaLink Home Care \u2014 Professional Care at Your Door",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "SevaLink Home Care \u2014 Nursing & Elder Care in Rajkot",
    description: "Book trusted home care services in Rajkot, Gujarat.",
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/assets/brand/SevaLink-icon.png", type: "image/png" },
    ],
    apple: [{ url: "/assets/brand/SevaLink-icon.png" }],
  },

  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalBusiness",
        "@id": `${mainSiteUrl}/#organization`,
        name: "SevaLink",
        url: mainSiteUrl,
        logo: `${mainSiteUrl}/assets/brand/SevaLink-logo-r.png`,
        description: "Home care, emergency ambulance, and hospital appointment platform in Rajkot, Gujarat, India.",
        areaServed: {
          "@type": "City",
          name: "Rajkot",
          containedInPlace: {
            "@type": "State",
            name: "Gujarat",
            containedInPlace: { "@type": "Country", name: "India" },
          },
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "SevaLink Home Care",
        publisher: { "@id": `${mainSiteUrl}/#organization` },
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${geistMono.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}