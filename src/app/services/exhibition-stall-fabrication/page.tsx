import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Custom Exhibition Stall Fabrication & Design | Cheers & Peace",
  description: "Premium custom wooden exhibition stall fabrication, modular expo booths, and 3D stall design. End-to-end execution across India and Worldwide by experts with 14+ years experience.",
  keywords: "exhibition stall fabricators, wooden stall fabrication, custom expo booth design, exhibition stall design, trade show booth builders",
};

export default function ExhibitionStallFabrication() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-[#0A0A0A] overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0 opacity-40">
           <Image src="/images/event_19.jpg" alt="Mazagon Dock exhibition stall at Aero India" fill sizes="100vw" className="object-cover" priority />
           <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-white">
            Custom Exhibition Stall <span className="text-[#C1836A]">Fabrication</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-300 max-w-3xl mx-auto mb-10">
            Make your brand stand out on the global stage. We provide end-to-end exhibition stall design, premium wooden fabrication, and flawless on-site installation.
          </p>
          <Link href="#contact" className="inline-flex items-center gap-2 px-8 py-4 bg-[#C1836A] text-white font-bold rounded-full hover:bg-amber-400 transition-all text-lg shadow-lg shadow-[#C1836A]/20">
            Get a Custom 3D Design Quote <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-white">Premium Wooden Booths & Expo Solutions</h2>
              <div className="prose prose-invert prose-lg text-zinc-400">
                <p>
                  Participating in a trade show is a significant investment, and your exhibition stall is the physical representation of your brand. At Cheers & Peace, we specialize in <strong>custom wooden exhibition stall fabrication</strong> that captures attention and drives footfall.
                </p>
                <p>
                  Our in-house production team handles everything from the initial 3D conceptual design to the final on-ground dismantling. Whether you require a sleek modular octanorm stall for a local expo, or a massive, premium double-decker wooden pavilion for an international trade show, we have the technical capability and the logistical reach to deliver flawlessly.
                </p>
                <h3 className="text-2xl font-semibold text-white mt-8 mb-4">Our Fabrication Capabilities</h3>
                <ul className="space-y-3 list-none p-0">
                  {[
                    "Custom Carpentry & Laminated Finishes",
                    "Double-Decker Exhibition Stalls",
                    "Backlit Logos & Seamless LED Wall Integration",
                    "Custom Product Display Units & VIP Meeting Rooms",
                    "Flooring, Carpeting, and Premium Furniture",
                    "On-Site Installation & Post-Event Dismantling"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-[#C1836A] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="space-y-8">
               <div className="relative h-[300px] rounded-3xl overflow-hidden border border-white/10">
                  <Image src="/images/event_17.jpg" alt="Mazagon Dock Shipbuilders stall fabrication in progress" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
               </div>
               <div className="bg-zinc-900 p-8 rounded-3xl border border-white/5">
                  <h3 className="text-xl font-bold text-white mb-4">From 3D Design to Final Installation</h3>
                  <p className="text-zinc-400 mb-6">We provide our clients with a single point of contact for the entire project. Our process ensures zero stress on the day of the expo.</p>
                  <div className="flex flex-wrap gap-2">
                    {["Concept", "3D Design", "Fabrication", "Branding", "AV & LED", "Installation"].map((step, i) => (
                      <span key={i} className="px-3 py-1 bg-white/5 text-[#C1836A] text-sm font-semibold rounded-full border border-[#C1836A]/20">
                        {step}
                      </span>
                    ))}
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
