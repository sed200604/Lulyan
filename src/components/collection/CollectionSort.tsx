'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'popular' | 'rating';

interface CollectionSortProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const OPTIONS: Record<SortOption, string> = {
  'newest': 'Nouveautés',
  'price-asc': 'Prix croissant',
  'price-desc': 'Prix décroissant',
  'popular': 'Meilleures ventes',
  'rating': 'Mieux notés',
};

export function CollectionSort({ value, onChange }: CollectionSortProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 font-sans text-body-sm text-brand-black-500 hover:text-brand-gold-500 transition-colors"
      >
        <span>Trier: {OPTIONS[value]}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40 lg:hidden" 
              onClick={() => setIsOpen(false)} 
            />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute right-0 top-full mt-2 w-48 bg-white border border-brand-cream-300 shadow-xl z-50 rounded-md overflow-hidden"
            >
              <div className="py-1">
                {(Object.entries(OPTIONS) as [SortOption, string][]).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => {
                      onChange(key);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 font-sans text-body-sm hover:bg-brand-cream-50 transition-colors ${
                      value === key ? 'text-brand-gold-500 font-medium' : 'text-brand-black-500'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}