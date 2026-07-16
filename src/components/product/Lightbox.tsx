'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { ProductImage } from '@/types/product';

interface LightboxProps {
  images: ProductImage[];
  initialIndex: number;
  onClose: () => void;
}

export default function Lightbox({ images, initialIndex, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, next, prev]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm"
        onClick={onClose}
      >
        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10" onClick={e => e.stopPropagation()}>
          <div className="text-white font-montserrat tracking-widest text-sm">
            {currentIndex + 1} / {images.length}
          </div>
          <button 
            onClick={onClose}
            className="text-white hover:text-gold-500 transition-colors p-2"
          >
            <X className="w-8 h-8" />
          </button>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 p-2 text-white/50 hover:text-white transition-colors z-10"
        >
          <ChevronLeft className="w-12 h-12" />
        </button>
        
        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 p-2 text-white/50 hover:text-white transition-colors z-10"
        >
          <ChevronRight className="w-12 h-12" />
        </button>

        {/* Main Image Container */}
        <motion.div
          key={currentIndex}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative w-full h-full max-w-5xl max-h-[85vh] p-4 md:p-12 flex items-center justify-center"
          onClick={e => e.stopPropagation()}
        >
          <div className="relative w-full h-full">
            <Image
              src={images[currentIndex].src}
              alt={images[currentIndex].alt || 'Product view'}
              fill
              className="object-contain"
              sizes="100vw"
              priority
              quality={100}
            />
          </div>
        </motion.div>

        {/* Bottom Thumbnails */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4 px-4 z-10" onClick={e => e.stopPropagation()}>
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative w-16 h-24 border-2 transition-all ${
                idx === currentIndex ? 'border-gold-500 opacity-100' : 'border-transparent opacity-50 hover:opacity-100'
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt || 'Thumbnail'}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
