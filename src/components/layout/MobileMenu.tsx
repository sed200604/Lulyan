'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Heart, User, Smartphone } from 'lucide-react';
import { useUIStore } from '@/stores/uiStore';
import { useLockScroll } from '@/hooks/useLockScroll';
import { NAVIGATION, SECONDARY_NAV, ROUTES, SITE_CONFIG } from '@/lib/constants';

const animations = {
  overlay: {
    initial: { x: '-100%' },
    animate: { x: 0 },
    exit: { x: '-100%' },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export function MobileMenu() {
  const { isMobileMenuOpen, closeMobileMenu, openSearch } = useUIStore();
  
  useLockScroll(isMobileMenuOpen);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMobileMenu();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [closeMobileMenu]);

  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Menu principal"
          {...animations.overlay}
          className="fixed inset-0 z-50 bg-brand-cream-50 flex flex-col w-full h-full lg:hidden"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between h-[60px] px-container border-b border-brand-gold-200/30">
            <button
              onClick={closeMobileMenu}
              className="p-2 -ml-2 text-brand-black-600 hover:text-brand-gold-500 transition-colors"
              aria-label="Fermer le menu"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>
            <Link
              href="/"
              onClick={closeMobileMenu}
              className="font-heading text-heading-3 font-semibold text-brand-black-600"
            >
              LULIYANE PARIS
            </Link>
            <div className="w-9" /> {/* Spacer for centering */}
          </div>

          <div className="flex-1 overflow-y-auto px-container py-8 flex flex-col">
            
            <motion.div className="space-y-1">
              {/* Lien vedette : la collection */}
              <motion.div
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, ease: [0.25, 0.1, 0, 1] }}
              >
                <Link
                  href={ROUTES.COLLECTION}
                  className="block py-4 text-2xl font-cormorant text-brand-gold-500 border-b border-brand-gold-500/20"
                  onClick={closeMobileMenu}
                >
                  {SITE_CONFIG.collectionName}
                  <span className="block text-xs font-montserrat tracking-[0.3em] text-brand-gold-500/60 mt-1">
                    {SITE_CONFIG.collectionTagline}
                  </span>
                </Link>
              </motion.div>

              {/* Autres liens nav */}
              {NAVIGATION.filter(item => item.href !== ROUTES.COLLECTION).map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ x: -40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.08, ease: [0.25, 0.1, 0, 1] }}
                >
                  <Link
                    href={item.href}
                    className="block py-3 text-lg font-montserrat tracking-wider"
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Section secondaire */}
            <div className="mt-8 pt-8 border-t border-brand-black-950/10">
              {SECONDARY_NAV.map((item) => (
                <Link key={item.href} href={item.href} className="block py-2 text-sm text-brand-black-600/80 hover:text-brand-gold-500" onClick={closeMobileMenu}>
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Utilities */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col gap-6 pt-8 border-t border-brand-gold-200/50 mt-auto"
            >
              <button
                onClick={() => {
                  closeMobileMenu();
                  openSearch();
                }}
                className="flex items-center gap-3 font-body text-body text-brand-black-600 hover:text-brand-gold-500"
              >
                <Search className="w-5 h-5" strokeWidth={1.5} /> Rechercher
              </button>
              <Link
                href="/account/wishlist"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 font-body text-body text-brand-black-600 hover:text-brand-gold-500"
              >
                <Heart className="w-5 h-5" strokeWidth={1.5} /> Wishlist
              </Link>
              <Link
                href="/account"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 font-body text-body text-brand-black-600 hover:text-brand-gold-500"
              >
                <User className="w-5 h-5" strokeWidth={1.5} /> Mon Compte
              </Link>
            </motion.div>

            {/* Social & Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-between mt-12 pt-8 border-t border-brand-gold-200/50"
            >
              <div className="flex items-center gap-4 text-brand-black-600">
                <a
                  href={SITE_CONFIG.social?.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Suivez LULIYANE PARIS sur Instagram"
                  className="font-body text-body text-brand-black-600 hover:text-brand-gold-500 transition-colors"
                >
                  Instagram
                </a>
                <a
                  href={SITE_CONFIG.social?.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Suivez LULIYANE PARIS sur TikTok"
                  className="hover:text-brand-gold-500 transition-colors"
                >
                  <Smartphone className="w-5 h-5" strokeWidth={1.5} />
                </a>
              </div>
              <span className="font-body text-caption text-brand-black-400">
                © {new Date().getFullYear()} LULIYANE PARIS
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}