import React from 'react';

import { cva, VariantProps } from 'class-variance-authority';

const commonClasses = 'mx-auto h-full max-w-[calc(1024px+64px)]';
const headerClasses = 'px-[32px]';
const pageClasses =
  'px-[32px] min-[1088px]:border-x-[4px] min-[1088px]:border-surfaceClr-2 min-[1088px]:px-[28px]';

const wrapper = cva(commonClasses, {
  variants: {
    intent: {
      header: headerClasses,
      page: pageClasses,
    },
  },
});

interface MaxWidthWrapperProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof wrapper> {
  children: React.ReactNode;
  intent: 'header' | 'page';
}

export default function MaxWidthWrapper({
  children,
  intent,
  className,
  ...props
}: MaxWidthWrapperProps) {
  return (
    <div className={wrapper({ intent, className })} {...props}>
      {children}
    </div>
  );
}
