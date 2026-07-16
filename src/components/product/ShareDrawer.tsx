'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, MessageCircle, Mail } from 'lucide-react';

interface ShareDrawerProps {
  url: string;
  onClose: () => void;
}

export default function ShareDrawer({ url, onClose }: ShareDrawerProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      action: () => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`, '_blank'),
    },
    {
      name: 'Email',
      icon: Mail,
      action: () => window.open(`mailto:?subject=${encodeURIComponent('Découvre ce burkini LULIYANE PARIS')}&body=${encodeURIComponent(url)}`, '_self'),
    },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex justify-end md:items-center md:justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-neutral-900/50 backdrop-blur-sm"
        />

        {/* Drawer for Mobile / Modal for Desktop */}
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-sm mt-auto md:mt-0 bg-white shadow-2xl flex flex-col md:rounded-lg overflow-hidden"
        >
          <div className="flex items-center justify-between p-6 border-b border-neutral-100">
            <h2 className="text-sm font-montserrat tracking-widest uppercase text-neutral-900">
              Partager
            </h2>
            <button
              onClick={onClose}
              className="p-2 -mr-2 text-neutral-400 hover:text-neutral-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            
            {/* Copy Link */}
            <div className="flex items-center gap-2 p-3 border border-neutral-200 rounded">
              <input 
                type="text" 
                readOnly 
                value={url} 
                className="flex-1 text-xs font-montserrat text-neutral-500 bg-transparent outline-none truncate"
              />
              <button 
                onClick={handleCopy}
                className="p-2 bg-neutral-100 hover:bg-gold-50 transition-colors rounded"
                title="Copier le lien"
              >
                {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-neutral-700" />}
              </button>
            </div>

            {/* Social Options */}
            <div className="grid grid-cols-2 gap-4">
              {shareOptions.map((option) => (
                <button
                  key={option.name}
                  onClick={option.action}
                  className="flex flex-col items-center justify-center gap-3 p-4 border border-neutral-100 hover:border-gold-500 rounded transition-colors group"
                >
                  <option.icon className="w-6 h-6 text-neutral-600 group-hover:text-gold-500 transition-colors" />
                  <span className="text-xs font-montserrat text-neutral-800">{option.name}</span>
                </button>
              ))}
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
