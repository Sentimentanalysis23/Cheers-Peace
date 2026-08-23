import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Cheers & Peace Event Management",
  description: "A global event management and exhibition fabrication agency specializing in corporate experiences, stage production, and architectural stall design.",
  openGraph: {
    title: "About Us | Cheers & Peace Event Management",
    description: "A global event management and exhibition fabrication agency specializing in corporate experiences and stage production.",
    url: "https://cheersandpeace.com/about",
    siteName: "Cheers & Peace",
    images: [
      {
        url: "/images/event_16.jpg",
        width: 1200,
        height: 630,
        alt: "About Cheers & Peace",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Cheers & Peace Event Management",
    description: "A global event management and exhibition fabrication agency.",
    images: ["/images/event_16.jpg"],
  },
  keywords: "about cheers and peace, event management company history, corporate event planners bangalore",
};

import AboutClient from "./AboutClient";

export default function AboutPage() {
  return <AboutClient />;
}
