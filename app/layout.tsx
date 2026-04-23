import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rapidnest Software Solutions | Web, App & Custom Software Development Company",
  description: "Rapidnest Software Solutions builds websites, mobile apps, ecommerce platforms, AI solutions, and custom software for startups and businesses worldwide. Trusted by clients across USA, UAE, and India.",
};

export default function RootLayout({
children,
}: {
  children: React.ReactNode;
}) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Rapidnest Software Solutions",
    url: "https://www.therapidnest.com",
    logo: "https://www.therapidnest.com/logo.png",
  };
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
