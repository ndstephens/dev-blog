const styles = {
  header: 'px-[32px]',
  page: 'border-x-[8px] border-surfaceClr-4 px-[24px]',
};

interface MaxWidthWrapperProps {
  children: React.ReactNode;
  type: 'header' | 'page';
}

export default function MaxWidthWrapper({
  children,
  type,
}: MaxWidthWrapperProps) {
  return (
    <div className={`mx-auto h-full max-w-[calc(1024px+64px)] ${styles[type]}`}>
      {children}
    </div>
  );
}
