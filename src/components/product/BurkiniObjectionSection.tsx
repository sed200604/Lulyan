'use client';
import { useState } from 'react';

type Objection = {
  q: string;
  a: string;
  icon: React.ReactNode;
  microProof?: string;
};

const OBJECTIONS: Objection[] = [
  {
    q: 'Le tissu devient-il transparent une fois mouillé ?',
    a: 'Non. Notre lycra double couche de 220 g/m² a été spécifiquement testé pour rester totalement opaque, mouillé comme sec. Vous restez couverte sans compromis, dans l\'eau comme après.',
    icon: <ShieldIcon />,
    microProof: 'Testé en piscine chlorée + eau de mer',
  },
  {
    q: 'Le burkini est-il lourd ? Est-ce qu\'il traîne dans l\'eau ?',
    a: 'Non. Le tissu séchage rapide (moins de 40 minutes) et la coupe ajustée sans excès de matière permettent une nage libre. Il pèse à peine 380 g — l\'équivalent d\'un t-shirt en coton.',
    icon: <DropletIcon />,
    microProof: 'Séchage < 40 min · 380 g total',
  },
  {
    q: 'Comment taille le modèle ? Je suis entre deux tailles.',
    a: 'Le burkini Pois Élégance taille juste. Entre deux tailles, nous recommandons la taille supérieure pour un confort optimal dans l\'eau. Consultez notre guide interactif ci-dessous, ou écrivez-nous — nous répondons en 2h.',
    icon: <RulerIcon />,
    microProof: 'Coupe fidèle aux mesures indiquées',
  },
  {
    q: 'Résiste-t-il au chlore et au sel ?',
    a: 'Oui. Le tissu est traité anti-chlore et anti-UV (indice UPF 50+). Il conserve sa couleur et son élasticité même après 100+ baignades. Rincez à l\'eau claire après usage pour prolonger sa durée de vie.',
    icon: <SunIcon />,
    microProof: 'UPF 50+ · Anti-chlore · Anti-UV',
  },
];

export function BurkiniObjectionSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);  // first one open by default

  return (
    <section
      className="my-10 sm:my-12"
      aria-labelledby="objection-title"
    >
      {/* Editorial header */}
      <div className="text-center mb-6">
        <p className="text-[10px] tracking-[0.25em] uppercase text-[#B8956A] mb-2">
          ─── L'essentiel avant d'acheter ───
        </p>
        <h2 id="objection-title" className="font-serif text-[22px] sm:text-[26px] font-light text-[#2A2A2A]">
          Réponses à vos questions
        </h2>
      </div>

      {/* Question list — first item open by default */}
      <div className="space-y-3">
        {OBJECTIONS.map((obj, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`
                border rounded-xl overflow-hidden transition-all duration-300
                ${isOpen ? 'border-[#B8956A]/40 bg-[#F9F5EC]' : 'border-neutral-200 bg-white'}
              `}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                aria-expanded={isOpen}
                aria-controls={`obj-body-${idx}`}
                className="w-full p-4 sm:p-5 flex items-start gap-3 text-left"
              >
                <div className={`
                  flex-shrink-0 mt-0.5 transition-colors duration-200
                  ${isOpen ? 'text-[#B8956A]' : 'text-neutral-400'}
                `}>
                  {obj.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`
                    text-[14px] sm:text-[15px] font-medium leading-snug pr-4
                    ${isOpen ? 'text-[#2A2A2A]' : 'text-[#3A3A3A]'}
                  `}>
                    {obj.q}
                  </p>
                </div>
                <div className={`
                  flex-shrink-0 transition-transform duration-300 mt-1
                  ${isOpen ? 'rotate-45 text-[#B8956A]' : 'text-neutral-400'}
                `}>
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M10 4v12M4 10h12"/>
                  </svg>
                </div>
              </button>

              <div
                id={`obj-body-${idx}`}
                className="grid transition-[grid-template-rows] duration-300 ease-out"
                style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
              >
                <div className="overflow-hidden">
                  <div className="px-5 pb-5 pt-0 pl-[52px]">
                    <p className="text-[13px] sm:text-[14px] leading-[1.7] text-[#555] font-serif">
                      {obj.a}
                    </p>
                    {obj.microProof && (
                      <p className="mt-3 inline-block text-[11px] italic text-[#B8956A] font-serif px-3 py-1 bg-white/70 rounded-full border border-[#E8DCC4]/50">
                        {obj.microProof}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Escape hatch — for any remaining question */}
      <div className="mt-6 text-center">
        <p className="text-[12px] italic text-neutral-500 font-serif">
          Une question sans réponse ?
          <a href="mailto:contact@luliyan-paris.com" className="text-[#B8956A] hover:underline ml-1">
            Écrivez-nous, on répond en 2 heures.
          </a>
        </p>
      </div>
    </section>
  );
}

// ─── Icon components (inline SVG, no external deps) ───

function ShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2l7 3v5c0 4.5-3 8-7 9-4-1-7-4.5-7-9V5l7-3z"/>
      <path d="M7 10l2 2 4-4"/>
    </svg>
  );
}

function DropletIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2s6 5.5 6 10a6 6 0 01-12 0c0-4.5 6-10 6-10z"/>
    </svg>
  );
}

function RulerIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="16" height="6" rx="1"/>
      <path d="M6 7v2M10 7v3M14 7v2"/>
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="10" r="3"/>
      <path d="M10 2v1M10 17v1M17 10h1M2 10h1M15 5l1-1M4 16l1-1M15 15l1 1M4 4l1 1"/>
    </svg>
  );
}
