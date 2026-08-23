"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isTouch, setIsTouch] = useState(true); // default true to avoid flash on mobile

  useEffect(() => {
    // Detect if the device is a touch device (mobile/tablet)
    const checkTouch = () => {
      setIsTouch(window.matchMedia("(pointer: coarse)").matches);
    };
    checkTouch();
    window.addEventListener("resize", checkTouch);
    return () => window.removeEventListener("resize", checkTouch);
  }, []);

  useEffect(() => {
    if (isTouch) return; // Don't add mouse listeners on touch devices

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const isPortfolio = target.closest('.portfolio-item');
      if (isPortfolio) {
        setIsHovered(true);
        setCursorText("VIEW");
        return;
      }

      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovered(true);
        setCursorText("");
      } else {
        setIsHovered(false);
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isTouch]);

  // Don't render anything on touch/mobile devices
  if (isTouch) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[100] flex items-center justify-center rounded-full border border-[#C1836A]/50 bg-[#C1836A]/10 backdrop-blur-sm"
        animate={{
          x: mousePosition.x - (cursorText ? 40 : 16),
          y: mousePosition.y - (cursorText ? 40 : 16),
          width: cursorText ? 80 : 32,
          height: cursorText ? 80 : 32,
          scale: isHovered && !cursorText ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      >
        {cursorText ? (
          <motion.span 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[#000000] text-xs font-bold tracking-[0.2em]"
          >
            {cursorText}
          </motion.span>
        ) : (
          <div className={`w-2 h-2 rounded-full bg-[#C1836A] transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`} />
        )}
      </motion.div>
    </>
  );
}
