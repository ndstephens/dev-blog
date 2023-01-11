import React from 'react';

import { cva, VariantProps } from 'class-variance-authority';

const wrapper = cva(
  'px-4 xs:px-6 sm:px-8 mx-auto w-full max-w-[calc(1024px+64px)]',
  {
    variants: {
      intent: {
        siteHeader: 'h-full',
        pageBody:
          'min-[1088px]:border-x-[4px] border-surfaceClr-2 min-[1088px]:px-[28px]',
      },
    },
  }
);

interface MaxWidthWrapperProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof wrapper> {
  children: React.ReactNode;
  intent?: 'siteHeader' | 'pageBody';
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
