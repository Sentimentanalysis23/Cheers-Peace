"use client";
import { motion } from "framer-motion";

export default function PrivacyClient() {
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
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#C1836A]/5 blur-[120px] rounded-full pointer-events-none" />
      
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
            Privacy Policy
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
            <p className="mb-6">
              At <strong className="text-white">Cheers & Peace</strong>, we take your privacy seriously. This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make an inquiry through our website.
            </p>
            <p>
              We are committed to maintaining the trust and confidence of our visitors to our web site. In particular, we want you to know that Cheers & Peace is not in the business of selling, renting or trading email lists with other companies and businesses for marketing purposes.
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h2 className="text-3xl text-white font-[family-name:var(--font-playfair)] mb-6 text-[#D4AF37]">Personal Information We Collect</h2>
            <div className="pl-6 border-l-2 border-[#C1836A]/30">
              <p className="mb-4">
                When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device.
              </p>
              <p>
                Additionally, as you browse the Site, we collect information about the individual web pages that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site. We refer to this automatically-collected information as "Device Information".
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h2 className="text-3xl text-white font-[family-name:var(--font-playfair)] mb-6 text-[#D4AF37]">How Do We Use Your Personal Information?</h2>
            <div className="pl-6 border-l-2 border-[#C1836A]/30 space-y-4">
              <p>
                We use the Contact Information that we collect generally to fulfill any inquiries placed through the Site (including arranging for consultations, site visits, and providing you with quotes and/or order confirmations).
              </p>
              <p>
                We use the Device Information that we collect to help us screen for potential risk and fraud (in particular, your IP address), and more generally to improve and optimize our Site (for example, by generating analytics about how our customers browse and interact with the Site, and to assess the success of our marketing and advertising campaigns).
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
