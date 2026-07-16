'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Sparkles, Shirt, Package, Ruler, Plus, Check } from 'lucide-react';
import { Product } from '@/types/product';

interface ProductAccordionsProps {
  product: Product;
}

export function ProductAccordions({ product }: ProductAccordionsProps) {
  const [openAccordion, setOpenAccordion] = useState<string | null>('description');

  const toggleAccordion = (id: string) => {
    setOpenAccordion(prev => prev === id ? null : id);
  };

  const accordions = [
    {
      id: 'description',
      title: 'Description',
      icon: FileText,
      content: (
        <div className="space-y-4">
          <p>{product.description}</p>
          <p className="text-xs text-neutral-400 italic">
            Réf. {product.id} — Collection {product.collection || 'LULIYANE RIVIERA'}
          </p>
        </div>
      )
    },
    {
      id: 'features',
      title: 'Caractéristiques',
      icon: Sparkles,
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {product.features?.map((feature) => (
            <div key={feature} className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-gold-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'fabric',
      title: 'Matière & Entretien',
      icon: Shirt,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="text-xs font-montserrat tracking-[0.15em] uppercase text-neutral-800 mb-2">
              Composition
            </h4>
            <p className="text-sm">{product.fabricDetails}</p>
          </div>
          
          <div>
            <h4 className="text-xs font-montserrat tracking-[0.15em] uppercase text-neutral-800 mb-3">
              Instructions d&apos;entretien
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {product.careInstructions?.map((text) => (
                <div key={text} className="flex items-start gap-2">
                  <span className="text-xs text-neutral-600">• {text}</span>
                </div>
              ))}
            </div>
          </div>
          
          <p className="text-xs text-neutral-400 italic">
            Des différences de tons peuvent apparaître en raison des réglages d&apos;écran et des conditions de prise de vue.
          </p>
        </div>
      )
    },
    {
      id: 'shipping',
      title: 'Livraison & Retours',
      icon: Package,
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="text-xs font-montserrat tracking-[0.15em] uppercase text-neutral-800 mb-2">
              Livraison
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>France métropolitaine</span>
                <span className="text-gold-500 font-medium">Offerte</span>
              </div>
              <div className="flex justify-between">
                <span>Livraison standard</span>
                <span>3-5 jours ouvrés</span>
              </div>
              <div className="flex justify-between">
                <span>Livraison express</span>
                <span>24-48h (+5,90€)</span>
              </div>
              <div className="flex justify-between">
                <span>Europe (UE)</span>
                <span>5-7 jours ouvrés</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-xs font-montserrat tracking-[0.15em] uppercase text-neutral-800 mb-2">
              Retours
            </h4>
            <p className="text-sm">
              Retours gratuits sous 30 jours. L&apos;article doit être non porté, avec les étiquettes d&apos;origine. Le remboursement est effectué sous 5-7 jours ouvrés après réception.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'size-guide',
      title: 'Guide des tailles',
      icon: Ruler,
      content: (
        <div>
          <p className="text-sm mb-4">
            Nos burkinis sont conçus avec un tissu stretch (taille standard 38-46). En cas de doute, consultez le tableau ci-dessous ou contactez-nous.
          </p>
          
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-montserrat">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="py-3 text-left font-medium tracking-wider uppercase">Taille</th>
                  <th className="py-3 text-center font-medium tracking-wider uppercase">Tour de poitrine</th>
                  <th className="py-3 text-center font-medium tracking-wider uppercase">Tour de taille</th>
                  <th className="py-3 text-center font-medium tracking-wider uppercase">Tour de hanches</th>
                </tr>
              </thead>
              <tbody className="text-neutral-600">
                <tr className="border-b border-neutral-100">
                  <td className="py-2.5 font-medium text-neutral-900">XS (34-36)</td>
                  <td className="py-2.5 text-center">80-84 cm</td>
                  <td className="py-2.5 text-center">60-64 cm</td>
                  <td className="py-2.5 text-center">86-90 cm</td>
                </tr>
                <tr className="border-b border-neutral-100">
                  <td className="py-2.5 font-medium text-neutral-900">S (36-38)</td>
                  <td className="py-2.5 text-center">84-88 cm</td>
                  <td className="py-2.5 text-center">64-68 cm</td>
                  <td className="py-2.5 text-center">90-94 cm</td>
                </tr>
                <tr className="border-b border-neutral-100">
                  <td className="py-2.5 font-medium text-neutral-900">M (38-40)</td>
                  <td className="py-2.5 text-center">88-92 cm</td>
                  <td className="py-2.5 text-center">68-72 cm</td>
                  <td className="py-2.5 text-center">94-98 cm</td>
                </tr>
                <tr className="border-b border-neutral-100">
                  <td className="py-2.5 font-medium text-neutral-900">L (40-42)</td>
                  <td className="py-2.5 text-center">92-96 cm</td>
                  <td className="py-2.5 text-center">72-76 cm</td>
                  <td className="py-2.5 text-center">98-102 cm</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-medium text-neutral-900">XL (42-46)</td>
                  <td className="py-2.5 text-center">96-102 cm</td>
                  <td className="py-2.5 text-center">76-82 cm</td>
                  <td className="py-2.5 text-center">102-108 cm</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <p className="mt-4 text-xs text-neutral-400 italic">
            Longueur du produit : environ 140 cm. Une différence de 1-3 cm est possible selon les mesures.
          </p>
          
          <div className="mt-4 p-4 bg-neutral-50 rounded">
            <p className="text-xs font-montserrat text-neutral-600">
              <span className="font-medium text-neutral-800">Le mannequin</span> mesure 175 cm et porte la taille S.
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6">
      {accordions.map((item) => {
        const isOpen = openAccordion === item.id;
        
        return (
          <div key={item.id} className="border-b border-neutral-200">
            <button
              onClick={() => toggleAccordion(item.id)}
              className="w-full flex items-center justify-between py-5 group"
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-4 h-4 text-gold-500" />
                <span className="text-sm font-montserrat tracking-[0.1em] uppercase text-neutral-800">
                  {item.title}
                </span>
              </div>
              <motion.div
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <Plus className="w-4 h-4 text-neutral-400 group-hover:text-gold-500 transition-colors" />
              </motion.div>
            </button>
            
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 pl-7 text-sm font-montserrat text-neutral-600 leading-relaxed">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
