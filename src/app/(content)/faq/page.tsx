import { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants';
import Script from 'next/script';
import { SectionHeader } from '@/components/shared/SectionHeader';

export const metadata: Metadata = {
  title: 'Questions Fréquentes (FAQ) | ' + SITE_CONFIG.name,
  description: 'Trouvez les réponses à toutes vos questions sur la livraison, les retours, les tailles et l\'entretien de nos burkinis premium.',
};

const FAQS = [
  {
    question: "Quels sont les délais de livraison ?",
    answer: "Nous expédions toutes les commandes sous 24h ouvrées. La livraison standard en France métropolitaine prend généralement 2 à 3 jours ouvrables. La livraison express est effectuée en 24h."
  },
  {
    question: "Puis-je retourner ou échanger mon burkini ?",
    answer: "Oui, vous disposez de 14 jours après réception pour nous retourner votre article, à condition qu'il n'ait pas été porté (essayage autorisé), lavé, et que les étiquettes soient toujours attachées pour des raisons d'hygiène."
  },
  {
    question: "Comment choisir ma taille ?",
    answer: "Nos burkinis taillent normalement. Nous vous conseillons de prendre votre taille habituelle. Si vous hésitez entre deux tailles, nous recommandons de prendre la taille supérieure pour plus de confort. Un guide des tailles détaillé est disponible sur chaque page produit."
  },
  {
    question: "Les burkinis sont-ils adaptés à la piscine ?",
    answer: "Absolument. Nos burkinis sont confectionnés dans un tissu technique de haute qualité, résistant au chlore des piscines et au sel de mer. Ils sèchent également très rapidement."
  },
  {
    question: "Le tissu offre-t-il une protection UV ?",
    answer: "Oui, tous nos modèles sont conçus avec un tissu offrant une protection solaire UPF 50+, bloquant plus de 98% des rayons UV nocifs."
  },
  {
    question: "Quels sont les modes de paiement acceptés ?",
    answer: "Nous acceptons les paiements par carte bancaire (Visa, Mastercard, American Express), Apple Pay, Google Pay, ainsi que PayPal. Tous les paiements sont 100% sécurisés."
  }
];

export default function FAQPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-[#FAF7F2] py-24 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            overline="ASSISTANCE CLIENT"
            title="QUESTIONS FRÉQUENTES"
            ornament={true}
          />
          
          <div className="mt-16 space-y-6">
            {FAQS.map((faq, index) => (
              <div 
                key={index} 
                className="bg-white p-6 md:p-8 rounded-[2px] shadow-[0_4px_24px_rgba(26,26,26,0.04)] border border-[#C5A14E]/20"
              >
                <h3 className="font-heading text-xl md:text-2xl text-[#1A1A1A] mb-4">
                  {faq.question}
                </h3>
                <p className="font-body text-sm md:text-base text-[#5A5247] leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="font-body text-sm text-[#5A5247] mb-6">
              Vous ne trouvez pas la réponse à votre question ?
            </p>
            <a 
              href="/contact"
              className="inline-flex items-center justify-center bg-[#1A1A1A] text-[#E8D9A8] font-body text-[12px] tracking-[0.2em] uppercase px-8 py-4 hover:bg-[#C5A14E] transition-colors duration-300"
            >
              Contactez-nous
            </a>
          </div>
        </div>
      </main>
    </>
  );
}