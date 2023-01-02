import React from 'react';

import { cva, VariantProps } from 'class-variance-authority';

const commonClasses =
  'px-4 xs:px-6 sm:px-8 mx-auto h-full max-w-[calc(1024px+64px)]';
const headerClasses = '';
const pageClasses =
  'min-[1088px]:border-x-[4px] border-surfaceClr-2 min-[1088px]:px-[28px]';

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
