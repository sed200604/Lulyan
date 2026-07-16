interface PrimaryATCProps {
  price: number;
  onClick: () => void;
  disabled?: boolean;
}

export function PrimaryATC({ price, onClick, disabled }: PrimaryATCProps) {
  const formatPrice = (price: number) => {
    return price.toLocaleString('fr-FR', { minimumFractionDigits: 2 }).replace('.', ',') + ' €';
  };

  return (
    <div className="w-full mb-3">
      <button
        onClick={onClick}
        disabled={disabled}
        className={`w-full py-4 bg-[#1A1A1A] text-white font-sans text-[13px] uppercase tracking-[0.08em] transition-all duration-300 rounded-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A14E] focus-visible:ring-offset-2
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#1A1A1A]/90 animate-cta-breathe hover:animate-none border border-[#1A1A1A] hover:border-transparent'}
        `}
      >
        AJOUTER AU PANIER • {formatPrice(price)}
      </button>
    </div>
  );
}
