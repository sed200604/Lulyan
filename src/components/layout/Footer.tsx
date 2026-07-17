'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FOOTER_LINKS, SITE_CONFIG } from '@/lib/constants';
import { animations } from '@/lib/animations';
import { trackEvent } from '@/lib/meta-capi';
import { PaymentIconRow } from '@/components/icons/payment/PaymentIconRow';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-black-950 pt-24 pb-8 border-t border-brand-gold-800/30">
      <div className="container px-container lg:px-container-lg max-w-7xl mx-auto">
        {/* Logo Section */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={animations.fadeUp}
          className="flex flex-col items-center mb-16"
        >
          <span className="font-heading text-heading-1 text-brand-gold-500 text-center leading-none">
            LULIYANE<br />PARIS
          </span>
          <span className="font-heading text-body-lg italic text-brand-cream-400 mt-4">
            La Référence du Burkini
          </span>
        </motion.div>

        <div className="w-full h-[1px] bg-brand-gold-800/30 mb-16" />

        {/* Links Grid */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.1 }}
          variants={animations.staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24 mb-16"
        >
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <motion.div key={section} variants={animations.fadeUp}>
              <h4 className="font-accent text-overline text-brand-gold-500 tracking-[0.15em] mb-6">
                {section === 'boutique' ? 'BOUTIQUE' : section === 'maison' ? 'LA MAISON' : 'INFORMATIONS LÉGALES'}
              </h4>
              <ul className="flex flex-col gap-4">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="font-body text-body text-brand-cream-300 hover:text-brand-gold-500 transition-colors link-underline">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Contact, Suivez-nous & Newsletter */}
          <motion.div variants={animations.fadeUp}>
            <h4 className="font-accent text-overline text-brand-gold-500 tracking-[0.15em] mb-6">
              NOUS CONTACTER
            </h4>
            <ul className="flex flex-col gap-4 mb-10">
              <li>
                <a href={`mailto:${SITE_CONFIG.email}`} className="font-body text-body text-brand-cream-300 hover:text-brand-gold-500 transition-colors link-underline">
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${SITE_CONFIG.whatsapp.replace('+', '')}`} target="_blank" rel="noopener noreferrer" className="font-body text-body text-brand-cream-300 hover:text-brand-gold-500 transition-colors link-underline">
                  {SITE_CONFIG.phone} (WhatsApp)
                </a>
              </li>
            </ul>

            <h4 className="font-accent text-overline text-brand-gold-500 tracking-[0.15em] mb-6">
              SUIVEZ-NOUS
            </h4>
            <ul className="flex flex-col gap-4 mb-10">
              <li>
                <a href={SITE_CONFIG.social?.instagram || '#'} target="_blank" rel="noopener noreferrer" className="font-body text-body text-brand-cream-300 hover:text-brand-gold-500 transition-colors link-underline">
                  Instagram
                </a>
              </li>
              <li>
                <a href={SITE_CONFIG.social?.tiktok || '#'} target="_blank" rel="noopener noreferrer" className="font-body text-body text-brand-cream-300 hover:text-brand-gold-500 transition-colors link-underline">
                  TikTok
                </a>
              </li>
              <li>
                <a href={SITE_CONFIG.social?.facebook || '#'} target="_blank" rel="noopener noreferrer" className="font-body text-body text-brand-cream-300 hover:text-brand-gold-500 transition-colors link-underline">
                  Facebook
                </a>
              </li>
            </ul>

            <h4 className="font-accent text-overline text-brand-gold-500 tracking-[0.15em] mb-4">
              NEWSLETTER
            </h4>
            <p className="font-body text-body-sm text-brand-cream-400 mb-4">
              Recevez nos nouveautés et offres exclusives
            </p>
            <form className="flex w-full gap-2" onSubmit={(e) => {
              e.preventDefault();
              const emailInput = e.currentTarget.querySelector('input[type="email"]') as HTMLInputElement;
              if (emailInput && emailInput.value) {
                trackEvent('Lead', {
                  content_name: 'Cercle Newsletter',
                  value: 0,
                  currency: 'EUR'
                }, { email: emailInput.value });
              }
              // Normal submit logic here
            }}>
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 bg-transparent border border-brand-gold-800 text-brand-cream-50 px-4 py-2 font-body text-body-sm focus:outline-none focus:border-brand-gold-500 transition-colors rounded-none"
                required
              />
              <button
                type="submit"
                className="bg-brand-gold-500 text-brand-black-950 px-6 py-2 font-accent text-overline tracking-widest hover:bg-brand-gold-400 transition-colors rounded-none"
              >
                S&apos;INSCRIRE
              </button>
            </form>
          </motion.div>
        </motion.div>

        <div className="w-full h-[1px] bg-brand-gold-800/30 mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap justify-center gap-4 font-body text-caption text-brand-cream-500">
            <span>© {currentYear} LULIYANE PARIS</span>
            <span className="hidden sm:inline">|</span>
            <Link href="/cgv" className="hover:text-brand-gold-500 transition-colors">CGV</Link>
            <Link href="/mentions-legales" className="hover:text-brand-gold-500 transition-colors">Mentions légales</Link>
            <Link href="/confidentialite" className="hover:text-brand-gold-500 transition-colors">Confidentialité</Link>
          </div>
          
          <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity duration-300">
            <PaymentIconRow size={24} iconClassName="text-brand-cream-50" />
          </div>
        </div>
      </div>
    </footer>
  );
}