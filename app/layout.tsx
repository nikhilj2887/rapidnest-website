import type { Metadata } from "next";
import Script from "next/script";
import Navbar from "./components/Navbar";
import MotionEnhancements from "./components/MotionEnhancements";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import "./globals.css";
import "./mobile-interactive.css";
const title = "RapidNest Software Solutions | Custom Software & AI Automation";
const description = "RapidNest Software Solutions develops custom software, AI-enabled applications, CRM platforms, and data retention solutions for businesses.";
export const metadata: Metadata = {
    metadataBase: new URL("https://www.therapidnest.com/"), title, description,
    alternates: { canonical: "/" },
    openGraph: { type: "website", title, description, url: "/", siteName: "RapidNest Software Solutions", images: [{ url: "/Rapidnest.png", alt: "RapidNest Software Solutions" }] },
    twitter: { card: "summary", title, description, images: ["/Rapidnest.png"] },
};
export default function RootLayout({ children, }: {
    children: React.ReactNode;
}) {
    return (<html lang="en">
      <head>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-HX5DG2E97J" strategy="afterInteractive"/>

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];

            function gtag(){
              dataLayer.push(arguments);
            }

            gtag('js', new Date());

            gtag('config', 'G-HX5DG2E97J');
          `}
        </Script>
      </head>

      <body className="min-h-full flex flex-col">
        <a href="#main-content" className="skip-link">Skip to content</a>
        <Navbar />
        <MotionEnhancements />
        <main id="main-content">{children}</main>
        <Footer />
        <WhatsAppButton />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Organization", name: "RapidNest Software Solutions", url: "https://www.therapidnest.com/", logo: "https://www.therapidnest.com/Rapidnest.png", email: "contact@therapidnest.com", telephone: "+916300675410" }) }}/>
      </body>
    </html>);
}
