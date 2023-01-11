import SiteHeader from '@ui/SiteHeader';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <SiteHeader />
      <main className="relative z-[100] flex flex-1 flex-col">{children}</main>
    </>
  );
}
