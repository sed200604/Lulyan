'use client';

import { DesktopSocialProof } from './DesktopSocialProof';
import { MobileSocialProof } from './MobileSocialProof';

export function SocialProof() {
  return (
    <>
      <DesktopSocialProof />
      <MobileSocialProof />
    </>
  );
}