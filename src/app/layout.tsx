import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import MusicPlayer from "@/components/MusicPlayer";
import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  metadataBase: new URL("https://cheersandpeace.com"),
  title: "Cheers & Peace | Event Management, Exhibition Fabrication & Business Solutions",
  description: "Cheers & Peace — 14+ years in corporate event management, exhibition stall fabrication, AV & LED production and complete business solutions. Pan-India and worldwide.",
  openGraph: {
    title: "Cheers & Peace | Event Management & Fabrication",
    description: "14+ years in corporate event management, exhibition stall fabrication, and AV production.",
    url: "https://cheersandpeace.com",
    siteName: "Cheers & Peace",
    images: [
      {
        url: "/images/hero_event.jpg",
        width: 1200,
        height: 630,
        alt: "Cheers & Peace Event Management",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cheers & Peace | Event Management & Fabrication",
    description: "14+ years in corporate event management, exhibition stall fabrication, and AV production.",
    images: ["/images/hero_event.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-[#000000] text-[#FFFFFF] antialiased min-h-screen flex flex-col selection:bg-[#C1836A] selection:text-[#000000] cursor-none overflow-x-hidden`}>
        <CustomCursor />
        <SmoothScroll>
          <Header />
          <main className="flex-grow pt-24">
            {children}
          </main>
          <MusicPlayer />
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
