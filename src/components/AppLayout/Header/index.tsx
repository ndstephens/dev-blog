import Logo from '@ui/AppLayout/Header/Logo';
import SiteNav from '@ui/AppLayout/Header/SiteNav';
import MaxWidthWrapper from '@ui/shared/MaxWidthWrapper';

export function Header() {
  return (
    <header className="sticky top-0 z-10 h-headerHeight bg-surfaceClr-1">
      <MaxWidthWrapper intent="header">
        <div className="flex h-full">
          <Logo />
          <SiteNav />
        </div>
      </MaxWidthWrapper>
    </header>
  );
}
