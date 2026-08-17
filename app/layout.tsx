import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ClientLayoutWrapper from "./ClientLayoutWrapper"; // Separate hook wrapper logic
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// SERVER-SIDE SEO METADATA (Perfect length optimization matching search constraints)
export const metadata: Metadata = {
  title: "1st Call UK Group | Professional Corporate Services Nottingham",
  description: "1st Call UK Group brings together trusted professional specialists across immigration consultancy, accounting, and chartered financial advisory services.",
  alternates: {
    canonical: "https://www.1stcalluk.co.uk",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  // JSON-LD STRUCTURED DATA SCHEMA FOR INTER-CONNECTED WEBSITES
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "1st Call UK Group",
    "url": "https://www.1stcalluk.co.uk",
    "logo": "https://www.1stcalluk.co.uk/logo.png",
    "description": "A premier professional services hub in Nottingham offering specialized expertise across multi-sector business practices.",
    "email": "info@1stcalluk.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Nottingham",
      "addressCountry": "GB"
    },
    "sameAs": [
      "https://www.1stcalluk.com",
      "https://www.1stcalluk.financial"
    ]
  };

  return (
    <html lang="en-GB" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col overflow-x-hidden relative`}
      >
        {/* CLIENT INTERACTION AND STRUCTURAL RENDERING CONTENT FRAMEWORK */}
        <ClientLayoutWrapper>
          {children}
        </ClientLayoutWrapper>
      </body>
    </html>
  );
}