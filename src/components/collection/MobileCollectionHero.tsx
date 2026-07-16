'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Collection } from '@/types/product';

interface MobileCollectionHeroProps {
  collection: Collection;
}

export function MobileCollectionHero({ collection }: MobileCollectionHeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  });

  // Parallax: translateY from 0 to -30px as user scrolls to 60% of the element
  const parallaxY = useTransform(scrollYProgress, [0, 0.6], ['0px', '-30px']);

  return (
    <section 
      ref={ref}
      className="md:hidden relative w-full aspect-[4/5] overflow-hidden"
    >
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: parallaxY }}
      >
        <motion.div
          animate={{ scale: [1.0, 1.05] }}
          transition={{ 
            duration: 12, 
            ease: "linear", 
            repeat: Infinity, 
            repeatType: "mirror" 
          }}
          className="w-full h-full relative"
        >
          <Image
            src={collection.image}
            alt={collection.name}
            fill
            sizes="100vw"
            className="object-cover object-[60%_center] brightness-[0.94]"
            priority
          />
        </motion.div>
      </motion.div>

      {/* Gradient Scrim */}
      <div 
        className="absolute bottom-0 w-full h-[55%] z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.40) 50%, transparent 100%)'
        }}
      />

      {/* Text Block */}
      <div className="absolute bottom-[32px] left-1/2 -translate-x-1/2 w-full max-w-[86%] text-center z-20">
        <p className="font-sans text-[10px] font-normal tracking-[0.5em] uppercase text-[#C5A14E]">
          NOUVELLE COLLECTION · 2026
        </p>
        
        <h1 className="font-serif text-[32px] font-light tracking-[0.16em] uppercase text-[#FAF7F2] leading-[1.1] mt-[8px]">
          {collection.name}
        </h1>
        
        <p className="font-sans text-[11px] font-light tracking-[0.32em] uppercase text-[#E8D9A8] mt-[10px]">
          DOUZE PIÈCES · ÉDITION CAPSULE
        </p>
      </div>
    </section>
  );
}
