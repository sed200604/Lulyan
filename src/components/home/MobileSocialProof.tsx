'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useInView, animate } from 'framer-motion';
import Image from 'next/image';
import { SITE_REVIEW_COUNT, SITE_RATING } from '@/lib/constants';

const TESTIMONIALS = [
  {
    id: 1,
    quote: "J'ai enfin trouvé des burkinis qui respectent mes valeurs sans faire de compromis sur le style. Un vrai coup de cœur.",
    author: "Sarah L.",
    city: "Lyon",
    date: "12 juin 2026",
    product: "Burkini Méditerranée · Noir · M",
    productImage: "/images/products/product-1/vue-beach.webp",
    rating: 5,
    initials: "SL",
    isVideo: true,
  },
  {
    id: 2,
    quote: "Le burkini le plus élégant que j'ai jamais porté. La qualité est exceptionnelle et la coupe parfaite.",
    author: "Amina K.",
    city: "Paris",
    date: "28 mai 2026",
    product: "Burkini Riviera · Noir · S",
    productImage: "/images/products/product-1/vue-beach.webp", // Reuse for now
    rating: 5,
    initials: "AK",
    isVideo: false,
  },
  {
    id: 3,
    quote: "Les finitions sont dignes d'une maison de haute couture. Le tissu sèche incroyablement vite.",
    author: "Yasmine B.",
    city: "Marseille",
    date: "15 mai 2026",
    product: "Ensemble Burkini Côte · Beige · L",
    productImage: "/images/products/product-1/vue-beach.webp",
    rating: 5,
    initials: "YB",
    isVideo: false,
  },
  {
    id: 4,
    quote: "Je me sens tellement confiante et belle à la plage maintenant. Merci Luliyane pour ces créations magnifiques.",
    author: "Nour M.",
    city: "Bruxelles",
    date: "3 mai 2026",
    product: "Burkini Riviera · Bleu · M",
    productImage: "/images/products/product-1/vue-beach.webp",
    rating: 5,
    initials: "NM",
    isVideo: false,
  },
];

const DISTRIBUTION = [
  { stars: 5, pct: 88 },
  { stars: 4, pct: 9 },
  { stars: 3, pct: 2 },
  { stars: 2, pct: 0 },
  { stars: 1, pct: 0 },
];

function StatCounter({ from, to, suffix = '', duration = 1.4, decimals = 0 }: any) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const [hasRun, setHasRun] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('luliyane_stat_anim')) {
      setHasRun(true);
      if (nodeRef.current) {
        nodeRef.current.textContent = to.toFixed(decimals) + suffix;
      }
    }
  }, [to, suffix, decimals]);

  useEffect(() => {
    if (hasRun) return;
    const node = nodeRef.current;
    if (!node) return;

    const controls = animate(from as number, to as number, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(value) {
        node.textContent = value.toFixed(decimals) + suffix;
      },
      onComplete() {
        sessionStorage.setItem('luliyane_stat_anim', 'true');
      }
    });
    return () => controls.stop();
  }, [from, to, duration, hasRun, suffix, decimals]);

  return <span ref={nodeRef}>{hasRun ? (to.toFixed(decimals) + suffix) : from.toFixed(decimals) + suffix}</span>;
}

export function MobileSocialProof() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const [progressKey, setProgressKey] = useState(0);

  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.5 });
  
  const distRef = useRef<HTMLDivElement>(null);
  const distInView = useInView(distRef, { once: true, amount: 0.5 });

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = TESTIMONIALS.length - 1;
      if (nextIndex >= TESTIMONIALS.length) nextIndex = 0;
      return nextIndex;
    });
    setProgressKey(prev => prev + 1); // Reset progress ring
  }, []);

  // Auto advance (4s)
  useEffect(() => {
    if (isInteracting) return;
    
    const timer = setInterval(() => {
      paginate(1);
    }, 4000);
    
    return () => clearInterval(timer);
  }, [paginate, isInteracting]);

  const currentTestimonial = TESTIMONIALS[currentIndex];

  const handleInteractionStart = () => setIsInteracting(true);
  const handleInteractionEnd = () => {
    setTimeout(() => setIsInteracting(false), 2000);
  };

  return (
    <section 
      ref={containerRef}
      className="md:hidden w-full bg-[#FAF7F2] py-[64px] flex flex-col"
      aria-labelledby="testimonials-title"
      role="region"
      aria-roledescription="carrousel de témoignages"
      onMouseEnter={handleInteractionStart}
      onMouseLeave={handleInteractionEnd}
      onTouchStart={handleInteractionStart}
      onTouchEnd={handleInteractionEnd}
    >
      <a href="#after-testimonials" className="sr-only focus:not-sr-only">Passer au-delà des témoignages</a>

      {/* 1. EYEBROW */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="font-body font-normal text-[11px] tracking-[0.5em] uppercase text-[#C5A14E] text-center mb-[20px]"
        id="testimonials-title"
      >
        CE QUE DISENT NOS CLIENTES
      </motion.div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center justify-center gap-[6px] mb-[36px] w-[80px] mx-auto origin-center"
      >
        <div className="flex-1 h-[1px] bg-[#C5A14E]" />
        <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 0L6 3L3 6L0 3L3 0Z" fill="#C5A14E" />
        </svg>
        <div className="flex-1 h-[1px] bg-[#C5A14E]" />
      </motion.div>

      {/* 2. TRUST-SEAL HEADER STRIP */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto w-full max-w-[360px] border-y border-[#C5A14E]/30 py-[12px] px-[24px] mb-[32px] flex items-center justify-center font-body font-medium text-[10px] tracking-[0.32em] uppercase text-[#1A1A1A]"
      >
        AVIS VÉRIFIÉS <span className="text-[#C5A14E] mx-2">·</span> {SITE_RATING}/5 <span className="text-[#C5A14E] mx-2">·</span> {SITE_REVIEW_COUNT} AVIS
      </motion.div>

      {/* 3. TESTIMONIAL CARD CAROUSEL */}
      <div className="relative w-full flex flex-col items-center min-h-[400px]">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 30 : -30, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: direction < 0 ? 30 : -30, scale: 0.96 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-[calc(100%-32px)] max-w-[360px] bg-[#FFFFFF] rounded-[2px] p-[24px_22px_28px] shadow-[0_12px_32px_rgba(26,26,26,0.08)] relative"
          >
            {/* 3a. Top row: customer photo + verified badge */}
            <div className="flex flex-row gap-[14px] items-center">
              {/* Photo */}
              <div className="relative w-[56px] h-[56px] rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.08)] bg-gradient-to-br from-[#C5A14E] to-[#A88838] flex items-center justify-center">
                <span className="font-heading text-[22px] text-white">
                  {currentTestimonial.initials}
                </span>
                {/* SVG Gold ring draw */}
                <svg viewBox="0 0 60 60" className="absolute -inset-[2px] w-[60px] h-[60px] pointer-events-none transform -rotate-90">
                  <motion.circle 
                    cx="30" cy="30" r="28" 
                    stroke="#C5A14E" strokeWidth="2" fill="none"
                    strokeDasharray="176"
                    initial={{ strokeDashoffset: 176 }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  />
                </svg>
                <div className="absolute -bottom-4 text-[7px] text-[#9A9189] whitespace-nowrap opacity-60">Modèle d&apos;illustration</div>
              </div>

              {/* Name & Verified */}
              <div className="flex flex-col gap-[4px]">
                <div className="font-body font-medium text-[14px] text-[#1A1A1A] tracking-[0.02em]">
                  {currentTestimonial.author} <span className="text-[#C5A14E]">·</span> {currentTestimonial.city}
                </div>
                <div className="flex items-center gap-[4px] font-body font-normal text-[10px] tracking-[0.16em]">
                  {/* Animated checkmark */}
                  <div className="relative w-[12px] h-[12px]">
                    <svg viewBox="0 0 12 12" fill="none" className="absolute inset-0">
                      <motion.circle 
                        cx="6" cy="6" r="5.5" fill="#C5A14E"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.3 }}
                      />
                      <motion.path 
                        d="M3.5 6 L5.2 7.7 L8.5 4.3" 
                        stroke="#FAF7F2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5, delay: 0.7, ease: [0.65, 0, 0.35, 1] }}
                      />
                    </svg>
                  </div>
                  <span className="text-[#C5A14E]">Achat vérifié</span>
                  <span className="text-[#5A5247]">· {currentTestimonial.date}</span>
                </div>
              </div>
            </div>

            {/* 3b. Star rating row */}
            <div className="flex gap-[4px] mt-[14px]" role="img" aria-label="Note 5 sur 5">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="relative w-[18px] h-[18px]">
                  {/* Outline star */}
                  <svg viewBox="0 0 24 24" stroke="rgba(26,26,26,0.15)" strokeWidth="1.5" fill="transparent" className="absolute inset-0">
                    <path d="M12 2 L14.85 8.7 L22 9.5 L16.5 14.2 L18.2 21 L12 17.3 L5.8 21 L7.5 14.2 L2 9.5 L9.15 8.7 Z" />
                  </svg>
                  {/* Animated filled star */}
                  <motion.svg 
                    viewBox="0 0 24 24" fill="#C5A14E" className="absolute inset-0 origin-center"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.3, 
                      delay: 0.8 + i * 0.08,
                      ease: [0.34, 1.56, 0.64, 1] 
                    }}
                  >
                    <path d="M12 2 L14.85 8.7 L22 9.5 L16.5 14.2 L18.2 21 L12 17.3 L5.8 21 L7.5 14.2 L2 9.5 L9.15 8.7 Z" />
                  </motion.svg>
                </div>
              ))}
            </div>

            {/* 3c. Quote block */}
            <blockquote className="mt-[16px] relative text-left pl-[12px]">
              <span className="absolute -top-[6px] -left-[4px] font-heading font-normal text-[28px] text-[#C5A14E] leading-none" aria-hidden="true">«</span>
              <motion.p
                initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
                animate={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
                transition={{ duration: 1, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
                className="font-heading italic font-light text-[17px] leading-[1.55] text-[#1A1A1A] tracking-[0.01em]"
              >
                &nbsp;{currentTestimonial.quote}&nbsp;<span className="font-heading font-normal text-[28px] text-[#C5A14E] leading-none inline-block relative top-[6px] ml-[2px]" aria-hidden="true">»</span>
              </motion.p>
            </blockquote>

            {/* 3d. Product purchased mini-card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.9, ease: [0.22, 1, 0.36, 1] }}
              className="mt-[16px] pt-[16px] border-t border-[#E8E1D4] flex flex-row gap-[12px] items-center"
            >
              <div className="w-[48px] h-[64px] rounded-[1px] overflow-hidden relative flex-shrink-0">
                <Image src={currentTestimonial.productImage} alt={currentTestimonial.product} fill className="object-cover" />
              </div>
              <div className="flex flex-col gap-[2px]">
                <span className="font-body font-medium text-[9px] tracking-[0.36em] uppercase text-[#9A9189]">PRODUIT ACHETÉ</span>
                <span className="font-body font-normal text-[12px] text-[#1A1A1A]">{currentTestimonial.product}</span>
                <a href="#" className="group font-body font-normal text-[10px] tracking-[0.18em] text-[#C5A14E] mt-[2px] relative w-max">
                  Revoir le produit →
                  <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#C5A14E] transition-all duration-300 group-hover:w-full" />
                </a>
              </div>
            </motion.div>

            {/* 3e. Video badge */}
            {currentTestimonial.isVideo && (
              <div className="absolute top-[12px] right-[12px] w-[32px] h-[32px] rounded-full bg-[#1A1A1A] border border-[#C5A14E] flex items-center justify-center z-10 cursor-pointer">
                {/* Pulse ring */}
                <div className="absolute inset-0 border border-[#C5A14E] rounded-full animate-[pulseRing_2.8s_ease-out_infinite] opacity-60" />
                <svg viewBox="0 0 10 10" fill="#C5A14E" className="w-[10px] h-[10px]">
                  <path d="M2.5 1.5 L8 5 L2.5 8.5 Z" />
                </svg>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* 4. CAROUSEL CONTROLS */}
        <div className="flex gap-[20px] mt-[32px] items-center relative h-[24px]">
          {TESTIMONIALS.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
                setProgressKey(prev => prev + 1);
              }}
              className="relative h-[24px] flex items-center justify-center"
              aria-label={`Aller à l'avis ${index + 1}`}
            >
              <motion.div
                className="rounded-full"
                animate={{
                  width: index === currentIndex ? 24 : 6,
                  height: 6,
                  backgroundColor: index === currentIndex ? '#C5A14E' : 'rgba(26,26,26,0.2)'
                }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              />
              
              {/* Auto-advance progress ring around active dot */}
              {index === currentIndex && (
                <svg className="absolute -inset-[9px] w-[24px] h-[24px] pointer-events-none transform -rotate-90" style={{ left: '50%', transform: 'translate(-50%, 0) rotate(-90deg)' }}>
                  <motion.circle 
                    cx="12" cy="12" r="9" 
                    stroke="#C5A14E" strokeWidth="1" fill="none"
                    strokeDasharray={2 * Math.PI * 9}
                    initial={{ strokeDashoffset: 2 * Math.PI * 9, opacity: 0 }}
                    animate={{ 
                      strokeDashoffset: isInteracting ? 2 * Math.PI * 9 : 0,
                      opacity: isInteracting ? 0 : 1
                    }}
                    transition={{ 
                      strokeDashoffset: { duration: 4, ease: "linear" },
                      opacity: { duration: 0.2 }
                    }}
                    key={progressKey}
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 5. STAT ROW */}
      <div ref={statsRef} className="mt-[48px] px-[24px] flex flex-row gap-[16px] justify-between relative">
        {/* Divider 1 */}
        <div className="absolute left-1/3 top-[50%] -translate-y-1/2 w-[1px] h-[32px] bg-[#C5A14E] opacity-30" />
        {/* Divider 2 */}
        <div className="absolute left-2/3 top-[50%] -translate-y-1/2 w-[1px] h-[32px] bg-[#C5A14E] opacity-30" />
        
        {/* Cell 1 */}
        <div className="flex flex-col items-center flex-1 text-center">
          <div className="font-heading font-light text-[32px] text-[#1A1A1A] tracking-[0.02em] leading-none mb-[8px]">
            {statsInView ? <StatCounter from={0} to={SITE_RATING} decimals={1} /> : '0.0'}/5
          </div>
          <div className="font-body font-medium text-[10px] tracking-[0.32em] uppercase text-[#C5A14E] mb-[4px]">
            NOTE MOYENNE
          </div>
          <div className="font-body font-light text-[10px] text-[#5A5247]">
            sur {SITE_REVIEW_COUNT} avis vérifiés
          </div>
        </div>

        {/* Cell 2 */}
        <div className="flex flex-col items-center flex-1 text-center">
          <div className="font-heading font-light text-[32px] text-[#1A1A1A] tracking-[0.02em] leading-none mb-[8px]">
            {statsInView ? <StatCounter from={0} to={SITE_REVIEW_COUNT} /> : '0'}
          </div>
          <div className="font-body font-medium text-[10px] tracking-[0.32em] uppercase text-[#C5A14E] mb-[4px]">
            AVIS CLIENTS
          </div>
          <div className="font-body font-light text-[10px] text-[#5A5247]">
            depuis le lancement
          </div>
        </div>

        {/* Cell 3 */}
        <div className="flex flex-col items-center flex-1 text-center">
          <div className="font-heading font-light text-[32px] text-[#1A1A1A] tracking-[0.02em] leading-none mb-[8px]">
            {statsInView ? <StatCounter from={0} to={98} /> : '0'}%
          </div>
          <div className="font-body font-medium text-[10px] tracking-[0.32em] uppercase text-[#C5A14E] mb-[4px]">
            RECOMMANDENT
          </div>
          <div className="font-body font-light text-[10px] text-[#5A5247]">
            à leurs proches
          </div>
        </div>
      </div>

      {/* 6. RATING DISTRIBUTION BAR */}
      <div ref={distRef} className="mt-[32px] mb-[32px] px-[24px] flex flex-col gap-[6px]">
        {DISTRIBUTION.map((row, i) => (
          <div key={row.stars} className="flex flex-row items-center gap-[10px]">
            <div className="flex justify-start w-[60px] gap-[2px]">
              {[...Array(5)].map((_, j) => (
                <svg key={j} viewBox="0 0 24 24" fill={j < row.stars ? '#C5A14E' : '#E8E1D4'} className="w-[12px] h-[12px]">
                  <path d="M12 2 L14.85 8.7 L22 9.5 L16.5 14.2 L18.2 21 L12 17.3 L5.8 21 L7.5 14.2 L2 9.5 L9.15 8.7 Z" />
                </svg>
              ))}
            </div>
            <div className="flex-1 bg-[rgba(26,26,26,0.06)] h-[4px] overflow-hidden">
              <motion.div 
                className="h-full bg-[#C5A14E] origin-left"
                initial={{ scaleX: 0 }}
                animate={distInView ? { scaleX: row.pct / 100 } : { scaleX: 0 }}
                transition={{ duration: 1.2, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                onAnimationComplete={() => {
                  // Optional glowing effect at end
                }}
              />
            </div>
            <div className="w-[36px] text-right font-body font-normal text-[10px] text-[#5A5247]">
              {distInView ? <StatCounter from={0} to={row.pct} suffix="%" duration={1.2} /> : '0%'}
            </div>
          </div>
        ))}
      </div>

      {/* 7. CTA */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.5, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
        className="flex justify-center w-full px-[24px]"
      >
        <button 
          className="group relative flex items-center justify-center w-full max-w-[320px] h-[52px] bg-[#1A1A1A] text-[#E8D9A8] overflow-hidden rounded-[2px]"
          aria-label="Voir l'ensemble des avis clients vérifiés"
        >
          {/* Hover sweep element */}
          <span className="absolute inset-0 bg-[#C5A14E] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.22,1,0.36,1]" />
          <span className="relative z-10 font-body font-normal text-[12px] tracking-[0.32em] uppercase group-hover:text-[#1A1A1A] transition-colors duration-500 flex items-center">
            VOIR TOUS LES AVIS
            <svg 
              className="ml-[12px] transform transition-transform duration-300 group-hover:translate-x-1" 
              width="6" 
              height="10" 
              viewBox="0 0 6 10" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1 1L5 5L1 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square"/>
            </svg>
          </span>
        </button>
      </motion.div>
      
      <div id="after-testimonials" />
    </section>
  );
}
