import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./site-shell.css";
import Header from "@/components/site/Header.tsx";
import Footer from "@/components/site/Footer.tsx";

const geist = localFont({ src: "../public/fonts/geist-latin.woff2", variable: "--font-geist-sans", display: "swap", weight: "100 900" });
const geistMono = localFont({ src: "../public/fonts/geist-mono-latin.woff2", variable: "--font-geist-mono", display: "swap", weight: "100 900" });
const sourceSerif = localFont({ src: "../public/fonts/source-serif-4.woff2", variable: "--font-source-serif", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://rehaanshaw.vercel.app"),
  title: "Rehaan Shaw, Software & AI Engineering",
  description:
    "Rehaan Shaw is a UC Irvine computer science student building verifiable AI systems and useful software. Seeking Summer 2027 SWE and AI engineering internships.",
  openGraph: {
    type: "website",
    siteName: "Rehaan Shaw",
    url: "https://rehaanshaw.vercel.app",
    title: "Rehaan Shaw, Software & AI Engineering",
    description:
      "A portfolio of verifiable AI systems, useful software, and the engineering decisions behind them.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rehaan Shaw, Software & AI Engineering",
    description:
      "A portfolio of verifiable AI systems, useful software, and the engineering decisions behind them.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.variable + " " + geistMono.variable + " " + sourceSerif.variable}>
      <body className="site-body">
        <a href="#main" className="skip-link">Skip to content</a>
        <Header />
        <main id="main" tabIndex={-1}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
