const styles = {
  header: 'px-8',
  page: 'border-x-[16px] border-surface-4 px-4',
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
