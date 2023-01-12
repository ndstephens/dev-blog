import MaxWidthWrapper from '@ui/shared/MaxWidthWrapper';

interface Props {
  bgColor: string;
  className?: string;
  children: React.ReactNode;
}

export default function PageHeader({ bgColor, className, children }: Props) {
  return (
    <div className={bgColor}>
      <MaxWidthWrapper className={className}>
        <header className="pt-32 pb-12">{children}</header>
      </MaxWidthWrapper>
    </div>
  );
}
