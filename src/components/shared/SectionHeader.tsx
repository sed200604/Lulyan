'use client';

import { motion } from 'framer-motion';
import { animations } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  overline?: string;
  title: string;
  subtitle?: string;
  ornament?: boolean;
  align?: 'center' | 'left';
  theme?: 'light' | 'dark';
}

export function SectionHeader({
  overline,
  title,
  subtitle,
  ornament = true,
  align = 'center',
  theme = 'light',
}: SectionHeaderProps) {
  const isDark = theme === 'dark';

  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: '100px' }}
      className={cn(
        'flex flex-col',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        'mb-12 md:mb-16'
      )}
    >
      {(overline || ornament) && (
        <motion.div
          variants={animations.fadeUp}
          className="flex flex-col items-center gap-4 mb-4"
        >
          {overline && (
            <span
              className={cn(
                'font-accent text-overline tracking-[0.2em] uppercase',
                isDark ? 'text-brand-gold-400' : 'text-brand-gold-500'
              )}
            >
              {overline}
            </span>
          )}
          {ornament && (
            <div className={cn('flex items-center justify-center gap-4', isDark ? 'text-brand-gold-400' : 'text-brand-gold-500')}>
              <div className="w-8 h-[1px] bg-current opacity-50" />
              <span className="text-xl">✦</span>
              <div className="w-8 h-[1px] bg-current opacity-50" />
            </div>
          )}
        </motion.div>
      )}

      <motion.h2
        variants={animations.fadeUp}
        className={cn(
          'font-heading text-heading-2 md:text-display-2 font-light leading-tight mb-2',
          isDark ? 'text-white' : 'text-brand-black-600'
        )}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          variants={animations.fadeUp}
          className={cn(
            'font-body text-body-lg max-w-[600px] leading-[1.6]',
            isDark ? 'text-brand-cream-300' : 'text-brand-black-400'
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}