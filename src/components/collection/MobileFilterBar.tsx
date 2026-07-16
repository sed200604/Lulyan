'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

import { SortOption } from './CollectionSort';

interface MobileFilterBarProps {
  activeFilterCount: number;
  onOpenFilters: () => void;
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'NOUVEAUTÉS' },
  { value: 'popular', label: 'MEILLEURES VENTES' },
  { value: 'price-asc', label: 'PRIX CROISSANT' },
  { value: 'price-desc', label: 'PRIX DÉCROISSANT' },
  { value: 'rating', label: 'MIEUX NOTÉS' },
];

export function MobileFilterBar({ activeFilterCount, onOpenFilters, currentSort, onSortChange }: MobileFilterBarProps) {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);
  const [prevCount, setPrevCount] = useState(activeFilterCount);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (activeFilterCount !== prevCount) {
      setPulse(true);
      setTimeout(() => setPulse(false), 320);
      setPrevCount(activeFilterCount);
    }
  }, [activeFilterCount, prevCount]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentSortLabel = SORT_OPTIONS.find(o => o.value === currentSort)?.label || 'NOUVEAUTÉS';

  return (
    <div className="md:hidden sticky top-[48px] z-[40] bg-[#FAF7F2] border-b border-[#1A1A1A]/10 h-[52px] px-5 flex items-center justify-between">
      {/* Filter Button */}
      <button 
        onClick={onOpenFilters}
        className="flex items-center gap-2 font-sans text-[11px] font-normal tracking-[0.24em] uppercase text-[#1A1A1A]"
        aria-expanded="false"
      >
        <svg viewBox="0 0 14 14" fill="none" stroke="#C5A14E" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="w-[14px] h-[14px]">
          <path d="M12.8333 1.75H1.16667L5.83333 7.23333V11.0833L8.16667 12.25V7.23333L12.8333 1.75Z"/>
        </svg>
        FILTRER
        {activeFilterCount > 0 && (
          <motion.span 
            animate={pulse ? { scale: [1.0, 1.25, 1.0], color: ['#C5A14E', '#E8D9A8', '#C5A14E'] } : {}}
            transition={{ duration: 0.32, ease: [0.34, 1.56, 0.64, 1] }}
            className="w-4 h-4 rounded-full bg-[#C5A14E] text-[#1A1A1A] flex items-center justify-center text-[9px] font-medium"
          >
            {activeFilterCount}
          </motion.span>
        )}
      </button>

      {/* Sort Dropdown */}
      <div className="relative" ref={sortRef}>
        <button
          onClick={() => setIsSortOpen(!isSortOpen)}
          className="flex items-center gap-[6px] bg-transparent border-none p-1 font-sans text-[11px] font-normal tracking-[0.24em] uppercase text-[#1A1A1A]"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={isSortOpen}
        >
          TRIER : {currentSortLabel}
          <motion.div
            animate={{ rotate: isSortOpen ? 180 : 0 }}
            transition={{ duration: 0.24 }}
          >
            <ChevronDown className="w-[10px] h-[10px] text-[#C5A14E]" strokeWidth={2} />
          </motion.div>
        </button>

        <AnimatePresence>
          {isSortOpen && (
            <motion.div
              initial={{ opacity: 0, scaleY: 0.85, y: -4 }}
              animate={{ opacity: 1, scaleY: 1, y: 0 }}
              exit={{ opacity: 0, scaleY: 0.85, y: -4 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              style={{ originY: 0, originX: 1 }}
              className="absolute top-full right-0 mt-2 min-w-[240px] bg-white border border-[#C5A14E]/30 shadow-[0_12px_32px_rgba(0,0,0,0.12)] z-50 py-2"
            >
              {SORT_OPTIONS.map((option, idx) => (
                <motion.button
                  key={option.value}
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.2 }}
                  onClick={() => {
                    onSortChange(option.value);
                    setIsSortOpen(false);
                  }}
                  className={`w-full flex items-center gap-[10px] px-[18px] py-[12px] font-sans text-[12px] font-normal tracking-[0.04em] text-left hover:bg-[#C5A14E]/[0.04] transition-colors ${
                    currentSort === option.value ? 'bg-[#C5A14E]/[0.08] text-[#C5A14E]' : 'text-[#1A1A1A]'
                  }`}
                >
                  {currentSort === option.value ? (
                    <Check className="w-[10px] h-[10px]" strokeWidth={3} />
                  ) : (
                    <div className="w-[10px] h-[10px]" />
                  )}
                  {option.label}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
