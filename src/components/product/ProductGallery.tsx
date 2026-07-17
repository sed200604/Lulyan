'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn } from 'lucide-react';
import dynamic from 'next/dynamic';
import { ProductImage } from '@/types/product';

const Lightbox = dynamic(() => import('@/components/product/Lightbox'), { ssr: false });

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const totalImages = images.length;

  // Handle mobile scroll sync with dots
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollPosition = scrollRef.current.scrollLeft;
    const width = scrollRef.current.clientWidth;
    const newIndex = Math.round(scrollPosition / width);
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
  };

  const scrollToIndex = (index: number) => {
    setCurrentIndex(index);
    if (scrollRef.current) {
      const width = scrollRef.current.clientWidth;
      scrollRef.current.scrollTo({
        left: width * index,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="w-full">
      {/* ─── DESKTOP GALLERY ─── */}
      <div className="hidden md:flex gap-4">
        {/* Thumbnails (Vertical) */}
        <div className="flex flex-col gap-4 w-[80px] flex-shrink-0 max-h-[800px] overflow-y-auto scrollbar-hide">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`relative w-[80px] h-[107px] transition-all duration-300 border-2 ${
                i === currentIndex ? 'border-brand-gold-500' : 'border-transparent hover:border-brand-gold-500/50'
              }`}
              aria-label={`Vue ${i + 1}`}
            >
              <Image
                src={img.src}
                alt={`Miniature ${i + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>

        {/* Main Image */}
        <div 
          className="relative flex-1 bg-neutral-50 cursor-zoom-in group overflow-hidden"
          onClick={() => setIsLightboxOpen(true)}
        >
          <div className="aspect-[3/4] relative w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={currentIndex === 0 ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <Image
                  src={images[currentIndex]?.src || ''}
                  alt={`${productName} - vue ${currentIndex + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 55vw"
                  priority={currentIndex === 0}
                  loading={currentIndex === 0 ? 'eager' : 'lazy'}
                  quality={85}
                />
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Hover Zoom Icon */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 p-2 rounded-full backdrop-blur-sm">
            <ZoomIn className="w-5 h-5 text-neutral-900" />
          </div>
        </div>
      </div>

      {/* ─── MOBILE GALLERY ─── */}
      <div className="md:hidden relative">
        <div 
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          ref={scrollRef}
          onScroll={handleScroll}
        >
          {images.map((img, i) => (
            <div 
              key={i} 
              className="w-full flex-shrink-0 snap-center relative aspect-[3/4]"
              onDoubleClick={() => setIsLightboxOpen(true)}
            >
              <Image
                src={img.src}
                alt={`${productName} - vue ${i + 1}`}
                fill
                className="object-cover"
                sizes="100vw"
                priority={i === 0}
                loading={i === 0 ? 'eager' : 'lazy'}
                quality={85}
              />
            </div>
          ))}
        </div>
        
        {/* Counter badge */}
        <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-white text-xs font-montserrat tracking-wider">
            {String(currentIndex + 1).padStart(2, '0')} / {String(totalImages).padStart(2, '0')}
          </span>
        </div>
        
        {/* Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === currentIndex 
                  ? 'bg-brand-gold-500 w-6' 
                  : 'bg-neutral-300'
              }`}
              aria-label={`Image ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {isLightboxOpen && (
        <Lightbox 
          images={images}
          initialIndex={currentIndex}
          onClose={() => setIsLightboxOpen(false)}
        />
      )}
    </div>
  );
}