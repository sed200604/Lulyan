'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { FilterState } from './CollectionFilters';

interface MobileActiveFiltersProps {
  filters: FilterState;
  updateFilter: (key: keyof FilterState, value: unknown) => void;
  resetFilters: () => void;
}

export function MobileActiveFilters({ filters, updateFilter, resetFilters }: MobileActiveFiltersProps) {
  const activeChips: { id: string; label: string; onRemove: () => void }[] = [];

  filters.categories.forEach(cat => {
    activeChips.push({
      id: `cat-${cat}`,
      label: cat,
      onRemove: () => updateFilter('categories', filters.categories.filter(c => c !== cat))
    });
  });

  filters.colors.forEach(col => {
    activeChips.push({
      id: `col-${col}`,
      label: col,
      onRemove: () => updateFilter('colors', filters.colors.filter(c => c !== col))
    });
  });

  filters.sizes.forEach(size => {
    activeChips.push({
      id: `size-${size}`,
      label: `TAILLE ${size}`,
      onRemove: () => updateFilter('sizes', filters.sizes.filter(s => s !== size))
    });
  });

  if (filters.price[0] > 39 || filters.price[1] < 249) {
    activeChips.push({
      id: `price`,
      label: `${filters.price[0]} € - ${filters.price[1]} €`,
      onRemove: () => updateFilter('price', [39, 249])
    });
  }

  if (filters.uv) {
    activeChips.push({
      id: `uv`,
      label: 'PROTECTION UV',
      onRemove: () => updateFilter('uv', false)
    });
  }

  if (filters.inStock) {
    activeChips.push({
      id: `instock`,
      label: 'EN STOCK',
      onRemove: () => updateFilter('inStock', false)
    });
  }

  if (activeChips.length === 0) return null;

  return (
    <div className="md:hidden bg-[#FAF7F2] px-5 py-3 flex gap-2 overflow-x-auto no-scrollbar items-center w-full">
      <AnimatePresence mode="popLayout">
        {activeChips.map((chip) => (
          <motion.div
            key={chip.id}
            layout
            initial={{ opacity: 0, x: -12, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 12, scale: 0.92 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="flex-shrink-0 inline-flex items-center gap-2 bg-[#1A1A1A] text-[#E8D9A8] px-3 py-1.5 rounded-none font-sans text-[10px] font-normal tracking-[0.16em] uppercase"
          >
            {chip.label}
            <button 
              onClick={chip.onRemove} 
              className="p-1 -mr-1"
              aria-label={`Retirer le filtre ${chip.label}`}
            >
              <X className="w-2 h-2" style={{ strokeWidth: 1.25 }} />
            </button>
          </motion.div>
        ))}
        
        {activeChips.length > 0 && (
          <motion.button
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetFilters}
            className="flex-shrink-0 bg-transparent text-[#C5A14E] px-1 py-1.5 font-sans text-[10px] font-normal tracking-[0.32em] uppercase hover:underline"
          >
            EFFACER TOUS
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
