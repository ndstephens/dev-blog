import MaxWidthWrapper from '@ui/shared/MaxWidthWrapper';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function PageHeader({ children, className }: Props) {
  return (
    <div className={className}>
      <MaxWidthWrapper>
        <header className="pt-24 pb-12">{children}</header>
      </MaxWidthWrapper>
    </div>
  );
}
