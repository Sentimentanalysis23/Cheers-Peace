import { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Our Services | Cheers & Peace Event Management",
  description: "Comprehensive event management services including corporate events, exhibition stalls, AV production, and branding.",
  openGraph: {
    title: "Our Services | Cheers & Peace Event Management",
    description: "Comprehensive event management services including corporate events, exhibition stalls, AV production, and branding.",
    url: "https://cheersandpeace.com/services",
    siteName: "Cheers & Peace",
    images: [
      {
        url: "/images/event_05.jpg",
        width: 1200,
        height: 630,
        alt: "Cheers & Peace Services",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Services | Cheers & Peace Event Management",
    description: "Comprehensive event management services including corporate events, exhibition stalls, AV production, and branding.",
    images: ["/images/event_05.jpg"],
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
