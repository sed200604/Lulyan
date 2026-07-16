'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants';

export default function CollectionShowcase() {
  return (
    <section className="relative w-full aspect-[16/9] min-h-[600px] max-h-[800px] overflow-hidden flex items-end pb-16 md:pb-24">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/collections/Gemini_Generated_Image_2bq2bk2bq2bk2bq2.webp"
          alt="LULIYANE RIVIERA Collection"
          fill
          className="object-cover object-center"
          sizes="100vw"
          quality={80}
        />
        {/* Subtle bottom gradient to ensure text readability if needed */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center">
        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base md:text-lg font-montserrat text-white font-medium tracking-wide max-w-2xl mx-auto drop-shadow-md"
        >
          8 pièces élégantes, conçues à Paris. Séchage rapide, 
          protection solaire, confort absolu. La plage et la piscine 
          n'ont jamais été aussi chic.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8"
        >
          <Link
            href={ROUTES.COLLECTION}
            className="inline-block px-10 py-4 bg-brand-gold-500 text-white text-xs font-montserrat tracking-[0.3em] uppercase hover:bg-brand-black-950 transition-colors duration-500 shadow-md"
          >
            Découvrir la Collection
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
