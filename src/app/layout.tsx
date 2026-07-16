import type { Metadata, Viewport } from 'next';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import { cormorant, montserrat } from '@/lib/fonts';
import { AnalyticsScripts } from '@/components/analytics/AnalyticsScripts';
import { MetaPixel } from '@/components/analytics/MetaPixel';
import './globals.css';

const CookieBanner = dynamic(() => import('@/components/layout/CookieBanner').then(mod => mod.CookieBanner), { ssr: false });
const CartDrawer = dynamic(() => import('@/components/cart/CartDrawer').then(mod => mod.CartDrawer), { ssr: false });
const WelcomePopup = dynamic(() => import('@/components/marketing/WelcomePopup').then(mod => mod.WelcomePopup), { ssr: false });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#FAF9F6', // brand-cream-50
};

export const metadata: Metadata = {
  metadataBase: new URL('https://luliyane.paris'),
  title: {
    default: 'LULIYANE PARIS | Burkini & Mode Modeste de Luxe',
    template: '%s | LULIYANE PARIS',
  },
  description: 'Burkini élégant conçu à Paris. Qualité premium, séchage rapide, protection solaire. Livraison offerte en France.',
  keywords: [
    'burkini élégant',
    'burkini femme',
    'LULIYANE RIVIERA',
    'maillot de bain modest',
    'burkini paris',
    'burkini protection solaire',
    'burkini séchage rapide',
    'modest swimwear',
    'burkini qualité',
    'burkini piscine',
    'burkini plage',
    'burkini confortable',
  ],
  authors: [{ name: 'LULIYANE PARIS' }],
  creator: 'LULIYANE PARIS',
  publisher: 'LULIYANE PARIS',
  formatDetection: { email: false, telephone: false },
  alternates: {
    canonical: 'https://luliyane.paris',
    languages: { 'fr-FR': 'https://luliyane.paris', 'en': 'https://luliyane.paris/en' },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://luliyane.paris',
    siteName: 'LULIYANE PARIS',
    title: 'LULIYANE PARIS | Burkini & Mode Modeste de Luxe',
    description: 'Burkini et maillots de bain modestes de luxe, conçus à Paris.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'LULIYANE PARIS' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LULIYANE PARIS | Burkini & Mode Modeste de Luxe',
    description: 'Burkini et maillots de bain modestes de luxe, conçus à Paris.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  verification: {
    google: '[À COMPLÉTER]', // Replace with actual Google Site Verification token
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <AnalyticsScripts />
        <Script
          id="meta-pixel-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window,document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('consent', 'revoke');
              fbq('init', '1532819011643081');
            `,
          }}
        />
        <noscript>
          <img
            height="1" width="1" style={{display:'none'}}
            src="https://www.facebook.com/tr?id=1532819011643081&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body className={`${cormorant.variable} ${montserrat.variable} font-body bg-brand-cream-50 text-brand-black-950 antialiased min-h-screen flex flex-col`}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-white focus:text-brand-black-900">
          Aller au contenu principal
        </a>
        {children}
        <MetaPixel />
        <CookieBanner />
        <CartDrawer />
        <WelcomePopup />
      </body>
    </html>
  );
}

