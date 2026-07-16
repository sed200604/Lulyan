'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search } from 'lucide-react';
import { useUIStore } from '@/stores/uiStore';
import { useLockScroll } from '@/hooks/useLockScroll';
import { animations } from '@/lib/animations';
import { trackEvent } from '@/lib/meta-capi';

const POPULAR_SEARCHES = ['Burkini noir', 'Burkini Glamour', 'Burkini Sport', 'Nouvelle collection'];
const QUICK_LINKS = [
  { label: 'Glamour', href: '/collections/burkini-glamour', image: '/images/collections/BURKINI GLAMOUR.webp' },
  { label: 'Paréo', href: '/collections/burkini-pareo', image: '/images/collections/BURKINI PAREO.webp' },
  { label: 'Sport Chic', href: '/collections/burkini-sport-chic', image: '/images/collections/BURKINI SPORT CHIC.webp' },
  { label: 'Riviera', href: '/collections/riviera', image: '/images/collections/BURKINI GLAMOUR.webp' },
];

export function SearchOverlay() {
  const { isSearchOpen, closeSearch } = useUIStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchSubmit = (searchQuery: string) => {
    trackEvent('Search', { search_string: searchQuery });
    // In a real implementation, you might router.push('/search?q=' + searchQuery) here
  };

  useLockScroll(isSearchOpen);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSearch();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [closeSearch]);

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          role="search"
          aria-label="Recherche"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: animations.easings.luxuryOut }}
          className="fixed inset-0 z-50 bg-white/98 backdrop-blur-lg w-full h-full overflow-y-auto"
        >
          <button
            onClick={closeSearch}
            className="absolute top-6 right-6 p-2 text-brand-black-600 hover:text-brand-gold-500 transition-colors"
            aria-label="Fermer la recherche"
          >
            <X className="w-8 h-8" strokeWidth={1} />
          </button>

          <motion.div
            variants={animations.fadeUpSlow}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full max-w-4xl mx-auto px-container pt-32 pb-16"
          >
            <div className="relative mb-16">
              <Search className="absolute left-0 bottom-4 w-8 h-8 text-brand-gold-500" strokeWidth={1} />
              <input
                ref={inputRef}
                type="text"
                placeholder="Rechercher..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && query.trim()) {
                    handleSearchSubmit(query.trim());
                  }
                }}
                className="w-full bg-transparent border-0 border-b border-brand-gold-500 pl-12 pb-4 font-heading text-display-2 text-brand-black-600 focus:outline-none focus:ring-0 placeholder:text-brand-black-200"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Popular Searches */}
              <div>
                <h3 className="font-accent text-overline text-brand-black-400 tracking-[0.15em] mb-6">
                  RECHERCHES POPULAIRES
                </h3>
                <div className="flex flex-wrap gap-3">
                  {POPULAR_SEARCHES.map((term) => (
                    <button
                      key={term}
                      onClick={() => {
                        setQuery(term);
                        handleSearchSubmit(term);
                      }}
                      className="px-4 py-2 rounded-full bg-brand-gold-50 text-brand-gold-700 font-body text-body-sm hover:bg-brand-gold-100 transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              {/* Collections */}
              <div>
                <h3 className="font-accent text-overline text-brand-black-400 tracking-[0.15em] mb-6">
                  COLLECTIONS
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {QUICK_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeSearch}
                      className="group flex flex-col gap-3"
                    >
                      <div className="aspect-[3/4] bg-brand-cream-100 rounded-sm overflow-hidden relative">
                        {/* Placeholder for image */}
                        <div className="absolute inset-0 bg-brand-cream-200 group-hover:scale-105 transition-transform duration-700" />
                      </div>
                      <span className="font-heading text-body text-center text-brand-black-600 group-hover:text-brand-gold-500 transition-colors">
                        {link.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}