"use client";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface HorizontalScrollProps {
  children: React.ReactNode;
}

export default function HorizontalScroll({ children }: HorizontalScrollProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);

  useEffect(() => {
    const updateRange = () => {
      if (scrollRef.current) {
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
  }, [children]);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 400, damping: 90, restDelta: 0.001 });
  const x = useTransform(smoothProgress, [0, 1], ["0px", `-${scrollRange}px`]);

  return (
    <section ref={targetRef} className="relative h-[250vh] md:h-[300vh] bg-[#000000]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div ref={scrollRef} style={{ x }} className="flex gap-6 md:gap-16 px-6 md:px-12 items-center w-max">
          {children}
        </motion.div>
      </div>
    </section>
  );
}
