'use client';

import { motion } from 'framer-motion';

interface LegalSectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

export function LegalSection({ id, title, children }: LegalSectionProps) {
  return (
    <motion.section 
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="mb-12 scroll-mt-32"
    >
      <h2 className="font-cormorant text-3xl text-brand-black-500 mb-6 pb-2 border-b border-brand-black-100">
        {title}
      </h2>
      <div className="font-montserrat text-base text-brand-black-400 leading-relaxed space-y-4">
        {children}
      </div>
    </motion.section>
  );
}
