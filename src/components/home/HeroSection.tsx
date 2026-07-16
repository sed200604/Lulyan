'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { animations } from '@/lib/animations';

const heroContent = {
  overline: "COLLECTION ÉTÉ 2026",
  titleLine1: "L'Élégance",
  titleLine2: "au Bord de l'Eau",
  subtitle: "Découvrez notre nouvelle collection de burkinis élégants, conçus à Paris. Qualité premium, séchage rapide, protection solaire.",
  ctaPrimary: { label: "DÉCOUVRIR LA COLLECTION →", href: "/collections" },
  videoSrc: "/videos/hero-desktop.mp4",
  posterSrc: "/images/products/product-1/vue-25.webp",
  mobileSrc: "/images/products/product-1/vue-25.webp",
};

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax effects
  // Background moves at 0.5x speed (y: 0 -> 50%)
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  // Content moves at 1.5x speed (y: 0 -> -50%)
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  // Section fades out when scrolling
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0, 0]);

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <motion.section
      ref={containerRef}
      style={{ opacity: shouldReduceMotion ? 1 : sectionOpacity }}
      className="relative w-full h-[100vh] min-h-[600px] overflow-hidden bg-brand-black-950 flex flex-col justify-center items-center"
      aria-label="Section Héro : Collection Été"
    >
      {/* Background Layer */}
      <motion.div
        style={{ y: shouldReduceMotion ? 0 : bgY }}
        className="absolute inset-0 w-full h-full"
      >
        {/* Desktop Video */}
        <video
          className="hidden md:block absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={heroContent.posterSrc}
          preload="metadata"
        >
          <source src={heroContent.videoSrc} type="video/mp4" />
        </video>

        {/* Mobile / Fallback Image with Ken Burns */}
        <div className="md:hidden absolute inset-0 w-full h-full">
          <div className="w-full h-full animate-ken-burns transform-gpu origin-center">
            <Image
              src={heroContent.mobileSrc}
              alt="LULIYANE PARIS - L'Élégance au Bord de l'Eau"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 md:from-black/70 via-black/40 md:via-black/20 to-black/10 md:to-black/10" />
      </motion.div>

      {/* Content Layer */}
      <motion.div
        style={{ y: shouldReduceMotion ? 0 : contentY }}
        className="relative z-10 w-full max-w-[700px] mx-auto px-container flex flex-col items-center text-center mt-[10vh]" // Shifted slightly below center (55% from top)
      >
        {/* Gold Ornament */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, ease: animations.easings.luxuryOut }}
          className="text-brand-gold-500 mb-6 flex items-center justify-center gap-4 origin-center"
        >
          <div className="w-8 h-[1px] bg-brand-gold-500/50" />
          <span className="text-xl">✦</span>
          <div className="w-8 h-[1px] bg-brand-gold-500/50" />
        </motion.div>

        {/* Overline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-accent text-overline text-brand-gold-400 tracking-[0.2em] uppercase mb-4"
        >
          {heroContent.overline}
        </motion.h2>

        {/* Main Title */}
        <h1 className="font-heading text-display-2 md:text-[clamp(3.5rem,6vw,5.5rem)] text-white font-light leading-[1.1] mb-6 flex flex-col items-center">
          <motion.span
            initial={shouldReduceMotion ? { opacity: 0 } : { clipPath: 'inset(100% 0 0 0)' }}
            animate={shouldReduceMotion ? { opacity: 1 } : { clipPath: 'inset(0% 0 0 0)' }}
            transition={{ duration: 1.2, delay: 0.4, ease: animations.easings.luxuryOut }}
            className="block"
          >
            {heroContent.titleLine1}
          </motion.span>
          <motion.span
            initial={shouldReduceMotion ? { opacity: 0 } : { clipPath: 'inset(100% 0 0 0)' }}
            animate={shouldReduceMotion ? { opacity: 1 } : { clipPath: 'inset(0% 0 0 0)' }}
            transition={{ duration: 1.2, delay: 0.6, ease: animations.easings.luxuryOut }}
            className="block italic"
          >
            {heroContent.titleLine2}
          </motion.span>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="font-body text-body-lg text-brand-cream-300 max-w-[500px] leading-[1.6] mb-10 hidden sm:block"
        >
          {heroContent.subtitle}
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="font-body text-body text-brand-cream-300 max-w-[500px] leading-[1.6] mb-10 sm:hidden"
        >
          {heroContent.subtitle.split(',')[0]} {/* Shorter for mobile */}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          {/* Primary CTA */}
          <Link
            href={heroContent.ctaPrimary.href}
            className="group relative overflow-hidden bg-white text-brand-black-950 px-8 py-4 w-full sm:w-auto flex items-center justify-center font-accent text-overline tracking-[0.1em] hover:text-brand-black-950 transition-colors duration-300"
          >
            <span className="absolute inset-0 bg-brand-gold-500 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-[0.16,1,0.3,1]" />
            <span className="relative z-10 font-semibold">{heroContent.ctaPrimary.label}</span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1, delay: 1.5 }}
        whileHover={{ opacity: 1 }}
        onClick={handleScrollDown}
        aria-label="Défiler vers le bas"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-brand-gold-500 flex flex-col items-center"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-brand-gold-500/0 to-brand-gold-500 overflow-hidden relative">
          <motion.div
            animate={{ y: [0, 48, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-full h-1/2 bg-brand-gold-400 absolute top-0"
          />
        </div>
      </motion.button>
    </motion.section>
  );
}