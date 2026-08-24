"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", company: "", location: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
      setFormData({ name: "", email: "", company: "", location: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error(error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] selection:bg-[#C1836A] selection:text-[#000000] pt-32 pb-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#C1836A] text-xs font-bold tracking-[0.3em] uppercase mb-4 block"
          >
            Start a Conversation
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-[family-name:var(--font-playfair)] text-5xl md:text-7xl lg:text-8xl text-white font-medium tracking-tight"
          >
            Let's create <br/>
            <span className="text-[#FFFFFF]/50 italic">something extraordinary.</span>
          </motion.h1>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-20">
          
          {/* Left: Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-16"
          >
            <div>
              <p className="text-[#FFFFFF]/70 font-light text-xl leading-relaxed mb-12">
                Whether you're planning a massive corporate summit, need a custom exhibition stall, or are organizing a luxury wedding, our team is ready to execute flawlessly.
              </p>
              
              <div className="space-y-8">
                <div className="flex gap-6 group">
                  <div className="w-12 h-12 rounded-full border border-[#C1836A]/30 flex items-center justify-center text-[#C1836A] group-hover:bg-[#C1836A] group-hover:text-[#000000] transition-all duration-300 shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold tracking-widest uppercase text-sm mb-2">Headquarters</h4>
                    <p className="text-[#FFFFFF]/70 font-light leading-relaxed">
                      123 Event Horizon Way<br />
                      Indiranagar, Bangalore<br />
                      Karnataka, India 560038
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-6 group">
                  <div className="w-12 h-12 rounded-full border border-[#C1836A]/30 flex items-center justify-center text-[#C1836A] group-hover:bg-[#C1836A] group-hover:text-[#000000] transition-all duration-300 shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold tracking-widest uppercase text-sm mb-2">Direct Line</h4>
                    <p className="text-[#FFFFFF]/70 font-light">
                      <a href="tel:+918197610110" className="hover:text-[#C1836A] transition-colors">+91 8197610110</a>
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-6 group">
                  <div className="w-12 h-12 rounded-full border border-[#C1836A]/30 flex items-center justify-center text-[#C1836A] group-hover:bg-[#C1836A] group-hover:text-[#000000] transition-all duration-300 shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold tracking-widest uppercase text-sm mb-2">Email</h4>
                    <p className="text-[#FFFFFF]/70 font-light">
                      <a href="mailto:Cheerspeace06@gmail.com" className="hover:text-[#C1836A] transition-colors">Cheerspeace06@gmail.com</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: The Form */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#C1836A]/5 to-transparent rounded-3xl -z-10 blur-3xl"></div>
            
            <div className="relative z-10 mb-12">
              <h3 className="font-[family-name:var(--font-playfair)] text-3xl text-white mb-2">Send a Message</h3>
              <p className="text-[#FFFFFF]/50 font-light text-sm">We typically reply within 24 hours.</p>
            </div>

            <form onSubmit={handleSubmit} className="relative z-10 space-y-12">
              <div className="grid md:grid-cols-2 gap-12">
                <div className="relative group">
                  <input 
                    type="text" 
                    id="name" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-transparent border-b border-[#FFFFFF]/20 py-4 text-white placeholder-transparent focus:outline-none focus:border-[#C1836A] peer transition-colors" 
                    placeholder="Full Name" 
                  />
                  <label htmlFor="name" className="absolute left-0 -top-4 text-xs text-[#FFFFFF]/50 tracking-widest uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#C1836A]">
                    Full Name
                  </label>
                </div>
                <div className="relative group">
                  <input 
                    type="email" 
                    id="email" 
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-transparent border-b border-[#FFFFFF]/20 py-4 text-white placeholder-transparent focus:outline-none focus:border-[#C1836A] peer transition-colors" 
                    placeholder="Email Address" 
                  />
                  <label htmlFor="email" className="absolute left-0 -top-4 text-xs text-[#FFFFFF]/50 tracking-widest uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#C1836A]">
                    Email Address
                  </label>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                <div className="relative group">
                  <input 
                    type="text" 
                    id="company" 
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="w-full bg-transparent border-b border-[#FFFFFF]/20 py-4 text-white placeholder-transparent focus:outline-none focus:border-[#C1836A] peer transition-colors" 
                    placeholder="Company / Organization" 
                  />
                  <label htmlFor="company" className="absolute left-0 -top-4 text-xs text-[#FFFFFF]/50 tracking-widest uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#C1836A]">
                    Company / Organization
                  </label>
                </div>

                <div className="relative group">
                  <input 
                    type="text" 
                    id="location" 
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full bg-transparent border-b border-[#FFFFFF]/20 py-4 text-white placeholder-transparent focus:outline-none focus:border-[#C1836A] peer transition-colors" 
                    placeholder="Event Location / City" 
                  />
                  <label htmlFor="location" className="absolute left-0 -top-4 text-xs text-[#FFFFFF]/50 tracking-widest uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#C1836A]">
                    Event Location / City
                  </label>
                </div>
              </div>

              <div className="relative group">
                <textarea 
                  id="message" 
                  required 
                  rows={4} 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-transparent border-b border-[#FFFFFF]/20 py-4 text-white placeholder-transparent focus:outline-none focus:border-[#C1836A] peer transition-colors resize-none" 
                  placeholder="Project Details"
                ></textarea>
                <label htmlFor="message" className="absolute left-0 -top-4 text-xs text-[#FFFFFF]/50 tracking-widest uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#C1836A]">
                  Project Details
                </label>
              </div>

              <div className="flex items-center gap-6">
                <button 
                  type="submit" 
                  disabled={status === "loading"}
                  className="group flex items-center gap-6 text-[#C1836A] font-bold tracking-[0.2em] uppercase pt-4 hover:text-white transition-colors disabled:opacity-50"
                >
                  {status === "loading" ? "Sending..." : "Submit Inquiry"}
                  <span className="w-12 h-12 rounded-full border border-[#C1836A] flex items-center justify-center group-hover:bg-[#C1836A] group-hover:text-[#000000] transition-all duration-300">
                    <ArrowRight size={20} />
                  </span>
                </button>
                {status === "success" && <span className="text-green-500 text-sm font-medium mt-4">Message sent successfully!</span>}
                {status === "error" && <span className="text-red-500 text-sm font-medium mt-4">Failed to send message.</span>}
              </div>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
