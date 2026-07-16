'use client';

import { DesktopNewsletterSignup } from './DesktopNewsletterSignup';
import { MobileNewsletterSignup } from './MobileNewsletterSignup';

export function NewsletterSignup() {
  return (
    <>
      {/* Desktop Version */}
      <div className="hidden md:block">
        <DesktopNewsletterSignup />
      </div>

      {/* Mobile Version */}
      <div className="block md:hidden">
        <MobileNewsletterSignup />
      </div>
    </>
  );
}