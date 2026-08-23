"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="bg-[#000000] border-t border-[#C1836A]/20 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="mb-6 inline-block hover:opacity-80 transition-opacity">
              <div className="relative h-28 w-44 md:h-32 md:w-56 shrink-0 overflow-hidden">
                <Image src="/images/logo.png" alt="Cheers & Peace Logo" fill sizes="(max-width: 768px) 176px, 224px" className="object-contain" />
              </div>
            </Link>
            <p className="text-[#FFFFFF]/70 font-light leading-relaxed max-w-md mb-8">
              Based in Bangalore, we have been servicing our clients since 2016, providing the absolute best event experience. From corporate summits to grand weddings, we operate as a complete end-to-end solution.
            </p>
            <div className="flex gap-6 mt-8">
              {['Facebook', 'Instagram', 'Twitter', 'LinkedIn'].map((network, idx) => (
                <a key={idx} href="#" className="text-xs font-bold tracking-[0.2em] uppercase text-[#FFFFFF]/70 hover:text-[#C1836A] transition-all duration-300">
                  {network}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold tracking-[0.2em] text-sm mb-6 uppercase">Quick Links</h4>
            <ul className="space-y-4">
              {[
                { label: 'About Us', path: '/about' },
                { label: 'Our Services', path: '/services' },
                { label: 'Portfolio', path: '/portfolio' },
                { label: 'Contact', path: '/contact' }
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.path} className="text-[#FFFFFF]/70 hover:text-[#C1836A] transition-colors text-sm font-light">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold tracking-[0.2em] text-sm mb-6 uppercase">Contact</h4>
            <ul className="space-y-4 text-[#FFFFFF]/70 text-sm font-light">
              <li>Bangalore, India</li>
              <li>
                <a href="mailto:Cheerspeace06@gmail.com" className="hover:text-[#C1836A] transition-colors">Cheerspeace06@gmail.com</a>
              </li>
              <li>
                <a href="tel:+918197610110" className="hover:text-[#C1836A] transition-colors">+91 8197610110</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-[#C1836A]/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#FFFFFF]/50 text-xs font-light tracking-wide">
            &copy; {new Date().getFullYear()} Cheers & Peace. All rights reserved.
          </p>
          <div className="flex gap-6 text-[#FFFFFF]/50 text-xs font-light tracking-wide">
            <Link href="/privacy" className="hover:text-[#C1836A] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#C1836A] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
