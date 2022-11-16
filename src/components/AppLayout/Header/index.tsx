import SiteNav from 'src/components/AppLayout/Header/SiteNav';
import MaxWidthWrapper from 'src/components/shared/MaxWidthWrapper';

export function Header() {
  return (
    <header className="sticky top-0 z-10 h-headerHeight bg-surfaceClr-1">
      <MaxWidthWrapper type="header">
        <SiteNav />
      </MaxWidthWrapper>
    </header>
  );
}
