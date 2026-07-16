import Link from 'next/link';
import Image from 'next/image';
import { Plus } from 'lucide-react';
import { Product } from '@/types/product';

// Let's create a local helper for now, or just assume the parent passes the resolved products.
// It's cleaner to pass resolved products to the component.

interface CrossSellProps {
  products: Product[];
}

export function CrossSell({ products }: CrossSellProps) {
  if (!products || products.length === 0) return null;

  return (
    <div className="flex flex-col my-12">
      <h2 className="font-heading text-[24px] text-[#1A1A1A] uppercase tracking-[0.02em] font-light mb-6">
        COMPLÉTER LE LOOK
      </h2>
      
      <div className="flex flex-row overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 pb-4">
        {products.map((product) => (
          <div key={product.id} className="relative flex flex-col shrink-0 snap-start w-[120px] group cursor-pointer">
            <Link href={`/products/${product.slug}`} className="block relative aspect-[3/4] w-[120px] mb-3 overflow-hidden bg-[#FAF7F2]">
              <Image 
                src={product.images[0].src} 
                alt={product.name} 
                fill 
                sizes="120px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Quick Add Button */}
              <button 
                className="absolute bottom-2 right-2 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-[#C5A14E] hover:text-white transition-colors z-10"
                onClick={(e) => {
                  e.preventDefault();
                  // Trigger quick add to cart modal or logic
                }}
              >
                <Plus className="w-4 h-4" />
              </button>
            </Link>
            
            <div className="flex flex-col">
              <Link href={`/products/${product.slug}`} className="font-sans text-[12px] text-[#1A1A1A] font-medium leading-[1.4] line-clamp-2 hover:text-[#C5A14E] transition-colors">
                {product.name}
              </Link>
              <span className="font-sans text-[12px] text-[#666666] mt-1">
                {product.price.toLocaleString('fr-FR', { minimumFractionDigits: 2 }).replace('.', ',')} €
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
