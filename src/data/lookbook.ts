export interface LookbookImage {
  src: string;
  alt: string;
  layout: 'fullscreen' | 'detail' | 'main';
}

export interface LookbookLook {
  id: string;
  name: string;
  description: string;
  images: LookbookImage[];
  productIds: string[];
}

export const LOOKBOOK_DATA: LookbookLook[] = [
  {
    id: 'look-1',
    name: 'Riviera Noir',
    description:
      "L'élégance intemporelle du noir sublimée par les reflets dorés de la Méditerranée. Un look architectural qui allie modestie et sophistication.",
    images: [
      {
        src: '/images/products/product-1/photo 1.webp',
        alt: 'Riviera Noir — look complet',
        layout: 'fullscreen',
      },
      {
        src: '/images/products/product-1/vue-28.webp',
        alt: 'Riviera Noir — détail tissu',
        layout: 'detail',
      },
      {
        src: '/images/products/product-1/vue-26.webp',
        alt: 'Riviera Noir — silhouette',
        layout: 'main',
      },
    ],
    productIds: ['LR-001', 'LR-002'],
  },
  {
    id: 'look-2',
    name: 'Lumière Dorée',
    description:
      "Les teintes chaudes de l'or capturent l'essence du soleil de la Côte. Un ensemble lumineux pour une présence remarquable en bord de mer.",
    images: [
      {
        src: '/images/products/product-1/vue-beach.webp',
        alt: 'Lumière Dorée — look complet',
        layout: 'fullscreen',
      },
      {
        src: '/images/products/product-1/vue-29.webp',
        alt: 'Lumière Dorée — détail',
        layout: 'detail',
      },
      {
        src: '/images/products/product-1/vue-27.webp',
        alt: 'Lumière Dorée — silhouette',
        layout: 'main',
      },
    ],
    productIds: ['LR-003', 'LR-004'],
  },
  {
    id: 'look-3',
    name: 'Prestige Bleu Marine',
    description:
      "La profondeur du bleu marine évoque les eaux cristallines de la Méditerranée. Un look prestige pour celles qui osent l'élégance absolue.",
    images: [
      {
        src: '/images/products/product-1/vue-26.webp',
        alt: 'Prestige Bleu Marine — look complet',
        layout: 'fullscreen',
      },
      {
        src: '/images/products/product-1/photo 1.webp',
        alt: 'Prestige Bleu Marine — détail',
        layout: 'detail',
      },
      {
        src: '/images/products/product-1/vue-beach.webp',
        alt: 'Prestige Bleu Marine — silhouette',
        layout: 'main',
      },
    ],
    productIds: ['LR-005', 'LR-006'],
  },
];
