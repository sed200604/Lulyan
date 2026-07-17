'use client';

import { useEffect, useState } from 'react';
import { Star, Check, Heart, Share2, Truck, RotateCcw, Shield, Droplets } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/types/product';
import { SITE_CONFIG } from '@/lib/constants';
import { formatEUR } from '@/lib/utils';
import dynamic from 'next/dynamic';
import { useCartStore } from '@/stores/cartStore';
import { trackViewContent, trackAddToCart } from '@/lib/pixel';

const ShareDrawer = dynamic(() => import('@/components/product/ShareDrawer'), { ssr: false });
const SizeGuideModal = dynamic(() => import('@/components/product/SizeGuideModal'), { ssr: false });
import { TrustBadge } from '@/components/checkout/TrustBadge';

interface ProductInfoProps {
  product: Product;
}

// Fonction utilitaire pour savoir si la couleur est claire (pour adapter la couleur du checkmark)
function isLightColor(hex: string) {
  const hexCode = hex.replace('#', '');
  const r = parseInt(hexCode.substr(0, 2), 16);
  const g = parseInt(hexCode.substr(2, 2), 16);
  const b = parseInt(hexCode.substr(4, 2), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    trackViewContent({
      sku: product.id,
      name: product.name,
      category: 'Apparel',
      price: product.price,
    });
  }, [product]);

  const scrollToReviews = () => {
    const section = document.getElementById('reviews');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      const sizeSelector = document.getElementById('size-selector');
      if (sizeSelector) {
        const y = sizeSelector.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
      return;
    }
    setSizeError(false);
    setIsAdding(true);
    
    addItem(product, selectedSize, selectedColor.name, 1);
    trackAddToCart({
      sku: product.id,
      name: product.name,
      category: 'Apparel',
      price: product.price,
      quantity: 1,
    });
    
    setTimeout(() => {
      setIsAdding(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full">
      {/* ─── EN-TÊTE PRODUIT ─── */}
      <span className="text-[10px] font-montserrat tracking-[0.4em] uppercase text-gold-500">
        {SITE_CONFIG.collectionName}
      </span>
      
      <h1 className="mt-2 text-3xl md:text-4xl font-cormorant font-light text-neutral-900 leading-tight">
        {product.name}
      </h1>
      
      {product.subtitle && (
        <p className="mt-1 text-sm font-montserrat text-neutral-500 italic">
          {product.subtitle}
        </p>
      )}
      
      <button 
        onClick={scrollToReviews}
        className="mt-3 flex items-center gap-2 group w-fit"
      >
        {product.reviewCount > 0 && (
          <div className="flex items-center gap-2 text-sm text-brand-black-600">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-3.5 h-3.5 ${i < Math.round(product.rating) ? 'text-gold-500' : 'text-neutral-200'}`} fill="currentColor" />
              ))}
            </div>
            <span className="text-xs font-montserrat text-neutral-500 group-hover:text-gold-500 transition-colors">
              {product.rating.toFixed(1)} ({product.reviewCount} avis)
            </span>
          </div>
        )}
      </button>

      {/* ─── PRIX ─── */}
      <div className="mt-4 flex items-baseline gap-3">
        <span className="text-2xl font-montserrat font-light text-neutral-900">
          {formatEUR(product.price)}
        </span>
        {product.compareAtPrice && (
          <span className="text-sm font-montserrat text-neutral-400 line-through">
            {formatEUR(product.compareAtPrice)}
          </span>
        )}
      </div>
      <p className="mt-1 text-xs font-montserrat text-neutral-500">
        Ou 3× {formatEUR(product.price / 3)} sans frais
      </p>

      {/* ─── SÉLECTEUR DE COULEUR ─── */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <span className="text-xs font-montserrat tracking-[0.15em] uppercase text-neutral-700">
            Couleur : <span className="text-neutral-900 font-medium">{selectedColor.name}</span>
          </span>
        </div>
        
        <div className="flex flex-wrap gap-3 mt-3">
          {product.colors.map((color) => (
            <button
              key={color.slug}
              onClick={() => setSelectedColor(color)}
              className={`relative w-10 h-10 rounded-full transition-all duration-300 ${
                selectedColor.slug === color.slug
                  ? 'ring-2 ring-gold-500 ring-offset-2'
                  : 'ring-1 ring-neutral-200 hover:ring-gold-500/50'
              }`}
              style={{ backgroundColor: color.value }}
              aria-label={color.name}
            >
              {selectedColor.slug === color.slug && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Check className={`w-4 h-4 ${
                    isLightColor(color.value) ? 'text-neutral-900' : 'text-white'
                  }`} />
                </motion.div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ─── SÉLECTEUR DE TAILLE ─── */}
      <div id="size-selector" className="mt-6">
        <div className="flex items-center justify-between">
          <span className="text-xs font-montserrat tracking-[0.15em] uppercase text-neutral-700">
            Taille : <span className="text-neutral-900 font-medium">{selectedSize || 'Choisir'}</span>
          </span>
          <button 
            onClick={() => setShowSizeGuide(true)}
            className="text-xs font-montserrat text-gold-500 underline underline-offset-4 hover:text-gold-600 transition-colors"
          >
            Guide des tailles
          </button>
        </div>
        
        <div className="grid grid-cols-4 md:grid-cols-5 gap-2 mt-3">
          {product.sizes.map((size) => (
            <button
              key={size.value}
              onClick={() => {
                setSelectedSize(size.value);
                setSizeError(false);
              }}
              disabled={!size.inStock}
              className={`py-3 text-xs font-montserrat tracking-wider border transition-all duration-300 ${
                selectedSize === size.value
                  ? 'border-gold-500 bg-gold-500 text-white'
                  : !size.inStock
                  ? 'border-neutral-100 text-neutral-300 bg-neutral-50 cursor-not-allowed opacity-50'
                  : 'border-neutral-200 text-neutral-700 hover:border-gold-500'
              }`}
            >
              {size.label}
            </button>
          ))}
        </div>
        
        {sizeError && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-xs text-red-500 font-montserrat"
          >
            Veuillez sélectionner une taille
          </motion.p>
        )}
      </div>

      {/* ─── ADD TO CART & ACTIONS ─── */}
      <div className="mt-8 space-y-3">
        <button
          id="add-to-cart-button"
          onClick={handleAddToCart}
          disabled={isAdding}
          className="w-full py-4 bg-neutral-900 text-white text-xs font-montserrat tracking-[0.3em] uppercase relative overflow-hidden group hover:bg-gold-500 transition-colors duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <AnimatePresence mode="wait">
            {isAdding ? (
              <motion.span
                key="adding"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                Ajouté au panier
              </motion.span>
            ) : (
              <motion.span
                key="default"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                Ajouter au panier — {formatEUR(product.price)}
              </motion.span>
            )}
          </AnimatePresence>
          
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </button>
        
        <div className="flex gap-4">
          <button
            onClick={() => {
              setIsWishlisted(!isWishlisted);
            }}
            className="flex-1 flex items-center justify-center gap-2 py-3 border border-neutral-200 text-xs font-montserrat tracking-wider text-neutral-600 hover:border-gold-500 hover:text-gold-500 transition-all duration-300"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-gold-500 text-gold-500' : ''}`} />
            {isWishlisted ? 'Dans ma wishlist' : 'Ajouter à la wishlist'}
          </button>
          
          <button
            onClick={() => setShowShare(true)}
            className="flex items-center justify-center gap-2 px-4 py-3 border border-neutral-200 text-xs font-montserrat tracking-wider text-neutral-600 hover:border-gold-500 hover:text-gold-500 transition-all duration-300"
          >
            <Share2 className="w-4 h-4" />
            Partager
          </button>
        </div>
        <TrustBadge variant="minimal" className="pt-2 pb-0" />
      </div>

      {/* ─── TRUST BADGES ─── */}
      <div className="mt-8 pt-6 border-t border-neutral-100 space-y-3">
        {[
          { icon: Truck, text: 'Livraison Express 24-48h', sub: 'Offerte' },
          { icon: RotateCcw, text: 'Retours gratuits', sub: 'Sous 30 jours' },
          { icon: Droplets, text: 'Séchage ultra-rapide', sub: 'Résistant chlore & sel' },
        ].map(({ icon: Icon, text, sub }) => (
          <div key={text} className="flex items-start gap-3">
            <Icon className="w-4 h-4 text-gold-500 mt-0.5 flex-shrink-0" />
            <div>
              <span className="text-xs font-montserrat text-neutral-800">{text}</span>
              <span className="text-xs font-montserrat text-neutral-400 ml-1">— {sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Drawers */}
      {showSizeGuide && <SizeGuideModal onClose={() => setShowSizeGuide(false)} />}
      {showShare && <ShareDrawer url={typeof window !== 'undefined' ? window.location.href : ''} onClose={() => setShowShare(false)} />}
    </div>
  );
}
