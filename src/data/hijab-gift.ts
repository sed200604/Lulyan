import placeholders from './hijab-blur-placeholders.json';

export type HijabColor = {
  slug: 'champagne' | 'noir-ivoire' | 'sable-dore' | 'blanc';
  name: string;
  hex: string;
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
  blurDataURL: string;
  altText: string;
  note: string;
  matchingBurkiniColors: string[];  // for smart default selection
};

export const HIJAB_COLORS: HijabColor[] = [
  {
    slug: 'champagne',
    name: 'Champagne',
    hex: '#E8D9BA',
    imageUrl: '/gifts/hijab-sable.jpg',
    imageWidth: 1200,
    imageHeight: 1500,
    blurDataURL: (placeholders as any).champagne,
    altText: 'Hijab d\'été Champagne — voile de coton doré et lumineux',
    note: 'Universel · s\'accorde à tout',
    matchingBurkiniColors: ['noir', 'blanc', 'beige', 'bordeaux'],
  },
  {
    slug: 'noir-ivoire',
    name: 'Noir Ivoire',
    hex: '#1E1E1E',
    imageUrl: '/gifts/hijab-noir.jpg',
    imageWidth: 1200,
    imageHeight: 1500,
    blurDataURL: (placeholders as any).noir,
    altText: 'Hijab d\'été Noir Ivoire — voile classique et intemporel',
    note: 'Classique · pour burkini noir',
    matchingBurkiniColors: ['noir', 'gris'],
  },
  {
    slug: 'sable-dore',
    name: 'Sable Doré',
    hex: '#C4A67A',
    imageUrl: '/gifts/hijab-champagne.jpg',
    imageWidth: 1200,
    imageHeight: 1500,
    blurDataURL: (placeholders as any).sable,
    altText: 'Hijab d\'été Sable Doré — voile aux nuances estivales',
    note: 'Estival · pour burkini clair',
    matchingBurkiniColors: ['beige', 'blanc', 'sable', 'terracotta'],
  },
  {
    slug: 'blanc',
    name: 'Blanc',
    hex: '#F9F9F9',
    imageUrl: '/gifts/hijab-blanc.jpg',
    imageWidth: 1200,
    imageHeight: 1500,
    blurDataURL: (placeholders as any).bleu,
    altText: 'Hijab d\'été Blanc — voile pur et lumineux',
    note: 'Lumineux · pour tout burkini',
    matchingBurkiniColors: ['noir', 'marine', 'vert', 'bleu'],
  },
];

export function getHijabByColor(slug: string): HijabColor | undefined {
  return HIJAB_COLORS.find(c => c.slug === slug);
}

export function getRecommendedColorForBurkini(burkiniColor: string): string {
  const match = HIJAB_COLORS.find(c =>
    c.matchingBurkiniColors.some(bc => burkiniColor.toLowerCase().includes(bc))
  );
  return match?.slug ?? 'champagne';  // fallback
}
