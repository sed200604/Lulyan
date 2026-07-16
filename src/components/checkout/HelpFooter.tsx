'use client';

import Link from 'next/link';

export function HelpFooter() {
  return (
    <div className="mt-8 flex flex-col gap-6 font-sans text-brand-black-400 pb-[100px] lg:pb-8">
      <div>
        <Link 
          href="/cart"
          className="text-[13px] text-brand-gold-500 hover:text-brand-gold-600 transition-colors"
        >
          &larr; Retour au panier
        </Link>
      </div>

      <div className="flex flex-col gap-1 text-[12px] opacity-70">
        <div className="flex items-center gap-2">
          <span>Besoin d'aide ?</span>
          <a 
            href="https://wa.me/33766676429" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-brand-gold-500 transition-colors flex items-center gap-1"
          >
            <span>💬</span> Chat
          </a>
          <span>·</span>
          <a href="tel:+33766676429" className="hover:text-brand-gold-500 transition-colors flex items-center gap-1">
            <span>📞</span> +33 7 66 67 64 29
          </a>
        </div>
        <span>Lun-Ven 9h-18h</span>
      </div>

      <div className="text-[11px] opacity-70 max-w-sm">
        En finalisant, vous acceptez nos{' '}
        <Link href="/cgv" className="text-brand-gold-500 underline hover:text-brand-gold-600 transition-colors">
          Conditions de vente
        </Link>
        {' '}et notre{' '}
        <Link href="/politique-de-confidentialite" className="text-brand-gold-500 underline hover:text-brand-gold-600 transition-colors">
          Politique de confidentialité
        </Link>
        .
      </div>
    </div>
  );
}
