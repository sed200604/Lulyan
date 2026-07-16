'use client';

import { motion } from 'framer-motion';
import { animations } from '@/lib/animations';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedSection({ children, className = '', delay = 0 }: AnimatedSectionProps) {
  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
      variants={animations.fadeUp}
      transition={{ ...animations.fadeUp.transition, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
