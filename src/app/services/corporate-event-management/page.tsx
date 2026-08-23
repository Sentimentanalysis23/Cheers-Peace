import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Corporate Event Management Company | Cheers & Peace",
  description: "Expert corporate event management for product launches, conferences, award ceremonies, and gala dinners. Reliable end-to-end event execution by Cheers & Peace.",
  keywords: "corporate event management, corporate event planners, product launch event management, award ceremony organizers, conference management",
};

export default function CorporateEventManagement() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-[#0A0A0A] overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0 opacity-40">
           <Image src="/images/event_18.jpg" alt="Haryana Airports professional exhibition stall" fill sizes="100vw" className="object-cover" priority />
           <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-white">
            Professional Corporate <span className="text-[#C1836A]">Event Management</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-300 max-w-3xl mx-auto mb-10">
            From intimate leadership summits to massive annual gala dinners. We deliver flawless, high-impact corporate events that align with your business objectives.
          </p>
          <Link href="#contact" className="inline-flex items-center gap-2 px-8 py-4 bg-[#C1836A] text-white font-bold rounded-full hover:bg-amber-400 transition-all text-lg shadow-lg shadow-[#C1836A]/20">
            Plan Your Next Event <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="order-2 lg:order-1 space-y-8">
               <div className="relative h-[400px] rounded-3xl overflow-hidden border border-white/10">
                  <Image src="/images/event_13.jpg" alt="HADC government exhibition stall at aerospace expo" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
               </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold mb-6 text-white">Flawless Execution for Your Brand</h2>
              <div className="prose prose-invert prose-lg text-zinc-400">
                <p>
                  A corporate event is a reflection of your company's prestige. With over 14 years of experience executing high-stakes events for sectors like defence, aviation, and technology, Cheers & Peace guarantees precision and professionalism.
                </p>
                <p>
                  We are not just event planners; we are your complete execution partner. We manage the entire ecosystem of an event, including venue sourcing, stage fabrication, brand activation, high-end Audio Visual (AV) setups, artist management, and on-ground logistics.
                </p>
                <h3 className="text-2xl font-semibold text-white mt-8 mb-4">Events We Master</h3>
                <ul className="space-y-3 list-none p-0 grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                  {[
                    "Corporate Conferences",
                    "Annual Days & Gala Dinners",
                    "Award Ceremonies",
                    "Dealer & Distributor Meets",
                    "Product & Service Launches",
                    "Town Halls & Summits"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-[#C1836A] flex-shrink-0 mt-0.5" />
                      <span className="text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
