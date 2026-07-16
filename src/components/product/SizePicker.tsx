import { ProductSize } from '@/types/product';

interface SizePickerProps {
  sizes: ProductSize[];
  selectedSizeValue: string;
  onSizeSelect: (value: string) => void;
}

export function SizePicker({ sizes, selectedSizeValue, onSizeSelect }: SizePickerProps) {
  if (!sizes || sizes.length === 0) return null;

  const selectedSize = sizes.find(s => s.value === selectedSizeValue) || sizes[0];

  return (
    <div className="flex flex-col mb-8">
      {/* Label and Guide */}
      <div className="flex items-center justify-between mb-3">
        <div className="font-sans text-[11px] text-[#1A1A1A] uppercase tracking-wide">
          TAILLE : <span className="text-[#666666]">{selectedSize.label}</span>
        </div>
        <button className="font-sans text-[11px] text-[#1A1A1A] underline decoration-[#1A1A1A]/30 underline-offset-4 tracking-wide hover:decoration-[#1A1A1A] transition-colors">
          Guide des tailles
        </button>
      </div>

      {/* Size Pills */}
      <div className="flex flex-row gap-2 flex-wrap">
        {sizes.map((size) => {
          const isActive = size.value === selectedSize.value;
          const isOOS = !size.inStock;

          return (
            <button
              key={size.value}
              onClick={() => {
                if (!isOOS) onSizeSelect(size.value);
              }}
              disabled={isOOS}
              className={`relative flex items-center justify-center w-[48px] h-[40px] rounded-[4px] font-sans text-[13px] tracking-wide focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A14E] transition-colors
                ${isActive ? 'bg-[#1A1A1A] text-white border border-[#1A1A1A]' : ''}
                ${!isActive && !isOOS ? 'bg-transparent text-[#1A1A1A] border border-[#1A1A1A]/20 hover:border-[#1A1A1A]' : ''}
                ${isOOS ? 'bg-[#F5F5F5] text-[#1A1A1A]/40 border border-transparent cursor-not-allowed overflow-hidden' : ''}
              `}
              aria-label={`Taille ${size.label}`}
              aria-pressed={isActive}
            >
              {size.label}
              
              {/* Out of Stock Strike-through */}
              {isOOS && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[120%] h-[1px] bg-[#1A1A1A]/30 transform -rotate-45" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
