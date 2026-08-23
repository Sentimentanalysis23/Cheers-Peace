"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";
import { ContentData } from "@/lib/cms";

export default function BlogsClient({ blogs }: { blogs: ContentData[] }) {
  return (
    <div className="min-h-screen bg-[#000000] selection:bg-[#C1836A] selection:text-[#000000] pt-32 pb-32">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-20">
        <div className="grid md:grid-cols-2 gap-12 items-end border-b border-[#C1836A]/20 pb-12">
          <div>
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[#C1836A] text-xs font-bold tracking-[0.3em] uppercase mb-4 block"
            >
              Knowledge & Insights
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-[family-name:var(--font-playfair)] text-5xl md:text-7xl text-white font-medium tracking-tight"
            >
              Journal
            </motion.h1>
          </div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-[#FFFFFF]/50 text-lg md:text-xl font-light leading-relaxed"
          >
            Thoughts, news, and behind-the-scenes stories from the frontlines of global event management and fabrication.
          </motion.div>
        </div>
      </div>

      {/* Blogs Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {blogs.map((blog, idx) => (
            <motion.article 
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="group cursor-pointer flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden mb-8 border border-[#C1836A]/20">
                <Image 
                  src={blog.image} 
                  alt={blog.title} 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-[#C1836A]/30 px-4 py-1.5 rounded-full">
                  <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase">{blog.category}</span>
                </div>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Meta */}
              <div className="flex items-center gap-6 text-[#FFFFFF]/40 text-xs font-medium tracking-wider uppercase mb-4">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-[#C1836A]" />
                  {blog.date}
                </div>
                <div className="flex items-center gap-2">
                  <User size={14} className="text-[#C1836A]" />
                  {blog.author}
                </div>
              </div>

              {/* Content */}
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-white mb-4 group-hover:text-[#D4AF37] transition-colors line-clamp-2">
                {blog.title}
              </h2>
              <p className="text-[#FFFFFF]/60 font-light leading-relaxed mb-8 line-clamp-3 flex-grow">
                {blog.excerpt}
              </p>

              {/* Read More Link */}
              <Link href={`/blogs/${blog.slug}`} className="mt-auto inline-flex items-center gap-3 text-sm font-bold tracking-[0.2em] uppercase text-[#D4AF37] group/btn">
                Read Article
                <span className="w-8 h-8 rounded-full border border-[#D4AF37]/30 flex items-center justify-center group-hover/btn:bg-[#D4AF37] group-hover/btn:text-black transition-all">
                  <ArrowRight size={14} />
                </span>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
