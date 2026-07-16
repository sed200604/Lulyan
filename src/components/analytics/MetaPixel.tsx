'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { grantConsent, hasConsent, trackPageView } from '@/lib/pixel';

function MetaPixelTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Restore consent from localStorage immediately (don't wait for CookieBanner's 500ms delay).
    // setTimeout(0) yields one tick so the beforeInteractive pixel init script has already run.
    const restoreTimer = setTimeout(() => {
      try {
        const stored = JSON.parse(localStorage.getItem('cookieConsent') || '{}');
        if (stored.marketing && !hasConsent()) {
          grantConsent();
        }
      } catch { /* ignore parse errors */ }
    }, 0);

    // Also listen for the CookieBanner event (first-time acceptance in the same session).
    const handleConsent = () => {
      if (!hasConsent()) grantConsent();
    };

    window.addEventListener('cmp:consent:granted', handleConsent);
    return () => {
      clearTimeout(restoreTimer);
      window.removeEventListener('cmp:consent:granted', handleConsent);
    };
  }, []);

  // Re-fire PageView on client-side route changes (consent already confirmed above).
  useEffect(() => {
    if (pathname) trackPageView();
  }, [pathname, searchParams]);

  return null;
}

export function MetaPixel() {
  return (
    <Suspense fallback={null}>
      <MetaPixelTracker />
    </Suspense>
  );
}
