'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { animations } from '@/lib/animations';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Delay appearance by 1.5s
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    } else {
      try {
        const parsed = JSON.parse(consent);
        // Small delay to ensure MetaPixel's event listener is registered
        setTimeout(() => {
          if (parsed.marketing) {
            (window as any).__consentGranted = true;
            window.dispatchEvent(new Event('cmp:consent:granted'));
          }
          if ((window as any).gtag) {
            (window as any).gtag('consent', 'update', {
              'analytics_storage': parsed.analytics ? 'granted' : 'denied',
              'ad_storage': parsed.marketing ? 'granted' : 'denied',
              'ad_user_data': parsed.marketing ? 'granted' : 'denied',
              'ad_personalization': parsed.marketing ? 'granted' : 'denied'
            });
          }
        }, 500);
      } catch (e) {}
    }
  }, []);

  const handleAcceptAll = () => {
    const all = { necessary: true, analytics: true, marketing: true };
    setPreferences(all);
    localStorage.setItem('cookieConsent', JSON.stringify(all));
    setIsVisible(false);
    setShowModal(false);
    (window as any).__consentGranted = true;
    window.dispatchEvent(new Event('cmp:consent:granted'));
    if ((window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        'analytics_storage': 'granted',
        'ad_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted'
      });
    }
  };

  const handleRejectAll = () => {
    const minimal = { necessary: true, analytics: false, marketing: false };
    setPreferences(minimal);
    localStorage.setItem('cookieConsent', JSON.stringify(minimal));
    setIsVisible(false);
    setShowModal(false);
    if ((window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        'analytics_storage': 'denied',
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied'
      });
    }
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    setIsVisible(false);
    setShowModal(false);
    if (preferences.marketing) {
      (window as any).__consentGranted = true;
      window.dispatchEvent(new Event('cmp:consent:granted'));
    }
    if ((window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        'analytics_storage': preferences.analytics ? 'granted' : 'denied',
        'ad_storage': preferences.marketing ? 'granted' : 'denied',
        'ad_user_data': preferences.marketing ? 'granted' : 'denied',
        'ad_personalization': preferences.marketing ? 'granted' : 'denied'
      });
    }
  };

  if (!isVisible) return null;

  return (
    <>
      <AnimatePresence>
        {!showModal && (
          <motion.div
            role="dialog"
            aria-label="Préférences de cookies"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ duration: 0.5, ease: animations.easings.luxuryOut }}
            className="fixed bottom-0 left-0 w-full z-40 p-4 md:p-6 flex justify-center pointer-events-none"
          >
            <div className="bg-white shadow-elevated w-full max-w-[600px] p-6 pointer-events-auto border border-brand-cream-200">
              <div className="flex flex-col gap-4">
                <p className="font-body text-body-sm text-brand-black-600">
                  <span className="text-xl mr-2">🍪</span>
                  Nous utilisons des cookies pour améliorer votre expérience. En continuant, vous acceptez notre politique de cookies.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-end gap-3 mt-2">
                  <button
                    onClick={() => setShowModal(true)}
                    className="w-full sm:w-auto px-4 py-2 font-accent text-overline text-brand-black-600 border border-brand-black-600 hover:bg-brand-black-50 transition-colors"
                  >
                    Personnaliser
                  </button>
                  <button
                    onClick={handleRejectAll}
                    className="w-full sm:w-auto px-4 py-2 font-accent text-overline text-brand-black-500 hover:text-brand-black-800 transition-colors"
                  >
                    Refuser
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    className="w-full sm:w-auto px-6 py-2 font-accent text-overline bg-brand-gold-500 text-white hover:bg-brand-gold-600 transition-colors"
                  >
                    Accepter ✓
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-brand-black-950/40 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white w-full max-w-lg shadow-elevated overflow-hidden"
            >
              <div className="p-6 border-b border-brand-cream-200 flex justify-between items-center bg-brand-cream-50">
                <h2 className="font-heading text-heading-3 text-brand-black-950">Préférences de cookies</h2>
                <button onClick={() => setShowModal(false)} className="text-brand-black-400 hover:text-brand-black-900">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 flex flex-col gap-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-body text-body font-semibold text-brand-black-900">Nécessaires</h3>
                    <p className="font-body text-body-sm text-brand-black-500 mt-1">Indispensables au fonctionnement du site. Ne peuvent être désactivés.</p>
                  </div>
                  <div className="w-12 h-6 bg-brand-gold-300 rounded-full relative opacity-50 cursor-not-allowed">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                  </div>
                </div>

                <div className="w-full h-px bg-brand-cream-200" />

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-body text-body font-semibold text-brand-black-900">Analytiques</h3>
                    <p className="font-body text-body-sm text-brand-black-500 mt-1">Nous aident à comprendre comment vous utilisez le site.</p>
                  </div>
                  <button
                    onClick={() => setPreferences(p => ({ ...p, analytics: !p.analytics }))}
                    className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${preferences.analytics ? 'bg-brand-gold-500' : 'bg-brand-cream-300'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${preferences.analytics ? 'translate-x-7' : 'translate-x-1'}`} />
                  </button>
                </div>

                <div className="w-full h-px bg-brand-cream-200" />

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-body text-body font-semibold text-brand-black-900">Marketing</h3>
                    <p className="font-body text-body-sm text-brand-black-500 mt-1">Permettent de vous proposer des publicités pertinentes.</p>
                  </div>
                  <button
                    onClick={() => setPreferences(p => ({ ...p, marketing: !p.marketing }))}
                    className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${preferences.marketing ? 'bg-brand-gold-500' : 'bg-brand-cream-300'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${preferences.marketing ? 'translate-x-7' : 'translate-x-1'}`} />
                  </button>
                </div>
              </div>
              <div className="p-6 bg-brand-cream-50 flex justify-end gap-4 border-t border-brand-cream-200">
                <button
                  onClick={handleSavePreferences}
                  className="px-6 py-2 bg-brand-gold-500 text-white font-accent text-overline hover:bg-brand-gold-600 transition-colors"
                >
                  Enregistrer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}