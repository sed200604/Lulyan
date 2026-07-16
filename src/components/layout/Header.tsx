'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Heart, User, ShoppingBag, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { useUIStore } from '@/stores/uiStore';
import { useCartStore } from '@/stores/cartStore';
import { NAVIGATION } from '@/lib/constants';

import { PromoStrip } from '@/components/layout/PromoStrip';

export function Header() {
  const { scrollDirection, isScrolled } = useScrollDirection();
  const { openMobileMenu, openSearch, isMobileMenuOpen } = useUIStore();
  const { totalItems, setIsOpen: openCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  // Cart and Wishlist counts (mocked for now, connect to stores later)
  const cartCount = totalItems();
  const wishlistCount = 0;

  useEffect(() => {
    setMounted(true);

    if (isHomePage) {
      const handleScroll = () => {
        // Hero is ~100vh - 60px. Let's transition slightly before it leaves completely
        setIsPastHero(window.scrollY > window.innerHeight - 100);
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); // init
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      setIsPastHero(true); // always solid on other pages
    }
  }, [isHomePage]);

  const hideHeader = scrollDirection === 'down' && isScrolled && isPastHero;
  const compactHeader = isScrolled && !hideHeader && isPastHero;

  // Determine header styling mode
  const useGlassMode = isHomePage && !isPastHero;
  
  const headerBgClass = useGlassMode 
    ? 'bg-black/15 backdrop-blur-md border-b border-white/10' 
    : isScrolled ? 'bg-white/95 backdrop-blur-md shadow-medium' : 'bg-transparent';
    
  const textColorClass = useGlassMode ? 'text-white' : 'text-brand-black-600';
  const hoverColorClass = useGlassMode ? 'hover:text-white/80' : 'hover:text-brand-gold-500';

  return (
    <header
      role="banner"
      className={cn(
        'fixed top-0 z-40 w-full transition-all duration-400 ease-out flex flex-col',
        headerBgClass,
        hideHeader ? '-translate-y-full' : 'translate-y-0'
      )}
    >
      <PromoStrip />
      {/* Mobile Header (< lg) */}
      <div 
        className={cn(
          "lg:hidden flex items-center justify-between px-container transition-all duration-300 ease-out",
          isScrolled ? "h-[48px] bg-[#FAF7F2] shadow-sm" : "h-[64px]"
        )}
      >
        <button
          onClick={openMobileMenu}
          className={cn('p-2 -ml-2 transition-colors', textColorClass, hoverColorClass)}
          aria-label="Menu"
          aria-expanded={isMobileMenuOpen}
        >
          <Menu className="w-5 h-5" strokeWidth={1.5} />
        </button>

        <Link
          href="/"
          className={cn("font-heading text-heading-3 font-semibold tracking-wide", textColorClass)}
          aria-label="LULIYANE PARIS — Accueil"
        >
          LULIYANE PARIS
        </Link>

        <div className="flex items-center gap-4">
          <button
            onClick={() => openCart(true)}
            className={cn("relative p-2 -mr-2 transition-colors group", textColorClass, hoverColorClass)}
            aria-label={`Panier (${cartCount} articles)`}
          >
            <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
            {mounted && cartCount > 0 && (
              <motion.span
                key={cartCount}
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                className="absolute top-1 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-brand-gold-500 text-[10px] text-white font-medium group-hover:scale-110 transition-transform"
              >
                {cartCount}
              </motion.span>
            )}
          </button>
        </div>
      </div>

      {/* Desktop Header (lg+) */}
      <div className="hidden lg:flex flex-col w-full">
        {/* Row 1: Logo & Icons */}
        <div
          className={cn(
            'flex items-center justify-between px-container-lg transition-all duration-300 ease-out',
            compactHeader ? 'h-[70px]' : 'h-[80px]'
          )}
        >
          {/* Invisible placeholder for flex spacing */}
          <div className="flex-1" />

          {/* Centered Logo */}
          <Link
            href="/"
            className={cn(
              'font-heading font-semibold text-center transition-all duration-300',
              textColorClass,
              compactHeader ? 'text-heading-2' : 'text-display-2'
            )}
            aria-label="LULIYANE PARIS — Accueil"
          >
            LULIYANE<br className={cn('hidden', !compactHeader && 'block')} />
            {!compactHeader && <span className="block text-heading-3 mt-[-8px]">PARIS</span>}
            {compactHeader && ' PARIS'}
          </Link>

          {/* Icons */}
          <div className="flex-1 flex justify-end items-center gap-6">
            <button
              onClick={openSearch}
              className={cn("transition-colors", textColorClass, hoverColorClass)}
              aria-label="Recherche"
            >
              <Search className="w-5 h-5" strokeWidth={1.5} />
            </button>
            <Link
              href="/account/wishlist"
              className={cn("relative transition-colors", textColorClass, hoverColorClass)}
              aria-label={`Wishlist (${wishlistCount} articles)`}
            >
              <Heart className="w-5 h-5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/account"
              className={cn("transition-colors", textColorClass, hoverColorClass)}
              aria-label="Mon compte"
            >
              <User className="w-5 h-5" strokeWidth={1.5} />
            </Link>
            <button
              onClick={() => openCart(true)}
              className={cn("relative transition-colors group", textColorClass, hoverColorClass)}
              aria-label={`Panier (${cartCount} articles)`}
            >
              <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
              {mounted && cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-brand-gold-500 text-[10px] text-white font-medium group-hover:scale-110 transition-transform"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>
          </div>
        </div>

        {/* Row 2: Navigation (Hidden when compacted) */}
        <div
          className={cn(
            'flex justify-center items-center overflow-hidden transition-all duration-300 ease-out',
            compactHeader ? 'h-0 opacity-0' : 'h-[40px] opacity-100'
          )}
        >
          <nav aria-label="Navigation principale" className="flex items-center gap-10">
            {NAVIGATION.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn("group relative py-2 font-accent text-body-sm tracking-[0.05em] uppercase transition-colors", 
                  textColorClass, hoverColorClass
                )}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-gold-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}