import { Metadata } from 'next';
import { MobileVideoHero } from '@/components/hero/MobileVideoHero';
import { GiftOfferHomeCallout } from '@/components/home/GiftOfferHomeCallout';
import CollectionShowcase from '@/components/home/CollectionShowcase';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { BrandStory } from '@/components/home/BrandStory';
import { SocialProof } from '@/components/home/SocialProof';
import { InstagramFeed } from '@/components/home/InstagramFeed';
import { NewsletterSignup } from '@/components/home/NewsletterSignup';
import { StructuredData } from '@/components/seo/StructuredData';

import { BurkiniExpertiseCallout } from '@/components/home/BurkiniExpertiseCallout';

export const metadata: Metadata = {
  title: 'LULIYANE PARIS | Burkini & Mode Modeste de Luxe',
  description: 'Burkini élégant conçu à Paris. Qualité premium, séchage rapide, protection solaire. Livraison offerte en France.',
};

export default function Home() {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'LULIYANE PARIS',
    url: 'https://luliyane.paris',
    logo: 'https://luliyane.paris/images/logo.png',
    sameAs: [
      'https://instagram.com/luliyane.paris',
      'https://tiktok.com/@luliyane.paris',
      'https://facebook.com/luliyane.paris',
      'https://pinterest.com/luliyane.paris'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+33-X-XX-XX-XX-XX',
      contactType: 'customer service',
      availableLanguage: ['French', 'English', 'Arabic']
    }
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'LULIYANE PARIS',
    url: 'https://luliyane.paris',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://luliyane.paris/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <StructuredData data={[orgSchema, websiteSchema]} />
      <MobileVideoHero />
      <GiftOfferHomeCallout />
      <CollectionShowcase />
      <FeaturedProducts />
      <BrandStory />
      <BurkiniExpertiseCallout />
      <SocialProof />
      <InstagramFeed />
      <NewsletterSignup />
    </div>
  );
}