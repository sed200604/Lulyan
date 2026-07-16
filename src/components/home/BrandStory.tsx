import { DesktopBrandStory } from './DesktopBrandStory';
import { MobileBrandStory } from './MobileBrandStory';

export function BrandStory() {
  return (
    <>
      <MobileBrandStory />
      <DesktopBrandStory />
    </>
  );
}