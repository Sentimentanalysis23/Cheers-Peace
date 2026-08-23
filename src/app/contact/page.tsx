import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us | Cheers & Peace Event Management",
  description: "Get in touch with Cheers & Peace to discuss your upcoming corporate event, exhibition stall, or luxury celebration.",
  openGraph: {
    title: "Contact Us | Cheers & Peace Event Management",
    description: "Get in touch with Cheers & Peace to discuss your upcoming corporate event, exhibition stall, or luxury celebration.",
    url: "https://cheersandpeace.com/contact",
    siteName: "Cheers & Peace",
    images: [
      {
        url: "/images/event_20.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Cheers & Peace",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Cheers & Peace Event Management",
    description: "Get in touch with Cheers & Peace to discuss your upcoming event.",
    images: ["/images/event_20.jpg"],
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
