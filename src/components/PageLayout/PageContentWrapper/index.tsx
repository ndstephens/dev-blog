import MaxWidthWrapper from 'src/components/shared/MaxWidthWrapper';

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
      <MaxWidthWrapper type="page">{children}</MaxWidthWrapper>
    </div>
  );
}
