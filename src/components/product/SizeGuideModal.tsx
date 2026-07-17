'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Ruler } from 'lucide-react';
import { SizeGuideIllustration } from '../icons/SizeGuideIllustration';

interface SizeGuideModalProps {
  onClose: () => void;
}

export default function SizeGuideModal({ onClose }: SizeGuideModalProps) {
  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-neutral-900/50 backdrop-blur-sm"
        />

        {/* Drawer */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-neutral-100">
            <div className="flex items-center gap-3">
              <Ruler className="w-5 h-5 text-brand-gold-500" />
              <h2 className="text-sm font-montserrat tracking-widest uppercase text-neutral-900">
                Guide des tailles
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 -mr-2 text-neutral-400 hover:text-neutral-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            
            {/* Intro */}
            <div>
              <h3 className="text-lg font-cormorant mb-2 text-neutral-900">Comment prendre vos mesures</h3>
              <p className="text-xs font-montserrat text-neutral-500 leading-relaxed">
                Utilisez un mètre ruban souple. Pour plus de précision, prenez vos mensurations directement sur votre peau ou par-dessus des sous-vêtements fins.
              </p>
            </div>

            {/* Mesures instructions */}
            <div className="flex gap-6 items-center">
              <div className="w-1/3 flex-shrink-0">
                <SizeGuideIllustration className="w-full h-auto" />
              </div>
              <div className="w-2/3 space-y-4">
                <div className="bg-neutral-50 p-4 rounded relative">
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-brand-gold-500 text-white flex items-center justify-center text-[10px] font-bold">1</div>
                  <h4 className="text-xs font-montserrat font-semibold text-neutral-900 mb-1 pl-2">Tour de poitrine</h4>
                  <p className="text-xs font-montserrat text-neutral-600 pl-2">Mesurez à l&apos;endroit le plus fort, ruban bien horizontal.</p>
                </div>
                
                <div className="bg-neutral-50 p-4 rounded relative">
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-brand-gold-500 text-white flex items-center justify-center text-[10px] font-bold">2</div>
                  <h4 className="text-xs font-montserrat font-semibold text-neutral-900 mb-1 pl-2">Tour de taille</h4>
                  <p className="text-xs font-montserrat text-neutral-600 pl-2">Mesurez au creux de votre taille, l&apos;endroit le plus étroit.</p>
                </div>
                
                <div className="bg-neutral-50 p-4 rounded relative">
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-brand-gold-500 text-white flex items-center justify-center text-[10px] font-bold">3</div>
                  <h4 className="text-xs font-montserrat font-semibold text-neutral-900 mb-1 pl-2">Tour de hanches</h4>
                  <p className="text-xs font-montserrat text-neutral-600 pl-2">Mesurez à l&apos;endroit le plus fort de vos hanches.</p>
                </div>
              </div>
            </div>

            {/* Table */}
            <div>
              <h3 className="text-lg font-cormorant mb-4 text-neutral-900">Tableau des mensurations</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs font-montserrat">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="py-2 text-left font-medium">Taille</th>
                      <th className="py-2 text-center font-medium">Poitrine</th>
                      <th className="py-2 text-center font-medium">Taille</th>
                      <th className="py-2 text-center font-medium">Hanches</th>
                    </tr>
                  </thead>
                  <tbody className="text-neutral-600">
                    <tr className="border-b border-neutral-100">
                      <td className="py-3 font-medium text-neutral-900">XS (34)</td>
                      <td className="py-3 text-center">80-84</td>
                      <td className="py-3 text-center">60-64</td>
                      <td className="py-3 text-center">86-90</td>
                    </tr>
                    <tr className="border-b border-neutral-100">
                      <td className="py-3 font-medium text-neutral-900">S (36)</td>
                      <td className="py-3 text-center">84-88</td>
                      <td className="py-3 text-center">64-68</td>
                      <td className="py-3 text-center">90-94</td>
                    </tr>
                    <tr className="border-b border-neutral-100">
                      <td className="py-3 font-medium text-neutral-900">M (38)</td>
                      <td className="py-3 text-center">88-92</td>
                      <td className="py-3 text-center">68-72</td>
                      <td className="py-3 text-center">94-98</td>
                    </tr>
                    <tr className="border-b border-neutral-100">
                      <td className="py-3 font-medium text-neutral-900">L (40)</td>
                      <td className="py-3 text-center">92-96</td>
                      <td className="py-3 text-center">72-76</td>
                      <td className="py-3 text-center">98-102</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-medium text-neutral-900">XL (42)</td>
                      <td className="py-3 text-center">96-102</td>
                      <td className="py-3 text-center">76-82</td>
                      <td className="py-3 text-center">102-108</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Model note */}
            <div className="bg-brand-gold-50/50 p-4 border border-brand-gold-100 text-center">
              <p className="text-xs font-montserrat text-brand-gold-900 leading-relaxed">
                <span className="font-semibold block mb-1">Notre conseil taille</span>
                Les burkinis LULIYANE sont conçus avec un tissu stretch premium. Si vous hésitez entre deux tailles, nous vous conseillons de choisir la taille la plus grande pour plus de confort.
              </p>
            </div>
            
            <div className="text-center">
              <a href="mailto:contact@luliyane.paris" className="text-xs font-montserrat text-neutral-500 hover:text-brand-gold-500 underline underline-offset-4">
                Besoin d&apos;aide supplémentaire ? Contactez-nous
              </a>
            </div>
            
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}