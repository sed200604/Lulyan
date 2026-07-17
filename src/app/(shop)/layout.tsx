import { PromoStrip } from '@/components/layout/PromoStrip';
import { Header } from '@/components/layout/Header';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { SearchOverlay } from '@/components/layout/SearchOverlay';
import { Footer } from '@/components/layout/Footer';

import GiftOfferBanner from '@/components/marketing/GiftOfferBanner';

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <GiftOfferBanner />
      <main id="main-content" className="flex-1 flex flex-col">
        {children}
      </main>
      <Footer />
      <MobileMenu />
      <SearchOverlay />
    </>
  );
}
