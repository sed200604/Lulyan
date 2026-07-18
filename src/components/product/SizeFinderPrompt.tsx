'use client';
import { useState } from 'react';
import { SizeFinderModal } from './SizeFinderModal';

export function SizeFinderPrompt() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setModalOpen(true)}
        className="w-full mt-3 py-3 px-4 rounded-lg bg-[#F9F5EC] border border-[#E8DCC4]/50 flex items-center justify-between group hover:bg-[#F5F0E8] transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/60 flex items-center justify-center text-[#B8956A]">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 3v14M3 10h14M6 6l8 8M14 6l-8 8"/>
            </svg>
          </div>
          <div className="text-left">
            <p className="text-[13px] font-medium text-[#2A2A2A]">
              Trouvez votre taille en 20 secondes
            </p>
            <p className="text-[11px] italic text-neutral-500 font-serif">
              Recommandation personnalisée · 100% des retours évités
            </p>
          </div>
        </div>
        <div className="text-[#B8956A] group-hover:translate-x-1 transition-transform">
          →
        </div>
      </button>

      <SizeFinderModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
