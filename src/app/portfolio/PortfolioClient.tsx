"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const PORTFOLIO = [
  {
    title: "Aero India Show — Army Aviation Pavilion",
    category: "Exhibitions",
    image: "/images/event_01.jpg",
    client: "Indian Army"
  },
  {
    title: "Venus Stainless Steel — Aerospace Expo Stall",
    category: "Exhibitions",
    image: "/images/event_02.jpg",
    client: "Venus Wires"
  },
  {
    title: "Kaveri Coorg — Grand Conference Stage",
    category: "Corporate",
    image: "/images/event_08.jpg",
    client: "Sadhguru Foundation"
  },
  {
    title: "JBL Live — Outdoor Stage Production",
    category: "Corporate",
    image: "/images/event_04.jpg",
    client: "JBL India"
  },
  {
    title: "Luxury Rooftop Rose Petal Dinner",
    category: "Weddings",
    image: "/images/event_14.jpg",
    client: "Private Client"
  },
  {
    title: "HADC Exhibition — Government Brand Showcase",
    category: "Exhibitions",
    image: "/images/event_13.jpg",
    client: "HADC"
  }
];

const CATEGORIES = ["All", "Corporate", "Exhibitions", "Weddings"];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPortfolio = activeCategory === "All" 
    ? PORTFOLIO 
    : PORTFOLIO.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#000000] selection:bg-[#C1836A] selection:text-[#000000] pt-32 pb-32">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 text-center">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[#C1836A] text-xs font-bold tracking-[0.3em] uppercase mb-4 block"
        >
          Our Legacy
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-[family-name:var(--font-playfair)] text-5xl md:text-7xl text-white font-medium tracking-tight mb-8"
        >
          Featured Work
        </motion.h1>
        
        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mt-12"
        >
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full border text-sm font-medium tracking-widest uppercase transition-all duration-300 ${
                activeCategory === category 
                  ? 'border-[#C1836A] bg-[#C1836A] text-[#000000]' 
                  : 'border-[#FFFFFF]/20 text-[#FFFFFF]/60 hover:border-[#C1836A]/50 hover:text-[#C1836A]'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPortfolio.map((item, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              key={item.title}
              className="group relative h-[450px] w-full rounded-xl overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/40 to-transparent z-10 opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
              <Image 
                src={item.image} 
                alt={item.title} 
                fill 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
              />
              
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-[#C1836A] text-xs font-bold tracking-[0.2em] uppercase mb-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {item.category} • {item.client}
                </span>
                <h3 className="font-[family-name:var(--font-playfair)] text-2xl text-white font-medium">
                  {item.title}
                </h3>
                <div className="w-0 h-[1px] bg-[#C1836A] mt-4 group-hover:w-full transition-all duration-700 ease-out" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="mt-20 text-center">
        <Link href="/contact" className="inline-block border-b border-[#C1836A] text-[#C1836A] pb-1 tracking-[0.2em] uppercase text-sm font-bold hover:text-white hover:border-white transition-colors">
          Start Your Project
        </Link>
      </div>
    </div>
  );
}
