"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

const SERVICES = [
  {
    title: "Exhibition Stall Fabrication",
    description: "We specialize in custom-built stalls for national and global expos — from the Aero India Show to DefExpo. Our team delivers 3D design, material sourcing, structural engineering, and complete on-site assembly with flawless precision.",
    image: "/images/event_06.jpg",
    tags: ["Custom Wooden Stalls", "Modular Designs", "3D Visualization"]
  },
  {
    title: "Corporate Event Management",
    description: "End-to-end execution for high-profile conferences, product launches, dealer meets, and gala dinners. We manage venue selection, permissions, logistics, and on-ground coordination for a seamless, world-class experience.",
    image: "/images/event_03.jpg",
    tags: ["Product Launches", "Conferences", "Gala Dinners"]
  },
  {
    title: "AV & LED Production",
    description: "Immersive visual experiences powered by massive LED wall integrations, professional line-array sound systems, and dynamic intelligent lighting rigs. We build the technical infrastructure that commands attention at any scale.",
    image: "/images/event_09.jpg",
    tags: ["LED Video Walls", "Line Array Audio", "Intelligent Lighting"]
  },
  {
    title: "Luxury Celebration Décor",
    description: "Breathtaking setups for your most treasured celebrations — from intimate rooftop dinners with rose petal pathways to grand sangeet stages and floral mandaps that create lasting memories.",
    image: "/images/event_17.jpg",
    tags: ["Floral Mandaps", "Sangeet Stages", "Premium Furniture"]
  }
];

function ServiceCard({ service, index }: { service: any, index: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="group relative flex flex-col md:flex-row gap-10 items-center border border-[#C1836A]/20 bg-[#000000]/60 p-8 rounded-[2rem] hover:bg-[#000000] hover:border-[#C1836A]/50 transition-all duration-500 overflow-hidden"
    >
      {/* 3D Image Container */}
      <div className="w-full md:w-1/2 h-[400px] relative rounded-[1.5rem] overflow-hidden">
        <div className="absolute inset-0 bg-[#C1836A]/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay"></div>
        <Image 
          src={service.image} 
          alt={service.title} 
          fill 
          className="object-cover scale-105 group-hover:scale-110 transition-transform duration-700 ease-out"
        />
      </div>

      {/* Content */}
      <div className="w-full md:w-1/2 flex flex-col justify-center space-y-6 z-20">
        <span className="text-[#C1836A] font-bold tracking-[0.3em] uppercase text-xs">Service {String(index + 1).padStart(2, '0')}</span>
        <h3 className="font-[family-name:var(--font-playfair)] text-4xl text-white font-medium">{service.title}</h3>
        <p className="text-[#FFFFFF]/70 font-light leading-relaxed text-lg">
          {service.description}
        </p>
        <div className="flex flex-wrap gap-3 pt-4">
          {service.tags.map((tag: string, i: number) => (
            <span key={i} className="px-4 py-1.5 border border-[#FFFFFF]/20 text-[#FFFFFF]/60 rounded-full text-xs font-medium uppercase tracking-wider group-hover:border-[#C1836A]/40 group-hover:text-[#C1836A] transition-colors duration-300">
              {tag}
            </span>
          ))}
        </div>
        <div className="pt-8">
          <Link href="/contact" className="inline-flex items-center gap-3 text-white font-bold tracking-widest uppercase text-sm group/btn">
            Inquire Now
            <span className="w-10 h-10 rounded-full border border-[#C1836A]/30 flex items-center justify-center group-hover/btn:bg-[#C1836A] group-hover/btn:text-[#000000] transition-all duration-300">
              <ArrowRight size={16} />
            </span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesClient() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#000000] selection:bg-[#C1836A] selection:text-[#000000] pb-32">
      
      {/* Cinematic Hero */}
      <section className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden border-b border-[#C1836A]/20">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <Image 
            src="/images/event_19.jpg" 
            alt="Mazagon Dock Shipbuilders exhibition stall" 
            fill 
            sizes="100vw"
            className="object-cover opacity-40 blur-[2px]"
            priority
          />
        </motion.div>
        
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#000000] via-[#000000]/60 to-transparent" />
        <div className="absolute inset-0 z-15 bg-[#000000]/40 mix-blend-multiply" />

        <div className="relative z-20 text-center px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block border-b border-[#C1836A]/40 pb-2 mb-6"
          >
            <span className="text-[#C1836A] text-xs font-bold tracking-[0.3em] uppercase">Capabilities</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-[family-name:var(--font-playfair)] text-5xl md:text-7xl text-white font-medium tracking-tight drop-shadow-2xl"
          >
            Our Core Services
          </motion.h1>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 -mt-20">
        <div className="space-y-12 md:space-y-24">
          {SERVICES.map((service, idx) => (
            <ServiceCard key={idx} service={service} index={idx} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-6 mt-40 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-white mb-8"
        >
          Ready to elevate your next event?
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Link href="/contact" className="px-10 py-5 bg-[#C1836A] text-[#000000] font-bold tracking-widest uppercase hover:bg-white transition-all duration-500 shadow-[0_0_30px_rgba(212,175,55,0.4)]">
            Let's Talk Business
          </Link>
        </motion.div>
      </section>

    </div>
  );
}
