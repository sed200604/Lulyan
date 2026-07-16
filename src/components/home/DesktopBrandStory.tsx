'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useInView, animate } from 'framer-motion';
import { useEffect, useState } from 'react';
import { animations } from '@/lib/animations';

function AnimatedCounter({ from, to, duration = 2, suffix = '' }: { from: number; to: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(from);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      const controls = animate(from, to, {
        duration,
        ease: "easeOut",
        onUpdate(value) {
          setCount(Math.floor(value));
        },
      });
      return () => controls.stop();
    }
  }, [from, to, duration, isInView]);

  return <span ref={nodeRef}>{count}{suffix}</span>;
}

export function DesktopBrandStory() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  return (
    <section ref={containerRef} className="py-section bg-white overflow-hidden hidden md:block">
      <div className="w-full max-w-7xl mx-auto px-container flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
        
        {/* Left: Image with Parallax */}
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
                src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1200&auto=format&fit=crop"
                alt="Atelier LULIYANE PARIS"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Right: Content */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={animations.staggerContainer}
          className="w-full lg:w-1/2 flex flex-col items-start"
        >
          <motion.div variants={animations.fadeUp} className="flex flex-col gap-4 mb-8">
            <h2 className="font-heading text-heading-2 md:text-display-2 text-brand-black-600 uppercase tracking-wide leading-tight">
              L&apos;HISTOIRE DE LULIYANE
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
            Née à Paris, LULIYANE célèbre la femme moderne qui refuse de choisir entre
            élégance et pudeur. Nos burkinis allient le savoir-faire parisien à une qualité
            premium, pour une élégance absolue de la piscine aux rivages méditerranéens.
          </motion.p>

          <motion.div variants={animations.fadeUp} className="mb-16">
            <Link
              href="/about"
              className="group flex items-center justify-center border border-brand-gold-500 px-8 py-4 text-brand-gold-600 font-accent text-overline tracking-[0.1em] hover:bg-brand-gold-500 hover:text-white transition-colors duration-300"
            >
              NOTRE HISTOIRE
              <span className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-6 md:gap-12 w-full pt-8 border-t border-brand-cream-100">
            <motion.div variants={animations.fadeUp} className="flex flex-col gap-2">
              <div className="font-heading text-heading-2 text-brand-gold-500">
                <AnimatedCounter from={0} to={150} suffix="+" />
              </div>
              <div className="font-body text-body-sm text-brand-black-400 leading-tight">
                Créations<br />originales
              </div>
            </motion.div>

            <motion.div variants={animations.fadeUp} className="flex flex-col gap-2">
              <div className="font-heading text-heading-2 text-brand-gold-500">
                <AnimatedCounter from={0} to={98} suffix="%" />
              </div>
              <div className="font-body text-body-sm text-brand-black-400 leading-tight">
                Clientes<br />satisfaites
              </div>
            </motion.div>

            <motion.div variants={animations.fadeUp} className="flex flex-col gap-2">
              <div className="font-heading text-heading-2 text-brand-gold-500">
                <AnimatedCounter from={0} to={100} suffix="%" />
              </div>
              <div className="font-body text-body-sm text-brand-black-400 leading-tight">
                Qualité<br />testée
              </div>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
