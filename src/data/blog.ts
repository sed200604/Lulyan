export type BlogCategory = 'Style' | 'Destinations' | 'Entretien' | 'Tendances';

export type BlogBlock = 
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'pullquote'; text: string; author?: string }
  | { type: 'image'; src: string; alt: string; caption?: string }
  | { type: 'products'; productIds: string[] };

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  readTime: number; // minutes
  date: string;
  heroImage: string;
  blocks: BlogBlock[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    slug: '5-facons-de-porter-votre-burkini',
    title: '5 façons de porter votre burkini de la plage au restaurant',
    excerpt: 'Le burkini n\'est plus simplement un maillot de bain. C\'est une pièce de mode à part entière qui peut vous accompagner bien au-delà de la plage. Découvrez nos 5 looks préférés.',
    category: 'Style',
    readTime: 5,
    date: '20 Juin 2026',
    heroImage: 'https://images.unsplash.com/photo-1515347619362-72c695b18a6e?q=80&w=2000&auto=format&fit=crop', // Stylish woman at resort
    blocks: [
      {
        type: 'paragraph',
        text: 'Le burkini n\'est plus simplement un vêtement fonctionnel pour la baignade. Chez Luliyane Paris, nous l\'avons repensé comme une véritable tenue estivale, élégante et versatile. Avec les bons accessoires, votre maillot se transforme instantanément en une tenue de ville sophistiquée.'
      },
      {
        type: 'heading',
        text: '1. Le Look Riviera'
      },
      {
        type: 'paragraph',
        text: 'Associez votre haut de burkini à un grand paréo fluide noué à la taille. Complétez le look avec des sandales dorées plates, des lunettes de soleil oversize et un sac en raphia. Parfait pour passer du transat à la terrasse d\'un café.'
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1499939667766-4afceb292d05?q=80&w=1200&auto=format&fit=crop',
        alt: 'Look Riviera - Accessoires d\'été',
        caption: 'Jouez avec les matières naturelles comme le raphia et le lin.'
      },
      {
        type: 'pullquote',
        text: 'La mode modeste, c\'est célébrer sa féminité avec confiance et élégance, peu importe l\'endroit.',
      },
      {
        type: 'heading',
        text: '2. Le Chic Minimaliste'
      },
      {
        type: 'paragraph',
        text: 'Pour un dîner en bord de mer, superposez une robe chemise en lin ouverte sur votre ensemble. Ajoutez des bijoux dorés minimalistes et des mules à petits talons. L\'aspect satiné de nos tissus de bain se mariera parfaitement avec la texture brute du lin.'
      },
      {
        type: 'products',
        productIds: ['burkini-noir-intemporel', 'burkini-beige-sable'] // Mock IDs matching existing DB if possible
      }
    ]
  },
  {
    id: 'post-2',
    slug: 'destinations-plages-privees-dubai',
    title: 'Les 10 plus belles plages privées de Dubaï',
    excerpt: 'Notre sélection des plages privées les plus exclusives de Dubaï pour un séjour alliant luxe, intimité et sérénité.',
    category: 'Destinations',
    readTime: 4,
    date: '18 Juin 2026',
    heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2000&auto=format&fit=crop', // Dubai beach
    blocks: [
      {
        type: 'paragraph',
        text: 'Dubaï est mondialement connue pour ses infrastructures luxueuses, mais la ville cache également des havres de paix parfaits pour se détendre en toute intimité. Voici notre guide exclusif.'
      },
      {
        type: 'heading',
        text: 'Bulgari Resort Beach'
      },
      {
        type: 'paragraph',
        text: 'Située sur Jumeira Bay Island, cette plage offre une intimité incomparable. Le sable immaculé et le service cinq étoiles en font notre destination coup de cœur de l\'année.'
      }
    ]
  },
  {
    id: 'post-3',
    slug: 'comment-entretenir-son-burkini',
    title: 'Le guide ultime pour entretenir votre burkini',
    excerpt: 'Prolongez la durée de vie de votre maillot Luliyane Paris grâce à ces conseils d\'experts en entretien textile.',
    category: 'Entretien',
    readTime: 3,
    date: '15 Juin 2026',
    heroImage: 'https://images.unsplash.com/photo-1607582544645-c49b062eb185?q=80&w=2000&auto=format&fit=crop', // Fresh towels / spa
    blocks: [
      {
        type: 'paragraph',
        text: 'Nos tissus premium sont conçus pour résister au chlore et au sel, mais un entretien adapté est essentiel pour préserver leur élasticité et l\'éclat de leurs couleurs.'
      },
      {
        type: 'heading',
        text: 'Rinçage Immédiat'
      },
      {
        type: 'paragraph',
        text: 'La règle d\'or : rincez toujours votre maillot à l\'eau claire et froide immédiatement après la baignade. Cela permet d\'éliminer le sel, le chlore et les résidus de crème solaire avant qu\'ils ne pénètrent la fibre.'
      }
    ]
  },
  {
    id: 'post-4',
    slug: 'tendances-modest-fashion-ete-2026',
    title: 'Modest fashion : Les 5 tendances de l\'été 2026',
    excerpt: 'Des tons terriens aux coupes architecturales, décryptage des tendances qui vont marquer la mode modeste cette saison.',
    category: 'Tendances',
    readTime: 6,
    date: '10 Juin 2026',
    heroImage: 'https://images.unsplash.com/photo-1550614000-4b95dd244e8c?q=80&w=2000&auto=format&fit=crop', // Fashion aesthetic
    blocks: [
      {
        type: 'paragraph',
        text: 'La saison estivale 2026 marque un retour aux sources et à l\'élégance discrète. Le minimalisme est plus que jamais de rigueur, mais il se pare de détails architecturaux qui font toute la différence.'
      }
    ]
  },
  {
    id: 'post-5',
    slug: 'valise-ideale-maldives',
    title: 'La valise modeste idéale pour les Maldives',
    excerpt: 'Préparez votre voyage de rêve avec notre check-list des indispensables à glisser dans votre valise pour les Maldives.',
    category: 'Destinations',
    readTime: 4,
    date: '5 Juin 2026',
    heroImage: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=2000&auto=format&fit=crop', // Maldives
    blocks: [
      {
        type: 'paragraph',
        text: 'Eau turquoise, sable blanc et soleil de plomb : les Maldives font rêver. Mais comment s\'habiller pour allier pudeur, style et confort sous les tropiques ?'
      }
    ]
  },
  {
    id: 'post-6',
    slug: 'pourquoi-choisir-notre-qualite',
    title: 'Le secret de notre qualité : nos tissus balnéaires premium',
    excerpt: 'Plongez dans les coulisses de Luliyane Paris et découvrez comment nous sélectionnons nos tissus de haute qualité.',
    category: 'Style',
    readTime: 5,
    date: '1 Juin 2026',
    heroImage: 'https://images.unsplash.com/photo-1620799139834-6b8f844fbe61?q=80&w=2000&auto=format&fit=crop', // Fabric texture
    blocks: [
      {
        type: 'paragraph',
        text: 'La qualité d\'un burkini se juge d\'abord à son tissu. Chez Luliyane Paris, nous refusons les compromis. C\'est pourquoi nous nous fournissons auprès des meilleurs fabricants pour vous garantir confort et opacité.'
      }
    ]
  }
];
