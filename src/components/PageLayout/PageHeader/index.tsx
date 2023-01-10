import PageSectionWrapper from '@ui/PageLayout/PageSectionWrapper';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function PageHeader({ children, className }: Props) {
  return (
    <PageSectionWrapper className={className}>
      <header className="pt-24 pb-12">{children}</header>
    </PageSectionWrapper>
  );
}
