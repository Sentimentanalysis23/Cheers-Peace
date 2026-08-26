"use client";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect, useLayoutEffect } from "react";

interface HorizontalScrollProps {
  children: React.ReactNode;
}

export default function HorizontalScroll({ children }: HorizontalScrollProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const updateRange = () => {
      if (scrollRef.current && !isMobile) {
        const range = scrollRef.current.scrollWidth - window.innerWidth;
        setScrollRange(range > 0 ? range : 0);
      }
    };
    
    updateRange();
    const observer = new ResizeObserver(() => updateRange());
    if (scrollRef.current) observer.observe(scrollRef.current);
    
    window.addEventListener("resize", updateRange);
    return () => {
      window.removeEventListener("resize", updateRange);
      observer.disconnect();
    };
  }, [children, isMobile]);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Adding a slight spring makes the framer-motion scroll feel much better with Lenis
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 400, damping: 90, restDelta: 0.001 });
  const x = useTransform(smoothProgress, [0, 1], ["0px", `-${scrollRange}px`]);

  if (isMobile) {
    return (
      <section className="relative bg-[#000000] py-20 w-full overflow-hidden">
        {/* data-lenis-prevent ensures native horizontal swipe works on mobile without Lenis intercepting it */}
        <div data-lenis-prevent="true" className="flex gap-6 px-6 items-center overflow-x-auto snap-x snap-mandatory w-full pb-8 scrollbar-hide">
          {children}
        </div>
      </section>
    );
  }

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-[#000000]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div ref={scrollRef} style={{ x }} className="flex gap-16 px-12 items-center w-max">
          {children}
        </motion.div>
      </div>
    </section>
  );
}
