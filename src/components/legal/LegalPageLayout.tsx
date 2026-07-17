import React from 'react';

export function LegalPageLayout({ title, lastUpdated, children }: { title: string; lastUpdated?: string; children: React.ReactNode }) {
  return (
    <article className="max-w-[720px] mx-auto px-6 py-16 lg:py-24">
      {/* Editorial header */}
      <div className="text-center mb-16">
        <p className="text-[11px] tracking-[0.2em] uppercase text-[#B8956A] mb-4">
          ─── LULIYANE PARIS ───
        </p>
        <h1 className="font-serif text-[32px] md:text-[42px] font-light leading-tight text-[#2A2A2A]">
          {title}
        </h1>
        {lastUpdated && (
          <p className="mt-3 text-[13px] italic text-neutral-500 font-serif">
            Dernière mise à jour : {lastUpdated}
          </p>
        )}
      </div>

      {/* Body */}
      <div className="prose prose-neutral max-w-none
                      prose-headings:font-serif prose-headings:font-light
                      prose-h2:text-[24px] prose-h2:mt-12 prose-h2:mb-4
                      prose-h2:before:content-['\\2500\\2500\\2500'] prose-h2:before:text-[#B8956A]/50 prose-h2:before:mr-3
                      prose-p:text-[15px] prose-p:leading-[1.7] prose-p:text-[#555]
                      prose-a:text-[#B8956A] prose-a:no-underline hover:prose-a:underline prose-a:font-medium
                      prose-strong:text-[#2A2A2A] prose-strong:font-medium
                      prose-ul:my-4 prose-li:text-[14px] prose-li:text-[#555] prose-li:leading-[1.6]">
        {children}
      </div>
    </article>
  );
}
