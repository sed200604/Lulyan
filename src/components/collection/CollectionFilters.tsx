'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import { FILTER_STYLES, FILTER_COLORS, FILTER_SORT } from '@/lib/constants';

interface CollectionFiltersProps {
  filters?: FilterState;
  updateFilter?: (key: keyof FilterState, value: unknown) => void;
  resetFilters?: () => void;
  isMobile?: boolean;
  productCount?: number;
  isOpen?: boolean;
  onClose?: () => void;
  onFilterChange?: (filters: FilterState) => void;
}

export interface FilterState {
  categories: string[];
  sizes: string[];
  colors: string[];
  price: [number, number];
  uv: boolean;
  inStock: boolean;
  style?: string;
  color?: string;
  sort?: string;
}

export default function CollectionFilters({ onFilterChange }: CollectionFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    style: 'all',
    color: 'all',
    sort: 'featured',
    categories: [],
    sizes: [],
    colors: [],
    price: [39, 249],
    uv: false,
    inStock: false,
  });
  const [isOpen, setIsOpen] = useState(false);

  const updateFilter = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  return (
    <div className="mb-8 md:mb-12">
      {/* Header avec compteur */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-xs font-montserrat tracking-[0.2em] text-neutral-500 uppercase">
          8 pièces
        </p>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-xs font-montserrat tracking-[0.2em] uppercase hover:text-gold-500 transition-colors md:hidden"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filtrer
        </button>
      </div>

      {/* Filtres desktop (toujours visibles) */}
      <div className="hidden md:flex items-center gap-8 border-b border-neutral-200 pb-4">
        {/* Filtre Style */}
        <FilterDropdown
          label="Style"
          options={FILTER_STYLES}
          value={filters.style ?? 'all'}
          onChange={(v) => updateFilter('style', v)}
        />

        {/* Filtre Couleur */}
        <FilterDropdown
          label="Couleur"
          options={FILTER_COLORS}
          value={filters.color ?? 'all'}
          onChange={(v) => updateFilter('color', v)}
        />

        {/* Spacer */}
        <div className="flex-1" />

        {/* Tri */}
        <FilterDropdown
          label="Trier par"
          options={FILTER_SORT}
          value={filters.sort ?? 'featured'}
          onChange={(v) => updateFilter('sort', v)}
        />
      </div>

      {/* Filtres mobile (panneau slide) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden md:hidden"
          >
            <div className="py-4 space-y-4 border-b border-neutral-200">
              {FILTER_STYLES.map((option) => (
                <button
                  key={option.value}
                  onClick={() => updateFilter('style', option.value)}
                  className={`block text-sm font-montserrat ${
                    filters.style === option.value ? 'text-gold-500' : 'text-neutral-600'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Composant dropdown réutilisable
function FilterDropdown({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const selected = options.find((o) => o.value === value);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-xs font-montserrat tracking-[0.15em] uppercase text-neutral-700 hover:text-gold-500 transition-colors"
      >
        {label}: {selected?.label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="absolute top-full left-0 mt-2 bg-white shadow-lg border border-neutral-100 z-50 min-w-[180px]"
          >
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => { onChange(option.value); setIsOpen(false); }}
                className={`block w-full text-left px-4 py-2.5 text-xs font-montserrat tracking-wider ${
                  value === option.value
                    ? 'text-gold-500 bg-gold-500/5'
                    : 'text-neutral-600 hover:bg-neutral-50'
                }`}
              >
                {option.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}