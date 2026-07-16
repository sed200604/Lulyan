import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/constants';
import { products } from '@/data/products';

// In a real application, you would fetch these from your CMS or database
const MOCK_BLOG_POSTS = [
  'guide-des-tailles-burkini',
  'destinations-voyage-modeste-2024',
  'comment-entretenir-son-maillot',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;

  // Static routes
  const staticRoutes = [
    '',
    '/collection/luliyane-riviera',
    '/about',
    '/blog',
    '/faq',
    '/contact',
    '/cgv',
    '/mentions-legales',
    '/confidentialite',
    '/cookies',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === '' ? 'daily' : 'weekly') as 'daily' | 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic routes (Products)
  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Dynamic routes (Blog posts)
  const blogRoutes = MOCK_BLOG_POSTS.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes, ...blogRoutes];
}
