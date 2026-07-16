'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { animations } from '@/lib/animations';

export function MobileBrandStory() {
  const containerRef = useRef<HTMLElement>(null);
  
  // 4.9 Section Background Color Flip
  // Triggered when section top reaches 80% of viewport height
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end start'],
  });
  
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.1],
    ['#FAF7F2', '#1A1A1A']
  );

  // 4.3 Image Parallax on Scroll
  // We want the images to drift while the section is in the viewport
  const { scrollYProgress: parallaxProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageAy = useTransform(parallaxProgress, [0.3, 0.7], [0, -40]);
  const imageBy = useTransform(parallaxProgress, [0.3, 0.7], [0, -80]);
  const captionY = useTransform(parallaxProgress, [0.3, 0.7], [0, 20]);
  const captionOpacity = useTransform(parallaxProgress, [0.3, 0.7], [1, 0.7]);

  // Use a separate ref to trigger the main sequence
  const sequenceRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sequenceRef, { once: true, amount: 0.2 });

  // 4.4 Headline Letter Stagger
  const headline = "L'HISTOIRE DE LULIYANE";
  const letterVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  return (
    <motion.section
      ref={containerRef}
      style={{ backgroundColor }}
      className="md:hidden w-full relative py-[72px] overflow-hidden"
      aria-labelledby="history-title"
      role="article"
    >
      {/* Subtle vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(circle, transparent 70%, rgba(0,0,0,0.3) 100%)'
      }} />

      <div ref={sequenceRef} className="relative z-10 w-full flex flex-col items-center">
        
        {/* 1. EYEBROW TIMESTAMP */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-[#C5A14E] font-body font-normal text-[10px] tracking-[0.6em] uppercase mb-[28px] text-center"
        >
          PARIS · MMXXVI
        </motion.div>

        {/* 2. HERO IMAGE LAYER */}
        <div className="w-full relative h-[380px] mb-[56px] px-container flex flex-col">
          {/* Image A */}
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            animate={isInView ? { opacity: 1, scale: 1.0 } : { opacity: 0, scale: 1.04 }}
            transition={{ duration: 1.0, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ y: imageAy }}
            className="relative w-[76%] aspect-[4/5] rounded-[2px] overflow-hidden self-start z-0"
          >
            <Image
              src="/images/story/atelier-plate.webp"
              alt="Atelier LULIYANE Paris — coupe artisanale d'un burkini"
              fill
              className="object-cover"
              style={{ filter: 'brightness(0.92) contrast(1.08)' }}
              sizes="76vw"
              loading="lazy"
            />
          </motion.div>

          {/* Image B */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ y: imageBy }}
            className="absolute right-0 bottom-[-8%] w-[48%] aspect-[3/4] rounded-[2px] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.4)] z-10"
          >
            <Image
              src="/images/story/hand-detail.webp"
              alt="Détail broderie tissu burkini"
              fill
              className="object-cover"
              sizes="48vw"
              loading="lazy"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            style={{ y: captionY, opacity: captionOpacity as any }}
            className="absolute -bottom-[24px] left-container text-[#9A9189] italic text-[11px]"
          >
            Atelier · Paris, 11ᵉ arrondissement
          </motion.div>
        </div>

        {/* 3. HEADLINE */}
        <h2 id="history-title" className="font-heading font-light text-[26px] text-[#FAF7F2] tracking-[0.18em] uppercase text-center mb-[16px]">
          {headline.split('').map((char, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: 1.1 + (index * 0.03) }}
              className="inline-block"
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </h2>

        {/* 4. DECORATIVE DIVIDER */}
        <div className="flex items-center justify-center gap-[6px] mb-[32px]">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.7, delay: 1.7, ease: [0.65, 0, 0.35, 1] }}
            style={{ originX: 1 }}
            className="w-[24px] h-[1px] bg-[#C5A14E] opacity-60"
          />
          <motion.div
            initial={{ scale: 0, rotate: 135, opacity: 0 }}
            animate={isInView ? { scale: 1, rotate: 0, opacity: 1 } : { scale: 0, rotate: 135, opacity: 0 }}
            transition={{ duration: 0.5, delay: 1.9, ease: [0.34, 1.56, 0.64, 1] }}
            className="w-[6px] h-[6px] bg-transparent border border-[#C5A14E] rotate-45"
          />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.7, delay: 1.7, ease: [0.65, 0, 0.35, 1] }}
            style={{ originX: 0 }}
            className="w-[24px] h-[1px] bg-[#C5A14E] opacity-60"
          />
        </div>

        {/* 5. PULL-QUOTE */}
        <blockquote className="px-[24px] text-center mb-[36px] relative">
          <motion.div
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={isInView ? { clipPath: 'inset(0 0% 0 0)' } : { clipPath: 'inset(0 100% 0 0)' }}
            transition={{ duration: 1.2, delay: 2.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading italic font-light text-[22px] tracking-[0.02em] text-[#E8D9A8] leading-[1.4]"
          >
            <motion.span
              animate={{ y: [0, -2, 0], rotate: [0, -2, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block text-[#C5A14E] font-normal text-[28px] mr-1 align-top relative -top-[4px]"
            >
              «&nbsp;
            </motion.span>
            Née à Paris. Vivante de la piscine aux rivages méditerranéens.
            <motion.span
              animate={{ y: [0, 2, 0], rotate: [0, 2, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block text-[#C5A14E] font-normal text-[28px] ml-1 align-top relative -top-[4px]"
            >
              &nbsp;»
            </motion.span>
          </motion.div>
          <cite className="sr-only">LULIYANE PARIS</cite>
        </blockquote>

        {/* 6. BODY COPY */}
        <div className="w-[86%] mx-auto px-[24px] text-left mb-[36px]">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.7, delay: 3.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-body font-light text-[14px] leading-[1.7] tracking-[0.02em] text-[#C9C2B5] mb-4"
          >
            LULIYANE célèbre la femme moderne — celle qui refuse de choisir entre élégance et pudeur.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.7, delay: 3.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-body font-light text-[14px] leading-[1.7] tracking-[0.02em] text-[#C9C2B5]"
          >
            Nos burkinis allient le <span className="font-normal text-[#FAF7F2]">savoir-faire parisien</span> à une <span className="font-normal text-[#FAF7F2]">qualité premium</span>, pour une élégance absolue, de la piscine aux rivages méditerranéens.
          </motion.p>
        </div>

        {/* 7. CREDIBILITY BADGES */}
        <div className="flex justify-center gap-[8px] w-full px-container mb-[40px]">
          {['CONÇU À / PARIS', 'QUALITÉ / PREMIUM', 'EDITIONS / LIMITÉES'].map((text, i) => (
            <motion.div
              key={text}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.5, delay: 3.9 + (i * 0.1), ease: [0.34, 1.56, 0.64, 1] }}
              className="flex-1 max-w-[100px] border border-[rgba(197,161,78,0.6)] py-[10px] px-[8px] flex flex-col items-center justify-center text-center"
              style={{
                animation: isInView ? `storyBadgeGlow 4s ease-in-out infinite ${3.9 + (i * 1.3)}s` : 'none'
              }}
            >
              {text.split(' / ').map((line, j) => (
                <span key={j} className="font-body font-normal text-[9px] tracking-[0.28em] text-[#C5A14E] uppercase leading-[1.5]">
                  {line}
                </span>
              ))}
            </motion.div>
          ))}
        </div>

        {/* 8. FOUNDER SIGNATURE BLOCK */}
        <div className="flex flex-col items-center mb-[44px]">
          <div className="w-[120px] h-[40px] relative flex justify-center mb-[8px]">
            <svg viewBox="0 0 120 40" className="w-full h-full" aria-label="Signature manuscrite de la fondatrice">
              {/* Using a stylized path as proxy for the real signature */}
              <motion.path
                d="M10,25 C20,15 25,5 30,20 C35,35 40,30 45,25 C50,20 60,10 65,25 C70,40 75,30 80,20 C85,10 95,20 100,25 C105,30 110,25 110,20"
                stroke="#C5A14E"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 2.2, delay: 4.5, ease: [0.65, 0, 0.35, 1] }}
              />
            </svg>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 6.9 }}
            className="font-body font-normal text-[9px] tracking-[0.4em] text-[#9A9189] uppercase"
          >
            Fondatrice · LULIYANE PARIS
          </motion.div>
        </div>

        {/* 9. CTA */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.5, delay: 5.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full flex justify-center px-container"
        >
          <Link
            href="/about"
            className="w-[calc(100%-48px)] max-w-[320px] h-[52px] flex items-center justify-center border border-[#C5A14E] text-[#E8D9A8] font-body font-normal text-[12px] tracking-[0.32em] uppercase transition-all duration-300 active:scale-[0.98] active:bg-[#C5A14E] active:text-[#1A1A1A] gap-2"
            aria-label="Lire l'histoire complète de LULIYANE PARIS"
          >
            NOTRE HISTOIRE COMPLÈTE
            <ChevronRight className="w-4 h-4 text-[#C5A14E] group-active:text-[#1A1A1A]" />
          </Link>
        </motion.div>

      </div>
    </motion.section>
  );
}
