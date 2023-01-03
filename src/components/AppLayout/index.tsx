import { Header } from '@ui/Header';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <Header />
      <main className="relative z-[100] flex flex-1 flex-col">{children}</main>
    </>
  );
}
