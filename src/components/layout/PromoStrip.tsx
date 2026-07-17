'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Cookies from 'js-cookie';

const MESSAGES = [
  "✦ LIVRAISON OFFERTE EN FRANCE",
  "✦ PAIEMENT EN 3X SANS FRAIS DISPONIBLE",
  "✦ RETOURS GRATUITS SOUS 30 JOURS"
];

export function PromoStrip() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    // Check if dismissed in cookie
    const isDismissed = Cookies.get('promo_dismissed');
    if (!isDismissed) {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    if (!isVisible || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isVisible, isPaused]);

  const handleDismiss = () => {
    setIsVisible(false);
    Cookies.set('promo_dismissed', 'true', { expires: 7 }); // 7 days
  };

  if (!isVisible) return null;

  return (
    <div 
      className="z-[100] h-[36px] bg-[#1A1A1A] overflow-hidden flex items-center justify-center relative"
      role="region"
      aria-label="Promotions en cours"
      aria-live="polite"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => {
        setTimeout(() => setIsPaused(false), 3000);
      }}
    >
      <div className="relative w-full h-full max-w-[90%] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ y: 36, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -36, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute flex items-center justify-center w-full"
          >
            <p className="font-sans text-[10px] font-normal tracking-[0.32em] uppercase text-[#C5A14E] text-center px-8 line-clamp-1">
              {MESSAGES[currentIndex]}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        onClick={handleDismiss}
        className="absolute right-[12px] top-1/2 -translate-y-1/2 p-1"
        aria-label="Fermer la promotion"
      >
        <X 
          className="w-[14px] h-[14px]" 
          style={{ color: 'rgba(232, 217, 168, 0.4)', strokeWidth: 1.25 }} 
        />
      </button>
    </div>
  );
}
