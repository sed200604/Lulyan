'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { animations } from '@/lib/animations';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { trackEvent } from '@/lib/meta-capi';

export function DesktopNewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('error');
      setErrorMessage('Veuillez entrer une adresse email valide.');
      return;
    }

    setStatus('loading');

    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      trackEvent('Lead', {
        content_name: 'Cercle Newsletter',
        value: 0,
        currency: 'EUR',
      }, { email });
    }, 1000);
  };

  return (
    <section className="relative py-section bg-brand-black-950 px-container overflow-hidden">
      {/* Optional: Subtle Texture/Pattern Overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #C8A558 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center">
        <SectionHeader 
          overline="" 
          title="REJOIGNEZ LE CERCLE LULIYANE" 
          subtitle="Inscrivez-vous pour recevoir en avant-première nos nouveautés, offres exclusives et l'actualité de nos collections de burkinis."
          theme="dark"
        />

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={animations.fadeUp}
          className="w-full max-w-2xl mt-8"
        >
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-8 text-brand-gold-400"
              >
                <div className="w-16 h-16 rounded-full border border-brand-gold-400 flex items-center justify-center mb-6">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="font-heading text-heading-3 mb-2 text-white">Bienvenue dans le cercle LULIYANE !</h3>
                <p className="font-body text-body text-brand-cream-400">Votre inscription a bien été confirmée.</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-8 w-full"
              >
                <div className="flex flex-col md:flex-row gap-4 w-full">
                  <div className="flex-1 relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === 'error') setStatus('idle');
                      }}
                      placeholder="Votre adresse email"
                      disabled={status === 'loading'}
                      className={cn(
                        "w-full bg-transparent border-b py-4 font-body text-white placeholder:text-brand-cream-500 focus:outline-none transition-colors rounded-none",
                        status === 'error' 
                          ? "border-[#D94F4F]" 
                          : "border-brand-gold-500/50 focus:border-brand-gold-500"
                      )}
                    />
                    {status === 'error' && (
                      <span className="absolute left-0 -bottom-6 text-[#D94F4F] text-xs font-body">
                        {errorMessage}
                      </span>
                    )}
                  </div>
                  
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full md:w-auto px-10 py-4 bg-brand-gold-500 text-brand-black-950 font-accent text-overline tracking-[0.1em] hover:bg-brand-gold-400 transition-colors disabled:opacity-70 flex items-center justify-center min-w-[180px]"
                  >
                    {status === 'loading' ? (
                      <div className="w-5 h-5 border-2 border-brand-black-950 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      "S'INSCRIRE"
                    )}
                  </button>
                </div>

                <ul className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 text-left md:text-center mt-4">
                  {[
                    "−10% sur votre première commande",
                    "Accès anticipé aux nouvelles collections",
                    "Invitations aux ventes privées"
                  ].map((benefit, i) => (
                    <li key={i} className="flex items-center gap-2 font-body text-sm text-brand-cream-400">
                      <Check className="w-4 h-4 text-brand-gold-500 shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
