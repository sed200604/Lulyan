import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  // Generate JSON-LD for breadcrumbs
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href ? `https://luliyane.com${item.href}` : undefined,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <nav aria-label="Fil d'Ariane" className={`bg-[#FAF7F2] px-5 py-3.5 border-b border-[#1A1A1A]/[0.06] ${className}`}>
        <ol className="flex items-center flex-wrap gap-2 font-sans text-[10px] uppercase tracking-[0.16em]">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            
            return (
              <li key={index} className="flex items-center gap-2">
                {isLast || !item.href ? (
                  <span className="text-[#1A1A1A] font-medium" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <>
                    <Link 
                      href={item.href}
                      className="text-[#5A5247] hover:text-[#C5A14E] transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                    <svg viewBox="0 0 8 8" fill="none" stroke="#C5A14E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-2 h-2">
                      <path d="M3 1.5 L5.5 4 L3 6.5"/>
                    </svg>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
