import MaxWidthWrapper from '@ui/shared/MaxWidthWrapper';

import Logo from './Logo';
import SiteNavDesktop from './SiteNavDesktop';
import SiteNavMobile from './SiteNavMobile';

export default function SiteHeader() {
  return (
    <div className="sticky top-0 z-[200] h-[48px] shrink-0 bg-surfaceClr-1 xs:h-[52px]">
      <MaxWidthWrapper intent="siteHeader">
        <header className="flex h-full items-center">
          <Logo />
          <div className="ml-auto h-full font-sans text-lg font-medium uppercase tracking-wide text-textClr-3 md:text-base">
            <SiteNavDesktop />
            <SiteNavMobile />
          </div>
        </header>
      </MaxWidthWrapper>
    </div>
  );
}
