import Link from 'next/link';

export function EmptyCartWithOffer() {
  return (
    <div className="text-center py-16 px-6">
      <div className="text-6xl mb-6 opacity-40">🛍</div>
      <h3 className="font-serif text-[20px] text-[#2A2A2A] mb-3">
        Votre panier est vide
      </h3>
      <p className="text-[14px] text-neutral-500 mb-8 italic font-serif">
        Ajoutez un burkini et recevez un hijab d'été assorti, offert.
      </p>
      <Link
        href="/collections/burkini"
        className="inline-flex items-center gap-2 bg-[#2A2A2A] text-white px-6 py-3 rounded-lg text-[12px] tracking-[0.15em] uppercase font-medium hover:bg-black transition-all"
        onClick={() => {
          // If we are inside the cart drawer, closing it might be handled externally.
          // In standard Next.js, a Link will navigate without a hard refresh.
          const closeBtn = document.querySelector('[data-cart-close]') as HTMLButtonElement;
          if (closeBtn) closeBtn.click();
        }}
      >
        Découvrir la collection →
      </Link>

      {/* Subtle offer reminder */}
      <div className="mt-12 pt-8 border-t border-neutral-100">
        <p className="text-[10px] tracking-[0.2em] uppercase text-[#B8956A] mb-2">
          ─── ÉDITION D'ÉTÉ ───
        </p>
        <p className="text-[12px] italic text-neutral-500 font-serif">
          Un hijab d'été offert avec chaque burkini · Jusqu'au 31 août
        </p>
      </div>
    </div>
  );
}
