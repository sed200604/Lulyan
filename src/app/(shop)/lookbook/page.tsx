'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { LOOKBOOK_DATA } from '@/data/lookbook';
import { products as ALL_PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { Product } from '@/types/product';

export default function LookbookPage() {
  const [season, setSeason] = useState('Été 2026');

  return (
    <div className="bg-brand-cream-50 min-h-screen">
      
      {/* Header (sticky or transparent) */}
      <header className="pt-32 pb-16 text-center px-container">
        <h1 className="font-cormorant text-4xl md:text-5xl lg:text-6xl text-brand-black-500 uppercase tracking-widest mb-6">
          Lookbook
        </h1>
        <div className="flex items-center justify-center gap-4 text-brand-gold-500 mb-8">
          <div className="w-12 h-[1px] bg-current opacity-70" />
          <span className="text-2xl">✦</span>
          <div className="w-12 h-[1px] bg-current opacity-70" />
        </div>
        
        {/* Season Selector */}
        <div className="inline-flex items-center border border-brand-black-200 rounded-full p-1 bg-white">
          <button 
            onClick={() => setSeason('Été 2026')}
            className={`px-6 py-2 rounded-full font-montserrat text-xs tracking-widest uppercase transition-colors ${
              season === 'Été 2026' ? 'bg-brand-black-500 text-white' : 'text-brand-black-400 hover:text-brand-black-500'
            }`}
          >
            Été 2026
          </button>
          <button 
            onClick={() => setSeason('Printemps 2026')}
            className={`px-6 py-2 rounded-full font-montserrat text-xs tracking-widest uppercase transition-colors ${
              season === 'Printemps 2026' ? 'bg-brand-black-500 text-white' : 'text-brand-black-400 hover:text-brand-black-500'
            }`}
          >
            Printemps 2026
          </button>
        </div>
      </header>

      {/* Looks */}
      <div className="flex flex-col">
        {LOOKBOOK_DATA.map((look, index) => {
          const fullscreenImg = look.images.find(img => img.layout === 'fullscreen');
          const detailImg = look.images.find(img => img.layout === 'detail');
          const mainImg = look.images.find(img => img.layout === 'main');
          
          const isEven = index % 2 === 0;
          const lookNumber = (index + 1).toString().padStart(2, '0');

          const relatedProducts = look.productIds
            .map(id => ALL_PRODUCTS.find((p: Product) => p.id === id))
            .filter(Boolean) as Product[];

          return (
            <section key={look.id} className="relative flex flex-col mb-24 md:mb-40">
              
              {/* Fullscreen Hero for the Look */}
              {fullscreenImg && (
                <div className="relative w-full h-[80vh] md:h-screen overflow-hidden">
                  <div className="absolute inset-0">
                    <Image
                      src={fullscreenImg.src}
                      alt={fullscreenImg.alt}
                      fill
                      sizes="100vw"
                      className="object-cover"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-black/30" />
                  </div>
                  
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className="max-w-2xl"
                    >
                      <span className="font-montserrat font-bold text-sm tracking-widest uppercase mb-4 block text-brand-gold-400">
                        LOOK {lookNumber}
                      </span>
                      <h2 className="font-cormorant text-4xl md:text-6xl lg:text-7xl mb-6 drop-shadow-md">
                        {look.name}
                      </h2>
                      <p className="font-montserrat text-sm md:text-base leading-relaxed mb-10 max-w-lg mx-auto opacity-90 drop-shadow-sm">
                        {look.description}
                      </p>
                      <a 
                        href={`#shop-${look.id}`}
                        className="inline-flex items-center gap-3 font-montserrat text-xs tracking-widest uppercase hover:text-brand-gold-400 transition-colors"
                      >
                        ACHETER CE LOOK <span className="text-brand-gold-400">→</span>
                      </a>
                    </motion.div>
                  </div>
                </div>
              )}

              {/* Split Layout for detail and main images */}
              {(detailImg && mainImg) && (
                <div className="max-w-[1600px] mx-auto w-full px-4 md:px-8 py-16 md:py-24">
                  <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                    
                    {isEven ? (
                      <>
                        <div className="w-full md:w-5/12 aspect-[3/4] relative overflow-hidden">
                          <Image src={detailImg.src} alt={detailImg.alt} fill sizes="(max-width: 767px) 100vw, 42vw" className="object-cover hover:scale-105 transition-transform duration-700" />
                        </div>
                        <div className="w-full md:w-7/12 aspect-[4/5] relative overflow-hidden">
                          <Image src={mainImg.src} alt={mainImg.alt} fill sizes="(max-width: 767px) 100vw, 58vw" className="object-cover hover:scale-105 transition-transform duration-700" />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-full md:w-7/12 aspect-[4/5] relative overflow-hidden order-2 md:order-1">
                          <Image src={mainImg.src} alt={mainImg.alt} fill sizes="(max-width: 767px) 100vw, 58vw" className="object-cover hover:scale-105 transition-transform duration-700" />
                        </div>
                        <div className="w-full md:w-5/12 aspect-[3/4] relative overflow-hidden order-1 md:order-2">
                          <Image src={detailImg.src} alt={detailImg.alt} fill sizes="(max-width: 767px) 100vw, 42vw" className="object-cover hover:scale-105 transition-transform duration-700" />
                        </div>
                      </>
                    )}

                  </div>
                </div>
              )}

              {/* Shoppable Products for this Look */}
              {relatedProducts.length > 0 && (
                <div id={`shop-${look.id}`} className="max-w-6xl mx-auto w-full px-container pt-8 border-t border-brand-black-100">
                  <div className="flex items-center gap-4 mb-12">
                    <h3 className="font-montserrat font-bold text-xs tracking-widest uppercase text-brand-black-500">
                      Acheter le look {lookNumber}
                    </h3>
                    <div className="h-[1px] flex-grow bg-brand-black-100" />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                    {relatedProducts.map(product => (
                      product && <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              )}

            </section>
          );
        })}
      </div>

    </div>
  );
}
