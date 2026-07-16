'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Product } from '@/types/product';
import { motion, AnimatePresence } from 'framer-motion';

interface InfoAccordionsProps {
  product: Product;
}

export function InfoAccordions({ product }: InfoAccordionsProps) {
  const [openSection, setOpenSection] = useState<string | null>('description');

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const sections = [
    { id: 'description', title: 'DESCRIPTION', content: product.description },
    { id: 'fit', title: 'COUPE & MANNEQUIN', content: product.modelFit },
    { 
      id: 'composition', 
      title: 'MATIÈRE & ENTRETIEN', 
      content: (
        <div className="flex flex-col gap-4">
          <p>{product.composition}</p>
          <div>
            <strong>Entretien :</strong>
            <p className="whitespace-pre-line">{product.care}</p>
          </div>
        </div>
      ) 
    },
    { id: 'shipping', title: 'LIVRAISON', content: <p className="whitespace-pre-line">{product.shipping}</p> },
    { id: 'returns', title: 'RETOURS', content: <p className="whitespace-pre-line">{product.returns}</p> },
  ];

  return (
    <div className="flex flex-col border-t border-[#1A1A1A]/10 my-8">
      {sections.map((section) => {
        if (!section.content) return null;
        
        const isOpen = openSection === section.id;
        
        return (
          <div key={section.id} className="border-b border-[#1A1A1A]/10">
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full py-4 flex items-center justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A14E] transition-colors hover:bg-black/5"
            >
              <span className="font-sans text-[11px] uppercase tracking-wide text-[#1A1A1A]">
                {section.title}
              </span>
              <span className="text-[#1A1A1A]">
                {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </span>
            </button>
            
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-4 font-sans text-[14px] leading-[1.6] text-[#666666] font-light">
                    {section.content}
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
