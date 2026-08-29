"use client";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Play } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import TextReveal from "@/components/TextReveal";
import HorizontalScroll from "@/components/HorizontalScroll";

const SLIDES = [
  {
    image: "/images/event_15.jpg",
    category: "Aero India Show",
    title: "Where Aviation Meets Excellence",
    description: "Iconic pavilion setups and grand red-carpet launches at India's premier aerospace showcase."
  },
  {
    image: "/images/event_20.jpg",
    category: "Large-Scale Events",
    title: "Stages That Command Respect",
    description: "Full production events — lighting rigs, sound systems, and stage setups that leave an impression."
  },
  {
    image: "/images/event_10.jpg",
    category: "Exhibition Stall Fabrication",
    title: "Built to Dominate the Floor",
    description: "Custom-fabricated exhibition stalls designed to showcase your brand at national and global expos."
  }
];

export default function EnhancedLuxuryHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [particles, setParticles] = useState<{ id: number; opacity: number; y: string; x: string; duration: number; yEnd: string }[]>([]);

  useEffect(() => {
    setMounted(true);
    
    // Generate particles on client-side only to prevent DOM hydration mismatch
    setParticles(
      Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        opacity: Math.random() * 0.5 + 0.1,
        y: Math.random() * 100 + "%",
        x: Math.random() * 100 + "%",
        duration: Math.random() * 20 + 10,
        yEnd: `-${Math.random() * 100}%`
      }))
    );

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#000000] text-[#FFFFFF] selection:bg-[#C1836A] selection:text-[#000000]">
      
      {/* 0. Ambient Gold Dust Particles (Client Only to prevent Hydration Error) */}
      {mounted && (
        <div className="fixed inset-0 pointer-events-none z-0 hidden md:block">
          {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ 
              opacity: p.opacity, 
              y: p.y,
              x: p.x 
            }}
            animate={{ 
              y: [null, p.yEnd],
              opacity: [null, 0, 0.5]
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute w-1 h-1 bg-[#C1836A] rounded-full blur-sm"
          />
        ))}
        </div>
      )}

      {/* 1. Cinematic Luxury Hero Slider */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
          <AnimatePresence>
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 z-0"
            >
              <Image 
                src={SLIDES[currentSlide].image} 
                alt={SLIDES[currentSlide].title} 
                fill 
                className="object-cover"
                priority
                loading="eager"
                fetchPriority="high"
                sizes="100vw"
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>
        
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#000000]/90 via-[#000000]/40 to-[#000000]" />
        <div className="absolute inset-0 z-15 bg-[#000000]/30 mix-blend-multiply" />
        
        {/* Organic dark glow behind text for legibility without a box */}
        <div className="absolute inset-0 z-15 flex items-center justify-center hidden md:flex">
          <div className="w-[800px] h-[400px] bg-[#000000]/70 blur-[100px] rounded-full pointer-events-none" />
        </div>
        
        <div className="relative z-20 w-full px-6 md:px-12 flex flex-col items-center justify-center h-full -mt-20">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="inline-flex items-center gap-3 px-6 py-2 border-b border-[#C1836A]/40 text-[#C1836A] text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase mb-8 drop-shadow-md"
          >
            Creating Experiences • Building Brands
          </motion.div>
          
          <div className="h-[180px] md:h-[200px] flex items-center justify-center w-full">
            <AnimatePresence mode="wait">
              <motion.h1 
                key={currentSlide}
                initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -40, filter: "blur(10px)" }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-white font-medium tracking-tight leading-tight drop-shadow-[0_4px_4px_rgba(0,0,0,1)] text-center max-w-6xl"
              >
                {SLIDES[currentSlide].title}
              </motion.h1>
            </AnimatePresence>
          </div>
          
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-24 h-[1px] bg-[#C1836A] my-6 drop-shadow-md"
          />
          
          <AnimatePresence mode="wait">
            <motion.p 
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-[family-name:var(--font-playfair)] italic text-xl md:text-3xl text-[#FFFFFF] mb-12 max-w-4xl tracking-wide drop-shadow-[0_4px_4px_rgba(0,0,0,1)] text-center"
            >
              {SLIDES[currentSlide].description}
            </motion.p>
          </AnimatePresence>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto mt-4"
          >
            <Link href="/contact" className="px-10 py-4 bg-gradient-to-r from-[#C1836A] to-[#FFFFFF] text-[#000000] font-bold tracking-widest uppercase hover:opacity-90 shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-500 rounded-sm text-center">
              Plan Your Event
            </Link>
            <button 
              onClick={() => {
                const element = document.getElementById('capabilities');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-10 py-4 bg-[#000000]/50 border border-[#FFFFFF]/30 text-[#FFFFFF] font-medium tracking-widest uppercase hover:border-[#C1836A] hover:bg-[#C1836A]/10 transition-all duration-500 flex items-center justify-center gap-3 group rounded-sm backdrop-blur-sm"
            >
              <Play className="w-4 h-4 group-hover:text-[#C1836A] transition-colors" /> View Capabilities
            </button>
          </motion.div>
          
        </div>
          
          <div className="absolute bottom-12 flex gap-4 z-30">
            {SLIDES.map((_, idx) => (
              <button 
                key={idx} 
                onClick={() => setCurrentSlide(idx)}
                className={`w-16 h-[2px] transition-all duration-500 relative overflow-hidden bg-white/20`}
                aria-label={`Go to slide ${idx + 1}`}
              >
                {currentSlide === idx && (
                  <motion.div 
                    layoutId="activeSlideIndicator"
                    className="absolute inset-0 bg-[#C1836A] shadow-[0_0_10px_#C1836A]"
                  />
                )}
              </button>
            ))}
          </div>
      </section>

      {/* 1.5 Stats Banner */}
      <section className="border-y border-[#C1836A]/20 bg-[#FAFAFA] relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 md:divide-x divide-[#C1836A]/20 gap-y-10 md:gap-y-0">
          {[
            { n: '14+', t: 'Years Experience' },
            { n: '500+', t: 'Events & Projects' },
            { n: '100+', t: 'Brands Served' },
            { n: 'Global', t: 'Worldwide Delivery' }
          ].map((stat, i) => (
            <div key={i} className="py-10 text-center group">
              <h3 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-black font-bold mb-2 group-hover:text-[#C1836A] transition-colors duration-500">{stat.n}</h3>
              <p className="text-black/60 text-sm tracking-[0.2em] uppercase font-semibold">{stat.t}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Sophisticated About Section */}
      <section className="py-32 px-6 md:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-20 items-center">
            
            <div className="relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}
                className="relative h-[350px] md:h-[600px] w-full rounded-[2rem] overflow-hidden shadow-2xl border border-[#C1836A]/30"
              >
                <Image src="/images/event_16.jpg" alt="Outdoor stage with LED wall and truss lighting" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover hover:scale-105 transition-transform duration-[3s]" />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#000000]/80 via-transparent to-transparent"></div>
              </motion.div>
              <div className="absolute -bottom-10 -right-10 bg-[#C1836A] text-[#000000] p-10 rounded-tr-[3rem] rounded-bl-[3rem] shadow-xl hidden md:block">
                <p className="font-[family-name:var(--font-playfair)] text-3xl font-bold italic mb-2">"One partner.</p>
                <p className="font-semibold tracking-widest uppercase">Complete event solutions."</p>
              </div>
            </div>

            <div>
              <TextReveal 
                text="More than an event company. Your execution partner." 
                className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl text-white mb-8 leading-tight" 
              />
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                <div className="space-y-6 text-[#FFFFFF]/80 font-light text-lg leading-relaxed mb-12">
                  <p>
                    <strong className="text-white font-medium">Cheers & Peace</strong> is a professionally experienced event management, exhibition stall fabrication and business solutions company with more than <strong className="text-[#C1836A] font-medium">14 years of industry experience.</strong>
                  </p>
                  <p>
                    We specialise in corporate events, exhibition stall design & fabrication, wooden stall fabrication, expo booths, brand activations, audio visual production, LED walls, event infrastructure, artist management, manpower, permissions, procurement, and complete event execution.
                  </p>
                  <p>
                    Our experience includes working on the <strong className="text-white font-medium">Aero India Show in Bengaluru</strong>, reflecting our capability in handling large-scale, high-visibility environments across corporate, defence, aviation, manufacturing, technology, education and infrastructure sectors.
                  </p>
                </div>
              </motion.div>
              
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
                <h4 className="text-[#C1836A] tracking-[0.2em] text-sm font-bold uppercase mb-6">Full Capability Manifest</h4>
                <div className="flex flex-wrap gap-3">
                  {['Corporate Event Mgmt', 'Exhibition Stall Design', 'Exhibition Stall Fabrication', 'Wooden Stall Fabrication', 'Audio Visual Production', 'LED & Video Wall Solutions', 'Brand Activations', 'Artist Management', 'Wedding & Event Décor', 'Event Permissions'].map(chip => (
                    <span key={chip} className="px-5 py-2 border border-[#C1836A]/30 rounded-full text-sm text-[#FFFFFF] hover:bg-[#C1836A] hover:text-[#000000] transition-all duration-300 cursor-default">
                      {chip}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
            
          </div>
        </div>
      </section>

      <div id="capabilities">
        <HorizontalScroll>
          <div className="w-[85vw] md:w-[400px] shrink-0 text-white pl-6 md:pl-12">
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-7xl mb-6 text-[#C1836A]">Our Capabilities</h2>
            <p className="text-xl text-[#FFFFFF]/70 font-light leading-relaxed">
              Scroll to explore the breathtaking environments we engineer from the ground up.
            </p>
          </div>
          
          {/* Scroll Item 1 */}
          <div className="portfolio-item relative w-[80vw] max-w-[900px] h-[70vh] shrink-0 rounded-3xl overflow-hidden group cursor-pointer border border-[#C1836A]/20">
            <Image src="/images/event_12.jpg" alt="Corporate conference stage" fill sizes="(max-width: 768px) 100vw, 900px" className="object-cover group-hover:scale-105 transition-transform duration-[2s]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/40 to-transparent opacity-80" />
            <div className="absolute bottom-12 left-12 right-12 z-10">
              <span className="text-[#C1836A] font-bold tracking-[0.3em] uppercase text-sm mb-4 block">01 / Corporate Events</span>
              <h3 className="font-[family-name:var(--font-playfair)] text-3xl md:text-5xl text-white">Global Summits & Forums</h3>
            </div>
          </div>
          
          {/* Scroll Item 2 */}
          <div className="portfolio-item relative w-[80vw] max-w-[900px] h-[70vh] shrink-0 rounded-3xl overflow-hidden group cursor-pointer border border-[#C1836A]/20">
            <Image src="/images/event_07.jpg" alt="Venus Steel exhibition stall interior" fill sizes="(max-width: 768px) 100vw, 900px" className="object-cover group-hover:scale-105 transition-transform duration-[2s]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/40 to-transparent opacity-80" />
            <div className="absolute bottom-12 left-12 right-12 z-10">
              <span className="text-[#C1836A] font-bold tracking-[0.3em] uppercase text-sm mb-4 block">02 / Fabrication</span>
              <h3 className="font-[family-name:var(--font-playfair)] text-3xl md:text-5xl text-white">Premium Exhibition Stalls</h3>
            </div>
          </div>

          {/* Scroll Item 3 */}
          <div className="portfolio-item relative w-[80vw] max-w-[900px] h-[70vh] shrink-0 rounded-3xl overflow-hidden group cursor-pointer border border-[#C1836A]/20">
            <Image 
              src="/images/cherished_celebration_v2.jpg" 
              alt="Lively and elegant live event celebration" 
              fill 
              className="object-cover opacity-90 transition-transform duration-[2s] group-hover:scale-105"
            /><div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/40 to-transparent opacity-80" />
            <div className="absolute bottom-12 left-12 right-12 z-10">
              <span className="text-[#C1836A] font-bold tracking-[0.3em] uppercase text-sm mb-4 block">03 / Luxury</span>
              <h3 className="font-[family-name:var(--font-playfair)] text-3xl md:text-5xl text-white">Cherished Celebrations</h3>
            </div>
          </div>
          
          <div className="w-[200px] shrink-0"></div> {/* Buffer */}
        </HorizontalScroll>
      </div>

      {/* 3. Elegant Services Showcase with Process */}
      <section className="py-32 px-6 md:px-12 bg-[#FAFAFA] relative z-10 border-t border-[#C1836A]/20">
        <div className="max-w-7xl mx-auto space-y-40">
          
          {/* Service 1: Wooden Stall Fabrication */}
          <div className="flex flex-col lg:flex-row items-center gap-16 group">
            <div className="lg:w-1/2 relative h-[350px] lg:h-[600px] w-full rounded-[2rem] overflow-hidden">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }}
                className="absolute inset-0 border-2 border-[#C1836A]/30 rounded-[2rem] translate-x-6 translate-y-6 z-0 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-700"
              ></motion.div>
              <motion.div 
                initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}
                className="relative h-full w-full z-10 overflow-hidden rounded-[2rem] shadow-2xl"
              >
                <Image src="/images/event_13.jpg" alt="HADC exhibition stall fabrication" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-110 transition-transform duration-[2s]" />
              </motion.div>
            </div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }}
              className="lg:w-1/2"
            >
              <span className="text-[#C1836A] tracking-[0.2em] text-sm font-bold uppercase mb-4 block">Exhibition & Expo Solutions</span>
              <h3 className="font-[family-name:var(--font-playfair)] text-4xl md:text-6xl text-black mb-6 leading-tight">Custom Wooden Exhibition Stalls</h3>
              <p className="text-[#333333] text-lg font-light leading-relaxed mb-10">
                Wooden stall fabrication is one of our core capabilities. We build customised wooden exhibition stalls around your brand identity, exhibition space and visitor experience requirements. From custom carpentry and backlit branding to LED integration and VIP rooms.
              </p>
              
              <div className="grid grid-cols-2 gap-y-6 mb-10">
                {[
                  'Custom Carpentry', 'Backlit Logos', 
                  'Painted Finishes', 'LED Integration', 
                  'Reception Counters', 'Custom Furniture'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-[#333333]">
                    <div className="w-1.5 h-1.5 bg-[#C1836A] rounded-full"></div>
                    <span className="font-light font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <Link href="/services" className="inline-flex items-center gap-4 text-black hover:text-[#C1836A] transition-all duration-300 border-b border-[#C1836A]/30 hover:border-[#C1836A] pb-2 font-bold tracking-wider group-hover:tracking-[0.25em]">
                Discover More <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* Fabrication Process */}
          <div className="pt-20 border-t border-[#C1836A]/10">
            <div className="text-center mb-20">
              <h3 className="font-[family-name:var(--font-playfair)] text-4xl text-black mb-4">The Fabrication Process</h3>
              <p className="text-[#333333]/80">How we bring your brand to the exhibition floor.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16">
              {[
                { n: '01', t: 'Concept', d: 'Brief, space & brand study' },
                { n: '02', t: '3D Design', d: 'Custom stall visualisation' },
                { n: '03', t: 'Fabrication', d: 'Wooden & modular build' },
                { n: '04', t: 'Branding', d: 'Graphic installation' },
                { n: '05', t: 'AV & LED', d: 'Screens, sound, lighting' },
                { n: '06', t: 'Installation', d: 'On-site build & testing' },
                { n: '07', t: 'Support', d: 'Live on-ground execution' },
                { n: '08', t: 'Dismantle', d: 'Post-event wrap-up' }
              ].map((step, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                  key={i} className="relative pt-6 border-t border-[#C1836A]/30 hover:border-[#C1836A] transition-colors group"
                >
                  <span className="absolute -top-3 left-0 bg-[#FAFAFA] pr-3 font-[family-name:var(--font-playfair)] text-xl text-[#C1836A] italic font-bold">
                    {step.n}
                  </span>
                  <h4 className="text-black text-lg font-medium mb-2">{step.t}</h4>
                  <p className="text-[#333333] text-sm font-light">{step.d}</p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 4. Distinguished Clients Marquee (Smooth) */}
      <section className="py-24 bg-[#000000] border-t border-[#C1836A]/20 relative z-10 overflow-hidden">
        <div className="text-center mb-16 relative z-20">
          <p className="text-[#C1836A] tracking-[0.2em] text-sm font-bold uppercase mb-4 block">Trusted By</p>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-white font-medium">Distinguished <span className="text-[#C1836A]">Leading Organisations</span></h2>
        </div>
        
        <div className="relative flex overflow-x-hidden group">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-16 md:gap-24 px-8">
            {[
              { type: 'image', src: '/images/clients/hal_v2.png', alt: 'HAL' },
              { type: 'image', src: '/images/clients/hp_v2.png', alt: 'HP' },
              { type: 'image', src: '/images/clients/pavilions_v2.png', alt: 'Pavilions and Interiors' },
              { type: 'image', src: '/images/clients/simplilearn_v2.png', alt: 'Simplilearn' },
              { type: 'image', src: '/images/clients/mig35_v2.png', alt: 'MiG-35' },
              { type: 'text', value: 'Microsoft' },
              { type: 'text', value: 'Arkance' },
              { type: 'text', value: 'AMETEK' },
              { type: 'text', value: 'Roomer' },
              { type: 'text', value: 'VEKA' },
              { type: 'text', value: 'EPOS' },
              { type: 'text', value: 'Pawan Hans' },
              { type: 'text', value: 'Mazagon Dock' },
              { type: 'image', src: '/images/clients/hal_v2.png', alt: 'HAL' },
              { type: 'image', src: '/images/clients/hp_v2.png', alt: 'HP' },
              { type: 'image', src: '/images/clients/pavilions_v2.png', alt: 'Pavilions and Interiors' },
              { type: 'image', src: '/images/clients/simplilearn_v2.png', alt: 'Simplilearn' },
              { type: 'image', src: '/images/clients/mig35_v2.png', alt: 'MiG-35' },
              { type: 'text', value: 'Microsoft' },
              { type: 'text', value: 'Arkance' },
              { type: 'text', value: 'AMETEK' },
              { type: 'text', value: 'Roomer' },
              { type: 'text', value: 'VEKA' },
            ].map((client, i) => (
              <div key={i} className="flex-shrink-0 flex items-center justify-center hover:scale-110 transition-all duration-500">
                {client.type === 'image' ? (
                  <div className="relative h-16 w-32 md:h-20 md:w-40 bg-white/95 rounded-xl p-2 shadow-[0_0_15px_rgba(193,131,106,0.3)] border border-[#C1836A]/20">
                    <Image src={client.src!} alt={client.alt!} fill className="object-contain p-2" />
                  </div>
                ) : (
                  <span className="font-[family-name:var(--font-playfair)] text-2xl md:text-4xl font-bold text-white/20 hover:text-[#C1836A] cursor-default drop-shadow-lg">
                    {client.value}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
