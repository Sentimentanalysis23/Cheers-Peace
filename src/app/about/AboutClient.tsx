"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function AboutClient() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <main className="min-h-screen bg-[#000000] text-white pt-32 pb-24 px-6 md:px-12 selection:bg-[#C1836A] selection:text-[#000000] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24"
        >
          <span className="text-[#C1836A] text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
            Our Legacy
          </span>
          <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight">
            About Us
          </h1>
          <p className="text-[#FFFFFF]/70 max-w-2xl mx-auto text-lg leading-relaxed">
            For over 14 years, Cheers & Peace has been the silent engine behind some of the most spectacular corporate events, exhibitions, and brand activations across the globe.
          </p>
        </motion.div>

        {/* Story Section with Parallax */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-32">
          <motion.div style={{ y: y1 }} className="relative h-[600px] w-full rounded-2xl overflow-hidden border border-[#C1836A]/20">
            <Image 
              src="/images/event_16.jpg" 
              alt="Cheers & Peace Event" 
              fill 
              className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          </motion.div>

          <motion.div style={{ y: y2 }} className="flex flex-col justify-center">
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl mb-8 text-[#D4AF37]">
              Mastering the Art of Experience
            </h2>
            <p className="text-[#FFFFFF]/70 text-lg leading-relaxed mb-6 font-light">
              What started as a passionate team of event organizers has grown into a full-scale fabrication and corporate event powerhouse. We pride ourselves on structural integrity, stunning visual design, and flawless logistical execution.
            </p>
            <p className="text-[#FFFFFF]/70 text-lg leading-relaxed mb-10 font-light">
              We have been trusted by leading organizations across the aviation, defence, technology, and manufacturing sectors to represent their brands on the world stage.
            </p>
            
            <div className="flex gap-4">
              <div className="w-16 h-1 bg-[#C1836A] rounded-full" />
              <div className="w-4 h-1 bg-[#C1836A]/40 rounded-full" />
            </div>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#C1836A]/5 via-transparent to-[#C1836A]/5 rounded-[3rem] -m-10" />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10 py-10">
            {[
              { number: "500+", label: "Events Executed" },
              { number: "100+", label: "Global Brands" },
              { number: "14+", label: "Years Experience" },
              { number: "24/7", label: "Global Support" }
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1, type: "spring" }}
                className="text-center group"
              >
                <div className="text-5xl md:text-6xl font-[family-name:var(--font-playfair)] text-white mb-4 group-hover:text-[#D4AF37] transition-colors duration-500">
                  {stat.number}
                </div>
                <div className="text-xs uppercase tracking-[0.2em] text-[#FFFFFF]/50 font-bold group-hover:text-[#C1836A] transition-colors duration-500">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
