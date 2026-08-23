"use client";
import { motion } from "framer-motion";

export default function TermsClient() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8 }
    },
  };

  return (
    <main className="min-h-screen bg-[#000000] text-white pt-40 pb-32 px-6 md:px-12 selection:bg-[#C1836A] selection:text-[#000000] relative overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#C1836A]/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 border-b border-[#C1836A]/20 pb-12 text-center"
        >
          <span className="text-[#C1836A] text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
            Legal & Compliance
          </span>
          <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-7xl font-bold text-white tracking-tight">
            Terms of Service
          </h1>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12 text-[#FFFFFF]/70 font-light leading-relaxed text-lg"
        >
          <motion.div variants={itemVariants} className="flex gap-4 items-center mb-8">
            <div className="w-8 h-[1px] bg-[#C1836A]" />
            <p className="text-sm tracking-widest uppercase text-white/50">Last updated: {new Date().toLocaleDateString()}</p>
            <div className="w-8 h-[1px] bg-[#C1836A]" />
          </motion.div>

          <motion.div variants={itemVariants} className="bg-[#0A0A0A] p-8 md:p-12 rounded-3xl border border-[#C1836A]/10 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
            <p>
              Welcome to <strong className="text-white">Cheers & Peace Event Management</strong>. By accessing or using our website and services, you agree to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern Cheers & Peace's relationship with you in relation to this website.
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h2 className="text-3xl text-white font-[family-name:var(--font-playfair)] mb-6 text-[#D4AF37]">1. Acceptance of Terms</h2>
            <div className="pl-6 border-l-2 border-[#C1836A]/30">
              <p>
                By accessing this website, you are agreeing to be bound by these website Terms and Conditions of Use, all applicable laws, and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h2 className="text-3xl text-white font-[family-name:var(--font-playfair)] mb-6 text-[#D4AF37]">2. Services & Contracts</h2>
            <div className="pl-6 border-l-2 border-[#C1836A]/30">
              <p>
                Cheers & Peace provides professional event management, structural fabrication, brand activations, and exhibition stall services. All project details, timelines, costs, and deliverables will be formally agreed upon in a separate, legally binding signed contract for each engagement. The content of this website is for general information and portfolio purposes only.
              </p>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl text-white font-[family-name:var(--font-playfair)] mb-6 text-[#D4AF37]">3. Limitations of Liability</h2>
            <div className="pl-6 border-l-2 border-[#C1836A]/30">
              <p>
                In no event shall Cheers & Peace or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website or our services, even if we have been notified orally or in writing of the possibility of such damage.
              </p>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="pt-12 flex justify-center">
             <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#C1836A]/50 to-transparent rounded-full" />
          </motion.div>

        </motion.div>
      </div>
    </main>
  );
}
