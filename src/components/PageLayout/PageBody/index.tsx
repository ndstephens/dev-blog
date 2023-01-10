import PageSectionWrapper from '@ui/PageLayout/PageSectionWrapper';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function PageBody({ children, className }: Props) {
  return (
    <PageSectionWrapper className={`flex-1 ${className}`}>
      {children}
    </PageSectionWrapper>
  );
}
