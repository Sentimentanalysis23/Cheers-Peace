"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (pathname?.startsWith("/admin")) return null;

  const navLinks = ["ABOUT", "SERVICES", "PORTFOLIO", "GALLERY", "BLOGS", "CONTACT"];

  return (
    <>
      <header style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "all 0.5s ease",
        background: scrolled ? "rgba(0,0,0,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(212,175,55,0.2)" : "1px solid transparent",
        boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.5)" : "none",
        padding: scrolled ? "12px 0" : "16px 0",
      }}>
        <div style={{
          width: "100%",
          padding: isMobile ? "0 16px" : "0 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxSizing: "border-box",
        }}>
          {/* Logo — LEFT */}
          <Link href="/" style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            flexShrink: 0,
            opacity: 1,
            transition: "opacity 0.3s",
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <Image
                src="/images/logo.png"
                alt="Cheers & Peace Logo"
                width={150}
                height={80}
                style={{
                  width: isMobile ? "100px" : "150px",
                  height: "auto",
                  objectFit: "contain"
                }}
                priority
              />
            </div>
          </Link>

          {/* Nav Links — CENTER (desktop only) */}
          {!isMobile && (
            <nav style={{
              display: "flex",
              alignItems: "center",
              gap: "40px",
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}>
              {navLinks.map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase() === "about" ? "" : item.toLowerCase()}`}
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    color: pathname === `/${item.toLowerCase() === "about" ? "" : item.toLowerCase()}` 
                      ? "#D4AF37" 
                      : "rgba(255,255,255,0.7)",
                    textDecoration: "none",
                    transition: "color 0.3s",
                    position: "relative",
                    paddingBottom: "4px",
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "#D4AF37"}
                  onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = pathname === `/${item.toLowerCase() === "about" ? "" : item.toLowerCase()}` ? "#D4AF37" : "rgba(255,255,255,0.7)"}
                >
                  {item}
                </Link>
              ))}
            </nav>
          )}

          {/* CTA Button — RIGHT (desktop) or Hamburger (mobile) */}
          {!isMobile ? (
            <Link
              href="/contact"
              style={{
                padding: "12px 24px",
                background: "#D4AF37",
                color: "#000000",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "all 0.3s",
                boxShadow: "0 0 15px rgba(212,175,55,0.3)",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = "#ffffff";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 20px rgba(255,255,255,0.5)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = "#D4AF37";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 15px rgba(212,175,55,0.3)";
              }}
            >
              Start a Project
            </Link>
          ) : (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: "transparent",
                border: "none",
                color: "#ffffff",
                cursor: "pointer",
                padding: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          )}
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: "fixed",
              inset: 0,
              top: "88px",
              background: "rgba(0,0,0,0.97)",
              backdropFilter: "blur(20px)",
              zIndex: 40,
              display: "flex",
              flexDirection: "column",
              padding: "40px 32px",
              borderTop: "1px solid rgba(212,175,55,0.2)",
            }}
          >
            <nav style={{ display: "flex", flexDirection: "column", gap: "24px", marginTop: "24px" }}>
              {navLinks.map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase() === "about" ? "" : item.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily: "var(--font-playfair), serif",
                    fontSize: "clamp(28px, 8vw, 40px)",
                    fontWeight: 700,
                    color: "#ffffff",
                    textDecoration: "none",
                    transition: "color 0.3s",
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "#D4AF37"}
                  onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "#ffffff"}
                >
                  {item}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                style={{
                  marginTop: "16px",
                  padding: "18px 24px",
                  background: "#D4AF37",
                  color: "#000000",
                  textAlign: "center",
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                }}
              >
                Start a Project
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
