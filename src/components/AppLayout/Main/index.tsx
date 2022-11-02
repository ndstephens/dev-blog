import { container } from './Main.module.scss';

interface MainProps {
  children: React.ReactNode;
}

export function Main({ children }: MainProps) {
  return <main className={container}>{children}</main>;
}
