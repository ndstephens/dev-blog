import SiteNav from 'src/components/AppLayout/Header/SiteNav';
import MaxWidthWrapper from 'src/components/shared/MaxWidthWrapper';

export function Header() {
  return (
    <header className="sticky top-0 z-10 h-12 max-h-12 bg-surface-1">
      <MaxWidthWrapper type="header">
        <SiteNav />
      </MaxWidthWrapper>
    </header>
  );
}
