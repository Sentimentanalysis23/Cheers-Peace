"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import Image from "next/image";

interface GalleryClientProps {
  photos: string[];
  videos: string[];
}

// 3D Tilt Component
function TiltCard({ children, onClick, index }: { children: React.ReactNode; onClick: () => void; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 40 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 40 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.8, 
        delay: (index % 6) * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 20
      }}
      className="break-inside-avoid relative rounded-xl overflow-hidden border border-[#C1836A]/30 group shadow-2xl cursor-pointer bg-black"
    >
      <div style={{ transform: "translateZ(30px)" }} className="relative w-full h-full">
        {children}
      </div>
    </motion.div>
  );
}

export default function GalleryClient({ photos, videos }: GalleryClientProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowRight' && selectedIndex !== null) {
        setSelectedIndex((selectedIndex + 1) % photos.length);
      }
      if (e.key === 'ArrowLeft' && selectedIndex !== null) {
        setSelectedIndex((selectedIndex - 1 + photos.length) % photos.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [selectedIndex, photos.length]);

  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]); // Scrolls down/slower
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // Split photos into 3 columns for interlocking parallax effect
  const col1 = photos.filter((_, i) => i % 3 === 0);
  const col2 = photos.filter((_, i) => i % 3 === 1);
  const col3 = photos.filter((_, i) => i % 3 === 2);

  const renderColumn = (colPhotos: string[], colIndex: number, yTransform: any) => (
    <motion.div style={{ y: yTransform }} className="flex flex-col gap-6">
      {colPhotos.map((photo, i) => {
        // Calculate the actual index in the original array for the lightbox
        const originalIndex = colIndex + i * 3;
        return (
          <TiltCard key={originalIndex} index={originalIndex} onClick={() => setSelectedIndex(originalIndex)}>
            <motion.div layoutId={`gallery-image-${originalIndex}`} className="relative w-full h-full">
              <Image 
                src={`/images/gallery/${photo}`} 
                alt={`Gallery Image ${originalIndex + 1}`} 
                width={600}
                height={800}
                className="w-full h-auto object-cover group-hover:scale-110 group-hover:brightness-110 transition-all duration-[1.5s] ease-out" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/90 via-[#C1836A]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Hover icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110 group-hover:translate-z-10">
                <div className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center border border-[#D4AF37]/80 shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                  </svg>
                </div>
              </div>
            </motion.div>
          </TiltCard>
        );
      })}
    </motion.div>
  );

  return (
    <main className="min-h-screen bg-[#000000] text-white pt-32 pb-24 px-6 md:px-12 selection:bg-[#C1836A] selection:text-[#000000] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="text-[#C1836A] text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
            Visual Storytelling
          </span>
          <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight">
            Our Gallery
          </h1>
          <p className="text-[#FFFFFF]/70 max-w-2xl mx-auto text-lg leading-relaxed">
            An immersive collection of our most cherished celebrations, stage productions, and bespoke exhibition stalls. Hover and click to explore.
          </p>
        </motion.div>
        
        {videos.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-24"
          >
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl mb-8 border-b border-[#C1836A]/20 pb-4 text-[#D4AF37]">
              Featured Highlights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {videos.map((vid, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: idx * 0.2, type: "spring" }}
                  className="relative rounded-2xl overflow-hidden border border-[#C1836A]/30 aspect-video bg-[#0A0A0A] group shadow-[0_0_40px_rgba(193,131,106,0.1)] hover:shadow-[0_0_80px_rgba(193,131,106,0.3)] transition-all duration-700 hover:-translate-y-2"
                >
                  <video 
                    src={`/videos/${vid}#t=0.1`} 
                    controls 
                    preload="metadata"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {photos.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl mb-12 border-b border-[#C1836A]/20 pb-4 text-[#D4AF37]">
              Moments Captured
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start [perspective:1000px] pt-10 pb-20">
              {renderColumn(col1, 0, y1)}
              {renderColumn(col2, 1, y2)}
              {renderColumn(col3, 2, y3)}
            </div>
          </motion.div>
        )}
      </div>

      {/* Lightbox / Slideshow Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-12"
          >
            <motion.button 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.3 }}
              onClick={() => setSelectedIndex(null)}
              className="absolute top-8 right-8 z-50 text-white/50 hover:text-white transition-colors p-2 hover:rotate-90 duration-300"
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </motion.button>

            {/* Previous Button */}
            <motion.button 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4 }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex((selectedIndex - 1 + photos.length) % photos.length);
              }}
              className="absolute left-4 md:left-12 z-50 p-5 rounded-full bg-black/40 text-white/70 hover:text-white hover:bg-[#C1836A]/20 border border-white/10 hover:border-[#D4AF37] transition-all backdrop-blur-md hidden md:flex hover:scale-110"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </motion.button>

            {/* Active Image Container */}
            <motion.div 
              layoutId={`gallery-image-${selectedIndex}`}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-6xl max-h-[90vh] rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(212,175,55,0.15)] flex items-center justify-center bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              <Image 
                src={`/images/gallery/${photos[selectedIndex]}`}
                alt={`Gallery Image Expanded`}
                width={1920}
                height={1080}
                className="w-auto h-auto max-w-full max-h-[90vh] object-contain rounded-2xl pointer-events-none"
                priority
              />
            </motion.div>

            {/* Next Button */}
            <motion.button 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4 }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex((selectedIndex + 1) % photos.length);
              }}
              className="absolute right-4 md:right-12 z-50 p-5 rounded-full bg-black/40 text-white/70 hover:text-white hover:bg-[#C1836A]/20 border border-white/10 hover:border-[#D4AF37] transition-all backdrop-blur-md hidden md:flex hover:scale-110"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </motion.button>
            
            {/* Mobile / Indicator */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-10 left-0 right-0 flex justify-center pointer-events-none"
            >
              <span className="text-white text-sm tracking-[0.3em] uppercase bg-black/70 px-6 py-3 rounded-full backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(193,131,106,0.3)]">
                {selectedIndex + 1} / {photos.length}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
