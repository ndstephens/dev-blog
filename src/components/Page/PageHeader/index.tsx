import { CSSProperties } from 'react';

import { MaxWidthWrapper } from 'src/components/shared';

import { container } from './PageHeader.module.scss';

interface PageHeaderProps {
  children: React.ReactNode;
  bgColor?: CSSProperties['backgroundColor'];
}

export default function PageHeader({ children, bgColor }: PageHeaderProps) {
  const style: CSSProperties = {
    backgroundColor: bgColor,
  };
  return (
    <header style={style} className={container}>
      <MaxWidthWrapper>{children}</MaxWidthWrapper>
    </header>
  );
}
