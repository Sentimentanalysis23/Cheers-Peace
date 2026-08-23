"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

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
        // Calculate the exact distance needed to scroll the content so its right edge touches the right edge of the viewport
        const range = scrollRef.current.scrollWidth - window.innerWidth;
        setScrollRange(range > 0 ? range : 0);
      }
    };
    
    updateRange();
    window.addEventListener("resize", updateRange);
    return () => window.removeEventListener("resize", updateRange);
  }, [children, isMobile]);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  if (isMobile) {
    return (
      <section className="relative bg-[#000000] py-20 w-full overflow-hidden">
        <div className="flex gap-6 px-6 items-center overflow-x-auto snap-x snap-mandatory w-full pb-8">
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
