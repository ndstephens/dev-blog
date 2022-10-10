import { Header } from 'src/components/AppLayout/Header';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <Header></Header>
      <main>{children}</main>
    </>
  );
}
