import { SITE_CONFIG } from '@/lib/constants';

export default function ContactPage() {
  return (
    <div className="container mx-auto px-container max-w-3xl py-24 md:py-32">
      <h1 className="font-heading text-heading-2 text-brand-black-950 mb-8 text-center">
        Contact & Support
      </h1>
      
      <div className="bg-brand-cream-50 p-8 md:p-12 text-center space-y-8 border border-brand-gold-800/30">
        <p className="font-body text-body-lg text-brand-black-800">
          Notre équipe est à votre disposition pour toute question concernant nos collections, vos commandes ou pour vous conseiller.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
          <div className="space-y-4">
            <h2 className="font-accent text-overline text-brand-gold-500 tracking-widest">EMAIL</h2>
            <a 
              href={`mailto:${SITE_CONFIG.email}`} 
              className="font-body text-body text-brand-black-950 hover:text-brand-gold-500 transition-colors block"
            >
              {SITE_CONFIG.email}
            </a>
            <p className="font-body text-body-sm text-brand-black-600">
              Nous vous répondrons dans les plus brefs délais.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-accent text-overline text-brand-gold-500 tracking-widest">WHATSAPP</h2>
            <a 
              href={`https://wa.me/${SITE_CONFIG.whatsapp.replace('+', '')}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-body text-body text-brand-black-950 hover:text-brand-gold-500 transition-colors block"
            >
              {SITE_CONFIG.phone}
            </a>
            <p className="font-body text-body-sm text-brand-black-600">
              Assistance instantanée et personnalisée.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}