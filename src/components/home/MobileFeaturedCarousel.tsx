'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { getFeaturedProducts } from '@/data/products';
import { MobileProductCard } from '@/components/product/MobileProductCard';

export function MobileFeaturedCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section 
      ref={containerRef}
      className="md:hidden bg-[#FAF7F2] pt-[56px] pb-[56px] overflow-hidden" 
      aria-labelledby="selection-title"
    >
      {/* SECTION HEADER */}
      <motion.div 
        className="flex flex-col items-center mb-[28px] px-5"
        initial={{ opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="font-inter font-normal text-[11px] tracking-[0.5em] uppercase text-[#C5A14E] mb-3 text-center">
          SÉLECTION DU MOMENT
        </span>
        
        {/* Animated Diamond Divider */}
        <div className="flex items-center justify-center gap-3 w-[80px] mb-3">
          <div className="h-px bg-[#C5A14E]/40 w-[24px]"></div>
          <motion.div 
            className="w-[6px] h-[6px] rotate-45 border border-[#C5A14E]"
            animate={{ 
              scale: [1, 1.15, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          />
          <div className="h-px bg-[#C5A14E]/40 w-[24px]"></div>
        </div>

        <h2 
          id="selection-title"
          className="font-cormorant font-light italic text-[14px] text-[#5A5247] tracking-[0.02em] text-center"
        >
          Nos pièces les plus désirées cette saison
        </h2>
      </motion.div>

      {/* CAROUSEL TRACK */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-[14px] px-[20px] pb-6"
        style={{
          // Edge fade mask
          maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)'
        }}
      >
        {getFeaturedProducts().slice(0, 4).map((product) => (
          <motion.div
            key={product.id}
            variants={itemVariants}
            className="snap-center shrink-0 w-[74vw] max-w-[290px] first:ml-[5%] last:mr-[5%]"
          >
            <MobileProductCard product={product} onQuickView={() => {}} />
          </motion.div>
        ))}
      </motion.div>

      {/* PRIMARY CTA */}
      <motion.div 
        className="flex justify-center mt-6 px-5"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ delay: 0.6, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link
          href="/collection/luliyane-riviera"
          className="group flex items-center justify-center w-full max-w-[320px] h-[52px] bg-[#1A1A1A] text-[#E8D9A8] font-inter font-normal text-[12px] tracking-[0.32em] uppercase transition-all duration-300 hover:bg-[#2A2A2A] active:scale-[0.98] active:bg-[#C5A14E] active:text-[#1A1A1A]"
          aria-label="Voir la collection Luliyane Riviera"
        >
          DÉCOUVRIR LA COLLECTION
          <svg 
            className="ml-[10px] w-3 h-3 text-current transition-transform duration-300 group-hover:translate-x-1" 
            viewBox="0 0 12 12" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4.5 2.5L8 6L4.5 9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square"/>
          </svg>
        </Link>
      </motion.div>
    </section>
  );
}
