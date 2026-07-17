const fs = require('fs');
let code = fs.readFileSync('src/data/products.ts', 'utf8');

// Insert isGiftEligible: true to all existing products
code = code.replace(/isFeatured:\s*(true|false),/g, 'isFeatured: $1,\n    isGiftEligible: true,');

// Now append the hijab-ete-2026 product before the closing `];`
const hijab = `  {
    id: 'GIFT-001',
    slug: 'hijab-ete-2026',
    name: 'Hijab d\\'Été 2026',
    subtitle: 'Notre édition d\\'été en voile de coton léger. Offert avec chaque burkini de la collection.',
    collection: 'luliyane-riviera',
    category: 'riviera',
    style: 'integral',
    price: 25.00,
    currency: 'EUR',
    colors: [
      { name: 'Champagne', value: '#E8D9BA', slug: 'champagne', image: '/gifts/hijab-champagne.jpg' },
      { name: 'Noir Ivoire', value: '#1E1E1E', slug: 'noir-ivoire', image: '/gifts/hijab-noir.jpg' },
      { name: 'Sable Doré', value: '#C4A67A', slug: 'sable-dore', image: '/gifts/hijab-sable.jpg' },
      { name: 'Bleu Profond', value: '#1F3A5F', slug: 'bleu-profond', image: '/gifts/hijab-bleu.jpg' }
    ],
    sizes: [
      { label: 'Standard', value: 'standard', inStock: true }
    ],
    images: [],
    description: 'Notre édition d\\'été en voile de coton léger. Offert avec chaque burkini de la collection.',
    shortDescription: 'Offert avec chaque burkini de la collection.',
    features: ['Voile de coton léger', '180 × 90 cm'],
    fabricDetails: 'Coton léger',
    fabric: 'Coton',
    careInstructions: [],
    inStock: true,
    stockQuantity: 100,
    rating: 5,
    reviewCount: 0,
    createdAt: new Date().toISOString(),
    tags: [],
    isNew: true,
    isFeatured: false,
    isGiftOnly: true,
  }`;

const endBracket = code.indexOf('];');
if (endBracket !== -1) {
  code = code.substring(0, endBracket) + ',\n' + hijab + '\n' + code.substring(endBracket);
  fs.writeFileSync('src/data/products.ts', code);
  console.log("Success");
} else {
  console.log("Could not find end bracket");
}
