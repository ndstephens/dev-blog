import MaxWidthWrapper from '@ui/shared/MaxWidthWrapper';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function PageBody({ children, className }: Props) {
  return (
    <div className={`flex flex-1 flex-col ${className}`}>
      <MaxWidthWrapper intent="pageBody" className="flex-1">
        {children}
      </MaxWidthWrapper>
    </div>
  );
}
