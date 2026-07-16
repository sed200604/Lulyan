'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView, animate } from 'framer-motion';

function SpecCounter({
  from,
  to,
  suffix = '',
  prefix = '',
  duration = 1.4,
  isText = false,
  textStr = '',
  onComplete
}: any) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const [fastMode, setFastMode] = useState(false);
  const [showSuffix, setShowSuffix] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('luliyane_spec_anim')) {
      setFastMode(true);
      setShowSuffix(true);
      if (nodeRef.current && !isText) {
        nodeRef.current.textContent = to.toString();
      }
      setTimeout(() => onComplete?.(), 50);
    }
  }, [to, isText, onComplete]);

  useEffect(() => {
    if (fastMode) return;
    
    if (isText) {
      const timer1 = setTimeout(() => setShowSuffix(true), duration * 1000);
      const timer2 = setTimeout(() => {
        onComplete?.();
        sessionStorage.setItem('luliyane_spec_anim', 'true');
      }, duration * 1000 + 200);
      return () => { clearTimeout(timer1); clearTimeout(timer2); };
    } else {
      const node = nodeRef.current;
      if (!node) return;

      const controls = animate(from as number, to as number, {
        duration,
        ease: [0.22, 1, 0.36, 1],
        onUpdate(value) {
          node.textContent = Math.round(value).toString();
        },
        onComplete() {
          setShowSuffix(true);
          onComplete?.();
          sessionStorage.setItem('luliyane_spec_anim', 'true');
        }
      });
      return () => controls.stop();
    }
  }, [from, to, duration, fastMode, isText, onComplete]);

  if (isText) {
    return (
      <span className="flex items-center justify-center">
        {prefix}
        {fastMode ? (
          <span>{textStr}</span>
        ) : (
          textStr.split('').map((char: string, i: number) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.08, duration: 0.1 }}
            >
              {char}
            </motion.span>
          ))
        )}
      </span>
    );
  }

  return (
    <span className="flex items-center justify-center">
      {prefix}
      <span ref={nodeRef}>{fastMode ? to : from}</span>
      {(showSuffix || fastMode) && (
        <motion.span
          initial={fastMode ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {suffix}
        </motion.span>
      )}
    </span>
  );
}

const Droplets = () => {
  const [positions, setPositions] = useState<Array<{ top: number; left: number }>>(() =>
    [...Array(6)].map(() => ({ top: 15, left: 10 }))
  );

  useEffect(() => {
    setPositions([...Array(6)].map(() => ({
      top: 15 + Math.random() * 70,
      left: 10 + Math.random() * 80,
    })));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none mix-blend-overlay z-20">
       {positions.map((pos, i) => (
         <span
           key={i}
           className="absolute w-[8px] h-[8px] rounded-full bg-gradient-to-br from-white/90 to-transparent shadow-[0_2px_4px_rgba(0,0,0,0.5)] opacity-0"
           style={{
             top: `${pos.top}%`,
             left: `${pos.left}%`,
             animation: `dropletForm 0.4s ease-out forwards, dropletRoll 0.6s ease-in 1.6s forwards`,
             animationDelay: `${4.4 + i * 0.28}s, ${4.4 + i * 0.28}s`
           }}
         />
       ))}
    </div>
  );
};

export function MobileBurkiniExpertise() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const gridInView = useInView(containerRef, { once: true, amount: 0.4 });
  const [completedCells, setCompletedCells] = useState<number>(0);

  const handleCellComplete = useCallback(() => {
    setCompletedCells(prev => prev + 1);
  }, []);

  const glowStyle = {
    animation: 'hairlineGlow 0.8s ease-in-out'
  };

  return (
    <section 
      ref={containerRef}
      className="md:hidden w-full bg-[#FAF7F2] py-[64px] flex flex-col"
      aria-labelledby="expertise-title"
      role="region"
    >
      {/* 1. EYEBROW */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="font-body font-normal text-[10px] tracking-[0.6em] uppercase text-[#C5A14E] text-center mb-[24px]"
      >
        PERFORMANCE × COUTURE
      </motion.div>

      {/* 2. HEADLINE */}
      <motion.h2
        id="expertise-title"
        className="font-heading font-light text-[26px] tracking-[0.18em] text-[#1A1A1A] uppercase text-center mb-[14px]"
      >
        {'NOTRE EXPERTISE BURKINI'.split('').map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, filter: 'blur(8px)' }}
            animate={isInView ? { opacity: 1, filter: 'blur(0px)' } : { opacity: 0, filter: 'blur(8px)' }}
            transition={{ duration: 0.8, delay: 0.18 + i * 0.03, ease: [0.22, 1, 0.36, 1] }}
          >
            {char}
          </motion.span>
        ))}
      </motion.h2>

      {/* 3. DECORATIVE DIVIDER */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center justify-center gap-[6px] mb-[28px]"
      >
        <div className="w-[24px] h-[1px] bg-[#C5A14E]" />
        <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 0L6 3L3 6L0 3L3 0Z" fill="#C5A14E" />
        </svg>
        <div className="w-[24px] h-[1px] bg-[#C5A14E]" />
      </motion.div>

      {/* 4. VALUE PROP */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.6, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
        className="font-heading italic font-light text-[16px] text-[#5A5247] text-center px-[24px] tracking-[0.02em] leading-[1.4] mb-[40px]"
      >
        Quatre garanties techniques. Une seule promesse de luxe.
      </motion.p>

      {/* 5. SPEC GRID */}
      <motion.dl
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3, delay: 1.7 }}
        className="grid grid-cols-2 gap-[1px] bg-[#C5A14E] border border-[#C5A14E] mx-[24px] mb-[40px]"
      >
        {/* Cell 1 */}
        <motion.div
          initial={{ scale: 0.96, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.96, opacity: 0 }}
          transition={{ duration: 0.5, delay: 1.7, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[#FAF7F2] p-[28px_12px] text-center flex flex-col items-center gap-[8px]"
          style={completedCells > 0 ? glowStyle : {}}
        >
          <dt className="font-heading font-light text-[32px] text-[#1A1A1A] tracking-[0.04em] leading-none" aria-label="UPF cinquante plus">
            {gridInView && <SpecCounter from={0} to={50} suffix="+" prefix="UPF " onComplete={handleCellComplete} />}
          </dt>
          <dd className="flex flex-col items-center gap-[4px] mt-[8px]">
            <span className="font-body font-medium text-[11px] tracking-[0.32em] uppercase text-[#C5A14E]">PROTECTION SOLAIRE</span>
            <span className="font-body font-light text-[11px] text-[#5A5247] leading-[1.4] max-w-[90%]">Bloque 98% des UV</span>
          </dd>
        </motion.div>

        {/* Cell 2 */}
        <motion.div
          initial={{ scale: 0.96, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.96, opacity: 0 }}
          transition={{ duration: 0.5, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[#FAF7F2] p-[28px_12px] text-center flex flex-col items-center gap-[8px]"
          style={completedCells > 0 ? glowStyle : {}}
        >
          <dt className="font-heading font-light text-[32px] text-[#1A1A1A] tracking-[0.04em] leading-none" aria-label="zéro pour cent">
            {gridInView && <SpecCounter from={100} to={0} suffix="%" onComplete={handleCellComplete} />}
          </dt>
          <dd className="flex flex-col items-center gap-[4px] mt-[8px]">
            <span className="font-body font-medium text-[11px] tracking-[0.32em] uppercase text-[#C5A14E]">TRANSPARENCE</span>
            <span className="font-body font-light text-[11px] text-[#5A5247] leading-[1.4] max-w-[90%]">Même mouillé, opacité garantie</span>
          </dd>
        </motion.div>

        {/* Cell 3 */}
        <motion.div
          initial={{ scale: 0.96, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.96, opacity: 0 }}
          transition={{ duration: 0.5, delay: 1.9, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[#FAF7F2] p-[28px_12px] text-center flex flex-col items-center gap-[8px]"
          style={completedCells > 0 ? glowStyle : {}}
        >
          <dt className="font-heading font-light text-[32px] text-[#1A1A1A] tracking-[0.04em] leading-none" aria-label="cent pour cent">
            {gridInView && <SpecCounter from={0} to={100} suffix="%" onComplete={handleCellComplete} />}
          </dt>
          <dd className="flex flex-col items-center gap-[4px] mt-[8px]">
            <span className="font-body font-medium text-[11px] tracking-[0.32em] uppercase text-[#C5A14E]">ANTI-CHLORE</span>
            <span className="font-body font-light text-[11px] text-[#5A5247] leading-[1.4] max-w-[90%]">Résiste piscine & mer</span>
          </dd>
        </motion.div>

        {/* Cell 4 */}
        <motion.div
          initial={{ scale: 0.96, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.96, opacity: 0 }}
          transition={{ duration: 0.5, delay: 2.0, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[#FAF7F2] p-[28px_12px] text-center flex flex-col items-center gap-[8px]"
          style={completedCells > 0 ? glowStyle : {}}
        >
          <dt className="font-heading font-light text-[32px] text-[#1A1A1A] tracking-[0.04em] leading-none" aria-label="Premium">
            {gridInView && <SpecCounter isText textStr="PREMIUM" prefix="★ " duration={0.48} onComplete={handleCellComplete} />}
          </dt>
          <dd className="flex flex-col items-center gap-[4px] mt-[8px]">
            <span className="font-body font-medium text-[11px] tracking-[0.32em] uppercase text-[#C5A14E]">QUALITÉ TESTÉE</span>
            <span className="font-body font-light text-[11px] text-[#5A5247] leading-[1.4] max-w-[90%]">Testé en conditions réelles</span>
          </dd>
        </motion.div>
      </motion.dl>

      {/* Body Paragraph */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.7, delay: 3.8, ease: [0.22, 1, 0.36, 1] }}
        className="font-body font-light text-[14px] leading-[1.7] tracking-[0.02em] text-[#1A1A1A]/80 text-left px-[28px] max-w-[86%] mx-auto mb-[32px]"
      >
        Chaque burkini est conçu à Paris, taillé dans des tissus 
        premium, et testé en conditions réelles — chlore, 
        sel, soleil méditerranéen.
      </motion.p>

      {/* 6. FABRIC HERO IMAGE */}
      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.04 }}
        transition={{ duration: 0.9, delay: 4.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full px-[24px] mb-[32px] flex flex-col items-center"
      >
        <div className="relative w-full aspect-[16/9] rounded-[2px] overflow-hidden mb-[12px]">
          <Image
            src="/images/story/fabric-macro.webp"
            alt="Tissu technique burkini LULIYANE"
            fill
            className="object-cover"
            sizes="100vw"
            loading="lazy"
          />
          {isInView && <Droplets />}
        </div>
        <span className="font-heading italic text-[11px] text-[#9A9189]">
          Tissu testé · Qualité Premium
        </span>
      </motion.div>

      {/* 7. COMPETITIVE CONTRAST RIBBON */}
      <div className="mx-[24px] mb-[36px] px-[22px] py-[24px] border-y border-[#C5A14E]/30 bg-gradient-to-b from-transparent to-[#C5A14E]/[0.04]">
        {/* Row 1 - AILLEURS */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
          transition={{ duration: 0.6, delay: 4.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col"
        >
          <span className="font-body font-normal text-[9px] tracking-[0.4em] uppercase text-[#9A9189]">AILLEURS</span>
          <span className="font-body font-light text-[12px] text-[#5A5247] mt-[4px]">Transparence au mouillé. Fadeur après une saison.</span>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.5, delay: 5.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center gap-[6px] my-[16px] opacity-40 origin-center"
        >
          <div className="w-[60px] h-[1px] bg-[#C5A14E]" />
          <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 0L6 3L3 6L0 3L3 0Z" fill="#C5A14E" />
          </svg>
          <div className="w-[60px] h-[1px] bg-[#C5A14E]" />
        </motion.div>

        {/* Row 2 - LULIYANE */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
          transition={{ duration: 0.6, delay: 6.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col"
        >
          <span className="font-body font-normal text-[9px] tracking-[0.4em] uppercase text-[#C5A14E]">LULIYANE</span>
          <span className="font-body font-normal text-[12px] text-[#1A1A1A] mt-[4px]">Opacité absolue. Éclat conservé saison après saison.</span>
        </motion.div>
      </div>

      {/* 8. PULL-QUOTE */}
      <div className="mb-[36px] flex flex-col items-center">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.5, delay: 6.2, ease: [0.65, 0, 0.35, 1] }}
          className="w-[60px] h-[1px] bg-[#C5A14E] mb-[18px] origin-center"
        />
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.6, delay: 6.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading italic font-light text-[20px] text-[#1A1A1A] tracking-[0.02em] leading-[1.4] text-center px-[32px]"
        >
          &quot;L&apos;alliance ultime entre performance technique et esthétique de luxe.&quot;
        </motion.p>
      </div>

      {/* 9. CERTIFICATION BAR (Fallback used) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.88 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.88 }}
        transition={{ duration: 0.5, delay: 7.1, ease: [0.34, 1.56, 0.64, 1] }}
        className="flex items-center justify-center mb-[40px] px-[24px]"
      >
        <span className="font-body font-normal text-[9px] tracking-[0.3em] uppercase text-[#5A5247] text-center">
          Conçu et testé à Paris depuis 2026.
        </span>
      </motion.div>

      {/* 10. CTA */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.5, delay: 7.8, ease: [0.22, 1, 0.36, 1] }}
        className="flex justify-center w-full px-[24px]"
      >
        <Link
          href="/collection/luliyane-riviera"
          className="group relative flex items-center justify-center w-full max-w-[320px] h-[52px] bg-[#1A1A1A] text-[#E8D9A8] overflow-hidden rounded-sm"
          aria-label="Découvrir nos créations burkini techniques"
        >
          {/* Hover sweep element */}
          <span className="absolute inset-0 bg-[#C5A14E] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.22,1,0.36,1]" />
          <span className="relative z-10 font-body font-normal text-[12px] tracking-[0.32em] uppercase group-hover:text-[#1A1A1A] transition-colors duration-500 flex items-center">
            DÉCOUVRIR NOS CRÉATIONS
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
        </Link>
      </motion.div>

    </section>
  );
}
