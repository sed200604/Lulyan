interface CredibilityPillsProps {
  pillars?: string[];
}

export function CredibilityPills({ pillars }: CredibilityPillsProps) {
  if (!pillars || pillars.length === 0) return null;

  return (
    <div className="flex flex-row gap-2 overflow-x-auto hide-scrollbar mb-8 mt-6">
      {pillars.map((pillar, idx) => (
        <div 
          key={idx}
          className="shrink-0 border border-[#C5A14E] bg-transparent px-[12px] py-[6px] rounded-[4px]"
        >
          <span className="font-sans text-[11px] font-normal text-[#1A1A1A] tracking-wide whitespace-nowrap">
            {pillar}
          </span>
        </div>
      ))}
    </div>
  );
}
