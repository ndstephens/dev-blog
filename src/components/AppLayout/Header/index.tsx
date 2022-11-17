import Logo from 'src/components/AppLayout/Header/Logo';
import SiteNav from 'src/components/AppLayout/Header/SiteNav';
import MaxWidthWrapper from 'src/components/shared/MaxWidthWrapper';

export function Header() {
  return (
    <header className="sticky top-0 z-10 h-headerHeight bg-surfaceClr-1">
      <MaxWidthWrapper type="header">
        <div className="flex h-full">
          <Logo />
          <SiteNav />
        </div>
      </MaxWidthWrapper>
    </header>
  );
}
