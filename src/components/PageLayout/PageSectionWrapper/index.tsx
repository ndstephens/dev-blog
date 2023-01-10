import MaxWidthWrapper from '@ui/shared/MaxWidthWrapper';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function PageSectionWrapper({ children, className }: Props) {
  return (
    <div className={className}>
      <MaxWidthWrapper intent="page">{children}</MaxWidthWrapper>
    </div>
  );
}
