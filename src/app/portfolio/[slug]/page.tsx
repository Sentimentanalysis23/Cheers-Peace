import { getContentData, getSortedContentData } from "@/lib/cms";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const content = await getContentData("events", resolvedParams.slug);
  return {
    title: `${content.title} | Cheers & Peace Portfolio`,
    description: content.excerpt,
  };
}

export async function generateStaticParams() {
  const events = getSortedContentData("events");
  return events.map((event) => ({
    slug: event.slug,
  }));
}

export default async function PortfolioPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const event = await getContentData("events", resolvedParams.slug);

  return (
    <div className="bg-[#fafafa] text-zinc-900 min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
      <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors mb-10">
        <ArrowLeft className="w-4 h-4" /> Back to Portfolio
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">{event.title}</h1>
          <div className="relative h-[50vh] md:h-[70vh] w-full rounded-[2.5rem] overflow-hidden mb-16 shadow-2xl">
            <Image src={event.image} alt={event.title} fill className="object-cover" />
          </div>

          <div 
            className="prose prose-lg prose-zinc max-w-none prose-headings:font-bold prose-h2:text-4xl prose-a:text-[#c29b62]"
            dangerouslySetInnerHTML={{ __html: event.contentHtml || "" }}
          />
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-32 bg-[#0A0A0A] p-10 rounded-[2.5rem] border border-zinc-200 shadow-lg">
            <h3 className="text-2xl font-bold mb-8 border-b border-zinc-100 pb-4">Project Details</h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 text-zinc-400 mb-1">
                  <Tag className="w-4 h-4" />
                  <span className="text-sm uppercase tracking-wider font-bold">Category</span>
                </div>
                <p className="text-lg font-medium text-zinc-900">{event.category}</p>
              </div>
              
              <div>
                <div className="flex items-center gap-2 text-zinc-400 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm uppercase tracking-wider font-bold">Execution Date</span>
                </div>
                <p className="text-lg font-medium text-zinc-900">{event.date}</p>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-zinc-100">
              <h4 className="font-bold mb-4">Need a similar execution?</h4>
              <Link href="/contact" className="block text-center w-full bg-zinc-900 text-white font-medium py-4 rounded-xl hover:bg-zinc-800 transition-colors">
                Contact our team
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
