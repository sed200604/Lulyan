'use client';

import { FilterState } from './CollectionFilters';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ActiveFiltersProps {
  filters: FilterState;
  updateFilter: (key: keyof FilterState, value: unknown) => void;
  resetFilters: () => void;
}

export function ActiveFilters({ filters, updateFilter, resetFilters }: ActiveFiltersProps) {
  const activeItems: { key: keyof FilterState; value: string; display: string }[] = [];

  filters.categories.forEach(c => activeItems.push({ key: 'categories', value: c, display: c }));
  filters.sizes.forEach(s => activeItems.push({ key: 'sizes', value: s, display: `Taille: ${s}` }));
  filters.colors.forEach(c => activeItems.push({ key: 'colors', value: c, display: `Couleur: ${c}` }));
  
  if (filters.price[0] > 39 || filters.price[1] < 249) {
    activeItems.push({ key: 'price', value: 'price', display: `${filters.price[0]}€ - ${filters.price[1]}€` });
  }
  if (filters.uv) activeItems.push({ key: 'uv', value: 'uv', display: 'UPF 50+' });
  if (filters.inStock) activeItems.push({ key: 'inStock', value: 'inStock', display: 'En stock' });

  if (activeItems.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <AnimatePresence>
        {activeItems.map((item) => (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            key={`${item.key}-${item.value}`}
            onClick={() => {
              if (item.key === 'price') updateFilter('price', [39, 249]);
              else if (item.key === 'uv') updateFilter('uv', false);
              else if (item.key === 'inStock') updateFilter('inStock', false);
              else {
                const arr = filters[item.key] as string[];
                updateFilter(item.key, arr.filter(v => v !== item.value));
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1 bg-brand-cream-100 border border-brand-cream-300 rounded-full font-sans text-body-sm text-brand-black-400 hover:text-brand-black-500 hover:border-brand-black-200 transition-colors group"
          >
            <span>{item.display}</span>
            <X className="w-3 h-3 group-hover:text-brand-gold-500 transition-colors" />
          </motion.button>
        ))}
      </AnimatePresence>
      
      {activeItems.length > 1 && (
        <button
          onClick={resetFilters}
          className="text-body-sm font-sans text-brand-black-400 underline underline-offset-4 hover:text-brand-gold-500 transition-colors ml-2"
        >
          Tout effacer
        </button>
      )}
    </div>
  );
}
