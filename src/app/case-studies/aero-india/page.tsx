import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Case Study: Aero India Show Fabrication | Cheers & Peace",
  description: "Read our case study on how Cheers & Peace executed official fabrication and event support for leading aerospace and defence organizations at the Aero India Show.",
  keywords: "Aero India Show stall fabrication, defence expo booth builders, aerospace event management, case study cheers and peace",
};

export default function AeroIndiaCaseStudy() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-zinc-950 overflow-hidden border-b border-white/10">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-block mb-4 px-3 py-1 bg-[#C1836A]/10 text-[#C1836A] font-bold uppercase tracking-wider text-sm rounded-full border border-[#C1836A]/20">
            Case Study
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-white max-w-4xl">
            Aero India Show: <span className="text-[#C1836A]">Executing at the Highest Altitude</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mb-10">
            Delivering high-security, premium wooden exhibition stall fabrication and flawless event infrastructure for top defence and aviation organizations.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            
            <div className="lg:col-span-2 prose prose-invert prose-lg text-zinc-300">
              <h2 className="text-3xl font-bold text-white mb-6">The Challenge</h2>
              <p>
                The Aero India Show in Bengaluru is one of the premier aerospace and defence exhibitions in the world. Exhibiting at this scale requires more than just standard stall design. It demands strict adherence to security protocols, massive scale structural integrity, premium finishes for VIP delegates, and seamless project management under tight deadlines.
              </p>
              <h2 className="text-3xl font-bold text-white mt-12 mb-6">Our Solution</h2>
              <p>
                Cheers & Peace was entrusted with the official fabrication and event-related execution for several major organizations. Our approach focused on:
              </p>
              <ul>
                <li><strong>Custom Wooden Fabrication:</strong> Building highly durable, premium wooden pavilions that stood out on the global stage.</li>
                <li><strong>Advanced AV Integration:</strong> Seamlessly embedding large-format LED screens into the architectural design of the stalls to showcase complex aerospace technology.</li>
                <li><strong>VIP Infrastructure:</strong> Designing private, sound-dampened meeting rooms and high-end hospitality areas for government and corporate VIPs.</li>
              </ul>
              <div className="my-12 p-8 bg-zinc-900 border border-white/10 rounded-2xl">
                <Star className="w-10 h-10 text-[#C1836A] mb-4" />
                <p className="text-xl italic text-white font-medium">"Our association with the Aero India Show reflects our capability to handle large-scale, high-visibility environments under the most demanding corporate conditions."</p>
              </div>
              <h2 className="text-3xl font-bold text-white mt-12 mb-6">The Result</h2>
              <p>
                Flawless execution. Our teams successfully managed the concept, 3D design, fabrication, and final dismantling across multiple massive installations, solidifying Cheers & Peace as a trusted partner for the defence and aviation sectors.
              </p>
            </div>

            <div className="lg:col-span-1 space-y-8">
               <div className="bg-zinc-950 p-8 rounded-3xl border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-6">Project Overview</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-zinc-500 uppercase tracking-wider mb-1">Event</div>
                      <div className="text-white font-medium">Aero India Show, Bengaluru</div>
                    </div>
                    <div>
                      <div className="text-sm text-zinc-500 uppercase tracking-wider mb-1">Industry</div>
                      <div className="text-white font-medium">Aviation & Defence</div>
                    </div>
                    <div>
                      <div className="text-sm text-zinc-500 uppercase tracking-wider mb-1">Services Provided</div>
                      <div className="text-white font-medium">Custom Wooden Fabrication, LED Walls, Event Infrastructure, Manpower</div>
                    </div>
                  </div>
               </div>
               
               <div className="bg-gradient-to-br from-amber-600 to-amber-900 p-8 rounded-3xl border border-[#C1836A]/30 text-white">
                 <h3 className="text-2xl font-bold mb-4">Need a Similar Execution?</h3>
                 <p className="text-white/80 mb-6">We bring the same level of precision and quality to every corporate event and exhibition.</p>
                 <Link href="#contact" className="inline-flex items-center gap-2 font-bold hover:text-amber-200 transition-colors">
                    Contact Us <ArrowRight className="w-4 h-4" />
                 </Link>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
