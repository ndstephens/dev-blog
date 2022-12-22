import MaxWidthWrapper from '@ui/shared/MaxWidthWrapper';

interface Props {
  children: React.ReactNode;
  bgColor?: string;
}

export default function PageContentWrapper({
  children,
  bgColor = 'bg-surfaceClr-1',
}: Props) {
  return (
    <div className={bgColor}>
      <MaxWidthWrapper intent="page">{children}</MaxWidthWrapper>
    </div>
  );
}
