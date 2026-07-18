'use client';
import { useState, useEffect, useMemo } from 'react';

const SIZE_TABLE = [
  { size: '36', bustMin: 82,  bustMax: 84,  waistMin: 62, waistMax: 64, hipMin: 88,  hipMax: 90,  heightMin: 155, heightMax: 165 },
  { size: '38', bustMin: 86,  bustMax: 88,  waistMin: 66, waistMax: 68, hipMin: 92,  hipMax: 94,  heightMin: 158, heightMax: 168 },
  { size: '40', bustMin: 90,  bustMax: 92,  waistMin: 70, waistMax: 72, hipMin: 96,  hipMax: 98,  heightMin: 160, heightMax: 172 },
  { size: '42', bustMin: 94,  bustMax: 96,  waistMin: 74, waistMax: 76, hipMin: 100, hipMax: 102, heightMin: 162, heightMax: 175 },
  { size: '44', bustMin: 98,  bustMax: 100, waistMin: 78, waistMax: 80, hipMin: 104, hipMax: 106, heightMin: 165, heightMax: 178 },
  { size: '46', bustMin: 102, bustMax: 104, waistMin: 82, waistMax: 84, hipMin: 108, hipMax: 110, heightMin: 168, heightMax: 180 },
  { size: '48', bustMin: 106, bustMax: 110, waistMin: 86, waistMax: 90, hipMin: 112, hipMax: 116, heightMin: 170, heightMax: 182 },
];

type Props = { isOpen: boolean; onClose: () => void };

export function SizeFinderModal({ isOpen, onClose }: Props) {
  const [step, setStep] = useState<'calculator' | 'table'>('calculator');
  const [height, setHeight] = useState<string>('');
  const [bust, setBust] = useState<string>('');
  const [waist, setWaist] = useState<string>('');
  const [hip, setHip] = useState<string>('');
  const [fitPreference, setFitPreference] = useState<'ajuste' | 'confortable'>('ajuste');

  useEffect(() => {
    if (!isOpen) return;
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Compute recommendation
  const recommendation = useMemo(() => {
    const b = Number(bust);
    const w = Number(waist);
    const h = Number(hip);
    if (!b || !w || !h) return null;

    // Score each size by how well the customer's measurements fit
    const scored = SIZE_TABLE.map(s => {
      let score = 0;
      // Perfect match if within range, else penalty proportional to distance
      const bustScore = b >= s.bustMin && b <= s.bustMax ? 0 : Math.min(Math.abs(b - s.bustMin), Math.abs(b - s.bustMax));
      const waistScore = w >= s.waistMin && w <= s.waistMax ? 0 : Math.min(Math.abs(w - s.waistMin), Math.abs(w - s.waistMax));
      const hipScore = h >= s.hipMin && h <= s.hipMax ? 0 : Math.min(Math.abs(h - s.hipMin), Math.abs(h - s.hipMax));
      score = bustScore + waistScore + hipScore;
      return { ...s, score };
    });

    scored.sort((a, b) => a.score - b.score);
    const best = scored[0];
    const secondBest = scored[1];

    // Between-sizes case: if best score is close to second, and prefers comfort → up
    const isBetween = best.score > 0 && (best.score - secondBest.score < 2 || best.score === secondBest.score);
    if (isBetween && fitPreference === 'confortable') {
      const larger = scored.filter(s => Number(s.size) > Number(best.size))[0];
      if (larger) return { primary: larger.size, note: 'Entre deux tailles · confort recommandé' };
    }

    return { primary: best.size, note: best.score === 0 ? 'Parfaite correspondance' : 'Meilleure approximation' };
  }, [bust, waist, hip, fitPreference]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="size-finder-title"
    >
      <div
        className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg max-h-[92vh] overflow-y-auto animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-neutral-100 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#B8956A] mb-1">
              ─── Guide ───
            </p>
            <h2 id="size-finder-title" className="font-serif text-[20px] font-light">
              {step === 'calculator' ? 'Trouvez votre taille' : 'Tableau complet'}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Fermer"
            className="w-10 h-10 flex items-center justify-center text-neutral-500 hover:text-neutral-800"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 6l12 12M6 18L18 6"/>
            </svg>
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-neutral-100">
          <button
            onClick={() => setStep('calculator')}
            className={`flex-1 py-3 text-[12px] tracking-widest uppercase font-medium transition-colors ${
              step === 'calculator' ? 'text-[#2A2A2A] border-b-2 border-[#B8956A]' : 'text-neutral-400'
            }`}
          >
            Calculateur
          </button>
          <button
            onClick={() => setStep('table')}
            className={`flex-1 py-3 text-[12px] tracking-widest uppercase font-medium transition-colors ${
              step === 'table' ? 'text-[#2A2A2A] border-b-2 border-[#B8956A]' : 'text-neutral-400'
            }`}
          >
            Tableau
          </button>
        </div>

        <div className="p-6">
          {step === 'calculator' ? (
            <>
              <p className="text-[13px] italic text-neutral-500 font-serif text-center mb-6">
                Entrez vos mesures en centimètres. Notre outil calcule la meilleure taille pour vous.
              </p>

              <div className="space-y-4">
                <MeasurementInput label="Tour de poitrine" value={bust} onChange={setBust} placeholder="ex. 88" hint="À l'endroit le plus fort" />
                <MeasurementInput label="Tour de taille" value={waist} onChange={setWaist} placeholder="ex. 68" hint="À la partie la plus creuse" />
                <MeasurementInput label="Tour de hanches" value={hip} onChange={setHip} placeholder="ex. 94" hint="À l'endroit le plus fort" />
              </div>

              <div className="mt-6">
                <p className="text-[11px] tracking-[0.1em] uppercase text-neutral-500 mb-2">
                  Vous préférez un porté
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFitPreference('ajuste')}
                    className={`p-3 rounded-lg border text-[13px] transition-all ${
                      fitPreference === 'ajuste'
                        ? 'border-[#B8956A] bg-[#F9F5EC] text-[#2A2A2A] font-medium'
                        : 'border-neutral-200 text-neutral-500'
                    }`}
                  >
                    Ajusté
                    <span className="block text-[10px] italic text-neutral-500 mt-1">Près du corps</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFitPreference('confortable')}
                    className={`p-3 rounded-lg border text-[13px] transition-all ${
                      fitPreference === 'confortable'
                        ? 'border-[#B8956A] bg-[#F9F5EC] text-[#2A2A2A] font-medium'
                        : 'border-neutral-200 text-neutral-500'
                    }`}
                  >
                    Confortable
                    <span className="block text-[10px] italic text-neutral-500 mt-1">Un peu d'aisance</span>
                  </button>
                </div>
              </div>

              {/* Result */}
              {recommendation && (
                <div className="mt-8 p-6 bg-gradient-to-br from-[#F9F5EC] to-[#F5F0E8] rounded-xl border border-[#E8DCC4]/50 text-center animate-fadeIn">
                  <p className="text-[10px] tracking-[0.25em] uppercase text-[#B8956A] mb-2">
                    ─── Votre taille recommandée ───
                  </p>
                  <p className="font-serif text-[48px] font-light text-[#2A2A2A]">
                    {recommendation.primary}
                  </p>
                  <p className="text-[12px] italic text-neutral-500 font-serif mt-1">
                    {recommendation.note}
                  </p>
                </div>
              )}

              {!recommendation && (bust || waist || hip) && (
                <p className="mt-6 text-[12px] italic text-center text-neutral-400">
                  Complétez les 3 mesures pour recevoir votre recommandation
                </p>
              )}
            </>
          ) : (
            <TableView />
          )}

          {/* How to measure */}
          <div className="mt-8 pt-6 border-t border-neutral-100">
            <h3 className="font-serif text-[15px] font-medium mb-4 text-[#2A2A2A]">
              Comment prendre ses mesures
            </h3>
            <ul className="space-y-3 text-[12px] text-neutral-600 leading-relaxed">
              <li className="flex gap-2">
                <span className="text-[#B8956A] font-medium flex-shrink-0">1 ·</span>
                <span><strong className="text-neutral-800">Poitrine</strong> : mesurez horizontalement à l'endroit le plus fort, en gardant le mètre bien plat contre le dos.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#B8956A] font-medium flex-shrink-0">2 ·</span>
                <span><strong className="text-neutral-800">Taille</strong> : mesurez à la partie la plus creuse du buste, généralement 2-3 cm au-dessus du nombril.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#B8956A] font-medium flex-shrink-0">3 ·</span>
                <span><strong className="text-neutral-800">Hanches</strong> : pieds joints, mesurez à l'endroit le plus fort des hanches et des fesses.</span>
              </li>
            </ul>
          </div>

          {/* Fallback */}
          <p className="mt-6 text-[11px] italic text-center text-neutral-400 font-serif">
            Encore un doute ? <a href="mailto:contact@luliyan-paris.com" className="text-[#B8956A] hover:underline">Écrivez-nous</a> — nous répondons en 2 heures.
          </p>
        </div>

        <style jsx>{`
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
          .animate-fadeIn { animation: fadeIn 200ms ease-out; }
          .animate-slideUp { animation: slideUp 300ms cubic-bezier(0.16, 1, 0.3, 1); }
          @media (prefers-reduced-motion: reduce) {
            .animate-fadeIn, .animate-slideUp { animation: none; }
          }
        `}</style>
      </div>
    </div>
  );
}

function MeasurementInput({ label, value, onChange, placeholder, hint }: any) {
  return (
    <div>
      <label className="block text-[11px] tracking-[0.1em] uppercase text-neutral-500 mb-1.5">
        {label}
      </label>
      <div className="relative">
        <input
          type="number"
          inputMode="numeric"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full h-12 px-4 pr-14 text-[16px] border border-neutral-200 rounded-lg focus:border-[#B8956A] focus:ring-2 focus:ring-[#B8956A]/20 focus:outline-none transition-all"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[13px] text-neutral-400">cm</span>
      </div>
      {hint && <p className="mt-1 text-[11px] italic text-neutral-400 font-serif">{hint}</p>}
    </div>
  );
}

function TableView() {
  return (
    <div className="overflow-x-auto -mx-6 px-6">
      <table className="w-full text-[12px]">
        <thead>
          <tr className="border-b border-neutral-200">
            <th className="py-3 px-2 text-left text-[10px] tracking-[0.1em] uppercase text-neutral-500 font-medium">Taille</th>
            <th className="py-3 px-2 text-right text-[10px] tracking-[0.1em] uppercase text-neutral-500 font-medium">Hauteur</th>
            <th className="py-3 px-2 text-right text-[10px] tracking-[0.1em] uppercase text-neutral-500 font-medium">Poitrine</th>
            <th className="py-3 px-2 text-right text-[10px] tracking-[0.1em] uppercase text-neutral-500 font-medium">Taille</th>
            <th className="py-3 px-2 text-right text-[10px] tracking-[0.1em] uppercase text-neutral-500 font-medium">Hanches</th>
          </tr>
        </thead>
        <tbody>
          {SIZE_TABLE.map(s => (
            <tr key={s.size} className="border-b border-neutral-100">
              <td className="py-3 px-2 font-medium text-neutral-800">{s.size}</td>
              <td className="py-3 px-2 text-right tabular-nums text-neutral-600">{s.heightMin}–{s.heightMax}</td>
              <td className="py-3 px-2 text-right tabular-nums text-neutral-600">{s.bustMin}–{s.bustMax}</td>
              <td className="py-3 px-2 text-right tabular-nums text-neutral-600">{s.waistMin}–{s.waistMax}</td>
              <td className="py-3 px-2 text-right tabular-nums text-neutral-600">{s.hipMin}–{s.hipMax}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-4 text-[11px] italic text-neutral-500 font-serif text-center">
        Toutes les mesures sont en centimètres.
      </p>
    </div>
  );
}
