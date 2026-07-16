'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { animations } from '@/lib/animations';

export function DesktopBurkiniExpertise() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  return (
    <section ref={containerRef} className="py-section bg-brand-cream-50 overflow-hidden hidden md:block">
      <div className="w-full max-w-7xl mx-auto px-container flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-24">
        
        {/* Right: Image with Parallax */}
        <div className="w-full lg:w-1/2 relative aspect-[4/5] lg:aspect-[3/4] overflow-hidden bg-brand-cream-100">
          <motion.div
            initial={{ clipPath: 'inset(100% 0 0 0)' }}
            whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.2, ease: animations.easings.luxuryOut as [number, number, number, number] }}
            className="absolute inset-0 w-full h-full"
          >
            <motion.div style={{ y: imageY }} className="absolute inset-0 w-full h-[110%] -top-[5%]">
              <Image
                src="https://images.unsplash.com/photo-1574015974293-817f0ebebb74?q=80&w=1200&auto=format&fit=crop"
                alt="Expertise Burkini LULIYANE PARIS"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Left: Content */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={animations.staggerContainer}
          className="w-full lg:w-1/2 flex flex-col items-start"
        >
          <motion.div variants={animations.fadeUp} className="flex flex-col gap-4 mb-8">
            <h2 className="font-heading text-heading-2 md:text-display-2 text-brand-black-600 uppercase tracking-wide leading-tight">
              NOTRE EXPERTISE BURKINI
            </h2>
            <div className="flex items-center gap-4 text-brand-gold-500">
              <div className="w-12 h-[1px] bg-current opacity-50" />
              <span className="text-xl">✦</span>
              <div className="w-12 h-[1px] bg-current opacity-50" />
            </div>
          </motion.div>

          <motion.p
            variants={animations.fadeUp}
            className="font-body text-body-lg text-brand-black-400 max-w-[500px] leading-[1.8] mb-10"
          >
            Nous maîtrisons l&apos;art du burkini parfait. Conçues avec des tissus premium, nos créations garantissent une protection UPF 50+, une résistance absolue au chlore, et un drapé impeccable qui offre zéro transparence, même mouillé. L&apos;alliance ultime entre performance technique et esthétique de luxe.
          </motion.p>

          <motion.div variants={animations.fadeUp} className="mb-16">
            <Link
              href="/collections"
              className="group flex items-center justify-center border border-brand-gold-500 px-8 py-4 text-brand-gold-600 font-accent text-overline tracking-[0.1em] hover:bg-brand-gold-500 hover:text-white transition-colors duration-300"
            >
              DÉCOUVRIR NOS CRÉATIONS
              <span className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}
