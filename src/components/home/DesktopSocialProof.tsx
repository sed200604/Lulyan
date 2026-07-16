'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SITE_REVIEW_COUNT, SITE_RATING } from '@/lib/constants';

const TESTIMONIALS = [
  {
    id: 1,
    quote: "Le burkini le plus élégant que j'ai jamais porté. La qualité est exceptionnelle et la coupe parfaite.",
    author: "Amina K., Paris",
    product: "Burkini Riviera Noir",
    rating: 5,
  },
  {
    id: 2,
    quote: "J'ai enfin trouvé des burkinis qui respectent mes valeurs sans faire de compromis sur le style. Un vrai coup de cœur.",
    author: "Sarah L., Lyon",
    product: "Burkini Méditerranée",
    rating: 5,
  },
  {
    id: 3,
    quote: "Les finitions sont dignes d'une maison de haute couture. Le tissu sèche incroyablement vite.",
    author: "Yasmine B., Marseille",
    product: "Ensemble Burkini Côte",
    rating: 5,
  },
  {
    id: 4,
    quote: "Je me sens tellement confiante et belle à la plage maintenant. Merci Luliyane pour ces créations magnifiques.",
    author: "Nour M., Bruxelles",
    product: "Burkini Riviera Bleu",
    rating: 5,
  },
];

function StarIcon() {
  return (
    <svg className="w-5 h-5 fill-brand-gold-500 text-brand-gold-500" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

export function DesktopSocialProof() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 20 : -20,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 20 : -20,
      opacity: 0,
    }),
  };

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = TESTIMONIALS.length - 1;
      if (nextIndex >= TESTIMONIALS.length) nextIndex = 0;
      return nextIndex;
    });
  }, []);

  // Auto advance
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(timer);
  }, [paginate]);

  const currentTestimonial = TESTIMONIALS[currentIndex];

  return (
    <section className="hidden md:block py-section bg-white px-container overflow-hidden">
      <SectionHeader overline="CE QUE DISENT NOS CLIENTES" title="" ornament={true} />

      <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
        {/* Carousel Area */}
        <div className="relative w-full h-[280px] md:h-[220px] flex items-center justify-center">
          
          {/* Left Arrow (Desktop only) */}
          <button
            onClick={() => paginate(-1)}
            className="hidden md:flex absolute left-0 z-10 w-12 h-12 rounded-full border border-brand-gold-500 items-center justify-center text-brand-gold-500 hover:bg-brand-gold-500 hover:text-white transition-colors"
            aria-label="Avis précédent"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="w-full max-w-[700px] overflow-hidden relative h-full flex flex-col items-center justify-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center w-full px-4"
              >
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: currentTestimonial.rating }).map((_, i) => (
                    <StarIcon key={i} />
                  ))}
                </div>
                
                <blockquote className="font-heading text-heading-3 italic text-brand-black-600 mb-6 leading-relaxed">
                  &quot;{currentTestimonial.quote}&quot;
                </blockquote>
                
                <div className="flex flex-col items-center gap-1">
                  <span className="font-body text-body-sm text-brand-black-400">
                    — {currentTestimonial.author}
                  </span>
                  <span className="font-accent text-caption text-brand-gold-500 uppercase tracking-wider">
                    {currentTestimonial.product}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Arrow (Desktop only) */}
          <button
            onClick={() => paginate(1)}
            className="hidden md:flex absolute right-0 z-10 w-12 h-12 rounded-full border border-brand-gold-500 items-center justify-center text-brand-gold-500 hover:bg-brand-gold-500 hover:text-white transition-colors"
            aria-label="Avis suivant"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex gap-3 mt-8 mb-16">
          {TESTIMONIALS.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className="relative w-2 h-2 rounded-full transition-all duration-300"
              aria-label={`Aller à l'avis ${index + 1}`}
            >
              <span 
                className={cn(
                  "absolute inset-0 rounded-full border border-brand-gold-500 transition-colors duration-300",
                  index === currentIndex ? "bg-brand-gold-500" : "bg-transparent"
                )}
              />
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 md:gap-16 w-full max-w-2xl pt-12 border-t border-brand-cream-100 text-center">
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-1 font-heading text-heading-2 text-brand-gold-500">
              <span className="text-2xl mt-1">★</span> {SITE_RATING}/5
            </div>
            <span className="font-body text-body-sm text-brand-black-400">Note moyenne</span>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-1 font-heading text-heading-2 text-brand-gold-500">
              <span className="text-2xl mt-1">★</span> {SITE_REVIEW_COUNT}
            </div>
            <span className="font-body text-body-sm text-brand-black-400">Avis clients</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-1 font-heading text-heading-2 text-brand-gold-500">
              <span className="text-2xl mt-1">★</span> 98%
            </div>
            <span className="font-body text-body-sm text-brand-black-400">Recommandent</span>
          </div>
        </div>
      </div>
    </section>
  );
}
