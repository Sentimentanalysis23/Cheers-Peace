import { Metadata } from "next";
import PortfolioClient from "./PortfolioClient";

export const metadata: Metadata = {
  title: "Our Portfolio | Cheers & Peace Event Management",
  description: "Explore our prestigious portfolio of corporate events, global exhibitions, and luxury brand activations.",
  openGraph: {
    title: "Our Portfolio | Cheers & Peace Event Management",
    description: "Explore our prestigious portfolio of corporate events, global exhibitions, and luxury brand activations.",
    url: "https://cheersandpeace.com/portfolio",
    siteName: "Cheers & Peace",
    images: [
      {
        url: "/images/portfolio_01.jpg",
        width: 1200,
        height: 630,
        alt: "Cheers & Peace Portfolio",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Portfolio | Cheers & Peace Event Management",
    description: "Explore our prestigious portfolio of corporate events and global exhibitions.",
    images: ["/images/portfolio_01.jpg"],
  },
};

export default function PortfolioPage() {
  return <PortfolioClient />;
}
