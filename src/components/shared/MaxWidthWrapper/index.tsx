import clsx from 'clsx';

interface MaxWidthWrapperProps {
  children: React.ReactNode;
  type: 'header' | 'page';
}

export default function MaxWidthWrapper({
  children,
  type,
}: MaxWidthWrapperProps) {
  return (
    <div
      className={clsx('mx-auto h-full max-w-[calc(1024px+64px)]', {
        'px-[32px]': type === 'header',
        'border-x-[8px] border-surfaceClr-4 px-[24px]': type === 'page',
      })}
    >
      {children}
    </div>
  );
}
