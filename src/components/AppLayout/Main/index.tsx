import { MaxWidthWrapper } from 'src/components/shared';

import { container } from './Main.module.scss';

interface MainProps {
  children: React.ReactNode;
}

export function Main({ children }: MainProps) {
  return (
    <main className={container}>
      <MaxWidthWrapper>{children}</MaxWidthWrapper>
    </main>
  );
}
