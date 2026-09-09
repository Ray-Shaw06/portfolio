import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/site/Header.tsx";
import Footer from "@/components/site/Footer.tsx";
import Aura from "@/components/site/Aura.tsx";
import ScrollReveal from "@/components/site/ScrollReveal.tsx";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://rehaanshaw.vercel.app"),
  title: "Rehaan Shaw, software engineer, UCI CS '28",
  description:
    "Junior CS at UC Irvine. Paid to write the benchmark tasks and graders that break AI coding agents, and ships production software solo. Seeking Summer 2027 SWE or AI engineering internships.",
  openGraph: {
    type: "website",
    title: "Rehaan Shaw, software engineer, UCI CS '28",
    description:
      "I build the systems that check AI systems. Five products shipped solo, plus paid benchmark and grader authoring.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${geist.variable} ${geistMono.variable} ${inter.variable}`}
    >
      <body className="bg-[#09090b] font-inter text-white antialiased selection:bg-white/10 overflow-x-hidden">
        <a
          href="#work"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:text-black"
        >
          Skip to work
        </a>
        <Aura />
        <Header />
        <main className="relative z-20">{children}</main>
        <Footer />
        <ScrollReveal />
      </body>
    </html>
  );
}
