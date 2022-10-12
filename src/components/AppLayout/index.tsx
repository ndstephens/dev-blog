import { Header } from 'src/components/AppLayout/Header';
import { Main } from 'src/components/AppLayout/Main';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <Header />
      <Main>{children}</Main>
    </>
  );
}
