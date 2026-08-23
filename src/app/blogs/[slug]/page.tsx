import { getContentData, getSortedContentData } from "@/lib/cms";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const content = await getContentData("blogs", resolvedParams.slug);
  return {
    title: `${content.title} | Cheers & Peace Journal`,
    description: content.excerpt,
    openGraph: {
      title: content.title,
      description: content.excerpt,
      url: `https://cheersandpeace.com/blogs/${content.slug}`,
      siteName: "Cheers & Peace",
      images: [
        {
          url: content.image,
          width: 1200,
          height: 630,
          alt: content.title,
        },
      ],
      locale: "en_IN",
      type: "article",
      publishedTime: new Date(content.date).toISOString(),
      authors: [content.author || "Cheers & Peace"],
    },
    twitter: {
      card: "summary_large_image",
      title: content.title,
      description: content.excerpt,
      images: [content.image],
    },
  };
}

export async function generateStaticParams() {
  const blogs = getSortedContentData("blogs");
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const blog = await getContentData("blogs", resolvedParams.slug);

  return (
    <div className="bg-[#fafafa] text-zinc-900 min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-[900px] mx-auto">
      <Link href="/blogs" className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors mb-10">
        <ArrowLeft className="w-4 h-4" /> Back to Insights
      </Link>
      
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#c29b62] bg-[#c29b62]/10 px-3 py-1 rounded-full">{blog.category}</span>
          <span className="text-sm font-medium text-zinc-500">{blog.date}</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">{blog.title}</h1>
      </div>

      <div className="relative h-[40vh] md:h-[60vh] w-full rounded-[2rem] overflow-hidden mb-16 shadow-xl">
        <Image src={blog.image} alt={blog.title} fill className="object-cover" />
      </div>

      <div 
        className="prose prose-lg prose-zinc max-w-none prose-headings:font-bold prose-a:text-[#c29b62]"
        dangerouslySetInnerHTML={{ __html: blog.contentHtml || "" }}
      />
    </div>
  );
}
