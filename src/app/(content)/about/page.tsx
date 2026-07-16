import { SITE_CONFIG } from '@/lib/constants';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Notre Histoire | ${SITE_CONFIG.name}`,
  description: "Découvrez l'histoire de LULIYANE PARIS : l'élégance parisienne au service du burkini. Des pièces conçues pour le confort, la protection solaire et le style.",
};

export default function AboutPage() {
  return (
    <div className="bg-[#FAF7F2] min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="font-heading text-4xl sm:text-5xl text-[#1A1A1A] tracking-tight mb-4">
            Notre Histoire
          </h1>
          <div className="w-16 h-0.5 bg-[#C5A880] mx-auto"></div>
        </div>

        <div className="space-y-8 font-sans text-lg text-[#1A1A1A]/80 leading-relaxed">
          <p className="first-letter:text-5xl first-letter:font-heading first-letter:mr-1 first-letter:float-left first-letter:text-[#C5A880]">
            <strong className="font-medium text-[#1A1A1A]">LULIYANE PARIS</strong> est née d'un constat simple : les femmes qui 
            cherchent un maillot de bain couvrant méritent mieux que le 
            choix entre &quot;pratique mais laid&quot; et &quot;joli mais hors de prix&quot;.
          </p>

          <p>
            Notre mission : apporter l'élégance parisienne au burkini. 
            Des coupes étudiées, des couleurs recherchées, un tissu qui 
            sèche vite et résiste au chlore, et surtout un prix qui 
            respecte votre budget.
          </p>

          <p>
            Nous sélectionnons nos tissus auprès de fabricants spécialisés 
            reconnus pour leur expertise dans le maillot de bain modest. 
            Chaque pièce est pensée pour offrir confort, protection solaire 
            et une silhouette flatteuse.
          </p>

          <p>
            Le design est conçu à Paris. L'élégance est notre signature. 
            Et nous croyons que le vrai luxe, c'est de se sentir belle 
            et confiante sans payer une fortune.
          </p>

          <div className="mt-12 p-8 bg-white border border-[#E5E5E5] text-center shadow-sm">
            <p className="font-heading text-xl text-[#1A1A1A] mb-2">
              LULIYANE RIVIERA
            </p>
            <p className="text-base">
              Notre première collection — c'est 8 pièces essentielles pour profiter de la plage et de la piscine avec style.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}