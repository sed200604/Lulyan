'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const MESSAGES = [
  'LULIYANE RIVIERA — La Riviera, Réinventée',
  'Livraison offerte en France',
  'Séchage rapide · Protection solaire · Résistant chlore',
  'Retours gratuits sous 30 jours',
];

export function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const dismissed = sessionStorage.getItem('announcementDismissed');
    if (dismissed === 'true') {
      setIsVisible(false);
    }
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isVisible]);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('announcementDismissed', 'true');
  };

  if (!isClient) return null; // Avoid hydration mismatch
  if (!isVisible) return null;

  return (
    <div className="relative h-[36px] w-full bg-brand-black-950 flex items-center justify-center z-50">
      <div 
        className="w-full h-full relative flex items-center justify-center overflow-hidden px-10"
        aria-live="polite"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute text-brand-gold-500 text-[0.625rem] sm:text-caption tracking-[0.15em] uppercase text-center w-full"
          >
            {MESSAGES[currentIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        onClick={handleDismiss}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-brand-gold-500/70 hover:text-brand-gold-500 transition-colors"
        aria-label="Fermer l'annonce"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}