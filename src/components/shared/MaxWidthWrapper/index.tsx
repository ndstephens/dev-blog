import { container } from './MaxWidthWrapper.module.scss';

interface MaxWidthWrapperProps {
  children: React.ReactNode;
}

export default function MaxWidthWrapper({ children }: MaxWidthWrapperProps) {
  return <div className={container}>{children}</div>;
}
