'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { SITE_CONFIG } from '@/lib/constants';

export default function CollectionHero() {
  return (
    <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <Image
        src="/images/collections/e52edfb6-47a4-49d7-9b9f-90c2fb06720e.webp"
        alt={SITE_CONFIG.collectionName}
        fill
        className="object-cover"
        sizes="100vw"
        priority
        quality={80}
      />
    </section>
  );
}
