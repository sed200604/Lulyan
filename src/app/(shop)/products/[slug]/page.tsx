import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/data/products';
import { SITE_CONFIG, ROUTES, PRODUCT_SLUGS } from '@/lib/constants';
import Link from 'next/link';
import { preload } from 'react-dom';

// Components
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductInfo } from '@/components/product/ProductInfo';
import { ProductAccordions } from '@/components/product/ProductAccordions';
import { ProductReviews } from '@/components/product/ProductReviews';
import { RelatedProducts } from '@/components/product/RelatedProducts';
import { StickyAddToCart } from '@/components/product/StickyAddToCart';

interface Props {
  params: { slug: string };
}

// Static generation
export async function generateStaticParams() {
  return PRODUCT_SLUGS.map((slug) => ({ slug }));
}

// Dynamic metadata per product
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  if (!product) return {};
  
  return {
    title: `${product.name} — ${SITE_CONFIG.collectionName}`,
    description: `${product.name} par ${SITE_CONFIG.name}. ${product.description.slice(0, 150)}...`,
    openGraph: {
      title: `${product.name} — ${SITE_CONFIG.name}`,
      description: product.description.slice(0, 200),
      images: [{ url: product.images[0]?.src || '', width: 1000, height: 1333 }],
      type: 'website',
    },
  };
}

export default function ProductPage({ params }: Props) {
  const product = getProductBySlug(params.slug);
  
  if (!product) {
    notFound();
  }

  // Preload LCP hero image
  if (product.images[0]?.src) {
    preload(product.images[0].src, { as: 'image' });
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images.map(img => `${SITE_CONFIG.url}${img.src}`),
    brand: {
      '@type': 'Brand',
      name: SITE_CONFIG.name,
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'EUR',
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      priceValidUntil: '2027-12-31',
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0',
          currency: 'EUR',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: { '@type': 'QuantitativeValue', minValue: 1, maxValue: 2 },
          transitTime: { '@type': 'QuantitativeValue', minValue: 2, maxValue: 5 },
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'FR',
        },
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating.toString(),
      reviewCount: product.reviewCount.toString(),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen pt-24 lg:pt-32 pb-16 md:pb-0">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <nav className="flex items-center text-[10px] md:text-xs font-montserrat tracking-wider uppercase text-neutral-500">
            <Link href={ROUTES.HOME} className="hover:text-brand-gold-500 transition-colors">Accueil</Link>
            <span className="mx-2 text-brand-gold-500">/</span>
            <Link href={ROUTES.COLLECTION} className="hover:text-brand-gold-500 transition-colors">{SITE_CONFIG.collectionName}</Link>
            <span className="mx-2 text-brand-gold-500">/</span>
            <span className="text-neutral-900 truncate">{product.name}</span>
          </nav>
        </div>

        {/* Product Layout: Desktop 55/45 */}
        <div className="max-w-7xl mx-auto px-0 md:px-6 mb-16 md:mb-24">
          <div className="flex flex-col md:flex-row gap-0 md:gap-12 lg:gap-16">
            
            {/* Left: Gallery (55%) */}
            <div className="w-full md:w-[55%]">
              <ProductGallery images={product.images} productName={product.name} />
            </div>

            {/* Right: Info (45%) */}
            <div className="w-full md:w-[45%] px-4 md:px-0 pt-8 md:pt-0">
              <ProductInfo product={product} />
            </div>

          </div>
        </div>

        {/* Accordions */}
        <div className="bg-[#FFFEF9] py-16 border-t border-neutral-100">
          <ProductAccordions product={product} />
        </div>

        {/* Reviews */}
        <ProductReviews product={product} />

        {/* Recommended Products */}
        <RelatedProducts currentProductId={product.id} />
      </main>

      <StickyAddToCart product={product} />
    </>
  );
}