import Logo from '@ui/AppLayout/Logo';
import SiteNavDesktop from '@ui/AppLayout/SiteNavDesktop';
import SiteNavMobile from '@ui/AppLayout/SiteNavMobile';
import MaxWidthWrapper from '@ui/shared/MaxWidthWrapper';

export function Header() {
  return (
    <div className="sticky top-0 z-[200] h-headerHeight shrink-0 bg-surfaceClr-1">
      <MaxWidthWrapper intent="header">
        <header className="flex h-full">
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
