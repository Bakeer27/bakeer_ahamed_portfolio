import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import { site } from "@/lib/content";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

const description =
  "Full-stack software engineer in Colombo, Sri Lanka. Sole engineer behind CVMS — a live certificate verification platform — and production systems for clients from Sri Lanka to Switzerland. Laravel, Livewire, React, TypeScript.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Bakeer Ahamed — Full-Stack Software Engineer",
    template: "%s — Bakeer Ahamed",
  },
  description,
  keywords: [
    "Bakeer Ahamed",
    "Full-Stack Software Engineer",
    "Laravel developer",
    "Livewire",
    "React",
    "TypeScript",
    "Colombo",
    "Sri Lanka",
    "remote software engineer",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  openGraph: {
    type: "website",
    url: site.url,
    title: "Bakeer Ahamed — Full-Stack Software Engineer",
    description,
    siteName: "Bakeer Ahamed",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bakeer Ahamed — Full-Stack Software Engineer",
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#070b14",
  width: "device-width",
  initialScale: 1,
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  email: `mailto:${site.email}`,
  url: site.url,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Colombo",
    addressCountry: "LK",
  },
  sameAs: [site.github, site.linkedin],
  knowsAbout: [
    "Laravel",
    "PHP",
    "Livewire",
    "React",
    "TypeScript",
    "Node.js",
    "MySQL",
    "Web application security",
  ],
  worksFor: {
    "@type": "Organization",
    name: "Codesstream",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${geist.variable} ${geistMono.variable}`}>
      <body className="grain min-h-screen bg-ink text-fg antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
