import { CSSProperties } from 'react';

import { MaxWidthWrapper } from 'src/components/shared';

import { container } from './PageBody.module.scss';

interface PageBodyProps {
  children: React.ReactNode;
  bgColor?: CSSProperties['backgroundColor'];
}

export default function PageBody({ children, bgColor }: PageBodyProps) {
  const style: CSSProperties = {
    backgroundColor: bgColor,
  };
  return (
    <section style={style} className={container}>
      <MaxWidthWrapper>{children}</MaxWidthWrapper>
    </section>
  );
}
