import { Metadata } from "next";
import BlogsClient from "./BlogsClient";
import { getSortedContentData } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Journal | Cheers & Peace Event Management",
  description: "Thoughts, news, and behind-the-scenes stories from the frontlines of global event management and fabrication.",
  openGraph: {
    title: "Journal | Cheers & Peace Event Management",
    description: "Thoughts, news, and behind-the-scenes stories from the frontlines of global event management and fabrication.",
    url: "https://cheersandpeace.com/blogs",
    siteName: "Cheers & Peace",
    images: [
      {
        url: "/images/event_18.jpg",
        width: 1200,
        height: 630,
        alt: "Cheers & Peace Journal",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Journal | Cheers & Peace Event Management",
    description: "Thoughts, news, and behind-the-scenes stories from the frontlines of global event management.",
    images: ["/images/event_18.jpg"],
  },
};

export default function BlogsPage() {
  const blogs = getSortedContentData("blogs");
  return <BlogsClient blogs={blogs} />;
}
