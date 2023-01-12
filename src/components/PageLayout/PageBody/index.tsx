import MaxWidthWrapper from '@ui/shared/MaxWidthWrapper';

interface Props {
  bgColor: string;
  className?: string;
  children: React.ReactNode;
}

export default function PageBody({ bgColor, className, children }: Props) {
  return (
    <div className={`flex flex-1 flex-col ${bgColor}`}>
      <MaxWidthWrapper intent="pageBody" className={className}>
        {children}
      </MaxWidthWrapper>
    </div>
  );
}
