import { ProductColor } from '@/types/product';

interface ColorPickerProps {
  colors: ProductColor[];
  selectedColorSlug: string;
  onColorSelect: (slug: string) => void;
}

export function ColorPicker({ colors, selectedColorSlug, onColorSelect }: ColorPickerProps) {
  if (!colors || colors.length === 0) return null;

  const selectedColor = colors.find(c => c.slug === selectedColorSlug) || colors[0];

  return (
    <div className="flex flex-col mb-6">
      {/* Label */}
      <div className="font-sans text-[11px] text-[#1A1A1A] uppercase tracking-wide mb-3">
        COULEUR : <span className="text-[#666666]">{selectedColor.name}</span>
      </div>

      {/* Swatches */}
      <div className="flex flex-row gap-3 flex-wrap">
        {colors.map((color) => {
          const isActive = color.slug === selectedColor.slug;

          return (
            <button
              key={color.slug}
              onClick={() => onColorSelect(color.slug)}
              className="relative rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A14E]"
              aria-label={`Sélectionner la couleur ${color.name}`}
              aria-pressed={isActive}
            >
              <div 
                className={`flex items-center justify-center rounded-full transition-all duration-300
                  ${isActive ? 'w-[40px] h-[40px] border-2 border-[#1A1A1A] p-[2px]' : 'w-[40px] h-[40px] border border-[#1A1A1A]/10 p-0'}
                `}
              >
                <div 
                  className="w-full h-full rounded-full"
                  style={{ backgroundColor: color.value }}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
